import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

// Guards the app glossary (docs/TRANSLATION_DECISIONS_GLOSSARY.md in the app repo)
// for the French and Italian marketing copy that lives in TypeScript sources:
//   - French and Italian address the reader as "tu" (never vous/Lei/voi)
//   - "skill" is "compétence" (fr) and "abilità" (it, invariable)
//   - French says "minuteur", never "minuterie" or "chronomètre"
//   - the app calls the mode "mode invité" / "Modalità ospite", not "Guest Mode"
// Privacy, terms and messages/*.json are checked elsewhere (terms.test.mjs).

const FILES = [
  'src/lib/marketing.ts',
  'src/lib/feature-pages.ts',
  'src/lib/authI18n.ts',
  'src/app/[locale]/support/page.tsx',
  'src/app/[locale]/guides/page.tsx'
];

// A locale block starts at a line that opens it and ends at the next opener
// of any locale (or the end of the surrounding object).
const BLOCK_START = /^(?:pages\.(fr|it) = \{|  (fr|it): \{)\s*$/;
const BLOCK_END = /^(?:pages\.\w+ = |  (?:nl|en|de|fr|es|it): \{|\}|export )/;
const SKIP_LINE = /^\s*(?:slug|screenshot|import)\b|pages\.en/;

const FORBIDDEN = {
  fr: [
    {re: /\b(?:vous|votre|vos|veuillez)\b|-vous\b/i, why: 'use "tu" (tutoiement)'},
    {re: /\bminuteries?\b|\bchronomètres?\b/i, why: 'use "minuteur"'},
    {re: /\bGuest Mode\b|\bmode Invité\b/, why: 'use "mode invité"'}
  ],
  it: [
    {re: /\bcompetenz[ae]\b/i, why: 'use "abilità"'},
    {re: /(?<![-\w])skills?(?![-\w])/i, why: 'use "abilità"'},
    {re: /\b(?:Lei|voi)\b|\bSi (?:prega|consiglia)\b/, why: 'use "tu"'},
    {re: /\bGuest Mode\b|Modalità Ospite/, why: 'use "Modalità ospite"'},
    {re: /\b(?:la|una|alla|della|dalla|nella|sulla) abilità\b/i, why: 'elide: l’abilità, un’abilità'}
  ]
};

function localeBlocks(path) {
  const lines = readFileSync(path, 'utf8').replace(/\r/g, '').split('\n');
  const blocks = [];
  let current = null;
  lines.forEach((line, index) => {
    const start = line.match(BLOCK_START);
    if (start) {
      current = {locale: start[1] ?? start[2], lines: []};
      blocks.push(current);
      return;
    }
    if (current && BLOCK_END.test(line)) {
      current = null;
    }
    if (current && !SKIP_LINE.test(line)) {
      current.lines.push({number: index + 1, text: line});
    }
  });
  return blocks;
}

for (const file of FILES) {
  test(`${file} follows the fr/it glossary`, () => {
    const blocks = localeBlocks(file);
    assert.ok(
      blocks.some((block) => block.locale === 'fr') && blocks.some((block) => block.locale === 'it'),
      'expected French and Italian blocks'
    );
    const violations = [];
    for (const block of blocks) {
      for (const {number, text} of block.lines) {
        for (const {re, why} of FORBIDDEN[block.locale]) {
          if (re.test(text)) {
            violations.push(`${file}:${number} [${block.locale}] ${why}: ${text.trim().slice(0, 100)}`);
          }
        }
      }
    }
    assert.deepEqual(violations, []);
  });
}
