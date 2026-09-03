import assert from 'node:assert/strict';
import {test} from 'node:test';

// Run against `npm run start -- --port 3100`, or set SEO_TEST_BASE_URL.
// Requests are read-only; signup and authentication forms are never submitted.
const origin = new URL(process.env.SEO_TEST_BASE_URL ?? 'http://localhost:3100').origin;
const locales = ['nl', 'en', 'de', 'fr', 'es', 'it'];

function assertLanguageMetadata(response, html, locale, path = '') {
  // Preload Link headers may remain; request-host-based hreflang must not.
  assert.doesNotMatch(response.headers.get('link') ?? '', /hreflang\s*=/i);
  const alternates = [...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/g)]
    .filter(([tag]) => /hreflang=/i.test(tag))
    .map(([tag]) => ({
      language: tag.match(/hreflang="([^"]+)"/i)?.[1],
      href: tag.match(/href="([^"]+)"/)?.[1]
    }));

  assert.equal(alternates.length, 7, 'six locales plus x-default, without duplicates');
  assert.equal(new Set(alternates.map(({language}) => language)).size, 7);
  for (const candidate of locales) {
    assert.ok(alternates.some(({language, href}) =>
      language.startsWith(`${candidate}-`) &&
      href === `https://www.skill-quest.app/${candidate}${path}`
    ));
  }
  assert.ok(alternates.some(({language, href}) =>
    language === 'x-default' && href === `https://www.skill-quest.app/nl${path}`
  ));
  assert.ok(html.includes(`rel="canonical" href="https://www.skill-quest.app/${locale}${path}"`));
}
const redirects = [
  ['/en/app', '/en/download'],
  ['/nl/handleiding', '/nl/guides'],
  ['/es/faq', '/es/support#faq']
];

for (const [source, destination] of redirects) {
  for (const query of ['', '?utm_source=google&utm_campaign=early_access']) {
    test(`${source}${query} permanently redirects without losing campaign data`, async () => {
      const response = await fetch(`${origin}${source}${query}`, {redirect: 'manual'});
      const expected = new URL(destination, origin);
      expected.search = query;

      assert.equal(response.status, 308);
      assert.equal(new URL(response.headers.get('location'), origin).href, expected.href);
    });
  }

  test(`${destination} is a working, self-canonical destination`, async () => {
    const url = new URL(destination, origin);
    const response = await fetch(url, {redirect: 'manual'});
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.ok(html.includes(`rel="canonical" href="https://www.skill-quest.app${url.pathname}"`));
    assert.ok(html.includes('name="robots" content="index, follow"'));
    if (url.hash === '#faq') assert.ok(html.includes('id="faq"'));
  });
}

for (const path of ['/nl/does-not-exist', '/en/app/does-not-exist', '/es/faq/does-not-exist']) {
  test(`${path} remains a genuine 404`, async () => {
    const response = await fetch(`${origin}${path}`, {redirect: 'manual'});
    assert.equal(response.status, 404);
    assert.equal(response.headers.get('location'), null);
  });
}

for (const locale of locales) {
  test(`${locale} homepage has one canonical-domain hreflang source`, async () => {
    const response = await fetch(`${origin}/${locale}`, {redirect: 'manual'});
    const html = await response.text();

    assert.equal(response.status, 200);
    assertLanguageMetadata(response, html, locale);
  });

  test(`${locale} support metadata refers to support, not the homepage`, async () => {
    const response = await fetch(`${origin}/${locale}/support`, {redirect: 'manual'});
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.ok(html.includes(`rel="canonical" href="https://www.skill-quest.app/${locale}/support"`));
    assert.ok(html.includes(`property="og:url" content="https://www.skill-quest.app/${locale}/support"`));
    assert.ok(html.includes('id="faq"'));
    assertLanguageMetadata(response, html, locale, '/support');
  });
}

// Reproduce the original www/non-www mismatch without changing DNS or routing.
if (['localhost', '127.0.0.1'].includes(new URL(origin).hostname)) {
  for (const host of ['skill-quest.app', 'www.skill-quest.app']) {
    test(`forwarded host ${host} cannot generate conflicting language links`, async () => {
      const response = await fetch(`${origin}/en`, {
        headers: {'x-forwarded-host': host},
        redirect: 'manual'
      });
      assert.equal(response.status, 200);
      assertLanguageMetadata(response, await response.text(), 'en');
    });
  }
}

for (const path of ['/auth-callback', '/auth/reset-password', '/sitemap.xml', '/robots.txt']) {
  test(`${path} is still reachable without a locale or legacy redirect`, async () => {
    const response = await fetch(`${origin}${path}`, {redirect: 'manual'});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('location'), null);
  });
}
