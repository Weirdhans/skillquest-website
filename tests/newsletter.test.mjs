import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {
  CONFIRM_TOKEN_TTL_MS,
  createConfirmToken,
  deriveTokenKey,
  deriveUnsubscribeKey,
  isUuid,
  normalizeEmail,
  readConfirmToken,
  readConfirmTokenWithKeys,
  resolveNewsletterSecrets,
  signContactId,
  verifyContactSignature,
  verifyContactSignatureWithKeys
} from '../src/lib/newsletter-token.mjs';
import {
  EMAIL_LOCALES,
  renderVerificationEmail,
  renderWelcomeEmail
} from '../src/lib/email-templates.mjs';

const key = deriveTokenKey('test-secret-that-is-long-enough');

test('a confirmation token round-trips and hides the address', () => {
  const now = Date.UTC(2026, 10, 14, 12);
  const token = createConfirmToken({email: 'ana@example.com', locale: 'de', now}, key);

  assert.match(token, /^[A-Za-z0-9_-]+$/);
  assert.ok(!Buffer.from(token, 'base64url').toString('latin1').includes('ana@example.com'));
  assert.deepEqual(readConfirmToken(token, key, now + 1000), {
    ok: true,
    email: 'ana@example.com',
    locale: 'de',
    issuedAt: now
  });
});

test('a token expires after a day and rejects tampering and other keys', () => {
  const now = Date.UTC(2026, 10, 14, 12);
  const token = createConfirmToken({email: 'ana@example.com', locale: 'nl', now}, key);

  assert.deepEqual(readConfirmToken(token, key, now + CONFIRM_TOKEN_TTL_MS + 1), {
    ok: false,
    reason: 'expired'
  });

  const flipped = token.slice(0, 20) + (token[20] === 'A' ? 'B' : 'A') + token.slice(21);
  assert.equal(readConfirmToken(flipped, key, now).ok, false);
  assert.equal(readConfirmToken(token, deriveTokenKey('another-secret-entirely'), now).ok, false);
  assert.equal(readConfirmToken('not a token', key, now).ok, false);
  assert.equal(readConfirmToken(undefined, key, now).ok, false);
});

test('a token from the future is not accepted', () => {
  const now = Date.UTC(2026, 10, 14, 12);
  const token = createConfirmToken({email: 'a@b.co', locale: 'en', now: now + 60 * 60 * 1000}, key);
  assert.deepEqual(readConfirmToken(token, key, now), {ok: false, reason: 'invalid'});
});

test('the token key needs a real secret', () => {
  assert.throws(() => deriveTokenKey(''));
  assert.throws(() => deriveTokenKey(undefined));
});

test('email addresses are trimmed, lowercased and validated', () => {
  assert.equal(normalizeEmail('  Ana@Example.COM '), 'ana@example.com');
  assert.equal(normalizeEmail('no-at-sign'), null);
  assert.equal(normalizeEmail(''), null);
  assert.equal(normalizeEmail(42), null);
  assert.equal(normalizeEmail(`${'a'.repeat(250)}@x.co`), null);
  assert.equal(normalizeEmail("o'brien@example.ie"), "o'brien@example.ie");
  assert.equal(normalizeEmail('first.last+tag@mail.example.com'), 'first.last+tag@mail.example.com');
});

test('addresses that could change the Resend API path are refused', () => {
  // The Resend SDK puts the address into /contacts/${email} unencoded.
  for (const value of [
    '../broadcasts#@x.co',
    'e169aa45-1ecf-4183-9955-b1499d5701d3/topics?limit=1#@x.co',
    'a/b@x.co',
    'a?b@x.co',
    'a#b@x.co',
    'a%2f@x.co',
    'a\b@x.co',
    'ana@x.co/../../domains',
    'ana@-x.co',
    '.ana@x.co'
  ]) {
    assert.equal(normalizeEmail(value), null, value);
  }
});

test('contact IDs must be UUIDs', () => {
  assert.equal(isUuid('e169aa45-1ecf-4183-9955-b1499d5701d3'), true);
  assert.equal(isUuid('e169aa45'), false);
  assert.equal(isUuid(null), false);
});

test('unsubscribe links are signed per contact', () => {
  const unsubscribeKey = deriveUnsubscribeKey('test-secret-that-is-long-enough');
  const id = 'e169aa45-1ecf-4183-9955-b1499d5701d3';
  const signature = signContactId(id, unsubscribeKey);

  assert.match(signature, /^[A-Za-z0-9_-]{22}$/);
  assert.equal(verifyContactSignature(id, signature, unsubscribeKey), true);
  assert.equal(verifyContactSignature('0d9f6a8e-2b1c-4f3a-9e7d-5c4b3a2f1e0d', signature, unsubscribeKey), false);
  assert.equal(verifyContactSignature(id, signature.slice(1), unsubscribeKey), false);
  assert.equal(verifyContactSignature(id, signature, deriveUnsubscribeKey('another-secret-entirely')), false);
  assert.equal(verifyContactSignature(id, null, unsubscribeKey), false);
  assert.equal(verifyContactSignature('not-a-uuid', signature, unsubscribeKey), false);
  // A different purpose gives a different key than the confirmation tokens.
  assert.notDeepEqual(unsubscribeKey, deriveTokenKey('test-secret-that-is-long-enough'));
});

