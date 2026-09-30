import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import {Link} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {createPageMetadata, isLocale, type Locale} from '@/lib/marketing';
import {
  formatReadingTime,
  getTips,
  getTipsUiCopy,
  tipPath,
  tipsIndexAlternates,
  tipsLocales
} from '@/lib/tips';

// Only locales with at least one article get a tips page.
export const dynamicParams = false;

export function generateStaticParams() {
  return tipsLocales().map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getTipsUiCopy(safeLocale);

  if (!copy) {
    return {};
  }

  const metadata = createPageMetadata({
    locale: safeLocale,
    path: '/tips',
    title: copy.metaTitle,
    description: copy.metaDescription
  });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      languages: tipsIndexAlternates()
    }
  };
}

export default async function TipsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getTipsUiCopy(safeLocale);
  const tips = getTips(safeLocale);

  if (!copy || tips.length === 0) {
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
              {tips.map((tip) => (
                <li key={tip.slug}>
                  <Link
                    href={tipPath(tip)}
                    className="group flex flex-col gap-1 py-6 transition hover:opacity-80"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide theme-eyebrow">
                      {tip.eyebrow} · {formatReadingTime(copy, tip.readingMinutes)}
                    </span>
                    <span className="font-display text-xl font-bold theme-title group-hover:underline">
                      {tip.title}
                    </span>
                    <span className="text-sm leading-relaxed theme-copy">
                      {tip.cardSummary}
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
