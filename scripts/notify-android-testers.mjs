// Sends the "you can install SkillQuest now" email to everyone you just
// added to the Play Console tester list, then marks them as handled so they
// won't be picked up again.
//
// Run scripts/list-pending-android-testers.mjs first, paste those emails
// into the Play Console tester list, THEN run this script.
//
// Requires (run once first: sql/add_android_tester_tracking.sql):
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
  .select("id, email, name")
  .eq("email_verified", true)
  .in("platform_preference", ["android", "both"])
  .is("android_tester_added_at", null)
  .order("created_at", { ascending: true });

if (error) {
  console.error("Query failed:", error.message);
  console.error(
    "If this mentions a missing column, run sql/add_android_tester_tracking.sql first."
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
  for (const row of data) console.log(row.email);
  console.log("\nRe-run with --confirm to actually send and mark them.");
  process.exit(0);
}

let sent = 0;
let failed = 0;

for (const row of data) {
  try {
    await resend.emails.send({
      from: "SkillQuest <hello@skill-quest.app>",
      to: row.email,
      subject: "Je kunt SkillQuest nu installeren op Android!",
      html: installEmailTemplate(row.name),
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

function installEmailTemplate(name) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Je kunt SkillQuest nu installeren</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F8FAFC; color: #1E293B;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%); border-radius: 16px; border: 1px solid rgba(99, 102, 241, 0.2); padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <div style="font-size: 64px; line-height: 1;">🎉</div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #1E293B;">
                Je bent toegevoegd als Android tester!
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 32px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 16px 0;">Hey${name ? ` ${name}` : ""}!</p>
              <p style="margin: 0 0 16px 0;">
                Je e-mailadres staat nu op de Google Play tester-lijst voor SkillQuest. Open onderstaande link
                <strong>met hetzelfde Google-account op je Android-toestel</strong> om deel te nemen aan de test
                en de app te installeren.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 0 32px 0;">
              <a href="${ANDROID_ALPHA_JOIN_URL}" style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%); color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);">
                Word tester en installeer
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 24px; font-size: 14px; color: #94A3B8; text-align: center;">
              <p style="margin: 0;">
                Werkt de link niet meteen? Het kan tot een uur duren voordat Google Play je toevoeging verwerkt.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px solid rgba(99, 102, 241, 0.2);">
              <p style="margin: 0; font-size: 12px; color: #94A3B8; line-height: 1.6;">
                SkillQuest | <a href="https://www.skill-quest.app" style="color: #6366F1; text-decoration: none;">www.skill-quest.app</a><br>
                Vragen? Stuur een e-mail naar <a href="mailto:hello@skill-quest.app" style="color: #6366F1; text-decoration: none;">hello@skill-quest.app</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
