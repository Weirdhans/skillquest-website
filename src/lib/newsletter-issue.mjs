// The monthly newsletter issue: which articles go in, the email itself, the
// approval issue on GitHub and the checks before sending. Pure functions only
// (no network, no files): scripts/newsletter.mjs does the I/O and
// tests/newsletter-issue.test.mjs tests these. See docs/NEWSLETTER.md.
//
// Content comes from what is already on the website in six languages: the
// tips and blog articles (title, card summary, link) and the App Store
// release notes of the current app version. Nothing is written or
// translated per issue; only the frame below is fixed copy (DeepL, then
// checked against docs/TRANSLATION_DECISIONS_GLOSSARY.md in the app repo).

import {createHash} from 'node:crypto';
import {isPublished, utcDay} from './tips-publication.mjs';
import {
  EMAIL_LOCALES,
  escapeAttribute as escapeHtml,
  footer,
  newsletterFooterCopy,
  shell
} from './email-templates.mjs';
import {
  NEWSLETTER_FROM,
  NEWSLETTER_REPLY_TO,
  NEWSLETTER_SEGMENT_ID,
  NEWSLETTER_TOPIC_IDS
} from './newsletter-config.mjs';

export const NEWSLETTER_LOCALES = EMAIL_LOCALES;

export const SITE_URL = 'https://www.skill-quest.app';
export const UNSUBSCRIBE_PLACEHOLDER = '{{{RESEND_UNSUBSCRIBE_URL}}}';

