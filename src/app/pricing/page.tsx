'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const pricingPlans = [
  {
    name: 'Guest Mode',
    price: '€0',
    period: 'Altijd Gratis',
    description: 'Probeer SkillQuest zonder account',
    color: 'from-gray-400 to-gray-600',
    features: [
      { text: 'Basis timer (Pomodoro 🍅)', included: true },
      { text: 'Skill selectie (78 skills)', included: true },
      { text: 'XP & Level systeem', included: true },
      { text: 'Lokale progress tracking', included: true },
      { text: '3 gratis themes', included: true },
      { text: 'Cloud sync & backup', included: false },
      { text: 'Vrienden & challenges', included: false },
      { text: 'Ranglijsten & rankings', included: false },
      { text: 'Statistieken & analytics', included: false },
      { text: 'Streaks & notificaties', included: false },
    ],
    cta: 'Start als Gast',
    ctaLink: '/download',
    popular: false,
  },
  {
    name: 'Gratis Account',
    price: '€0',
    period: 'Altijd Gratis',
    description: 'Volledige cloud sync en social features',
    color: 'from-accent-green to-emerald-600',
    features: [
      { text: 'Alles in Guest Mode, plus:', included: true, bold: true },
      { text: 'Cloud sync & automatische backup', included: true },
      { text: 'Vrienden systeem & challenges', included: true },
      { text: 'League rankings & leaderboards', included: true },
      { text: 'Statistieken (7 dagen history)', included: true },
      { text: 'Streak tracking met freeze optie', included: true },
      { text: 'Push notificaties', included: true },
      { text: 'Multi-device sync', included: true },
      { text: 'Premium timer technieken', included: false },
      { text: 'Geavanceerde analytics', included: false },
      { text: '19 premium themes', included: false },
      { text: 'Data export (CSV/PDF)', included: false },
    ],
    cta: 'Maak Gratis Account',
    ctaLink: '/download',
    popular: true,
  },
  {
    name: 'Premium',
    price: '€3.99',
    period: 'per maand',
    description: 'Alle geavanceerde features voor power users',
    color: 'from-primary-500 to-primary-700',
    features: [
      { text: 'Alles in Gratis Account, plus:', included: true, bold: true },
      { text: 'Deep Work timer (🌊 90min)', included: true },
      { text: '52-17 Rule timer (📊 52min)', included: true },
      { text: 'Flowtime timer (⚡ custom)', included: true },
      { text: 'Geavanceerde analytics & trends', included: true },
      { text: 'Onbeperkte session history', included: true },
      { text: 'Data export (CSV & PDF reports)', included: true },
      { text: 'Premium audio packs', included: true },
      { text: 'Custom Flowtime duraties', included: true },
      { text: '19 premium themes', included: true },
      { text: 'Priority support', included: true },
      { text: 'Early access nieuwe features', included: true },
    ],
    cta: 'Upgrade naar Premium',
    ctaLink: '/download',
    popular: false,
    alternativePricing: [
      { period: 'Maandelijks', price: '€3.99', description: 'Cancel anytime' },
      { period: 'Jaarlijks', price: '€39.99', description: 'Bespaar 17% (€3.33/maand)', highlight: true },
      { period: 'Lifetime Early Bird', price: '€89.99', description: '55% korting - Eerste 50 gebruikers!', earlyBird: true, originalPrice: '€199.99' },
    ],
  },
]

const familyPlan = {
  title: 'Family Plan',
  description: 'Premium voor het hele gezin',
  icon: '👨‍👩‍👧‍👦',
  color: 'from-accent-purple to-purple-700',
  features: [
    'Alle Premium features',
    'Tot 6 familie leden',
    'Ouder-kind timer control',
    'Gedeelde challenges',
    'Familie statistieken',
    'Aparte accounts per lid',
  ],
  pricing: [
    { period: 'Maandelijks', price: '€6.99', description: 'Voor 6 personen' },
    { period: 'Jaarlijks', price: '€69.99', description: 'Bespaar 17% (€5.83/maand)' },
  ],
}

const faqs = [
  {
    question: 'Wat is het verschil tussen Guest Mode en een Gratis Account?',
    answer: 'Guest Mode slaat al je progress lokaal op je device op - perfect om de app te proberen. Met een Gratis Account krijg je cloud sync, vrienden, rankings, statistieken en streaks. Je kunt later altijd upgraden van Guest naar Account en al je XP blijft behouden!',
  },
  {
    question: 'Welke timer technieken zijn gratis beschikbaar?',
    answer: 'De Pomodoro timer (🍅 25min work, 5min break) is gratis voor iedereen. Premium gebruikers krijgen toegang tot Deep Work (🌊 90min), 52-17 Rule (📊 52min), en Flowtime (⚡ custom duration) technieken.',
  },
  {
    question: 'Wat zijn de voordelen van Premium?',
    answer: 'Premium geeft je toegang tot geavanceerde timer technieken (Deep Work, 52-17, Flowtime), onbeperkte session history, gedetailleerde analytics & trends, data export naar CSV/PDF, premium audio packs, custom timers, en 19 prachtige premium themes.',
  },
  {
    question: 'Kan ik upgraden van Gratis naar Premium?',
    answer: 'Ja! Al je progress, XP, levels, vrienden, en statistics blijven volledig behouden. Je ontgrendelt direct alle premium features zonder data te verliezen.',
  },
  {
    question: 'Hoe werkt de Lifetime Early Bird aanbieding?',
    answer: 'De eerste 50 gebruikers kunnen Premium Lifetime kopen voor €89.99 in plaats van €199.99 - dat is 55% korting! Eén keer betalen, levenslang toegang tot alle premium features inclusief toekomstige updates.',
  },
  {
    question: 'Wat is het Family Plan?',
    answer: 'Met het Family Plan krijgen tot 6 familie leden volledige Premium toegang. Ouders kunnen timers starten voor kinderen, er zijn gedeelde challenges, en iedereen heeft zijn eigen account met cloud sync.',
  },
  {
    question: 'Is er een refund policy?',
    answer: 'Ja, we bieden een 30-dagen geld-terug-garantie op alle Premium abonnementen. Als het niet aan je verwachtingen voldoet, krijg je je geld volledig terug.',
  },
  {
    question: 'Krijg ik toekomstige updates?',
    answer: 'Ja! Alle Premium abonnementen (maandelijks, jaarlijks, lifetime) geven je toegang tot alle toekomstige feature updates, nieuwe timer technieken, extra themes, en verbeteringen zonder extra kosten.',
  },
]

