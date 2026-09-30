import type {Locale} from '@/lib/marketing';

// Navigation label for the tips section, only in locales that have tips.
// Kept apart from tips.ts so client components do not bundle the articles.
// tests/tips.test.mjs checks that these locales match the articles.
export const tipsNavLabel: Partial<Record<Locale, string>> = {
  nl: 'Tips'
};
