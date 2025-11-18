'use client'

export default function FeaturesSection() {
  const features = [
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Familie Modus',
      description: 'Parent-child accounts met role-based permissions. Jij controleert, zij focussen. Perfect voor kinderen 6-18 jaar.',
      highlight: 'Uniek!'
    },
    {
      icon: '🎮',
      title: 'Gamificatie die Werkt',
      description: 'XP, levels, streaks, rankings, achievements. Vaardigheden leren voelt als een game, maar bouwt echte skills.',
      highlight: null
    },
    {
      icon: '⏱️',
      title: '7 Timer Technieken',
      description: 'Pomodoro, Flowtime, 52/17, Ultradian, Custom - wetenschappelijk bewezen methodes voor focus.',
      highlight: null
    },
    {
      icon: '📊',
      title: 'Ouder Dashboard',
      description: 'Real-time inzicht in wat je kinderen oefenen. Geen micromanagement, wel overzicht.',
      highlight: null
    },
    {
      icon: '🔥',
      title: 'Auto-Freeze Streaks',
      description: 'Beschermt streaks automatisch op drukke dagen. Geen frustratie, wel motivatie.',
      highlight: null
    },
    {
      icon: '🌍',
      title: 'Privacy First',
      description: 'Nederlandse servers, GDPR compliant, geen data verkocht. Jouw gezin, jouw data.',
      highlight: '100% Safe'
    }
  ]

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            Waarom Families SkillQuest Kiezen
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Alles wat je nodig hebt om je gezin te helpen groeien
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
              {feature.highlight && (
                <div className="absolute -top-3 -right-3 bg-accent-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {feature.highlight}
                </div>
              )}

              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="heading-md mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-body">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional benefits list */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h3 className="heading-md text-center mb-8 text-gray-900">
            + Nog Veel Meer Voordelen
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">78 Verschillende Skills</strong>
                <p className="text-sm text-gray-600">Van coding tot sport, alles is trackbaar</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">Multi-Device Sync</strong>
                <p className="text-sm text-gray-600">Werkt op iOS, Android, Web</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">Offline Modus</strong>
                <p className="text-sm text-gray-600">Tracken zonder internet, sync later</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">Weekly Reports</strong>
                <p className="text-sm text-gray-600">Automatische voortgangsrapporten per email</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">Familie Challenges</strong>
                <p className="text-sm text-gray-600">Gezinsleden kunnen elkaar uitdagen</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="text-gray-900">6 Talen</strong>
                <p className="text-sm text-gray-600">NL, EN, DE, FR, ES, IT volledig ondersteund</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
