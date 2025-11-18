'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const platforms = [
  {
    name: 'Android',
    icon: '🤖',
    color: 'from-accent-green to-emerald-600',
    badge: 'Google Play',
    link: '#', // TODO: Add actual Play Store link
    qrPlaceholder: 'QR Code - Google Play',
    stats: [
      { label: 'Rating', value: '4.8 ⭐' },
      { label: 'Downloads', value: '1K+' },
      { label: 'Size', value: '45 MB' },
    ],
  },
  {
    name: 'iOS',
    icon: '🍎',
    color: 'from-gray-700 to-gray-900',
    badge: 'App Store',
    link: '#', // TODO: Add actual App Store link
    qrPlaceholder: 'QR Code - App Store',
    stats: [
      { label: 'Rating', value: '4.9 ⭐' },
      { label: 'Downloads', value: 'Coming Soon' },
      { label: 'Size', value: '42 MB' },
    ],
  },
]

const features = [
  {
    icon: '📱',
    title: 'Cross-Platform Sync',
    description: 'Start op je telefoon, bekijk progress op tablet. Alles sync real-time.',
  },
  {
    icon: '🔒',
    title: 'Offline Mode',
    description: 'Geen internet? Geen probleem. Track skills offline, sync zodra je weer online bent.',
  },
  {
    icon: '🔔',
    title: 'Smart Notifications',
    description: 'Reminder om te oefenen, streak warnings, achievement unlocks - altijd op de hoogte.',
  },
  {
    icon: '⚡',
    title: 'Blazing Fast',
    description: 'Native performance met Flutter. Snelle load times, smooth animaties.',
  },
]

const screenshots = [
  { label: 'Home Dashboard', emoji: '🏠' },
  { label: 'Timer Active', emoji: '⏱️' },
  { label: 'Statistics', emoji: '📊' },
  { label: 'Leaderboards', emoji: '🏆' },
  { label: 'Profile', emoji: '👤' },
]

export default function DownloadPage() {
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
              Download SkillQuest
              <span className="block text-accent-orange text-4xl md:text-5xl mt-2">
                Beschikbaar Op Alle Devices
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Start je skill journey vandaag. Gratis download, geen creditcard nodig.
            </p>
          </motion.div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 fill-background-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Platform Cards */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className={`inline-flex items-center gap-3 bg-gradient-to-br ${platform.color} text-white px-6 py-3 rounded-2xl mb-6`}>
                  <span className="text-3xl">{platform.icon}</span>
                  <h3 className="font-display text-2xl font-bold">{platform.name}</h3>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-background-50 rounded-2xl p-8 mb-6 flex items-center justify-center border-2 border-gray-200">
                  <div className="text-center">
                    <div className="w-40 h-40 bg-gray-300 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                      <span className="text-6xl">📱</span>
                    </div>
                    <p className="text-sm text-gray-600">{platform.qrPlaceholder}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {platform.stats.map((stat, i) => (
                    <div key={i} className="bg-background-50 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Download Button */}
                <a
                  href={platform.link}
                  className={`block w-full text-center py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r ${platform.color} hover:shadow-xl hover:scale-105 transition-all`}
                >
                  Download voor {platform.name}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Web App Link */}
          <motion.div
            className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-accent-purple to-purple-700 text-white rounded-3xl p-8 text-center shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Of Gebruik De Web App
            </h3>
            <p className="text-white/90 mb-6">
              Geen download nodig? Gebruik SkillQuest direct in je browser op elk device.
            </p>
            <Link
              href="/app"
              className="inline-block px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Open Web App →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Waarom De SkillQuest App?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-background-50 rounded-2xl p-6 text-center border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Preview De App
          </motion.h2>

          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot.label}
                className="flex-shrink-0 w-64 snap-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-3xl p-4 shadow-xl border-2 border-gray-200">
                  <div className="aspect-[9/19] bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-3">{screenshot.emoji}</div>
                      <p className="text-gray-700 font-medium px-4">
                        [Screenshot]
                        <br />
                        <span className="text-sm">{screenshot.label}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-center font-semibold text-gray-900 mt-3">
                    {screenshot.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            Scroll horizontaal om meer screenshots te zien →
          </p>
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
              Klaar Om Te Starten?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Download nu en begin vandaag met het tracken van je skills.
              Gratis, geen creditcard nodig.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all"
              >
                🤖 Download Android
              </a>
              <a
                href="#"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border-2 border-white/40 hover:bg-white/30 transition-all"
              >
                🍎 Download iOS
              </a>
            </div>
            <p className="text-white/80 text-sm mt-6">
              Werkt op Android 8.0+ en iOS 12.0+
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
