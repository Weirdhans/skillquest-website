// Server-only helpers for the newsletter signup (src/app/api/subscribe and
// src/app/api/newsletter/*).
//
// The subscriber list lives only in Resend: one segment ("Newsletter") holds
// every confirmed subscriber, and a hidden topic per language decides who
// gets which language's broadcast. Unconfirmed signups are never added as a
// contact; the confirmation link carries the address in an encrypted token
// (src/lib/newsletter-token.mjs). The Supabase table subscribe_attempts only
// holds short-lived, hashed rate-limit counters and is cleaned up after a day.

import {createHash} from 'crypto';
import {createClient, type SupabaseClient} from '@supabase/supabase-js';
import {Resend} from 'resend';
import type {NextRequest} from 'next/server';
import {
  deriveTokenKey,
  deriveUnsubscribeKey,
  resolveNewsletterSecrets
} from '@/lib/newsletter-token.mjs';
import {EMAIL_LOCALES, normalizeEmailLocale} from '@/lib/email-templates.mjs';
import {
  NEWSLETTER_FROM as CONFIG_FROM,
  NEWSLETTER_SEGMENT_ID as CONFIG_SEGMENT_ID,
  NEWSLETTER_TOPIC_IDS as CONFIG_TOPIC_IDS
} from '@/lib/newsletter-config.mjs';

export type NewsletterLocale = 'nl' | 'en' | 'de' | 'fr' | 'es' | 'it';

// Segment, topic IDs and sender live in src/lib/newsletter-config.mjs, shared
// with the monthly newsletter script (scripts/newsletter.mjs).
export const NEWSLETTER_SEGMENT_ID: string = CONFIG_SEGMENT_ID;
export const NEWSLETTER_TOPIC_IDS: Record<NewsletterLocale, string> =
  CONFIG_TOPIC_IDS;

// Bump when the signup form, the confirmation email or the newsletter part
// of the privacy policy changes meaningfully. The texts of each version are
// in git history; the contact stores which version it agreed to.
export const NEWSLETTER_CONSENT_VERSION = '2026-11-14';

export const NEWSLETTER_FROM: string = CONFIG_FROM;

export function toNewsletterLocale(value: unknown): NewsletterLocale {
  return normalizeEmailLocale(
    typeof value === 'string' ? value : undefined
  ) as NewsletterLocale;
}

export const NEWSLETTER_LOCALES = EMAIL_LOCALES as NewsletterLocale[];

// The newsletter manages contacts, segments and topics, which Resend only
// allows with a full-access API key. The site's RESEND_API_KEY is a
// sending-only key and stays that way for the other emails (feedback,
// password reset); only the newsletter routes get the broader key.
export function getResendClient(): Resend {
  const key = process.env.RESEND_NEWSLETTER_API_KEY;
  if (!key) throw new Error('RESEND_NEWSLETTER_API_KEY is not configured');
  return new Resend(key);
}

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase configuration missing');
  return createClient(url, key);
}

// The links in the newsletter's own emails are protected with
// NEWSLETTER_TOKEN_SECRET (falling back to the Supabase service role key
// until that is set); see resolveNewsletterSecrets for which secret signs
// and which ones are still accepted. The secret never leaves the server:
// the derive functions turn it into a separate key per purpose.
function newsletterSecrets() {
  return resolveNewsletterSecrets(process.env);
}

/** Encrypts new confirmation tokens. */
export function getTokenKey(): Buffer {
  return deriveTokenKey(newsletterSecrets().current);
}

/** Every key a confirmation token may have been made with. */
export function getAcceptedTokenKeys(): Buffer[] {
  return newsletterSecrets().accepted.map((secret) => deriveTokenKey(secret));
}

// Signs the contact ID in the welcome email's unsubscribe link, so the
// unsubscribe route can refuse made-up IDs without calling Resend. Once no
// accepted secret matches an old link any more, that link stops working;
// every newsletter still carries Resend's own unsubscribe link.
export function getUnsubscribeKey(): Buffer {
  return deriveUnsubscribeKey(newsletterSecrets().current);
}