const SERVICE_ROLE = 'service-role-key-of-the-old-supabase-project';
const OWN_SECRET = 'own-newsletter-secret-at-least-32-characters-long';
const OLD_OWN_SECRET = 'replaced-newsletter-secret-32-characters-or-more';

test('the service role key signs until the own secret is set', () => {
  assert.deepEqual(resolveNewsletterSecrets({SUPABASE_SERVICE_ROLE_KEY: SERVICE_ROLE}), {
    current: SERVICE_ROLE,
    accepted: [SERVICE_ROLE]
  });
  // Blank counts as not set.
  assert.equal(
    resolveNewsletterSecrets({NEWSLETTER_TOKEN_SECRET: '  ', SUPABASE_SERVICE_ROLE_KEY: SERVICE_ROLE}).current,
    SERVICE_ROLE
  );
});

test('once the own secret is set, the service role key is not accepted on its own', () => {
  // Whoever holds the service role key must not be able to forge newsletter
  // links once the own secret signs them.
  assert.deepEqual(
    resolveNewsletterSecrets({NEWSLETTER_TOKEN_SECRET: OWN_SECRET, SUPABASE_SERVICE_ROLE_KEY: SERVICE_ROLE}),
    {current: OWN_SECRET, accepted: [OWN_SECRET]}
  );
  // A placeholder service role key (local runs) does not matter then either.
  assert.deepEqual(
    resolveNewsletterSecrets({NEWSLETTER_TOKEN_SECRET: OWN_SECRET, SUPABASE_SERVICE_ROLE_KEY: 'dummy'}),
    {current: OWN_SECRET, accepted: [OWN_SECRET]}
  );
});

test('PREVIOUS keeps links made with the earlier secret working', () => {
  // Switch-over: PREVIOUS holds the service role key that signed until now.
  // It keeps working after the move, when the service role key is new.
  assert.deepEqual(
    resolveNewsletterSecrets({
      NEWSLETTER_TOKEN_SECRET: OWN_SECRET,
      NEWSLETTER_TOKEN_SECRET_PREVIOUS: SERVICE_ROLE,
      SUPABASE_SERVICE_ROLE_KEY: 'new-service-role-key-after-the-move'
    }),
    {current: OWN_SECRET, accepted: [OWN_SECRET, SERVICE_ROLE]}
  );
  // Rotation of the own secret.
  assert.deepEqual(
    resolveNewsletterSecrets({NEWSLETTER_TOKEN_SECRET: OWN_SECRET, NEWSLETTER_TOKEN_SECRET_PREVIOUS: OLD_OWN_SECRET}),
    {current: OWN_SECRET, accepted: [OWN_SECRET, OLD_OWN_SECRET]}
  );
  // A secret is listed once, and a blank PREVIOUS counts as not set.
  assert.deepEqual(
    resolveNewsletterSecrets({NEWSLETTER_TOKEN_SECRET: OWN_SECRET, NEWSLETTER_TOKEN_SECRET_PREVIOUS: OWN_SECRET}),
    {current: OWN_SECRET, accepted: [OWN_SECRET]}
  );
  assert.deepEqual(
    resolveNewsletterSecrets({NEWSLETTER_TOKEN_SECRET: OWN_SECRET, NEWSLETTER_TOKEN_SECRET_PREVIOUS: ' '}),
    {current: OWN_SECRET, accepted: [OWN_SECRET]}
  );
});

test('a missing or short newsletter secret is refused', () => {
  assert.throws(() => resolveNewsletterSecrets({}), /NEWSLETTER_TOKEN_SECRET/);
  assert.throws(
    () => resolveNewsletterSecrets({NEWSLETTER_TOKEN_SECRET: 'too-short', SUPABASE_SERVICE_ROLE_KEY: SERVICE_ROLE}),
    /at least 32/
  );
  assert.throws(() => resolveNewsletterSecrets({NEWSLETTER_TOKEN_SECRET: 'x'.repeat(31)}), /at least 32/);
  assert.equal(resolveNewsletterSecrets({NEWSLETTER_TOKEN_SECRET: 'x'.repeat(32)}).current, 'x'.repeat(32));
  assert.throws(
    () =>
      resolveNewsletterSecrets({
        NEWSLETTER_TOKEN_SECRET: OWN_SECRET,
        NEWSLETTER_TOKEN_SECRET_PREVIOUS: 'too-short'
      }),
    /NEWSLETTER_TOKEN_SECRET_PREVIOUS/
  );
});

