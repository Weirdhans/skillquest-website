import {routing} from '@/i18n/routing';
import {languageTags, localizedPath, type Locale} from '@/lib/marketing';
import {isPublished} from '@/lib/tips-publication.mjs';
import de from '@/content/tips/de.json';
import en from '@/content/tips/en.json';
import es from '@/content/tips/es.json';
import fr from '@/content/tips/fr.json';
import it from '@/content/tips/it.json';
import nl from '@/content/tips/nl.json';

// Tips are articles that answer questions people search for, such as "my
// child does not want to read". Unlike the feature guides they are written
// per language: an article only exists in the locales listed here, and its
// slug can differ per locale. Translations come from DeepL, never from an AI
// writing tool.
//
// An article is public from 00:00 UTC on its publishedAt date. Every function
// below that returns articles skips the ones that are not public yet, at the
// moment of the call (`now`, default: the current time), so a future article
// is missing from the index, the sitemap, the feeds, the alternates and its
// own URL. The pages that use them are statically generated and revalidated
// hourly (`export const revalidate = 3600`), so they pick up a new day without a
// new deployment.

export const TIPS_AUTHOR = 'Hans Vlasblom';

export type TipSection = {
  title: string;
  paragraphs: string[];
};

export type TipArticle = {
  /** Shared across the language versions of one article. */
  id: string;
  locale: Locale;
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  cardSummary: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  readingMinutes: number;
  sections: TipSection[];
  app: {
    title: string;
    body: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export type TipsUiCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  byline: string;
  /** Contains {minutes}. */
  readingTime: string;
  iphoneCta: string;
  androidCta: string;
  faqHeading: string;
  moreTips: string;
};

type TipsContent = {
  ui: TipsUiCopy;
  articles: Array<Omit<TipArticle, 'locale'>>;
};

// One file per locale in src/content/tips. en.json is the source; the others
// come from scripts/translate-tips.py (DeepL) plus a review.
const content: Record<Locale, TipsContent> = {nl, en, de, fr, es, it};

const uiCopy: Partial<Record<Locale, TipsUiCopy>> = Object.fromEntries(
  routing.locales.map((locale) => [locale, content[locale].ui])
);

const articles: TipArticle[] = routing.locales.flatMap((locale) =>
  content[locale].articles.map(({id, slug, eyebrow, title, metaTitle, metaDescription, intro, cardSummary, publishedAt, readingMinutes, sections, app, faq}) => ({
    id,
    locale,
    slug,
    eyebrow,
    title,
    metaTitle,
    metaDescription,
    intro,
    cardSummary,
    publishedAt,
    readingMinutes,
    sections,
    app,
    faq
  }))
);

export function formatReadingTime(copy: TipsUiCopy, minutes: number): string {
  return copy.readingTime.replace('{minutes}', String(minutes));
}

export function getTipsUiCopy(locale: Locale): TipsUiCopy | undefined {
  return uiCopy[locale];
}

/** The articles that are public at `now`. */
function publishedArticles(now: Date): TipArticle[] {
  return articles.filter((article) => isPublished(article, now));
}

export function getTips(locale: Locale, now = new Date()): TipArticle[] {
  return publishedArticles(now)
    .filter((article) => article.locale === locale)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getTip(
  locale: Locale,
  slug: string,
  now = new Date()
): TipArticle | undefined {
  return publishedArticles(now).find(
    (article) => article.locale === locale && article.slug === slug
  );
}

/** This locale's version of the article that uses `slug` in any locale. */
export function findTranslation(
  locale: Locale,
  slug: string,
  now = new Date()
): TipArticle | undefined {
  const visible = publishedArticles(now);
  const other = visible.find((article) => article.slug === slug);
  return other
    ? visible.find((article) => article.id === other.id && article.locale === locale)
    : undefined;
}

export function getAllTips(now = new Date()): TipArticle[] {
  return publishedArticles(now);
}

/** Locales that have both UI copy and at least one public article. */
export function tipsLocales(now = new Date()): Locale[] {
  return routing.locales.filter(
    (locale) => uiCopy[locale] && getTips(locale, now).length > 0
  );
}

export function hasTips(locale: Locale, now = new Date()): boolean {
  return tipsLocales(now).includes(locale);
}

export function tipPath(article: TipArticle): string {
  return `/tips/${article.slug}`;
}

/** hreflang links to the language versions that exist of this article. */
export function tipAlternates(
  article: TipArticle,
  now = new Date()
): Record<string, string> {
  const versions = publishedArticles(now).filter((item) => item.id === article.id);
  const languages: Record<string, string> = Object.fromEntries(
    versions.map((item) => [
      languageTags[item.locale],
      localizedPath(item.locale, tipPath(item))
    ])
  );
  const fallback =
    versions.find((item) => item.locale === routing.defaultLocale) ??
    versions[0];
  if (fallback) {
    languages['x-default'] = localizedPath(fallback.locale, tipPath(fallback));
  }
  return languages;
}

/** hreflang links for the tips index, limited to locales that have tips. */
export function tipsIndexAlternates(now = new Date()): Record<string, string> {
  const locales = tipsLocales(now);
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [languageTags[locale], localizedPath(locale, '/tips')])
  );
  const fallback = locales.includes(routing.defaultLocale)
    ? routing.defaultLocale
    : locales[0];
  if (fallback) {
    languages['x-default'] = localizedPath(fallback, '/tips');
  }
  return languages;
}
