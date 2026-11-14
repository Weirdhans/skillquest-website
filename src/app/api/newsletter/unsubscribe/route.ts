import {NextRequest, NextResponse} from 'next/server';
import {isUuid} from '@/lib/newsletter-token.mjs';
import {getResendClient, toNewsletterLocale} from '@/lib/newsletter';

// Unsubscribe link for emails the site sends itself (the welcome email).
// Broadcasts use Resend's own {{{RESEND_UNSUBSCRIBE_URL}}}; both end in the
// same place: the Resend contact is marked unsubscribed.
//
// The link carries the Resend contact ID (a random UUID that only appears in
// emails to that contact), not the address.
//
// GET  (someone opens the link): show the confirmation page with a button,
//      so a mail scanner that follows links does not unsubscribe anyone.
// POST (that button, or a mail client's one-click unsubscribe per RFC 8058):
//      unsubscribe right away.

export async function GET(request: NextRequest) {
  const contactId = request.nextUrl.searchParams.get('c');
  const locale = toNewsletterLocale(request.nextUrl.searchParams.get('l'));
  const target = new URL(`/${locale}/newsletter/unsubscribe`, request.url);
  if (isUuid(contactId)) target.searchParams.set('c', contactId as string);
  return NextResponse.redirect(target, 303);
}

export async function POST(request: NextRequest) {
  let contactId = request.nextUrl.searchParams.get('c');

  const contentType = request.headers.get('content-type') ?? '';
  if (!contactId && contentType.includes('application/json')) {
    try {
      const body = (await request.json()) as {c?: unknown};
      contactId = typeof body.c === 'string' ? body.c : null;
    } catch {
      contactId = null;
    }
  }

  if (!isUuid(contactId)) {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  try {
    const resend = getResendClient();
    const {error} = await resend.contacts.update({
      id: contactId as string,
      unsubscribed: true
    });
    // An unknown contact is already "not subscribed"; answer the same so the
    // endpoint does not reveal which IDs exist.
    if (error && error.name !== 'not_found' && error.statusCode !== 404) {
      throw new Error(`Resend unsubscribe failed: ${error.name}`);
    }
    return NextResponse.json({status: 'unsubscribed'});
  } catch (error) {
    console.error(
      'Newsletter unsubscribe failed:',
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({error: 'server_error'}, {status: 500});
  }
}
