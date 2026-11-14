import {NextRequest, NextResponse} from 'next/server';
import type {Resend} from 'resend';
import {renderWelcomeEmail} from '@/lib/email-templates.mjs';
import {readConfirmToken, signContactId} from '@/lib/newsletter-token.mjs';
import {
  NEWSLETTER_CONSENT_VERSION,
  NEWSLETTER_FROM,
  NEWSLETTER_LOCALES,
  NEWSLETTER_SEGMENT_ID,
  NEWSLETTER_TOPIC_IDS,
  findContact,
  getClientIp,
  getResendClient,
  getSiteUrl,
  getSupabaseAdmin,
  getTokenKey,
  getUnsubscribeKey,
  recordIpAttempt,
  toNewsletterLocale,
  type NewsletterContact,
  type NewsletterLocale
} from '@/lib/newsletter';

// Newsletter signup, step 2 of the double opt-in.
//
// The link in the confirmation email opens /[locale]/newsletter/confirm,
// which only POSTs here after the visitor presses the button. A mail
// scanner that follows the link therefore never subscribes anyone.
//
// Order matters: the contact is only marked subscribed (with its consent
// record) after it is in the segment and on its language topic. If a step
// fails, pressing the button again repeats the missing steps. A contact this
// request created is removed again when a later step fails, so a failed
// confirmation leaves nothing behind.
//
// The language is the one stored in the token: the page where the person
// signed up.

type ConfirmRequest = {token?: unknown};

