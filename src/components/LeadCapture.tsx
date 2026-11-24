'use client';

import {useState} from 'react';
import {useLocale} from 'next-intl';
import {Link} from '@/i18n/routing';
import type {MarketingCopy} from '@/lib/marketing';

// Newsletter signup. Submitting only sends a confirmation email; the address
// is added to the list once the link in that email is confirmed. The API
// answers the same for new and existing addresses, so this form never shows
// whether someone is already subscribed.

type Status =
  | 'idle'
  | 'loading'
  | 'success'
  | 'invalid_email'
  | 'rate_limited'
  | 'busy'
  | 'error';

type LeadCaptureProps = {
  copy: MarketingCopy['lead'];
};

// The newsletter part of the privacy policy is section 4 in every language
// (anchors are positional, see src/app/[locale]/privacy/page.tsx).
const PRIVACY_NEWSLETTER_HREF = '/privacy#s-4';

export default function LeadCapture({copy}: LeadCaptureProps) {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  // Honeypot: real users never see or fill this field. Bots that
  // auto-fill every input on the page do, and we quietly drop those
  // submissions server-side instead of telling the bot it was rejected.
  const [company, setCompany] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, locale, company})
      });
      const data = (await response.json().catch(() => ({}))) as {error?: string};

      if (response.ok) {
        setEmail('');
        setStatus('success');
      } else if (data.error === 'invalid_email') {
        setStatus('invalid_email');
      } else if (data.error === 'rate_limited') {
        setStatus('rate_limited');
      } else if (data.error === 'busy') {
        setStatus('busy');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const problem =
    status === 'invalid_email'
      ? copy.invalidEmail
      : status === 'rate_limited'
        ? copy.rateLimited
        : status === 'busy'
          ? copy.busy
          : status === 'error'
            ? copy.error
            : null;

  return (
    <section
      id="newsletter"
      className="scroll-mt-20 theme-final-band py-16 text-white md:py-20"
    >
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-200">
              {copy.badge}
            </p>
            <h2 className="font-display text-section text-balance">
              {copy.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-100">
              {copy.subheading}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                opacity: 0
              }}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="email"
                autoComplete="email"
                aria-label={copy.emailLabel}
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
                className="btn-cta-solid min-h-12 rounded-full px-5 py-3 font-semibold transition focus:outline-none focus:ring-4 focus:ring-phoenix-flame/30 disabled:opacity-60"
              >
                {status === 'loading'
                  ? copy.submitting
                  : status === 'success'
                    ? copy.submitted
                    : copy.submit}
              </button>
            </div>

            <div aria-live="polite">
              {status === 'success' && (
                <p className="rounded-lg bg-green-500 px-4 py-3 text-sm font-medium text-white">
                  {copy.success}
                </p>
              )}

              {problem && (
                <p className="rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white">
                  {problem}
                </p>
              )}
            </div>

            <p className="text-sm text-primary-200">
              {copy.privacy}{' '}
              <Link
                href={PRIVACY_NEWSLETTER_HREF}
                className="underline hover:text-white"
              >
                {copy.privacyLink}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
