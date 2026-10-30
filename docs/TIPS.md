# Tips-artikelen

Artikelen die antwoord geven op vragen die mensen zoeken, zoals "kind wil niet
lezen". Ze staan op `/{taal}/tips` en `/{taal}/tips/{slug}`, in zes talen, en
leveren per artikel ook een Pinterest-afbeelding.

## Waar alles staat

| Wat | Bestand |
|---|---|
| Teksten per taal | `src/content/tips/{nl,en,de,fr,es,it}.json` (`ui` + `articles`) |
| Laden, hreflang, paden | `src/lib/tips.ts` |
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

## Voorraad december 2026 en januari 2027

De branch `tips/stock-2026-12` bevat acht extra artikelen in alle zes talen (nog
niet gemerged; Hans keurt goed). `publishedAt` is de geplande woensdag; de
site filtert niet op datum, dus een merge zet alles direct online. Wil je
druppelen, haal dan de artikelen van latere weken uit de zes JSON-bestanden
(op `id`) en zet ze in een volgende commit terug. De Pinterest-CSV in de app-repo
(`docs/marketing/pinterest/`) plant pins niet vóór `publishedAt`.

| publishedAt | id | Engelse zoekvraag |
|---|---|---|
| 2026-12-02 | `child-practice-during-holidays` | should my child practice during the school holidays |
| 2026-12-09 | `help-child-stick-with-new-hobby` | how to help my child stick with a new hobby |
| 2026-12-16 | `should-you-reward-kids-for-practicing` | should you reward kids for practicing |
| 2026-12-23 | `child-gets-frustrated-learning` | my child gets frustrated when something does not work right away |
| 2026-12-30 | `child-rushes-through-practice` | my child rushes through homework and practice just to be done |
| 2027-01-06 | `back-into-routine-after-holidays` | how to get kids back into a routine after the holidays |
| 2027-01-13 | `when-to-let-child-quit-activity` | when should I let my child quit an activity |
| 2027-01-20 | `practice-without-constant-reminders` | how to get my child to practice without being reminded all the time |

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
