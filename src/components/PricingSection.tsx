'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PricingSection() {
  return (
    <section id="pricing" className="section bg-white">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg mb-4">
            Simpele, Eerlijke Prijzen
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Begin gratis en upgrade naar Premium voor geavanceerde features
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* GUEST MODE */}
          <motion.div
            className="card border-2 border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-6">
              <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                👋 GUEST
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">€0</div>
              <p className="text-sm text-gray-600">Probeer gratis</p>
            </div>

            <ul className="space-y-2 mb-6 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Basis timer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">78 skills</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">XP & Levels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-lg flex-shrink-0">❌</span>
                <span className="text-gray-500">Cloud sync</span>
              </li>
            </ul>

            <Link href="/download" className="btn btn-secondary w-full text-sm py-2">
              Start als Gast
            </Link>
          </motion.div>

          {/* GRATIS ACCOUNT */}
          <motion.div
            className="card border-2 border-accent-green"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-6">
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                🆓 GRATIS
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">€0</div>
              <p className="text-sm text-gray-600">Altijd gratis</p>
            </div>

            <ul className="space-y-2 mb-6 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Cloud sync</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Social features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Rankings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Streaks</span>
              </li>
            </ul>

            <Link href="/download" className="btn btn-secondary w-full text-sm py-2">
              Maak Account
            </Link>
          </motion.div>

          {/* PREMIUM - POPULAR */}
          <motion.div
            className="card border-4 border-primary-500 relative shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-orange text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
              🔥 POPULAIR
            </div>

            <div className="mb-6 pt-2">
              <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                💎 PREMIUM
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                €3.99
                <span className="text-sm text-gray-500">/maand</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">
                €39.99/jaar (17% korting)
              </p>
              <p className="text-xs text-accent-orange font-semibold">
                Lifetime: €89.99
              </p>
            </div>

            <ul className="space-y-2 mb-6 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Deep Work timer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">52-17 & Flowtime</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Unlimited history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">19 premium themes</span>
              </li>
            </ul>

            <Link href="/pricing" className="btn btn-primary w-full text-sm py-2">
              Bekijk Premium
            </Link>
          </motion.div>

          {/* FAMILY PLAN */}
          <motion.div
            className="card border-2 border-accent-purple relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-6">
              <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                👨‍👩‍👧‍👦 FAMILY
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                €6.99
                <span className="text-sm text-gray-500">/maand</span>
              </div>
              <p className="text-xs text-gray-600">
                €69.99/jaar (17% korting)
              </p>
            </div>

            <ul className="space-y-2 mb-6 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700"><strong>6 familie leden</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Alle Premium</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Parent-child timers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                <span className="text-gray-700">Family challenges</span>
              </li>
            </ul>

            <Link href="/pricing" className="btn btn-secondary w-full text-sm py-2">
              Bekijk Family
            </Link>
          </motion.div>
        </div>

        {/* CTA to full pricing page */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold text-lg transition-colors"
          >
            Bekijk volledige prijzen & vergelijking →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
