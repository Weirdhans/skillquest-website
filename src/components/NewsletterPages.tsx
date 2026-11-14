'use client';

import {useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {CheckCircle, EnvelopeSimple, WarningCircle} from '@phosphor-icons/react';
import {Link} from '@/i18n/routing';
import type {
  NewsletterConfirmCopy,
  NewsletterUnsubscribeCopy
} from '@/lib/newsletter-copy';

// The confirm and unsubscribe pages both wait for a button press before they
// call the API. Mail scanners open links in emails; they do not press
// buttons, so they cannot subscribe or unsubscribe anyone.

type ConfirmState =
  | 'ready'
  | 'working'
  | 'subscribed'
  | 'already_subscribed'
  | 'expired'
  | 'invalid'
  | 'used'
  | 'rate_limited'
  | 'server_error';

export function NewsletterConfirm({copy}: {copy: NewsletterConfirmCopy}) {
  const token = useSearchParams().get('token');
  const [state, setState] = useState<ConfirmState>(token ? 'ready' : 'invalid');

  async function confirm() {
    setState('working');
    try {
      const response = await fetch('/api/newsletter/confirm', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token})
      });
      const data = (await response.json().catch(() => ({}))) as {
        status?: string;
        error?: string;
      };
      if (data.status === 'subscribed' || data.status === 'already_subscribed') {
        setState(data.status);
      } else if (
        data.error === 'expired' ||
        data.error === 'invalid' ||
        data.error === 'used' ||
        data.error === 'rate_limited'
      ) {
        setState(data.error);
      } else {
        setState('server_error');
      }
    } catch {
      setState('server_error');
    }
  }

  if (state === 'ready' || state === 'working') {
    return (
      <StatusPanel tone="brand" icon={<EnvelopeSimple size={28} weight="fill" aria-hidden />}>
        <h1 className="font-display text-section text-balance theme-title">
          {copy.ready.heading}
        </h1>
        <p className="mt-4 text-lead theme-copy">{copy.ready.body}</p>
        <button
          type="button"
          onClick={confirm}
          disabled={state === 'working'}
          className="btn btn-primary mt-8 disabled:opacity-60"
        >
          {state === 'working' ? copy.working : copy.ready.button}
        </button>
      </StatusPanel>
    );
  }

  if (state === 'subscribed' || state === 'already_subscribed') {
    const text = state === 'subscribed' ? copy.success : copy.already;
    return (
      <StatusPanel tone="brand" icon={<CheckCircle size={28} weight="fill" aria-hidden />}>
        <h1 className="font-display text-section text-balance theme-title">
          {text.heading}
        </h1>
        <p className="mt-4 text-lead theme-copy">{text.body}</p>
        <BackHome label={copy.backHome} />
      </StatusPanel>
    );
  }

  const {title, message} = copy.errors[state];
  return (
    <StatusPanel tone="warn" icon={<WarningCircle size={28} weight="fill" aria-hidden />}>
      <h1 className="font-display text-section text-balance theme-title">{title}</h1>
      <p className="mt-4 text-lead theme-copy">{message}</p>
      {state === 'server_error' ? (
        <button type="button" onClick={confirm} className="btn btn-primary mt-8">
          {copy.ready.button}
        </button>
      ) : state === 'rate_limited' ? null : (
        <Link href="/#newsletter" className="btn btn-primary mt-8 inline-flex">
          {copy.resubscribe}
        </Link>
      )}
      <BackHome label={copy.backHome} />
    </StatusPanel>
  );
}

type UnsubscribeState = 'ready' | 'working' | 'done' | 'invalid' | 'server_error';

const CONTACT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function NewsletterUnsubscribe({copy}: {copy: NewsletterUnsubscribeCopy}) {
  const searchParams = useSearchParams();
  const contactId = searchParams.get('c');
  const signature = searchParams.get('s');
  const [state, setState] = useState<UnsubscribeState>(
    contactId && CONTACT_ID_PATTERN.test(contactId) && signature ? 'ready' : 'invalid'
  );

  async function unsubscribe() {
    setState('working');
    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({c: contactId, s: signature})
      });
      setState(response.ok ? 'done' : response.status === 400 ? 'invalid' : 'server_error');
    } catch {
      setState('server_error');
    }
  }

  if (state === 'ready' || state === 'working') {
    return (
      <StatusPanel tone="brand" icon={<EnvelopeSimple size={28} weight="fill" aria-hidden />}>
        <h1 className="font-display text-section text-balance theme-title">
          {copy.ready.heading}
        </h1>
        <p className="mt-4 text-lead theme-copy">{copy.ready.body}</p>
        <button
          type="button"
          onClick={unsubscribe}
          disabled={state === 'working'}
          className="btn btn-primary mt-8 disabled:opacity-60"
        >
          {state === 'working' ? copy.working : copy.ready.button}
        </button>
      </StatusPanel>
    );
  }

  if (state === 'done') {
    return (
      <StatusPanel tone="brand" icon={<CheckCircle size={28} weight="fill" aria-hidden />}>
        <h1 className="font-display text-section text-balance theme-title">
          {copy.success.heading}
        </h1>
        <p className="mt-4 text-lead theme-copy">{copy.success.body}</p>
        <BackHome label={copy.backHome} />
      </StatusPanel>
    );
  }

  const {title, message} = copy.errors[state];
  return (
    <StatusPanel tone="warn" icon={<WarningCircle size={28} weight="fill" aria-hidden />}>
      <h1 className="font-display text-section text-balance theme-title">{title}</h1>
      <p className="mt-4 text-lead theme-copy">{message}</p>
      {state === 'server_error' && (
        <button type="button" onClick={unsubscribe} className="btn btn-primary mt-8">
          {copy.ready.button}
        </button>
      )}
      <BackHome label={copy.backHome} />
    </StatusPanel>
  );
}

function BackHome({label}: {label: string}) {
  return (
    <p className="mt-8">
      <Link href="/" className="font-medium underline theme-copy hover:theme-title">
        {label}
      </Link>
    </p>
  );
}

// An icon in a tinted disc, the same signal the old confirm page used.
function StatusPanel({
  tone,
  icon,
  children
}: {
  tone: 'brand' | 'warn';
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span
        className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full"
        style={
          tone === 'brand'
            ? {backgroundColor: 'var(--sq-brand-soft)', color: 'var(--sq-brand)'}
            : {
                // Surface rather than bg-muted: the accent lands at 4.42:1 on
                // muted in light mode, 4.86:1 on surface.
                backgroundColor: 'var(--sq-surface)',
                border: '1px solid var(--sq-border)',
                color: 'var(--sq-accent-strong)'
              }
        }
      >
        {icon}
      </span>
      {children}
    </div>
  );
}
