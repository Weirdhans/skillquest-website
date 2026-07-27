# Design system

Wat er is en waarom, zodat een volgende wijziging het systeem volgt in plaats van
er per pagina naast te gaan zitten. Geschreven na de driefasen-redesign
(fundament + homepage, marketingpagina's, juridische/auth-pagina's) van 2026-07.

## Kleuren: `--sq-*` tokens, niet Tailwind-grijs

Alle kleur loopt via CSS custom properties in `src/styles/globals.css`, gedefinieerd
op `:root` (licht) en herdefinieerd op `.dark` (donker). Componenten refereren de
token, nooit een letterlijke hex of een Tailwind-grijstint (`text-gray-600`,
`bg-white`, ...).

| Token | Rol |
|---|---|
| `--sq-bg`, `--sq-bg-muted` | Paginafond, twee stappen |
| `--sq-surface`, `--sq-surface-raised` | Kaarten en verhoogde vlakken |
| `--sq-border`, `--sq-border-strong` | Hairlines, dividers |
| `--sq-text`, `--sq-muted`, `--sq-muted-strong` | Tekst, drie contrastniveaus |
| `--sq-brand`, `--sq-brand-soft`, `--sq-brand-deep` | Merk teal: structuur, eyebrows, links |
| `--sq-accent`, `--sq-accent-strong` | Actie-oranje: **uitsluitend** CTA's en foutstaat |
| `--sq-cta-gradient`, `--sq-cta-text`, `--sq-cta-solid` | De CTA-knop, licht en donker apart getuned |
| `--sq-hero-start/mid/end`, `--sq-footer-bg` | Donkere banden (hero, eind-CTA, footer) |

Donkere modus is **geen** afgeleide van licht — het is een eigen ontwerp met een teal
onderton in de neutrals, zodat het merk ook in de vlakken zit en niet alleen in de
accenten. Bij het toevoegen van een nieuwe kleurwaarde: kies hem zo dat hij in beide
`:root`-blokken losstaand goed leest, meet het contrast (zie onder), en voeg hem toe
aan beide blokken tegelijk.

Corresponderende utility-classes in `globals.css` (`theme-page`, `theme-card`,
`theme-title`, `theme-copy`, `theme-muted-strong`, `theme-eyebrow`, `theme-hero-band`,
`theme-highlight-band`, `theme-final-band`, `theme-footer`) dekken de meeste gevallen.
Val terug op `style={{color: 'var(--sq-...)'}}` alleen als er geen utility voor
bestaat.

**Contrast**: WCAG AA (4,5:1 normale tekst, 3,0:1 grote tekst), gecontroleerd in
beide thema's voor elk nieuw kleurpaar. De browser-preview hercomputeert
`prefers-color-scheme`/class-toggles niet altijd betrouwbaar binnen één sessie — reken
liever met de hex-waarden zelf (relative luminance, WCAG-formule) dan puur op wat de
preview toont.

## Typografie

Drie families, elk met een reden, via `next/font/google` en gedeeld in
`src/lib/fonts.ts`:

- **Bricolage Grotesque** (`font-display`) — koppen. Variabel lettertype met een
  breedte-as, wat helpt bij lange samengestelde Duitse woorden.
- **Geist** (`font-sans`) — lopende tekst, de default.
- **Geist Mono** (`font-mono`, class `.nums`) — cijfers: XP, minuten, levels, streaks,
  prijzen. `font-variant-numeric: tabular-nums` zodat cijfers niet springen.

Type-schaal in `tailwind.config.js` (allemaal `clamp()`, schalen continu zonder
breakpoint-sprongen):

| Class | Gebruik | Bereik |
|---|---|---|
| `text-display` | Hero `<h1>` | `clamp(2.5rem, 4.6vw, 4rem)` |
| `text-section` | Sectiekoppen `<h2>` | `clamp(2rem, 3.5vw, 3.25rem)` |
| `text-subsection` | `<h3>` in kaarten, paneeltitels | `clamp(1.25rem, 1.6vw, 1.5rem)` |
| `text-lead` | Intro-alinea's, hero-subtext | `clamp(1.125rem, 1.4vw, 1.375rem)` |

De `display`-schaal is bewust op 4rem gekapt (niet 5rem): de hero-titel moet in elke
locale binnen twee regels blijven, en de Franse variant is de langste string.

## Ritme en radius

Drie sectie-niveaus in plaats van overal dezelfde padding:

- `.section-hero` → `py-24 md:py-32` (hero, eind-CTA)
- `.section-standard` → `py-16 md:py-24` (standaard)
- `.section-tight` → `py-12 md:py-16` (secties die aan de vorige vastplakken)

Radius, één systeem, geen uitzonderingen: interactief (knoppen, pills) = `rounded-full`,
kaarten/panelen = `rounded-2xl`, inputs = `rounded-lg`.

## Motion

`framer-motion`, opzettelijk ingehouden (het product gaat over focus; een drukke
site spreekt die belofte tegen). Regels:

