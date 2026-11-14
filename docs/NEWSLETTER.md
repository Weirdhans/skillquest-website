# Nieuwsbrief

Het formulier "Schrijf je in voor de nieuwsbrief" staat op de homepage en de
downloadpagina (`src/components/LeadCapture.tsx`, teksten in
`src/lib/marketing.ts` onder `lead`). Het verving op 14 november 2026 de oude
wachtlijst ("Ontvang productupdates"), die in de Supabase-tabel
`public.waitlist` stond.

## Waar de lijst staat

**Alleen in Resend.** Er is geen eigen tabel met inschrijvers.

- Segment **Newsletter**: iedereen die zijn inschrijving heeft bevestigd.
- Topics **Newsletter nl/en/de/fr/es/it**: één per taal, privé (niet zichtbaar op
  de afmeldpagina van Resend), standaard *opt-out*. Een bevestigd contact staat
  op *opt-in* voor precies één taal: die van de pagina waarop het zich inschreef
  (de taal zit in het token). Een nieuwe inschrijving in een andere taal wisselt hem.
- Contactvelden: `locale`, `consent_at` (ISO-tijd van de bevestiging),
  `consent_version` (`NEWSLETTER_CONSENT_VERSION` in `src/lib/newsletter.ts`) en
  `consent_source` (`website`).

De ID's van segment en topics staan in `src/lib/newsletter.ts`.

Gekozen op 14 november 2026 na een second opinion van Codex (gpt-6.1-sol) en
Antigravity (gemini-4-argon-high); Hans koos dezelfde dag voor deze optie. De
afweging: één plek voor lijst en afmeldstatus, niets om te synchroniseren, en de
productiedatabase (gedeeld met DailyQuest) bevat geen marketingadressen.

## Hoe een inschrijving loopt

1. **Formulier** → `POST /api/subscribe` (`src/app/api/subscribe/route.ts`).
   Slaat niets op over het adres. Stuurt een bevestigingsmail met een
   versleuteld token (AES-256-GCM, 24 uur geldig, `src/lib/newsletter-token.mjs`)
   dat het adres en de taal bevat. Het antwoord is altijd hetzelfde, ook als
   het adres al ingeschreven is, zodat niemand kan nagaan wie op de lijst staat.
   Een bestaand, ingeschreven adres krijgt geen mail.
2. **Link in de mail** → `/[locale]/newsletter/confirm?token=…`. De pagina toont
   een knop; pas die knop doet `POST /api/newsletter/confirm`. Zo kan een
   virusscanner die links opent niemand inschrijven.
3. **Bevestigen**: contact aanmaken (eerst als afgemeld), in het segment zetten,
   taal-topic zetten, en als laatste stap `unsubscribed: false` met de
   toestemmingsvelden. Daarna een welkomstmail met afmeldlink en
   `List-Unsubscribe`-headers (one-click, RFC 8058), met een idempotency-sleutel
   per link zodat dubbel bevestigen één mail geeft. Mislukt een stap bij een
   contact dat deze aanvraag aanmaakte, dan wordt het weer verwijderd.
4. Een token dat vóór de laatste bevestiging is uitgegeven, werkt niet meer.
   Zo maakt een oude link een afmelding niet ongedaan.

### Misbruik

`public.subscribe_attempts` (Supabase) houdt tellers bij, alleen als hash en
maximaal een dag (elke aanvraag ruimt oudere rijen op):

| Teller | Grens |
|---|---|
| `ip:<hash>` per aanvraag | 5 per uur per IP |
| `em:<hash>` per verstuurde bevestigingsmail | 1 per 10 minuten en 3 per dag per adres |
| alle `em:`-rijen samen | 40 bevestigingsmails per dag |
| `cf:<hash>` per bevestigpoging | 10 per uur per IP |

Elke teller voegt eerst zijn rij in en telt daarna, zodat gelijktijdige
aanvragen elkaar zien (bij een race wordt geweigerd, niet doorgelaten). Een
`em:`-rij blijft alleen staan als er echt een mail uit mag; overgeslagen
pogingen geven hun rij terug, zodat herhalen het dagbudget niet opmaakt. De
limieten en het budget worden gecontroleerd vóór er in Resend wordt gekeken,
zodat elk adres hetzelfde antwoord krijgt.

E-mailadressen worden streng gecontroleerd (`normalizeEmail`): de Resend-SDK zet
het adres ongecodeerd in het API-pad, dus tekens als `/`, `?`, `#` en `%` mogen er
nooit doorheen. Adressen met tekens buiten ASCII worden daardoor ook geweigerd.

De daggrens beschermt het gratis Resend-quotum (100 transactionele mails per
dag), dat de app ook gebruikt voor de mails aan ouders en de verwijdercodes.

## Afmelden

- **Nieuwsbrieven (Resend Broadcasts)**: zet altijd `{{{RESEND_UNSUBSCRIBE_URL}}}`
  in de mail. Resend voegt zelf de `List-Unsubscribe`-headers toe en zet het
  contact op afgemeld.
- **Welkomstmail**: eigen link `/api/newsletter/unsubscribe?c=<contact-id>&l=<taal>`.
  Openen in de browser toont een pagina met een knop
  (`/[locale]/newsletter/unsubscribe`); een POST (de knop of de one-click van
  een mailprogramma) zet het contact direct op afgemeld.

Na afmelden blijft het contact bestaan met de markering "afgemeld" en de
toestemmingsvelden, zodat niemand per ongeluk opnieuw gemaild wordt. Wie vraagt
om alles te wissen, wordt in Resend verwijderd (Audience → contact → Delete).

## Een nieuwsbrief versturen

Per taal één broadcast:

- Segment: **Newsletter**; topic: **Newsletter `<taal>`**.
- Afzender: `SkillQuest <hello@skill-quest.app>`.
- In de HTML altijd `{{{RESEND_UNSUBSCRIBE_URL}}}` als afmeldlink.

Verstuur nooit iets naar de lijst zonder Hans' uitdrukkelijke ja. Er is nog geen
automatische inhoud voor de nieuwsbrief; dat is een apart vervolg.

## App-account verwijderen

De nieuwsbrief staat los van een SkillQuest-account: je kunt je inschrijven
zonder account, en de inschrijving is een eigen toestemming via de website. Het
verwijderen van een app-account raakt de nieuwsbrief daarom niet; het
privacybeleid (sectie 4) en de verwijderpagina zeggen dat, en dat afmelden met
de link in elke nieuwsbrief gaat. Vraagt iemand per mail om **al** zijn gegevens
te wissen, dan wordt hij ook uit Resend verwijderd.

In de app-repo is voor de nieuwsbrief niets nodig in de verwijdertrigger. Wel
kan `public.waitlist` (leeg sinds 14 november 2026) daar met een migratie weg,
zodra deze website live is en de tabel nergens meer wordt gelezen;
`public.subscribe_attempts` blijft nodig voor de tellers.

## Testen

`npm run test:seo` draait ook `tests/newsletter.test.mjs`: tokens (verloop,
knoeien, andere sleutel), mailteksten in zes talen met bevestigings- en
afmeldlink, en een privacybeleid zonder wachtlijst. Een preview op Vercel linkt
in de mails naar zichzelf (`getSiteUrl` in `src/lib/newsletter.ts`), zodat een
testinschrijving op dezelfde preview te bevestigen is.
