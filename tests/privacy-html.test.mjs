import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {normalizePrivacyHtml} from '../src/lib/privacy-html.mjs';

const LOCALES = ['nl', 'en', 'de', 'fr', 'es', 'it'];

function sections(locale) {
  const messages = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), 'utf8'));
  return Object.values(messages.privacy.sections).map((section) => section.content);
}

// What a reader sees: the text without tags, with the Markdown markers that
// the old page showed literally taken out and whitespace collapsed.
function visibleText(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#|]/g, ' ')
    .replace(/(^|\s)-{3,}(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

test('a Markdown heading inside a paragraph becomes a real heading', () => {
  assert.equal(normalizePrivacyHtml('<p>### 3.1 Website Analytics</p>'), '<h3>3.1 Website Analytics</h3>');
  assert.equal(normalizePrivacyHtml('<p>#### Detail</p>'), '<h4>Detail</h4>');
});

test('ordinary paragraphs and lists are left alone', () => {
  const html = '<p>We use <strong>Vercel</strong>.</p>\n<ul>\n<li>One #1 thing</li>\n</ul>\n<p>A | B is not a table</p>';
  assert.equal(normalizePrivacyHtml(html), html);
});

test('a rule on its own line is dropped', () => {
  assert.equal(normalizePrivacyHtml('<p>Before</p>\n<p>---</p>'), '<p>Before</p>');
});

test('a pipe table becomes a table with a header row', () => {
  const html = [
    '<p>Intro</p>',
    '<p>| Service | Location |</p>',
    '<p>|--------|:------:|</p>',
    '<p>| <strong>Supabase</strong> | US |</p>',
    '<p>| Aptabase | EU (Germany) |</p>',
    '<p>Outro</p>',
  ].join('\n');
  const result = normalizePrivacyHtml(html);

  assert.match(result, /^<p>Intro<\/p>\n<div style="overflow-x: auto;">\n<table /);
  assert.match(result, /<thead><tr><th scope="col">Service<\/th><th scope="col">Location<\/th><\/tr><\/thead>/);
  assert.match(result, /<tr><td><strong>Supabase<\/strong><\/td><td>US<\/td><\/tr>/);
  assert.match(result, /<tr><td>Aptabase<\/td><td>EU \(Germany\)<\/td><\/tr>/);
  assert.match(result, /<\/table>\n<\/div>\n<p>Outro<\/p>$/);
  assert.ok(!result.includes('|'));
  assert.ok(!result.includes('---'));
});

test('lines that do not form a proper table stay as they were', () => {
  const uneven = '<p>| a | b |</p>\n<p>| c |</p>';
  assert.equal(normalizePrivacyHtml(uneven), uneven);

  const headerOnly = '<p>| a | b |</p>\n<p>|---|---|</p>';
  assert.equal(normalizePrivacyHtml(headerOnly), headerOnly);
});

for (const locale of LOCALES) {
  test(`${locale}: the privacy policy has no Markdown left and loses no text`, () => {
    const before = sections(locale);
    const after = before.map(normalizePrivacyHtml);
    const joined = after.join('\n');

    assert.ok(!/<p>#{1,6} /.test(joined), 'a heading is still written with hashes');
    assert.ok(!/<p>\|/.test(joined), 'a table row is still written with pipes');
    assert.ok(!/<p>-{3,}<\/p>/.test(joined), 'a rule is still written with dashes');

    // The third-party table: one table, four columns, a row per service.
    assert.equal(joined.match(/<table /g)?.length, 1);
    assert.equal(joined.match(/<th scope="col">/g)?.length, 4);
    const expectedRows = before.join('\n').match(/<p>\|/g).length - 2;
    assert.equal(joined.match(/<tr><td>/g)?.length, expectedRows);
    assert.ok(joined.includes('<td><strong>Supabase</strong></td>'));

    // Every Markdown heading became an h3.
    assert.equal(joined.match(/<h3>/g)?.length, before.join('\n').match(/<p>### /g).length);

    // Nothing a reader could see went missing.
    before.forEach((html, index) => {
      assert.equal(visibleText(after[index]), visibleText(html));
    });
  });
}