/** Every key a welcome-email unsubscribe link may have been signed with. */
export function getAcceptedUnsubscribeKeys(): Buffer[] {
  return newsletterSecrets().accepted.map((secret) =>
    deriveUnsubscribeKey(secret)
  );
}

const CANONICAL_SITE_URL = 'https://www.skill-quest.app';

/**
 * Base URL for links in emails. Never taken from the request's Host header:
 * production uses the canonical domain, a preview deployment its own
 * deployment URL (VERCEL_URL, set by Vercel), so a test signup can be
 * confirmed on the same preview. Only a local run (no VERCEL_ENV) on
 * localhost links back to itself.
 */
export function getSiteUrl(request: NextRequest): string {
  const canonical = process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL;
  if (process.env.VERCEL_ENV === 'production') return canonical;
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (!process.env.VERCEL_ENV) {
    const {hostname, origin} = request.nextUrl;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return origin;
  }
  return canonical;
}

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

// ---------------------------------------------------------------------------
// Resend contacts
// ---------------------------------------------------------------------------

export type NewsletterContact = {
  id: string;
  unsubscribed: boolean;
  consentAt: number | null;
};

/** Returns null when Resend has no contact for this address. */
export async function findContact(
  resend: Resend,
  email: string
): Promise<NewsletterContact | null> {
  const {data, error} = await resend.contacts.get({email});
  if (error) {
    if (error.name === 'not_found' || error.statusCode === 404) return null;
    throw new Error(`Resend contact lookup failed: ${error.name}`);
  }
  const consentValue = data.properties?.consent_at?.value;
  const consentAt =
    typeof consentValue === 'string' ? Date.parse(consentValue) : NaN;
  return {
    id: data.id,
    unsubscribed: data.unsubscribed,
    consentAt: Number.isFinite(consentAt) ? consentAt : null
  };
}

// ---------------------------------------------------------------------------
// Rate limits (Supabase table subscribe_attempts)
// ---------------------------------------------------------------------------
//
// The table has one text column, ip_address. Rows are prefixed so one table
// serves several counters without a schema change:
//   ip:<hash>  one row per signup attempt from an IP address
//   cf:<hash>  one row per confirm attempt from an IP address
//   em:<hash>  one row per confirmation request that passed the limits
// Hashes are salted with a server secret; the IP hashes also change every
// day, like the feedback form. Nothing is needed after a day, and every
// signup removes older rows.
//
// Every counter inserts its row first and counts afterwards, so concurrent
// requests see each other: under a race they are refused, not let through.

const IP_WINDOW_MS = 60 * 60 * 1000;
const IP_LIMITS = {ip: 5, cf: 10} as const;
const EMAIL_COOLDOWN_MS = 10 * 60 * 1000;
const EMAIL_MAX_PER_DAY = 3;
// Resend's free plan allows 100 transactional emails a day, shared with the
// app's parent-consent and account-deletion emails. Newsletter confirmations
// may use at most this many of them.
const DAILY_CONFIRMATION_BUDGET = 40;
const DAY_MS = 24 * 60 * 60 * 1000;

type CounterKind = 'ip' | 'cf' | 'em';

function counterKey(kind: CounterKind, value: string): string {
  // A new secret starts the counters afresh, which is harmless: they only
  // cover a day.
  const secret = newsletterSecrets().current;
  const salt = kind === 'em' ? 'em' : new Date().toISOString().slice(0, 10);
  const hash = createHash('sha256')
    .update(`newsletter:${kind}:${salt}:${secret}:${value}`)
    .digest('hex');
  return `${kind}:${hash}`;
}

async function insertCounter(
  supabase: SupabaseClient,
  key: string
): Promise<{id: string; createdAt: string}> {
  const {data, error} = await supabase
    .from('subscribe_attempts')
    .insert([{ip_address: key}])
    .select('id, created_at')
    .single();
  if (error || !data) {
    throw new Error(`subscribe_attempts insert failed: ${error?.message ?? 'no row'}`);
  }
  return {id: data.id as string, createdAt: data.created_at as string};
}

