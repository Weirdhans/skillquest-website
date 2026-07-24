import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { randomUUID } from "crypto";
import { renderVerificationEmail, normalizeEmailLocale } from "@/lib/email-templates.mjs";

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

interface ResendVerificationRequest {
  email: string;
}

// Rate limit: 2 minutes between resend requests
const RATE_LIMIT_MS = 2 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const body: ResendVerificationRequest = await request.json();

    // Validate email
    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const email = body.email.toLowerCase();

    // Find the waitlist entry
    const { data: record, error: findError } = await supabase
      .from("waitlist")
      .select("id, email, name, email_verified, last_email_sent_at, platform_preference, locale")
      .eq("email", email)
      .single();

    if (findError || !record) {
      return NextResponse.json(
        { error: "Dit e-mailadres staat niet op de update-lijst" },
        { status: 404 }
      );
    }

    // Check if already verified
    if (record.email_verified) {
      return NextResponse.json(
        { error: "Dit e-mailadres is al geverifieerd" },
        { status: 400 }
      );
    }

    // Rate limiting check
    if (record.last_email_sent_at) {
      const lastSent = new Date(record.last_email_sent_at);
      const timeSinceLastEmail = Date.now() - lastSent.getTime();

      if (timeSinceLastEmail < RATE_LIMIT_MS) {
        const waitSeconds = Math.ceil((RATE_LIMIT_MS - timeSinceLastEmail) / 1000);
        return NextResponse.json(
          {
            error: `Wacht nog ${waitSeconds} seconden voordat je een nieuwe verificatie-email aanvraagt`,
            waitSeconds
          },
          { status: 429 }
        );
      }
    }

    // Generate new confirmation token
    const confirmationToken = randomUUID();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update the record with new token
    const { error: updateError } = await supabase
      .from("waitlist")
      .update({
        confirmation_token: confirmationToken,
        confirmation_token_expires_at: tokenExpiresAt.toISOString(),
        last_email_sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", record.id);

    if (updateError) {
      console.error("Failed to update token:", updateError);
      return NextResponse.json(
        { error: "Er ging iets mis. Probeer het opnieuw." },
        { status: 500 }
      );
    }

    // Send verification email
    try {
      const resend = getResendClient();
      const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.skill-quest.app'}/api/verify?token=${confirmationToken}`;
      const { subject, html } = renderVerificationEmail({
        locale: normalizeEmailLocale(record.locale),
        name: record.name,
        verifyUrl,
        platform: record.platform_preference,
      });

      await resend.emails.send({
        from: "SkillQuest <hello@skill-quest.app>",
        to: email,
        subject,
        html,
      });
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      return NextResponse.json(
        { error: "E-mail verzenden mislukt. Probeer het later opnieuw." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verificatie-email verzonden! Check je inbox.",
    });
  } catch (error) {
    console.error("Resend verification API error:", error);
    return NextResponse.json(
      { error: "Er is een onverwachte fout opgetreden." },
      { status: 500 }
    );
  }
}

