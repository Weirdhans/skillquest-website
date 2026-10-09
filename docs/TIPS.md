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

## Taalwissel

Een slug uit een andere taal (`/en/tips/kind-wil-niet-lezen`, na de taalkeuze in
de navigatie) stuurt permanent door naar de versie in die taal.
