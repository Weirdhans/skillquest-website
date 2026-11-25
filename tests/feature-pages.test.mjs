import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import ts from 'typescript';

// Loads src/lib/feature-pages.ts and src/lib/marketing.ts as real modules: the
// TypeScript is transpiled and their only runtime import, '@/i18n/routing', is
// replaced by the locales and default locale read from src/i18n/routing.ts.
// next-intl itself is not loaded.

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const routingSource = await read('src/i18n/routing.ts');
const locales = [...routingSource.match(/locales: \[([^\]]+)\]/)[1].matchAll(/'([a-z]{2})'/g)].map((m) => m[1]);
const defaultLocale = routingSource.match(/defaultLocale: '([a-z]{2})'/)[1];
const routingStub = `export const routing = ${JSON.stringify({locales, defaultLocale})};`;

async function loadModule(path) {
  const {outputText} = ts.transpileModule(await read(path), {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022}
  });
  const imports = [...outputText.matchAll(/^import .* from '([^']+)';$/gm)].map((m) => m[1]);
  assert.deepEqual(imports, ['@/i18n/routing'], `${path} has no other runtime imports`);
  const code = outputText.replace(
    "from '@/i18n/routing'",
    `from 'data:text/javascript,${encodeURIComponent(routingStub)}'`
  );
  return import(`data:text/javascript,${encodeURIComponent(code)}`);
}

const features = await loadModule('src/lib/feature-pages.ts');
const marketing = await loadModule('src/lib/marketing.ts');

const englishOnly = ['reading-timer', 'homework-timer'];
const translated = [
  'focus-timer',
  'family',
  'skill-tracker',
  'progress-statistics',
  'pomodoro-timer',
  'streaks',
  'friends-challenges',
  'study-timer',
  'deep-work-flowtime',
  'leaderboards',
  'themes',
  'guest-mode'
];
const otherLocales = locales.filter((locale) => locale !== 'en');
const site = 'https://www.skill-quest.app';

test('the routing stub has the six site locales and nl as default', () => {
  assert.deepEqual(locales, ['nl', 'en', 'de', 'fr', 'es', 'it']);
  assert.equal(defaultLocale, 'nl');
});

test('the two app-search guides exist in English only', () => {
  assert.deepEqual([...features.englishOnlyFeatureLandingSlugs], englishOnly);
  for (const slug of englishOnly) {
    assert.deepEqual([...features.featureLandingLocales(slug)], ['en']);
    const page = features.getFeatureLandingPage('en', slug);
    assert.ok(page, `${slug} renders in en`);
    assert.equal(page.slug, slug);
    for (const locale of otherLocales) {
      assert.equal(features.getFeatureLandingPage(locale, slug), null, `${slug} is a 404 in ${locale}`);
    }
  }
});

test('the twelve translated guides still exist in every locale', () => {
  assert.deepEqual([...features.translatedFeatureLandingSlugs], translated);
  for (const slug of translated) {
    assert.deepEqual([...features.featureLandingLocales(slug)], locales);
    for (const locale of locales) {
      assert.equal(features.getFeatureLandingPage(locale, slug)?.slug, slug, `${slug} in ${locale}`);
    }
  }
  assert.equal(features.getFeatureLandingPage('en', 'does-not-exist'), null);
});

test('static params contain the English-only slugs for en only', () => {
  const params = features.featureLandingStaticParams();
  const expected = locales.flatMap((locale) => [
    ...translated.map((slug) => ({locale, slug})),
    ...(locale === 'en' ? englishOnly.map((slug) => ({locale, slug})) : [])
  ]);
  assert.deepEqual(params, expected);
  for (const locale of otherLocales) {
    for (const slug of englishOnly) {
      assert.ok(!params.some((item) => item.locale === locale && item.slug === slug), `${locale}/${slug}`);
    }
  }
});

test('the guides list shows the new guides in English and nowhere else', () => {
  assert.deepEqual(
    features.getFeatureLandingPages('en').map((page) => page.slug),
    [...translated, ...englishOnly]
  );
  for (const locale of otherLocales) {
    assert.deepEqual(features.getFeatureLandingPages(locale).map((page) => page.slug), translated, locale);
    assert.deepEqual(features.getFeatureLandingSlugs(locale), translated, locale);
  }
});

test('the featured grid on the homepage and /features stays the four flagship guides', () => {
  for (const locale of locales) {
    assert.deepEqual(
      features.getFeaturedFeatureLandingPages(locale).map((page) => page.slug),
      ['focus-timer', 'family', 'skill-tracker', 'progress-statistics'],
      locale
    );
  }
});

test('the related guides under a page are unchanged for the translated guides', () => {
  // The template shows the first three other guides; appending the English-only
  // guides must not change that for any existing page.
  for (const locale of locales) {
    for (const slug of translated) {
      const related = features
        .getFeatureLandingPages(locale)
        .filter((page) => page.slug !== slug)
        .slice(0, 3)
        .map((page) => page.slug);
      assert.deepEqual(related, translated.filter((item) => item !== slug).slice(0, 3), `${locale} ${slug}`);
    }
  }
});

