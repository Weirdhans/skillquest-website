'use client';

import Link from 'next/link';
import {FormEvent, useEffect, useState} from 'react';
import {createSupabaseBrowserClient} from '@/lib/supabase/client';

type ResetStatus = 'checking' | 'ready' | 'submitting' | 'success' | 'expired';

const minPasswordLength = 12;

function getPasswordValidationError(password: string) {
  if (password.length < minPasswordLength) {
    return 'Gebruik minimaal 12 tekens.';
  }

  return null;
}

function getUserFriendlyError(message: string) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('weak') || lowerMessage.includes('password')) {
    return 'Gebruik minimaal 12 tekens.';
  }

  if (lowerMessage.includes('session') || lowerMessage.includes('jwt')) {
    return 'Je resetlink is verlopen. Vraag een nieuwe link aan.';
  }

  return 'Je wachtwoord kon niet worden gewijzigd. Probeer het opnieuw.';
}

export default function PasswordResetForm({
  initialExpired = false
}: {
  initialExpired?: boolean;
}) {
  const [status, setStatus] = useState<ResetStatus>(
    initialExpired ? 'expired' : 'checking'
  );
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

      setStatus(session == null ? 'expired' : 'ready');
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
    const validationError = getPasswordValidationError(password);

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
                <label className="block">
                  <span className="mb-2 block font-semibold text-gray-800">
                    Nieuw wachtwoord
                  </span>
                  <input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    className="input"
                    disabled={status === 'checking' || status === 'submitting'}
                    minLength={minPasswordLength}
                    required
                  />
                </label>

                <p className="text-sm text-gray-600">
                  Minimaal 12 tekens. Gebruik bij voorkeur een uniek wachtwoord
                  uit je password manager.
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
