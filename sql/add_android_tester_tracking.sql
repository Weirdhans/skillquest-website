-- Run this once in the Supabase SQL editor for the project behind
-- NEXT_PUBLIC_SUPABASE_URL (the same project the /api/subscribe and
-- /api/verify routes write to).
--
-- It adds two timestamp columns to the existing `waitlist` table so the
-- Android alpha admin scripts (scripts/list-pending-android-testers.mjs and
-- scripts/notify-android-testers.mjs) can track, per row, whether someone
-- has already been added to the Play Console tester list and already been
-- emailed their install link. Without this, re-running the scripts would
-- re-notify people who were already handled.

alter table public.waitlist
  add column if not exists android_tester_added_at timestamptz,
  add column if not exists android_tester_notified_at timestamptz;
