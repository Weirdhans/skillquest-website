import {NextRequest, NextResponse} from 'next/server';
import type {Resend} from 'resend';
import {renderWelcomeEmail} from '@/lib/email-templates.mjs';
import {readConfirmTokenWithKeys, signContactId} from '@/lib/newsletter-token.mjs';
import {
  NEWSLETTER_CONSENT_VERSION,
  NEWSLETTER_FROM,
  NEWSLETTER_LOCALES,
  NEWSLETTER_SEGMENT_ID,
  NEWSLETTER_TOPIC_IDS,
  findContact,
  getAcceptedTokenKeys,
  getClientIp,
  getResendClient,
  getSiteUrl,
  getSupabaseAdmin,
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
// A new address is created in one Resend call that already holds
// everything: subscribed, in the segment, on its language topic and with
// the consent record. Nothing half-made is left behind if a call fails, so
// there is nothing to clean up. An existing contact (unsubscribed earlier,
// or created by a parallel confirmation) is updated in steps; the check for
// a newer confirmation runs right before the first write that matters.
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
    const parsed = readConfirmTokenWithKeys(body.token, getAcceptedTokenKeys());
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
    // Built at the moment of each write rather than up front, which keeps a
    // slow parallel request from storing an older consent time over a newer
    // one in all but a tiny window: Resend has no conditional writes, so two
    // different links confirmed within the same fraction of a second can
    // still race.
    const consent = () => ({
      locale,
      // Never earlier than the token itself, even if this server's clock
      // runs behind the one that issued it.
      consent_at: new Date(Math.max(Date.now(), parsed.issuedAt)).toISOString(),
      consent_version: NEWSLETTER_CONSENT_VERSION,
      consent_source: 'website'
    });

    let contactId: string | null = null;
    const existing = await findContact(resend, email);
    if (!existing) {
      contactId = await createSubscribedContact(resend, email, locale, consent());
    }

    if (!contactId) {
      // Unsubscribed earlier, or a parallel confirmation created it first.
      const contact = existing ?? (await findContact(resend, email));
      if (!contact) throw new Error('Resend contact create failed and none exists');

      const supersededAnswer = supersededBy(contact, parsed.issuedAt);
      if (supersededAnswer) return supersededAnswer;
      await ensureInSegment(resend, contact.id);

      // Look again right before writing the language and consent: a newer
      // link may have been confirmed (and perhaps unsubscribed) meanwhile.
      const latestAnswer = supersededBy(
        await findContact(resend, email),
        parsed.issuedAt
      );
      if (latestAnswer) return latestAnswer;

      await setLanguageTopic(resend, contact.id, locale);
      const {error: updateError} = await resend.contacts.update({
        id: contact.id,
        unsubscribed: false,
        properties: consent()
      });
      if (updateError) {
        throw new Error(`Resend contact update failed: ${updateError.name}`);
      }
      contactId = contact.id;
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

function languageTopics(locale: NewsletterLocale) {
  // One newsletter language per subscriber: the language of the page they
  // signed up on.
  return NEWSLETTER_LOCALES.map((topicLocale) => ({
    id: NEWSLETTER_TOPIC_IDS[topicLocale],
    subscription: (topicLocale === locale ? 'opt_in' : 'opt_out') as
      | 'opt_in'
      | 'opt_out'
  }));
}

/**
 * Creates a new contact that is complete in one call. The Resend API accepts
 * segments and topics on create; SDK 6.5.2 does not pass them on, so the
 * request goes through resend.post. Returns null when the contact could not
 * be created, for example because a parallel confirmation created it first.
 */
async function createSubscribedContact(
  resend: Resend,
  email: string,
  locale: NewsletterLocale,
  consent: Record<string, string>
): Promise<string | null> {
  const {data, error} = await resend.post<{id: string}>('/contacts', {
    email,
    unsubscribed: false,
    properties: consent,
    segments: [{id: NEWSLETTER_SEGMENT_ID}],
    topics: languageTopics(locale)
  });
  if (data?.id) return data.id;
  console.error('Newsletter contact create failed:', error?.name ?? 'unknown');
  return null;
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

async function setLanguageTopic(
  resend: Resend,
  contactId: string,
  locale: NewsletterLocale
) {
  const {error} = await resend.contacts.topics.update({
    id: contactId,
    topics: languageTopics(locale)
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
