import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {normalizePrivacyHtml} from '../src/lib/privacy-html.mjs';

const LOCALES = ['nl', 'en', 'de', 'fr', 'es', 'it'];

function sections(locale) {
  const messages = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), 'utf8'));
  return Object.values(messages.privacy.sections);
}

function count(text, pattern) {
  return text.match(pattern)?.length ?? 0;
}

// Every character a reader sees: tags out, whitespace out. Nothing else is
// ignored, so a lost comma or euro sign shows up as well as a lost word.
function visible(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
}

// The three characters Markdown used as markers. They are compared by exact
// count in the per-language test, so the text comparison can leave them out.
function withoutMarkers(text) {
  return text.replace(/[#|-]/g, '');
}

const TABLE = [
  '<p>| Service | Location |</p>',
  '<p>|--------|:------:|</p>',
  '<p>| <strong>Supabase</strong> | US |</p>',
  '<p>| Aptabase | EU (Germany) |</p>',
];

test('a Markdown heading inside a paragraph becomes a real heading', () => {
  assert.equal(normalizePrivacyHtml('<p>### 3.1 Website Analytics</p>'), '<h3>3.1 Website Analytics</h3>');
  assert.equal(normalizePrivacyHtml('<p>#### Detail</p>'), '<h4>Detail</h4>');
});

test('a "##" heading is left alone: the section title is already the h2', () => {
  assert.equal(normalizePrivacyHtml('<p>## Section</p>'), '<p>## Section</p>');
  assert.equal(normalizePrivacyHtml('<p># Page</p>'), '<p># Page</p>');
});

test('ordinary paragraphs and lists are left alone', () => {
  const html = '<p>We use <strong>Vercel</strong>.</p>\n<ul>\n<li>One #1 thing</li>\n</ul>\n<p>A | B is not a table</p>\n<p>e-mail --- or not</p>';
  assert.equal(normalizePrivacyHtml(html), html);
});

test('a rule on its own line is dropped', () => {
  assert.equal(normalizePrivacyHtml('<p>Before</p>\n<p>---</p>'), '<p>Before</p>');
});

test('a pipe table becomes a table with a header row', () => {
  const result = normalizePrivacyHtml(['<p>Intro</p>', ...TABLE, '<p>Outro</p>'].join('\n'));

  assert.equal(
    result,
    [
      '<p>Intro</p>',
      '<div style="overflow-x: auto;">',
      '<table style="min-width: 34rem;">',
      '<thead><tr><th scope="col">Service</th><th scope="col">Location</th></tr></thead>',
      '<tbody>',
      '<tr><td><strong>Supabase</strong></td><td>US</td></tr>',
      '<tr><td>Aptabase</td><td>EU (Germany)</td></tr>',
      '</tbody>',
      '</table>',
      '</div>',
      '<p>Outro</p>',
    ].join('\n')
  );
});

test('a table can be the whole section, and a cell can be empty', () => {
  const result = normalizePrivacyHtml(['<p>| a | b |</p>', '<p>|---|---|</p>', '<p>| c | |</p>'].join('\n'));

  assert.match(result, /^<div style="overflow-x: auto;">\n<table /);
  assert.match(result, /<tr><td>c<\/td><td><\/td><\/tr>/);
  assert.match(result, /<\/table>\n<\/div>$/);
});

test('with a label the scrolling box is a named region a keyboard can reach', () => {
  const result = normalizePrivacyHtml(TABLE.join('\n'), {tableLabel: 'Services & "partners" <x>'});

  assert.match(
    result,
    /^<div role="region" aria-label="Services &amp; &quot;partners&quot; &lt;x&gt;" tabindex="0" style="overflow-x: auto;">/
  );
});

test('a blank label gives a plain box, not a focus stop without a name', () => {
  const result = normalizePrivacyHtml(TABLE.join('\n'), {tableLabel: '   '});

  assert.match(result, /^<div style="overflow-x: auto;">/);
});

test('a pipe inside a tag is not a cell border', () => {
  const result = normalizePrivacyHtml(
    ['<p>| Service | Link |</p>', '<p>|---|---|</p>', '<p>| Vercel | <a href="/x?a|b" title="A | B">more</a> |</p>'].join('\n')
  );

  assert.match(result, /<tr><td>Vercel<\/td><td><a href="\/x\?a\|b" title="A \| B">more<\/a><\/td><\/tr>/);
  assert.equal(count(result, /<td>/g), 2);
});

test('a ">" inside a quoted attribute does not end the tag', () => {
  const row = `<p>| Vercel | <a title="A > B | C" href='/x?a|b'>more</a> |</p>`;
  const result = normalizePrivacyHtml(['<p>| Service | Link |</p>', '<p>|---|---|</p>', row].join('\n'));

  assert.ok(result.includes(`<tr><td>Vercel</td><td><a title="A > B | C" href='/x?a|b'>more</a></td></tr>`));
  assert.equal(count(result, /<td>/g), 2);

  // The same row under a three-column header must not be read as three cells.
  const wide = ['<p>| a | b | c |</p>', '<p>|---|---|---|</p>', row].join('\n');
  assert.equal(normalizePrivacyHtml(wide), wide);
});

test('a "<" in plain text is not a tag', () => {
  const result = normalizePrivacyHtml(['<p>| Rule | Value |</p>', '<p>|---|---|</p>', '<p>| x < 5 | y > 2 |</p>'].join('\n'));

  assert.ok(result.includes('<tr><td>x < 5</td><td>y > 2</td></tr>'));
});

test('lines that are not exactly one table stay as they were', () => {
  const unchanged = [
    // no separator line under the header
    ['<p>| a | b |</p>', '<p>| c | d |</p>'],
    // a header and a separator, but no data
    ['<p>| a | b |</p>', '<p>|---|---|</p>'],
    // rows of different width
    ['<p>| a | b |</p>', '<p>|---|---|</p>', '<p>| c |</p>'],
    // a separator of the wrong width
    ['<p>| a | b |</p>', '<p>|---|</p>', '<p>| c | d |</p>'],
    // a pipe in plain text adds a cell, so the widths differ
    ['<p>| a | b |</p>', '<p>|---|---|</p>', '<p>| c | d | e |</p>'],
    // two tables run together, or a data row made of dashes: ambiguous
    ['<p>| a | b |</p>', '<p>|---|---|</p>', '<p>| c | d |</p>', '<p>| e | f |</p>', '<p>|---|---|</p>', '<p>| g | h |</p>'],
    ['<p>| a | b |</p>', '<p>|---|---|</p>', '<p>| c | d |</p>', '<p>| --- | --- |</p>'],
    // one column is a list, not a table
    ['<p>| a |</p>', '<p>|---|</p>', '<p>| b |</p>'],
  ];

  for (const lines of unchanged) {
    const html = lines.join('\n');
    assert.equal(normalizePrivacyHtml(html), html);
  }
});

test('the privacy page runs its sections through the normalizer and lets the table scroll in its own box', () => {
  const page = readFileSync(new URL('../src/app/[locale]/privacy/page.tsx', import.meta.url), 'utf8');

  assert.match(page, /normalizePrivacyHtml\(t\.raw\(`sections\.\$\{key\}\.content`\) as string, \{tableLabel: title\}\)/);
  // Without min-w-0 on the grid item the table widens the whole page on a phone.
  assert.match(page, /<article className="min-w-0 max-w-3xl">/);
});

for (const locale of LOCALES) {
  test(`${locale}: the privacy policy has no Markdown left and loses no text`, () => {
    const all = sections(locale);
    const before = all.map((section) => section.content);
    const after = all.map((section) => normalizePrivacyHtml(section.content, {tableLabel: section.title}));
    const source = before.join('\n');
    const joined = after.join('\n');

    const headingLines = source.match(/^<p>### .+<\/p>$/gm) ?? [];
    const tableLines = source.match(/^<p>\|.*\|<\/p>$/gm) ?? [];
    const ruleLines = source.match(/^<p>-{3,}<\/p>$/gm) ?? [];

    // What the policy contains today. If this changes, look at the page.
    assert.ok(headingLines.length > 0);
    assert.equal(ruleLines.length, 1);
    assert.ok(tableLines.length >= 3);

    assert.equal(count(joined, /<p>#{1,6} /g), 0, 'a heading is still written with hashes');
    assert.equal(count(joined, /<p>\|/g), 0, 'a table row is still written with pipes');
    assert.equal(count(joined, /<p>-{3,}<\/p>/g), 0, 'a rule is still written with dashes');

    // The third-party table: one table, four columns, a row per service, in a
    // box named after its section.
    assert.equal(count(joined, /<table /g), 1);
    assert.equal(count(joined, /<th scope="col">/g), 4);
    assert.equal(count(joined, /<tr><td>/g), tableLines.length - 2);
    assert.ok(joined.includes('<td><strong>Supabase</strong></td>'));
    const tableSection = all.find((section) => section.content.includes('<p>|'));
    assert.equal(count(joined, /<div role="region" aria-label="[^"]+" tabindex="0"/g), 1);
    assert.ok(joined.includes(`aria-label="${tableSection.title}"`));

    // Every Markdown heading became an h3 with the same text.
    assert.equal(count(joined, /<h3>/g), headingLines.length);
    for (const line of headingLines) {
      assert.ok(joined.includes(`<h3>${line.slice('<p>### '.length, -'</p>'.length)}</h3>`));
    }

    // Nothing a reader could see went missing: section by section the same
    // characters in the same order, the three marker characters aside ...
    before.forEach((html, index) => {
      assert.equal(withoutMarkers(visible(after[index])), withoutMarkers(visible(html)));
    });

    // ... and of those three, exactly the ones that were Markdown are gone.
    const seen = visible(source);
    const shown = visible(joined);
    const separator = tableLines[1];

    assert.equal(count(seen, /#/g) - count(shown, /#/g), headingLines.length * 3);
    assert.equal(count(seen, /\|/g) - count(shown, /\|/g), tableLines.join('').split('|').length - 1);
    assert.equal(count(seen, /-/g) - count(shown, /-/g), count(separator, /-/g) + count(ruleLines[0], /-/g));
  });
}
