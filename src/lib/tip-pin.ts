import {SITE_URL, type Locale} from '@/lib/marketing';
import type {TipArticle} from '@/lib/tips';

// Pinterest Pins for the tips: one tall image per article per language,
// served as a static PNG and listed in the RSS feed that Pinterest reads.

export const PIN_WIDTH = 1000;
export const PIN_HEIGHT = 1500;

export function tipPinPath(tip: Pick<TipArticle, 'locale' | 'slug'>): string {
  return `/tips-pins/${tip.locale}/${tip.slug}.png`;
}

export function tipPinUrl(tip: Pick<TipArticle, 'locale' | 'slug'>): string {
  return `${SITE_URL}${tipPinPath(tip)}`;
}

export function tipsFeedPath(locale: Locale): string {
  return `/feeds/tips-${locale}.xml`;
}
