import {routing} from '@/i18n/routing';
import {languageTags, localizedPath, type Locale} from '@/lib/marketing';
import {isPublished} from '@/lib/tips-publication.mjs';
import {getTip} from '@/lib/tips';
import de from '@/content/blog/de.json';
import en from '@/content/blog/en.json';
import es from '@/content/blog/es.json';
import fr from '@/content/blog/fr.json';
import it from '@/content/blog/it.json';
import nl from '@/content/blog/nl.json';

// The blog holds comparisons and guides next to the practical tips: same
// structure as src/lib/tips.ts and the same publishedAt rule (shared helper
// src/lib/tips-publication.mjs). Articles are written in English (the source)
// and exist in every language with their own slug. The Dutch, German, French,
// Spanish and Italian versions were translated and checked with Gemini Flash
// only; no native speaker has read them (see docs/BLOG.md).
//
// An article is public from 00:00 UTC on its publishedAt date. Every function
// below that returns articles skips the ones that are not public yet, at the
// moment of the call (`now`, default: the current time), so a future article
// is missing from the index, the sitemap, the feed, the alternates and its own
// URL. The pages are revalidated hourly (`export const revalidate = 3600`), so
// they pick up a new day without a new deployment.

export const BLOG_AUTHOR = 'Hans Vlasblom';

export type BlogArticle = {
  /** Shared across the language versions of one article. */
  id: string;
  locale: Locale;
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** First paragraph, shown in the page header. */
  intro: string;
  cardSummary: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  readingMinutes: number;
  authorRole: string;
  /** Slugs (in this locale) of other blog articles or tips. */
  related: string[];
  /** Markdown subset: ## headings, paragraphs, lists, tables, **bold**, *italic*, [links](/xx/path). */
  body: string;
  faqHeading: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export type BlogUiCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  /** Contains {minutes}. */
  readingTime: string;
  iphoneCta: string;
  androidCta: string;
  moreArticles: string;
  relatedHeading: string;
};

type BlogContent = {
  ui: BlogUiCopy;
  articles: Array<Omit<BlogArticle, 'locale'>>;
};

// One file per locale in src/content/blog. en.json is the source.
const content: Record<Locale, BlogContent> = {nl, en, de, fr, es, it};

const uiCopy: Partial<Record<Locale, BlogUiCopy>> = Object.fromEntries(
  routing.locales.map((locale) => [locale, content[locale].ui])
);

const articles: BlogArticle[] = routing.locales.flatMap((locale) =>
  content[locale].articles.map((article) => ({...article, locale}))
);

export function formatBlogReadingTime(copy: BlogUiCopy, minutes: number): string {
  return copy.readingTime.replace('{minutes}', String(minutes));
}

export function getBlogUiCopy(locale: Locale): BlogUiCopy | undefined {
  return uiCopy[locale];
}

/** The articles that are public at `now`. */
function publishedArticles(now: Date): BlogArticle[] {
  return articles.filter((article) => isPublished(article, now));
}

export function getBlogArticles(locale: Locale, now = new Date()): BlogArticle[] {
  return publishedArticles(now)
    .filter((article) => article.locale === locale)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogArticle(
  locale: Locale,
  slug: string,
  now = new Date()
): BlogArticle | undefined {
  return publishedArticles(now).find(
    (article) => article.locale === locale && article.slug === slug
  );
}

/** This locale's version of the article that uses `slug` in any locale. */
export function findBlogTranslation(
  locale: Locale,
  slug: string,
  now = new Date()
): BlogArticle | undefined {
  const visible = publishedArticles(now);
  const other = visible.find((article) => article.slug === slug);
  return other
    ? visible.find((article) => article.id === other.id && article.locale === locale)
    : undefined;
}

export function getAllBlogArticles(now = new Date()): BlogArticle[] {
  return publishedArticles(now);
}

/** Locales that have both UI copy and at least one public article. */
export function blogLocales(now = new Date()): Locale[] {
  return routing.locales.filter(
    (locale) => uiCopy[locale] && getBlogArticles(locale, now).length > 0
  );
}

export function blogPath(article: Pick<BlogArticle, 'slug'>): string {
  return `/blog/${article.slug}`;
}

/** hreflang links to the language versions that exist of this article. */
export function blogAlternates(
  article: BlogArticle,
  now = new Date()
): Record<string, string> {
  const versions = publishedArticles(now).filter((item) => item.id === article.id);
  const languages: Record<string, string> = Object.fromEntries(
    versions.map((item) => [
      languageTags[item.locale],
      localizedPath(item.locale, blogPath(item))
    ])
  );
  const fallback =
    versions.find((item) => item.locale === routing.defaultLocale) ?? versions[0];
  if (fallback) {
    languages['x-default'] = localizedPath(fallback.locale, blogPath(fallback));
  }
  return languages;
}

/** hreflang links for the blog index, limited to locales that have articles. */
export function blogIndexAlternates(now = new Date()): Record<string, string> {
  const locales = blogLocales(now);
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [languageTags[locale], localizedPath(locale, '/blog')])
  );
  const fallback = locales.includes(routing.defaultLocale)
    ? routing.defaultLocale
    : locales[0];
  if (fallback) {
    languages['x-default'] = localizedPath(fallback, '/blog');
  }
  return languages;
}

/**
 * Where a link inside an article should go, as a path without the locale
 * (`/blog/slug`), or null when it points at a blog article or tip that is not
 * public yet: the text is then shown without a link instead of a 404.
 * Links to other pages (`/en/download`) pass through without the locale.
 */
export function resolveBlogHref(
  locale: Locale,
  href: string,
  now = new Date()
): string | null {
  const match = href.match(/^\/([a-z]{2})(\/.*)?$/);
  if (!match) {
    return href;
  }
  const path = match[2] ?? '';
  const blogSlug = path.match(/^\/blog\/([^/#?]+)/)?.[1];
  if (blogSlug) {
    return getBlogArticle(locale, blogSlug, now) ? path : null;
  }
  const tipSlug = path.match(/^\/tips\/([^/#?]+)/)?.[1];
  if (tipSlug) {
    return getTip(locale, tipSlug, now) ? path : null;
  }
  return path || '/';
}

/** Markdown without its markup, for structured data and feeds. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');
}

/** The articles and tips that `related` points at and that are public now. */
export function getRelated(
  article: BlogArticle,
  now = new Date()
): Array<{title: string; path: string}> {
  return article.related.flatMap((slug) => {
    const post = getBlogArticle(article.locale, slug, now);
    if (post) return [{title: post.title, path: blogPath(post)}];
    const tip = getTip(article.locale, slug, now);
    return tip ? [{title: tip.title, path: `/tips/${tip.slug}`}] : [];
  });
}
