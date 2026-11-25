import {routing} from '@/i18n/routing';

// Guides that exist in English only. Must match englishOnlyFeatureLandingSlugs
// in feature-pages.ts (tests/product-facts.test.mjs checks this). Kept here so
// the navbar does not pull all guide copy into the client bundle.
const englishOnlyGuideSlugs = ['reading-timer', 'homework-timer'];
const englishOnlyLocales: readonly string[] = ['en'];

function isLocale(value: string): boolean {
  return (routing.locales as readonly string[]).includes(value);
}

/**
 * The path the language switcher opens for `pathname` in `newLocale`. The
 * same page in the other language, except for a guide that does not exist in
 * that language: then the guides list of that language, instead of a 404.
 */
export function languageSwitchTarget(pathname: string, newLocale: string): string {
  const parts = pathname.split('/');

  if (!isLocale(parts[1] ?? '')) {
    return `/${newLocale}${pathname}`;
  }

  const [section, slug, ...rest] = parts.slice(2);
  if (
    section === 'features' &&
    slug !== undefined &&
    englishOnlyGuideSlugs.includes(slug) &&
    rest.every((part) => part === '') &&
    !englishOnlyLocales.includes(newLocale)
  ) {
    return `/${newLocale}/guides`;
  }

  parts[1] = newLocale;
  return parts.join('/') || `/${newLocale}`;
}
