'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { isLocale, type Locale } from '@/lib/marketing'

type ConfirmCopy = {
  loading: string;
  success: { heading: string; body: string; button: string };
  errors: Record<
    'expired' | 'invalid' | 'already_verified' | 'missing' | 'server_error' | 'generic',
    { title: string; message: string }
  >;
  resend: { button: string; sending: string; success: string; genericError: string };
  backHome: string;
  default: { heading: string; body: string; noEmail: string; resignup: string; backHome: string };
};

const copyByLocale: Record<Locale, ConfirmCopy> = {
  nl: {
    loading: 'Bezig met laden...',
    success: {
      heading: 'Je bent aangemeld!',
      body: 'Bedankt voor het bevestigen van je e-mailadres. We houden je op de hoogte van het laatste nieuws over SkillQuest.',
      button: 'Terug naar de startpagina'
    },
    errors: {
      expired: { title: 'De link is verlopen', message: 'Deze verificatielink is verlopen. Vraag een nieuwe aan.' },
      invalid: { title: 'Ongeldige link', message: 'Deze verificatielink is ongeldig of is al gebruikt.' },
      already_verified: { title: 'Al geverifieerd', message: 'Je e-mailadres is al bevestigd. Je staat op de lijst voor updates.' },
      missing: { title: 'Geen token gevonden', message: 'Er ontbreekt wat informatie in de verificatielink.' },
      server_error: { title: 'Serverfout', message: 'Er is iets misgegaan aan onze kant. Probeer het later nog eens.' },
      generic: { title: 'Er is iets misgegaan', message: 'We konden je aanmelding niet verwerken.' }
    },
    resend: {
      button: 'Vraag een nieuwe verificatiemail aan',
      sending: 'Bezig met verzenden...',
      success: '✅ Er is een nieuwe bevestigingsmail verstuurd! Kijk even in je inbox.',
      genericError: 'Er is iets misgegaan. Probeer het later nog eens.'
    },
    backHome: '← Terug naar de startpagina',
    default: {
      heading: 'Kijk even in je inbox',
      body: 'We hebben je een e-mail gestuurd met een bevestigingslink. Klik op de link om je aanmelding af te ronden.',
      noEmail: 'Heb je geen e-mail gekregen? Kijk dan even in je spamfolder of',
      resignup: 'meld je opnieuw aan',
      backHome: '← Terug naar de startpagina'
    }
  },
  en: {
    loading: 'Loading...',
    success: {
      heading: "You're signed up!",
      body: "Thanks for confirming your email address. We'll keep you posted on SkillQuest updates.",
      button: 'Back to homepage'
    },
    errors: {
      expired: { title: 'Link expired', message: 'This verification link has expired. Request a new one.' },
      invalid: { title: 'Invalid link', message: 'This verification link is invalid or has already been used.' },
      already_verified: { title: 'Already verified', message: "Your email is already confirmed. You're on the update list." },
      missing: { title: 'No token found', message: 'Some information is missing from the verification link.' },
      server_error: { title: 'Server error', message: 'Something went wrong on our end. Please try again later.' },
      generic: { title: 'Something went wrong', message: "We couldn't process your signup." }
    },
    resend: {
      button: 'Request a new verification email',
      sending: 'Sending...',
      success: '✅ New verification email sent! Check your inbox.',
      genericError: 'Something went wrong. Please try again later.'
    },
    backHome: '← Back to homepage',
    default: {
      heading: 'Check your inbox',
      body: "We've sent you an email with a confirmation link. Click the link to complete your signup.",
      noEmail: "Didn't get an email? Check your spam folder or",
      resignup: 'sign up again',
      backHome: '← Back to homepage'
    }
  },
  de: {
    loading: 'Wird geladen...',
    success: {
      heading: 'Du bist angemeldet!',
      body: 'Danke, dass du deine E-Mail-Adresse bestätigt hast. Wir halten dich über Neuigkeiten zu SkillQuest auf dem Laufenden.',
      button: 'Zurück zur Startseite'
    },
    errors: {
      expired: { title: 'Der Link ist abgelaufen', message: 'Dieser Bestätigungslink ist abgelaufen. Fordere einen neuen an.' },
      invalid: { title: 'Ungültiger Link', message: 'Dieser Bestätigungslink ist ungültig oder wurde bereits verwendet.' },
      already_verified: { title: 'Bereits verifiziert', message: 'Deine E-Mail-Adresse ist bereits bestätigt. Du stehst auf der Update-Liste.' },
      missing: { title: 'Kein Token gefunden', message: 'Im Bestätigungslink fehlen einige Angaben.' },
      server_error: { title: 'Serverfehler', message: 'Bei uns ist ein Fehler aufgetreten. Bitte versuch es später noch einmal.' },
      generic: { title: 'Da ist was schiefgelaufen', message: 'Wir konnten deine Anmeldung nicht bearbeiten.' }
    },
    resend: {
      button: 'Eine neue Bestätigungs-E-Mail anfordern',
      sending: 'Wird gesendet...',
      success: '✅ Eine neue Bestätigungs-E-Mail wurde gesendet! Schau mal in deinen Posteingang.',
      genericError: 'Es ist ein Fehler aufgetreten. Bitte versuch es später noch einmal.'
    },
    backHome: '← Zurück zur Startseite',
    default: {
      heading: 'Schau mal in deinen Posteingang',
      body: 'Wir haben dir eine E-Mail mit einem Bestätigungslink geschickt. Klicke auf den Link, um deine Anmeldung abzuschließen.',
      noEmail: 'Hast du keine E-Mail bekommen? Schau mal in deinem Spam-Ordner nach oder',
      resignup: 'melde dich erneut an',
      backHome: '← Zurück zur Startseite'
    }
  },
  fr: {
    loading: 'Chargement en cours...',
    success: {
      heading: 'Tu es inscrit !',
      body: "Merci d'avoir confirmé ton adresse e-mail. On te tiendra au courant des dernières actualités de SkillQuest.",
      button: "Retour à la page d'accueil"
    },
    errors: {
      expired: { title: "Le lien n'est plus valide", message: 'Ce lien de vérification a expiré. Demande-en un nouveau.' },
      invalid: { title: 'Lien invalide', message: "Ce lien de vérification n'est pas valide ou a déjà été utilisé." },
      already_verified: { title: 'Déjà vérifié', message: 'Ton adresse e-mail a déjà été validée. Tu es inscrit à la liste de mise à jour.' },
      missing: { title: 'Aucun jeton trouvé', message: 'Il manque des infos dans le lien de vérification.' },
      server_error: { title: 'Erreur serveur', message: "Il y a eu un problème de notre côté. Essaie à nouveau plus tard." },
      generic: { title: 'Il y a eu un problème', message: "On n'a pas pu traiter ton inscription." }
    },
    resend: {
      button: 'Demander un nouvel e-mail de vérification',
      sending: 'Envoi en cours...',
      success: '✅ Un nouvel e-mail de vérification t\'a été envoyé ! Va jeter un œil dans ta boîte de réception.',
      genericError: "Une erreur s'est produite. Réessaie plus tard."
    },
    backHome: "← Retour à la page d'accueil",
    default: {
      heading: 'Vérifie ta boîte de réception',
      body: "On t'a envoyé un e-mail avec un lien de confirmation. Clique sur ce lien pour finaliser ton inscription.",
      noEmail: "Tu n'as pas reçu d'e-mail ? Vérifie ton dossier « Spam » ou",
      resignup: 'réinscris-toi',
      backHome: "← Retour à la page d'accueil"
    }
  },
  es: {
    loading: 'Cargando...',
    success: {
      heading: '¡Ya estás registrado!',
      body: 'Gracias por confirmar tu dirección de correo electrónico. Te mantendremos al tanto de las novedades de SkillQuest.',
      button: 'Volver a la página de inicio'
    },
    errors: {
      expired: { title: 'El enlace ha caducado', message: 'Este enlace de verificación ha caducado. Solicita uno nuevo.' },
      invalid: { title: 'Enlace no válido', message: 'Este enlace de verificación no es válido o ya se ha utilizado.' },
      already_verified: { title: 'Ya verificado', message: 'Ya hemos confirmado tu correo electrónico. Estás en la lista de actualizaciones.' },
      missing: { title: 'No se ha encontrado ningún token', message: 'Falta algo de información en el enlace de verificación.' },
      server_error: { title: 'Error del servidor', message: 'Ha habido un problema por nuestra parte. Inténtalo de nuevo más tarde.' },
      generic: { title: 'Ha pasado algo raro', message: 'No hemos podido procesar tu registro.' }
    },
    resend: {
      button: 'Solicita un nuevo correo electrónico de verificación',
      sending: 'Enviando...',
      success: '✅ ¡Te acabamos de enviar un nuevo correo de verificación! Echa un vistazo a tu bandeja de entrada.',
      genericError: 'Ha habido un error. Inténtalo de nuevo más tarde.'
    },
    backHome: '← Volver a la página de inicio',
    default: {
      heading: 'Echa un vistazo a tu bandeja de entrada',
      body: 'Te hemos enviado un correo con un enlace de confirmación. Haz clic en el enlace para completar tu registro.',
      noEmail: '¿No has recibido el correo? Echa un vistazo a tu carpeta de spam o',
      resignup: 'vuelve a registrarte',
      backHome: '← Volver a la página de inicio'
    }
  },
  it: {
    loading: 'Caricamento in corso...',
    success: {
      heading: 'Ti sei registrato!',
      body: "Grazie per aver confermato il tuo indirizzo e-mail. Ti terremo aggiornato sulle novità di SkillQuest.",
      button: 'Torna alla home page'
    },
    errors: {
      expired: { title: 'Il link è scaduto', message: 'Questo link di verifica è scaduto. Richiedine uno nuovo.' },
      invalid: { title: 'Link non valido', message: 'Questo link di verifica non è valido o è già stato utilizzato.' },
      already_verified: { title: 'Già verificato', message: 'La tua email è già stata confermata. Sei nella lista degli aggiornamenti.' },
      missing: { title: 'Non è stato trovato alcun token', message: 'Nel link di verifica mancano alcune informazioni.' },
      server_error: { title: 'Errore del server', message: 'Si è verificato un errore da parte nostra. Prova di nuovo più tardi.' },
      generic: { title: "C'è stato un problema", message: 'Non siamo riusciti a elaborare la tua registrazione.' }
    },
    resend: {
      button: 'Richiedi una nuova email di verifica',
      sending: 'Invio in corso...',
      success: '✅ Ti è stata inviata una nuova email di verifica! Controlla la tua casella di posta.',
      genericError: 'Si è verificato un errore. Riprova più tardi.'
    },
    backHome: '← Torna alla home page',
    default: {
      heading: 'Controlla la tua casella di posta',
      body: 'Ti abbiamo inviato un\'e-mail con un link di conferma. Clicca sul link per completare la registrazione.',
      noEmail: 'Non hai ricevuto l\'e-mail? Controlla la cartella dello spam oppure',
      resignup: 'iscriviti di nuovo',
      backHome: '← Torna alla home page'
    }
  }
};

