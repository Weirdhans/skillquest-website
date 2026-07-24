// Lists verified waitlist signups who chose Android (or both) and have not
// yet been added to the Play Console tester list. Read-only — safe to run
// any time.
//
// The waitlist table lives in the skillquest-prod Supabase project (the same
// one the app uses). The android_tester_added_at/notified_at tracking
// columns were added there via
// supabase/migrations/20260723120000_add_android_tester_tracking_to_waitlist.sql
// in the skillquest app repo.
//
// Requires (same values Vercel already has configured for this project):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// Usage (Node 20.6+, needed for --env-file):
//   node --env-file=.env.local scripts/list-pending-android-testers.mjs
//
// Copy the printed emails into the Play Console tester email list for the
// closed testing track, then run scripts/notify-android-testers.mjs to mark
// them as added and send the "you can install now" email.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment."
  );
  process.exit(1);
}

const supabase = createClient(url, key);

const { data, error } = await supabase
  .from("waitlist")
  .select("email, name, locale, created_at")
  .eq("email_verified", true)
  .in("platform_preference", ["android", "both"])
  .is("android_tester_added_at", null)
  .order("created_at", { ascending: true });

if (error) {
  console.error("Query failed:", error.message);
  console.error(
    "If this mentions a missing column, run the tracking-column migrations first (see supabase/migrations/ in the skillquest app repo)."
  );
  process.exit(1);
}

if (!data || data.length === 0) {
  console.log("No pending Android testers to add.");
  process.exit(0);
}

console.log(`${data.length} pending Android tester(s):\n`);
for (const row of data) {
  console.log(row.email);
}
console.log(
  "\nPaste these into the Play Console tester email list, then run:\n" +
    "  node --env-file=.env.local scripts/notify-android-testers.mjs --confirm"
);
