import {NextRequest, NextResponse} from 'next/server';
import {isUuid, verifyContactSignature} from '@/lib/newsletter-token.mjs';
import {
  getResendClient,
  getSiteUrl,
  getUnsubscribeKey,
  toNewsletterLocale
} from '@/lib/newsletter';

// Unsubscribe link for emails the site sends itself (the welcome email).
// Broadcasts use Resend's own {{{RESEND_UNSUBSCRIBE_URL}}}; both end in the
// same place: the Resend contact is marked unsubscribed.
//
// The link carries the Resend contact ID (c) and an HMAC over it (s), not the
// address. Without a valid signature nothing is sent to Resend, so made-up
// IDs cannot be used to flood the Resend API.
//
// GET  (someone opens the link): show the confirmation page with a button,
//      so a mail scanner that follows links does not unsubscribe anyone.
// POST (that button, or a mail client's one-click unsubscribe per RFC 8058):
//      unsubscribe right away.

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const contactId = params.get('c');
  const signature = params.get('s');
  const locale = toNewsletterLocale(params.get('l'));
  const target = new URL(`/${locale}/newsletter/unsubscribe`, getSiteUrl(request));
  if (isUuid(contactId) && signature) {
    target.searchParams.set('c', contactId as string);
    target.searchParams.set('s', signature);
  }
  return NextResponse.redirect(target, 303);
}

export async function POST(request: NextRequest) {
  let contactId = request.nextUrl.searchParams.get('c');
  let signature = request.nextUrl.searchParams.get('s');

  const contentType = request.headers.get('content-type') ?? '';
  if (!contactId && contentType.includes('application/json')) {
    try {
      const body = (await request.json()) as {c?: unknown; s?: unknown} | null;
      contactId = typeof body?.c === 'string' ? body.c : null;
      signature = typeof body?.s === 'string' ? body.s : null;
    } catch {
      contactId = null;
    }
  }

  try {
    if (!verifyContactSignature(contactId, signature, getUnsubscribeKey())) {
      return NextResponse.json({error: 'invalid'}, {status: 400});
    }

    const resend = getResendClient();
    const {error} = await resend.contacts.update({
      id: contactId as string,
      unsubscribed: true
    });
    // A contact that no longer exists is already "not subscribed".
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
