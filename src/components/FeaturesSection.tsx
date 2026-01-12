'use client'

import {useTranslations} from 'next-intl'

export default function FeaturesSection() {
  const t = useTranslations('features')

  const features = [
    {
      icon: '👨‍👩‍👧‍👦',
      titleKey: 'cards.familyMode.title',
      descriptionKey: 'cards.familyMode.description',
      highlightKey: 'cards.familyMode.highlight'
    },
    {
      icon: '🎮',
      titleKey: 'cards.gamification.title',
      descriptionKey: 'cards.gamification.description',
      highlightKey: null
    },
    {
      icon: '⏱️',
      titleKey: 'cards.timerTechniques.title',
      descriptionKey: 'cards.timerTechniques.description',
      highlightKey: null
    },
    {
      icon: '📊',
      titleKey: 'cards.parentDashboard.title',
      descriptionKey: 'cards.parentDashboard.description',
      highlightKey: null
    },
    {
      icon: '🔥',
      titleKey: 'cards.autoFreezeStreaks.title',
      descriptionKey: 'cards.autoFreezeStreaks.description',
      highlightKey: null
    },
    {
      icon: '🌍',
      titleKey: 'cards.privacyFirst.title',
      descriptionKey: 'cards.privacyFirst.description',
      highlightKey: 'cards.privacyFirst.highlight'
    }
  ]

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            {t('heading')}
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-feature relative animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Highlight badge */}
              {feature.highlightKey && (
                <div className="absolute -top-3 -right-3 bg-accent-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {t(feature.highlightKey)}
                </div>
              )}

              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="heading-md mb-3 text-gray-900">{t(feature.titleKey)}</h3>
              <p className="text-body">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>

        {/* Additional benefits list */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h3 className="heading-md text-center mb-8 text-gray-900">
            {t('benefits.heading')}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">{t('benefits.items.skills78.title')}</strong>
                <p className="text-sm text-gray-600">{t('benefits.items.skills78.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">{t('benefits.items.multiDevice.title')}</strong>
                <p className="text-sm text-gray-600">{t('benefits.items.multiDevice.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">{t('benefits.items.offline.title')}</strong>
                <p className="text-sm text-gray-600">{t('benefits.items.offline.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">{t('benefits.items.weeklyReports.title')}</strong>
                <p className="text-sm text-gray-600">{t('benefits.items.weeklyReports.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">{t('benefits.items.familyChallenges.title')}</strong>
                <p className="text-sm text-gray-600">{t('benefits.items.familyChallenges.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">{t('benefits.items.languages.title')}</strong>
                <p className="text-sm text-gray-600">{t('benefits.items.languages.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
