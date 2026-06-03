'use client';

import Link from 'next/link';
import {FormEvent, useState} from 'react';
import {
  AuthLocale,
  getAuthCopy,
  localizedSitePath,
  withAuthLocale
} from '@/lib/authI18n';
import {createSupabaseBrowserClient} from '@/lib/supabase/client';

type ForgotStatus = 'idle' | 'submitting' | 'sent' | 'error';

export default function ForgotPasswordForm({locale}: {locale: AuthLocale}) {
  const copy = getAuthCopy(locale);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<ForgotStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === 'submitting') {
      return;
    }

    setStatus('submitting');

    const supabase = createSupabaseBrowserClient();
    const redirectTo = `${window.location.origin}${withAuthLocale(
      '/auth/callback?next=/auth/reset-password',
      locale
    )}`;
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
            {copy.logoText}
          </div>

          {status === 'sent' ? (
            <>
              <h1 className="heading-md mb-4">{copy.forgotSentTitle}</h1>
              <p className="text-body mb-6">{copy.forgotSentBody}</p>
              <Link
                href={localizedSitePath(locale)}
                className="btn btn-secondary w-full"
              >
                {copy.backToSkillQuest}
              </Link>
            </>
          ) : (
            <>
              <h1 className="heading-md mb-4">{copy.forgotTitle}</h1>
              <p className="text-body mb-6">{copy.forgotIntro}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block font-semibold text-gray-800">
                    {copy.emailLabel}
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
                    {copy.forgotError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? copy.forgotSubmitting
                    : copy.forgotSubmit}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
