import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import {Link} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {
  blogIndexAlternates,
  blogLocales,
  blogPath,
  formatBlogReadingTime,
  getBlogArticles,
  getBlogUiCopy
} from '@/lib/blog';
import {createPageMetadata, isLocale, type Locale} from '@/lib/marketing';

// Only locales with at least one public article get a blog page (notFound
// otherwise). dynamicParams stays on: the blog is empty until its first
// publishedAt day, and the page must then appear without a new deployment.
// Like the tips pages it is rendered per request; revalidate is the fallback
// if the pages ever become static.
export const dynamicParams = true;
export const revalidate = 3600; // seconds; a literal, Next.js cannot read an imported value

export function generateStaticParams() {
  return blogLocales().map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getBlogUiCopy(safeLocale);

  if (!copy) {
    return {};
  }

  const metadata = createPageMetadata({
    locale: safeLocale,
    path: '/blog',
    title: copy.metaTitle,
    description: copy.metaDescription
  });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      languages: blogIndexAlternates()
    }
  };
}

export default async function BlogPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getBlogUiCopy(safeLocale);
  const articles = getBlogArticles(safeLocale);

  if (!copy || articles.length === 0) {
    notFound();
  }

  return (
    <>
      <main className="theme-page pt-20">
        <section className="theme-hero-band section-hero text-white">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-200">
                {copy.eyebrow}
              </p>
              <h1 className="font-display text-display text-balance">
                {copy.heading}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-gray-200">
                {copy.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="section-standard">
          <div className="container-custom">
            <ul className="mx-auto max-w-3xl divide-y divide-black/5 dark:divide-white/10">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={blogPath(article)}
                    className="group flex flex-col gap-1 py-6 transition hover:opacity-80"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide theme-eyebrow">
                      {article.eyebrow} · {formatBlogReadingTime(copy, article.readingMinutes)}
                    </span>
                    <span className="font-display text-xl font-bold theme-title group-hover:underline">
                      {article.title}
                    </span>
                    <span className="text-sm leading-relaxed theme-copy">
                      {article.cardSummary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