/** Housekeeping: nothing in subscribe_attempts is needed after a day. */
export async function cleanupCounters(supabase: SupabaseClient) {
  const {error} = await supabase
    .from('subscribe_attempts')
    .delete()
    .lt('created_at', new Date(Date.now() - DAY_MS).toISOString());
  if (error) console.error('subscribe_attempts cleanup failed:', error.message);
}

/**
 * Records an attempt from this IP address ('ip' for signups, 'cf' for
 * confirmations) and returns false when it made too many in the last hour.
 * Throws on a database error: without the counter nothing may be sent.
 */
export async function recordIpAttempt(
  supabase: SupabaseClient,
  ip: string,
  kind: 'ip' | 'cf' = 'ip'
): Promise<boolean> {
  const key = counterKey(kind, ip);
  await insertCounter(supabase, key);

  const {count, error} = await supabase
    .from('subscribe_attempts')
    .select('id', {count: 'exact', head: true})
    .eq('ip_address', key)
    .gte('created_at', new Date(Date.now() - IP_WINDOW_MS).toISOString());
  if (error) throw new Error(`subscribe_attempts count failed: ${error.message}`);

  return (count ?? 0) <= IP_LIMITS[kind];
}

export type SendDecision = 'send' | 'skip_address' | 'over_budget';

export type Reservation = {decision: SendDecision; counterId: string | null};

type CounterRow = {id: string; ip_address: string; created_at: string};

/**
 * Records a confirmation request for this address and decides whether a
 * confirmation email may go out:
 * - 'over_budget': the daily budget is used up. Checked first, so this
 *   answer is the same for every address.
 * - 'skip_address': this address had a request in the last 10 minutes or
 *   too many today.
 * Only rows that were inserted before this one count, so of two concurrent
 * requests for the same address exactly one gets 'send'. The caller must
 * call this for every address, subscribed or not, and must release the
 * reservation when no email goes out because something failed.
 */
export async function reserveConfirmationEmail(
  supabase: SupabaseClient,
  email: string
): Promise<Reservation> {
  const now = Date.now();
  const key = counterKey('em', email);
  const own = await insertCounter(supabase, key);

  try {
    const {data, error} = await supabase
      .from('subscribe_attempts')
      .select('id, ip_address, created_at')
      .like('ip_address', 'em:%')
      .gte('created_at', new Date(now - DAY_MS).toISOString());
    if (error) throw new Error(`subscribe_attempts lookup failed: ${error.message}`);

    // PostgREST returns created_at in one fixed format, so the strings sort
    // in time order; the ID breaks ties within the same microsecond.
    const before = (row: CounterRow) =>
      row.created_at < own.createdAt ||
      (row.created_at === own.createdAt && row.id < own.id);
    const earlier = ((data ?? []) as CounterRow[]).filter(before);

    if (earlier.length >= DAILY_CONFIRMATION_BUDGET) {
      await releaseConfirmationEmail(supabase, own.id);
      return {decision: 'over_budget', counterId: null};
    }

    const sameAddress = earlier.filter((row) => row.ip_address === key);
    const recent = sameAddress.some(
      (row) => now - Date.parse(row.created_at) < EMAIL_COOLDOWN_MS
    );
    if (recent || sameAddress.length >= EMAIL_MAX_PER_DAY) {
      await releaseConfirmationEmail(supabase, own.id);
      return {decision: 'skip_address', counterId: null};
    }

    return {decision: 'send', counterId: own.id};
  } catch (error) {
    await releaseConfirmationEmail(supabase, own.id);
    throw error;
  }
}

/** Gives a reserved confirmation email back when it is not sent after all. */
export async function releaseConfirmationEmail(
  supabase: SupabaseClient,
  counterId: string
) {
  const {error} = await supabase
    .from('subscribe_attempts')
    .delete()
    .eq('id', counterId);
  if (error) console.error('subscribe_attempts release failed:', error.message);
}
