import { Inter, Nunito } from 'next/font/google'
import '../../styles/globals.css'
import Navbar from '@/components/Navbar'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {
  createPageMetadata,
  getMarketingCopy,
  isLocale,
  type Locale
} from '@/lib/marketing';

const locales = routing.locales;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800'],
})

const themeInitScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem('skillquest-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : prefersDark
        ? 'dark'
        : 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getMarketingCopy(safeLocale);

  return createPageMetadata({
    locale: safeLocale,
    title: copy.meta.title,
    description: copy.meta.description
  });
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  // Next.js 16 requires awaiting params
  const {locale} = await params;

  // Validate locale
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: themeInitScript}} />
      </head>
      <body className={`${inter.variable} ${nunito.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
