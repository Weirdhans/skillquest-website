import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {test} from 'node:test';

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
  for (const source of content.nl.articles) {
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
