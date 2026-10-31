# Tips-artikelen

Artikelen die antwoord geven op vragen die mensen zoeken, zoals "kind wil niet
lezen". Ze staan op `/{taal}/tips` en `/{taal}/tips/{slug}`, in zes talen, en
leveren per artikel ook een Pinterest-afbeelding.

## Waar alles staat

| Wat | Bestand |
|---|---|
| Teksten per taal | `src/content/tips/{nl,en,de,fr,es,it}.json` (`ui` + `articles`) |
| Laden, hreflang, paden | `src/lib/tips.ts` |
| Wanneer een artikel openbaar is | `src/lib/tips-publication.mjs` (`isPublished`, UTC); zie "Publicatiedatum" hieronder |
| Footerlabel per taal | `src/lib/tips-nav.ts` (moet overeenkomen met `ui.eyebrow`; getest) |
| Overzichtspagina | `src/app/[locale]/tips/page.tsx` |
| Artikelpagina | `src/app/[locale]/tips/[slug]/page.tsx` (Article- en FAQ-structured data) |
| Pin-afbeelding 1000×1500 | `src/app/tips-pins/[locale]/[file]/route.tsx` → `/tips-pins/{taal}/{slug}.png` |
| RSS-feed per taal | `src/app/feeds/[file]/route.ts` → `/feeds/tips-{taal}.xml` |
| Sitemap | `src/app/sitemap.ts` (alleen talen die artikelen hebben) |
| Vertaalscript | `scripts/translate-tips.py` (DeepL, bron `en.json`) |
| Tests | `tests/tips.test.mjs` (draait mee in `npm run test:seo`) |

## Een artikel toevoegen

1. Schrijf het in het Engels in `src/content/tips/en.json`: dezelfde velden
   als de bestaande artikelen, plus `slugs` voor nl, de, fr, es en it
   (zoekwoorden in die taal, zonder accenten). Kies de zoekvraag in het Engels,
   niet als vertaling van een Nederlandse vraag. `metaDescription` maximaal 135 tekens, zodat vertalingen
   onder 160 blijven. Auteur: Hans Vlasblom.
2. Vertaal met DeepL:
   `python scripts/translate-tips.py --env-file ../skillquest/.env.tools.local`
   Engels is de bron; DeepL maakt nl, de, fr, es en it. Bestaande vertalingen
   blijven staan; `--force` vertaalt alles opnieuw.
3. Lees elke vertaling na tegen `docs/TRANSLATION_DECISIONS_GLOSSARY.md` in de
   app-repo. Bekende DeepL-fouten: fr "chronomètre" (moet "minuteur"), es
   "cronómetro" (moet "temporizador"), de "Fertigkeit" (moet "Fähigkeit"),
   Engelse Title Case, een gebiedende wijs als kopje ("Leggi" in plaats van
   "Lettura"), zinnen die letterlijk verkeerd lopen ("deja de jugar").
4. `npm run test:seo`, `npx tsc --noEmit -p .`, `npm run build`.
5. Na publicatie: maak een Pinterest-CSV voor het nieuwe artikel (zie
   `docs/marketing/README.md` in de app-repo) en laat Hans die uploaden.

De wekelijkse routine "SkillQuest: wekelijks Tips-artikel" doet stap 1 tot en
met 4 elke woensdag op een eigen branch `tips/JJJJ-WW` en pusht niet. Hans keurt
goed met "publiceer tip JJJJ-WW".

## Regels voor de inhoud

- Alleen echte feiten over Hans en zijn zoon; niets verzinnen (geen cijfers,
  onderzoeken of citaten zonder geopende bron).
- In het Nederlands heet de familiefunctie "familiefunctie" (de app zegt
  "Familie"), niet "gezinsmodus".
- Titel: begint met de zoekvraag, genderneutraal, zonder belofte ("Zo pak je het
  aan", niet "Zo wordt het weer leuker").
- Het artikel moet ook nuttig zijn voor wie de app nooit installeert.

## Publicatiedatum: een artikel verschijnt vanzelf

`publishedAt` (`JJJJ-MM-DD`) is de dag waarop een artikel openbaar wordt, **vanaf
00:00 UTC** (01:00 in de winter in Nederland, 02:00 in de zomer). Een artikel met
een datum in de toekomst bestaat voor de buitenwereld niet: het staat niet in de
lijst `/{taal}/tips`, de artikelpagina geeft 404, het staat niet in
`sitemap.xml`, niet in de hreflang-links van andere artikelen, niet in de
RSS-feed (`/feeds/tips-{taal}.xml`) en de pinafbeelding (`/tips-pins/...png`)
geeft 404. Een datum die geen gewone `JJJJ-MM-DD` is, publiceert nooit.

Hoe het werkt (besluit 31 oktober 2026, geen handmatig werk per week):

- Alle code die artikelen toont gaat via `src/lib/tips.ts`, dat filtert met
  `isPublished` uit `src/lib/tips-publication.mjs`. Een test controleert dat geen
  enkel ander bestand de artikeltekst direct leest.
- De pagina's onder `/{taal}/tips` worden bij elk bezoek gerenderd (`next build`
  toont ze als dynamisch), dus de datumcontrole draait steeds opnieuw en een
  artikel verschijnt om 00:00 UTC.
- Sitemap, RSS-feeds en pinafbeeldingen zijn statisch maar hebben
  `revalidate = 3600`: ze worden hooguit een uur na middernacht UTC ververst,
  zonder nieuwe deploy. Next.js serveert na het verlopen eerst nog de oude versie
  (stale-while-revalidate) en bouwt de nieuwe bij dat bezoek; het volgende bezoek
  krijgt de nieuwe. Dat is lokaal getest met een nagebootste klok: de feed, de
  sitemap en de pinafbeelding sloegen om na de verversing, en een 404 op de
  pinafbeelding bleef daarna niet hangen.
