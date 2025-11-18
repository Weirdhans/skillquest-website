'use client'

export default function HowItWorksSection() {
  const steps = [
    {
      number: '1️⃣',
      title: 'Ouder Start Timer',
      description: 'Als parent account start je timers voor je kinderen op hun devices. Jij behoudt controle, zij krijgen de focus tools.',
      icon: '⏱️'
    },
    {
      number: '2️⃣',
      title: 'Kind Focust op Skill',
      description: 'Kies uit 78 skills: huiswerk, sport, muziek, coding, talen, mindfulness - alles wat hen sterker maakt.',
      icon: '🎯'
    },
    {
      number: '3️⃣',
      title: 'XP & Levels Unlock',
      description: 'Elke minuut oefenen = XP punten. Ze levelen op, unlocken achievements, en zien hun progressie visueel.',
      icon: '⚡'
    },
    {
      number: '4️⃣',
      title: 'Jij Ziet Statistieken',
      description: 'Parent dashboard toont exacte tijd per skill, streak tracking, en voortgang over tijd. Data-driven parenting.',
      icon: '📊'
    }
  ]

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            Zo Helpt SkillQuest Jouw Gezin Groeien
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            In 4 simpele stappen van chaos naar structuur
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Content (alternating left/right) */}
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''} animate-slide-up`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-5xl">{step.number}</span>
                    <div>
                      <h3 className="heading-md text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-body">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Visual placeholder */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 aspect-video flex items-center justify-center border-2 border-primary-100">
                    <div className="text-center">
                      <div className="text-7xl mb-4">{step.icon}</div>
                      <div className="text-sm text-gray-600">
                        [Screenshot: Step {index + 1}]
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting line (except for last step) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-8">
                  <div className="w-1 h-16 bg-gradient-to-b from-primary-300 to-primary-100 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="text-center mt-16">
          <button className="btn btn-primary btn-large">
            Start Gratis Nu →
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Geen credit card vereist • Setup in 2 minuten
          </p>
        </div>
      </div>
    </section>
  )
}
