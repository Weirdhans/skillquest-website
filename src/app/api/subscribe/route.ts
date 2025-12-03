import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Lazy initialize clients (only when needed, not at build time)
const getSupabaseClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase environment variables are not configured");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
};

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(process.env.RESEND_API_KEY);
};

// Type definitions
interface SubscribeRequest {
  email: string;
  name?: string;
  source?: string;
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

    // Check for duplicate email
    const { data: existingRecord } = await supabase
      .from("waitlist")
      .select("id, email, created_at")
      .eq("email", body.email.toLowerCase())
      .single();

    if (existingRecord) {
      // Duplicate email - return friendly error
      return NextResponse.json(
        {
          error: "Dit e-mailadres staat al op de wachtlijst",
          message:
            "Je bent al aangemeld! We sturen je een bericht zodra er nieuws is.",
        },
        { status: 409 }
      );
    }

    // Insert into Supabase waitlist table
    const { data: insertData, error: insertError } = await supabase
      .from("waitlist")
      .insert([
        {
          email: body.email.toLowerCase(),
          name: body.name || null,
          source: body.source || "skill-quest-website",
          status: "new",
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

    // Send confirmation email via Resend
    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: "SkillQuest <hello@skill-quest.app>",
        to: body.email,
        subject: "🎉 Je bent aangemeld voor SkillQuest!",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welkom bij SkillQuest</title>
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
              <h1 style="margin: 0; font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                Je staat op de lijst!
              </h1>
            </td>
          </tr>

          <!-- Body Text -->
          <tr>
            <td style="padding-bottom: 32px; font-size: 16px; line-height: 1.6; color: #475569;">
              <p style="margin: 0 0 16px 0;">Hey${body.name ? ` ${body.name}` : ""}! 👋</p>
              <p style="margin: 0 0 16px 0;">
                Bedankt voor je aanmelding voor <strong style="color: #6366F1;">SkillQuest</strong>!
                Je bent nu onderdeel van onze community en hoort als eerste wanneer we lanceren.
              </p>
              <p style="margin: 0 0 16px 0;">
                SkillQuest helpt je gezin om samen vaardigheden te ontwikkelen door gamification,
                timer technieken en real-time inzichten. Perfect voor kinderen van 6-18 jaar.
              </p>
            </td>
          </tr>

          <!-- Features Box -->
          <tr>
            <td style="padding: 20px; background-color: rgba(99, 102, 241, 0.1); border-radius: 12px; border: 1px solid rgba(99, 102, 241, 0.2); margin-bottom: 24px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; color: #6366F1;">
                Wat maakt SkillQuest uniek?
              </h2>
              <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                <li>👨‍👩‍👧‍👦 Familie modus met parent-child accounts</li>
                <li>🎮 Gamification die echt werkt (XP, levels, streaks)</li>
                <li>⏱️ 7 wetenschappelijk bewezen timer technieken</li>
                <li>📊 Real-time ouder dashboard</li>
                <li>🔥 Auto-freeze streaks op drukke dagen</li>
              </ul>
            </td>
          </tr>

          <!-- What's Next -->
          <tr>
            <td style="padding: 24px 0;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: bold; color: #6366F1;">
                Wat kun je verwachten?
              </h2>
              <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                <li>Updates over nieuwe features en de launch</li>
                <li>Exclusieve early access voor de eerste supporters</li>
                <li>Tips over skill development voor het hele gezin</li>
              </ul>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 32px 0 24px 0;">
              <a href="https://skill-quest.app" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%); color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);">
                Bezoek skill-quest.app
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 32px; border-top: 1px solid rgba(99, 102, 241, 0.2);">
              <p style="margin: 0; font-size: 12px; color: #94A3B8; line-height: 1.6;">
                SkillQuest | <a href="https://skill-quest.app" style="color: #6366F1; text-decoration: none;">skill-quest.app</a><br>
                Vragen? Stuur een e-mail naar <a href="mailto:hello@skill-quest.app" style="color: #6366F1; text-decoration: none;">hello@skill-quest.app</a>
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #CBD5E1;">
                Je ontvangt deze e-mail omdat je je hebt aangemeld voor de SkillQuest wachtlijst.<br>
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
        `,
      });

      // Email sent successfully
    } catch (emailError) {
      // Log email error but don't fail the request (user is still on waitlist)
      console.error("Failed to send confirmation email:", emailError);
      // Continue - waitlist signup succeeded even if email failed
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Je bent succesvol aangemeld!",
        data: {
          id: insertData.id,
          email: insertData.email,
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