export const APP_STORE_ID = '6755604671';
export const ANDROID_PACKAGE = 'com.skillquest.app';
// ct=newsletter shows installs from the newsletter under App Store Connect ->
// Analytics -> Campaigns, next to ct=website (src/lib/marketing.ts).
export const NEWSLETTER_APP_STORE_URL = `https://apps.apple.com/app/apple-store/id${APP_STORE_ID}?pt=128291575&ct=newsletter&mt=8`;
export const NEWSLETTER_PLAY_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}&referrer=utm_source%3Dnewsletter%26utm_medium%3Demail`;

/** App Store country whose release notes are in this locale's language. */
export const APP_STORE_COUNTRY = {nl: 'nl', en: 'us', de: 'de', fr: 'fr', es: 'es', it: 'it'};

const INTL_LOCALE = {nl: 'nl-NL', en: 'en-US', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', it: 'it-IT'};

/** Articles and app releases older than this are never picked up any more. */
export const LOOKBACK_DAYS = 62;
export const MAX_TIPS = 4;
export const MAX_BLOG = 3;
/** Approved issues go out at this hour (UTC), at least this long after approval. */
export const SEND_HOUR_UTC = 7;
export const APPROVAL_LEAD_MS = 2 * 60 * 60 * 1000;
/** Days after preparing on which an unapproved issue gets a reminder. */
export const REMINDER_DAYS = [7, 14];
/** Days after preparing after which unapproved drafts are deleted. */
export const EXPIRE_DAYS = 21;

const DAY_MS = 24 * 60 * 60 * 1000;

// Fixed copy of the frame. The greeting and the unsubscribe lines come from
// the welcome email (newsletterFooterCopy), the section headings, reading
// time, "more tips" and store buttons from the tips and blog pages.
export const ISSUE_COPY = {
  nl: {
    name: 'SkillQuest-nieuwsbrief',
    intro: 'Dit is er nieuw bij SkillQuest sinds de vorige nieuwsbrief.',
    appHeading: 'Nieuw in de app',
    version: 'versie'
  },
  en: {
    name: 'SkillQuest newsletter',
    intro: "Here's what's new at SkillQuest since the last newsletter.",
    appHeading: 'New in the app',
    version: 'version'
  },
  de: {
    name: 'SkillQuest-Newsletter',
    intro: 'Hier sind die Neuigkeiten bei SkillQuest seit dem letzten Newsletter.',
    appHeading: 'Neu in der App',
    version: 'Version'
  },
  fr: {
    name: 'Newsletter de SkillQuest',
    intro: 'Voici les nouveautés de SkillQuest depuis la dernière newsletter.',
    appHeading: "Nouveautés dans l'application",
    version: 'version'
  },
  es: {
    name: 'Boletín de SkillQuest',
    intro: 'Estas son las novedades de SkillQuest desde el último boletín.',
    appHeading: 'Novedades en la aplicación',
    version: 'versión'
  },
  it: {
    name: 'Newsletter di SkillQuest',
    intro: "Ecco le novità di SkillQuest dall'ultima newsletter.",
    appHeading: "Novità nell'app",
    version: 'versione'
  }
};

// ---------------------------------------------------------------------------
// Dates
// ---------------------------------------------------------------------------

/** The issue of a moment: its UTC month, YYYY-MM. */
export function issueIdFor(now) {
  return utcDay(now).slice(0, 7);
}

/** The first Monday of the UTC month of `now`, as YYYY-MM-DD. */
export function firstMondayOfMonth(now) {
  const day = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  while (day.getUTCDay() !== 1) day.setUTCDate(day.getUTCDate() + 1);
  return utcDay(day);
}

/** An issue is prepared from the first Monday of its month on. */
export function isPrepareDue(now) {
  return utcDay(now) >= firstMondayOfMonth(now);
}

/** Whole UTC calendar days from `from` to `to`. */
export function daysBetween(from, to) {
  return Math.round((Date.parse(utcDay(to)) - Date.parse(utcDay(from))) / DAY_MS);
}

/**
 * When an approved issue goes out: the first SEND_HOUR_UTC o'clock that is at
 * least APPROVAL_LEAD_MS away, so there is always time to cancel.
 */
export function nextSendTime(now) {
  const earliest = now.getTime() + APPROVAL_LEAD_MS;
  const send = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), SEND_HOUR_UTC)
  );
  while (send.getTime() < earliest) send.setUTCDate(send.getUTCDate() + 1);
  return send;
}

function monthLabel(locale, issueId) {
  const [year, month] = issueId.split('-').map(Number);
  const label = new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(Date.UTC(year, month - 1, 1)));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

// ---------------------------------------------------------------------------
// What goes in
// ---------------------------------------------------------------------------

/**
 * Item IDs ("tip:<id>", "blog:<id>", "app:<version>") that went out, or are
 * scheduled to go out, in this locale. Expired, skipped and cancelled issues
 * do not count, so their articles move on to the next issue.
 */
export function sentItemIds(manifests, locale) {
  const sent = new Set();
  for (const manifest of manifests) {
    const entry = manifest.locales?.[locale];
    if (entry && (entry.status === 'scheduled' || entry.status === 'sent')) {
      for (const id of entry.items ?? []) sent.add(id);
    }
  }
  return sent;
}

/**
 * The newest published articles of one kind ('tip' or 'blog') that did not go
 * out yet and are at most LOOKBACK_DAYS old, newest first.
 */
export function selectArticles(articles, {kind, now, sent, max}) {
  const oldest = utcDay(new Date(now.getTime() - LOOKBACK_DAYS * DAY_MS));
  return (articles ?? [])
    .filter((article) => isPublished(article, now))
    .filter((article) => article.publishedAt >= oldest)
    .filter((article) => !sent.has(`${kind}:${article.id}`))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id))
    .slice(0, max);
}

/**
 * The current App Store version, when it was released in the last
 * LOOKBACK_DAYS, has release notes and did not go out yet. Otherwise null.
 */
export function selectAppRelease(release, {now, sent}) {
  if (!release || !release.version || !release.notes?.trim()) return null;
  const released = Date.parse(release.releaseDate);
  if (!Number.isFinite(released)) return null;
  if (released > now.getTime() || released < now.getTime() - LOOKBACK_DAYS * DAY_MS) return null;
  if (sent.has(`app:${release.version}`)) return null;
  return release;
}

export function issueItemIds({tips, blog, app}) {
  return [
    ...tips.map((article) => `tip:${article.id}`),
    ...blog.map((article) => `blog:${article.id}`),
    ...(app ? [`app:${app.version}`] : [])
  ];
}

function campaign(issueId) {
  return `utm_source=newsletter&utm_medium=email&utm_campaign=newsletter-${issueId}`;
}

/** Public URL of an article, without tracking parameters. */
export function articlePageUrl(locale, kind, slug) {
  const section = kind === 'tip' ? 'tips' : 'blog';
  return `${SITE_URL}/${locale}/${section}/${encodeURIComponent(slug)}`;
}

export function articleLink(locale, kind, slug, issueId) {
  return `${articlePageUrl(locale, kind, slug)}?${campaign(issueId)}`;
}

// ---------------------------------------------------------------------------
// The email
// ---------------------------------------------------------------------------

function sectionHeading(text) {
  return `
          <tr>
            <td style="padding: 16px 0 12px 0;">
              <h2 style="margin: 0; font-size: 20px; line-height: 1.3; font-weight: bold; color: #0F766E;">${escapeHtml(text)}</h2>
            </td>
          </tr>`;
}

function articleCard({title, summary, meta, url}) {
  return `
          <tr>
            <td style="padding: 0 0 16px 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td bgcolor="#EAF8F5" style="padding: 20px; background-color: #EAF8F5; border-radius: 12px; border: 1px solid #D2F0EA;">
                    <a href="${escapeHtml(url)}" style="font-size: 17px; line-height: 1.4; font-weight: bold; color: #115E59; text-decoration: none;">${escapeHtml(title)}</a>
                    <p style="margin: 8px 0 0 0; font-size: 15px; line-height: 1.6; color: #475569;">${escapeHtml(summary)}</p>
                    <p style="margin: 8px 0 0 0; font-size: 13px; line-height: 1.4; color: #64748B;">${escapeHtml(meta)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}

