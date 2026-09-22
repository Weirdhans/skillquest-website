import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { createHash } from "crypto";
import { routing } from "@/i18n/routing";

// Anonymous tester feedback from /[locale]/feedback. No name, email or
// account is collected. The IP address is only used for rate limiting and is
// stored as a salted hash, never in plain text.

const getSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("Supabase environment variables are not configured");
    throw new Error("Supabase configuration missing");
  }
  return createClient(url, key);
};

type Platform = "ios" | "android" | "both";

interface FeedbackRequest {
  clear?: unknown;
  confusing?: unknown;
  firstFix?: unknown;
  platform?: unknown;
  quoteConsent?: unknown;
  locale?: unknown;
  // Honeypot: must stay empty. Real users never see this field.
  company?: unknown;
}

const FEEDBACK_INBOX = "hello@skill-quest.app";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Tell the owner about new feedback. A failed email never fails the request:
// the answer is already stored and can be read in the admin dashboard.
async function notifyOwner(feedback: {
  clear: string;
  confusing: string;
  firstFix: string;
  platform: Platform;
  locale: string;
  quoteConsent: boolean;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY is not configured; feedback email skipped");
    return;
  }

  const rows: Array<[string, string]> = [
    ["Wat was meteen duidelijk?", feedback.clear],
    ["Wat was verwarrend?", feedback.confusing],
    ["Wat moet als eerste beter?", feedback.firstFix],
  ];
  const html = [
    `<p><strong>Taal:</strong> ${feedback.locale.toUpperCase()} &middot; <strong>Toestel:</strong> ${feedback.platform} &middot; <strong>Citeren mag:</strong> ${feedback.quoteConsent ? "ja" : "nee"}</p>`,
    ...rows.map(
      ([question, answer]) =>
        `<h3 style="margin:16px 0 4px">${question}</h3><p style="margin:0;white-space:pre-wrap">${escapeHtml(answer)}</p>`
    ),
    `<p style="margin-top:24px;color:#666">Anonieme testfeedback van skill-quest.app/feedback. Alle antwoorden staan ook in het admin-dashboard van de app.</p>`,
  ].join("");

  try {
    await new Resend(key).emails.send({
      from: "SkillQuest <hello@skill-quest.app>",
      to: FEEDBACK_INBOX,
      subject: `Nieuwe testfeedback (${feedback.locale.toUpperCase()}, ${feedback.platform})`,
      html,
    });
  } catch (error) {
    console.error("Feedback email failed", error);
  }
}

const MAX_ANSWER_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_ATTEMPTS = 5;

function cleanAnswer(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned ? cleaned.slice(0, MAX_ANSWER_LENGTH) : null;
}

function isPlatform(value: unknown): value is Platform {
  return value === "ios" || value === "android" || value === "both";
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// The daily salt keeps hashes from being linkable across days while still
// counting repeat attempts within the one-hour window.
function hashIp(ip: string): string {
  const day = new Date().toISOString().slice(0, 10);
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return createHash("sha256").update(`${day}:${secret}:${ip}`).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();

    if (body.company) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const clear = cleanAnswer(body.clear);
    const confusing = cleanAnswer(body.confusing);
    const firstFix = cleanAnswer(body.firstFix);

    if (!clear || !confusing || !firstFix || !isPlatform(body.platform)) {
      return NextResponse.json({ error: "missing_answers" }, { status: 400 });
    }

    const locale =
      typeof body.locale === "string" &&
      (routing.locales as readonly string[]).includes(body.locale)
        ? body.locale
        : routing.defaultLocale;

    const supabase = getSupabaseClient();
    const ipHash = hashIp(getClientIp(request));
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

    const { count, error: countError } = await supabase
      .from("feedback_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", windowStart);

    if (countError) {
      console.error("Feedback rate limit check failed", countError);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }

    if ((count ?? 0) >= RATE_LIMIT_MAX_ATTEMPTS) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    await supabase.from("feedback_attempts").insert([{ ip_hash: ipHash }]);

    const { error: insertError } = await supabase.from("tester_feedback").insert([
      {
        clear_answer: clear,
        confusing_answer: confusing,
        first_fix_answer: firstFix,
        platform: body.platform,
        quote_consent: body.quoteConsent === true,
        locale
      }
    ]);

    if (insertError) {
      console.error("Feedback insert failed", insertError);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }

    await notifyOwner({
      clear,
      confusing,
      firstFix,
      platform: body.platform,
      locale,
      quoteConsent: body.quoteConsent === true,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Feedback request failed", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
