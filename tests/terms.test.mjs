import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';

const locales = ['nl', 'en', 'de', 'fr', 'es', 'it'];
const dir = new URL('../src/content/terms/', import.meta.url);

async function load() {
  const entries = await Promise.all(
    locales.map(async (locale) => [
      locale,
      JSON.parse(await readFile(new URL(`${locale}.json`, dir), 'utf8'))
    ])
  );
  return Object.fromEntries(entries);
}

// Every text of a terms file in reading order, with the structure it came from.
function texts(copy) {
  const out = [];
  copy.sections.forEach((section, s) => {
    out.push({path: `sections[${s}].title`, section: s, value: section.title});
    section.blocks.forEach((block, b) => {
      if (block.type === 'p') {
        out.push({path: `sections[${s}].blocks[${b}]`, section: s, value: block.text});
      } else {
        block.items.forEach((item, i) => {
          if (item.lead) {
            out.push({path: `sections[${s}].blocks[${b}].items[${i}].lead`, section: s, value: item.lead});
          }
          out.push({path: `sections[${s}].blocks[${b}].items[${i}].text`, section: s, value: item.text});
        });
      }
    });
  });
  return out;
}

const link = /<a href="([^"]+)">/g;
const hrefs = (text) => [...text.matchAll(link)].map((match) => match[1]).sort();

test('all six languages have the same structure as the English source', async () => {
  const content = await load();
  const source = texts(content.en);
  assert.equal(content.en.sections.length, 15);

  for (const locale of locales) {
    const own = texts(content[locale]);
    assert.deepEqual(
      own.map((entry) => entry.path),
      source.map((entry) => entry.path),
      `${locale} has a different structure`
    );
    own.forEach((entry, index) => {
      assert.deepEqual(
        hrefs(entry.value),
        hrefs(source[index].value),
        `${locale}: links differ at ${entry.path}`
      );
    });
  }
});

test('texts contain no stray markup and every link goes somewhere real', async () => {
  const content = await load();

  for (const locale of locales) {
    const copy = content[locale];
    for (const entry of texts(copy)) {
      const withoutLinks = entry.value.replace(/<a href="[^"]+">[^<]*<\/a>/g, '');
      assert.doesNotMatch(withoutLinks, /[<]|&lt;|&gt;|&amp;/, `${locale}: ${entry.path}`);
      assert.equal(
        (entry.value.match(/<a /g) ?? []).length,
        (entry.value.match(/<\/a>/g) ?? []).length,
        `${locale}: unbalanced link at ${entry.path}`
      );
      for (const href of hrefs(entry.value)) {
        const ok =
          /^\/(privacy|community-guidelines|delete-account)$/.test(href) ||
          /^#s-([1-9]|1[0-5])$/.test(href) ||
          href === 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
        assert.ok(ok, `${locale}: unexpected link ${href} at ${entry.path}`);
      }
    }
  }
});

test('every language names the provider and the contact address', async () => {
  const content = await load();

  for (const locale of locales) {
    const [first] = content[locale].sections;
    const firstText = first.blocks.map((block) => block.text ?? '').join(' ');
    assert.match(firstText, /Johannes Willem Vlasblom/, locale);
    assert.match(firstText, /42188670/, locale);
    assert.match(firstText, /Zenith Reborn/, locale);
    assert.match(firstText, /hello@skill-quest\.app/, locale);

    const last = content[locale].sections.at(-1);
    assert.match(last.blocks.map((block) => block.text ?? '').join(' '), /hello@skill-quest\.app/, locale);
  }
});

test('page metadata is complete and fits the search result', async () => {
  const content = await load();

  for (const locale of locales) {
    const copy = content[locale];
    assert.equal(copy.locale, locale);
    assert.match(copy.updated, /^\d{4}-\d{2}-\d{2}$/, locale);
    assert.ok(copy.heading && copy.lastUpdatedLabel, locale);
    assert.ok(copy.metaTitle.endsWith(' | SkillQuest'), locale);
    assert.ok(copy.metaDescription.length > 40 && copy.metaDescription.length <= 160, locale);
  }
});

test('the app glossary rules hold in the translations', async () => {
  const content = await load();
  const forbidden = {
    nl: /\b(u|uw)\b/i,
    de: /\b(Fertigkeit\w*|Geschicklichkeit|Kompetenz\w*|Sie|Ihr\w*|Ihnen)\b/,
    fr: /\b(habilet\w*|aptitude\w*|vous|votre|vos|minuterie)\b/i,
    es: /\b(competencias?|usted\w*|desafíos?)\b/i,
    it: /\b(competenz\w*|capacità|Lei|Suo|Sua)\b/
  };

  for (const [locale, pattern] of Object.entries(forbidden)) {
    for (const entry of texts(content[locale])) {
      assert.doesNotMatch(entry.value, pattern, `${locale}: ${entry.path}`);
    }
  }
});

test('the menu path to delete an account matches the app in every language', async () => {
  const content = await load();
  const path = {
    nl: 'Instellingen > Account verwijderen',
    en: 'Settings > Delete account',
    de: 'Einstellungen > Konto löschen',
    fr: 'Paramètres > Supprimer le compte',
    es: 'Ajustes > Eliminar cuenta',
    it: 'Impostazioni > Elimina account'
  };

  for (const locale of locales) {
    const account = content[locale].sections[2].blocks[0].items.map((item) => item.text).join(' ');
    assert.ok(account.includes(path[locale]), `${locale}: ${path[locale]}`);
  }
});

test('the terms page is in the sitemap and linked from the footer in every language', async () => {
  const sitemap = await readFile(new URL('../src/app/sitemap.ts', import.meta.url), 'utf8');
  const footer = await readFile(new URL('../src/components/Footer.tsx', import.meta.url), 'utf8');
  const marketing = await readFile(new URL('../src/lib/marketing.ts', import.meta.url), 'utf8');

  assert.match(sitemap, /'\/terms'/);
  assert.match(footer, /href="\/terms"/);
  assert.equal((marketing.match(/^\s{6}terms: '/gm) ?? []).length, 6);
});
