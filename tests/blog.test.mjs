import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {test} from 'node:test';
import {isPublished} from '../src/lib/tips-publication.mjs';

const contentDir = new URL('../src/content/blog/', import.meta.url);
const tipsDir = new URL('../src/content/tips/', import.meta.url);
const locales = ['nl', 'en', 'de', 'fr', 'es', 'it'];

async function loadJson(dir) {
  const entries = await Promise.all(
    locales.map(async (locale) => [locale, JSON.parse(await readFile(new URL(`${locale}.json`, dir), 'utf8'))])
  );
  return Object.fromEntries(entries);
}

const blog = await loadJson(contentDir);
const tips = await loadJson(tipsDir);

/** All text of an article, one string per field. */
function texts(article) {
  return [
    article.title,
    article.metaTitle,
    article.metaDescription,
    article.intro,
    article.cardSummary,
    article.body,
    article.faqHeading,
    ...article.faq.flatMap((item) => [item.question, item.answer])
  ];
}

// Order of publication, one article a week from 5 November 2026. The Habitica
// comparison comes last because it links to three of the others.
const schedule = [
  ['best-pomodoro-app-for-students', '2026-11-05'],
  ['pomodoro-vs-deep-work-vs-flowtime', '2026-11-12'],
  ['family-screen-time-alternative', '2026-11-19'],
  ['how-parent-managed-timers-work', '2026-11-26'],
  ['skillquest-vs-habitica', '2026-12-03']
];

test('the footer shows the blog exactly in the locales that have articles', async () => {
  const nav = await readFile(new URL('../src/lib/blog-nav.ts', import.meta.url), 'utf8');
  const labels = Object.fromEntries(
    [...nav.matchAll(/^\s{2}([a-z]{2}): '([^']+)'/gm)].map((match) => [match[1], match[2]])
  );
  const withArticles = locales.filter((locale) => blog[locale].articles.length > 0).sort();

  assert.deepEqual(Object.keys(labels).sort(), withArticles);
  for (const locale of withArticles) {
    assert.equal(labels[locale], blog[locale].ui.eyebrow, `${locale} nav label`);
  }
});

