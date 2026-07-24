'use client';

import {useMemo, useState} from 'react';
import {useLocale} from 'next-intl';
import type {MarketingCopy} from '@/lib/marketing';

type Platform = 'ios' | 'android' | 'both';
type Status =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'
  | 'duplicate'
  | 'pending_verification';

type LeadCaptureProps = {
  copy: MarketingCopy['lead'];
  // Pass a `key` matching this value from the caller when it can change
  // (e.g. `key={initialPlatform}`) so a same-page navigation that only
  // changes the query remounts this component instead of being ignored by
  // the lazy useState initializer below.
  initialPlatform?: Platform;
};

export default function LeadCapture({
  copy,
  initialPlatform = 'both'
}: LeadCaptureProps) {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [status, setStatus] = useState<Status>('idle');
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const showGmailHint = useMemo(
    () =>
      email.length > 0 &&
      (platform === 'android' || platform === 'both') &&
      !email.toLowerCase().endsWith('@gmail.com'),
    [email, platform]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, platform, locale})
      });

      const data = await response.json();

      if (response.status === 409) {
        if (data.error === 'pending_verification') {
          setPendingEmail(data.email);
          setStatus('pending_verification');
        } else {
          setStatus('duplicate');
        }
        return;
      }

      if (response.ok) {
        setEmail('');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  async function handleResend() {
    if (!pendingEmail) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: pendingEmail})
      });

      if (response.ok) {
        setPendingEmail(null);
        setStatus('success');
      } else {
        setStatus(response.status === 429 ? 'pending_verification' : 'error');
      }
    } catch {
      setStatus('error');
    }
  }

  const platformOptions: Array<{value: Platform; label: string}> = [
    {value: 'ios', label: copy.platforms.ios},
    {value: 'android', label: copy.platforms.android},
    {value: 'both', label: copy.platforms.both}
  ];

  return (
    <section
      id="android-alpha"
      className="scroll-mt-20 theme-final-band py-16 text-white md:py-20"
    >
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-200">
              {copy.badge}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              {copy.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-100">
              {copy.subheading}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-3 text-sm font-medium text-primary-100">
                {copy.platformQuestion}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {platformOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setPlatform(option.value)}
                    className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      platform === option.value
                        ? 'border-white bg-white text-primary-900'
                        : 'border-white/30 text-white hover:bg-white/10'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder={copy.placeholder}
                required
                disabled={status === 'loading' || status === 'success'}
                className="min-h-12 flex-1 rounded-lg border border-white/20 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:ring-4 focus:ring-primary-300 disabled:opacity-60 dark:bg-white dark:text-gray-950"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="min-h-12 rounded-lg bg-phoenix-flame px-5 py-3 font-semibold text-white transition hover:bg-phoenix-fire focus:outline-none focus:ring-4 focus:ring-phoenix-flame/30 disabled:opacity-60"
              >
                {status === 'loading'
                  ? copy.submitting
                  : status === 'success'
                    ? copy.submitted
                    : copy.submit}
              </button>
            </div>

            {showGmailHint && status === 'idle' && (
              <p className="rounded-lg border border-amber-300/40 bg-amber-400/15 px-4 py-3 text-sm text-amber-50">
                {copy.gmailHint}
              </p>
            )}

            {status === 'success' && (
              <p className="rounded-lg bg-green-500 px-4 py-3 text-sm font-medium text-white">
                {copy.success}
              </p>
            )}

            {status === 'duplicate' && (
              <p className="rounded-lg bg-primary-600 px-4 py-3 text-sm font-medium text-white">
                {copy.duplicate}
              </p>
            )}

            {status === 'pending_verification' && (
              <div className="rounded-lg bg-amber-500 px-4 py-3 text-sm font-medium text-white">
                <p>{copy.pendingVerification}</p>
                <button
                  type="button"
                  onClick={handleResend}
                  className="mt-2 underline hover:no-underline"
                >
                  {copy.resendLink}
                </button>
              </div>
            )}

            {status === 'error' && (
              <p className="rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white">
                {copy.error}
              </p>
            )}

            <p className="text-sm text-primary-200">{copy.privacy}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
