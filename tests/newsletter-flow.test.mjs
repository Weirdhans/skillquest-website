// Runs scripts/newsletter.mjs end to end against a fake Resend
// (tests/fixtures/newsletter-fake-fetch.mjs): prepare, approve, send, the
// next month, failures and rebuilds. Nothing here touches the network.

import assert from 'node:assert/strict';
import test from 'node:test';
import {spawnSync} from 'node:child_process';
import {existsSync, mkdtempSync, readFileSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {NEWSLETTER_TOPIC_IDS} from '../src/lib/newsletter-config.mjs';

const SCRIPT = fileURLToPath(new URL('../scripts/newsletter.mjs', import.meta.url));
const FAKE = pathToFileURL(fileURLToPath(new URL('./fixtures/newsletter-fake-fetch.mjs', import.meta.url))).href;
const PREVIEW_TO = 'preview-inbox@example.com';
const LOCALES = ['nl', 'en', 'de', 'fr', 'es', 'it'];

function run(dir, args, env = {}) {
  const result = spawnSync(process.execPath, ['--import', FAKE, SCRIPT, ...args], {
    encoding: 'utf8',
    env: {
      ...process.env,
      RESEND_NEWSLETTER_API_KEY: 'test-key',
      NEWSLETTER_PREVIEW_TO: PREVIEW_TO,
      NEWSLETTER_CALL_SPACING_MS: '0',
      FAKE_RESEND_STATE: join(dir, 'resend.json'),
      ...env
    }
  });
  assert.ok(!`${result.stdout}${result.stderr}`.includes(PREVIEW_TO), 'no address in the log');
  return result;
}

const daily = (dir, today, extra = [], env = {}) =>
  run(dir, ['daily', '--state', join(dir, 'state'), '--summary', join(dir, 'summary.json'), '--today', today, ...extra], env);

function send(dir, body, execute) {
  writeFileSync(join(dir, 'body.md'), body, 'utf8');
  const result = run(dir, [
    'send', '--state', join(dir, 'state'), '--body', join(dir, 'body.md'), '--summary', join(dir, 'send.json'),
    ...(execute ? ['--execute'] : [])
  ]);
  return {result, summary: JSON.parse(readFileSync(join(dir, 'send.json'), 'utf8'))};
}

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const manifest = (dir, issue) => readJson(join(dir, 'state', 'issues', `${issue}.json`));
const summary = (dir) => readJson(join(dir, 'summary.json'));
const resend = (dir) => readJson(join(dir, 'resend.json'));
const statuses = (m) => LOCALES.map((l) => m.locales[l]?.status);
const freshDir = () => mkdtempSync(join(tmpdir(), 'newsletter-flow-'));

function updateResend(dir, change) {
  const state = resend(dir);
  change(state);
  writeFileSync(join(dir, 'resend.json'), JSON.stringify(state));
}

test('a month: prepare, approve, send, and the next month skips what went out', () => {
  const dir = freshDir();

  let result = daily(dir, '2026-12-06');
  assert.equal(result.status, 0, result.stderr);
  assert.ok(!existsSync(join(dir, 'state', 'issues', '2026-12.json')), 'nothing before the first Monday');

  result = daily(dir, '2026-12-07');
  assert.equal(result.status, 0, result.stderr);
  const december = manifest(dir, '2026-12');
  assert.equal(december.complete, true);
  assert.deepEqual(statuses(december), Array(6).fill('draft'));
  assert.ok(!JSON.stringify(december).includes('@'), 'no address in the state');
  let account = resend(dir);
  assert.equal(Object.keys(account.broadcasts).length, 6);
  assert.equal(account.emails.length, 6, 'one preview per language');
  for (const broadcast of Object.values(account.broadcasts)) {
    assert.equal(broadcast.topic_id, NEWSLETTER_TOPIC_IDS[broadcast.name.slice(-2)]);
    assert.equal(broadcast.status, 'draft');
  }
  const first = summary(dir);
  assert.equal(first.complete, true);
  assert.deepEqual(first.ensure.map((issue) => issue.title), ['Nieuwsbrief 2026-12']);

  // The same day again changes nothing.
  result = daily(dir, '2026-12-07');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(Object.keys(resend(dir).broadcasts).length, 6);
  assert.equal(resend(dir).emails.length, 6);

  // Approve every language but English. A dry run first changes nothing.
  const body = first.ensure[0].body.replace('- [x] `en`', '- [ ] `en`');
  let sent = send(dir, body, false);
  assert.equal(sent.result.status, 0, sent.result.stderr);
  assert.deepEqual(statuses(manifest(dir, '2026-12')), Array(6).fill('draft'));
  assert.ok(Object.values(resend(dir).broadcasts).every((b) => b.status === 'draft'));

  sent = send(dir, body, true);
  assert.equal(sent.result.status, 0, sent.result.stderr);
  assert.equal(sent.summary.failed, false);
  assert.equal(sent.summary.done, true);
  const approved = manifest(dir, '2026-12');
  assert.deepEqual(statuses(approved), ['scheduled', 'skipped', 'scheduled', 'scheduled', 'scheduled', 'scheduled']);
  account = resend(dir);
  assert.equal(Object.keys(account.broadcasts).length, 5, 'the unticked draft is deleted');
  for (const broadcast of Object.values(account.broadcasts)) {
    assert.equal(broadcast.status, 'queued');
    assert.match(broadcast.scheduled_at, /T07:00:00\.000Z$/);
  }

  // Resend sends them; the next day's run records it and the issue may close.
  updateResend(dir, (state) => {
    for (const broadcast of Object.values(state.broadcasts)) {
      broadcast.status = 'sent';
      broadcast.sent_at = '2026-12-09T07:00:05Z';
    }
  });
  result = daily(dir, '2026-12-09');
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(statuses(manifest(dir, '2026-12')), ['sent', 'skipped', 'sent', 'sent', 'sent', 'sent']);
  assert.deepEqual(summary(dir).ensure, []);
  assert.deepEqual(summary(dir).close.map((c) => c.title), ['Nieuwsbrief 2026-12']);

  // January: Dutch leaves out what went out in December; English, which was
  // skipped, gets those articles again.
  result = daily(dir, '2027-01-04');
  assert.equal(result.status, 0, result.stderr);
  const january = manifest(dir, '2027-01');
  const nlItems = january.locales.nl.items ?? [];
  for (const item of approved.locales.nl.items) assert.ok(!nlItems.includes(item), `nl ${item}`);
  // December's three newest blog articles went out in Dutch, so January takes
  // the two older ones; English still gets the newest.
  assert.ok(approved.locales.nl.items.includes('blog:skillquest-vs-habitica'));
  assert.ok(nlItems.includes('blog:pomodoro-vs-deep-work-vs-flowtime'));
  assert.ok(january.locales.en.items.includes('blog:skillquest-vs-habitica'));
  assert.ok(january.locales.en.items.includes('app:1.0.5'));
  assert.ok(!nlItems.includes('app:1.0.5'));
});

test('without a preview nothing waits for approval, and the next day repairs it', () => {
  const dir = freshDir();

  let result = daily(dir, '2026-12-07', [], {NEWSLETTER_PREVIEW_TO: ''});
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /NEWSLETTER_PREVIEW_TO is not set/);
  assert.ok(!existsSync(join(dir, 'resend.json')) || Object.keys(resend(dir).broadcasts).length === 0);

  result = daily(dir, '2026-12-07', [], {FAKE_RESEND_FAIL: 'emails'});
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /<address>/, 'the error is logged without the address');
  assert.equal(manifest(dir, '2026-12').complete, false);
  assert.equal(summary(dir).complete, false);
  assert.deepEqual(summary(dir).ensure, [], 'no approval issue for an unpreviewed draft');

  result = daily(dir, '2026-12-08');
  assert.equal(result.status, 0, result.stderr);
  const repaired = manifest(dir, '2026-12');
  assert.equal(repaired.complete, true);
  assert.equal(repaired.revision, 1);
  assert.deepEqual(statuses(repaired), Array(6).fill('draft'));
  assert.equal(Object.keys(resend(dir).broadcasts).length, 6, 'the half-made draft was cleaned up');
  assert.deepEqual(summary(dir).ensure.map((issue) => issue.title), ['Nieuwsbrief 2026-12']);
});

