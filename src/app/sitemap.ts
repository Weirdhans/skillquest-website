import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {alternateLanguages, localizedPath, type Locale} from '@/lib/marketing';
import {featureLandingLocales, getFeatureLandingSlugs} from '@/lib/feature-pages';
import {
  blogAlternates,
  blogIndexAlternates,
  blogLocales,
  blogPath,
  getAllBlogArticles
} from '@/lib/blog';
import {
  getAllTips,
  tipAlternates,
  tipPath,
  tipsIndexAlternates,
  tipsLocales
} from '@/lib/tips';

// Regenerated hourly so tips and blog articles appear on their publishedAt day without a deploy.
export const revalidate = 3600; // seconds; a literal, Next.js cannot read an imported value

const baseRoutes = [
  '',
  '/download',
  '/parents',
  '/pricing',
  '/features',
  '/privacy',
  '/terms',
  '/community-guidelines',
  '/delete-account',
  '/support',
  '/changelog',
  '/guides'
] as const;

// The routes of one locale with the locales each route exists in. Base routes
// exist everywhere; a feature guide can be limited to some locales (English-only
// guides appear for en only, with hreflang to en only).
function routesFor(locale: Locale): Array<{route: string; locales: readonly Locale[]}> {
  return [
    ...baseRoutes.map((route) => ({route, locales: routing.locales})),
    ...getFeatureLandingSlugs(locale).map((slug) => ({
      route: `/features/${slug}`,
      locales: featureLandingLocales(slug)
    }))
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    routesFor(locale).map(({route, locales}) => ({
      url: localizedPath(locale, route),
      lastModified,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : route === '/download' ? 0.9 : 0.7,
      alternates: {
        languages: alternateLanguages(route, locales)
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

  // The blog works the same way: own alternates, only public articles.
  const blogIndex: MetadataRoute.Sitemap = blogLocales().map((locale) => ({
    url: localizedPath(locale, '/blog'),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: {
      languages: blogIndexAlternates()
    }
  }));

  const blog: MetadataRoute.Sitemap = getAllBlogArticles().map((article) => ({
    url: localizedPath(article.locale, blogPath(article)),
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: blogAlternates(article)
    }
  }));

  return [...pages, ...tipsIndex, ...tips, ...blogIndex, ...blog];
}
