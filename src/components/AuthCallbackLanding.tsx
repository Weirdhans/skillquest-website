'use client';

import Link from 'next/link';
import {useCallback, useEffect, useState} from 'react';

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

  const openInApp = useCallback(() => {
    if (callbackState.appUrl == null) {
      return;
    }

    window.location.href = callbackState.appUrl;
  }, [callbackState.appUrl]);

  useEffect(() => {
    const callback = buildAppCallbackUrl();

    const stateTimer = window.setTimeout(() => {
      setCallbackState(callback);
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
    ? 'Reset je wachtwoord in SkillQuest'
    : 'Open SkillQuest om verder te gaan';

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-xl items-center px-6 py-12">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-phoenix text-2xl font-bold">
            <span aria-hidden="true">SQ</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white">{title}</h1>

          <p className="mt-4 text-white/80">
            We proberen SkillQuest automatisch te openen. Als je deze pagina op
            je computer bekijkt, open dezelfde e-mail dan op je telefoon met
            SkillQuest geinstalleerd.
          </p>

          <button
            type="button"
            onClick={openInApp}
            disabled={callbackState.appUrl == null}
            className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            Open in SkillQuest
          </button>

          {showFallback && (
            <div className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4">
              <p className="text-sm text-amber-100">
                Gebeurt er niets? Gebruik deze link op je iPhone of Android
                toestel. Op een computer kan de mobiele app meestal niet worden
                geopend.
              </p>
              {!callbackState.hasAuthParams && (
                <p className="mt-3 text-sm text-amber-100">
                  Deze link mist ook authenticatiegegevens. Vraag in dat geval
                  een nieuwe e-mail aan vanuit SkillQuest.
                </p>
              )}
              <div className="mt-4">
                <Link href="/nl/download" className="btn btn-secondary w-full">
                  App downloaden
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