test('every article exists in all six languages with a unique slug per language', () => {
  for (const [id] of schedule) {
    for (const locale of locales) {
      assert.ok(blog[locale].articles.find((item) => item.id === id), `${id} is missing in ${locale}`);
    }
  }
  for (const locale of locales) {
    const slugs = blog[locale].articles.map((item) => item.slug);
    assert.equal(blog[locale].articles.length, schedule.length, `${locale} article count`);
    assert.equal(new Set(slugs).size, slugs.length, `${locale} slugs are unique`);
    for (const slug of slugs) {
      assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${locale} slug ${slug}`);
    }
  }
});

test('titles and descriptions fit in a search result', () => {
  for (const locale of locales) {
    assert.ok(blog[locale].ui.readingTime.includes('{minutes}'), `${locale} readingTime placeholder`);
    for (const article of blog[locale].articles) {
      assert.ok(article.metaTitle.length <= 60, `${locale} ${article.id} metaTitle: ${article.metaTitle.length}`);
      assert.ok(article.metaDescription.length <= 160, `${locale} ${article.id} metaDescription: ${article.metaDescription.length}`);
      assert.equal(article.faq.length, 5, `${locale} ${article.id} faq`);
    }
  }
});

test('the comparison with Habitica has Habitica in its title in every language', () => {
  for (const locale of locales) {
    const article = blog[locale].articles.find((item) => item.id === 'skillquest-vs-habitica');
    assert.match(article.title, /Habitica/, `${locale} title`);
    assert.match(article.metaTitle, /Habitica/, `${locale} metaTitle`);
  }
});

test('the schedule is one article a week from 5 November, the same day in every language', () => {
  for (const [id, date] of schedule) {
    for (const locale of locales) {
      const article = blog[locale].articles.find((item) => item.id === id);
      assert.equal(article.publishedAt, date, `${locale} ${id}`);
    }
  }
  const days = schedule.map(([, date]) => Date.parse(`${date}T00:00:00Z`));
  days.slice(1).forEach((day, i) => assert.equal(day - days[i], 7 * 24 * 3600 * 1000, 'seven days apart'));
  assert.equal(schedule[0][1], '2026-11-05');
});

test('an article is hidden until its publishedAt day, in every language', () => {
  for (const [id, date] of schedule) {
    for (const locale of locales) {
      const article = blog[locale].articles.find((item) => item.id === id);
      const before = new Date(`${date}T00:00:00Z`);
      before.setUTCMilliseconds(-1);
      assert.equal(isPublished(article, before), false, `${locale} ${id} just before`);
      assert.equal(isPublished(article, new Date(`${date}T00:00:00Z`)), true, `${locale} ${id} at midnight`);
    }
  }
  const now = new Date('2026-11-20T12:00:00Z');
  for (const locale of locales) {
    const visible = blog[locale].articles.filter((item) => isPublished(item, now)).map((item) => item.id).sort();
    assert.deepEqual(visible, schedule.slice(0, 3).map(([id]) => id).sort(), `${locale} on 20 November`);
  }
});

test('internal links point at pages that exist once everything is published', async () => {
  const pageDirs = (await readdir(new URL('../src/app/[locale]/', import.meta.url), {withFileTypes: true}))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const problems = [];
  for (const locale of locales) {
    const blogSlugs = new Set(blog[locale].articles.map((item) => item.slug));
    const tipSlugs = new Set(tips[locale].articles.map((item) => item.slug));
    for (const article of blog[locale].articles) {
      for (const text of texts(article)) {
        for (const [, label, href] of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
          const match = href.match(/^\/([a-z]{2})(\/[^#?]*)?/);
          if (!match || match[1] !== locale) {
            problems.push(`${locale} ${article.id}: ${href} (${label}) is not a ${locale} path`);
            continue;
          }
          const [, , path = ''] = match;
          const [, section, slug] = path.split('/');
          if (section === 'blog' && !blogSlugs.has(slug)) problems.push(`${locale} ${article.id}: ${href} is not a blog article`);
          else if (section === 'tips' && slug && !tipSlugs.has(slug)) problems.push(`${locale} ${article.id}: ${href} is not a tip`);
          else if (section !== 'blog' && section !== 'tips' && !pageDirs.includes(section)) problems.push(`${locale} ${article.id}: ${href} is not a page`);
        }
      }
      for (const slug of article.related) {
        assert.ok(blogSlugs.has(slug) || tipSlugs.has(slug), `${locale} ${article.id} related ${slug}`);
      }
    }
  }
  assert.deepEqual(problems, []);
});

test('no article mentions a freeze or losing a streak, apart from the known comparison texts', () => {
  // These two articles say that SkillQuest has no streak to lose. They are
  // listed so that a new mention anywhere else fails this test; whether they
  // should stay is Hans's call (see docs/BLOG.md).
  const knownStreakMentions = new Set(['best-pomodoro-app-for-students', 'skillquest-vs-habitica']);
  for (const locale of locales) {
    for (const article of blog[locale].articles) {
      const all = texts(article).join('\n');
      if (article.id !== 'skillquest-vs-habitica') {
        assert.doesNotMatch(all, /freez/i, `${locale} ${article.id} freeze`);
      }
      if (!knownStreakMentions.has(article.id)) {
        assert.doesNotMatch(all, /streak/i, `${locale} ${article.id} streak`);
      }
    }
  }
});

test('articles make no claim about what the app does for a child, and name no child', () => {
  const claims = /reads better|read better|leest beter|lezen beter|liest besser|lit mieux|lee mejor|legge meglio/i;
  const age = /\b\d{1,2}[- ]?(year|jaar|jahre|jahr|ans|años|anni)(\b|-)/i;
  for (const locale of locales) {
    for (const article of blog[locale].articles) {
      for (const text of texts(article)) {
        assert.doesNotMatch(text, claims, `${locale} ${article.id} claim`);
        assert.doesNotMatch(text, age, `${locale} ${article.id} age`);
      }
      assert.doesNotMatch(texts(article).join('\n'), /!\[/, `${locale} ${article.id} image`);
    }
  }
});

test('the blog uses the shared publication helper and only src/lib/blog.ts reads the content', async () => {
  const lib = await readFile(new URL('../src/lib/blog.ts', import.meta.url), 'utf8');
  assert.match(lib, /from '@\/lib\/tips-publication\.mjs'/);
  assert.match(lib, /isPublished\(article, now\)/);

  const offenders = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, {withFileTypes: true})) {
      const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
      if (entry.isDirectory()) {
        await walk(url);
      } else if (/\.(ts|tsx|mjs|js)$/.test(entry.name) && !url.pathname.endsWith('/src/lib/blog.ts')) {
        if ((await readFile(url, 'utf8')).includes('content/blog')) offenders.push(url.pathname);
      }
    }
  }
  await walk(new URL('../src/', import.meta.url));
  assert.deepEqual(offenders, []);
});

test('the blog pages, feed and sitemap are revalidated hourly and list public articles only', async () => {
  const files = [
    '../src/app/[locale]/blog/page.tsx',
    '../src/app/feeds/[file]/route.ts',
    '../src/app/sitemap.ts'
  ];
  for (const file of files) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8');
    assert.match(source, /export const revalidate = 3600;/, `${file} revalidate`);
  }
  const article = await readFile(new URL('../src/app/[locale]/blog/[slug]/page.tsx', import.meta.url), 'utf8');
  assert.match(article, /export const dynamic = 'force-dynamic';/);
  assert.doesNotMatch(article, /export function generateStaticParams/);
  const sitemap = await readFile(new URL(files[2], import.meta.url), 'utf8');
  assert.match(sitemap, /getAllBlogArticles\(\)/);
  assert.match(sitemap, /blogLocales\(\)/);
});

test('article pages carry Article structured data with Hans Vlasblom as author', async () => {
  const page = await readFile(new URL('../src/app/[locale]/blog/[slug]/page.tsx', import.meta.url), 'utf8');
  assert.match(page, /'@type': 'Article'/);
  assert.match(page, /BLOG_AUTHOR/);
  const lib = await readFile(new URL('../src/lib/blog.ts', import.meta.url), 'utf8');
  assert.match(lib, /BLOG_AUTHOR = 'Hans Vlasblom'/);
  assert.match(page, /skillquest-og\.png/);
  assert.match(page, /blogAlternates\(article\)/);
});
