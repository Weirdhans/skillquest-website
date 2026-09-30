import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import {Link} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {
  ANDROID_SIGNUP_URL,
  APP_STORE_URL,
  SITE_URL,
  createPageMetadata,
  faqJsonLd,
  isLocale,
  languageTags,
  localizedPath,
  type Locale
} from '@/lib/marketing';
import {
  getAllTips,
  getTip,
  getTips,
  getTipsUiCopy,
  tipAlternates,
  tipPath,
  type TipArticle
} from '@/lib/tips';

// Only the language versions that exist are built; everything else is a 404.
export const dynamicParams = false;

function JsonLd({data}: {data: unknown}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}

function articleJsonLd(tip: TipArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tip.title,
    description: tip.metaDescription,
    inLanguage: languageTags[tip.locale],
    datePublished: tip.publishedAt,
    dateModified: tip.publishedAt,
    mainEntityOfPage: localizedPath(tip.locale, tipPath(tip)),
    image: `${SITE_URL}/og/skillquest-og.png`,
    author: {
      '@type': 'Person',
      name: 'Hans'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillQuest',
      url: SITE_URL
    }
  };
}

export function generateStaticParams() {
  return getAllTips().map((tip) => ({locale: tip.locale, slug: tip.slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const tip = getTip(safeLocale, slug);

  if (!tip) {
    return {};
  }

  const metadata = createPageMetadata({
    locale: safeLocale,
    path: tipPath(tip),
    title: tip.metaTitle,
    description: tip.metaDescription
  });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      languages: tipAlternates(tip)
    },
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: tip.publishedAt
    }
  };
}

export default async function TipPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getTipsUiCopy(safeLocale);
  const tip = getTip(safeLocale, slug);

  if (!copy || !tip) {
    notFound();
  }

  const moreTips = getTips(safeLocale)
    .filter((item) => item.slug !== tip.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd(tip)} />
      <JsonLd data={faqJsonLd(tip.faq)} />
      <main className="theme-page pt-20">
        <section className="theme-hero-band section-hero text-white">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-200">
                <Link href="/tips" className="hover:text-white">
                  {copy.eyebrow}
                </Link>{' '}
                · {tip.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-display text-balance">
                {tip.title}
              </h1>
              <p className="mt-5 text-lead text-gray-200">{tip.intro}</p>
              <p className="mt-6 text-sm text-gray-300">
                {copy.byline} · {copy.readingTime(tip.readingMinutes)}
              </p>
            </div>
          </div>
        </section>

        <section className="section-standard">
          <div className="container-custom">
            <article className="mx-auto max-w-2xl space-y-12">
              {tip.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-subsection theme-title">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-lg leading-relaxed theme-copy"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              <aside
                className="rounded-2xl border p-6 sm:p-8"
                style={{borderColor: 'var(--sq-border-strong)'}}
              >
                <h2 className="font-display text-subsection theme-title">
                  {tip.app.title}
                </h2>
                <p className="mt-4 leading-relaxed theme-copy">{tip.app.body}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={APP_STORE_URL}
                    className="btn btn-primary"
                    rel="noopener"
                  >
                    {copy.iphoneCta}
                  </a>
                  <Link
                    href={ANDROID_SIGNUP_URL}
                    className="btn border theme-title"
                    style={{borderColor: 'var(--sq-border-strong)'}}
                  >
                    {copy.androidCta}
                  </Link>
                </div>
                <p className="mt-4 text-sm leading-relaxed theme-copy">
                  {copy.androidNote}
                </p>
              </aside>
            </article>
          </div>
        </section>

        <section className="section-standard theme-section-muted">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-section text-balance theme-title">
                {copy.faqHeading}
              </h2>
              <dl className="mt-8 divide-y" style={{borderColor: 'var(--sq-border)'}}>
                {tip.faq.map((item) => (
                  <div key={item.question} className="py-6">
                    <dt className="font-display text-subsection theme-title">
                      {item.question}
                    </dt>
                    <dd className="mt-2 leading-relaxed theme-copy">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {moreTips.length > 0 && (
          <section className="section-standard">
            <div className="container-custom">
              <div className="mx-auto max-w-2xl">
                <h2 className="font-display text-section text-balance theme-title">
                  {copy.moreTips}
                </h2>
                <ul className="mt-6 divide-y divide-black/5 dark:divide-white/10">
                  {moreTips.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={tipPath(item)}
                        className="group block py-5 font-display text-lg font-bold theme-title hover:underline"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
