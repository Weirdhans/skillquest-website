import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {
  CONFIRM_TOKEN_TTL_MS,
  createConfirmToken,
  deriveTokenKey,
  isUuid,
  normalizeEmail,
  readConfirmToken
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
    'https://www.skill-quest.app/api/newsletter/unsubscribe?c=e169aa45-1ecf-4183-9955-b1499d5701d3&l=fr';
  for (const locale of EMAIL_LOCALES) {
    const {html} = renderWelcomeEmail({locale, unsubscribeUrl});
    assert.ok(html.includes(`href="${unsubscribeUrl.replace('&', '&amp;')}"`), `${locale} unsubscribe link`);
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
