#!/usr/bin/env node
// The monthly newsletter: prepares one Resend draft broadcast per language,
// mails Hans a preview of each, and schedules the languages he approves.
// Run by .github/workflows/newsletter-daily.yml and newsletter-send.yml; see
// docs/NEWSLETTER.md. Needs no npm packages (Node 20+, global fetch), so the
// workflows never install dependencies next to the Resend key.
//
//   node scripts/newsletter.mjs daily   --state <dir> --summary <file> [--today YYYY-MM-DD] [--dry-run] [--rebuild]
//   node scripts/newsletter.mjs send    --state <dir> --body <file> --summary <file> [--execute]
//   node scripts/newsletter.mjs preview --out <dir> [--state <dir>] [--today YYYY-MM-DD]
//   node scripts/newsletter.mjs e2e-test --locale <xx> --topic <id> [--today YYYY-MM-DD] [--execute]
//
// daily    1. draft and scheduled languages are brought in step with Resend
//             (sent, scheduled, cancelled);
//          2. unapproved issues get a reminder on day 7 and 14 and expire on
//             day 21, or as soon as the next month's issue is prepared;
//          3. from the first Monday of the month: prepare this month's issue if
//             it is not there yet (or redo one that a crash left incomplete);
//          4. work out from the state which approval issues must exist and
//             which can be closed, so a failed run is repaired by the next.
// send     schedules the ticked languages of an approved issue, after checking
//          that each draft is still exactly what the preview showed.
// preview  renders the issue to HTML and text files; touches nothing.
// e2e-test sends one language's issue as a broadcast to a separate test topic
//          (never a language topic), for an end-to-end test.
//
// Env: RESEND_NEWSLETTER_API_KEY (full-access Resend key) and
// NEWSLETTER_PREVIEW_TO (where preview emails go). The state directory is a
// checkout of the branch newsletter-state: issues/<YYYY-MM>.json per issue.
// Nothing here writes an email address to a file or a log.

import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  APP_STORE_COUNTRY,
  APP_STORE_ID,
  EXPIRE_DAYS,
  MAX_BLOG,
  MAX_TIPS,
  NEWSLETTER_LOCALES,
  REMINDER_DAYS,
  approvalIssueTitle,
  articlePageUrl,
  broadcastFingerprint,
  broadcastName,
  broadcastPayload,
  daysBetween,
  hasDrafts,
  isPrepareDue,
  issuesToClose,
  issueIdFor,
  issueItemIds,
  nextSendTime,
  parseApprovalIssue,
  previewEmail,
  reconciledStatus,
  renderApprovalIssue,
  renderIssue,
  selectAppRelease,
  selectArticles,
  sendDecision,
  sentItemIds,
  storedBroadcastProblem
} from '../src/lib/newsletter-issue.mjs';
import {
  NEWSLETTER_FROM,
  NEWSLETTER_SEGMENT_ID,
  NEWSLETTER_TOPIC_IDS
} from '../src/lib/newsletter-config.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const RESEND_API = 'https://api.resend.com';

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const options = {};
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (!arg.startsWith('--')) throw new Error(`Unexpected argument: ${arg}`);
    const key = arg.slice(2);
    const next = rest[i + 1];
    if (next === undefined || next.startsWith('--')) {
      options[key] = true;
    } else {
      options[key] = next;
      i++;
    }
  }
  return {command, options};
}

function required(options, key) {
  if (typeof options[key] !== 'string' || options[key] === '') {
    throw new Error(`--${key} is required`);
  }
  return options[key];
}

function parseToday(value) {
  if (value === undefined) return new Date();
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('--today must be YYYY-MM-DD');
  }
  return new Date(`${value}T12:00:00Z`);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Error text without email addresses: the run logs of a public repo are public. */