function textLink(url, label) {
  return `<a href="${escapeHtml(url)}" style="color: #0F766E; font-weight: 600; text-decoration: none;">${escapeHtml(label)}</a>`;
}

/** Release notes as plain lines; lines that start with a bullet become a list. */
function releaseNoteLines(notes) {
  return notes
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const bullet = line.match(/^[•\-*–]\s*(.+)$/);
      return bullet ? {bullet: true, text: bullet[1]} : {bullet: false, text: line};
    });
}

function releaseNotesHtml(notes) {
  let html = '';
  let list = [];
  const flush = () => {
    if (list.length === 0) return;
    html += `<ul style="margin: 0 0 12px 0; padding-left: 20px; font-size: 15px; line-height: 1.6; color: #475569;">${list
      .map((text) => `<li style="margin: 0 0 6px 0;">${escapeHtml(text)}</li>`)
      .join('')}</ul>`;
    list = [];
  };
  for (const line of releaseNoteLines(notes)) {
    if (line.bullet) {
      list.push(line.text);
    } else {
      flush();
      html += `<p style="margin: 0 0 12px 0; font-size: 15px; line-height: 1.6; color: #475569;">${escapeHtml(line.text)}</p>`;
    }
  }
  flush();
  return html;
}

function readingTime(ui, minutes) {
  return ui.readingTime.replace('{minutes}', String(minutes));
}

/**
 * Renders one locale's issue. `ui.tips` and `ui.blog` are the `ui` objects of
 * that locale's tips and blog JSON files, which scripts/newsletter.mjs reads
 * (this file reads no content itself).
 */
