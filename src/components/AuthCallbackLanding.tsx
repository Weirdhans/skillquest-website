'use client';

import Link from 'next/link';
import {useCallback, useEffect, useState} from 'react';
import AuthShell from '@/components/AuthShell';
import {
  defaultAuthLocale,
  getHandoffCopy,
  resolveAuthLocale,
  type AuthLocale
} from '@/lib/authI18n';

const APP_AUTH_CALLBACK = 'io.skillquest.app://auth/callback';

interface CallbackState {
  appUrl: string | null;
  isRecovery: boolean;
  hasAuthParams: boolean;
}

function buildAppCallbackUrl(): CallbackState {
  const currentUrl = new URL(window.location.href);
  const queryParams = new URLSearchParams(currentUrl.search);
  const hashParams = new URLSearchParams(
    currentUrl.hash.startsWith('#') ? currentUrl.hash.slice(1) : ''
  );

  const callbackType = queryParams.get('type') ?? hashParams.get('type');
  const isRecovery =
    queryParams.get('next') === 'reset-password' || callbackType === 'recovery';

  if (isRecovery && !queryParams.has('next')) {
    queryParams.set('next', 'reset-password');
  }

  if (callbackType != null && !queryParams.has('type')) {
    queryParams.set('type', callbackType);
  }

  const queryString = queryParams.toString();
  const hashString = hashParams.toString();
  const appUrl = `${APP_AUTH_CALLBACK}${queryString ? `?${queryString}` : ''}${
    hashString ? `#${hashString}` : ''
  }`;

  return {
    appUrl,
    isRecovery,
    hasAuthParams:
      queryParams.has('code') ||
      queryParams.has('token') ||
      hashParams.has('access_token') ||
      hashParams.has('refresh_token')
  };
}

export default function AuthCallbackLanding() {
  const [callbackState, setCallbackState] = useState<CallbackState>({
    appUrl: null,
    isRecovery: true,
    hasAuthParams: false
  });
  const [showFallback, setShowFallback] = useState(false);
  // This route sits outside [locale] and is reached straight from an email, so
  // the language has to come from the link itself, then the browser. Resolved
  // after mount to keep the server and client markup identical.
  const [locale, setLocale] = useState<AuthLocale>(defaultAuthLocale);
  const copy = getHandoffCopy(locale);

  const openInApp = useCallback(() => {
    if (callbackState.appUrl == null) {
      return;
    }

    window.location.href = callbackState.appUrl;
  }, [callbackState.appUrl]);

  useEffect(() => {
    const callback = buildAppCallbackUrl();
    const requested = new URL(window.location.href).searchParams.get('locale');

    const stateTimer = window.setTimeout(() => {
      setCallbackState(callback);
      setLocale(resolveAuthLocale(requested ?? navigator.language));
    }, 0);

    const attemptTimer = window.setTimeout(() => {
      if (callback.appUrl != null) {
        window.location.href = callback.appUrl;
      }
    }, 250);

    const fallbackTimer = window.setTimeout(() => {
      setShowFallback(true);
    }, 1800);

    return () => {
      window.clearTimeout(stateTimer);
      window.clearTimeout(attemptTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  const title = callbackState.isRecovery
    ? copy.callbackRecoveryTitle
    : copy.callbackTitle;

  return (
    <AuthShell homeHref={`/${locale}`}>
      <h1 className="font-display text-subsection font-bold theme-title">
        {title}
      </h1>

      <p className="mt-3 theme-copy">{copy.callbackIntro}</p>

      <button
        type="button"
        onClick={openInApp}
        disabled={callbackState.appUrl == null}
        className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {copy.openInApp}
      </button>

      {showFallback && (
        <div
          className="mt-6 rounded-2xl border p-5"
          style={{
            borderColor: 'var(--sq-border)',
            backgroundColor: 'var(--sq-brand-soft)'
          }}
        >
          <p className="text-sm leading-relaxed theme-muted-strong">
            {copy.callbackFallback}
          </p>
          {!callbackState.hasAuthParams && (
            <p className="mt-3 text-sm leading-relaxed theme-muted-strong">
              {copy.callbackMissingParams}
            </p>
          )}
          <Link
            href={`/${locale}/download`}
            className="btn btn-secondary mt-4 w-full"
          >
            {copy.downloadApp}
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
