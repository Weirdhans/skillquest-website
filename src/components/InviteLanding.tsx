'use client';

import Link from 'next/link';
import {useCallback, useEffect, useMemo, useState} from 'react';

interface InviteLandingProps {
  locale: string;
  rawCode: string;
}

const INVITE_CODE_PATTERN = /^[A-Z0-9]{6,12}$/;

function normalizeInviteCode(rawCode: string): string | null {
  const normalized = rawCode.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (!INVITE_CODE_PATTERN.test(normalized)) {
    return null;
  }
  return normalized;
}

export default function InviteLanding({locale, rawCode}: InviteLandingProps) {
  const inviteCode = useMemo(() => normalizeInviteCode(rawCode), [rawCode]);
  const [copied, setCopied] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const appLink = useMemo(() => {
    if (inviteCode == null) {
      return null;
    }
    return `io.skillquest.app://friends?invite=${inviteCode}`;
  }, [inviteCode]);

  const openInApp = useCallback(() => {
    if (appLink == null) {
      return;
    }
    window.location.href = appLink;
  }, [appLink]);

  useEffect(() => {
    if (appLink == null) {
      return;
    }

    const attemptTimer = window.setTimeout(() => {
      openInApp();
    }, 250);

    const fallbackTimer = window.setTimeout(() => {
      setShowFallback(true);
    }, 1800);

    return () => {
      window.clearTimeout(attemptTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [appLink, openInApp]);

  const copyInviteCode = useCallback(async () => {
    if (inviteCode == null) {
      return;
    }

    try {
      await navigator.clipboard.writeText(`#${inviteCode}`);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  }, [inviteCode]);

  const downloadPath = `/${locale}/download`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-xl items-center px-6 py-12">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-phoenix text-2xl">
            <span aria-hidden="true">SQ</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white">
            Vriendschapsuitnodiging
          </h1>

          {inviteCode == null ? (
            <>
              <p className="mt-4 text-white/80">
                Deze uitnodigingslink is ongeldig of onvolledig.
              </p>
              <div className="mt-8">
                <Link href={downloadPath} className="btn btn-primary">
                  Open SkillQuest
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="mt-4 text-white/80">
                We proberen SkillQuest te openen met je uitnodiging.
              </p>

              <button
                type="button"
                onClick={openInApp}
                className="btn btn-primary mt-6 w-full"
              >
                Open in SkillQuest
              </button>

              <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-wide text-white/60">
                  Handmatige code
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-widest text-white">
                  #{inviteCode}
                </p>
                <button
                  type="button"
                  onClick={copyInviteCode}
                  className="mt-3 rounded-lg border border-white/30 px-3 py-1 text-sm text-white/90 transition hover:bg-white/10"
                >
                  {copied ? 'Gekopieerd' : 'Kopieer code'}
                </button>
              </div>

              {showFallback && (
                <div className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4">
                  <p className="text-sm text-amber-100">
                    Lukt openen niet direct? Open SkillQuest en gebruik
                    <span className="font-semibold"> #{inviteCode}</span> in
                    Vrienden - Vriend toevoegen.
                  </p>
                  <div className="mt-4">
                    <Link href={downloadPath} className="btn btn-secondary w-full">
                      App downloaden
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
