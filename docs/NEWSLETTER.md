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

De ID's van segment en topics en de afzender staan in
`src/lib/newsletter-config.mjs` (`src/lib/newsletter.ts` leest ze daar), zodat
de routes en het nieuwsbriefscript dezelfde waarden gebruiken.

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

## De maandelijkse nieuwsbrief (SQ-196)

Elke maand gaat er per taal één nieuwsbrief uit, automatisch samengesteld uit
wat al op de website staat, maar **alleen na Hans' goedkeuring**. Per nummer is
er geen schrijf- of vertaalwerk. Hans' enige handeling is één label zetten.

Besluit van Hans op 15 november 2026: inhoud uit tips, blog en app-nieuws,
maandelijks, goedkeuren met een issue en het label `approved` (zoals de
social-wachtrij in de app-repo), een statusbranch in deze repo en per taal een
proefmail. Vooraf gaven Codex (gpt-6.1-sol) en Antigravity (gemini-4-hydrogen-high;
Argon zat op een limiet) een second opinion. Dat veranderde het ontwerp op een
paar punten:

- De straat houdt per taal bij welke artikelen al verstuurd zijn. Eerst was het
  plan "alles sinds de vorige verzending", maar dan verdwijnt een tip die tussen
  klaarzetten en versturen verschijnt.
- Vóór het inplannen wordt alles van het concept gecontroleerd: segment, topic,
  afzender, onderwerp, tekst en HTML, niet alleen de HTML.
- Er zit minstens 2 uur tussen goedkeuren en versturen.
- De proefmail is een gewone mail en geen testbroadcast. Het gratis plan heeft
  maximaal 3 segmenten en die zijn alle drie in gebruik.

Niet overgenomen: Antigravity raadde een GitHub-*environment* met
goedkeuringsknop aan in plaats van het label. Hans koos het label, omdat hij dat
kent en per taal een vinkje kan weghalen.

### Hoe een nummer loopt

1. **Klaarzetten** (workflow *Newsletter - daily*, elke dag om 06:17 UTC; vanaf
   de eerste maandag van de maand). Per taal kiest `scripts/newsletter.mjs`:
   - tips en blogartikelen die openbaar zijn (`publishedAt`, zelfde regel als
     de site), hooguit 62 dagen oud en nog niet in een verstuurd nummer van die
     taal; maximaal 4 tips en 3 blogartikelen, nieuwste eerst;
   - de "Wat is er nieuw"-tekst van de huidige App Store-versie (openbare
     iTunes-lookup per land: nl, us, de, fr, es, it), als die versie hooguit
     62 dagen oud is en nog niet verstuurd.
   - Elke artikellink wordt eerst op de live site geopend. Een pagina die geen
     200 geeft, gaat niet mee (die komt het volgende nummer) en maakt plaats
     voor het volgende artikel.

   Een taal zonder iets nieuws wordt overgeslagen. Voor de andere talen komt er
   een concept-broadcast in Resend (segment **Newsletter**, topic
   **Newsletter `<taal>`**, afzender `SkillQuest <hello@skill-quest.app>`,
   reply-to hello@, `{{{RESEND_UNSUBSCRIBE_URL}}}` in HTML en tekst). Het script
   leest het concept terug en weigert het als Resend het topic niet bevestigt:
   zonder topic zou een broadcast alle talen bereiken. Daarna krijgt Hans per
   taal een **proefmail** met precies die opgeslagen HTML, met een onschuldige
   link in plaats van de afmeldlink (transactioneel, 1 tot 6 mails per maand
   uit het dagquotum van 100). Zonder proefmail wordt er niets klaargezet:
   ontbreekt `NEWSLETTER_PREVIEW_TO` of mislukt een proefmail, dan stopt de
   run en probeert de volgende dag het opnieuw. Ten slotte opent de workflow
   het issue **Nieuwsbrief JJJJ-MM** met per taal een vinkje, het onderwerp,
   de artikelen en een link naar het concept. Lukte dat openen niet, dan doet
   de volgende dagelijkse run het alsnog (zolang er geen issue met die titel
   bestaat, ook geen gesloten).
2. **Goedkeuren**: Hans haalt eventueel een vinkje weg en zet het label
   `approved`. De workflow *Newsletter - send* doet alleen iets als het label
   door de eigenaar van de repo is gezet, op een open issue met het label
   `newsletter` dat door de workflow zelf is geopend. Als de job start, kijkt
   hij opnieuw of het label er nog op staat (ook bij een handmatige run). Uit
   het issue leest hij alleen de maand, de versie en de vinkjes, en alleen
   zichtbare regels: vinkjes in HTML-commentaar of codeblokken tellen niet.
   De rest komt van de statusbranch.
3. **Inplannen**: per aangevinkte taal moet het concept nog precies gelijk zijn
   aan de proefmail (vingerafdruk over naam, segment, topic, afzender,
   onderwerp, reply-to, voorbeeldtekst, HTML en tekst). Dan wordt het ingepland
   voor de eerstvolgende 07:00 UTC die minstens 2 uur later valt. Niet
   aangevinkte talen worden verwijderd en hun artikelen schuiven door. Lukt het
   bij een taal niet, dan zet de workflow een reactie op het issue en haalt hij
   het label weg; opnieuw zetten start een nieuwe poging.
4. **Na verzending** zet de dagelijkse stap de taal op `sent`. Wie een geplande
   broadcast in Resend verwijdert, annuleert hem; de straat ziet dat de dag erna
   en zet de artikelen terug in de pool. De dagelijkse stap houdt ook concepten
   bij: nam Resend een verzendopdracht aan terwijl het antwoord verloren ging,
   dan staat de taal de volgende dag toch op `scheduled` of `sent`, zodat de
   artikelen niet nog eens meegaan.

