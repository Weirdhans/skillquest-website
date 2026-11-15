// Confirmation tokens for the newsletter double opt-in.
//
// A signup is not stored anywhere until the person clicks the link in the
// confirmation email, so the link itself has to carry the email address and
// language. The token is encrypted and authenticated (AES-256-GCM): the
// address is not readable from the URL, and a changed token fails the tag
// check. It expires after CONFIRM_TOKEN_TTL_MS.
//
// A token stays valid until it expires, so the confirm route also rejects a
// token that was issued before the contact's latest consent (see
// src/app/api/newsletter/confirm/route.ts). That stops an old link from
// subscribing someone again after they unsubscribed.
//
// Kept as .mjs (like email-templates.mjs) so tests/newsletter.test.mjs can
// import it with plain `node --test`.

import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  timingSafeEqual
} from 'node:crypto';

export const CONFIRM_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

const TOKEN_VERSION = 1;
const IV_BYTES = 12;
const TAG_BYTES = 16;
const PURPOSE = 'skillquest-newsletter-confirm-v1';
// A clock that runs a little ahead on another server must not turn a fresh
// token into an invalid one.
const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;

/**
 * Derives the 32-byte token key from a server-only secret. The label binds
 * the key to this one purpose, so it is never the secret itself.
 */
export function deriveTokenKey(secret) {
  if (typeof secret !== 'string' || secret.length < 16) {
    throw new Error('Newsletter token secret is missing or too short');
  }
  return createHmac('sha256', secret).update(PURPOSE).digest();
}

export function createConfirmToken({email, locale, now = Date.now()}, key) {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(Buffer.from(PURPOSE, 'utf8'));
  const plaintext = Buffer.from(
    JSON.stringify({v: TOKEN_VERSION, e: email, l: locale, iat: now}),
    'utf8'
  );
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return Buffer.concat([iv, ciphertext, cipher.getAuthTag()]).toString(
    'base64url'
  );
}

/**
 * @returns {{ok: true, email: string, locale: string, issuedAt: number}
 *   | {ok: false, reason: 'invalid' | 'expired'}}
 */
export function readConfirmToken(token, key, now = Date.now()) {
  const invalid = {ok: false, reason: 'invalid'};

  if (
    typeof token !== 'string' ||
    token.length > 2000 ||
    !/^[A-Za-z0-9_-]+$/.test(token)
  ) {
    return invalid;
  }

  const raw = Buffer.from(token, 'base64url');
  if (raw.length <= IV_BYTES + TAG_BYTES) return invalid;

  let payload;
  try {
    const iv = raw.subarray(0, IV_BYTES);
    const tag = raw.subarray(raw.length - TAG_BYTES);
    const ciphertext = raw.subarray(IV_BYTES, raw.length - TAG_BYTES);
    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAAD(Buffer.from(PURPOSE, 'utf8'));
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final()
    ]);
    payload = JSON.parse(plaintext.toString('utf8'));
  } catch {
    return invalid;
  }

  if (
    !payload ||
    payload.v !== TOKEN_VERSION ||
    typeof payload.e !== 'string' ||
    typeof payload.l !== 'string' ||
    typeof payload.iat !== 'number' ||
    !Number.isFinite(payload.iat)
  ) {
    return invalid;
  }

  if (payload.iat > now + MAX_CLOCK_SKEW_MS) return invalid;
  if (now - payload.iat > CONFIRM_TOKEN_TTL_MS) {
    return {ok: false, reason: 'expired'};
  }

  return {ok: true, email: payload.e, locale: payload.l, issuedAt: payload.iat};
}

// Deliberately narrower than RFC 5321. The Resend SDK puts the address into
// the request path unencoded (`/contacts/${email}`), so characters such as
// "/", "?", "#", "%" or "\" must never get through: they would let an
// address point the API call at another endpoint. Internationalised
// addresses are not accepted either.
const EMAIL_PATTERN =
  /^[a-z0-9](?:[a-z0-9._+'-]{0,62}[a-z0-9_+-])?@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;

/** Trims and lowercases an address; returns null when it is not usable. */
export function normalizeEmail(value) {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (email.length === 0 || email.length > 254) return null;
  return EMAIL_PATTERN.test(email) ? email : null;
}

// ---------------------------------------------------------------------------
// Unsubscribe links in emails the site sends itself
// ---------------------------------------------------------------------------

const UNSUBSCRIBE_PURPOSE = 'skillquest-newsletter-unsubscribe-v1';

export function deriveUnsubscribeKey(secret) {
  if (typeof secret !== 'string' || secret.length < 16) {
    throw new Error('Newsletter unsubscribe secret is missing or too short');
  }
  return createHmac('sha256', secret).update(UNSUBSCRIBE_PURPOSE).digest();
}

/** A 128-bit HMAC over the Resend contact ID, base64url. */
export function signContactId(contactId, key) {
  return createHmac('sha256', key)
    .update(contactId)
    .digest()
    .subarray(0, 16)
    .toString('base64url');
}

export function verifyContactSignature(contactId, signature, key) {
  if (!isUuid(contactId) || typeof signature !== 'string') return false;
  const expected = Buffer.from(signContactId(contactId, key), 'utf8');
  const given = Buffer.from(signature, 'utf8');
  return expected.length === given.length && timingSafeEqual(expected, given);
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value) {
  return typeof value === 'string' && UUID_PATTERN.test(value);
}
