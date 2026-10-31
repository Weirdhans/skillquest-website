import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {test} from 'node:test';
import {isPublished, utcDay} from '../src/lib/tips-publication.mjs';

const contentDir = new URL('../src/content/tips/', import.meta.url);

async function loadContent() {
  const files = (await readdir(contentDir)).filter((file) => file.endsWith('.json'));
  const entries = await Promise.all(
    files.map(async (file) => [
      file.replace('.json', ''),
      JSON.parse(await readFile(new URL(file, contentDir), 'utf8'))
    ])
  );
  return Object.fromEntries(entries);
}

test('the footer shows tips exactly in the locales that have articles', async () => {
  const content = await loadContent();
  const nav = await readFile(new URL('../src/lib/tips-nav.ts', import.meta.url), 'utf8');
  const labels = Object.fromEntries(
    [...nav.matchAll(/^\s{2}([a-z]{2}): '([^']+)'/gm)].map((match) => [match[1], match[2]])
  );

  const withArticles = Object.keys(content)
    .filter((locale) => content[locale].articles.length > 0)
    .sort();

  assert.ok(withArticles.length > 0, 'expected at least one article');
  assert.deepEqual(Object.keys(labels).sort(), withArticles);
  for (const locale of withArticles) {
    assert.equal(labels[locale], content[locale].ui.eyebrow, `${locale} nav label`);
  }
});

test('every language version of an article exists with its own slug', async () => {
  const content = await loadContent();
  for (const source of content.en.articles) {
    for (const [locale, slug] of Object.entries(source.slugs)) {
      const version = content[locale]?.articles.find((item) => item.id === source.id);
      assert.ok(version, `${source.id} is missing in ${locale}`);
      assert.equal(version.slug, slug, `${source.id} slug in ${locale}`);
    }
  }
});

test('tip meta descriptions fit in a search result', async () => {
  const content = await loadContent();
  for (const [locale, {ui, articles}] of Object.entries(content)) {
    assert.ok(ui.readingTime.includes('{minutes}'), `${locale} readingTime placeholder`);
    for (const article of articles) {
      assert.ok(
        article.metaDescription.length <= 160,
        `${locale} ${article.id}: ${article.metaDescription.length} characters`
      );
    }
  }
});

test('an article is public from 00:00 UTC on its publishedAt date', () => {
  const article = {publishedAt: '2026-12-02'};

  assert.equal(isPublished(article, new Date('2026-12-01T12:00:00Z')), false, 'day before');
  assert.equal(isPublished(article, new Date('2026-12-01T23:59:59.999Z')), false, 'last millisecond before');
  assert.equal(isPublished(article, new Date('2026-12-02T00:00:00.000Z')), true, 'first millisecond');
  assert.equal(isPublished(article, new Date('2026-12-02T23:59:59.999Z')), true, 'still the same day');
  assert.equal(isPublished(article, new Date('2027-06-01T00:00:00Z')), true, 'long after');
});

test('the publication day follows UTC, not the local time zone', () => {
  const article = {publishedAt: '2026-12-02'};

  // 01:00 in Amsterdam (UTC+1) is midnight UTC, so the article is public.
  assert.equal(isPublished(article, new Date('2026-12-02T01:00:00+01:00')), true);
  // 00:59 in Amsterdam is 23:59 UTC the day before.
  assert.equal(isPublished(article, new Date('2026-12-02T00:59:00+01:00')), false);
  // 18:00 on 1 December in Los Angeles (UTC-8) is already 2 December in UTC.
  assert.equal(isPublished(article, new Date('2026-12-01T18:00:00-08:00')), true);
  assert.equal(utcDay(new Date('2026-12-01T18:00:00-08:00')), '2026-12-02');
});

test('a publishedAt that is not a plain date never publishes an article', () => {
  const now = new Date('2030-01-01T00:00:00Z');
  for (const publishedAt of ['', '2026-12-2', '2026-12-02T08:00:00Z', 'tomorrow', undefined]) {
    assert.equal(isPublished({publishedAt}, now), false, String(publishedAt));
  }
});

