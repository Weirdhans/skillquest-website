import type {Metadata} from 'next';
import Footer from '@/components/Footer';
import FeedbackForm from '@/components/FeedbackForm';
import {routing} from '@/i18n/routing';
import {createPageMetadata, isLocale} from '@/lib/marketing';
import {getFeedbackCopy} from '@/lib/feedback-copy';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const safeLocale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getFeedbackCopy(safeLocale);

  return {
    ...createPageMetadata({
      locale: safeLocale,
      path: '/feedback',
      title: copy.metaTitle,
      description: copy.metaDescription
    }),
    // A form for people who already use the app, not a page to rank.
    robots: {index: false, follow: true}
  };
}

export default async function FeedbackPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getFeedbackCopy(safeLocale);

  return (
    <>
      <main className="theme-page min-h-screen">
        <header className="container-custom pb-10 pt-32 md:pt-36">
          <div className="max-w-3xl border-b pb-10" style={{borderColor: 'var(--sq-border)'}}>
            <p className="text-sm font-semibold uppercase tracking-wide theme-eyebrow">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-section text-balance theme-title">
              {copy.heading}
            </h1>
            <p className="mt-4 text-lead theme-copy">{copy.intro}</p>
          </div>
        </header>

        <div className="container-custom pb-20">
          <FeedbackForm copy={copy} />
        </div>
      </main>

      <Footer />
    </>
  );
}
