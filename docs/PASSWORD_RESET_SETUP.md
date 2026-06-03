# Password Reset Setup

SkillQuest uses the website as the primary password reset flow. The app and the
website can request a reset email, but users must be able to finish the reset in
a browser on desktop or mobile.

## Supabase URL Configuration

Set these values in Supabase Dashboard > Authentication > URL Configuration:

- Site URL: `https://www.skill-quest.app`
- Redirect URLs:
  - `https://www.skill-quest.app/**`
  - `io.skillquest.app://**` temporarily for older app builds
  - `com.skillquest.app://**` temporarily for legacy app builds

## Supabase Password Policy

Set these values in Supabase Dashboard > Authentication > Providers > Email:

- Minimum password length: `12`
- Required character classes: disabled / none
- Leaked password protection: enabled if the project plan supports it

Do not require symbols, uppercase letters, or digits. Password managers can
generate strong long passwords that do not always include every character class,
and forcing users to edit generated passwords makes the reset flow worse.

The reset page intentionally uses one uncontrolled `new-password` input instead
of controlled React state and a second confirmation field. Chrome and Google
Password Manager can fill generated passwords directly into the DOM, and a
React re-render must not overwrite that value.

## Recovery Email Template

Update Supabase Dashboard > Authentication > Email Templates > Reset password.
Do not use `{{ .ConfirmationURL }}` for this flow. Use a website link with
`{{ .TokenHash }}` so the website can verify the recovery token itself:

```html
<h2>Reset your password</h2>

<p>Use this link to reset your SkillQuest password:</p>

<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&amp;type=recovery&amp;next=/auth/reset-password">
    Reset password
  </a>
</p>

<p>If you did not request this, you can ignore this email.</p>
```

This intentionally opens an intermediate confirmation page. The token is only
verified after the user clicks the button on that page, which reduces the chance
that email security scanners consume the reset token before the user opens it.

## Runtime Flow

1. User requests a reset from the app or from `/auth/forgot-password`.
2. Supabase sends the recovery email with a `token_hash` link.
3. `/auth/confirm` shows a confirmation button.
4. `/api/auth/confirm` verifies the token with `verifyOtp`.
5. `/auth/reset-password` lets the user choose a new password.
6. The website calls `updateUser({password})`.
7. The website calls `signOut({scope: 'global'})`, so the user must log in again.

## Required Website Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_or_anon_key_here
NEXT_PUBLIC_SITE_URL=https://www.skill-quest.app
```