export default function PricingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

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
              Simpele, Eerlijke Prijzen
              <span className="block text-accent-orange text-4xl md:text-5xl mt-2">
                Begin Gratis, Upgrade Als Je Klaar Bent
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Start als gast, maak een gratis account, of upgrade naar Premium.
              <br />
              Alle opties geven je toegang tot skill tracking met XP & levels.
            </p>
            <div className="inline-block bg-accent-yellow text-gray-900 px-6 py-3 rounded-full font-bold text-lg">
              🎉 Lifetime Early Bird: €89.99 - Eerste 50 gebruikers!
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

      {/* Pricing Cards - 3 Column Layout */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative bg-white rounded-3xl p-6 border-2 ${
                  plan.popular ? 'border-accent-green shadow-2xl md:scale-105' : 'border-gray-200 shadow-lg'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-green text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg">
                    ⭐ Aanbevolen
                  </div>
                )}

                <div className={`inline-block bg-gradient-to-br ${plan.color} text-white px-5 py-2 rounded-2xl mb-4`}>
                  <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-lg text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
                </div>

                <Link
                  href={plan.ctaLink}
                  className={`block w-full text-center py-3 rounded-2xl font-bold text-base mb-6 transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-accent-green to-emerald-600 text-white hover:shadow-xl hover:scale-105'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm ${
                        feature.bold ? 'font-bold text-gray-900 mt-3' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">
                        {feature.included ? '✅' : '❌'}
                      </span>
                      <span className={!feature.included ? 'opacity-50' : ''}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Alternative Pricing for Premium */}
                {plan.alternativePricing && (
                  <div className="mt-6 pt-6 border-t-2 border-gray-100">
                    <p className="text-sm font-bold text-gray-900 mb-3">Kies je plan:</p>
                    {plan.alternativePricing.map((pricing, i) => (
                      <div
                        key={i}
                        className={`mb-2 p-3 rounded-xl border-2 ${
                          pricing.earlyBird
                            ? 'border-accent-yellow bg-accent-yellow/10'
                            : pricing.highlight
                            ? 'border-accent-green bg-accent-green/10'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-gray-900 text-sm">{pricing.period}</span>
                          <div className="flex items-center gap-2">
                            {pricing.earlyBird && pricing.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">{pricing.originalPrice}</span>
                            )}
                            <span className="font-bold text-primary-500">{pricing.price}</span>
                          </div>
                        </div>
                        <p className={`text-xs ${pricing.earlyBird ? 'text-accent-orange font-semibold' : 'text-gray-600'}`}>
                          {pricing.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Plan Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className={`max-w-4xl mx-auto bg-gradient-to-br ${familyPlan.color} text-white rounded-3xl p-8 shadow-2xl`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-6xl mb-4">{familyPlan.icon}</div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {familyPlan.title}
                </h2>
                <p className="text-white/90 mb-6 text-lg">
                  {familyPlan.description}
                </p>
                <ul className="space-y-3">
                  {familyPlan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <span className="text-white/95">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                {familyPlan.pricing.map((pricing, i) => (
                  <div
                    key={i}
                    className="mb-4 p-5 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-xl">{pricing.period}</span>
                      <span className="text-2xl font-bold">{pricing.price}</span>
                    </div>
                    <p className="text-white/90 text-sm">{pricing.description}</p>
                  </div>
                ))}
                <Link
                  href="/download"
                  className="block w-full text-center py-4 rounded-2xl font-bold text-lg bg-white text-gray-900 hover:shadow-xl hover:scale-105 transition-all mt-4"
                >
                  Start Family Plan
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              Veelgestelde Vragen
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-display text-lg font-bold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <span className="text-3xl text-primary-500 flex-shrink-0">
                      {openFaqIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              ))}
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
              Klaar Om Te Beginnen?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Download SkillQuest gratis en begin vandaag met skill tracking.
              Geen creditcard nodig, upgrade alleen als je er klaar voor bent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/download"
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all"
              >
                Download Gratis
              </Link>
              <Link
                href="/features"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border-2 border-white/40 hover:bg-white/30 transition-all"
              >
                Bekijk Alle Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