Zonder goedkeuring komt er op dag 7 en dag 14 een herinnering op het issue. Op
dag 21 worden de concepten verwijderd en sluit het issue. De artikelen gaan dan
mee in het volgende nummer. Er wacht nooit meer dan één nummer tegelijk: zodra
het nummer van een nieuwe maand wordt klaargezet, vervalt een ouder nummer dat
nog wacht. Zo kunnen dezelfde artikelen niet in twee goedgekeurde nummers
belanden.

**Wijzig een concept niet in Resend.** Dan klopt de vingerafdruk niet meer en
weigert de straat het in te plannen. Pas liever de inhoud in de repo aan en
draai *Newsletter - daily* met de hand, met `rebuild` aan en `dry_run` uit. Dat
kan alleen zolang er van dat nummer nog niets is ingepland. Het oude issue gaat
dan dicht en er komen nieuwe concepten, proefmails en een nieuw issue met een
eigen titel ("Nieuwsbrief JJJJ-MM (versie 2)"); het oude issue keurt niets meer
goed. Een handmatige run met `dry_run` aan (de standaard) maakt niets aan.

### Statusbranch `newsletter-state`

Een losse branch zonder gemeenschappelijke geschiedenis met `master`
(`scripts/newsletter-state.sh`, zelfde patroon als `social-queue` in de
app-repo), met `issues/JJJJ-MM.json` per nummer. Per taal staan daarin de
status (`draft`, `scheduled`, `sent`, `skipped`, `expired`, `cancelled`,
`empty`), het broadcast-ID, de vingerafdruk, het onderwerp en de verstuurde
items (`tip:<id>`, `blog:<id>`, `app:<versie>`). Er staan **geen e-mailadressen
of aantallen** in. Dat is nodig, want de repo is openbaar. Een nummer dat bij
het klaarzetten halverwege stukging (`complete: false`), wordt de volgende dag
opnieuw gebouwd: oude concepten met dezelfde naam worden eerst opgeruimd.

### Geheimen (GitHub → Settings → Secrets and variables → Actions)

- `RESEND_NEWSLETTER_API_KEY`: een **aparte** Resend-sleutel met volledige
  toegang, alleen voor deze workflows. Broadcasts vragen volledige toegang.
  Apart, zodat hij los van de website kan worden ingetrokken.
- `NEWSLETTER_PREVIEW_TO`: het adres voor de proefmails.

### Veiligheid in een openbare repo

Actions-minuten kosten hier niets, maar issues en run-logs zijn openbaar. Het
script schrijft nooit een adres naar een log of bestand (foutmeldingen worden
geschoond) en GitHub maskeert de geheimen. Issue-tekst komt nooit in een
`run:`-regel. Acties zijn op een commit vastgezet en de workflows installeren
geen npm-pakketten: het script gebruikt alleen Node en `fetch`.
`tests/newsletter-issue.test.mjs` controleert dat.

### Zelf bekijken en testen

```bash
node scripts/newsletter.mjs preview --out /tmp/nieuwsbrief --today 2026-12-07
```

Dit schrijft per taal HTML en tekst. Er gaat niets naar Resend.

```bash
node scripts/newsletter.mjs e2e-test --locale nl --topic <test-topic-id> --execute
```

Dit verstuurt één taal echt, als broadcast naar een apart testtopic. Het
script weigert een taaltopic. Het gebruikt dezelfde aanroepen als een echt
nummer: concept maken, teruglezen, proefmail (als `NEWSLETTER_PREVIEW_TO` is
gezet) en inplannen met `scheduled_at`, 3 minuten later. Zo is het hele
Resend-pad getest, inclusief de echte afmeldlink.

### Bekende grenzen

- **Aanvoer**: de tips lopen tot 20 januari 2027 en de blog tot 3 december
  2026. Daarna bestaat een nummer alleen nog uit app-nieuws, of het wordt
  overgeslagen. De nieuwsbrief leeft zolang er nieuwe artikelen of
  app-versies komen.
- **Vertaling**: de vier vaste zinnen (`ISSUE_COPY` in
  `src/lib/newsletter-issue.mjs`) zijn met DeepL vertaald en door Antigravity
  aan het glossarium gecontroleerd. Net als de tips heeft geen moedertaalspreker
  ze nagelezen. De rest (aanhef, afmeldregel, kopjes, knoppen) komt uit
  bestaande teksten van de welkomstmail en de tips- en blogpagina's.
- **App Store-tekst**: de straat gebruikt wat Apple per land teruggeeft. Ontbreekt
  daar een vertaling, dan kan die tekst in een andere taal staan.
- **Na het inplannen** kan iemand met toegang tot Resend een geplande broadcast
  nog wijzigen. De straat controleert vlak voor het inplannen, niet bij de
  verzending.
- **Geplande workflows in een openbare repo** zet GitHub na 60 dagen zonder
  activiteit in de repo uit (met een mail vooraf). Mislukt de dagelijkse stap,
  dan opent de workflow het issue "Nieuwsbrief: dagelijkse stap mislukt"
  (label `newsletter-alert`).

Verstuur nooit iets naar de lijst buiten deze straat om zonder Hans'
uitdrukkelijke ja.

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

`tests/newsletter-issue.test.mjs` (ook in `npm run test:seo`) test de maandelijkse
nieuwsbrief: welke artikelen meegaan, de opmaak in zes talen met afmeldlink en
escaping, het tijdstip van verzending, het goedkeuringsissue, de vingerafdruk,
de weigering van een concept zonder topic, en de beveiligingsregels van de
workflows.
