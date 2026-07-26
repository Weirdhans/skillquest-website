'use client';

import Link from 'next/link';
import {useCallback, useEffect, useMemo, useState} from 'react';
import AuthShell from '@/components/AuthShell';
import {
  getHandoffCopy,
  resolveAuthLocale,
  type HandoffCopy
} from '@/lib/authI18n';

export type InviteVariant = 'friend' | 'family';

interface InviteLandingProps {
  locale: string;
  rawCode: string;
  variant?: InviteVariant;
}

const INVITE_CODE_PATTERN = /^[A-Z0-9]{6,12}$/;

// The friend and family screens were two near-identical files that had already
// drifted apart (different accent colours on the same fallback panel, one code
// shown with a # and one without). One component with a variant keeps them in
// step; only these four things actually differ.
const VARIANTS: Record<
  InviteVariant,
  {
    deepLinkPath: string;
    codePrefix: string;
    title: (copy: HandoffCopy) => string;
    intro: (copy: HandoffCopy) => string;
    fallback: (copy: HandoffCopy) => string;
  }
> = {
  friend: {
    deepLinkPath: 'friends',
    codePrefix: '#',
    title: (copy) => copy.friendInviteTitle,
    intro: (copy) => copy.friendInviteIntro,
    fallback: (copy) => copy.friendInviteFallback
  },
  family: {
    deepLinkPath: 'family',
    codePrefix: '',
    title: (copy) => copy.familyInviteTitle,
    intro: (copy) => copy.familyInviteIntro,
    fallback: (copy) => copy.familyInviteFallback
  }
};

function normalizeInviteCode(rawCode: string): string | null {
  const normalized = rawCode.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (!INVITE_CODE_PATTERN.test(normalized)) {
    return null;
  }
  return normalized;
}

// Renders the {code} placeholder as bold text without dropping to
// dangerouslySetInnerHTML for a string we control.
function withCode(template: string, code: string) {
  const parts = template.split('{code}');
  return parts.flatMap((part, index) =>
    index === parts.length - 1
      ? [part]
      : [
          part,
          <strong key={index} className="font-semibold">
            {code}
          </strong>
        ]
  );
}

export default function InviteLanding({
  locale,
  rawCode,
  variant = 'friend'
}: InviteLandingProps) {
  const config = VARIANTS[variant];
  const copy = getHandoffCopy(resolveAuthLocale(locale));
  const inviteCode = useMemo(() => normalizeInviteCode(rawCode), [rawCode]);
  const [copied, setCopied] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const displayCode =
    inviteCode == null ? null : `${config.codePrefix}${inviteCode}`;

  const appLink = useMemo(() => {
    if (inviteCode == null) {
      return null;
    }
    return `io.skillquest.app://${config.deepLinkPath}?invite=${inviteCode}`;
  }, [config.deepLinkPath, inviteCode]);

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
    if (displayCode == null) {
      return;
    }

    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  }, [displayCode]);

  const downloadPath = `/${locale}/download`;

  return (
    <AuthShell homeHref={`/${locale}`}>
      <h1 className="font-display text-subsection font-bold theme-title">
        {config.title(copy)}
      </h1>

      {inviteCode == null || displayCode == null ? (
        <>
          <p className="mt-3 theme-copy">{copy.inviteInvalid}</p>
          <Link href={downloadPath} className="btn btn-primary mt-6 w-full">
            {copy.downloadApp}
          </Link>
        </>
      ) : (
        <>
          <p className="mt-3 theme-copy">{config.intro(copy)}</p>

          <button
            type="button"
            onClick={openInApp}
            className="btn btn-primary mt-6 w-full"
          >
            {copy.openInApp}
          </button>

          <div
            className="mt-6 rounded-2xl p-5"
            style={{backgroundColor: 'var(--sq-bg-muted)'}}
          >
            <p className="text-xs font-semibold uppercase tracking-wide theme-eyebrow">
              {copy.manualCodeLabel}
            </p>
            <p className="nums mt-2 text-2xl font-semibold tracking-widest theme-title">
              {displayCode}
            </p>
            <button
              type="button"
              onClick={copyInviteCode}
              className="mt-4 rounded-full border px-4 py-1.5 text-sm font-semibold transition hover:opacity-80 theme-muted-strong"
              style={{borderColor: 'var(--sq-border-strong)'}}
            >
              {copied ? copy.codeCopied : copy.copyCode}
            </button>
          </div>

          {showFallback && (
            <div
              className="mt-6 rounded-2xl border p-5"
              style={{
                borderColor: 'var(--sq-border)',
                backgroundColor: 'var(--sq-brand-soft)'
              }}
            >
              <p className="text-sm leading-relaxed theme-muted-strong">
                {withCode(config.fallback(copy), displayCode)}
              </p>
              <Link
                href={downloadPath}
                className="btn btn-secondary mt-4 w-full"
              >
                {copy.downloadApp}
              </Link>
            </div>
          )}
        </>
      )}
    </AuthShell>
  );
}
