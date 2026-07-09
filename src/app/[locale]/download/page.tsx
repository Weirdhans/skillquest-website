import type {Metadata} from 'next';
import Footer from '@/components/Footer';
import {DownloadMarketingPage} from '@/components/MarketingPages';
import {
  createPageMetadata,
  getMarketingCopy,
  isLocale,
  type Locale
} from '@/lib/marketing';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getMarketingCopy(safeLocale);

  return createPageMetadata({
    locale: safeLocale,
    path: '/download',
    title: copy.download.metaTitle,
    description: copy.download.metaDescription
  });
}

export default async function DownloadPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getMarketingCopy(safeLocale);

  return (
    <>
      <DownloadMarketingPage locale={safeLocale} copy={copy} />
      <Footer />
    </>
  );
}
