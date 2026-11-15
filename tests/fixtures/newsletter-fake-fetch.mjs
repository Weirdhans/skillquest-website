// A stand-in for the network of scripts/newsletter.mjs, loaded with
// `node --import` by tests/newsletter-flow.test.mjs. Resend keeps its
// broadcasts and emails in the JSON file FAKE_RESEND_STATE, so several runs of
// the script see the same "account". FAKE_RESEND_FAIL=emails makes every
// email fail. The App Store lookup and the website always answer.

import {existsSync, readFileSync, writeFileSync} from 'node:fs';

const file = process.env.FAKE_RESEND_STATE;

function load() {
  return existsSync(file)
    ? JSON.parse(readFileSync(file, 'utf8'))
    : {broadcasts: {}, emails: [], calls: [], next: 1};
}

function json(status, body) {
  return new Response(body === undefined ? '' : JSON.stringify(body), {
    status,
    headers: {'content-type': 'application/json'}
  });
}

globalThis.fetch = async (input, init = {}) => {
  const url = new URL(String(input));
  const method = (init.method ?? 'GET').toUpperCase();
  if (url.hostname === 'itunes.apple.com') {
    return json(200, {
      results: [
        {version: '1.0.5', currentVersionReleaseDate: '2026-11-12T16:18:10Z', releaseNotes: 'Notes\n• one change'}
      ]
    });
  }
  if (url.hostname === 'www.skill-quest.app') return new Response('', {status: 200});
  if (url.hostname !== 'api.resend.com') throw new Error(`unexpected host ${url.hostname}`);

  const state = load();
  const body = init.body ? JSON.parse(init.body) : undefined;
  state.calls.push(`${method} ${url.pathname}`);
  const one = url.pathname.match(/^\/broadcasts\/([^/]+)(\/send)?$/);
  let response;

  if (url.pathname === '/broadcasts' && method === 'POST') {
    const id = `b${state.next++}`;
    state.broadcasts[id] = {
      ...body,
      id,
      status: 'draft',
      created_at: new Date().toISOString(),
      scheduled_at: null,
      sent_at: null
    };
    response = json(201, {id});
  } else if (url.pathname === '/broadcasts' && method === 'GET') {
    const data = Object.values(state.broadcasts).map(({id, name, status, segment_id, created_at, scheduled_at, sent_at}) => ({
      id, name, status, segment_id, created_at, scheduled_at, sent_at
    }));
    response = json(200, {object: 'list', has_more: false, data});
  } else if (one && !one[2] && method === 'GET') {
    const broadcast = state.broadcasts[one[1]];
    response = broadcast ? json(200, {object: 'broadcast', ...broadcast}) : json(404, {name: 'not_found'});
  } else if (one && !one[2] && method === 'DELETE') {
    if (state.broadcasts[one[1]]) {
      delete state.broadcasts[one[1]];
      response = json(200, {id: one[1], deleted: true});
    } else {
      response = json(404, {name: 'not_found'});
    }
  } else if (one && one[2] && method === 'POST') {
    const broadcast = state.broadcasts[one[1]];
    broadcast.status = 'queued';
    broadcast.scheduled_at = body?.scheduled_at ?? null;
    response = json(200, {id: one[1]});
  } else if (url.pathname === '/emails' && method === 'POST') {
    if (process.env.FAKE_RESEND_FAIL === 'emails') {
      response = json(500, {name: 'application_error', message: `could not send to ${body.to[0]}`});
    } else {
      state.emails.push({to: body.to, subject: body.subject, idempotencyKey: init.headers?.['Idempotency-Key']});
      response = json(200, {id: `e${state.emails.length}`});
    }
  } else {
    response = json(404, {name: 'not_found'});
  }

  writeFileSync(file, JSON.stringify(state));
  return response;
};
