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
import {deriveTokenKey} from '@/lib/newsletter-token.mjs';
import {EMAIL_LOCALES, normalizeEmailLocale} from '@/lib/email-templates.mjs';

export type NewsletterLocale = 'nl' | 'en' | 'de' | 'fr' | 'es' | 'it';

// Created in Resend on 2026-11-15: segment "Newsletter", topics
// "Newsletter <locale>" (private, default opt-out) and the string contact
// properties locale, consent_at, consent_version and consent_source. The IDs
// are not secret; they only work with the server-side Resend API key.
export const NEWSLETTER_SEGMENT_ID = 'b403b647-34d2-494a-8567-2850399eab2b';
export const NEWSLETTER_TOPIC_IDS: Record<NewsletterLocale, string> = {
  nl: '0a884219-d9bc-4527-9599-bbf549a04765',
  en: 'ffb05cce-25f0-493d-bf51-079fc5585a80',
  de: 'aab5d67a-fd9e-4d46-9012-ce73fa338554',
  fr: '020f0dfe-fc0b-434b-bfea-8980d253a2ca',
  es: 'dda7591b-b766-4f4d-ac6d-6a0c536fb136',
  it: '82a6974b-3cc8-4a8b-a399-e92b5ebe3bc4'
};

// Bump when the signup form, the confirmation email or the newsletter part
// of the privacy policy changes meaningfully. The texts of each version are
// in git history; the contact stores which version it agreed to.
export const NEWSLETTER_CONSENT_VERSION = '2026-11-14';

export const NEWSLETTER_FROM = 'SkillQuest <hello@skill-quest.app>';

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

// The service role key never leaves the server; deriveTokenKey turns it into
// a separate key that is only used for confirmation tokens. Rotating the
// service role key only invalidates links that are less than a day old.
export function getTokenKey(): Buffer {
  return deriveTokenKey(process.env.SUPABASE_SERVICE_ROLE_KEY ?? '');
}

const CANONICAL_SITE_URL = 'https://www.skill-quest.app';

/**
 * Base URL for links in emails. Production uses the canonical domain, never
 * the request's Host header. A preview deployment (*.vercel.app) or a local
 * run links back to itself, so a test signup can be confirmed on the same
 * deployment; any other host falls back to the canonical domain.
 */
export function getSiteUrl(request: NextRequest): string {
  const canonical = process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL;
  if (process.env.VERCEL_ENV === 'production') return canonical;

  const {hostname, origin} = request.nextUrl;
  const isPreviewOrLocal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.vercel.app');
  return isPreviewOrLocal ? origin : canonical;
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
//   em:<hash>  one row per confirmation email that may go out to an address
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
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  const salt = kind === 'em' ? 'em' : new Date().toISOString().slice(0, 10);
  const hash = createHash('sha256')
    .update(`newsletter:${kind}:${salt}:${secret}:${value}`)
    .digest('hex');
  return `${kind}:${hash}`;
}

async function insertCounter(
  supabase: SupabaseClient,
  key: string
): Promise<string> {
  const {data, error} = await supabase
    .from('subscribe_attempts')
    .insert([{ip_address: key}])
    .select('id')
    .single();
  if (error || !data) {
    throw new Error(`subscribe_attempts insert failed: ${error?.message ?? 'no row'}`);
  }
  return data.id as string;
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

/**
 * Records a confirmation request for this address and decides whether a
 * confirmation email may go out. 'skip_address' means the address got a
 * confirmation email in the last 10 minutes or too many today;
 * 'over_budget' means the daily budget is used up. The caller must call this
 * for every address, subscribed or not, so the answer never depends on who
 * is on the list. Only a 'send' keeps its row: the counters count emails
 * that may actually go out, not attempts.
 */
export async function reserveConfirmationEmail(
  supabase: SupabaseClient,
  email: string
): Promise<Reservation> {
  const now = Date.now();
  const dayStart = new Date(now - DAY_MS).toISOString();
  const key = counterKey('em', email);
  const ownId = await insertCounter(supabase, key);

  const {data: rows, error: rowsError} = await supabase
    .from('subscribe_attempts')
    .select('id, created_at')
    .eq('ip_address', key)
    .gte('created_at', dayStart);
  if (rowsError) {
    throw new Error(`subscribe_attempts lookup failed: ${rowsError.message}`);
  }

  const earlier = (rows ?? []).filter((row) => row.id !== ownId);
  const recent = earlier.some(
    (row) => now - Date.parse(row.created_at) < EMAIL_COOLDOWN_MS
  );
  if (recent || earlier.length >= EMAIL_MAX_PER_DAY) {
    await releaseConfirmationEmail(supabase, ownId);
    return {decision: 'skip_address', counterId: null};
  }

  const {count, error: budgetError} = await supabase
    .from('subscribe_attempts')
    .select('id', {count: 'exact', head: true})
    .like('ip_address', 'em:%')
    .gte('created_at', dayStart);
  if (budgetError) {
    throw new Error(`subscribe_attempts budget failed: ${budgetError.message}`);
  }
  if ((count ?? 0) > DAILY_CONFIRMATION_BUDGET) {
    await releaseConfirmationEmail(supabase, ownId);
    return {decision: 'over_budget', counterId: null};
  }
  return {decision: 'send', counterId: ownId};
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
