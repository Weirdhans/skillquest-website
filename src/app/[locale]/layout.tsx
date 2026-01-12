import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import '../../styles/globals.css'
import Navbar from '@/components/Navbar'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

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

// Generate static params for all supported locales
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale
  }));
}

export const metadata: Metadata = {
  title: 'SkillQuest | Track Je Skills. Level Up Je Leven.',
  description: 'De ultieme skill-tracking app waarmee je elke vaardigheid bijhoudt, progress visualiseert en gemotiveerd blijft door gamification.',
  keywords: 'skill tracking app, timer app, vaardigheden ontwikkelen, productivity app, gamification, XP levels, progress tracking',
  authors: [{ name: 'SkillQuest Team' }],
  openGraph: {
    title: 'SkillQuest - Track Je Skills. Level Up Je Leven.',
    description: 'De ultieme skill-tracking app met smart timers, analytics en gamification.',
    url: 'https://skill-quest.app',
    siteName: 'SkillQuest',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillQuest - Skill Tracking App',
    description: 'Track je skills, visualiseer progress, stay motivated.',
  },
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
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${nunito.variable} font-sans bg-background-50`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
