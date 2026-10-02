import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {alternateLanguages, localizedPath} from '@/lib/marketing';
import {featureLandingSlugs} from '@/lib/feature-pages';
import {
  getAllTips,
  tipAlternates,
  tipPath,
  tipsIndexAlternates,
  tipsLocales
} from '@/lib/tips';

const baseRoutes = [
  '',
  '/download',
  '/parents',
  '/pricing',
  '/features',
  '/privacy',
  '/community-guidelines',
  '/delete-account',
  '/support',
  '/changelog',
  '/guides'
] as const;

const routes = [
  ...baseRoutes,
  ...featureLandingSlugs.map((slug) => `/features/${slug}`)
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
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

  // Tips exist only in some languages, so they list their own alternates.
  const tipsIndex: MetadataRoute.Sitemap = tipsLocales().map((locale) => ({
    url: localizedPath(locale, '/tips'),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: {
      languages: tipsIndexAlternates()
    }
  }));

  const tips: MetadataRoute.Sitemap = getAllTips().map((tip) => ({
    url: localizedPath(tip.locale, tipPath(tip)),
    lastModified: new Date(tip.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: tipAlternates(tip)
    }
  }));

  return [...pages, ...tipsIndex, ...tips];
}