export function renderIssue({locale, issueId, tips, blog, app, ui}) {
  const t = ISSUE_COPY[locale];
  const f = newsletterFooterCopy(locale);
  if (!t) throw new Error(`No newsletter copy for locale ${locale}`);

  const lead = tips[0] ?? blog[0] ?? null;
  // French puts a no-break space before a colon, like the other French emails.
  const colon = locale === 'fr' ? '\u00a0: ' : ': ';
  const appTitle = app ? `${t.appHeading}${colon}${t.version} ${app.version}` : null;
  const subject = lead ? lead.title : appTitle;
  if (!subject) throw new Error(`Issue ${issueId} (${locale}) has nothing to send`);
  const month = monthLabel(locale, issueId);

  const tipsUrl = `${SITE_URL}/${locale}/tips?${campaign(issueId)}`;

  let body = `
          <tr>
            <td align="center" style="padding-bottom: 8px;">
              <p style="margin: 0; font-size: 13px; line-height: 1.4; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #0F766E;">${escapeHtml(t.name)}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 28px; line-height: 1.25; font-weight: bold; color: #115E59;">${escapeHtml(month)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 8px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 8px 0;">${escapeHtml(f.hey)}</p>
              <p style="margin: 0 0 8px 0;">${escapeHtml(t.intro)}</p>
            </td>
          </tr>`;

  const text = [`${t.name} · ${month}`, '', f.hey, t.intro, ''];

  if (tips.length > 0) {
    body += sectionHeading(ui.tips.heading);
    text.push(ui.tips.heading, '');
    for (const article of tips) {
      const url = articleLink(locale, 'tip', article.slug, issueId);
      const meta = readingTime(ui.tips, article.readingMinutes);
      body += articleCard({title: article.title, summary: article.cardSummary, meta, url});
      text.push(`- ${article.title}`, `  ${article.cardSummary}`, `  ${meta}${colon}${url}`, '');
    }
    body += `
          <tr>
            <td style="padding: 0 0 8px 0; font-size: 15px; line-height: 1.6;">
              ${textLink(tipsUrl, `${ui.tips.moreTips} →`)}
            </td>
          </tr>`;
    text.push(`${ui.tips.moreTips}${colon}${tipsUrl}`, '');
  }

  if (blog.length > 0) {
    body += sectionHeading(ui.blog.heading);
    text.push(ui.blog.heading, '');
    for (const article of blog) {
      const url = articleLink(locale, 'blog', article.slug, issueId);
      const meta = readingTime(ui.blog, article.readingMinutes);
      body += articleCard({title: article.title, summary: article.cardSummary, meta, url});
      text.push(`- ${article.title}`, `  ${article.cardSummary}`, `  ${meta}${colon}${url}`, '');
    }
  }

  if (app) {
    body += sectionHeading(appTitle);
    body += `
          <tr>
            <td style="padding: 0 0 8px 0;">
              ${releaseNotesHtml(app.notes)}
              <p style="margin: 0; font-size: 15px; line-height: 1.8;">
                ${textLink(NEWSLETTER_APP_STORE_URL, ui.tips.iphoneCta)}<br>
                ${textLink(NEWSLETTER_PLAY_URL, ui.tips.androidCta)}
              </p>
            </td>
          </tr>`;
    text.push(appTitle, '');
    for (const line of releaseNoteLines(app.notes)) text.push(line.bullet ? `- ${line.text}` : line.text);
    text.push(
      '',
      `${ui.tips.iphoneCta}${colon}${NEWSLETTER_APP_STORE_URL}`,
      `${ui.tips.androidCta}${colon}${NEWSLETTER_PLAY_URL}`,
      ''
    );
  }

  const unsubscribe = `
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #94A3B8; line-height: 1.6;">
                ${escapeHtml(f.reason)}<br>
                ${escapeHtml(f.unsubscribeLead)} <a href="${UNSUBSCRIBE_PLACEHOLDER}" style="color: #0F766E;">${escapeHtml(f.unsubscribeLink)}</a>
              </p>`;
  body += `
          <tr>
            <td style="padding-top: 16px;"></td>
          </tr>
${footer(locale, unsubscribe)}`;

  text.push('--', f.reason, `${f.unsubscribeLead} ${UNSUBSCRIBE_PLACEHOLDER}`);

  return {
    subject,
    previewText: t.intro,
    html: shell(body, `${t.name} · ${month}`).trim(),
    text: text.join('\n')
  };
}