test('a draft edited in Resend is refused; a send whose answer got lost is adopted', () => {
  const dir = freshDir();
  assert.equal(daily(dir, '2026-12-07').status, 0);
  const body = summary(dir).ensure[0].body;
  const ids = manifest(dir, '2026-12').locales;

  updateResend(dir, (state) => {
    state.broadcasts[ids.nl.broadcastId].subject = 'Edited in the dashboard';
    // As if an earlier /send was accepted but its answer never arrived.
    state.broadcasts[ids.de.broadcastId].status = 'queued';
  });
  const {result, summary: report} = send(dir, body, true);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(report.failed, true);
  assert.equal(report.done, false);
  const after = manifest(dir, '2026-12');
  assert.equal(after.locales.nl.status, 'draft');
  assert.equal(resend(dir).broadcasts[ids.nl.broadcastId].status, 'draft', 'the edited draft is not scheduled');
  assert.equal(after.locales.de.status, 'scheduled');
  assert.ok(!resend(dir).calls.includes(`POST /broadcasts/${ids.de.broadcastId}/send`), 'no second send');
  assert.equal(after.locales.en.status, 'scheduled');
});

test('a rebuild gets a new revision that survives a failed prepare', () => {
  const dir = freshDir();
  assert.equal(daily(dir, '2026-12-07').status, 0);
  const oldBody = summary(dir).ensure[0].body;

  let result = daily(dir, '2026-12-09', ['--rebuild']);
  assert.equal(result.status, 0, result.stderr);
  let rebuilt = manifest(dir, '2026-12');
  assert.equal(rebuilt.revision, 2);
  assert.deepEqual(rebuilt.retired, ['Nieuwsbrief 2026-12']);
  assert.equal(Object.keys(resend(dir).broadcasts).length, 6, 'old drafts deleted, new ones made');
  assert.deepEqual(summary(dir).ensure.map((issue) => issue.title), ['Nieuwsbrief 2026-12 (versie 2)']);
  assert.ok(summary(dir).close.some((c) => c.title === 'Nieuwsbrief 2026-12'));

  // The old issue no longer approves anything.
  const stale = send(dir, oldBody, true);
  assert.equal(stale.summary.failed, true);
  assert.match(stale.summary.lines[0], /oudere versie/);
  assert.deepEqual(statuses(manifest(dir, '2026-12')), Array(6).fill('draft'));

  // A rebuild whose prepare fails keeps its new revision for the next run.
  result = daily(dir, '2026-12-10', ['--rebuild'], {FAKE_RESEND_FAIL: 'emails'});
  assert.notEqual(result.status, 0);
  rebuilt = manifest(dir, '2026-12');
  assert.equal(rebuilt.revision, 3);
  assert.equal(rebuilt.complete, false);
  assert.ok(summary(dir).close.some((c) => c.title === 'Nieuwsbrief 2026-12 (versie 2)'));

  result = daily(dir, '2026-12-11');
  assert.equal(result.status, 0, result.stderr);
  rebuilt = manifest(dir, '2026-12');
  assert.equal(rebuilt.revision, 3);
  assert.equal(rebuilt.complete, true);
  assert.deepEqual(summary(dir).ensure.map((issue) => issue.title), ['Nieuwsbrief 2026-12 (versie 3)']);
  assert.deepEqual(
    summary(dir).close.map((c) => c.title).sort(),
    ['Nieuwsbrief 2026-12', 'Nieuwsbrief 2026-12 (versie 2)']
  );
});