- Elke animatie moet één zin verantwoording hebben (leesvolgorde, sectiegrens,
  hiërarchie) — geen beweging zonder functie.
- Alles achter `useReducedMotion()`. `globals.css` heeft daarnaast een vangnet-regel
  onder `@media (prefers-reduced-motion: reduce)` die animatie- en
  transitieduur naar 0 zet, inclusief `scroll-smooth`.
- Motion-componenten zijn geïsoleerde `'use client'` leafs (`Reveal.tsx`,
  `ProductScrollTour.tsx`), zodat paginabestanden zelf server components kunnen
  blijven.
- `Navbar.tsx` gebruikt `useScroll()` / `useMotionValueEvent()`, nooit een losse
  `window.addEventListener('scroll', ...)` — dat draait ongebatcht op elk
  scroll-frame.

## Iconen

`@phosphor-icons/react`, consequent één gewicht per context (meestal `weight="bold"`
voor UI-chrome, `"fill"` voor statusiconen). Geen handgeschreven inline SVG's meer voor
UI-elementen; wel voor decoratieve eenmalige graphics.

## Thema-keuze: licht / donker / systeem

Drie voorkeuren (`ThemePref`), twee opgeloste thema's. De opgeslagen waarde in
`localStorage['skillquest-theme']` is de **voorkeur**, niet het opgeloste thema — bij
`'system'` blijft de pagina de OS-instelling live volgen (via een
`matchMedia('(prefers-color-scheme: dark)')`-listener in `Navbar.tsx`).

- `src/lib/theme-script.ts` — het anti-FOUC-script, inline in `<head>`, draait vóór de
  eerste paint. Gedeeld tussen `src/app/[locale]/layout.tsx` en
  `src/components/StandaloneLayout.tsx` zodat beide boomstructuren exact hetzelfde
  gedrag hebben.
- `Navbar.tsx` — de knop cyclet licht → donker → systeem. De initiële React-state komt
  uit een **lazy initializer** (`useState(() => readStoredPref())`), niet uit een
  effect: `readStoredPref()` geeft `'system'` terug zonder `window` (dus tijdens SSR),
  en leest de echte voorkeur tijdens de eerste render op de client. De knop draagt
  `suppressHydrationWarning` voor exact deze overgang.

## Standalone routes (buiten `[locale]`)

`auth/*`, `auth-callback/`, `invite/[code]/`, `family/invite/[code]/` liggen buiten de
`[locale]`-boom omdat ze bereikt worden via Supabase-links en deellinks zonder
locale-prefix. Ze hebben daardoor geen toegang tot de locale-layout, en moeten dus zelf
voor stylesheet, fonts en theme-script zorgen:

- `src/components/StandaloneLayout.tsx` — wrapper die `globals.css`, de font-variabelen
  en `theme-script` levert. Elke standalone-route-groep heeft een `layout.tsx` die dit
  hergebruikt (`export {default} from '@/components/StandaloneLayout'`).
- `src/components/AuthShell.tsx` — de gedeelde kaart/paneel-shell voor alle
  wachtwoord-, bevestigings- en uitnodigingsschermen op deze routes, gebouwd uit
  dezelfde tokens als de rest van de site (geen los donker-glas- of licht-grijs-thema
  meer).
- Taalkeuze op deze routes komt uit de link zelf (`?locale=`), niet uit een
  URL-segment — zie `src/lib/authI18n.ts` (`resolveAuthLocale`, `handoffCopy`).

## Wat hier niet meer is

- **De `.dark .bg-white`-shim** — een blok in `globals.css` dat `.bg-white`,
  `.text-gray-*`, `.border-gray-*` en alle shadow-scales retroactief herschreef zodra
  `.dark` aanstond. Verwijderd toen de laatste pagina's die erop leunden (privacy,
  support, delete-account, confirm) op tokens overgingen. Nieuwe code hoeft en mag hier
  niet op terugvallen — gebruik de tokens direct.
- **`seoTerms`** — een dood veld in `src/lib/feature-pages.ts` (72 pagina's × 5 termen)
  dat ooit als keyword-pills op feature-pagina's rendered werd. De render is verwijderd
  omdat het keyword-stuffing was zonder waarde voor de bezoeker; het veld zelf is
  inmiddels ook uit de data en het type gehaald.
- **SVG-golfdividers en witte kaarten op `bg-background-50`** — de pre-redesign look
  van privacy/support/delete-account/confirm. Vervangen door hairline-secties,
  divided lists en de tokens hierboven.

## Voordat je een nieuw kleurpaar toevoegt

1. Kies de hex-waarde voor licht én donker samen — nooit één en de ander later.
2. Reken het contrastpaar door (tekst-op-achtergrond) voor beide thema's.
3. Voeg toe aan `:root` en `.dark` in `globals.css`, niet losstaand in een component.
4. Geef het een `theme-*`-utility als het op meer dan één plek terugkomt.
