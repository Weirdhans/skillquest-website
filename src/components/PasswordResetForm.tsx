'use client';

import Link from 'next/link';
import {FormEvent, useEffect, useState} from 'react';
import {createSupabaseBrowserClient} from '@/lib/supabase/client';

type ResetStatus = 'checking' | 'ready' | 'submitting' | 'success' | 'expired';

const minPasswordLength = 12;
const passwordRequirementsText =
  'Minimaal 12 tekens met een kleine letter, hoofdletter en cijfer.';

function getPasswordValidationError(password: string, confirmPassword: string) {
  if (password.length < minPasswordLength) {
    return passwordRequirementsText;
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return passwordRequirementsText;
  }

  if (password !== confirmPassword) {
    return 'De wachtwoorden komen niet overeen.';
  }

  return null;
}

function getUserFriendlyError(message: string) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('weak') || lowerMessage.includes('password')) {
    return passwordRequirementsText;
  }

  if (lowerMessage.includes('session') || lowerMessage.includes('jwt')) {
    return 'Je resetlink is verlopen. Vraag een nieuwe link aan.';
  }

  return 'Je wachtwoord kon niet worden gewijzigd. Probeer het opnieuw.';
}

function VisibilityIcon({isVisible}: {isVisible: boolean}) {
  if (isVisible) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path d="M17.94 17.94A10.9 10.9 0 0 1 12 20C7 20 2.73 16.11 1 12a18.45 18.45 0 0 1 5.06-6.94" />
        <path d="M9.9 4.24A10.7 10.7 0 0 1 12 4c5 0 9.27 3.89 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
        <path d="M1 1l22 22" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PasswordField({
  id,
  name,
  label,
  disabled
}: {
  id: string;
  name: string;
  label: string;
  disabled: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleLabel = isVisible ? `${label} verbergen` : `${label} tonen`;

  return (
    <label className="block">
      <span className="mb-2 block font-semibold text-gray-800">{label}</span>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={isVisible ? 'text' : 'password'}
          autoComplete="new-password"
          className="input pr-12"
          disabled={disabled}
          minLength={minPasswordLength}
          required
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 rounded-md p-1 text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setIsVisible((current) => !current)}
          disabled={disabled}
          aria-label={toggleLabel}
          aria-controls={id}
          aria-pressed={isVisible}
          title={toggleLabel}
        >
          <VisibilityIcon isVisible={isVisible} />
        </button>
      </div>
    </label>
  );
}

export default function PasswordResetForm({
  initialExpired = false
}: {
  initialExpired?: boolean;
}) {
  const [status, setStatus] = useState<ResetStatus>(
    initialExpired ? 'expired' : 'checking'
  );
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialExpired) {
      return;
    }

    let isMounted = true;

    async function checkSession() {
      const supabase = createSupabaseBrowserClient();
      const {
        data: {session}
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (session == null) {
        setStatus('expired');
        return;
      }

      setEmail(session.user.email ?? '');
      setStatus('ready');
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [initialExpired]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status !== 'ready') {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirm-password') ?? '');
    const validationError = getPasswordValidationError(password, confirmPassword);

    if (validationError != null) {
      setError(validationError);
      return;
    }

    setError(null);
    setStatus('submitting');

    const supabase = createSupabaseBrowserClient();
    const {error: updateError} = await supabase.auth.updateUser({password});

    if (updateError != null) {
      setError(getUserFriendlyError(updateError.message));
      setStatus('ready');
      return;
    }

    await supabase.auth.signOut({scope: 'global'});
    event.currentTarget.reset();
    setStatus('success');
  }

  return (
    <main className="min-h-screen bg-background-50 px-6 py-12 text-gray-900">
      <section className="mx-auto flex min-h-[80vh] w-full max-w-xl items-center">
        <div className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-phoenix text-lg font-bold text-white">
            SQ
          </div>

          {status === 'success' ? (
            <>
              <h1 className="heading-md mb-4">Wachtwoord gewijzigd</h1>
              <p className="text-body mb-6">
                Je wachtwoord is bijgewerkt. We hebben je sessies uitgelogd;
                log opnieuw in met je nieuwe wachtwoord.
              </p>
              <Link href="/nl/download" className="btn btn-primary w-full">
                Open SkillQuest
              </Link>
            </>
          ) : status === 'expired' ? (
            <>
              <h1 className="heading-md mb-4">Resetlink verlopen</h1>
              <p className="text-body mb-6">
                Vraag een nieuwe wachtwoordreset aan en open de nieuwste link
                uit je e-mail.
              </p>
              <Link href="/auth/forgot-password" className="btn btn-primary w-full">
                Nieuwe resetlink aanvragen
              </Link>
            </>
          ) : (
            <>
              <h1 className="heading-md mb-4">Nieuw wachtwoord instellen</h1>
              <p className="text-body mb-6">
                Kies een sterk nieuw wachtwoord voor je SkillQuest-account.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="email"
                  name="username"
                  autoComplete="username"
                  value={email}
                  readOnly
                  tabIndex={-1}
                  aria-hidden="true"
                  className="sr-only"
                />

                <PasswordField
                  id="password"
                  name="password"
                  label="Nieuw wachtwoord"
                  disabled={status === 'checking' || status === 'submitting'}
                />

                <PasswordField
                  id="confirm-password"
                  name="confirm-password"
                  label="Bevestig wachtwoord"
                  disabled={status === 'checking' || status === 'submitting'}
                />

                <p className="text-sm text-gray-600">
                  {passwordRequirementsText} Gebruik bij voorkeur een uniek
                  wachtwoord uit je password manager.
                </p>

                {error != null && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={status === 'checking' || status === 'submitting'}
                >
                  {status === 'checking'
                    ? 'Controleren...'
                    : status === 'submitting'
                      ? 'Bijwerken...'
                      : 'Wachtwoord wijzigen'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
