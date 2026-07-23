import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

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
      .select("id, email, name, email_verified, confirmation_token_expires_at, platform_preference")
      .eq("confirmation_token", token)
      .single();

    if (findError || !record) {
      // Token not found - might be already used or invalid
      return NextResponse.redirect(
        new URL("/confirm?status=error&reason=invalid", request.url)
      );
    }

    // Check if already verified
    if (record.email_verified) {
      return NextResponse.redirect(
        new URL("/confirm?status=error&reason=already_verified", request.url)
      );
    }

    // Check if token has expired (24 hours)
    if (record.confirmation_token_expires_at) {
      const expiresAt = new Date(record.confirmation_token_expires_at);
      if (expiresAt < new Date()) {
        return NextResponse.redirect(
          new URL(`/confirm?status=error&reason=expired&email=${encodeURIComponent(record.email)}`, request.url)
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
        new URL("/confirm?status=error&reason=server_error", request.url)
      );
    }

    // Send welcome email after successful verification
    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: "SkillQuest <hello@skill-quest.app>",
        to: record.email,
        subject: "Welkom bij SkillQuest updates!",
        html: getWelcomeEmailTemplate(record.name, record.platform_preference),
      });
    } catch (emailError) {
      // Log but don't fail - verification succeeded
      console.error("Failed to send welcome email:", emailError);
    }

    // Redirect to success page
    return NextResponse.redirect(
      new URL("/confirm?status=success", request.url)
    );
  } catch (error) {
    console.error("Verify API error:", error);
    return NextResponse.redirect(
      new URL("/confirm?status=error&reason=server_error", request.url)
    );
  }
}

function getWelcomeEmailTemplate(name: string | null, platform: string | null): string {
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
  <title>Welkom bij SkillQuest</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F9FAFB; color: #14201B;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background: #FFFFFF; border-radius: 16px; border: 1px solid #DCE5DF; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.06);">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <img src="https://www.skill-quest.app/skillquest-logo.png" width="120" height="120" alt="SkillQuest" style="display: block; border-radius: 24px;">
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #115E59;">
                Je aanmelding is bevestigd
              </h1>
            </td>
          </tr>

          <!-- Body Text -->
          <tr>
            <td style="padding-bottom: 32px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 16px 0;">Hey${name ? ` ${name}` : ""}!</p>
              <p style="margin: 0 0 16px 0;">
                Bedankt voor het bevestigen van je aanmelding voor <strong style="color: #0F766E;">SkillQuest</strong> updates ${platformText}.
              </p>
              <p style="margin: 0 0 16px 0;">
                SkillQuest helpt mensen en gezinnen vaardigheden op te bouwen met focus timers,
                XP, levels, statistieken, vrienden, challenges en familie-tools.
              </p>
            </td>
          </tr>

          <!-- Features Box -->
          <tr>
            <td style="padding: 20px; background-color: #EAF8F5; border-radius: 12px; border: 1px solid #D2F0EA; margin-bottom: 24px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; color: #0F766E;">
                Wat maakt SkillQuest nuttig?
              </h2>
              <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                <li>Focus timers voor je vaardigheden</li>
                <li>XP, levels en streaks</li>
                <li>Statistieken per skill</li>
                <li>Vrienden, challenges en rankings</li>
                <li>Familie-tools voor ouders en kinderen</li>
              </ul>
            </td>
          </tr>

          <!-- What's Next -->
          <tr>
            <td style="padding: 24px 0;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: bold; color: #0F766E;">
                Wat kun je verwachten?
              </h2>
              <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                <li>Updates over nieuwe functies</li>
                <li>Informatie over Android alpha en Google Play closed testing</li>
                <li>Tips over skill development voor jezelf en je gezin</li>
              </ul>
            </td>
          </tr>

          ${platform !== 'ios' ? `<tr>
            <td style="padding-bottom: 24px; font-size: 15px; line-height: 1.6; color: #475569;">
              <p style="margin: 0;">
                <strong>Over de Android alpha:</strong> je staat nu op de wachtlijst voor de Google Play closed test.
                Zodra we je hebt toegevoegd aan de tester-lijst, sturen we je een aparte e-mail met de installatielink.
                Gebruik dan hetzelfde Google-account op je Android-toestel als het e-mailadres waarmee je je hebt aangemeld.
              </p>
            </td>
          </tr>` : ''}

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 32px 0 24px 0;">
              <a href="https://www.skill-quest.app" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #FF6B35 0%, #D2381C 100%); color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(210, 56, 28, 0.3);">
                Bezoek www.skill-quest.app
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 32px; border-top: 1px solid #DCE5DF;">
              <p style="margin: 0; font-size: 12px; color: #94A3B8; line-height: 1.6;">
                SkillQuest | <a href="https://www.skill-quest.app" style="color: #0F766E; text-decoration: none;">www.skill-quest.app</a><br>
                Vragen? Stuur een e-mail naar <a href="mailto:hello@skill-quest.app" style="color: #0F766E; text-decoration: none;">hello@skill-quest.app</a>
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #CBD5E1;">
                Je ontvangt deze e-mail omdat je je aanmelding hebt bevestigd voor SkillQuest updates.<br>
                We respecteren je privacy en sturen alleen relevante updates.
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
