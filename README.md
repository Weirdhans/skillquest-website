# SkillQuest Website

Marketing website voor SkillQuest, de skill-tracking app met focus timers, XP en
Family-tools. Live op [skill-quest.app](https://www.skill-quest.app).

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Talen**: next-intl, 6 locales (`nl` default, `en`, `de`, `fr`, `es`, `it`), altijd
  met prefix (`/nl/...`)
- **Styling**: Tailwind CSS v3, dark mode via een `.dark`-class
- **Motion**: framer-motion, altijd achter `useReducedMotion()`
- **Iconen**: `@phosphor-icons/react`
- **Fonts**: Bricolage Grotesque (display), Geist (body), Geist Mono (cijfers) via
  `next/font/google`, gedeeld in `src/lib/fonts.ts`
- **Backend**: Supabase (auth, tester-lijst), Resend (verificatie- en reset-mails)
- **Deployment**: Vercel, auto-deploy vanaf `master`

## Design system

Het volledige tokensysteem en de regels erachter staan in
[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md). Kort:

- Kleuren zijn CSS custom properties (`--sq-*`) in `src/styles/globals.css`, dual-themed
  via `:root` en `.dark`. Nooit een Tailwind-grijstint direct gebruiken op tekst of
  achtergrond — gebruik de `theme-*` utility-classes of de `--sq-*` variabelen.
- Type-schaal in `tailwind.config.js`: `text-display` / `text-section` /
  `text-subsection` / `text-lead`, elk een `clamp()` zodat koppen meeschalen zonder
  breakpoint-sprongen.
- Sectie-ritme: `.section-hero` / `.section-standard` / `.section-tight`, drie
  bewuste niveaus in plaats van overal dezelfde padding.
- Radius: interactief = `rounded-full`, kaarten = `rounded-2xl`, inputs = `rounded-lg`.

## Project-structuur

```
skillquest-website/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Alle gelokaliseerde marketingpagina's en juridische pagina's
│   │   ├── auth/               # Wachtwoord-reset flow, geen locale-prefix (Supabase-links)
│   │   ├── auth-callback/      # App-handoff na OAuth/magic link
│   │   ├── invite/[code]/      # Vriendschapsuitnodiging, geen locale-prefix (deellinks)
│   │   ├── family/invite/[code]/
│   │   └── api/                # subscribe, resend-verification, auth/confirm, verify
│   ├── components/             # MarketingPages, Navbar, AuthShell, Reveal, ProductScrollTour, ...
│   ├── lib/                    # marketing.ts, feature-pages.ts, authI18n.ts, theme-script.ts, fonts.ts
│   └── styles/
│       └── globals.css         # Token-laag, ritme, radius-lock, CTA-tokens
├── docs/                       # DESIGN_SYSTEM.md, PASSWORD_RESET_SETUP.md, ...
├── messages/                   # next-intl vertalingen per locale
└── tailwind.config.js
```

De routes onder `auth/`, `auth-callback/` en `invite/` staan bewust buiten `[locale]`,
omdat ze bereikt worden via Supabase-links en deellinks die geen locale-prefix kennen.
Ze delen wel dezelfde fonts, tokens en het theme-script via `StandaloneLayout` en
`AuthShell` in `src/components/`.

## Development

```bash
# Dependencies installeren
npm install

# Development server
npm run dev

# Type-check
npx tsc --noEmit

# Lint
npm run lint

# SEO-copy en gerichte redirectconfiguratie controleren
npm run test:seo

# Productie-build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

Voor de HTTP-regressietests start je na de build de lokale productieserver met
`npm run start -- --port 3100` en voer je in een tweede terminal
`npm run test:seo:http` uit. Met `SEO_TEST_BASE_URL` kun je een andere testserver
kiezen. De tests controleren redirects, campagneparameters, canonieke bestemmingen,
echte 404-responses en de bereikbaarheid van bestaande callback- en resetpagina's.
Er worden geen formulieren verstuurd.

Kopieer `.env.example` naar `.env.local` en vul de Supabase- en Resend-sleutels in
voordat je de tester-inschrijving of e-mailflows lokaal test.

## Licentie

Copyright © 2026 SkillQuest. All rights reserved.