test('a waiting issue expires when the next month is prepared, and reminds before that', () => {
  const dir = freshDir();
  assert.equal(daily(dir, '2026-12-14').status, 0, 'prepared late in the month');

  assert.equal(daily(dir, '2026-12-21').status, 0);
  assert.deepEqual(summary(dir).reminders.map((r) => r.title), ['Nieuwsbrief 2026-12']);

  const result = daily(dir, '2027-01-04');
  assert.equal(result.status, 0, result.stderr);
  const december = manifest(dir, '2026-12');
  assert.deepEqual(statuses(december), Array(6).fill('expired'));
  assert.equal(december.expiredReason, 'superseded:2027-01');
  const close = summary(dir).close.find((c) => c.title === 'Nieuwsbrief 2026-12');
  assert.match(close.comment, /Vervangen door het nummer van 2027-01/);
  assert.deepEqual(summary(dir).ensure.map((issue) => issue.title), ['Nieuwsbrief 2027-01']);
  // December's articles were never sent, so January carries them.
  assert.ok(manifest(dir, '2027-01').locales.nl.items.includes('blog:skillquest-vs-habitica'));
  assert.ok(manifest(dir, '2027-01').locales.nl.items.includes('app:1.0.5'));
  const names = Object.values(resend(dir).broadcasts).map((b) => b.name);
  assert.ok(names.every((name) => name.startsWith('newsletter-2027-01-')), 'December drafts are gone');
});
