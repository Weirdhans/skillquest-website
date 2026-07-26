'use client';

import Link from 'next/link';
import {FormEvent, useState} from 'react';
import AuthShell from '@/components/AuthShell';
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
    <AuthShell homeHref={localizedSitePath(locale)}>
      {status === 'sent' ? (
        <>
          <h1 className="font-display text-subsection font-bold theme-title">
            {copy.forgotSentTitle}
          </h1>
          <p className="mt-3 theme-copy">{copy.forgotSentBody}</p>
          <Link
            href={localizedSitePath(locale)}
            className="btn btn-secondary mt-6 w-full"
          >
            {copy.backToSkillQuest}
          </Link>
        </>
      ) : (
        <>
          <h1 className="font-display text-subsection font-bold theme-title">
            {copy.forgotTitle}
          </h1>
          <p className="mt-3 theme-copy">{copy.forgotIntro}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block font-semibold theme-muted-strong">
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
              <p
                className="rounded-lg border px-4 py-3 text-sm"
                style={{
                  borderColor: 'var(--sq-accent-strong)',
                  color: 'var(--sq-accent-strong)'
                }}
              >
                {copy.forgotError}
              </p>
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
    </AuthShell>
  );
}
