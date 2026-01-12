'use client'

import {useTranslations} from 'next-intl'

export default function PainPointsSection() {
  const t = useTranslations('painPoints')

  const painPoints = [
    {
      emoji: '😰',
      titleKey: 'points.screentime.title',
      descriptionKey: 'points.screentime.description'
    },
    {
      emoji: '📚',
      titleKey: 'points.homework.title',
      descriptionKey: 'points.homework.description'
    },
    {
      emoji: '🎯',
      titleKey: 'points.noStructure.title',
      descriptionKey: 'points.noStructure.description'
    }
  ]

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">{t('heading')}</h2>
          <p className="text-body max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="card-feature text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-6xl mb-4">{point.emoji}</div>
              <h3 className="heading-md mb-4 text-gray-900">{t(point.titleKey)}</h3>
              <p className="text-body">{t(point.descriptionKey)}</p>
            </div>
          ))}
        </div>

        {/* Success story */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2">
            {/* Story content */}
            <div className="p-8 md:p-12">
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                {t('successStory.badge')}
              </div>

              <h3 className="heading-md mb-6 text-gray-900">
                {t('successStory.heading')}
                <br />
                <span className="text-primary-500">{t('successStory.headingAccent')}</span>
              </h3>

              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic border-l-4 border-primary-500 pl-6">
                {t('successStory.quote', {hours: t('successStory.quoteHours')})}
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                  👩
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t('successStory.author')}</div>
                  <div className="text-sm text-gray-600">{t('successStory.authorRole')}</div>
                </div>
              </div>
            </div>

            {/* Before/After visual */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                {/* Before */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-6 border-2 border-red-200">
                  <div className="text-sm font-semibold text-red-600 mb-2">{t('successStory.before.title')}</div>
                  <div className="text-sm text-gray-700">
                    • {t('successStory.before.point1')}
                    <br />
                    • {t('successStory.before.point2')}
                    <br />
                    • {t('successStory.before.point3')}
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center text-4xl">⬇️</div>

                {/* After */}
                <div className="bg-white backdrop-blur rounded-xl p-6 border-2 border-green-200 shadow-lg">
                  <div className="text-sm font-semibold text-green-600 mb-2">{t('successStory.after.title')}</div>
                  <div className="text-sm text-gray-700">
                    • {t('successStory.after.point1')}
                    <br />
                    • {t('successStory.after.point2')}
                    <br />
                    • {t('successStory.after.point3')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
