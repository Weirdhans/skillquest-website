# Nieuwsbrief

Het formulier "Schrijf je in voor de nieuwsbrief" staat op de homepage en de
downloadpagina (`src/components/LeadCapture.tsx`, teksten in
`src/lib/marketing.ts` onder `lead`). Het verving op 14 november 2026 de oude
wachtlijst ("Ontvang productupdates"), die in de Supabase-tabel
`public.waitlist` stond.

## Waar de lijst staat

**Alleen in Resend.** Er is geen eigen tabel met inschrijvers.

De nieuwsbriefroutes gebruiken een eigen Resend-sleutel met volledige toegang,
`RESEND_NEWSLETTER_API_KEY` (Vercel, Production en Preview): Resend laat
contacten, segmenten en topics alleen met volledige toegang beheren. De
bestaande `RESEND_API_KEY` is een sleutel die alleen mag versturen en blijft
voor de feedback- en resetmails.

- Segment **Newsletter**: iedereen die zijn inschrijving heeft bevestigd.
- Topics **Newsletter nl/en/de/fr/es/it**: één per taal, privé (niet zichtbaar op
  de afmeldpagina van Resend), standaard *opt-out*. Een bevestigd contact staat
  op *opt-in* voor precies één taal: die van de pagina waarop het zich inschreef
  (de taal zit in het token). Wie al ingeschreven is en een andere taal wil,
  meldt zich af en schrijft zich opnieuw in (of mailt ons).
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
3. **Bevestigen**: een nieuw adres wordt in één Resend-aanroep compleet
   aangemaakt: ingeschreven, in het segment, op zijn taal-topic en met de
   toestemmingsvelden (de API kan dat; SDK 6.5.2 geeft `segments` en `topics`
   niet door, dus via `resend.post`). Mislukt die aanroep, dan blijft er niets
   half achter. Een bestaand contact (eerder afgemeld, of net aangemaakt door
   een parallelle bevestiging) gaat in stappen: segment, nogmaals controleren
   op een nieuwere bevestiging, dan taal-topic en toestemmingsvelden. Daarna een
   welkomstmail met afmeldlink en `List-Unsubscribe`-headers (one-click,
   RFC 8058), met een idempotency-sleutel per link zodat dubbel bevestigen één
   mail geeft.
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

Elke teller voegt eerst zijn rij in en telt daarna alleen de rijen die er
eerder waren, zodat van twee gelijktijdige aanvragen voor hetzelfde adres er
precies één doorgaat. Het dagbudget wordt als eerste gecontroleerd, dus "te
druk" geldt voor iedereen gelijk. Een `em:`-rij blijft staan als de aanvraag
door de grenzen kwam, ook voor een adres dat al ingeschreven is (zo gedragen
de tellers zich voor elk adres hetzelfde); overgeslagen aanvragen en
aanvragen waarbij het versturen mislukt, geven hun rij terug. De grenzen
worden gecontroleerd vóór er in Resend wordt gekeken.

E-mailadressen worden streng gecontroleerd (`normalizeEmail`): de Resend-SDK zet
het adres ongecodeerd in het API-pad, dus tekens als `/`, `?`, `#` en `%` mogen er
nooit doorheen. Adressen met tekens buiten ASCII worden daardoor ook geweigerd.

De daggrens beschermt het gratis Resend-quotum (100 transactionele mails per
dag), dat de app ook gebruikt voor de mails aan ouders en de verwijdercodes.

## Afmelden

- **Nieuwsbrieven (Resend Broadcasts)**: zet altijd `{{{RESEND_UNSUBSCRIBE_URL}}}`
  in de mail. Resend voegt zelf de `List-Unsubscribe`-headers toe en zet het
  contact op afgemeld.
- **Welkomstmail**: eigen link
  `/api/newsletter/unsubscribe?c=<contact-id>&s=<handtekening>&l=<taal>`. De
  handtekening is een HMAC over het contact-ID (sleutel afgeleid van
  `SUPABASE_SERVICE_ROLE_KEY`); zonder geldige handtekening doet de route geen
  Resend-aanroep. Wordt die sleutel ooit vervangen, dan werken oude
  welkomstlinks niet meer; elke nieuwsbrief heeft dan nog de Resend-afmeldlink.
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
in de mails naar zijn eigen deployment-URL (`VERCEL_URL`, zie `getSiteUrl` in
`src/lib/newsletter.ts`), zodat een testinschrijving op dezelfde preview te
bevestigen is; de Host-header wordt nergens vertrouwd.
