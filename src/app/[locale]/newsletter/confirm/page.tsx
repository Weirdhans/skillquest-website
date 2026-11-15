import type {Metadata} from 'next';
import {Suspense} from 'react';
import Footer from '@/components/Footer';
import {NewsletterConfirm} from '@/components/NewsletterPages';
import {routing} from '@/i18n/routing';
import {isLocale} from '@/lib/marketing';
import {newsletterConfirmCopy} from '@/lib/newsletter-copy';

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
    title: `${newsletterConfirmCopy[safeLocale].metaTitle} | SkillQuest`,
    // Reached only from a confirmation email; the URL holds a personal token.
    robots: {index: false, follow: false},
    referrer: 'no-referrer'
  };
}

export default async function NewsletterConfirmPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = newsletterConfirmCopy[safeLocale];

  return (
    <>
      <main className="theme-page flex min-h-screen items-center px-5 pb-24 pt-32">
        <div className="container-custom">
          <div className="max-w-xl">
            <Suspense fallback={<p className="theme-copy">{copy.loading}</p>}>
              <NewsletterConfirm copy={copy} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
