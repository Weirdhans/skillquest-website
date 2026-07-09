import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import {Link} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {
  createPageMetadata,
  faqJsonLd,
  getMarketingCopy,
  isLocale,
  screenshotPath,
  type Locale
} from '@/lib/marketing';
import {
  featureLandingSlugs,
  getFeatureLandingPage,
  getFeatureLandingPages
} from '@/lib/feature-pages';

function JsonLd({data}: {data: unknown}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}

function primaryHref(slug: string) {
  return slug === 'family' ? '/pricing' : '/download';
}

function secondaryHref(slug: string) {
  if (slug === 'family') return '/download';
  if (slug === 'focus-timer' || slug === 'progress-statistics') return '/pricing';
  return '/features/focus-timer';
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    featureLandingSlugs.map((slug) => ({locale, slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const page = getFeatureLandingPage(safeLocale, slug);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    locale: safeLocale,
    path: `/features/${page.slug}`,
    title: page.metaTitle,
    description: page.metaDescription
  });
}

export default async function FeatureLandingPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getMarketingCopy(safeLocale);
  const page = getFeatureLandingPage(safeLocale, slug);

  if (!page) {
    notFound();
  }

  const relatedPages = getFeatureLandingPages(safeLocale).filter(
    (item) => item.slug !== page.slug
  );

  return (
    <>
      <JsonLd data={faqJsonLd(page.faq)} />
      <main className="theme-page pt-20">
        <section className="theme-hero-band py-16 text-white md:py-20">
          <div className="container-custom">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-200">
                  {page.eyebrow}
                </p>
                <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
                  {page.title}
                </h1>
                <p className="mt-5 max-w-3xl text-xl leading-relaxed text-gray-200">
                  {page.summary}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={primaryHref(page.slug)} className="btn btn-primary">
                    {page.primaryCta}
                  </Link>
                  <Link
                    href={secondaryHref(page.slug)}
                    className="btn border border-white/25 bg-white/10 text-white hover:bg-white/15"
                  >
                    {page.secondaryCta}
                  </Link>
                </div>
              </div>

              <div className="mx-auto w-56 overflow-hidden rounded-lg border border-white/15 bg-white/5 shadow-2xl md:w-64">
                <Image
                  src={screenshotPath(safeLocale, page.screenshot)}
                  alt={page.title}
                  width={1080}
                  height={1920}
                  priority
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 224px, 256px"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="grid gap-5 lg:grid-cols-3">
              {page.sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-lg p-6 theme-card md:p-8"
                >
                  <h2 className="font-display text-2xl font-bold theme-title">
                    {section.title}
                  </h2>
                  <p className="mt-4 leading-relaxed theme-copy">
                    {section.body}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-3 theme-muted-strong">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="theme-section-muted py-16 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide theme-eyebrow">
                SEO
              </p>
              <h2 className="font-display text-3xl font-bold theme-title md:text-4xl">
                {copy.featuresPage.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed theme-copy">
                {copy.featuresPage.subtitle}
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
              {page.seoTerms.map((term) => (
                <span
                  key={term}
                  className="rounded-lg border px-3 py-2 text-sm font-semibold theme-card theme-muted-strong"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold theme-title md:text-4xl">
                FAQ
              </h2>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
              {page.faq.map((item) => (
                <article
                  key={item.question}
                  className="rounded-lg p-6 theme-card"
                >
                  <h3 className="font-display text-xl font-bold theme-title">
                    {item.question}
                  </h3>
                  <p className="mt-3 leading-relaxed theme-copy">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="theme-highlight-band py-16 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold theme-title md:text-4xl">
                {copy.nav.features}
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {relatedPages.map((item) => (
                <Link
                  key={item.slug}
                  href={`/features/${item.slug}`}
                  className="rounded-lg p-6 theme-card transition hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide theme-eyebrow">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold theme-title">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed theme-copy">
                    {item.cardSummary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