function useConfirmCopy(): ConfirmCopy {
  const currentLocale = useLocale();
  const locale: Locale = isLocale(currentLocale) ? currentLocale : 'nl';
  return copyByLocale[locale];
}

function ConfirmContent() {
  const copy = useConfirmCopy();
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
        setResendError(data.error || copy.resend.genericError)
      }
    } catch {
      setResendStatus('error')
      setResendError(copy.resend.genericError)
    }
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="text-8xl mb-8">🎉</div>
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
          {copy.success.heading}
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto">
          {copy.success.body}
        </p>
        <Link href="/" className="btn btn-primary inline-flex">
          {copy.success.button}
        </Link>
      </div>
    )
  }

  // Error states
  if (status === 'error') {
    const reasonKey = (reason && reason in copy.errors ? reason : 'generic') as keyof ConfirmCopy['errors'];
    const { title, message } = copy.errors[reasonKey];
    const showResend = reason === 'expired'

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
                {copy.resend.success}
              </div>
            ) : (
              <>
                <button
                  onClick={handleResend}
                  disabled={resendStatus === 'loading'}
                  className="btn btn-primary disabled:opacity-50"
                >
                  {resendStatus === 'loading' ? copy.resend.sending : copy.resend.button}
                </button>
                {resendStatus === 'error' && resendError && (
                  <p className="mt-4 text-red-600">{resendError}</p>
                )}
              </>
            )}
          </div>
        )}

        <Link href="/" className="text-primary-700 hover:text-primary-900 font-medium">
          {copy.backHome}
        </Link>
      </div>
    )
  }

  // Default: No status parameter - show generic page
  return (
    <div className="text-center">
      <div className="text-8xl mb-8">📧</div>
      <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
        {copy.default.heading}
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-md mx-auto">
        {copy.default.body}
      </p>
      <p className="text-gray-600 mb-8">
        {copy.default.noEmail}{' '}
        <Link href="/" className="text-primary-700 hover:text-primary-900">
          {copy.default.resignup}
        </Link>
        .
      </p>
      <Link href="/" className="text-primary-700 hover:text-primary-900 font-medium">
        {copy.default.backHome}
      </Link>
    </div>
  )
}

export default function ConfirmPage() {
  const copy = useConfirmCopy();

  return (
    <>
      <main className="min-h-screen bg-background-50 flex items-center justify-center p-4 pt-32 pb-24">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <Suspense
            fallback={
              <div className="text-center">
                <div className="text-6xl mb-8 animate-pulse">⏳</div>
                <p className="text-gray-600">{copy.loading}</p>
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