export function broadcastName(issueId, locale) {
  return `newsletter-${issueId}-${locale}`;
}

/** The body of POST /broadcasts: one draft for one language's subscribers. */
export function broadcastPayload({locale, issueId, rendered}) {
  const topicId = NEWSLETTER_TOPIC_IDS[locale];
  if (!topicId) throw new Error(`No topic for locale ${locale}`);
  return {
    name: broadcastName(issueId, locale),
    segment_id: NEWSLETTER_SEGMENT_ID,
    topic_id: topicId,
    from: NEWSLETTER_FROM,
    reply_to: [NEWSLETTER_REPLY_TO],
    subject: rendered.subject,
    preview_text: rendered.previewText,
    html: rendered.html,
    text: rendered.text
  };
}

/**
 * Why a broadcast as Resend stored it may not go out for this locale, or null
 * when it may. A missing topic always blocks: without it the broadcast would
 * reach every language's subscribers.
 */
export function storedBroadcastProblem(stored, {issueId, locale}) {
  if (!stored) return 'not found';
  if (stored.name !== broadcastName(issueId, locale)) return 'name';
  if (stored.segment_id !== NEWSLETTER_SEGMENT_ID) return 'segment';
  if (!stored.topic_id) return 'no topic';
  if (stored.topic_id !== NEWSLETTER_TOPIC_IDS[locale]) return 'topic';
  if (stored.from !== NEWSLETTER_FROM) return 'sender';
  if (!stored.html?.includes(UNSUBSCRIBE_PLACEHOLDER)) return 'no unsubscribe link in the HTML';
  if (!stored.text?.includes(UNSUBSCRIBE_PLACEHOLDER)) return 'no unsubscribe link in the text';
  return null;
}

/**
 * Fingerprint of everything that decides what a broadcast sends and to whom.
 * Taken from Resend's stored copy when the draft is made (that copy is also
 * what the preview email shows) and compared again right before scheduling,
 * so an approval only ever covers the version that was previewed.
 */
export function broadcastFingerprint(broadcast) {
  const replyTo = Array.isArray(broadcast.reply_to)
    ? [...broadcast.reply_to].sort()
    : broadcast.reply_to
      ? [broadcast.reply_to]
      : [];
  const fields = [
    broadcast.name ?? null,
    broadcast.segment_id ?? null,
    broadcast.topic_id ?? null,
    broadcast.from ?? null,
    broadcast.subject ?? null,
    replyTo,
    broadcast.preview_text ?? null,
    broadcast.html ?? null,
    broadcast.text ?? null
  ];
  return createHash('sha256').update(JSON.stringify(fields)).digest('hex');
}

/** A preview email for Hans: the stored broadcast with a harmless unsubscribe link. */
export function previewEmail(stored, locale) {
  const harmless = `${SITE_URL}/${locale}`;
  return {
    subject: `[Proef ${locale}] ${stored.subject}`,
    html: stored.html.split(UNSUBSCRIBE_PLACEHOLDER).join(harmless),
    text: (stored.text ?? '').split(UNSUBSCRIBE_PLACEHOLDER).join(harmless)
  };
}

// ---------------------------------------------------------------------------
// Keeping the state branch in step with Resend
// ---------------------------------------------------------------------------

const SCHEDULED_STATUSES = ['queued', 'scheduled', 'sending'];
const CANCELLED_STATUSES = ['canceled', 'cancelled'];

/**
 * The new manifest status of a draft or scheduled language, given what Resend
 * reports for its broadcast (null when the broadcast is gone), or null when
 * nothing changes. Also catches a send that Resend accepted while its answer
 * got lost. A draft that went out with other content than its preview (sent
 * or scheduled in the dashboard after an edit) becomes 'outside': it does not
 * count as sent, so its articles stay available, and the run warns about it.
 */
