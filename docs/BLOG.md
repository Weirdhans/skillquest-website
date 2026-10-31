# Blog

Vergelijkingen en gidsen (Pomodoro-apps, Habitica, schermtijd, door ouders
beheerde timers) onder de naam van Hans Vlasblom. Ze staan op `/{taal}/blog` en
`/{taal}/blog/{slug}`, in zes talen, naast de praktische oefentips onder
`/{taal}/tips` (zie `docs/TIPS.md`). De opzet en het publicatiemechanisme zijn
dezelfde als bij tips.

## Waar alles staat

| Wat | Bestand |
|---|---|
| Teksten per taal | `src/content/blog/{nl,en,de,fr,es,it}.json` (`ui` + `articles`; `body` is Markdown) |
| Laden, hreflang, paden, links | `src/lib/blog.ts` |
| Wanneer een artikel openbaar is | `src/lib/tips-publication.mjs` (`isPublished`, gedeeld met tips) |
| Markdown renderen (kopjes, lijsten, tabellen, vet, cursief, links) | `src/components/BlogBody.tsx` |
| Footerlink "Blog" (alleen als de taal een openbaar artikel heeft) | `src/components/BlogNavContext.tsx`, `src/lib/blog-nav.ts`, `src/components/Footer.tsx`, `src/app/[locale]/layout.tsx` |
| Overzicht | `src/app/[locale]/blog/page.tsx` |
| Artikel (Article- en FAQ-structured data, canonical, hreflang, OG) | `src/app/[locale]/blog/[slug]/page.tsx` |
| RSS-feed per taal | `src/app/feeds/[file]/route.ts` → `/feeds/blog-{taal}.xml` |
| Sitemap | `src/app/sitemap.ts` |
| Tests | `tests/blog.test.mjs` (draait mee in `npm run test:seo`) |

Er is geen aparte OG-afbeelding per artikel: net als de tips-pagina's gebruikt
het artikel `/og/skillquest-og.png` (de feed gebruikt dezelfde afbeelding).

## Schema (besluit Hans, 31 oktober 2026)

Een artikel per week, elke donderdag vanaf 5 november 2026, in alle talen op
dezelfde dag (`publishedAt`, vanaf 00:00 UTC):

| publishedAt | id | Opmerking |
|---|---|---|
| 2026-11-05 | `best-pomodoro-app-for-students` | |
| 2026-11-12 | `pomodoro-vs-deep-work-vs-flowtime` | |
| 2026-11-19 | `family-screen-time-alternative` | |
| 2026-11-26 | `how-parent-managed-timers-work` | |
| 2026-12-03 | `skillquest-vs-habitica` | Als laatste: linkt naar drie andere artikelen |

Een link naar een artikel (of tip) dat nog niet openbaar is, wordt als gewone
tekst getoond in plaats van als dode link (`resolveBlogHref`). Daardoor kan de
volgorde ook gewijzigd worden zonder dat er een 404 ontstaat.

## Hoe een artikel vanzelf verschijnt

- De pagina's onder `/{taal}/blog` zijn dynamisch (`force-dynamic` op het
  artikel, per verzoek gerenderd op het overzicht): de datumcontrole draait bij
  elk bezoek. Een artikel is er om 00:00 UTC, een eerdere datum geeft 404.
- Sitemap en feeds zijn statisch met `revalidate = 3600`: ze lopen hooguit een
  uur achter, zonder nieuwe deploy. De feed bestaat al vóór het eerste artikel
  (leeg) en vult zich vanzelf.
- De footerlink "Blog" staat er pas zodra de taal een openbaar artikel heeft.
- Alleen `src/lib/blog.ts` leest `src/content/blog` (test), dus elke pagina ziet
  hetzelfde filter.
- De artikelpagina heeft bewust geen `generateStaticParams`: voor 5 november zou
  die lijst leeg zijn, en Next.js zou de route dan als statisch behandelen en de
  404 vastzetten.

## Een artikel toevoegen of wijzigen

1. Voeg het artikel in `en.json` toe en in de andere vijf: velden zoals de
   bestaande (`id`, `slug` per taal, `eyebrow` = categorie, `title`, `metaTitle`
   ≤ 60, `metaDescription` ≤ 160, `intro` = eerste alinea, `cardSummary`,
   `publishedAt`, `readingMinutes`, `authorRole`, `related`, `body`,
   `faqHeading`, `faq`). Links in de tekst staan als `/{taal}/blog/{slug}` of
   `/{taal}/tips/{slug}` met de slug van die taal; de test controleert dat ze
   bestaan.
2. `npm run test:seo`, `npx tsc --noEmit -p .`, `npx eslint .`, `npm run build`.

Een datum wijzigen is een wijziging van `publishedAt` in de zes bestanden
(dezelfde dag in alle talen; een test bewaakt het schema) en een nieuwe deploy.

## Inhoudsregels (getest waar dat kan)

- Auteur: Hans Vlasblom ("Father and creator of SkillQuest" in de byline).
- Geen naam, leeftijd of foto van Hans' zoon; geen uitspraken over wat de app
  voor een kind doet ("leest beter"). De artikelen vertellen alleen hoe het idee
  ontstond.
- Actieve dagen resetten nooit; geen freeze en geen streak-verlies.
- Habitica staat in de titel van de vergelijking, in elke taal.

## Bekende openstaande punten

- **Vertalingen**: nl, de, fr, es en it zijn gemaakt en gecontroleerd met Gemini
  Flash, door geen enkele moedertaallezer nagelezen (zie het README van de
  drafts in de app-repo, `docs/marketing/blog-drafts/`). De zoekwoorden en slugs
  per taal zijn door het model gekozen.
- De zin "er is geen streak om te verliezen" staat nog in
  `best-pomodoro-app-for-students` en `skillquest-vs-habitica` (alle talen),
  met "streak-freezes" in het Habitica-artikel. `tests/blog.test.mjs` staat die
  twee artikelen toe en laat nieuwe vermeldingen elders falen. Hans beslist of
  ze blijven.
- Links naar `/{taal}/family` bestaan niet; ze zijn naar `/{taal}/parents`
  omgezet.
