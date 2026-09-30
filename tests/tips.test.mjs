import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';

const read = (path) => readFile(new URL(`../src/lib/${path}`, import.meta.url), 'utf8');

test('the footer shows tips exactly in the locales that have articles', async () => {
  const tips = await read('tips.ts');
  const nav = await read('tips-nav.ts');

  const articleLocales = new Set(
    [...tips.matchAll(/^\s{4}locale: '([a-z]{2})',$/gm)].map((match) => match[1])
  );
  const uiLocales = new Set(
    [...tips.slice(tips.indexOf('const uiCopy'), tips.indexOf('const articles'))
      .matchAll(/^\s{2}([a-z]{2}): \{$/gm)].map((match) => match[1])
  );
  const navLocales = new Set(
    [...nav.matchAll(/^\s{2}([a-z]{2}): '/gm)].map((match) => match[1])
  );

  assert.ok(articleLocales.size > 0, 'expected at least one article');
  assert.deepEqual(uiLocales, articleLocales);
  assert.deepEqual(navLocales, articleLocales);
});

test('tip meta descriptions fit in a search result', async () => {
  const tips = await read('tips.ts');
  const descriptions = [...tips.matchAll(/metaDescription:\s*'([^']+)'/g)].map(
    (match) => match[1]
  );

  assert.ok(descriptions.length > 0);
  for (const description of descriptions) {
    assert.ok(
      description.length <= 160,
      `${description.length} characters: ${description}`
    );
  }
});
