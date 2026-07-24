import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { renderWelcomeEmail, normalizeEmailLocale } from "@/lib/email-templates.mjs";

// Lazy initialize clients (only at runtime, not at build time)
const getSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("Supabase environment variables are not configured");
    throw new Error("Supabase configuration missing");
  }
  return createClient(url, key);
};

const getResendClient = () => {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.error("RESEND_API_KEY is not configured");
    throw new Error("Resend configuration missing");
  }
  return new Resend(key);
};

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  // Validate token parameter
  if (!token) {
    return NextResponse.redirect(
      new URL("/confirm?status=error&reason=missing", request.url)
    );
  }

  // Validate token format (UUID)
  if (!UUID_REGEX.test(token)) {
    return NextResponse.redirect(
      new URL("/confirm?status=error&reason=invalid", request.url)
    );
  }

  try {
    const supabase = getSupabaseClient();

    // Find the waitlist entry with this token
    const { data: record, error: findError } = await supabase
      .from("waitlist")
      .select("id, email, name, email_verified, confirmation_token_expires_at, platform_preference, locale")
      .eq("confirmation_token", token)
      .single();

    if (findError || !record) {
      // Token not found - might be already used or invalid
      return NextResponse.redirect(
        new URL("/confirm?status=error&reason=invalid", request.url)
      );
    }

    const locale = normalizeEmailLocale(record.locale);

    // Check if already verified
    if (record.email_verified) {
      return NextResponse.redirect(
        new URL(`/${locale}/confirm?status=error&reason=already_verified`, request.url)
      );
    }

    // Check if token has expired (24 hours)
    if (record.confirmation_token_expires_at) {
      const expiresAt = new Date(record.confirmation_token_expires_at);
      if (expiresAt < new Date()) {
        return NextResponse.redirect(
          new URL(`/${locale}/confirm?status=error&reason=expired&email=${encodeURIComponent(record.email)}`, request.url)
        );
      }
    }

    // Verify the email - update the record
    const { error: updateError } = await supabase
      .from("waitlist")
      .update({
        email_verified: true,
        status: "verified",
        confirmation_token: null,
        confirmation_token_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", record.id);

    if (updateError) {
      console.error("Failed to verify email:", updateError);
      return NextResponse.redirect(
        new URL(`/${locale}/confirm?status=error&reason=server_error`, request.url)
      );
    }

    // Send welcome email after successful verification
    try {
      const resend = getResendClient();
      const { subject, html } = renderWelcomeEmail({
        locale,
        name: record.name,
        platform: record.platform_preference,
      });

      await resend.emails.send({
        from: "SkillQuest <hello@skill-quest.app>",
        to: record.email,
        subject,
        html,
      });
    } catch (emailError) {
      // Log but don't fail - verification succeeded
      console.error("Failed to send welcome email:", emailError);
    }

    // Redirect to success page
    return NextResponse.redirect(
      new URL(`/${locale}/confirm?status=success`, request.url)
    );
  } catch (error) {
    console.error("Verify API error:", error);
    return NextResponse.redirect(
      new URL("/confirm?status=error&reason=server_error", request.url)
    );
  }
}