- Waarom geen cron of deploy-hook: dit werkt zonder geheimen of
  Vercel-instellingen en zonder dat iemand iets hoeft te doen. Een dagelijkse
  Vercel-cron die `revalidatePath` aanroept zou het een uur eerder kunnen laten
  gebeuren, maar dat is niet nodig. Pinterest-pins staan pas een dag na
  `publishedAt` gepland.
- `revalidate` moet een letterlijk getal zijn (Next.js leest geen geïmporteerde
  waarde); `tests/tips.test.mjs` controleert dat alle vijf bestanden `3600` hebben.
- Gevolg voor Pinterest: de pinafbeelding van een artikel dat nog niet openbaar
  is, geeft 404. Plan een CSV-rij dus niet vóór `publishedAt` (het script doet dat
  al niet) en upload een CSV met pins van later alleen als Pinterest de afbeelding
  pas bij het publiceren ophaalt (nog niet getest; zie de Pinterest-README in de app-repo).

## Voorraad december 2026 en januari 2027

De branch `tips/stock-2026-12` bevat acht extra artikelen in alle zes talen. Ze
gaan **in één keer** naar `master`; `publishedAt` bepaalt wanneer elk artikel
zichtbaar wordt. Per artikel is de datum in alle zes talen dezelfde (een test
controleert dat voor artikelen met een toekomstige datum). De data staan een
week uit elkaar op woensdag, van 2 december 2026 tot 20 januari 2027 (49 dagen);
samen met de eerste pin van elk artikel (de dag erna) beslaat het schema de
bekende 60 dagen van het Pinterest-plan (1 december tot en met begin
februari). De Pinterest-CSV in de app-repo (`docs/marketing/pinterest/`) plant een
pin niet vóór `publishedAt` plus een dag.

| publishedAt (UTC, alle talen) | id | Engelse zoekvraag |
|---|---|---|
| 2026-12-02 | `child-practice-during-holidays` | should my child practice during the school holidays |
| 2026-12-09 | `help-child-stick-with-new-hobby` | how to help my child stick with a new hobby |
| 2026-12-16 | `should-you-reward-kids-for-practicing` | should you reward kids for practicing |
| 2026-12-23 | `child-gets-frustrated-learning` | my child gets frustrated when something does not work right away |
| 2026-12-30 | `child-rushes-through-practice` | my child rushes through homework and practice just to be done |
| 2027-01-06 | `back-into-routine-after-holidays` | how to get kids back into a routine after the holidays |
| 2027-01-13 | `when-to-let-child-quit-activity` | when should I let my child quit an activity |
| 2027-01-20 | `practice-without-constant-reminders` | how to get my child to practice without being reminded all the time |

**Alle zes talen tegelijk, ook es en it, zonder nalezen (besluit Hans, 30 oktober 2026).**
De artikelen in alle talen zijn gemaakt met DeepL en gecontroleerd door Antigravity
aan `docs/TRANSLATION_DECISIONS_GLOSSARY.md` in de app-repo, maar **de Spaanse en
Italiaanse (en de Franse en Duitse) zijn niet nagelezen door iemand die de taal als
moedertaal spreekt**; Hans koos hier bewust voor. Komt er later een fout aan het
licht, verbeter die dan in `src/content/tips/{taal}.json`; dat is een gewone
wijziging op `master`. Verander een slug alleen met een doorverwijzing van de oude
naar de nieuwe.

**Het mergen is eenmalig.** Er is geen wekelijks werk meer. Een datum aanpassen
(naar eerder, later of vandaag) is een wijziging van `publishedAt` in de zes
JSON-bestanden en een nieuwe deploy.

Vóór de merge moet gelden (zie ook de checklist in het rapport van de sessie):

```bash
git fetch origin && git switch tips/stock-2026-12   # of een branch met deze commits
npm run test:seo && npx tsc --noEmit -p . && npx eslint . && npm run build
```

Na de merge: open `/{taal}/tips` en controleer dat alleen de artikelen met een
datum van vandaag of eerder erop staan, en dat `sitemap.xml` ze alleen noemt.
Op de dag van elk artikel (na 00:00 UTC) staat het artikel binnen een uur ook in
de sitemap en de feed; draai daarna in de app-repo
`python tools/pinterest_bulk_csv.py --verify-urls docs/marketing/pinterest/out/weekly/pins-<week>.csv`
voordat je dat weekbestand uploadt.

Per taal is de slug gebouwd op de zoekterm van ouders in dat land (zie `slugs`
in `en.json`), niet op een vertaling van de Engelse zin.

Gecontroleerd op 30 oktober 2026 (ronde 2): de uitleg over actieve dagen volgt de
app (geen streak freeze meer; "actieve dagen tellen op, een gemiste dag zet je
totaal niet terug"), de familiefunctie heet in de teksten "Family plan" (nl
"familieabonnement", de "Familienplan", fr "abonnement familial", es "plan
familiar", it "piano famiglia"), en de Android-knop op elk artikel gaat naar de
Play Store (`ANDROID_STORE_URL`), zonder testverwijzing. De vertalingen zijn
daarna gericht verbeterd: DeepL (via de DeepL-koppeling, gratis plan) voor de
zinnen, met de hand ingepast in de bestaande informele tekst, daarna door
Antigravity gecontroleerd aan het vertaalglossarium. Titels en slugs die in de
vertaling een woord kwijt waren, zijn aangepast; er staat nog niets live, dus
er hoeven geen doorverwijzingen bij.

## Taalwissel

Een slug uit een andere taal (`/en/tips/kind-wil-niet-lezen`, na de taalkeuze in
de navigatie) stuurt permanent door naar de versie in die taal.