function redact(value) {
  return String(value ?? '').replace(/[^\s@<>"']+@[^\s@<>"']+/g, '<address>');
}

function log(message) {
  console.log(redact(message));
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function loadContent(kind, locale) {
  const path = join(ROOT, 'src', 'content', kind, `${locale}.json`);
  return existsSync(path) ? readJson(path) : {ui: null, articles: []};
}

// ---------------------------------------------------------------------------
// State branch: issues/<YYYY-MM>.json
// ---------------------------------------------------------------------------

function issuesDir(state) {
  return join(state, 'issues');
}

function loadManifests(state) {
  const dir = issuesDir(state);
  if (!existsSync(dir)) return {};
  const manifests = {};
  for (const file of readdirSync(dir)) {
    if (/^\d{4}-\d{2}\.json$/.test(file)) {
      const manifest = readJson(join(dir, file));
      manifests[manifest.issue] = manifest;
    }
  }
  return manifests;
}

function saveManifest(state, manifest) {
  mkdirSync(issuesDir(state), {recursive: true});
  writeJson(join(issuesDir(state), `${manifest.issue}.json`), manifest);
}

// ---------------------------------------------------------------------------
// Resend REST API
// ---------------------------------------------------------------------------

let lastCall = 0;
// Milliseconds between API calls; tests/newsletter-flow.test.mjs sets 0.
const CALL_SPACING_MS = Number(process.env.NEWSLETTER_CALL_SPACING_MS ?? 250);

function retryAfterMs(response) {
  const seconds = Number(response.headers.get('retry-after'));
  return Number.isFinite(seconds) && seconds > 0 ? Math.min(seconds, 30) * 1000 : 1000;
}

/**
 * One Resend API call. Spaces calls out (the account allows 10 per second,
 * shared with the website) and retries on 429. Returns null on 404 when
 * `allow404` is set. Creating calls are never retried on other errors: a
 * leftover draft is cleaned up by name on the next run.
 */
async function resend(method, path, body, {allow404 = false, idempotencyKey} = {}) {
  const key = process.env.RESEND_NEWSLETTER_API_KEY;
  if (!key) throw new Error('RESEND_NEWSLETTER_API_KEY is not set');
  for (let attempt = 1; ; attempt++) {
    const wait = lastCall + CALL_SPACING_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastCall = Date.now();
    const headers = {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'User-Agent': 'skillquest-newsletter'
    };
    if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;
    const response = await fetch(`${RESEND_API}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(30_000)
    });
    if (response.status === 429 && attempt < 4) {
      await sleep(retryAfterMs(response));
      continue;
    }
    if (response.status === 404 && allow404) return null;
    const raw = await response.text();
    let data = null;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }
    if (!response.ok) {
      const detail = [data?.name, data?.message].filter(Boolean).join(': ');
      throw new Error(
        redact(`Resend ${method} ${path.split('?')[0]} failed with ${response.status}${detail ? ` (${detail})` : ''}`)
      );
    }
    return data;
  }
}

async function listBroadcasts() {
  const all = [];
  let after = null;
  for (let page = 0; page < 50; page++) {
    const query = new URLSearchParams({limit: '100'});
    if (after) query.set('after', after);
    const result = await resend('GET', `/broadcasts?${query}`);
    const data = result?.data ?? [];
    all.push(...data);
    if (!result?.has_more || data.length === 0) return all;
    after = data[data.length - 1].id;
  }
  throw new Error('Resend broadcast list did not end after 50 pages');
}

async function deleteBroadcast(id) {
  await resend('DELETE', `/broadcasts/${id}`, undefined, {allow404: true});
}

// ---------------------------------------------------------------------------
// Public sources: App Store release notes and the live website
// ---------------------------------------------------------------------------

async function fetchAppRelease(locale) {
  const url = `https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=${APP_STORE_COUNTRY[locale]}`;
  const response = await fetch(url, {signal: AbortSignal.timeout(15_000)});
  if (!response.ok) throw new Error(`App Store lookup failed with ${response.status}`);
  const result = (await response.json())?.results?.[0];
  if (!result) return null;
  return {
    version: String(result.version ?? ''),
    releaseDate: String(result.currentVersionReleaseDate ?? ''),
    notes: String(result.releaseNotes ?? '')
  };
}

/**
 * The first `max` articles whose page is live (200), so no link in the email
 * is dead. An article that is not live yet makes room for the next one.
 */
async function keepLive(articles, locale, kind, max, warnings) {
  const live = [];
  for (const article of articles) {
    if (live.length >= max) break;
    const url = articlePageUrl(locale, kind, article.slug);
    let status = 0;
    try {
      status = (await fetch(url, {redirect: 'manual', signal: AbortSignal.timeout(15_000)})).status;
    } catch {
      status = 0;
    }
    if (status === 200) {
      live.push(article);
    } else {
      warnings.push(`${locale}: ${kind} ${article.id} left out, ${url} answered ${status || 'nothing'}`);
    }
  }
  return live;
}

/** What one locale's issue would contain. Network: App Store and the website only. */
async function buildLocaleIssue({locale, issueId, now, sent, warnings, checkLinks = true}) {
  const tipsData = loadContent('tips', locale);
  const blogData = loadContent('blog', locale);
  const candidates = (kind, articles) =>
    selectArticles(articles, {kind, now, sent, max: checkLinks ? Infinity : kind === 'tip' ? MAX_TIPS : MAX_BLOG});
  let tips = candidates('tip', tipsData.articles);
  let blog = candidates('blog', blogData.articles);
  if (checkLinks) {
    tips = await keepLive(tips, locale, 'tip', MAX_TIPS, warnings);
    blog = await keepLive(blog, locale, 'blog', MAX_BLOG, warnings);
  }
  let app = null;
  try {
    app = selectAppRelease(await fetchAppRelease(locale), {now, sent});
  } catch (error) {
    warnings.push(`${locale}: no app news (${redact(error.message)})`);
  }
  if (tips.length === 0 && blog.length === 0 && !app) return null;
  if (!tipsData.ui || (blog.length > 0 && !blogData.ui)) {
    throw new Error(`${locale}: tips or blog copy is missing`);
  }
  const rendered = renderIssue({
    locale,
    issueId,
    tips,
    blog,
    app,
    ui: {tips: tipsData.ui, blog: blogData.ui ?? tipsData.ui}
  });
  return {
    rendered,
    items: issueItemIds({tips, blog, app}),
    titles: [
      ...tips.map((article) => `Tip: ${article.title}`),
      ...blog.map((article) => `Blog: ${article.title}`),
      ...(app ? [`App: versie ${app.version}`] : [])
    ]
  };
}

/**
 * Mails Hans a preview of one stored draft. Throws when that is not possible:
 * a draft nobody previewed must not wait for approval, so the prepare run
 * fails and the next day's run builds the issue again.
 */
async function sendPreview({stored, locale, issueId, fingerprint}) {
  const preview = previewEmail(stored, locale);
  await resend(
    'POST',
    '/emails',
    {
      from: NEWSLETTER_FROM,
      to: [process.env.NEWSLETTER_PREVIEW_TO],
      subject: preview.subject,
      html: preview.html,
      text: preview.text
    },
    {idempotencyKey: `newsletter-preview-${issueId}-${locale}-${fingerprint.slice(0, 24)}`}
  );
}

// ---------------------------------------------------------------------------
// daily
// ---------------------------------------------------------------------------

/** Brings draft and scheduled languages in step with what Resend reports. */
async function reconcile(state, manifests, warnings) {
  for (const manifest of Object.values(manifests)) {
    let changed = false;
    for (const [locale, entry] of Object.entries(manifest.locales ?? {})) {
      if (entry.status !== 'draft' && entry.status !== 'scheduled') continue;
      const broadcast = await resend('GET', `/broadcasts/${entry.broadcastId}`, undefined, {allow404: true});
      const status = reconciledStatus(entry, broadcast);
      if (!status) continue;
      log(`${manifest.issue} ${locale}: ${entry.status} -> ${status}`);
      if (status === 'outside') {
        warnings.push(
          `${manifest.issue} ${locale}: went out or was scheduled in Resend with other content than its preview; its articles stay available`
        );
      }
      entry.status = status;
      if (status === 'sent') entry.sentAt = broadcast?.sent_at ?? null;
      if (status === 'scheduled') entry.scheduledAt = broadcast?.scheduled_at ?? null;
      changed = true;
    }
    if (changed) saveManifest(state, manifest);
  }
}

/** Deletes the remaining drafts of an issue and marks those languages expired. */
async function expire(state, manifest, reason, dryRun) {
  if (dryRun) return;
  for (const entry of Object.values(manifest.locales ?? {})) {
    if (entry.status !== 'draft') continue;
    await deleteBroadcast(entry.broadcastId);
    entry.status = 'expired';
  }
  manifest.expiredReason = reason;
  saveManifest(state, manifest);
}

async function prepare({state, now, issueId, revision, retired, manifests, dryRun, warnings}) {
  if (!dryRun && !process.env.NEWSLETTER_PREVIEW_TO) {
    throw new Error('NEWSLETTER_PREVIEW_TO is not set: nothing is prepared without a preview');
  }
  const manifest = {issue: issueId, revision, preparedAt: now.toISOString(), complete: false, retired, locales: {}};
  const existing = dryRun ? [] : await listBroadcasts();
  const history = Object.values(manifests).filter((m) => m.issue !== issueId);

  for (const locale of NEWSLETTER_LOCALES) {
    const sent = sentItemIds(history, locale);
    const built = await buildLocaleIssue({locale, issueId, now, sent, warnings});
    if (!built) {
      manifest.locales[locale] = {status: 'empty'};
      continue;
    }
    if (dryRun) {
      manifest.locales[locale] = {status: 'dry-run', subject: built.rendered.subject, items: built.items, titles: built.titles};
      continue;
    }

    const payload = broadcastPayload({locale, issueId, rendered: built.rendered});
    for (const old of existing.filter((broadcast) => broadcast.name === payload.name)) {
      if (old.status !== 'draft') {
        throw new Error(`Resend already has a broadcast ${payload.name} with status ${old.status}; not preparing it again`);
      }
      await deleteBroadcast(old.id);
      warnings.push(`${locale}: removed a leftover draft ${old.id}`);
    }

    const created = await resend('POST', '/broadcasts', payload);
    const stored = await resend('GET', `/broadcasts/${created.id}`, undefined, {allow404: true});
    const problem = storedBroadcastProblem(stored, {issueId, locale});
    if (problem || stored.status !== 'draft') {
      await deleteBroadcast(created.id);
      throw new Error(`${locale}: Resend stored the draft differently (${problem ?? stored.status}); removed it`);
    }
    const fingerprint = broadcastFingerprint(stored);
    manifest.locales[locale] = {
      status: 'draft',
      broadcastId: created.id,
      fingerprint,
      subject: stored.subject,
      items: built.items,
      titles: built.titles
    };
    saveManifest(state, manifest);
    log(`${issueId} ${locale}: draft ${created.id}`);
    await sendPreview({stored, locale, issueId, fingerprint});
  }

  manifest.complete = true;
  if (!dryRun) saveManifest(state, manifest);
  manifests[issueId] = manifest;
  return manifest;
}

/**
 * What the workflow does with GitHub issues, worked out from the state alone:
 * open the approval issue of every issue that waits (when no issue with that
 * title exists, open or closed), close the ones that no longer wait. Written
 * before and after preparing, so a failed prepare still repairs the rest.
 */
function issueActions(manifests, now) {
  const waiting = Object.values(manifests).filter((m) => m.complete === true && hasDrafts(m));
  return {
    ensure: waiting.map((m) => ({
      title: approvalIssueTitle(m.issue, m.revision ?? 1),
      body: renderApprovalIssue(m)
    })),
    close: issuesToClose(Object.values(manifests), now)
  };
}

async function daily(options) {
  const state = required(options, 'state');
  const summaryPath = required(options, 'summary');
  const dryRun = options['dry-run'] === true;
  const now = parseToday(options.today);
  const manifests = loadManifests(state);
  const warnings = [];
  const summary = {dryRun, complete: false, preview: null, ensure: [], close: [], reminders: [], warnings};
  const writeSummary = () => {
    if (!dryRun) Object.assign(summary, issueActions(manifests, now));
    writeJson(summaryPath, summary);
  };

  if (!dryRun) await reconcile(state, manifests, warnings);

  const issueId = issueIdFor(now);
  let current = manifests[issueId];
  let revision = current?.revision ?? 1;
  let retired = current?.retired ?? [];

  // Rebuild this month's issue: by hand, or because a crash left it
  // incomplete. The new revision and the retired title are saved at once, so
  // a prepare that fails afterwards cannot bring the old title back.
  if (current && (current.complete !== true || options.rebuild === true)) {
    const locked = Object.values(current.locales ?? {}).some((entry) =>
      ['scheduled', 'sent'].includes(entry.status)
    );
    if (locked) throw new Error(`${issueId} is already scheduled or sent; it cannot be prepared again`);
    if (current.complete === true) {
      retired = [...retired, approvalIssueTitle(issueId, revision)];
      revision += 1;
    }
    const previous = manifests[issueId];
    current = {issue: issueId, revision, preparedAt: now.toISOString(), complete: false, retired, locales: {}};
    manifests[issueId] = current;
    if (!dryRun) {
      // Save first, delete after: if a delete fails, the next run still sees an
      // incomplete issue, and prepare cleans up leftover drafts by name.
      saveManifest(state, current);
      for (const entry of Object.values(previous.locales ?? {})) {
        if (entry.status === 'draft' && entry.broadcastId) await deleteBroadcast(entry.broadcastId);
      }
    }
  }

  const prepareNow = isPrepareDue(now) && (!current || current.complete !== true);

  // Reminders and expiry. When a new month's issue is prepared, an older one
  // that still waits is expired first: one waiting issue at a time, so the
  // same articles can never be approved twice.
  for (const manifest of Object.values(manifests)) {
    if (manifest.complete !== true || !hasDrafts(manifest)) continue;
    const age = daysBetween(new Date(manifest.preparedAt), now);
    const superseded = prepareNow && manifest.issue !== issueId;
    if (superseded) {
      await expire(state, manifest, `superseded:${issueId}`, dryRun);
    } else if (age >= EXPIRE_DAYS) {
      await expire(state, manifest, 'age', dryRun);
    } else if (REMINDER_DAYS.includes(age)) {
      summary.reminders.push({
        title: approvalIssueTitle(manifest.issue, manifest.revision ?? 1),
        comment: `Nog niet goedgekeurd, dus er is niets verstuurd. Zet het label \`approved\` om de aangevinkte talen in te plannen. Na ${EXPIRE_DAYS} dagen vervallen de concepten.`
      });
    }
  }

  writeSummary();

  if (prepareNow) {
    const manifest = await prepare({state, now, issueId, revision, retired, manifests, dryRun, warnings});
    if (dryRun) {
      summary.preview = {title: approvalIssueTitle(issueId, revision), body: renderApprovalIssue(manifest)};
    }
  }

  summary.complete = true;
  writeSummary();
  for (const warning of warnings) log(`warning: ${warning}`);
  log(
    prepareNow
      ? `${dryRun ? 'Dry run: would prepare' : 'Prepared'} ${approvalIssueTitle(issueId, revision)}`
      : `Nothing to prepare for ${issueId}`
  );
}

// ---------------------------------------------------------------------------
// send
// ---------------------------------------------------------------------------

async function send(options) {
  const state = required(options, 'state');
  const summaryPath = required(options, 'summary');
  const execute = options.execute === true;
  const parsed = parseApprovalIssue(readFileSync(required(options, 'body'), 'utf8'));
  const summary = {execute, issue: null, lines: [], done: false, failed: false};
  const finish = () => {
    writeJson(summaryPath, summary);
    for (const line of summary.lines) log(line);
  };

  if (!parsed) {
    summary.failed = true;
    summary.lines.push('Dit issue heeft geen geldige nieuwsbriefmarkering, of een taal staat er twee keer in. Er is niets ingepland.');
    return finish();
  }
  summary.issue = parsed.issueId;
  const manifest = loadManifests(state)[parsed.issueId];
  if (!manifest || manifest.complete !== true) {
    summary.failed = true;
    summary.lines.push(`Nummer ${parsed.issueId} staat niet (volledig) op de branch newsletter-state. Er is niets ingepland.`);
    return finish();
  }
  if ((manifest.revision ?? 1) !== parsed.revision) {
    summary.failed = true;
    summary.lines.push(`Dit issue hoort bij een oudere versie van nummer ${parsed.issueId}. Er is niets ingepland.`);
    return finish();
  }

  const sendAt = nextSendTime(new Date());
  for (const locale of NEWSLETTER_LOCALES) {
    const entry = manifest.locales[locale];
    if (!entry || entry.status !== 'draft') continue;
    const ticked = parsed.ticked.has(locale);
    const stored = ticked
      ? await resend('GET', `/broadcasts/${entry.broadcastId}`, undefined, {allow404: true})
      : null;
    const decision = sendDecision({entry, stored, ticked, issueId: manifest.issue, locale});

    if (decision.action === 'drop') {
      if (execute) {
        await deleteBroadcast(entry.broadcastId);
        entry.status = 'skipped';
        saveManifest(state, manifest);
      }
      summary.lines.push(`\`${locale}\`: niet aangevinkt, ${execute ? 'concept verwijderd' : 'concept zou verwijderd worden'}.`);
    } else if (decision.action === 'missing') {
      summary.failed = true;
      if (execute) {
        entry.status = 'cancelled';
        saveManifest(state, manifest);
      }
      summary.lines.push(`\`${locale}\`: het concept bestaat niet meer in Resend. Niet verstuurd.`);
    } else if (decision.action === 'adopt') {
      if (execute) {
        entry.status = decision.status;
        entry.scheduledAt = stored.scheduled_at ?? null;
        if (decision.status === 'sent') entry.sentAt = stored.sent_at ?? null;
        saveManifest(state, manifest);
      }
      summary.lines.push(
        `\`${locale}\`: stond al ${decision.status === 'sent' ? 'verstuurd' : 'ingepland'} in Resend met de goedgekeurde inhoud; ${execute ? 'bijgewerkt' : 'zou bijgewerkt worden'}.`
      );
    } else if (decision.action === 'refuse') {
      summary.failed = true;
      summary.lines.push(
        `\`${locale}\`: niet ingepland (${decision.reason}). Zet het concept terug of bouw het nummer opnieuw (workflow "Newsletter - daily" met rebuild).`
      );
    } else if (decision.action === 'schedule') {
      if (execute) {
        await resend('POST', `/broadcasts/${entry.broadcastId}/send`, {scheduled_at: sendAt.toISOString()});
        entry.status = 'scheduled';
        entry.scheduledAt = sendAt.toISOString();
        saveManifest(state, manifest);
      }
      summary.lines.push(`\`${locale}\`: ${execute ? 'ingepland' : 'zou ingepland worden'} voor ${sendAt.toISOString().replace('.000Z', 'Z')}.`);
    }
  }

  if (summary.lines.length === 0) summary.lines.push('Er staat voor dit nummer geen concept meer klaar.');
  summary.done = !Object.values(manifest.locales).some((entry) => entry.status === 'draft');
  finish();
}

// ---------------------------------------------------------------------------
// preview and e2e-test
// ---------------------------------------------------------------------------

async function preview(options) {
  const out = required(options, 'out');
  const now = parseToday(options.today);
  const issueId = issueIdFor(now);
  const manifests = options.state ? loadManifests(options.state) : {};
  const history = Object.values(manifests).filter((m) => m.issue !== issueId);
  const warnings = [];
  mkdirSync(out, {recursive: true});
  for (const locale of NEWSLETTER_LOCALES) {
    const built = await buildLocaleIssue({
      locale,
      issueId,
      now,
      sent: sentItemIds(history, locale),
      warnings,
      checkLinks: options['check-links'] === true
    });
    if (!built) {
      log(`${locale}: nothing new`);
      continue;
    }
    writeFileSync(join(out, `${issueId}-${locale}.html`), built.rendered.html, 'utf8');
    writeFileSync(join(out, `${issueId}-${locale}.txt`), `${built.rendered.subject}\n\n${built.rendered.text}\n`, 'utf8');
    log(`${locale}: ${built.rendered.subject} [${built.items.join(', ')}]`);
  }
  for (const warning of warnings) log(`warning: ${warning}`);
}

async function e2eTest(options) {
  const locale = required(options, 'locale');
  const topic = required(options, 'topic');
  if (!NEWSLETTER_LOCALES.includes(locale)) throw new Error(`Unknown locale ${locale}`);
  if (Object.values(NEWSLETTER_TOPIC_IDS).includes(topic)) {
    throw new Error('--topic must be a separate test topic, never a language topic');
  }
  const now = parseToday(options.today);
  const issueId = issueIdFor(now);
  const warnings = [];
  const built = await buildLocaleIssue({locale, issueId, now, sent: new Set(), warnings});
  if (!built) throw new Error(`${locale}: nothing to send for ${issueId}`);
  const payload = {
    ...broadcastPayload({locale, issueId, rendered: built.rendered}),
    name: `newsletter-test-${issueId}-${locale}`,
    topic_id: topic,
    subject: `[Test] ${built.rendered.subject}`
  };
  if (options.execute !== true) {
    log(`Dry run: would send ${payload.name} to the test topic (${built.items.join(', ')})`);
    return;
  }
  // The same calls as a real issue: create, read back, preview, schedule.
  const created = await resend('POST', '/broadcasts', payload);
  const stored = await resend('GET', `/broadcasts/${created.id}`);
  if (stored.topic_id !== topic || stored.segment_id !== NEWSLETTER_SEGMENT_ID || stored.status !== 'draft') {
    await deleteBroadcast(created.id);
    throw new Error(`Resend did not keep the test topic (topic ${stored.topic_id ?? 'missing'}, status ${stored.status}); removed the broadcast`);
  }
  const fingerprint = broadcastFingerprint(stored);
  log(`Created ${created.id}; GET returned topic_id, segment_id and status draft; fingerprint ${fingerprint.slice(0, 12)}`);
  if (process.env.NEWSLETTER_PREVIEW_TO) {
    await sendPreview({stored, locale, issueId: `test-${issueId}`, fingerprint});
    log('Preview email sent');
  }
  const sendAt = new Date(Date.now() + 3 * 60 * 1000);
  await resend('POST', `/broadcasts/${created.id}/send`, {scheduled_at: sendAt.toISOString()});
  const scheduled = await resend('GET', `/broadcasts/${created.id}`);
  log(
    `Scheduled ${payload.name} (${broadcastName(issueId, locale)} content) for ${sendAt.toISOString()}; ` +
      `Resend reports status ${scheduled.status}, fingerprint ${broadcastFingerprint(scheduled) === fingerprint ? 'unchanged' : 'CHANGED'}`
  );
  for (const warning of warnings) log(`warning: ${warning}`);
}

// ---------------------------------------------------------------------------

const commands = {daily, send, preview, 'e2e-test': e2eTest};

const {command, options} = parseArgs(process.argv.slice(2));
if (!commands[command]) {
  console.error('Usage: node scripts/newsletter.mjs daily|send|preview|e2e-test [options]');
  process.exit(2);
}
try {
  await commands[command](options);
} catch (error) {
  console.error(redact(error?.stack ?? error));
  process.exit(1);
}
