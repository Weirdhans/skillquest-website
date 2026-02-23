'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

type Platform = 'ios' | 'android' | 'both'
type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate' | 'pending_verification'

export default function EmailCaptureSection() {
  const t = useTranslations('waitlist')
  const [email, setEmail] = useState('')
  const [platform, setPlatform] = useState<Platform>('both')
  const [status, setStatus] = useState<Status>('idle')
  const [pendingEmail, setPendingEmail] = useState<string | null>(null)

  // Check if email is Gmail for Android beta testing
  const isGmailEmail = email.toLowerCase().endsWith('@gmail.com')
  const showAndroidWarning = (platform === 'android' || platform === 'both') && email && !isGmailEmail
  const showIosInfo = (platform === 'ios' || platform === 'both') && email

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          platform,
        }),
      })

      const data = await response.json()

      if (response.status === 409) {
        if (data.error === 'pending_verification') {
          // Email exists but not verified - show resend option
          setStatus('pending_verification')
          setPendingEmail(data.email)
        } else {
          // Already verified
          setStatus('duplicate')
        }
        return
      }

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleResend = async () => {
    if (!pendingEmail) return

    setStatus('loading')

    try {
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail }),
      })

      if (response.ok) {
        setStatus('success')
        setPendingEmail(null)
      } else {
        if (response.status === 429) {
          // Rate limited - show message but keep pending_verification state
          setStatus('pending_verification')
        } else {
          setStatus('error')
        }
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="section bg-gradient-primary text-white relative overflow-hidden scroll-mt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 border border-white/30">
              {t('badge')}
            </div>

            <h2 className="heading-lg mb-4">
              {t('heading')}
            </h2>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              {t('subheading')}
            </p>
          </div>

          {/* Benefits list */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">🚀</span>
              <span className="text-blue-100">{t('benefits.earlyAccess')}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">✨</span>
              <span className="text-blue-100">{t('benefits.updates')}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <span className="text-2xl mr-2">💡</span>
              <span className="text-blue-100">{t('benefits.tips')}</span>
            </div>
          </div>

          {/* Platform selector */}
          <div className="max-w-md mx-auto mb-8">
            <p className="text-blue-100 mb-4 text-sm">{t('platform.question')}</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPlatform('ios')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  platform === 'ios'
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {t('platform.ios')}
              </button>
              <button
                type="button"
                onClick={() => setPlatform('android')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  platform === 'android'
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {t('platform.android')}
              </button>
              <button
                type="button"
                onClick={() => setPlatform('both')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  platform === 'both'
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {t('platform.both')}
              </button>
            </div>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('form.placeholder')}
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="btn btn-large bg-accent-orange text-white hover:bg-orange-600 shadow-2xl disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? t('form.submitting') : status === 'success' ? t('form.submitted') : t('form.submit')}
              </button>
            </div>

            {status === 'success' && (
              <div className="bg-green-500 text-white px-6 py-3 rounded-lg mb-4 animate-slide-up">
                {t('messages.success')}
              </div>
            )}

            {status === 'duplicate' && (
              <div className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4 animate-slide-up">
                {t('messages.duplicate')}
              </div>
            )}

            {status === 'pending_verification' && (
              <div className="bg-amber-500 text-white px-6 py-3 rounded-lg mb-4 animate-slide-up">
                <p className="mb-2">{t('messages.pendingVerification')}</p>
                <button
                  type="button"
                  onClick={handleResend}
                  className="underline hover:no-underline font-medium"
                >
                  {t('messages.resendLink')}
                </button>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-500 text-white px-6 py-3 rounded-lg mb-4">
                {t('messages.error')}
              </div>
            )}

            {/* Gmail warning for Android */}
            {showAndroidWarning && status === 'idle' && (
              <div className="bg-amber-500/90 text-white px-6 py-4 rounded-lg mb-4 text-left animate-slide-up">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">⚠️</span>
                  <div>
                    <p className="font-semibold mb-1">Android Beta Vereist Gmail Account</p>
                    <p className="text-sm text-white/90">
                      Google Play Console accepteert alleen <strong>@gmail.com</strong> email adressen voor beta testing.
                      Je huidige email ({email}) werkt niet voor Android testing.
                    </p>
                    <p className="text-sm text-white/90 mt-2">
                      💡 <strong>Tip:</strong> Gebruik je persoonlijke Gmail account, of kies alleen &quot;iOS&quot; als platform.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* iOS Apple ID info */}
            {showIosInfo && !showAndroidWarning && status === 'idle' && (
              <div className="bg-blue-500/90 text-white px-6 py-4 rounded-lg mb-4 text-left animate-slide-up">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">ℹ️</span>
                  <div>
                    <p className="font-semibold mb-1">iOS TestFlight Tip</p>
                    <p className="text-sm text-white/90">
                      Voor iOS testing versturen we een uitnodiging naar het email adres van je Apple ID.
                      Dit mag elk email adres zijn (werk email, Gmail, iCloud, etc.).
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-sm text-blue-200">
              {t('privacy')}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
