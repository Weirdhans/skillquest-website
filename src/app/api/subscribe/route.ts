import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { randomUUID } from "crypto";
import { renderVerificationEmail, normalizeEmailLocale } from "@/lib/email-templates.mjs";

// Lazy initialize clients (only when needed at runtime, not at build time)
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

// Type definitions
type Platform = 'ios' | 'android' | 'both';

interface SubscribeRequest {
  email: string;
  name?: string;
  platform?: Platform;
  locale?: string;
}

// Validate platform value
function isValidPlatform(value: string | undefined): value is Platform {
  return value === 'ios' || value === 'android' || value === 'both';
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();

    // Parse request body
    const body: SubscribeRequest = await request.json();

    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate and default platform
    const platform: Platform = isValidPlatform(body.platform) ? body.platform : 'both';
    const locale = normalizeEmailLocale(body.locale);

    const email = body.email.toLowerCase();

    // Check for duplicate email
    const { data: existingRecord } = await supabase
      .from("waitlist")
      .select("id, email, email_verified, created_at")
      .eq("email", email)
      .single();

    if (existingRecord) {
      // Email already exists - differentiate between verified and unverified
      if (existingRecord.email_verified) {
        return NextResponse.json(
          {
            error: "already_verified",
            message: "Je staat al op de update-lijst. We sturen je bericht zodra er nieuws is.",
          },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          {
            error: "pending_verification",
            message: "Je hebt je al aangemeld maar nog niet bevestigd. Check je inbox of vraag een nieuwe verificatie-email aan.",
            email: email,
          },
          { status: 409 }
        );
      }
    }

    // Generate confirmation token
    const confirmationToken = randomUUID();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Insert into Supabase waitlist table
    const { data: insertData, error: insertError } = await supabase
      .from("waitlist")
      .insert([
        {
          email: email,
          name: body.name || null,
          platform_preference: platform,
          locale: locale,
          source: "website",
          status: "new",
          email_verified: false,
          confirmation_token: confirmationToken,
          confirmation_token_expires_at: tokenExpiresAt.toISOString(),
          last_email_sent_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Er ging iets mis. Probeer het opnieuw." },
        { status: 500 }
      );
    }

    // Send verification email via Resend
    try {
      const resend = getResendClient();
      const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.skill-quest.app'}/api/verify?token=${confirmationToken}`;
      const { subject, html } = renderVerificationEmail({
        locale,
        name: body.name || null,
        verifyUrl,
        platform,
      });

      await resend.emails.send({
        from: "SkillQuest <hello@skill-quest.app>",
        to: email,
        subject,
        html,
      });
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Don't fail the request - user is still on waitlist
      // They can request a resend later
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Check je inbox om je aanmelding te bevestigen!",
        data: {
          id: insertData.id,
          email: insertData.email,
          platform: platform,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json(
      {
        error: "Er is een onverwachte fout opgetreden. Probeer het later opnieuw.",
      },
      { status: 500 }
    );
  }
}