export function reconciledStatus(entry, broadcast) {
  const current = entry?.status;
  if (current !== 'draft' && current !== 'scheduled') return null;
  if (!broadcast) return 'cancelled';
  const status = broadcast.status;
  if (CANCELLED_STATUSES.includes(status)) return 'cancelled';
  if (current === 'scheduled') {
    if (status === 'sent') return 'sent';
    if (status === 'draft') return 'cancelled';
    return null;
  }
  const goneOut = status === 'sent' || SCHEDULED_STATUSES.includes(status);
  if (!goneOut) return null;
  if (broadcastFingerprint(broadcast) !== entry.fingerprint) return 'outside';
  return status === 'sent' ? 'sent' : 'scheduled';
}

export function hasDrafts(manifest) {
  return Object.values(manifest.locales ?? {}).some((entry) => entry.status === 'draft');
}

/** Issues whose approval issue may be closed are looked at for this many days. */
const CLOSE_WINDOW_DAYS = 120;

/**
 * The approval issues that should be closed, worked out from the state alone
 * on every run, so a run that stopped halfway is repaired by the next one. The
 * workflow closes (and comments on) only the ones that are still open.
 */
export function issuesToClose(manifests, now) {
  const close = new Map();
  for (const manifest of manifests) {
    if (daysBetween(new Date(manifest.preparedAt), now) > CLOSE_WINDOW_DAYS) continue;
    for (const title of manifest.retired ?? []) {
      close.set(title, 'Opnieuw klaargezet: dit issue is vervangen door een nieuwe versie met nieuwe concepten en proefmails.');
    }
    if (manifest.complete !== true || hasDrafts(manifest)) continue;
    const reason = manifest.expiredReason ?? '';
    const comment = reason.startsWith('superseded:')
      ? `Vervangen door het nummer van ${reason.slice('superseded:'.length)}: de concepten zijn verwijderd en de artikelen gaan mee in het nieuwe nummer.`
      : reason === 'age'
        ? `Niet goedgekeurd binnen ${EXPIRE_DAYS} dagen: de concepten zijn verwijderd. De artikelen gaan mee in het volgende nummer.`
        : 'Er wacht niets meer op goedkeuring.';
    close.set(approvalIssueTitle(manifest.issue, manifest.revision ?? 1), comment);
  }
  return [...close].map(([title, comment]) => ({title, comment}));
}

/**
 * What the send step does with one language of an approved issue:
 *   none      nothing waits for approval in this language
 *   drop      not ticked: delete the draft, its articles move on
 *   missing   the draft is gone from Resend
 *   schedule  ticked and still exactly what the preview showed
 *   adopt     already scheduled or sent with the previewed content (a send
 *             whose answer got lost): record it, send nothing
 *   refuse    anything else; `reason` says why
 */
export function sendDecision({entry, stored, ticked, issueId, locale}) {
  if (!entry || entry.status !== 'draft') return {action: 'none'};
  if (!ticked) return {action: 'drop'};
  if (!stored) return {action: 'missing'};
  const problem = storedBroadcastProblem(stored, {issueId, locale});
  const unchanged = !problem && broadcastFingerprint(stored) === entry.fingerprint;
  if (stored.status === 'draft') {
    return unchanged
      ? {action: 'schedule'}
      : {action: 'refuse', reason: problem ?? 'gewijzigd sinds de proefmail'};
  }
  if (unchanged && (SCHEDULED_STATUSES.includes(stored.status) || stored.status === 'sent')) {
    return {action: 'adopt', status: stored.status === 'sent' ? 'sent' : 'scheduled'};
  }
  return {action: 'refuse', reason: problem ?? `status ${stored.status}`};
}

// ---------------------------------------------------------------------------
// The approval issue on GitHub
// ---------------------------------------------------------------------------

/**
 * Title of the approval issue. A rebuilt issue gets a new revision and so a
 * new title, so the daily step can tell "never opened" from "closed".
 */
export function approvalIssueTitle(issueId, revision = 1) {
  return revision > 1 ? `Nieuwsbrief ${issueId} (versie ${revision})` : `Nieuwsbrief ${issueId}`;
}

