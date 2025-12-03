'use client'

import { useState } from 'react'

export default function EmailCaptureSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'skill-quest-website'
        }),
      })

      if (response.status === 409) {
        // Duplicate email
        setStatus('duplicate')
        return
      }

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section className="section bg-gradient-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 border border-white/30">
              📬 Blijf op de hoogte
            </div>

            <h2 className="heading-lg mb-4">
              Wees de eerste die hoort over de launch
            </h2>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Meld je aan voor updates over nieuwe features, de officiële launch
              en tips over skill development voor het hele gezin.
            </p>
          </div>

          {/* Benefits list */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">🚀</span>
              <span className="text-blue-100">Early access bij launch</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">✨</span>
              <span className="text-blue-100">Nieuwe feature updates</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">💡</span>
              <span className="text-blue-100">Tips voor skill development</span>
            </div>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="je@email.com"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="btn btn-large bg-accent-orange text-white hover:bg-orange-600 shadow-2xl disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Bezig...' : status === 'success' ? '✅ Aangemeld!' : 'Houd me op de hoogte'}
              </button>
            </div>

            {status === 'success' && (
              <div className="bg-green-500 text-white px-6 py-3 rounded-lg mb-4 animate-slide-up">
                ✅ Je bent aangemeld! Check je inbox voor een bevestiging.
              </div>
            )}

            {status === 'duplicate' && (
              <div className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4 animate-slide-up">
                📧 Je staat al op de lijst! We sturen je bericht zodra er nieuws is.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-500 text-white px-6 py-3 rounded-lg mb-4">
                ❌ Er ging iets mis. Probeer het opnieuw.
              </div>
            )}

            <p className="text-sm text-blue-200">
              We respecteren je privacy. Geen spam, alleen relevante updates. Uitschrijven altijd mogelijk.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
