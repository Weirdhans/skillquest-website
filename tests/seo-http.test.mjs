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

    const familyImage = [...html.matchAll(/<img\b[^>]*>/g)]
      .map(([tag]) => tag)
      .find((tag) => tag.includes('06-social-family.png'));
    assert.ok(familyImage, 'family screenshot is present');
    assert.match(familyImage, /loading="lazy"/);
    const srcSet = familyImage.match(/\bsrcset="([^"]+)"/i)?.[1];
    assert.ok(srcSet, 'responsive image variants are advertised');
    const variants = srcSet.split(',').map((candidate) => {
      const [url, descriptor] = candidate.trim().split(/\s+/);
      const params = new URL(url.replaceAll('&amp;', '&'), origin).searchParams;
      assert.equal(descriptor, `${params.get('w')}w`);
      assert.equal(params.get('q'), '75', 'image quality is unchanged');
      return Number(params.get('w'));
    });
    for (const width of [384, 400, 448, 576, 640, 1080]) {
      assert.ok(variants.includes(width), `responsive ${width}px variant is available`);
    }
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

  test(`${locale} terms page is a working, indexable, self-canonical page`, async () => {
    const response = await fetch(`${origin}/${locale}/terms`, {redirect: 'manual'});
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') ?? '', /^text\/html/);
    assert.ok(html.includes(`rel="canonical" href="https://www.skill-quest.app/${locale}/terms"`));
    assert.ok(html.includes('name="robots" content="index, follow"'));
    assertLanguageMetadata(response, html, locale, '/terms');
    assert.equal(new Set(html.match(/id="s-\d+"/g)).size, 15, 'fifteen sections');
  });
}

test('compact family image variants work and reduce bytes without lowering quality', async (t) => {
  const sizes = new Map();
  for (const width of [400, 448, 576, 640]) {
    const url = new URL('/_next/image', origin);
    url.search = new URLSearchParams({
      url: '/screenshots/en/06-social-family.png',
      w: String(width),
      q: '75'
    }).toString();
    const response = await fetch(url, {headers: {accept: 'image/webp'}, redirect: 'manual'});
    assert.equal(response.status, 200, `${width}px variant is served`);
    assert.match(response.headers.get('content-type') ?? '', /^image\/webp\b/);
    const bytes = (await response.arrayBuffer()).byteLength;
    assert.ok(bytes > 0);
    sizes.set(width, bytes);
  }
  assert.ok(sizes.get(400) < sizes.get(640), '400px variant is smaller than the old 640px choice');
  t.diagnostic(`Family screenshot bytes at quality 75: ${JSON.stringify(Object.fromEntries(sizes))}`);
});

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

test('/open/add-child sends visitors without the app to the explanation page, without a locale detour', async () => {
  const response = await fetch(`${origin}/open/add-child`, {redirect: 'manual'});
  assert.equal(response.status, 307);
  assert.equal(response.headers.get('location'), 'https://app.skill-quest.app/open/add-child');
});

test('a public tip pin exists as PNG and JPEG, a tip that is not public yet is a 404 in both', async () => {
  const {readFile} = await import('node:fs/promises');
  const en = JSON.parse(await readFile(new URL('../src/content/tips/en.json', import.meta.url), 'utf8'));
  const today = new Date().toISOString().slice(0, 10);
  const live = en.articles.find((article) => article.publishedAt <= today);
  const upcoming = en.articles.find((article) => article.publishedAt > today);
  for (const [extension, type] of [['png', 'image/png'], ['jpg', 'image/jpeg']]) {
    const response = await fetch(`${origin}/tips-pins/en/${live.slug}.${extension}`);
    assert.equal(response.status, 200, `${extension} of a public tip`);
    assert.equal(response.headers.get('content-type'), type);
    if (extension === 'jpg') {
      assert.deepEqual([...new Uint8Array(await response.arrayBuffer()).subarray(0, 2)], [0xff, 0xd8]);
    }
    if (upcoming) {
      const hidden = await fetch(`${origin}/tips-pins/en/${upcoming.slug}.${extension}`);
      assert.equal(hidden.status, 404, `${extension} of a tip before its publishedAt`);
      assert.equal(hidden.headers.get('cache-control'), 'no-store', `${extension} 404 is not cached`);
    }
  }
});

test('a public tip has carousel slides as JPEG, nothing outside the carousel and nothing before publication', async () => {
  const {readFile} = await import('node:fs/promises');
  const en = JSON.parse(await readFile(new URL('../src/content/tips/en.json', import.meta.url), 'utf8'));
  const today = new Date().toISOString().slice(0, 10);
  const live = en.articles.find((article) => article.publishedAt <= today);
  const upcoming = en.articles.find((article) => article.publishedAt > today);
  const last = live.sections.length + 2;
  for (const n of [1, 2, last]) {
    const response = await fetch(`${origin}/tips-slides/en/${live.slug}/${n}.jpg`);
    assert.equal(response.status, 200, `slide ${n}`);
    assert.equal(response.headers.get('content-type'), 'image/jpeg');
    assert.deepEqual([...new Uint8Array(await response.arrayBuffer()).subarray(0, 2)], [0xff, 0xd8]);
  }
  for (const n of [0, last + 1]) {
    const missing = await fetch(`${origin}/tips-slides/en/${live.slug}/${n}.jpg`);
    assert.equal(missing.status, 404, `slide ${n}`);
    assert.equal(missing.headers.get('cache-control'), 'no-store', `404 of slide ${n} is not cached`);
  }
  assert.equal((await fetch(`${origin}/tips-slides/nl/${live.slug}/1.jpg`)).status, 404);
  if (upcoming) {
    const hidden = await fetch(`${origin}/tips-slides/en/${upcoming.slug}/1.jpg`);
    assert.equal(hidden.status, 404);
    assert.equal(hidden.headers.get('cache-control'), 'no-store', 'a slide before publication is not cached as missing');
  }
});
