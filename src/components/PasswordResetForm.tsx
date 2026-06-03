'use client';

import Link from 'next/link';
import {FormEvent, useEffect, useState} from 'react';
import {
  AuthCopy,
  AuthLocale,
  getAuthCopy,
  localizedSitePath,
  withAuthLocale
} from '@/lib/authI18n';
import {createSupabaseBrowserClient} from '@/lib/supabase/client';

type ResetStatus = 'checking' | 'ready' | 'submitting' | 'success' | 'expired';

const minPasswordLength = 12;
const authRequestTimeoutMs = 15000;
const signOutTimeoutMs = 5000;

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(message));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
  }
}

function getPasswordValidationError(
  password: string,
  confirmPassword: string,
  copy: AuthCopy
) {
  if (password.length < minPasswordLength) {
    return copy.passwordRequirements;
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return copy.passwordRequirements;
  }

  if (password !== confirmPassword) {
    return copy.mismatchError;
  }

  return null;
}

function getUserFriendlyError(message: string, copy: AuthCopy) {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes('weak') ||
    lowerMessage.includes('should be at least') ||
    lowerMessage.includes('should contain') ||
    lowerMessage.includes('characters') ||
    lowerMessage.includes('length') ||
    lowerMessage.includes('422')
  ) {
    return copy.passwordRequirements;
  }

  if (lowerMessage.includes('session') || lowerMessage.includes('jwt')) {
    return copy.resetExpiredBody;
  }

  return copy.resetGenericError;
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
  disabled,
  copy
}: {
  id: string;
  name: string;
  label: string;
  disabled: boolean;
  copy: AuthCopy;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleLabel = isVisible
    ? `${label} ${copy.hidePasswordSuffix}`
    : `${label} ${copy.showPasswordSuffix}`;

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
  initialExpired = false,
  locale
}: {
  initialExpired?: boolean;
  locale: AuthLocale;
}) {
  const copy = getAuthCopy(locale);
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
    const validationError = getPasswordValidationError(
      password,
      confirmPassword,
      copy
    );

    if (validationError != null) {
      setError(validationError);
      return;
    }

    setError(null);
    setStatus('submitting');

    const supabase = createSupabaseBrowserClient();

    try {
      const {error: updateError} = await withTimeout(
        supabase.auth.updateUser({password}),
        authRequestTimeoutMs,
        'Request timed out'
      );

      if (updateError != null) {
        setError(getUserFriendlyError(updateError.message, copy));
        setStatus('ready');
        return;
      }

      try {
        await withTimeout(
          supabase.auth.signOut({scope: 'global'}),
          signOutTimeoutMs,
          'Global sign out timed out'
        );
      } catch (signOutError) {
        console.warn('Global sign out failed after password reset', signOutError);

        try {
          await withTimeout(
            supabase.auth.signOut({scope: 'local'}),
            signOutTimeoutMs,
            'Local sign out timed out'
          );
        } catch (localSignOutError) {
          console.warn(
            'Local sign out fallback failed after password reset',
            localSignOutError
          );
        }
      }

      event.currentTarget.reset();
      setStatus('success');
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : 'Unexpected error';

      setError(getUserFriendlyError(message, copy));
      setStatus('ready');
    }
  }

  return (
    <main className="min-h-screen bg-background-50 px-6 py-12 text-gray-900">
      <section className="mx-auto flex min-h-[80vh] w-full max-w-xl items-center">
        <div className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-phoenix text-lg font-bold text-white">
            {copy.logoText}
          </div>

          {status === 'success' ? (
            <>
              <h1 className="heading-md mb-4">{copy.resetSuccessTitle}</h1>
              <p className="text-body mb-6">{copy.resetSuccessBody}</p>
              <Link
                href={localizedSitePath(locale, '/download')}
                className="btn btn-primary w-full"
              >
                {copy.openSkillQuest}
              </Link>
            </>
          ) : status === 'expired' ? (
            <>
              <h1 className="heading-md mb-4">{copy.expiredTitle}</h1>
              <p className="text-body mb-6">{copy.resetExpiredBody}</p>
              <Link
                href={withAuthLocale('/auth/forgot-password', locale)}
                className="btn btn-primary w-full"
              >
                {copy.requestNewLink}
              </Link>
            </>
          ) : (
            <>
              <h1 className="heading-md mb-4">{copy.resetTitle}</h1>
              <p className="text-body mb-6">{copy.resetIntro}</p>

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
                  label={copy.newPasswordLabel}
                  disabled={status === 'checking' || status === 'submitting'}
                  copy={copy}
                />

                <PasswordField
                  id="confirm-password"
                  name="confirm-password"
                  label={copy.confirmPasswordLabel}
                  disabled={status === 'checking' || status === 'submitting'}
                  copy={copy}
                />

                <p className="text-sm text-gray-600">
                  {copy.passwordRequirements} {copy.passwordManagerHint}
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
                    ? copy.checkingButton
                    : status === 'submitting'
                      ? copy.updatingButton
                      : copy.updatePasswordButton}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
