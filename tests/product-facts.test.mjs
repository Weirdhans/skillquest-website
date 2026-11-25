import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import ts from 'typescript';

// The website must say what the app does (checked against the app on
// 25 November 2026): the app counts active days and has no streaks or streak
// freezes. These tests scan the marketing sources that describe the product.
// Out of scope on purpose: src/content/terms, the privacy texts in
// messages/*.json, and blog and tips articles (they may discuss streaks as a
// general idea, and the ones that mention SkillQuest say it has none).

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
  const code = outputText.replace(
    "from '@/i18n/routing'",
    `from 'data:text/javascript,${encodeURIComponent(routingStub)}'`
  );
  return import(`data:text/javascript,${encodeURIComponent(code)}`);
}

const features = await loadModule('src/lib/feature-pages.ts');
const marketing = await loadModule('src/lib/marketing.ts');

// The word for a streak per language. French "une série de" and Italian
// "una serie di" mean "a range of" and are not about streaks.
const streakWords = [
  /streak/i,
  /\bracha/i,
  /\bséries?\b(?! de )/i,
  /\bserien?\b(?! di )/i
];

function assertNoStreak(text, label) {
  for (const pattern of streakWords) {
    assert.doesNotMatch(text, pattern, `${label} mentions a streak (${pattern})`);
  }
}

test('no guide, in any locale, says the app has streaks', () => {
  for (const locale of locales) {
    for (const page of features.getFeatureLandingPages(locale)) {
      assertNoStreak(JSON.stringify(page), `${locale}/features/${page.slug}`);
    }
  }
});

test('the marketing copy of every locale has no streaks', () => {
  for (const locale of locales) {
    assertNoStreak(JSON.stringify(marketing.getMarketingCopy(locale)), `marketing ${locale}`);
  }
});

test('the support page, welcome mail and parents page have no streaks', async () => {
  for (const path of [
    'src/app/[locale]/support/page.tsx',
    'src/lib/email-templates.mjs',
    'src/lib/parents-page.ts'
  ]) {
    assertNoStreak(await read(path), path);
  }
});

test('the streaks guide became the active-days guide in every locale', () => {
  assert.ok(features.translatedFeatureLandingSlugs.includes('active-days'));
  assert.ok(!features.translatedFeatureLandingSlugs.includes('streaks'));
  const terms = {
    nl: /actieve dag/i,
    en: /active day/i,
    de: /aktive[nr]? Tag/i,
    fr: /jours? actifs?/i,
    es: /días? activos?/i,
    it: /giorn[oi] attiv[oi]/i
  };
  for (const locale of locales) {
    assert.equal(features.getFeatureLandingPage(locale, 'streaks'), null, `${locale} streaks is gone`);
    const page = features.getFeatureLandingPage(locale, 'active-days');
    assert.equal(page?.slug, 'active-days', locale);
    assert.equal(page.sections.length, 3, locale);
    assert.equal(page.faq.length, 3, locale);
    assert.match(page.title, terms[locale], `${locale} title uses the app's own term`);
    assert.match(JSON.stringify(page), /10/, `${locale} names the 10-minute threshold`);
    // Not the session-reward screenshot: its caption says "keep streaks".
    assert.notEqual(page.screenshot, '03-session-reward.png', locale);
  }
});

test('no page uses the screenshot whose caption says "keep streaks"', () => {
  assert.ok(!marketing.screenshotNames.includes('03-session-reward.png'));
  for (const locale of locales) {
    for (const page of features.getFeatureLandingPages(locale)) {
      assert.notEqual(page.screenshot, '03-session-reward.png', `${locale}/${page.slug}`);
    }
    assert.equal(
      marketing.getMarketingCopy(locale).product.captions.length,
      marketing.screenshotNames.length,
      `${locale}: one caption per screenshot`
    );
  }
});

test('/{locale}/features/streaks redirects permanently to the active-days guide', async () => {
  const config = await import(new URL('next.config.js', root));
  const redirects = await (config.default ?? config).redirects();
  for (const locale of locales) {
    const rule = redirects.find((item) => item.source === `/${locale}/features/streaks`);
    assert.ok(rule, locale);
    assert.equal(rule.destination, `/${locale}/features/active-days`);
    assert.equal(rule.permanent, true);
  }
});

test('internal links point to active-days, never to streaks', async () => {
  const template = await read('src/app/[locale]/features/[slug]/page.tsx');
  assert.doesNotMatch(template, /features\/streaks/);
  assert.match(template, /if \(slug === 'themes'\) return '\/features\/active-days';/);
  const guides = await read('src/app/[locale]/guides/page.tsx');
  assert.match(guides, /'active-days': 'progress'/);
  assert.doesNotMatch(guides, /\bstreaks:/);
});

// Rankings are switched off in the app (AppFeatureFlags.rankingsEnabled is
// false). Friends and challenges exist. "Ranglijst", "Rangliste",
// "classement", "clasificación" and "classifica" are the words per language.
const rankingWords = /leaderboard|ranking|league|ranglijst|rangliste|classement|clasificaci|classific|ligas?|ligues?|leghe/i;

test('the leaderboards guide is gone in every locale', () => {
  assert.ok(!features.translatedFeatureLandingSlugs.includes('leaderboards'));
  for (const locale of locales) {
    assert.equal(features.getFeatureLandingPage(locale, 'leaderboards'), null, locale);
  }
});

test('no guide, marketing copy, support text, welcome mail or parents page claims rankings', async () => {
  for (const locale of locales) {
    for (const page of features.getFeatureLandingPages(locale)) {
      assert.doesNotMatch(JSON.stringify(page), rankingWords, `${locale}/features/${page.slug}`);
      assert.notEqual(page.screenshot, '05-rankings.png', `${locale}/${page.slug}`);
    }
    assert.doesNotMatch(JSON.stringify(marketing.getMarketingCopy(locale)), rankingWords, `marketing ${locale}`);
  }
  assert.ok(!marketing.screenshotNames.includes('05-rankings.png'));
  for (const path of [
    'src/app/[locale]/support/page.tsx',
    'src/lib/email-templates.mjs',
    'src/lib/parents-page.ts',
    'src/app/[locale]/features/[slug]/page.tsx',
    'src/app/[locale]/guides/page.tsx'
  ]) {
    assert.doesNotMatch(await read(path), rankingWords, path);
  }
});
