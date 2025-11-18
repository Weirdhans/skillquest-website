import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800'],
})

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} ${nunito.variable} font-sans bg-background-50`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
