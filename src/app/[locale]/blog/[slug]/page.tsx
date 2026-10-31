import type {Metadata} from 'next';
import {notFound, permanentRedirect} from 'next/navigation';
import BlogBody from '@/components/BlogBody';
import Footer from '@/components/Footer';
import {Link} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {
  BLOG_AUTHOR,
  blogAlternates,
  blogPath,
  findBlogTranslation,
  formatBlogReadingTime,
  getBlogArticle,
  getBlogArticles,
  getBlogUiCopy,
  getRelated,
  plainText,
  type BlogArticle
} from '@/lib/blog';
import {
  ANDROID_STORE_URL,
  APP_STORE_URL,
  SITE_URL,
  createPageMetadata,
  faqJsonLd,
  isLocale,
  languageTags,
  localizedPath,
  type Locale
} from '@/lib/marketing';

// A slug from another language (for example after switching language on an
// article) redirects to this language's version, if there is one.
// Articles that are not public yet answer 404. The page is rendered on every
// request (force-dynamic), so the publishedAt check runs each time and an
// article appears at 00:00 UTC without a deployment. It has no
// generateStaticParams on purpose: before the first publishedAt day the list
// would be empty, which makes Next.js treat the route as static and cache the
// 404 (and fail on the dynamic layout).
export const dynamic = 'force-dynamic';

function JsonLd({data}: {data: unknown}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}

function articleJsonLd(article: BlogArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    inLanguage: languageTags[article.locale],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: localizedPath(article.locale, blogPath(article)),
    image: `${SITE_URL}/og/skillquest-og.png`,
    author: {
      '@type': 'Person',
      name: BLOG_AUTHOR
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillQuest',
      url: SITE_URL
    }
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const article = getBlogArticle(safeLocale, slug);

  if (!article) {
    return {};
  }

  const metadata = createPageMetadata({
    locale: safeLocale,
    path: blogPath(article),
    title: article.metaTitle,
    description: article.metaDescription
  });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      languages: blogAlternates(article)
    },
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [BLOG_AUTHOR]
    }
  };
}

export default async function BlogArticlePage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getBlogUiCopy(safeLocale);
  const article = getBlogArticle(safeLocale, slug);

  if (!article) {
    const translation = findBlogTranslation(safeLocale, slug);
    if (translation) {
      permanentRedirect(`/${safeLocale}${blogPath(translation)}`);
    }
  }

  if (!copy || !article) {
    notFound();
  }

  const related = getRelated(article);
  const moreArticles = getBlogArticles(safeLocale)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={faqJsonLd(article.faq.map((item) => ({question: item.question, answer: plainText(item.answer)})))} />
      <main className="theme-page pt-20">
        <section className="theme-hero-band section-hero text-white">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-200">
                <Link href="/blog" className="hover:text-white">
                  {copy.eyebrow}
                </Link>{' '}
                · {article.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-display text-balance">
                {article.title}
              </h1>
              <p className="mt-5 text-lead text-gray-200">{article.intro}</p>
              <p className="mt-6 text-sm text-gray-300">
                {BLOG_AUTHOR}, {article.authorRole} ·{' '}
                {formatBlogReadingTime(copy, article.readingMinutes)}
              </p>
            </div>
          </div>
        </section>

        <section className="section-standard">
          <div className="container-custom">
            <article className="mx-auto max-w-2xl">
              <BlogBody markdown={article.body} locale={safeLocale} />

              <div className="mt-10 flex flex-wrap gap-3">
                <a href={APP_STORE_URL} className="btn btn-primary" rel="noopener">
                  {copy.iphoneCta}
                </a>
                <a
                  href={ANDROID_STORE_URL}
                  className="btn border theme-title"
                  style={{borderColor: 'var(--sq-border-strong)'}}
                  rel="noopener"
                >
                  {copy.androidCta}
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="section-standard theme-section-muted">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-section text-balance theme-title">
                {article.faqHeading}
              </h2>
              <dl className="mt-8 divide-y" style={{borderColor: 'var(--sq-border)'}}>
                {article.faq.map((item) => (
                  <div key={item.question} className="py-6">
                    <dt className="font-display text-subsection theme-title">
                      {item.question}
                    </dt>
                    <dd className="mt-2 leading-relaxed theme-copy">
                      <BlogBody markdown={item.answer} locale={safeLocale} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {(related.length > 0 || moreArticles.length > 0) && (
          <section className="section-standard">
            <div className="container-custom">
              <div className="mx-auto max-w-2xl space-y-10">
                {related.length > 0 && (
                  <div>
                    <h2 className="font-display text-section text-balance theme-title">
                      {copy.relatedHeading}
                    </h2>
                    <ul className="mt-6 divide-y divide-black/5 dark:divide-white/10">
                      {related.map((item) => (
                        <li key={item.path}>
                          <Link
                            href={item.path}
                            className="group block py-5 font-display text-lg font-bold theme-title hover:underline"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {moreArticles.length > 0 && (
                  <div>
                    <h2 className="font-display text-section text-balance theme-title">
                      {copy.moreArticles}
                    </h2>
                    <ul className="mt-6 divide-y divide-black/5 dark:divide-white/10">
                      {moreArticles.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={blogPath(item)}
                            className="group block py-5 font-display text-lg font-bold theme-title hover:underline"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
