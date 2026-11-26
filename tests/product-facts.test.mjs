import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
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
  }
});

test('every screenshot comes from the current set and exists in every language', async () => {
  // The set of 29 October 2026 (the Google Play listing): no Rankings tab, 185
  // skills, no "streaks" in a caption. The two files below belonged to the old
  // set and showed the Rankings tab.
  const retired = ['05-rankings.png', '06-social-family.png'];
  // Only the current set is on disk: the old per-language folders are gone.
  assert.deepEqual(await readdir(new URL('public/screenshots/', root)), [marketing.SCREENSHOT_SET]);
  const used = new Set(marketing.screenshotNames);
  for (const locale of locales) {
    for (const page of features.getFeatureLandingPages(locale)) {
      used.add(page.screenshot);
    }
    assert.equal(
      marketing.getMarketingCopy(locale).product.captions.length,
      marketing.screenshotNames.length,
      `${locale}: one caption per screenshot`
    );
  }
  for (const name of retired) {
    assert.ok(!used.has(name), `${name} is retired`);
  }
  for (const source of ['src/components/MarketingPages.tsx', 'src/app/[locale]/parents/page.tsx']) {
    assert.doesNotMatch(await read(source), /05-rankings|06-social-family/, source);
  }
  for (const locale of locales) {
    for (const name of used) {
      const file = await readFile(new URL(`public/screenshots/${marketing.SCREENSHOT_SET}/${locale}/${name}`, root));
      // PNG header: width and height are the two 4-byte numbers from byte 16.
      assert.equal(file.readUInt32BE(16), 604, `${locale}/${name} width`);
      assert.equal(file.readUInt32BE(20), 1272, `${locale}/${name} height`);
    }
    for (const name of retired) {
      await assert.rejects(
        readFile(new URL(`public/screenshots/${marketing.SCREENSHOT_SET}/${locale}/${name}`, root)),
        {code: 'ENOENT'},
        `${locale}/${name}`
      );
    }
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
const rankingWords = /leaderboard|ranking|league|ranglijst|rangliste|classement|clasificaci|classific|\bligas?\b|\bligues?\b|\bligen\b|\bleghe\b/i;

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

// Premium locks only extra themes (PremiumFeatures.allFeatures in the app is
// [premiumThemes]). Timer techniques, your own duration, statistics, XP,
// levels, active days, friends and challenges are free. The catalog has 185
// skills.
const themeWord = {nl: /thema/i, en: /theme/i, de: /Design/, fr: /thème/i, es: /tema/i, it: /tem[ai]/i};

test('the pricing page names only extra themes under Premium, in every locale', () => {
  for (const locale of locales) {
    const {plans} = marketing.getMarketingCopy(locale).pricing;
    assert.deepEqual(plans.map((plan) => plan.name), ['Free', 'Premium', 'Family'], locale);
    const [free, premium, family] = plans;
    assert.equal(premium.features.length, 2, `${locale}: extra themes and everything in Free`);
    assert.match(premium.features[0], themeWord[locale], `${locale}: Premium is extra themes`);
    assert.match(premium.features[1], /Free/, `${locale}: plus everything in Free`);
    assert.doesNotMatch(
      JSON.stringify(premium),
      /statist|estad[ií]stic|timer|minuteur|temporizador|histor|verlauf|cronolog|unlimited|onbeperkt|unbegrenzt|illimit|ilimitad/i,
      `${locale}: Premium claims only themes`
    );
    assert.ok(free.features.some((f) => f.startsWith('185 ')), `${locale}: 185 skills`);
    assert.match(family.features.at(-1), /Premium/, `${locale}: Family includes the Premium themes`);
  }
});

test('no guide or pricing text says a timer technique, own duration or statistics need Premium', () => {
  const premiumClaim = [
    /Premium (?:unlocks|timer techniques|focus sessions)/i,
    /(?:Deeper|expanded) (?:insights|statistics) with Premium/i,
    /part of (?:the )?Premium/i,
    /belong to Premium/i,
    /Included with Premium/i
  ];
  for (const page of features.getFeatureLandingPages('en')) {
    for (const pattern of premiumClaim) {
      assert.doesNotMatch(JSON.stringify(page), pattern, `en/${page.slug}`);
    }
  }
  // Every locale: a text that names Premium must be about themes, or compare
  // it with Free or Family. "Premium unlocks every timer technique" fails.
  const strings = (value) =>
    typeof value === 'string' ? [value] : Object.values(value ?? {}).flatMap(strings);
  for (const locale of locales) {
    const texts = [
      ...features.getFeatureLandingPages(locale).flatMap(strings),
      ...strings(marketing.getMarketingCopy(locale).pricing),
      ...strings(marketing.getMarketingCopy(locale).featuresPage)
    ];
    for (const text of texts.filter((item) => /Premium/.test(item) && item !== 'Premium')) {
      assert.match(text, new RegExp(`${themeWord[locale].source}|Family|Free`, 'i'), `${locale}: ${text}`);
    }
  }
  for (const locale of locales) {
    const text = JSON.stringify(features.getFeatureLandingPages(locale)) +
      JSON.stringify(marketing.getMarketingCopy(locale));
    assert.doesNotMatch(text, /\b78\b/, `${locale}: the catalog has 185 skills, not 78`);
  }
});

test('the Deep Work guide sends visitors to the download page, not to Premium', async () => {
  const template = await read('src/app/[locale]/features/[slug]/page.tsx');
  assert.match(template, /if \(slug === 'family'\) return '\/pricing';/);
  assert.doesNotMatch(template, /deep-work-flowtime'\) return '\/pricing'/);
});

test('the support FAQ does not tie timer techniques or statistics to a plan', async () => {
  const support = await read('src/app/[locale]/support/page.tsx');
  assert.doesNotMatch(
    support,
    /depending on your plan|afhankelijk van je abonnement|je nach deinem Tarif|selon ta formule|dependiendo de tu plan|a seconda del tuo piano/
  );
  assert.doesNotMatch(support, /Premium adds more timer techniques|deeper statistics|meer timertechnieken/);
});

test('the language switcher sends an English-only guide to the guides list of the other language', async () => {
  const {languageSwitchTarget} = await loadModule('src/lib/language-switch.ts');
  const source = await read('src/lib/language-switch.ts');
  const listed = [...source.match(/englishOnlyGuideSlugs = \[([^\]]+)\]/)[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assert.deepEqual(listed, [...features.englishOnlyFeatureLandingSlugs], 'same list as feature-pages.ts');

  for (const slug of features.englishOnlyFeatureLandingSlugs) {
    for (const locale of locales.filter((item) => item !== 'en')) {
      assert.equal(languageSwitchTarget(`/en/features/${slug}`, locale), `/${locale}/guides`);
    }
    assert.equal(languageSwitchTarget(`/en/features/${slug}`, 'en'), `/en/features/${slug}`);
  }
  // Every other page keeps its path in the other language.
  assert.equal(languageSwitchTarget('/en/features/active-days', 'de'), '/de/features/active-days');
  assert.equal(languageSwitchTarget('/nl/pricing', 'fr'), '/fr/pricing');
  assert.equal(languageSwitchTarget('/nl', 'it'), '/it');
  assert.equal(languageSwitchTarget('/download', 'es'), '/es/download');
  // Edge cases: trailing slash, query or hash, a path without a locale prefix.
  assert.equal(languageSwitchTarget('/en/features/reading-timer/', 'nl'), '/nl/guides');
  assert.equal(languageSwitchTarget('/en/features/reading-timer?utm_source=x', 'de'), '/de/guides');
  assert.equal(languageSwitchTarget('/features/homework-timer', 'fr'), '/fr/guides');
  assert.equal(languageSwitchTarget('/en/pricing?ref=1#faq', 'it'), '/it/pricing?ref=1#faq');
  assert.equal(languageSwitchTarget('/', 'es'), '/es');

  const navbar = await read('src/components/Navbar.tsx');
  assert.match(navbar, /router\.push\(languageSwitchTarget\(pathname, newLocale\)\)/);
});

test('messages hold only what the site renders: the privacy and account-deletion pages', async () => {
  // The old landing-page keys (hero, howItWorks, painPoints, navbar, footer)
  // were rendered nowhere but still shipped to every visitor's browser, with
  // "78 skills", "unlock achievements" (the app has no achievements) and a
  // day-streak counter.
  for (const locale of locales) {
    const messages = JSON.parse(await read(`messages/${locale}.json`));
    assert.deepEqual(Object.keys(messages), ['privacy', 'deleteAccount'], locale);
    assert.doesNotMatch(JSON.stringify(messages.deleteAccount), /achievement|\b78\b/i, locale);
    assertNoStreak(JSON.stringify(messages.deleteAccount), `${locale} account deletion page`);
  }
});

test('the support page and the family guide state no minimum age of 13', async () => {
  // The terms and the privacy policy say SkillQuest is for adults and
  // children: below the age of consent of the country (13 to 16) a child needs
  // the permission of a parent. The FAQ answers used to say "aged 13 and up"
  // and "not designed or marketed as an app for young children".
  const support = await read('src/app/[locale]/support/page.tsx');
  const guides = await read('src/lib/feature-pages.ts');
  const oldClaims = [
    /aged 13 and up/i,
    /13 jaar en ouder/i,
    /ab 13 Jahren/i,
    /13 ans et plus/i,
    /a partir de 13 años/i,
    /13 años o más/i,
    /dai 13 anni in su/i,
    /not designed or marketed/i,
    /children under 13/i
  ];
  for (const claim of oldClaims) {
    assert.doesNotMatch(support, claim, 'support page');
    assert.doesNotMatch(guides, claim, 'feature guides');
  }
  // One answer per locale names the range of the age of consent.
  for (const range of ['13 en 16', '13 and 16', '13 und 16', '13 et 16', '13 y 16', '13 e 16']) {
    assert.ok(support.includes(range), `support page: ${range}`);
  }
  for (const range of ['13 tot 16', '13 to 16', '13 bis 16', '13 à 16', '13 a 16 años', '13 a 16 anni']) {
    assert.ok(guides.includes(range), `family guide: ${range}`);
  }
});
