import type {Locale} from '@/lib/marketing';

// Navigation label for the blog. The same word in every language today, but
// kept apart from blog.ts so client components do not bundle the articles.
// tests/blog.test.mjs checks that these match the blog content files.
export const blogNavLabel: Partial<Record<Locale, string>> = {
  nl: 'Blog',
  en: 'Blog',
  de: 'Blog',
  fr: 'Blog',
  es: 'Blog',
  it: 'Blog'
};