export async function POST(request: NextRequest) {
  let body: ConfirmRequest;
  try {
    const raw: unknown = await request.json();
    if (!raw || typeof raw !== 'object') throw new Error('not an object');
    body = raw as ConfirmRequest;
  } catch {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  try {
    const parsed = readConfirmToken(body.token, getTokenKey());
    if (!parsed.ok) {
      return NextResponse.json(
        {error: parsed.reason},
        {status: parsed.reason === 'expired' ? 410 : 400}
      );
    }

    // Each confirm makes several Resend calls; one IP cannot repeat it
    // endlessly.
    if (!(await recordIpAttempt(getSupabaseAdmin(), getClientIp(request), 'cf'))) {
      return NextResponse.json({error: 'rate_limited'}, {status: 429});
    }

    const locale = toNewsletterLocale(parsed.locale);
    const email = parsed.email;
    const resend = getResendClient();
    const existing = await findContact(resend, email);

    const supersededAnswer = supersededBy(existing, parsed.issuedAt);
    if (supersededAnswer) return supersededAnswer;

    const {id: contactId, createdHere} = existing
      ? {id: existing.id, createdHere: false}
      : await createContact(resend, email, locale);

    try {
      await ensureInSegment(resend, contactId);
      await setLanguageTopic(resend, contactId, locale);

      // Look again right before subscribing: a newer link may have been
      // confirmed (and perhaps unsubscribed) while this request was busy.
      const latestAnswer = supersededBy(
        await findContact(resend, email),
        parsed.issuedAt
      );
      if (latestAnswer) return latestAnswer;

      const {error: updateError} = await resend.contacts.update({
        id: contactId,
        unsubscribed: false,
        properties: {
          locale,
          // Never earlier than the token itself, even if this server's clock
          // runs behind the one that issued it.
          consent_at: new Date(Math.max(Date.now(), parsed.issuedAt)).toISOString(),
          consent_version: NEWSLETTER_CONSENT_VERSION,
          consent_source: 'website'
        }
      });
      if (updateError) {
        throw new Error(`Resend contact update failed: ${updateError.name}`);
      }
    } catch (error) {
      if (createdHere) await removeIfUnconfirmed(resend, email);
      throw error;
    }

    const signature = signContactId(contactId, getUnsubscribeKey());
    await sendWelcome(resend, {
      email,
      locale,
      unsubscribeUrl: `${getSiteUrl(request)}/api/newsletter/unsubscribe?c=${contactId}&s=${signature}&l=${locale}`,
      // Two confirmations with the same link send one welcome email.
      idempotencyKey: `newsletter-welcome/${contactId}/${parsed.issuedAt}`
    });

    return NextResponse.json({status: 'subscribed'});
  } catch (error) {
    console.error(
      'Newsletter confirm failed:',
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({error: 'server_error'}, {status: 500});
  }
}

// A link issued before the latest confirmation was already used, or was
// replaced by a newer one. It must not undo a later unsubscribe.
function supersededBy(
  contact: NewsletterContact | null,
  issuedAt: number
): NextResponse | null {
  if (contact?.consentAt == null || contact.consentAt < issuedAt) return null;
  return contact.unsubscribed
    ? NextResponse.json({error: 'used'}, {status: 409})
    : NextResponse.json({status: 'already_subscribed'});
}

// Removes the contact this request created when a later step failed, but
// only while nobody has confirmed it: a parallel confirmation of the same
// address may have finished in the meantime.
async function removeIfUnconfirmed(resend: Resend, email: string) {
  try {
    const contact = await findContact(resend, email);
    if (!contact || contact.consentAt !== null || !contact.unsubscribed) return;
    const {error} = await resend.contacts.remove({id: contact.id});
    if (error) console.error('Newsletter cleanup failed:', error.name);
  } catch (error) {
    console.error(
      'Newsletter cleanup failed:',
      error instanceof Error ? error.message : error
    );
  }
}

async function createContact(
  resend: Resend,
  email: string,
  locale: NewsletterLocale
): Promise<{id: string; createdHere: boolean}> {
  // Created unsubscribed; the final update in POST subscribes it once the
  // segment and topic are in place.
  const {data, error} = await resend.contacts.create({
    email,
    unsubscribed: true,
    properties: {locale}
  });
  if (data) return {id: data.id, createdHere: true};

  // Two confirmations at the same moment: the other one created it.
  const raced = await findContact(resend, email);
  if (raced) return {id: raced.id, createdHere: false};
  throw new Error(`Resend contact create failed: ${error?.name ?? 'unknown'}`);
}

async function ensureInSegment(resend: Resend, contactId: string) {
  const {data, error} = await resend.contacts.segments.list({contactId});
  if (error) throw new Error(`Resend segment list failed: ${error.name}`);
  if (data.data.some((segment) => segment.id === NEWSLETTER_SEGMENT_ID)) return;

  const {error: addError} = await resend.contacts.segments.add({
    contactId,
    segmentId: NEWSLETTER_SEGMENT_ID
  });
  if (addError) throw new Error(`Resend segment add failed: ${addError.name}`);
}

// One newsletter language per subscriber: the language of the page they
// signed up on. A new signup in another language, once confirmed, switches it.
async function setLanguageTopic(
  resend: Resend,
  contactId: string,
  locale: NewsletterLocale
) {
  const {error} = await resend.contacts.topics.update({
    id: contactId,
    topics: NEWSLETTER_LOCALES.map((topicLocale) => ({
      id: NEWSLETTER_TOPIC_IDS[topicLocale],
      subscription: topicLocale === locale ? 'opt_in' : 'opt_out'
    }))
  });
  if (error) throw new Error(`Resend topic update failed: ${error.name}`);
}

async function sendWelcome(
  resend: Resend,
  {
    email,
    locale,
    unsubscribeUrl,
    idempotencyKey
  }: {
    email: string;
    locale: NewsletterLocale;
    unsubscribeUrl: string;
    idempotencyKey: string;
  }
) {
  const {subject, html} = renderWelcomeEmail({locale, unsubscribeUrl});
  const {error} = await resend.emails.send(
    {
      from: NEWSLETTER_FROM,
      to: email,
      subject,
      html,
      // One-click unsubscribe from the mail client (RFC 8058). The same URL
      // shows a confirmation page when opened in a browser.
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
      }
    },
    {idempotencyKey}
  );
  if (error) {
    // The subscription itself succeeded; a missing welcome is not worth an
    // error page.
    console.error('Newsletter welcome email failed:', error.name);
  }
}
