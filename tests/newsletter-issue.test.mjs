import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {
  APPROVAL_LEAD_MS,
  EXPIRE_DAYS,
  ISSUE_COPY,
  LOOKBACK_DAYS,
  MAX_BLOG,
  MAX_TIPS,
  NEWSLETTER_APP_STORE_URL,
  NEWSLETTER_LOCALES,
  NEWSLETTER_PLAY_URL,
  UNSUBSCRIBE_PLACEHOLDER,
  approvalIssueTitle,
  broadcastFingerprint,
  broadcastPayload,
  daysBetween,
  firstMondayOfMonth,
  isPrepareDue,
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

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const content = (kind, locale) => JSON.parse(read(`../src/content/${kind}/${locale}.json`));

const article = (id, publishedAt, extra = {}) => ({
  id,
  slug: `${id}-slug`,
  title: `Title ${id}`,
  cardSummary: `Summary ${id}`,
  publishedAt,
  readingMinutes: 4,
  ...extra
});

const ui = {
  tips: {heading: 'Tips', readingTime: '{minutes} min', moreTips: 'More tips', iphoneCta: 'iPhone', androidCta: 'Android'},
  blog: {heading: 'Blog', readingTime: '{minutes} min'}
};

const release = {
  version: '1.0.5',
  releaseDate: '2026-11-12T16:18:10Z',
  notes: 'Intro line\n• First <b>change</b>\n• Second change'
};

test('every locale has frame copy, a topic and tips and blog copy', () => {
  assert.deepEqual([...NEWSLETTER_LOCALES].sort(), ['de', 'en', 'es', 'fr', 'it', 'nl']);
  for (const locale of NEWSLETTER_LOCALES) {
    const copy = ISSUE_COPY[locale];
    for (const key of ['name', 'intro', 'appHeading', 'version']) {
      assert.ok(copy?.[key]?.trim(), `${locale}.${key}`);
    }
    assert.match(NEWSLETTER_TOPIC_IDS[locale], /^[0-9a-f-]{36}$/);
    const tipsUi = content('tips', locale).ui;
    const blogUi = content('blog', locale).ui;
    for (const key of ['heading', 'readingTime', 'moreTips', 'iphoneCta', 'androidCta']) {
      assert.ok(tipsUi[key], `tips ui ${locale}.${key}`);
    }
    assert.match(tipsUi.readingTime, /\{minutes\}/);
    assert.match(blogUi.readingTime, /\{minutes\}/);
  }
  assert.equal(new Set(Object.values(NEWSLETTER_TOPIC_IDS)).size, 6);
});

test('the shared config keeps the IDs the signup routes use', () => {
  const ts = read('../src/lib/newsletter.ts');
  assert.match(ts, /from '@\/lib\/newsletter-config\.mjs'/);
  assert.doesNotMatch(ts, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
  assert.equal(NEWSLETTER_FROM, 'SkillQuest <hello@skill-quest.app>');
  assert.equal(NEWSLETTER_SEGMENT_ID, 'b403b647-34d2-494a-8567-2850399eab2b');
});

test('store links point to the same app as the website buttons', () => {
  const marketing = read('../src/lib/marketing.ts');
  const appId = marketing.match(/id(\d{6,})\?pt=/)[1];
  const pt = marketing.match(/pt=(\d+)/)[1];
  const pkg = marketing.match(/details\?id=([\w.]+)/)[1];
  assert.ok(NEWSLETTER_APP_STORE_URL.includes(`id${appId}?pt=${pt}&ct=newsletter`));
  assert.ok(NEWSLETTER_PLAY_URL.includes(`details?id=${pkg}&`));
});

test('an issue is prepared from the first Monday of the month', () => {
  assert.equal(firstMondayOfMonth(new Date('2026-12-15T00:00:00Z')), '2026-12-07');
  assert.equal(firstMondayOfMonth(new Date('2027-02-10T00:00:00Z')), '2027-02-01');
  assert.equal(isPrepareDue(new Date('2026-12-06T23:59:00Z')), false);
  assert.equal(isPrepareDue(new Date('2026-12-07T00:00:00Z')), true);
  assert.equal(isPrepareDue(new Date('2026-12-31T12:00:00Z')), true);
  assert.equal(issueIdFor(new Date('2026-12-31T23:59:59Z')), '2026-12');
  assert.equal(daysBetween(new Date('2026-12-07T06:17:00Z'), new Date('2026-12-14T06:16:00Z')), 7);
});

test('an approved issue goes out at 07:00 UTC, at least two hours later', () => {
  assert.equal(APPROVAL_LEAD_MS, 2 * 60 * 60 * 1000);
  assert.equal(nextSendTime(new Date('2026-12-08T04:59:00Z')).toISOString(), '2026-12-08T07:00:00.000Z');
  assert.equal(nextSendTime(new Date('2026-12-08T05:00:00Z')).toISOString(), '2026-12-08T07:00:00.000Z');
  assert.equal(nextSendTime(new Date('2026-12-08T05:01:00Z')).toISOString(), '2026-12-09T07:00:00.000Z');
  assert.equal(nextSendTime(new Date('2026-12-31T22:00:00Z')).toISOString(), '2027-01-01T07:00:00.000Z');
});

test('articles: published, not sent, not too old, newest first, capped', () => {
  const now = new Date('2026-12-07T12:00:00Z');
  const articles = [
    article('future', '2026-12-08'),
    article('today', '2026-12-07'),
    article('old', '2026-09-30'),
    article('sent', '2026-11-20'),
    article('a', '2026-11-01'),
    article('b', '2026-11-01'),
    article('typo', '2026-11-1')
  ];
  const picked = selectArticles(articles, {kind: 'tip', now, sent: new Set(['tip:sent']), max: 3});
  assert.deepEqual(picked.map((a) => a.id), ['today', 'a', 'b']);
  assert.ok(LOOKBACK_DAYS >= 31, 'a month must never fall between two issues');
  assert.ok(MAX_TIPS >= 1 && MAX_BLOG >= 1);
  const blog = selectArticles(articles, {kind: 'blog', now, sent: new Set(['tip:today']), max: 9});
  assert.ok(blog.some((a) => a.id === 'today'), 'a sent tip does not hide a blog article with the same id');
});

test('app news: recent, with notes, not sent before', () => {
  const now = new Date('2026-12-07T12:00:00Z');
  assert.equal(selectAppRelease(release, {now, sent: new Set()}), release);
  assert.equal(selectAppRelease(release, {now, sent: new Set(['app:1.0.5'])}), null);
  assert.equal(selectAppRelease({...release, notes: '  '}, {now, sent: new Set()}), null);
  assert.equal(selectAppRelease(release, {now: new Date('2027-03-01T00:00:00Z'), sent: new Set()}), null);
  assert.equal(selectAppRelease(release, {now: new Date('2026-11-01T00:00:00Z'), sent: new Set()}), null);
  assert.equal(selectAppRelease(null, {now, sent: new Set()}), null);
});

test('only scheduled and sent languages count as sent', () => {
  const manifests = [
    {issue: '2026-12', locales: {nl: {status: 'sent', items: ['tip:a']}, en: {status: 'expired', items: ['tip:a']}}},
    {issue: '2027-01', locales: {nl: {status: 'scheduled', items: ['blog:b']}, de: {status: 'skipped', items: ['tip:c']}}},
    {issue: '2027-02', locales: {nl: {status: 'cancelled', items: ['tip:d']}}}
  ];
  assert.deepEqual([...sentItemIds(manifests, 'nl')].sort(), ['blog:b', 'tip:a']);
  assert.deepEqual([...sentItemIds(manifests, 'en')], []);
  assert.deepEqual([...sentItemIds(manifests, 'de')], []);
});

test('the email has an unsubscribe link, escapes text and links per locale', () => {
  const tips = [article('t1', '2026-12-02', {title: 'Kids <script>alert(1)</script> & "quotes"'})];
  const blog = [article('b1', '2026-12-03')];
  const issue = renderIssue({locale: 'de', issueId: '2026-12', tips, blog, app: release, ui});

  assert.equal(issue.subject, tips[0].title);
  assert.ok(issue.html.includes(`href="${UNSUBSCRIBE_PLACEHOLDER}"`));
  assert.ok(issue.text.includes(UNSUBSCRIBE_PLACEHOLDER));
  assert.ok(!issue.html.includes('<script>'));
  assert.ok(issue.html.includes('Kids &lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;quotes&quot;'));
  assert.ok(!issue.html.includes('<b>change</b>'), 'release notes are escaped');
  assert.ok(issue.html.includes('<li style="margin: 0 0 6px 0;">First &lt;b&gt;change&lt;/b&gt;</li>'));
  assert.ok(issue.html.includes('https://www.skill-quest.app/de/tips/t1-slug?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=newsletter-2026-12'));
  assert.ok(issue.html.includes('https://www.skill-quest.app/de/blog/b1-slug?'));
  assert.ok(issue.html.includes('Dezember 2026'));
  assert.ok(issue.html.includes('Neu in der App: Version 1.0.5'));
  assert.ok(issue.html.startsWith('<!DOCTYPE html>'));
  assert.equal(issue.previewText, ISSUE_COPY.de.intro);
});

test('an issue with only app news has a subject from the app heading', () => {
  const issue = renderIssue({locale: 'nl', issueId: '2026-12', tips: [], blog: [], app: release, ui});
  assert.equal(issue.subject, 'Nieuw in de app: versie 1.0.5');
  assert.ok(!issue.html.includes('More tips'));
  const french = renderIssue({locale: 'fr', issueId: '2026-12', tips: [], blog: [], app: release, ui});
  assert.equal(french.subject, "Nouveautés dans l'application : version 1.0.5");
  assert.throws(() => renderIssue({locale: 'nl', issueId: '2026-12', tips: [], blog: [], app: null, ui}));
});

test('every locale renders from the real content without gaps', () => {
  const now = new Date('2026-12-07T12:00:00Z');
  for (const locale of NEWSLETTER_LOCALES) {
    const tipsData = content('tips', locale);
    const blogData = content('blog', locale);
    const tips = selectArticles(tipsData.articles, {kind: 'tip', now, sent: new Set(), max: MAX_TIPS});
    const blog = selectArticles(blogData.articles, {kind: 'blog', now, sent: new Set(), max: MAX_BLOG});
    const issue = renderIssue({
      locale,
      issueId: '2026-12',
      tips,
      blog,
      app: release,
      ui: {tips: tipsData.ui, blog: blogData.ui}
    });
    for (const part of [issue.subject, issue.html, issue.text]) {
      assert.doesNotMatch(part, /\b(undefined|null|NaN)\b|\{minutes\}/, locale);
    }
    assert.ok(issue.html.includes(`/${locale}/tips/`), locale);
    assert.deepEqual(
      issueItemIds({tips, blog, app: release}).slice(-1),
      ['app:1.0.5']
    );
  }
});

test('a broadcast goes to one language topic of the newsletter segment', () => {
  const rendered = {subject: 'S', previewText: 'P', html: `x ${UNSUBSCRIBE_PLACEHOLDER}`, text: `y ${UNSUBSCRIBE_PLACEHOLDER}`};
  const payload = broadcastPayload({locale: 'fr', issueId: '2026-12', rendered});
  assert.equal(payload.name, 'newsletter-2026-12-fr');
  assert.equal(payload.segment_id, NEWSLETTER_SEGMENT_ID);
  assert.equal(payload.topic_id, NEWSLETTER_TOPIC_IDS.fr);
  assert.equal(payload.from, NEWSLETTER_FROM);

  const stored = {...payload, status: 'draft', id: 'x'};
  const where = {issueId: '2026-12', locale: 'fr'};
  assert.equal(storedBroadcastProblem(stored, where), null);
  assert.equal(storedBroadcastProblem({...stored, topic_id: null}, where), 'no topic');
  assert.equal(storedBroadcastProblem({...stored, topic_id: undefined}, where), 'no topic');
  assert.equal(storedBroadcastProblem({...stored, topic_id: NEWSLETTER_TOPIC_IDS.nl}, where), 'topic');
  assert.equal(storedBroadcastProblem({...stored, segment_id: 'other'}, where), 'segment');
  assert.equal(storedBroadcastProblem({...stored, html: 'no link'}, where), 'no unsubscribe link in the HTML');
  assert.equal(storedBroadcastProblem({...stored, name: 'newsletter-2026-12-nl'}, where), 'name');
  assert.equal(storedBroadcastProblem(null, where), 'not found');
});

test('the fingerprint changes with anything that decides what is sent and to whom', () => {
  const base = {
    name: 'newsletter-2026-12-nl',
    segment_id: 's',
    topic_id: 't',
    from: 'f',
    subject: 'subject',
    reply_to: ['a', 'b'],
    preview_text: 'p',
    html: 'h',
    text: 'x',
    status: 'draft',
    created_at: '2026-12-07'
  };
  const fingerprint = broadcastFingerprint(base);
  assert.match(fingerprint, /^[0-9a-f]{64}$/);
  assert.equal(broadcastFingerprint({...base, status: 'sent', created_at: 'later', reply_to: ['b', 'a']}), fingerprint);
  for (const key of ['name', 'segment_id', 'topic_id', 'from', 'subject', 'preview_text', 'html', 'text']) {
    assert.notEqual(broadcastFingerprint({...base, [key]: `${base[key]}!`}), fingerprint, key);
  }
  assert.notEqual(broadcastFingerprint({...base, topic_id: null}), fingerprint);
  assert.notEqual(broadcastFingerprint({...base, reply_to: ['a']}), fingerprint);
});

test('a preview email never carries the real unsubscribe placeholder', () => {
  const stored = {subject: 'Hello', html: `<a href="${UNSUBSCRIBE_PLACEHOLDER}">x</a>`, text: `x ${UNSUBSCRIBE_PLACEHOLDER}`};
  const preview = previewEmail(stored, 'it');
  assert.equal(preview.subject, '[Proef it] Hello');
  assert.ok(!preview.html.includes(UNSUBSCRIBE_PLACEHOLDER));
  assert.ok(!preview.text.includes(UNSUBSCRIBE_PLACEHOLDER));
  assert.ok(preview.html.includes('https://www.skill-quest.app/it'));
});

const draftFor = (locale) => {
  const rendered = {subject: 'S', previewText: 'P', html: `x ${UNSUBSCRIBE_PLACEHOLDER}`, text: `y ${UNSUBSCRIBE_PLACEHOLDER}`};
  const stored = {...broadcastPayload({locale, issueId: '2026-12', rendered}), id: 'b1', status: 'draft'};
  return {stored, entry: {status: 'draft', broadcastId: 'b1', fingerprint: broadcastFingerprint(stored)}};
};

test('the send step schedules only an unchanged, ticked draft', () => {
  const {stored, entry} = draftFor('nl');
  const where = {issueId: '2026-12', locale: 'nl'};
  assert.deepEqual(sendDecision({entry, stored, ticked: true, ...where}), {action: 'schedule'});
  assert.deepEqual(sendDecision({entry, stored, ticked: false, ...where}), {action: 'drop'});
  assert.deepEqual(sendDecision({entry, stored: null, ticked: true, ...where}), {action: 'missing'});
  assert.deepEqual(sendDecision({entry: {...entry, status: 'scheduled'}, stored, ticked: true, ...where}), {action: 'none'});
  assert.deepEqual(sendDecision({entry: undefined, stored, ticked: true, ...where}), {action: 'none'});

  const edited = sendDecision({entry, stored: {...stored, subject: 'Edited in the dashboard'}, ticked: true, ...where});
  assert.equal(edited.action, 'refuse');
  assert.match(edited.reason, /gewijzigd/);
  assert.deepEqual(sendDecision({entry, stored: {...stored, topic_id: null}, ticked: true, ...where}), {action: 'refuse', reason: 'no topic'});
  assert.equal(sendDecision({entry, stored, ticked: true, issueId: '2026-12', locale: 'en'}).action, 'refuse');

  // A send whose answer got lost: Resend has it scheduled with the approved content.
  assert.deepEqual(sendDecision({entry, stored: {...stored, status: 'queued'}, ticked: true, ...where}), {action: 'adopt', status: 'scheduled'});
  assert.deepEqual(sendDecision({entry, stored: {...stored, status: 'sent'}, ticked: true, ...where}), {action: 'adopt', status: 'sent'});
  assert.equal(sendDecision({entry, stored: {...stored, status: 'queued', html: 'other'}, ticked: true, ...where}).action, 'refuse');
  assert.equal(sendDecision({entry, stored: {...stored, status: 'canceled'}, ticked: true, ...where}).action, 'refuse');
});

test('the daily step follows what Resend reports', () => {
  assert.equal(reconciledStatus('scheduled', {status: 'sent'}), 'sent');
  assert.equal(reconciledStatus('scheduled', {status: 'queued'}), null);
  assert.equal(reconciledStatus('scheduled', null), 'cancelled');
  assert.equal(reconciledStatus('scheduled', {status: 'draft'}), 'cancelled');
  assert.equal(reconciledStatus('scheduled', {status: 'canceled'}), 'cancelled');
  assert.equal(reconciledStatus('draft', {status: 'draft'}), null);
  assert.equal(reconciledStatus('draft', {status: 'queued'}), 'scheduled');
  assert.equal(reconciledStatus('draft', {status: 'scheduled'}), 'scheduled');
  assert.equal(reconciledStatus('draft', {status: 'sent'}), 'sent');
  assert.equal(reconciledStatus('draft', null), 'cancelled');
  assert.equal(reconciledStatus('draft', {status: 'something new'}), null);
  for (const status of ['sent', 'expired', 'skipped', 'cancelled', 'empty']) {
    assert.equal(reconciledStatus(status, null), null, status);
  }
});

test('the approval issue round-trips and only reads month and ticks', () => {
  const manifest = {
    issue: '2026-12',
    locales: {
      nl: {status: 'draft', broadcastId: 'id-nl', subject: 'Onderwerp\nmet regel', titles: ['Tip: A']},
      en: {status: 'draft', broadcastId: 'id-en', subject: 'Subject', titles: []},
      de: {status: 'empty'},
      fr: {status: 'expired', broadcastId: 'id-fr', subject: 'X'}
    }
  };
  const body = renderApprovalIssue(manifest);
  assert.equal(approvalIssueTitle('2026-12'), 'Nieuwsbrief 2026-12');
  assert.ok(body.includes('https://resend.com/broadcasts/id-nl'));
  assert.ok(body.includes('`de`'));
  assert.ok(!body.includes('id-fr'));
  assert.ok(body.includes(`${EXPIRE_DAYS} dagen`));

  const parsed = parseApprovalIssue(body);
  assert.equal(parsed.issueId, '2026-12');
  assert.equal(parsed.revision, 1);
  assert.deepEqual([...parsed.ticked].sort(), ['en', 'nl']);

  // A rebuilt issue has its own title and revision.
  assert.equal(approvalIssueTitle('2026-12', 2), 'Nieuwsbrief 2026-12 (versie 2)');
  assert.equal(parseApprovalIssue(renderApprovalIssue({...manifest, revision: 2})).revision, 2);

  // Ticks in HTML comments and code blocks are not visible, so they do not count.
  const hidden = body.replace('- [x] `en`', '- [ ] `en`');
  for (const extra of [
    '<!--\n- [x] `de` in a comment\n-->',
    '```\n- [x] `de` in a code block\n```',
    '~~~md\n- [x] `de` in a code block\n~~~',
    '```\n- [x] `de` in a code block that never ends'
  ]) {
    assert.deepEqual([...parseApprovalIssue(`${hidden}\n${extra}`).ticked], ['nl'], extra);
  }

  const unticked = body.replace('- [x] `en`', '- [ ] `en`').replace(/\n/g, '\r\n');
  assert.deepEqual([...parseApprovalIssue(unticked).ticked], ['nl']);

  // Nested or quoted lines and other text do not count as ticks.
  const noisy = `${body}\n  - [x] \`de\` nested\n> - [x] \`fr\` quoted\n- [x] \`xx\` unknown`;
  assert.deepEqual([...parseApprovalIssue(noisy).ticked].sort(), ['en', 'nl']);

  // A language listed twice is ambiguous: nothing is approved.
  assert.equal(parseApprovalIssue(`${body}\n- [ ] \`nl\` again`), null);
  assert.equal(parseApprovalIssue('- [x] `nl` no marker'), null);
  assert.equal(parseApprovalIssue(undefined), null);
});

test('the workflows only act on the owner, never interpolate issue text and pin actions', () => {
  const daily = read('../.github/workflows/newsletter-daily.yml');
  const send = read('../.github/workflows/newsletter-send.yml');
  for (const workflow of [daily, send]) {
    assert.doesNotMatch(workflow, /\$\{\{\s*github\.event\.issue\.(body|title)/);
    assert.doesNotMatch(workflow, /\$\{\{\s*github\.event\.comment/);
    for (const [, ref] of workflow.matchAll(/uses:\s*([^\s#]+)/g)) {
      assert.match(ref, /@[0-9a-f]{40}$/, `${ref} is pinned to a commit`);
    }
    assert.match(workflow, /persist-credentials: false/);
    assert.match(workflow, /group: newsletter-state/);
  }
  assert.match(send, /github\.event\.label\.name == 'approved'/);
  assert.match(send, /github\.event\.sender\.id == github\.repository_owner_id/);
  assert.match(send, /github\.event\.issue\.user\.login == 'github-actions\[bot\]'/);
  assert.match(send, /github\.actor_id == github\.repository_owner_id/);
  assert.match(send, /index\("approved"\) != null/, 'the label is checked again when the job starts');
  assert.match(daily, /dry_run:[\s\S]*?default: true/);
  assert.match(send, /execute:[\s\S]*?default: false/);
  assert.doesNotMatch(daily, /npm (ci|install)/, 'no packages are installed next to the Resend key');
  assert.doesNotMatch(send, /npm (ci|install)/);
});
