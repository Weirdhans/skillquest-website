import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

// Define routing configuration for middleware
export const routing = defineRouting({
  // All supported locales
  locales: ['nl', 'en', 'de', 'fr', 'es', 'it'],

  // Default locale
  defaultLocale: 'nl',

  // Always show locale prefix in URL
  localePrefix: 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
