import type {Metadata} from 'next';
import Footer from '@/components/Footer';
import {HomeMarketingPage} from '@/components/MarketingPages';
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
    title: copy.meta.title,
    description: copy.meta.description
  });
}

export default async function Home({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getMarketingCopy(safeLocale);

  return (
    <>
      <HomeMarketingPage locale={safeLocale} copy={copy} />
      <Footer />
    </>
  );
}
