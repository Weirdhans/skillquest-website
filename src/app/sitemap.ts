import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {alternateLanguages, localizedPath} from '@/lib/marketing';
import {featureLandingSlugs} from '@/lib/feature-pages';

const baseRoutes = [
  '',
  '/download',
  '/pricing',
  '/features',
  '/privacy',
  '/delete-account',
  '/support'
] as const;

const routes = [
  ...baseRoutes,
  ...featureLandingSlugs.map((slug) => `/features/${slug}`)
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: localizedPath(locale, route),
      lastModified,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : route === '/download' ? 0.9 : 0.7,
      alternates: {
        languages: alternateLanguages(route)
      }
    }))
  );
}