test('the new guides link to neither streaks nor leaderboards', () => {
  for (const slug of englishOnly) {
    const related = features
      .getFeatureLandingPages('en')
      .filter((page) => page.slug !== slug)
      .slice(0, 3)
      .map((page) => page.slug);
    assert.ok(!related.includes('streaks') && !related.includes('leaderboards'), `${slug}: ${related}`);
  }
});

test('hreflang of an English-only guide lists en and x-default only', () => {
  const path = '/features/reading-timer';
  assert.deepEqual(marketing.alternateLanguages(path, ['en']), {
    'en-US': `${site}/en${path}`,
    'x-default': `${site}/en${path}`
  });

  const metadata = marketing.createPageMetadata({
    locale: 'en',
    path,
    title: 't',
    description: 'd',
    locales: features.featureLandingLocales('reading-timer')
  });
  assert.equal(metadata.alternates.canonical, `${site}/en${path}`);
  assert.deepEqual(metadata.alternates.languages, {
    'en-US': `${site}/en${path}`,
    'x-default': `${site}/en${path}`
  });
  assert.deepEqual(metadata.openGraph.alternateLocale, []);
});

test('hreflang of every other page is unchanged: six locales plus x-default to nl', () => {
  const path = '/features/focus-timer';
  const expected = {
    'nl-NL': `${site}/nl${path}`,
    'en-US': `${site}/en${path}`,
    'de-DE': `${site}/de${path}`,
    'fr-FR': `${site}/fr${path}`,
    'es-ES': `${site}/es${path}`,
    'it-IT': `${site}/it${path}`,
    'x-default': `${site}/nl${path}`
  };
  assert.deepEqual(marketing.alternateLanguages(path), expected);
  assert.deepEqual(Object.keys(marketing.alternateLanguages(path)), Object.keys(expected), 'same order');

  const metadata = marketing.createPageMetadata({locale: 'de', path, title: 't', description: 'd'});
  assert.deepEqual(metadata.alternates.languages, expected);
  assert.deepEqual(metadata.openGraph.alternateLocale, ['nl_NL', 'en_US', 'fr_FR', 'es_ES', 'it_IT']);
});

test('the template, sitemap and guides use the per-guide locales', async () => {
  const template = await read('src/app/[locale]/features/[slug]/page.tsx');
  assert.match(template, /return featureLandingStaticParams\(\);/);
  assert.match(template, /locales: featureLandingLocales\(page\.slug\)/);
  assert.match(template, /if \(!page\) \{\s*notFound\(\);/);
  assert.match(template, /if \(slug === 'reading-timer' \|\| slug === 'homework-timer'\) return '\/parents';/);

  const sitemap = await read('src/app/sitemap.ts');
  assert.match(sitemap, /getFeatureLandingSlugs\(locale\)/);
  assert.match(sitemap, /locales: featureLandingLocales\(slug\)/);
  assert.match(sitemap, /alternateLanguages\(route, locales\)/);

  const guides = await read('src/app/[locale]/guides/page.tsx');
  assert.match(guides, /const pages = getFeatureLandingPages\(safeLocale\);/);
});

test('the copy of the new guides follows the rules for app-search pages', async () => {
  const marketingSource = await read('src/lib/marketing.ts');
  const familyMonthly = marketingSource.match(/familyMonthly: ([\d.]+)/)[1];
  const familyYearly = marketingSource.match(/familyYearly: ([\d.]+)/)[1];

  for (const slug of englishOnly) {
    const page = features.getFeatureLandingPage('en', slug);
    assert.ok(page.metaTitle.length <= 60, `${slug} metaTitle: ${page.metaTitle.length}`);
    assert.ok(page.metaDescription.length <= 155, `${slug} metaDescription: ${page.metaDescription.length}`);
    assert.equal(page.sections.length, 3);
    assert.ok(page.faq.length >= 4 && page.faq.length <= 5, `${slug} has ${page.faq.length} FAQ items`);

    const mainPhrase = slug === 'reading-timer' ? /reading timer/i : /homework timer/i;
    for (const field of ['title', 'metaTitle', 'metaDescription']) {
      assert.match(page[field], mainPhrase, `${slug} ${field} has the main phrase`);
    }

    const text = JSON.stringify(page);
    // The app has active days, not streaks, and children's accounts have no rankings.
    assert.doesNotMatch(text, /streak|leaderboard|ranking|league/i, slug);
    assert.doesNotMatch(text, /ADHD|grades? (?:improve|go up)|better grades|study shows|research/i, slug);
    assert.doesNotMatch(text, /count[- ]up|stopwatch/i, `${slug}: the timer counts down`);
    assert.match(text, /10 minutes/, `${slug} names the 10-minute default`);

    // Family prices follow PRICE_AMOUNTS.
    for (const price of text.match(/EUR [\d.]+/g) ?? []) {
      assert.ok([`EUR ${familyMonthly}`, `EUR ${familyYearly}`].includes(price), `${slug}: ${price}`);
    }
  }
});
