import {NextRequest, NextResponse} from 'next/server';
import {renderVerificationEmail} from '@/lib/email-templates.mjs';
import {createConfirmToken, normalizeEmail} from '@/lib/newsletter-token.mjs';
import {
  NEWSLETTER_FROM,
  cleanupCounters,
  findContact,
  getClientIp,
  getResendClient,
  getSiteUrl,
  getSupabaseAdmin,
  getTokenKey,
  recordIpAttempt,
  releaseConfirmationEmail,
  reserveConfirmationEmail,
  toNewsletterLocale
} from '@/lib/newsletter';

// Newsletter signup, step 1 of the double opt-in: send a confirmation link.
//
// Nothing is stored about the address here. The answer is the same whether
// the address is new, already subscribed or recently signed up, so the form
// cannot be used to find out who is on the list. Only the requester's own
// IP limit and an exhausted daily budget produce a different answer.

type SubscribeRequest = {
  email?: unknown;
  locale?: unknown;
  // Honeypot: real visitors never see this field (see LeadCapture.tsx).
  company?: unknown;
};

const OK = {success: true};

export async function POST(request: NextRequest) {
  let body: SubscribeRequest;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== 'object') throw new Error('not an object');
    body = parsed as SubscribeRequest;
  } catch {
    return NextResponse.json({error: 'invalid_request'}, {status: 400});
  }

  // A bot that fills every field gets the normal answer and nothing happens.
  if (typeof body.company === 'string' && body.company.length > 0) {
    return NextResponse.json(OK);
  }

  try {
    const supabase = getSupabaseAdmin();
    await cleanupCounters(supabase);

    if (!(await recordIpAttempt(supabase, getClientIp(request)))) {
      return NextResponse.json({error: 'rate_limited'}, {status: 429});
    }

    const email = normalizeEmail(body.email);
    if (!email) {
      return NextResponse.json({error: 'invalid_email'}, {status: 400});
    }
    const locale = toNewsletterLocale(body.locale);

    // The per-address limits and the daily budget are checked before anyone
    // looks at the list, so every address gets the same answer.
    const {decision, counterId} = await reserveConfirmationEmail(supabase, email);
    if (decision === 'over_budget') {
      return NextResponse.json({error: 'busy'}, {status: 429});
    }
    if (decision === 'skip_address' || !counterId) {
      return NextResponse.json(OK);
    }

    const resend = getResendClient();
    const contact = await findContact(resend, email);
    if (contact && !contact.unsubscribed && contact.consentAt !== null) {
      // Already subscribed: no email, same answer.
      await releaseConfirmationEmail(supabase, counterId);
      return NextResponse.json(OK);
    }

    const token = createConfirmToken({email, locale}, getTokenKey());
    const confirmUrl = `${getSiteUrl(request)}/${locale}/newsletter/confirm?token=${token}`;
    const {subject, html} = renderVerificationEmail({locale, confirmUrl});

    const {error: sendError} = await resend.emails.send({
      from: NEWSLETTER_FROM,
      to: email,
      subject,
      html
    });
    if (sendError) {
      console.error('Newsletter confirmation email failed:', sendError.name);
      return NextResponse.json({error: 'send_failed'}, {status: 502});
    }

    return NextResponse.json(OK);
  } catch (error) {
    console.error(
      'Newsletter subscribe failed:',
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({error: 'server_error'}, {status: 500});
  }
}
