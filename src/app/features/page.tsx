'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const featureCategories = [
  {
    title: 'Timer & Tracking',
    icon: '⏱️',
    color: 'bg-primary-500',
    features: [
      {
        name: '4 Timer Technieken',
        description: 'Pomodoro 🍅 (25min), Deep Work 🌊 (90min), 52-17 Rule 📊 (52min), en Flowtime ⚡ (custom duration). Deep Work, 52-17, en Flowtime zijn Premium features.',
        emoji: '🕐',
      },
      {
        name: 'Background Execution',
        description: 'Timer blijft werken wanneer je telefoon op standby gaat. Enterprise-grade foreground service bescherming met automatische batterij optimalisatie.',
        emoji: '🔋',
      },
      {
        name: '78 Skills Database',
        description: 'Kies uit 78 verschillende skills om te tracken - van coding en design tot fitness en muziek. Volledige skill taxonomie met categorieën.',
        emoji: '🎯',
      },
      {
        name: 'Session Recovery',
        description: 'Automatische state persistence & recovery. Verlies nooit je progress bij app crashes of systeem updates.',
        emoji: '💾',
      },
      {
        name: 'Multi-Sensory Alerts',
        description: 'Vibration, audio alerts, en push notificaties wanneer je timer compleet is. Premium audio packs beschikbaar.',
        emoji: '🔔',
      },
      {
        name: 'Custom Flowtime',
        description: 'Maak je eigen Flowtime duraties (1-120 minuten) met automatische break calculation. Premium feature.',
        emoji: '⚡',
      },
    ],
  },
  {
    title: 'Gamification',
    icon: '🎮',
    color: 'bg-accent-green',
    features: [
      {
        name: 'XP & Level Systeem',
        description: 'Verdien experience points voor elke focus sessie. Exponentiële XP curve zorgt voor langetermijn motivatie en eerlijke progression.',
        emoji: '⭐',
      },
      {
        name: 'Daily Streaks',
        description: 'Yazio-style streak tracking met freeze optie. Behoud je streak tijdens vakantie of ziekte met streak freeze credits.',
        emoji: '🔥',
      },
      {
        name: 'League Rankings',
        description: 'Competitief ranking systeem gebaseerd op total XP. Klimm de rankings en vergelijk je met andere gebruikers wereldwijd.',
        emoji: '🏆',
      },
      {
        name: 'Skill-Specific Leaderboards',
        description: 'Zie je positie per skill. Ben je de beste in Flutter development? Of de koning van Piano practice? Check de skill leaderboards.',
        emoji: '📊',
      },
      {
        name: 'Achievements & Badges',
        description: 'Unlock badges terwijl je je skills ontwikkelt. Van "First Session" tot "100 Hour Mastery" - verzamel ze allemaal.',
        emoji: '🎖️',
      },
      {
        name: 'Level-Based Unlocks',
        description: 'Ontgrendel nieuwe themes, features, en customization opties naarmate je level stijgt. Progressie voelt altijd beloond.',
        emoji: '🔓',
      },
    ],
  },
  {
    title: 'Social Features',
    icon: '👥',
    color: 'bg-accent-purple',
    features: [
      {
        name: 'Friends Systeem',
        description: 'Voeg vrienden toe via email of username. Volg hun progress, zie hun achievements, en motiveer elkaar om consistent te blijven.',
        emoji: '🤝',
      },
      {
        name: 'Skill Challenges',
        description: 'Daag vrienden uit voor skill battles. Wie behaalt meer XP in Flutter deze week? Competitie maakt skill development leuker.',
        emoji: '⚔️',
      },
      {
        name: 'Activity Feed',
        description: 'Real-time updates van wat je vrienden aan het leren zijn. Zie completed sessions, unlocked achievements, en new level ups.',
        emoji: '📰',
      },
      {
        name: 'Global Leaderboards',
        description: 'Vergelijk je met duizenden SkillQuest users wereldwijd. Filter op skill, periode, of total XP rankings.',
        emoji: '🌍',
      },
      {
        name: 'Shared Challenges',
        description: 'Doe mee met community challenges. Bijvoorbeeld: "100 Hours of Code" of "30 Days of Meditation". Samen is sterker.',
        emoji: '🎯',
      },
      {
        name: 'Social Notifications',
        description: 'Get notified wanneer vrienden je uitdagen, je positie op de leaderboard verandert, of iemand je achievement behaalt.',
        emoji: '🔔',
      },
    ],
  },
  {
    title: 'Analytics & Insights',
    icon: '📈',
    color: 'bg-accent-mint',
    features: [
      {
        name: 'Period-Based Statistics',
        description: 'Bekijk je progress per dag, week, maand of custom periode. Responsive charts met beautiful visualizations van je focus time.',
        emoji: '📊',
      },
      {
        name: 'Skill Breakdown Analytics',
        description: 'Gedetailleerde analytics per skill. Zie waar je de meeste tijd aan besteedt, je XP growth rate, en session consistency.',
        emoji: '🎯',
      },
      {
        name: 'Unlimited History',
        description: 'Premium feature: toegang tot alle session history zonder limiet. Free accounts krijgen 7 dagen history.',
        emoji: '📜',
      },
      {
        name: 'Trends & Patterns',
        description: 'Advanced analytics met trend detection. Ontdek je meest productieve uren, dagen, en technieken. Premium feature.',
        emoji: '📉',
      },
      {
        name: 'Data Export',
        description: 'Export je session data als CSV of genereer PDF reports. Perfect voor portfolio, accountability, of data analysis. Premium feature.',
        emoji: '📥',
      },
      {
        name: 'Timezone Support',
        description: 'Automatische timezone detection voor accurate statistieken wereldwijd. Werk je internationaal? Geen probleem.',
        emoji: '🌐',
      },
    ],
  },
  {
    title: 'Themes & Customization',
    icon: '🎨',
    color: 'bg-accent-yellow',
    features: [
      {
        name: '22 Premium Themes',
        description: '3 gratis themes + 19 premium themes. Van Ocean Blue en Sunset tot Midnight Purple en Forest Green. Material 3 compliant design.',
        emoji: '🌈',
      },
      {
        name: 'Enhanced Dark Mode',
        description: 'Geavanceerd dark mode algorithm met perfect contrast ratios. Elke theme heeft een beautiful dark variant die automatisch activeerde.',
        emoji: '🌙',
      },
      {
        name: 'Level-Based Unlocks',
        description: 'Unlock nieuwe themes naarmate je level stijgt. Level 10? Ontgrendel Emerald Dream. Level 25? Unlock Cosmic Galaxy.',
        emoji: '🔓',
      },
      {
        name: 'Seasonal Themes',
        description: 'Exclusieve seasonal themes tijdens speciale periodes. Winter Wonderland, Summer Vibes, Autumn Leaves - limited time only.',
        emoji: '🍂',
      },
      {
        name: 'Profile Customization',
        description: 'Personaliseer je profiel met avatars, bio, en skill showcases. Laat zien waar je trots op bent.',
        emoji: '👤',
      },
      {
        name: 'Material 3 Design',
        description: 'Modern, clean UI design 100% compliant met Material 3 guidelines. Harmonious colors, smooth animations, beautiful typography.',
        emoji: '✨',
      },
    ],
  },
  {
    title: 'Family & Multi-User',
    icon: '👨‍👩‍👧‍👦',
    color: 'bg-accent-pink',
    features: [
      {
        name: 'Family Plan (6 Members)',
        description: 'Tot 6 familie leden krijgen volledige Premium toegang. Aparte accounts, shared challenges, family statistics dashboard.',
        emoji: '👨‍👩‍👧',
      },
      {
        name: 'Parent-Child Timer Control',
        description: 'Ouders kunnen timers starten voor hun kinderen vanuit het family dashboard. Perfect voor structuur en routine.',
        emoji: '⏱️',
      },
      {
        name: 'Role-Based Access',
        description: 'Parent en Child roles met verschillende permissies. Parents beheren, children tracken hun eigen skills met guidance.',
        emoji: '🔐',
      },
      {
        name: 'Family Challenges',
        description: 'Shared challenges voor het hele gezin. "Family Reading Hour" of "Weekend Fitness Challenge" - grow together.',
        emoji: '🎯',
      },
      {
        name: 'Individual Progress',
        description: 'Elk familie lid heeft zijn eigen XP, levels, achievements, en statistics. Privacy en personal growth gecombineerd.',
        emoji: '📊',
      },
      {
        name: 'Multi-Device Sync',
        description: 'Familie members kunnen op elk device inloggen. Progress blijft automatisch gesynchroniseerd via cloud.',
        emoji: '📱',
      },
    ],
  },
  {
    title: 'Core Experience',
    icon: '⚙️',
    color: 'bg-gray-600',
    features: [
      {
        name: 'Guest Mode',
        description: 'Probeer SkillQuest zonder account. Lokale XP tracking met SharedPreferences. Upgrade later naar cloud sync - al je progress blijft behouden.',
        emoji: '👋',
      },
      {
        name: 'Cloud Sync & Backup',
        description: 'Automatische cloud sync met Supabase. Je progress is veilig backed-up en sync naar al je devices. Gratis Account feature.',
        emoji: '☁️',
      },
      {
        name: 'Push Notifications',
        description: 'Smart reminders om te oefenen, streak warnings voordat je je streak verliest, achievement unlocks, en friend challenges. Account feature.',
        emoji: '🔔',
      },
      {
        name: '6 Languages',
        description: 'Volledige multi-language support: Nederlands, Engels, Duits, Frans, Spaans, Italiaans. 10,914+ professionele vertalingen via DeepL API.',
        emoji: '🌍',
      },
      {
        name: 'Offline Mode',
        description: 'Geen internet? Geen probleem. Track je skills offline, data wordt automatisch gesynchroniseerd zodra je weer online bent.',
        emoji: '📵',
      },
      {
        name: 'Enterprise Cache System',
        description: '50-90% database query reductie met intelligent in-memory caching. Lightning fast performance zonder battery drain.',
        emoji: '🚀',
      },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20 pt-32 md:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Features Die Je Skills
              <span className="block text-accent-orange text-4xl md:text-5xl mt-2">
                Naar Het Volgende Level Brengen
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Van enterprise-grade background timers tot social challenges.
              <br />
              SkillQuest heeft alles wat je nodig hebt om consistent te groeien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/download"
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all"
              >
                Download Gratis ✨
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border-2 border-white/40 hover:bg-white/30 transition-all"
              >
                Bekijk Prijzen
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 fill-background-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {featureCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className={`${category.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl`}>
                    {category.icon}
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.name}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 group"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.08 }}
                      whileHover={{ y: -8, borderColor: '#007AFF' }}
                    >
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.emoji}</div>
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                        {feature.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
              Gratis vs Premium Features
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12">
              Begin gratis met volledige timer functionaliteit. Upgrade naar Premium voor geavanceerde technieken en analytics.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Features */}
              <motion.div
                className="bg-gradient-to-br from-accent-green to-emerald-600 text-white rounded-3xl p-8 shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-5xl mb-4">🆓</div>
                <h3 className="font-display text-2xl font-bold mb-4">Gratis Account</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🍅</span>
                    <span>Pomodoro Timer (25min work, 5min break)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">☁️</span>
                    <span>Cloud sync & automatische backup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">👥</span>
                    <span>Friends, challenges & activity feed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🏆</span>
                    <span>League rankings & leaderboards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <span>Basis statistieken (7 dagen history)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🔥</span>
                    <span>Streak tracking met freeze optie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎨</span>
                    <span>3 gratis themes met dark mode</span>
                  </li>
                </ul>
              </motion.div>

              {/* Premium Features */}
              <motion.div
                className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-4 right-4 bg-accent-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                  Premium ⭐
                </div>
                <div className="text-5xl mb-4">💎</div>
                <h3 className="font-display text-2xl font-bold mb-4">Premium Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🌊</span>
                    <span>Deep Work timer (90min focus sessions)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <span>52-17 Rule timer (optimal work-break ratio)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <span>Flowtime timer (custom duraties 1-120min)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📈</span>
                    <span>Onbeperkte session history & trends</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📥</span>
                    <span>Data export (CSV & PDF reports)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎵</span>
                    <span>Premium audio packs & soundscapes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🌈</span>
                    <span>19 premium themes + seasonal themes</span>
                  </li>
                </ul>
                <Link
                  href="/pricing"
                  className="block w-full text-center mt-6 py-3 bg-white text-gray-900 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                >
                  Bekijk Premium Prijzen
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent-green to-emerald-600 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Klaar Om Te Groeien?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Download SkillQuest nu en begin vandaag met het masteren van je skills.
              Gratis te gebruiken, geen creditcard nodig.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/download"
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all"
              >
                Download Gratis
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border-2 border-white/40 hover:bg-white/30 transition-all"
              >
                Bekijk Prijzen
              </Link>
            </div>
            <p className="text-white/80 text-sm mt-6">
              Beschikbaar op Android 8.0+ en iOS 12.0+ • 78 skills • 6 talen • Cloud sync
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
