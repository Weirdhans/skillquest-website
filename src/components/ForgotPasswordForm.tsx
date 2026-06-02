'use client';

import Link from 'next/link';
import {FormEvent, useState} from 'react';
import {createSupabaseBrowserClient} from '@/lib/supabase/client';

type ForgotStatus = 'idle' | 'submitting' | 'sent' | 'error';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<ForgotStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === 'submitting') {
      return;
    }

    setStatus('submitting');

    const supabase = createSupabaseBrowserClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=/auth/reset-password`;
    const {error} = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo
    });

    if (error != null) {
      setStatus('error');
      return;
    }

    setStatus('sent');
  }

  return (
    <main className="min-h-screen bg-background-50 px-6 py-12 text-gray-900">
      <section className="mx-auto flex min-h-[80vh] w-full max-w-xl items-center">
        <div className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-phoenix text-lg font-bold text-white">
            SQ
          </div>

          {status === 'sent' ? (
            <>
              <h1 className="heading-md mb-4">Check je e-mail</h1>
              <p className="text-body mb-6">
                Als er een account bestaat voor dit e-mailadres, ontvang je een
                link om je wachtwoord opnieuw in te stellen. De link werkt op je
                telefoon en op je computer.
              </p>
              <Link href="/nl" className="btn btn-secondary w-full">
                Terug naar SkillQuest
              </Link>
            </>
          ) : (
            <>
              <h1 className="heading-md mb-4">Wachtwoord vergeten</h1>
              <p className="text-body mb-6">
                Vul je e-mailadres in. We sturen een link waarmee je via de
                website een nieuw wachtwoord kunt kiezen.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block font-semibold text-gray-800">
                    E-mailadres
                  </span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="input"
                    disabled={status === 'submitting'}
                    required
                  />
                </label>

                {status === 'error' && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    We konden de e-mail niet versturen. Probeer het later
                    opnieuw.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? 'Versturen...'
                    : 'Resetlink versturen'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
