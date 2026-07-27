import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import {Reveal, Stagger, StaggerItem} from '@/components/Reveal';
import {Check} from '@phosphor-icons/react/dist/ssr';
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
  if (slug === 'family' || slug === 'deep-work-flowtime') return '/pricing';
  return '/download';
}

function secondaryHref(slug: string) {
  if (slug === 'family') return '/download';
  if (slug === 'focus-timer' || slug === 'progress-statistics' || slug === 'guest-mode') return '/pricing';
  if (slug === 'friends-challenges') return '/features/leaderboards';
  if (slug === 'leaderboards') return '/features/friends-challenges';
  if (slug === 'themes') return '/features/streaks';
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

  const relatedPages = getFeatureLandingPages(safeLocale)
    .filter((item) => item.slug !== page.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(page.faq)} />
      <main className="theme-page pt-20">
        <section className="theme-hero-band section-hero text-white">
          <div className="container-custom">
            <div className="grid items-center gap-12 lg:grid-cols-[9fr_3fr] lg:gap-12">
              <Stagger>
                <StaggerItem>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-200">
                    {page.eyebrow}
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <h1 className="mt-4 font-display text-display text-balance">
                    {page.title}
                  </h1>
                </StaggerItem>
                <StaggerItem>
                  <p className="mt-5 max-w-[52ch] text-lead text-gray-200">
                    {page.summary}
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <div className="mt-9 flex flex-wrap gap-3">
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
                </StaggerItem>
              </Stagger>

              <div className="mx-auto hidden w-full max-w-[280px] lg:block">
                <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
                  <Image
                    src={screenshotPath(safeLocale, page.screenshot)}
                    alt={page.title}
                    width={1080}
                    height={1920}
                    priority
                    className="h-auto w-full"
                    sizes="280px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Numbered sections on hairlines. Three shadowed cards side by side was
            the most templated block on this page. */}
        <section className="section-standard">
          <div className="container-custom">
            <div className="grid gap-x-10 gap-y-12 lg:grid-cols-3">
              {page.sections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.08}>
                  <article
                    className="h-full border-t pt-6"
                    style={{borderColor: 'var(--sq-border-strong)'}}
                  >
                    <span
                      className="nums text-xs"
                      style={{color: 'var(--sq-brand)'}}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-3 font-display text-subsection theme-title">
                      {section.title}
                    </h2>
                    <p className="mt-3 leading-relaxed theme-copy">
                      {section.body}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3 theme-muted-strong">
                          <Check
                            size={18}
                            weight="bold"
                            className="mt-1 shrink-0 text-primary-600 dark:text-primary-300"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-standard theme-section-muted">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="font-display text-section text-balance theme-title">
                  FAQ
                </h2>
              </Reveal>
              <dl className="mt-8 divide-y" style={{borderColor: 'var(--sq-border)'}}>
                {page.faq.map((item, i) => (
                  <Reveal key={item.question} delay={i * 0.05}>
                    <div className="py-6">
                      <dt className="font-display text-subsection theme-title">
                        {item.question}
                      </dt>
                      <dd className="mt-2 leading-relaxed theme-copy">
                        {item.answer}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="section-standard">
          <div className="container-custom">
            <Reveal>
              <h2 className="font-display text-section text-balance theme-title">
                {copy.nav.features}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map((item, i) => (
                <Reveal key={item.slug} delay={i * 0.06}>
                  <Link href={`/features/${item.slug}`} className="group block">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] theme-eyebrow">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold theme-title group-hover:underline">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed theme-copy">
                      {item.cardSummary}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
