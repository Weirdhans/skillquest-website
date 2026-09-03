import assert from 'node:assert/strict';
import {test} from 'node:test';

// Run against `npm run start -- --port 3100`, or set SEO_TEST_BASE_URL.
// Requests are read-only; signup and authentication forms are never submitted.
const origin = new URL(process.env.SEO_TEST_BASE_URL ?? 'http://localhost:3100').origin;
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

for (const locale of ['nl', 'en', 'de', 'fr', 'es', 'it']) {
  test(`${locale} support metadata refers to support, not the homepage`, async () => {
    const response = await fetch(`${origin}/${locale}/support`, {redirect: 'manual'});
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.ok(html.includes(`rel="canonical" href="https://www.skill-quest.app/${locale}/support"`));
    assert.ok(html.includes(`property="og:url" content="https://www.skill-quest.app/${locale}/support"`));
    assert.ok(html.includes('id="faq"'));
  });
}

for (const path of ['/auth-callback', '/auth/reset-password', '/sitemap.xml', '/robots.txt']) {
  test(`${path} is still reachable without a locale or legacy redirect`, async () => {
    const response = await fetch(`${origin}${path}`, {redirect: 'manual'});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('location'), null);
  });
}