test('every article has a valid publishedAt, the same day in all languages once it is upcoming', async () => {
  const content = await loadContent();
  for (const source of content.en.articles) {
    assert.match(source.publishedAt, /^\d{4}-\d{2}-\d{2}$/, `${source.id} publishedAt`);
    assert.ok(!Number.isNaN(Date.parse(`${source.publishedAt}T00:00:00Z`)), `${source.id} is a real date`);
    for (const [locale, {articles}] of Object.entries(content)) {
      const version = articles.find((item) => item.id === source.id);
      assert.ok(version, `${source.id} is missing in ${locale}`);
      // child-wont-do-homework has been public since before the stock was added;
      // its nl date (9 October) differs from en (7 October) and is left alone.
      if (source.publishedAt > '2026-10-31') {
        assert.equal(version.publishedAt, source.publishedAt, `${source.id} publishedAt in ${locale}`);
      }
    }
  }
});

test('the articles that were already live stay public', async () => {
  const content = await loadContent();
  const live = ['child-reluctant-reader', 'child-wont-practice-instrument', 'child-wont-do-homework'];
  // Checked at a fixed moment after the stock was added, and at the date of the
  // deploy before it: the three original articles are public both times.
  for (const now of [new Date('2026-10-31T00:00:00Z'), new Date('2027-03-01T00:00:00Z')]) {
    for (const [locale, {articles}] of Object.entries(content)) {
      for (const id of live) {
        const article = articles.find((item) => item.id === id);
        assert.ok(article, `${id} is missing in ${locale}`);
        assert.equal(isPublished(article, now), true, `${locale} ${id} at ${now.toISOString()}`);
      }
    }
  }
});

test('the stock is hidden before and visible after its publishedAt day', async () => {
  const content = await loadContent();
  const stock = content.en.articles.filter((item) => item.publishedAt > '2026-10-31');
  assert.ok(stock.length > 0, 'expected articles dated after 31 October 2026');
  for (const [locale, {articles}] of Object.entries(content)) {
    for (const source of stock) {
      const article = articles.find((item) => item.id === source.id);
      const before = new Date(`${source.publishedAt}T00:00:00Z`);
      before.setUTCMilliseconds(-1);
      assert.equal(isPublished(article, before), false, `${locale} ${source.id} just before`);
      assert.equal(isPublished(article, new Date(`${source.publishedAt}T00:00:00Z`)), true, `${locale} ${source.id} at midnight`);
    }
  }
});

test('only src/lib/tips.ts reads the tips content, so every page sees the filter', async () => {
  const sourceDir = new URL('../src/', import.meta.url);
  const offenders = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, {withFileTypes: true})) {
      const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
      if (entry.isDirectory()) {
        await walk(url);
      } else if (/\.(ts|tsx|mjs|js)$/.test(entry.name) && !url.pathname.endsWith('/src/lib/tips.ts')) {
        if ((await readFile(url, 'utf8')).includes('content/tips')) offenders.push(url.pathname);
      }
    }
  }
  await walk(sourceDir);
  assert.deepEqual(offenders, []);
});

test('the pages, feeds, pin images and sitemap with tips are revalidated hourly', async () => {
  const files = [
    '../src/app/[locale]/tips/page.tsx',
    '../src/app/[locale]/tips/[slug]/page.tsx',
    '../src/app/feeds/[file]/route.ts',
    '../src/app/tips-pins/[locale]/[file]/route.tsx',
    '../src/app/sitemap.ts'
  ];
  for (const file of files) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8');
    assert.match(source, /export const revalidate = 3600;/, `${file} revalidate`);
  }
  // A pin image of an article that goes live later must be buildable on request.
  const pins = await readFile(new URL(files[3], import.meta.url), 'utf8');
  assert.match(pins, /export const dynamicParams = true/);
});