test('links made with an earlier secret keep working while it is accepted', () => {
  const now = Date.UTC(2026, 11, 9, 12);
  const oldTokenKey = deriveTokenKey(SERVICE_ROLE);
  const newTokenKey = deriveTokenKey(OWN_SECRET);
  const token = createConfirmToken({email: 'ana@example.com', locale: 'it', now}, oldTokenKey);

  assert.equal(readConfirmTokenWithKeys(token, [newTokenKey, oldTokenKey], now + 1000).ok, true);
  assert.deepEqual(readConfirmTokenWithKeys(token, [newTokenKey], now + 1000), {
    ok: false,
    reason: 'invalid'
  });
  assert.deepEqual(
    readConfirmTokenWithKeys(token, [newTokenKey, oldTokenKey], now + CONFIRM_TOKEN_TTL_MS + 1),
    {ok: false, reason: 'expired'}
  );
  assert.deepEqual(readConfirmTokenWithKeys(token, [], now), {ok: false, reason: 'invalid'});
  // An expired token made with the first key stays "expired": the later
  // keys must not turn it into "invalid".
  const newToken = createConfirmToken({email: 'ana@example.com', locale: 'it', now}, newTokenKey);
  assert.deepEqual(
    readConfirmTokenWithKeys(newToken, [newTokenKey, oldTokenKey], now + CONFIRM_TOKEN_TTL_MS + 1),
    {ok: false, reason: 'expired'}
  );
  assert.equal(readConfirmTokenWithKeys(newToken, [newTokenKey, oldTokenKey], now + 1000).ok, true);

  const id = 'e169aa45-1ecf-4183-9955-b1499d5701d3';
  const oldUnsubscribeKey = deriveUnsubscribeKey(SERVICE_ROLE);
  const newUnsubscribeKey = deriveUnsubscribeKey(OWN_SECRET);
  const signature = signContactId(id, oldUnsubscribeKey);
  assert.equal(verifyContactSignatureWithKeys(id, signature, [newUnsubscribeKey, oldUnsubscribeKey]), true);
  assert.equal(verifyContactSignatureWithKeys(id, signature, [newUnsubscribeKey]), false);
  assert.equal(verifyContactSignatureWithKeys(id, signature, []), false);
  const newSignature = signContactId(id, newUnsubscribeKey);
  assert.equal(verifyContactSignatureWithKeys(id, newSignature, [newUnsubscribeKey, oldUnsubscribeKey]), true);
  // A forged signature fails against every key, also for another contact.
  assert.equal(
    verifyContactSignatureWithKeys(id, 'A'.repeat(22), [newUnsubscribeKey, oldUnsubscribeKey]),
    false
  );
  assert.equal(
    verifyContactSignatureWithKeys('0d9f6a8e-2b1c-4f3a-9e7d-5c4b3a2f1e0d', newSignature, [
      newUnsubscribeKey,
      oldUnsubscribeKey
    ]),
    false
  );
});

test('every language has a confirmation email with the confirm link', () => {
  const confirmUrl = 'https://www.skill-quest.app/nl/newsletter/confirm?token=abc&x=1';
  for (const locale of EMAIL_LOCALES) {
    const {subject, html} = renderVerificationEmail({locale, confirmUrl});
    assert.ok(subject.length > 10, `${locale} subject`);
    assert.ok(html.includes('href="https://www.skill-quest.app/nl/newsletter/confirm?token=abc&amp;x=1"'), `${locale} link`);
    assert.ok(!/waitlist|wachtlijst|Android Early Access/i.test(html), `${locale} old waitlist copy`);
  }
});

test('every welcome email carries a working unsubscribe link', () => {
  const unsubscribeUrl =
    'https://www.skill-quest.app/api/newsletter/unsubscribe?c=e169aa45-1ecf-4183-9955-b1499d5701d3&s=abc&l=fr';
  for (const locale of EMAIL_LOCALES) {
    const {html} = renderWelcomeEmail({locale, unsubscribeUrl});
    assert.ok(html.includes(`href="${unsubscribeUrl.replaceAll('&', '&amp;')}"`), `${locale} unsubscribe link`);
  }
});

test('the privacy policy describes the newsletter, not a waitlist, in six languages', () => {
  const waitlistWords = /wachtlijst|waitlist|warteliste|liste d'attente|lista de espera|lista d'attesa/i;
  for (const locale of EMAIL_LOCALES) {
    const messages = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), 'utf8'));
    assert.equal(messages.waitlist, undefined, `${locale} unused waitlist copy`);
    const sections = Object.values(messages.privacy.sections);
    const text = JSON.stringify(sections);
    assert.ok(!waitlistWords.test(text), `${locale} privacy still mentions a waitlist`);
    // Section 4 is the newsletter section; the form links to /privacy#s-4.
    assert.match(sections[3].content, /Resend/, `${locale} processor`);
    assert.match(sections[3].content, /6\s?\(1\)\s?\(a\)|6 Abs\. 1 lit\. a|6, apartado 1|6, paragraphe 1|6, comma 1|6 lid 1/, `${locale} legal basis`);
    assert.ok(messages.deleteAccount.sections.whatWeMayRetain.items.newsletter, `${locale} delete page`);
  }
});
