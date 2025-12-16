import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { randomUUID } from "crypto";

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
            message: "Je staat al op de wachtlijst! We sturen je bericht zodra er nieuws is.",
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
      const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skill-quest.app'}/api/verify?token=${confirmationToken}`;

      await resend.emails.send({
        from: "SkillQuest <hello@skill-quest.app>",
        to: email,
        subject: "Bevestig je aanmelding voor SkillQuest",
        html: getVerificationEmailTemplate(body.name || null, verifyUrl, platform),
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

function getVerificationEmailTemplate(name: string | null, verifyUrl: string, platform: Platform): string {
  const platformText = platform === 'ios'
    ? 'voor iOS'
    : platform === 'android'
    ? 'voor Android'
    : 'voor iOS en Android';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bevestig je aanmelding</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F8FAFC; color: #1E293B;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%); border-radius: 16px; border: 1px solid rgba(99, 102, 241, 0.2); padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">

          <!-- Logo/Emoji -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <div style="font-size: 64px; line-height: 1;">🎯</div>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #1E293B;">
                Bevestig je aanmelding
              </h1>
            </td>
          </tr>

          <!-- Body Text -->
          <tr>
            <td style="padding-bottom: 32px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 16px 0;">Hey${name ? ` ${name}` : ""}!</p>
              <p style="margin: 0 0 16px 0;">
                Bijna klaar! Klik op de knop hieronder om je aanmelding voor de <strong style="color: #6366F1;">SkillQuest</strong> wachtlijst te bevestigen.
              </p>
              <p style="margin: 0 0 16px 0;">
                Je krijgt updates ${platformText} zodra we lanceren.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 0 32px 0;">
              <a href="${verifyUrl}" style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%); color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);">
                Bevestig mijn aanmelding
              </a>
            </td>
          </tr>

          <!-- Link expiry notice -->
          <tr>
            <td style="padding-bottom: 24px; font-size: 14px; color: #94A3B8; text-align: center;">
              <p style="margin: 0;">
                Deze link is 24 uur geldig.<br>
                Niet aangevraagd? Dan kun je deze e-mail negeren.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 24px; border-top: 1px solid rgba(99, 102, 241, 0.2);">
              <p style="margin: 0; font-size: 12px; color: #94A3B8; line-height: 1.6;">
                SkillQuest | <a href="https://skill-quest.app" style="color: #6366F1; text-decoration: none;">skill-quest.app</a><br>
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
