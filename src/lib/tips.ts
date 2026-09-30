import {routing} from '@/i18n/routing';
import {languageTags, localizedPath, type Locale} from '@/lib/marketing';
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
  androidNote: string;
  faqHeading: string;
  moreTips: string;
};

type TipsContent = {
  ui: TipsUiCopy;
  articles: Array<Omit<TipArticle, 'locale'>>;
};

// One file per locale in src/content/tips. nl.json is the source; the others
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

export function getTips(locale: Locale): TipArticle[] {
  return articles
    .filter((article) => article.locale === locale)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getTip(locale: Locale, slug: string): TipArticle | undefined {
  return articles.find(
    (article) => article.locale === locale && article.slug === slug
  );
}

/** This locale's version of the article that uses `slug` in any locale. */
export function findTranslation(
  locale: Locale,
  slug: string
): TipArticle | undefined {
  const other = articles.find((article) => article.slug === slug);
  return other
    ? articles.find((article) => article.id === other.id && article.locale === locale)
    : undefined;
}

export function getAllTips(): TipArticle[] {
  return articles;
}

/** Locales that have both UI copy and at least one article. */
export function tipsLocales(): Locale[] {
  return routing.locales.filter(
    (locale) => uiCopy[locale] && getTips(locale).length > 0
  );
}

export function hasTips(locale: Locale): boolean {
  return tipsLocales().includes(locale);
}

export function tipPath(article: TipArticle): string {
  return `/tips/${article.slug}`;
}

/** hreflang links to the language versions that exist of this article. */
export function tipAlternates(article: TipArticle): Record<string, string> {
  const versions = articles.filter((item) => item.id === article.id);
  const languages: Record<string, string> = Object.fromEntries(
    versions.map((item) => [
      languageTags[item.locale],
      localizedPath(item.locale, tipPath(item))
    ])
  );
  const fallback =
    versions.find((item) => item.locale === routing.defaultLocale) ??
    versions[0];
  languages['x-default'] = localizedPath(fallback.locale, tipPath(fallback));
  return languages;
}

/** hreflang links for the tips index, limited to locales that have tips. */
export function tipsIndexAlternates(): Record<string, string> {
  const locales = tipsLocales();
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
