'use client'

export default function PainPointsSection() {
  const painPoints = [
    {
      emoji: '😰',
      title: 'Schermtijd Strijd',
      description: 'Je kind zit uren aan een scherm, maar niet met iets nuttig. Gaming en social media domineren hun tijd.'
    },
    {
      emoji: '📚',
      title: 'Huiswerk Drama',
      description: 'Elke avond dezelfde discussie over huiswerk. Ze weten niet hoe ze moeten focussen.'
    },
    {
      emoji: '🎯',
      title: 'Geen Structuur',
      description: 'Ze hebben potentieel, maar missen discipline. Je weet niet hoe je hen kunt helpen structureren.'
    }
  ]

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Herken Je Dit?</h2>
          <p className="text-body max-w-2xl mx-auto">
            Je bent niet de enige ouder die worstelt met deze uitdagingen.
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
              <h3 className="heading-md mb-4 text-gray-900">{point.title}</h3>
              <p className="text-body">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Success story */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2">
            {/* Story content */}
            <div className="p-8 md:p-12">
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ✨ Transformatie Verhaal
              </div>

              <h3 className="heading-md mb-6 text-gray-900">
                Van Chaos naar Controle:
                <br />
                <span className="text-primary-500">De Transformatie van Familie Jansen</span>
              </h3>

              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic border-l-4 border-primary-500 pl-6">
                "Mijn zoon Lucas (14) wilde altijd programmeren leren, maar kon zich niet focussen.
                Met SkillQuest kan ik timers voor hem starten wanneer hij uit school komt.
                Na 3 maanden: <strong>47 uur coding geoefend</strong>, eerste app gebouwd, en zijn zelfvertrouwen?
                <span className="text-primary-500 font-bold"> Door het plafond! 🚀</span>"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                  👩
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Marieke J.</div>
                  <div className="text-sm text-gray-600">Moeder van 2</div>
                </div>
              </div>
            </div>

            {/* Before/After visual */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                {/* Before */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-6 border-2 border-red-200">
                  <div className="text-sm font-semibold text-red-600 mb-2">❌ VOOR SkillQuest</div>
                  <div className="text-sm text-gray-700">
                    • 4+ uur gaming per dag
                    <br />
                    • Geen focus bij huiswerk
                    <br />
                    • Laag zelfvertrouwen
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center text-4xl">⬇️</div>

                {/* After */}
                <div className="bg-white backdrop-blur rounded-xl p-6 border-2 border-green-200 shadow-lg">
                  <div className="text-sm font-semibold text-green-600 mb-2">✅ NA SkillQuest</div>
                  <div className="text-sm text-gray-700">
                    • <strong>47 uur</strong> coding geoefend
                    <br />
                    • Eerste app gebouwd
                    <br />
                    • Zelfvertrouwen door het plafond
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
