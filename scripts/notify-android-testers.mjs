// Sends the "you can install SkillQuest now" email to everyone you just
// added to the Play Console tester list, then marks them as handled so they
// won't be picked up again.
//
// Run scripts/list-pending-android-testers.mjs first, paste those emails
// into the Play Console tester list, THEN run this script.
//
// The waitlist table lives in the skillquest-prod Supabase project (the same
// one the app uses); see list-pending-android-testers.mjs for details on the
// tracking columns. The email is sent in each signup's own locale (see
// src/lib/email-templates.mjs).
//
// Requires (same values Vercel already has configured for this project):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   RESEND_API_KEY
//
// Usage (Node 20.6+, needed for --env-file):
//   node --env-file=.env.local scripts/notify-android-testers.mjs
//     -> dry run, only prints who WOULD be emailed
//   node --env-file=.env.local scripts/notify-android-testers.mjs --confirm
//     -> actually sends the emails and marks rows as added + notified

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { renderInstallEmail } from "../src/lib/email-templates.mjs";

// Keep in sync with ANDROID_ALPHA_JOIN_URL in src/lib/marketing.ts
const ANDROID_ALPHA_JOIN_URL =
  "https://play.google.com/apps/testing/com.skillquest.app";

const confirm = process.argv.includes("--confirm");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendKey = process.env.RESEND_API_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment."
  );
  process.exit(1);
}
if (confirm && !resendKey) {
  console.error("Missing RESEND_API_KEY in the environment.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const resend = confirm ? new Resend(resendKey) : null;

const { data, error } = await supabase
  .from("waitlist")
  .select("id, email, name, locale")
  .eq("email_verified", true)
  .in("platform_preference", ["android", "both"])
  .is("android_tester_added_at", null)
  .order("created_at", { ascending: true });

if (error) {
  console.error("Query failed:", error.message);
  console.error(
    "If this mentions a missing column, run the tracking-column migration first (see sql/ history in git log)."
  );
  process.exit(1);
}

if (!data || data.length === 0) {
  console.log("Nobody is pending. Nothing to do.");
  process.exit(0);
}

if (!confirm) {
  console.log(
    `Dry run: ${data.length} tester(s) would be emailed and marked as added:\n`
  );
  for (const row of data) console.log(`${row.email} (${row.locale ?? "nl"})`);
  console.log("\nRe-run with --confirm to actually send and mark them.");
  process.exit(0);
}

let sent = 0;
let failed = 0;

for (const row of data) {
  try {
    const { subject, html } = renderInstallEmail({
      locale: row.locale,
      name: row.name,
      androidJoinUrl: ANDROID_ALPHA_JOIN_URL,
    });

    await resend.emails.send({
      from: "SkillQuest <hello@skill-quest.app>",
      to: row.email,
      subject,
      html,
    });

    const now = new Date().toISOString();
    const { error: updateError } = await supabase
      .from("waitlist")
      .update({
        android_tester_added_at: now,
        android_tester_notified_at: now,
        updated_at: now,
      })
      .eq("id", row.id);

    if (updateError) throw updateError;

    sent += 1;
    console.log(`Sent + marked: ${row.email}`);
  } catch (err) {
    failed += 1;
    console.error(`Failed for ${row.email}:`, err.message ?? err);
  }
}

console.log(`\nDone. Sent: ${sent}, failed: ${failed}.`);
