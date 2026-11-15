import type {Metadata} from 'next';
import {Suspense} from 'react';
import Footer from '@/components/Footer';
import {NewsletterUnsubscribe} from '@/components/NewsletterPages';
import {routing} from '@/i18n/routing';
import {isLocale} from '@/lib/marketing';
import {newsletterUnsubscribeCopy} from '@/lib/newsletter-copy';

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
  return {
    title: `${newsletterUnsubscribeCopy[safeLocale].metaTitle} | SkillQuest`,
    // Reached only from a link in an email; the URL identifies the subscriber.
    robots: {index: false, follow: false},
    referrer: 'no-referrer'
  };
}

export default async function NewsletterUnsubscribePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = newsletterUnsubscribeCopy[safeLocale];

  return (
    <>
      <main className="theme-page flex min-h-screen items-center px-5 pb-24 pt-32">
        <div className="container-custom">
          <div className="max-w-xl">
            <Suspense fallback={<p className="theme-copy">{copy.loading}</p>}>
              <NewsletterUnsubscribe copy={copy} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
