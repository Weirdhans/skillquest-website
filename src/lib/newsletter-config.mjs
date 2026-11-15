// Resend IDs and sender of the newsletter. Plain .mjs so both the Next.js
// routes (through src/lib/newsletter.ts) and the monthly script
// (scripts/newsletter.mjs, run by GitHub Actions without a build) use the
// same values.
//
// Created in Resend on 2026-11-15: segment "Newsletter", topics
// "Newsletter <locale>" (private, default opt-out) and the string contact
// properties locale, consent_at, consent_version and consent_source. The IDs
// are not secret; they only work with a full-access Resend API key.

export const NEWSLETTER_SEGMENT_ID = 'b403b647-34d2-494a-8567-2850399eab2b';

export const NEWSLETTER_TOPIC_IDS = {
  nl: '0a884219-d9bc-4527-9599-bbf549a04765',
  en: 'ffb05cce-25f0-493d-bf51-079fc5585a80',
  de: 'aab5d67a-fd9e-4d46-9012-ce73fa338554',
  fr: '020f0dfe-fc0b-434b-bfea-8980d253a2ca',
  es: 'dda7591b-b766-4f4d-ac6d-6a0c536fb136',
  it: '82a6974b-3cc8-4a8b-a399-e92b5ebe3bc4'
};

export const NEWSLETTER_FROM = 'SkillQuest <hello@skill-quest.app>';
export const NEWSLETTER_REPLY_TO = 'hello@skill-quest.app';
