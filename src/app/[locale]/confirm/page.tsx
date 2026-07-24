'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

function ConfirmContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const reason = searchParams.get('reason')
  const email = searchParams.get('email')

  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [resendError, setResendError] = useState<string | null>(null)

  const handleResend = async () => {
    if (!email) return

    setResendStatus('loading')
    setResendError(null)

    try {
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setResendStatus('success')
      } else {
        setResendStatus('error')
        setResendError(data.error || 'Er ging iets mis')
      }
    } catch {
      setResendStatus('error')
      setResendError('Er ging iets mis. Probeer het later opnieuw.')
    }
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="text-8xl mb-8">🎉</div>
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
          Je bent aangemeld!
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto">
          Bedankt voor het bevestigen van je e-mailadres. We houden je op de hoogte
          van SkillQuest updates.
        </p>
        <Link href="/" className="btn btn-primary inline-flex">
          Terug naar homepage
        </Link>
      </div>
    )
  }

  // Error states
  if (status === 'error') {
    let title = 'Er ging iets mis'
    let message = 'We konden je aanmelding niet verwerken.'
    let showResend = false

    switch (reason) {
      case 'expired':
        title = 'Link verlopen'
        message = 'Deze verificatielink is verlopen. Vraag een nieuwe aan.'
        showResend = true
        break
      case 'invalid':
        title = 'Ongeldige link'
        message = 'Deze verificatielink is ongeldig of al gebruikt.'
        break
      case 'already_verified':
        title = 'Al geverifieerd'
        message = 'Je e-mailadres is al bevestigd. Je staat op de update-lijst.'
        break
      case 'missing':
        title = 'Geen token gevonden'
        message = 'Er ontbreekt informatie in de verificatielink.'
        break
      case 'server_error':
        title = 'Server fout'
        message = 'Er ging iets mis aan onze kant. Probeer het later opnieuw.'
        break
    }

    return (
      <div className="text-center">
        <div className="text-8xl mb-8">
          {reason === 'already_verified' ? '✅' : '😕'}
        </div>
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto">{message}</p>

        {showResend && email && (
          <div className="mb-8">
            {resendStatus === 'success' ? (
              <div className="bg-primary-50 text-primary-800 px-6 py-4 rounded-lg inline-block">
                ✅ Nieuwe verificatie-email verzonden! Check je inbox.
              </div>
            ) : (
              <>
                <button
                  onClick={handleResend}
                  disabled={resendStatus === 'loading'}
                  className="btn btn-primary disabled:opacity-50"
                >
                  {resendStatus === 'loading'
                    ? 'Verzenden...'
                    : 'Nieuwe verificatie-email aanvragen'}
                </button>
                {resendStatus === 'error' && resendError && (
                  <p className="mt-4 text-red-600">{resendError}</p>
                )}
              </>
            )}
          </div>
        )}

        <Link href="/" className="text-primary-700 hover:text-primary-900 font-medium">
          ← Terug naar homepage
        </Link>
      </div>
    )
  }

  // Default: No status parameter - show generic page
  return (
    <div className="text-center">
      <div className="text-8xl mb-8">📧</div>
      <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
        Check je inbox
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto">
        We hebben je een e-mail gestuurd met een bevestigingslink.
        Klik op de link om je aanmelding te voltooien.
      </p>
      <p className="text-gray-600 mb-8">
        Geen e-mail ontvangen? Check je spam folder of{' '}
        <Link href="/" className="text-primary-700 hover:text-primary-900">
          meld je opnieuw aan
        </Link>
        .
      </p>
      <Link href="/" className="text-primary-700 hover:text-primary-900 font-medium">
        ← Terug naar homepage
      </Link>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <>
      <main className="min-h-screen bg-background-50 flex items-center justify-center p-4 pt-32 pb-24">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <Suspense
            fallback={
              <div className="text-center">
                <div className="text-6xl mb-8 animate-pulse">⏳</div>
                <p className="text-gray-600">Laden...</p>
              </div>
            }
          >
            <ConfirmContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