const ISSUE_MARKER = /<!-- newsletter-issue: (\d{4}-\d{2}) r(\d+) -->/;
const TICK_LINE = /^- \[([ xX])\] `(nl|en|de|fr|es|it)`(?:\s|$)/;

function oneLine(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

/**
 * The lines of Markdown text outside fenced code blocks (CommonMark: a fence
 * of 3+ backticks or tildes, indented at most 3 spaces, closed by a fence of
 * the same character that is at least as long and has nothing after it; an
 * unclosed block runs to the end).
 */
function visibleLines(text) {
  const lines = [];
  let fence = null;
  for (const line of text.split('\n')) {
    if (fence) {
      const close = line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
      if (close && close[1][0] === fence[0] && close[1].length >= fence.length) fence = null;
      continue;
    }
    const open = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    // A backtick fence's info string has no backticks; otherwise it is inline code.
    if (open && !(open[1][0] === '`' && open[2].includes('`'))) {
      fence = open[1];
      continue;
    }
    lines.push(line);
  }
  return lines;
}

/** The body of the approval issue (Dutch: it is for Hans). */
export function renderApprovalIssue(manifest) {
  const lines = [
    `<!-- newsletter-issue: ${manifest.issue} r${manifest.revision ?? 1} -->`,
    '',
    `De nieuwsbrief van **${manifest.issue}** staat per taal als concept in Resend. Van elke taal heb je een proefmail gekregen.`,
    '',
    `Haal het vinkje weg bij een taal die niet mee moet en zet daarna het label \`approved\` op dit issue. De aangevinkte talen worden dan ingepland voor de eerstvolgende ${String(SEND_HOUR_UTC).padStart(2, '0')}:00 UTC die minstens 2 uur later valt. Wijzig de concepten niet in Resend: dan weigert de straat ze te versturen.`,
    ''
  ];
  for (const locale of NEWSLETTER_LOCALES) {
    const entry = manifest.locales?.[locale];
    if (!entry || (entry.status !== 'draft' && entry.status !== 'dry-run')) continue;
    lines.push(`- [x] \`${locale}\` ${oneLine(entry.subject)}`);
    for (const title of entry.titles ?? []) lines.push(`  - ${oneLine(title)}`);
    if (entry.broadcastId) {
      lines.push(`  - [Concept in Resend](https://resend.com/broadcasts/${entry.broadcastId})`);
    }
  }
  const empty = NEWSLETTER_LOCALES.filter(
    (locale) => manifest.locales?.[locale]?.status === 'empty'
  );
  if (empty.length > 0) {
    lines.push('', `Geen nieuwe inhoud, dus niet klaargezet: ${empty.map((l) => `\`${l}\``).join(', ')}.`);
  }
  lines.push(
    '',
    `Niet goedgekeurd na ${EXPIRE_DAYS} dagen: dan worden de concepten verwijderd en schuiven de artikelen door naar het volgende nummer.`
  );
  return lines.join('\n');
}

/**
 * Reads the approval issue: which month and revision, and which languages are
 * ticked. The issue body is only data here; everything else comes from the
 * manifest on the state branch. Only visible task-list lines count: lines in
 * HTML comments and code blocks do not. Returns null when the marker is
 * missing or a language is listed twice (ambiguous, so nothing is sent).
 */
export function parseApprovalIssue(body) {
  const text = String(body ?? '').replace(/\r\n?/g, '\n');
  const marker = text.match(ISSUE_MARKER);
  if (!marker) return null;
  const listed = new Set();
  const ticked = new Set();
  for (const line of visibleLines(text.replace(/<!--[\s\S]*?(?:-->|$)/g, ''))) {
    const match = line.match(TICK_LINE);
    if (!match) continue;
    const locale = match[2];
    if (listed.has(locale)) return null;
    listed.add(locale);
    if (match[1] !== ' ') ticked.add(locale);
  }
  return {issueId: marker[1], revision: Number(marker[2]), listed, ticked};
}
