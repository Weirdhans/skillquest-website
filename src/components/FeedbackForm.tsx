'use client';

import {useState} from 'react';
import {useLocale} from 'next-intl';
import type {FeedbackCopy} from '@/lib/feedback-copy';

type Platform = 'ios' | 'android' | 'both';
type Status = 'idle' | 'loading' | 'success' | 'error' | 'rate_limited' | 'missing';

const fieldClass =
  'mt-2 min-h-28 w-full rounded-lg border px-4 py-3 text-base outline-none transition focus:ring-4 focus:ring-primary-500/20 theme-page theme-title';

export default function FeedbackForm({copy}: {copy: FeedbackCopy}) {
  const locale = useLocale();
  const [clear, setClear] = useState('');
  const [confusing, setConfusing] = useState('');
  const [firstFix, setFirstFix] = useState('');
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [quoteConsent, setQuoteConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  // Honeypot: hidden from real visitors, filled in by bots.
  const [company, setCompany] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!clear.trim() || !confusing.trim() || !firstFix.trim() || !platform) {
      setStatus('missing');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          clear,
          confusing,
          firstFix,
          platform,
          quoteConsent,
          locale,
          company
        })
      });

      if (response.ok) {
        setStatus('success');
      } else if (response.status === 429) {
        setStatus('rate_limited');
      } else if (response.status === 400) {
        setStatus('missing');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className="theme-highlight-band rounded-2xl p-6 text-lg font-semibold theme-title md:p-8"
      >
        {copy.success}
      </p>
    );
  }

  const questions = [
    {id: 'clear', label: copy.clearLabel, hint: copy.clearHint, value: clear, set: setClear},
    {id: 'confusing', label: copy.confusingLabel, hint: copy.confusingHint, value: confusing, set: setConfusing},
    {id: 'firstFix', label: copy.firstFixLabel, hint: copy.firstFixHint, value: firstFix, set: setFirstFix}
  ];

  const platformOptions: Array<{value: Platform; label: string}> = [
    {value: 'ios', label: copy.platformIos},
    {value: 'android', label: copy.platformAndroid},
    {value: 'both', label: copy.platformBoth}
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8" noValidate>
      <input
        type="text"
        name="company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0}}
      />

      {questions.map((question, index) => (
        <div key={question.id}>
          <label htmlFor={`feedback-${question.id}`} className="block font-semibold theme-title">
            <span className="nums theme-eyebrow">{index + 1}.</span> {question.label}
          </label>
          <p id={`feedback-${question.id}-hint`} className="mt-1 text-sm theme-copy">
            {question.hint}
          </p>
          <textarea
            id={`feedback-${question.id}`}
            aria-describedby={`feedback-${question.id}-hint`}
            value={question.value}
            onChange={(event) => {
              question.set(event.target.value);
              if (status !== 'idle' && status !== 'loading') setStatus('idle');
            }}
            maxLength={2000}
            required
            className={fieldClass}
            style={{borderColor: 'var(--sq-border-strong)'}}
          />
        </div>
      ))}

      <fieldset>
        <legend className="font-semibold theme-title">{copy.platformQuestion}</legend>
        <div role="group" className="mt-3 grid grid-cols-3 gap-2 sm:max-w-md">
          {platformOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => {
                setPlatform(option.value);
                if (status === 'missing') setStatus('idle');
              }}
              aria-pressed={platform === option.value}
              className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                platform === option.value ? 'btn-cta-solid border-transparent' : 'theme-copy hover:theme-title'
              }`}
              style={platform === option.value ? undefined : {borderColor: 'var(--sq-border-strong)'}}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-3 theme-copy">
        <input
          type="checkbox"
          checked={quoteConsent}
          onChange={(event) => setQuoteConsent(event.target.checked)}
          className="mt-1 h-5 w-5 shrink-0"
        />
        <span>{copy.consentLabel}</span>
      </label>

      <p className="text-sm theme-copy">
        {copy.screenshotNote.split('hello@skill-quest.app')[0]}
        <a href="mailto:hello@skill-quest.app?subject=SkillQuest%20feedback" className="font-semibold underline theme-title">
          hello@skill-quest.app
        </a>
        {copy.screenshotNote.split('hello@skill-quest.app')[1] ?? ''}
      </p>

      {status === 'missing' && (
        <p role="alert" className="rounded-lg bg-amber-500 px-4 py-3 text-sm font-medium text-white">
          {copy.missingAnswers}
        </p>
      )}
      {status === 'rate_limited' && (
        <p role="alert" className="rounded-lg bg-amber-500 px-4 py-3 text-sm font-medium text-white">
          {copy.rateLimited}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white">
          {copy.error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary disabled:opacity-60"
        >
          {status === 'loading' ? copy.submitting : copy.submit}
        </button>
        <p className="mt-4 text-sm theme-copy">{copy.anonymousNote}</p>
      </div>
    </form>
  );
}
