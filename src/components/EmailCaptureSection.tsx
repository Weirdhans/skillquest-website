'use client'

import { useState } from 'react'

export default function EmailCaptureSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          variant: 'family-first',
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        // Optional: redirect to thank-you page
        // window.location.href = '/bedankt'
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
          {/* Lead magnet offer */}
          <div className="mb-8">
            <div className="inline-block bg-accent-orange text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-xl animate-bounce-slow">
              🎁 GRATIS E-BOOK
            </div>

            <h2 className="heading-lg mb-4">
              10 Vaardigheden Die Elk Kind Zou Moeten Leren
            </h2>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Download ons gratis e-book en ontvang:
            </p>
          </div>

          {/* Benefits list */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">✉️</span>
              <span className="text-blue-100">10 essentiële skills voor de toekomst</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">✉️</span>
              <span className="text-blue-100">Wetenschappelijke studies over skill development</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">✉️</span>
              <span className="text-blue-100">Age-appropriate oefeningen per skill</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">✉️</span>
              <span className="text-blue-100">Exclusive early access tot premium features</span>
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
                {status === 'loading' ? 'Bezig...' : status === 'success' ? '✅ Verzonden!' : '📥 Download Gratis E-book'}
              </button>
            </div>

            {status === 'success' && (
              <div className="bg-green-500 text-white px-6 py-3 rounded-lg mb-4 animate-slide-up">
                ✅ Check je inbox voor de download link!
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-500 text-white px-6 py-3 rounded-lg mb-4">
                ❌ Er ging iets mis. Probeer het opnieuw.
              </div>
            )}

            <p className="text-sm text-blue-200">
              We respecteren je privacy. Geen spam. Uitschrijven altijd mogelijk.
            </p>
          </form>

          {/* Social proof */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-blue-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1,247</div>
              <div className="text-sm">Ouders ontvingen e-book</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-sm">Gemiddelde rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm">Beveelt aan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
