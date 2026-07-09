# SkillQuest functionaliteits- en SEO-inventarisatie

Datum: 2026-07-09  
Scope: website en marketingcopy voor `skillquest-website`  
Primaire bron: Flutter-app, echte screenshots, store metadata, websitecopy en repo-documentatie

## Promptkeuzes verwerkt

De prompt is aangescherpt met de keuzes uit het gesprek:

- Focus ligt op website/marketingcopy, niet op een interne productroadmap.
- Alle doelgroepen krijgen gelijk gewicht: zelfontwikkeling, ouders/gezinnen, studenten/leren, focus/productiviteit, sociale motivatie en Premium/Family gebruikers.
- Mijn advies is verwerkt: groepeer niet alleen per interne feature, maar per klanttaak en zoekintentie. Dat werkt beter voor SEO, omdat mensen zoeken naar concrete problemen zoals "focus timer", "habit tracker", "parent dashboard", "study timer" en "progress tracking".
- Concurrentie- en zoekintentieonderzoek is toegestaan en is meegenomen.
- Claims worden feitelijk gehouden. Onduidelijke of risicovolle claims staan apart bij "Claims voorzichtig formuleren".

## Strategisch advies

Positioneer SkillQuest als een skill tracker met focus timers, XP, voortgang en gezinsbegeleiding. Niet als alleen een habit tracker en niet als alleen een Pomodoro-app.

Waarom:

- "Skill tracker" onderscheidt SkillQuest van generieke to-do en habit apps.
- "Focus timer", "Pomodoro timer", "study timer" en "progress tracking" sluiten direct aan op zoekintentie.
- De Family-laag is een sterk betaald argument, maar moet gaan over structuur, doelen en zichtbare oefentijd, niet over zware oudercontrole.
- De huidige site heeft al goede basispagina's, maar mist nog SEO-landingspagina's per use case. Concurrenten gebruiken duidelijke pagina's rond focus, habits, challenges, parent dashboard en progress insights.

Aanbevolen kernzin:

> SkillQuest helpt je vaardigheden opbouwen met focus timers, XP, levels, statistieken, vrienden, challenges en Family-tools voor ouder-gestuurde oefentijd.

## Geraadpleegde bronnen

Lokale productbronnen:

- `lib/features/timer/models/timer_models.dart`: Pomodoro, 52-17, Deep Work, Flowtime, Until Time en EMOM.
- `lib/features/timer/view/widgets/technique_selector_widget.dart`: custom duur, smart breaks, EMOM-instellingen.
- `lib/core/models/subscription_models.dart`: Premium features en prijzen.
- `lib/core/providers/subscription_providers.dart`: feature access voor Premium.
- `lib/features/family/models/family_enums.dart`: ouder-, kind- en familieprivileges.
- `lib/features/family/view/family_timer_screen.dart`: timer starten voor familielid/kind.
- `lib/features/family/models/family_timer_session.dart`: sessie wordt aan kind gekoppeld.
- `lib/features/goals/models/skill_goal.dart` en `lib/features/goals/providers/goal_providers.dart`: weekdoelen, parent-created goals, child goals.
- `lib/features/compliments/models/compliment.dart`: complimenten van ouder/gebruiker naar kind/gebruiker.
- `docs/features/STREAK_SYSTEM.md`: 10 XP per dag, streak freezes, theme unlocks.
- `docs/features/SOCIAL_FRIENDS_STATS.md`: vriendstatistieken, privacy toggle, activity feed.
- `docs/THEME_SYSTEM.md`: light/dark/system mode en unlockbare themes.
- `lib/core/docs/GUEST_STATE_ARCHITECTURE.md`: Guest Mode en restricted features.
- `lib/features/rankings/models/*` en `lib/features/social/models/challenge.dart`: rankings, leagues, challenges.
- `store_screenshots/final/android/phone_portrait/*`: echte screenshots per locale.
- `store_metadata/source/en-US.json` en `store_metadata/localized/nl-NL.json`: storecopy en keywords.
- `src/lib/marketing.ts` en `src/components/MarketingPages.tsx`: huidige websitecopy en structuur.

Externe bronnen voor zoekintentie en concurrentietaal:

- Forest: focus app, zichtbare voortgang, focus statistics, group focus. https://forestapp.cc/
- Habitica: gamified habit/productivity app met XP, levels, parties en challenges. https://play.google.com/store/apps/details?id=com.habitrpg.android.habitica
- Focus To-Do: Pomodoro, taakmanagement, rapportage en focus time. https://www.focustodo.cn/
- Streaks: habits, streaks, "don't break the chain", statistieken. https://streaksapp.com/
- Habitify: habit tracker, progress insights, challenges, built-in timer. https://habitify.me/
- Joon: parent/kids routines, parent-assigned tasks, progress monitoring. https://www.joonapp.io/
- Amazon Kids Parent Dashboard: parent dashboard, child activity, family controls. https://play.google.com/store/apps/details?id=com.amazon.tahoe.grownups
- Google Search Central: people-first content, descriptive titles, unique meta descriptions. https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Feature inventory

### 1. Skill tracking en startpunt

| Klantvriendelijke naam | Productbewijs | Plan | Doelgroepen | Voordeel | SEO / pagina |
| --- | --- | --- | --- | --- | --- |
| Skill tracker voor echte oefentijd | `Skill`, `UserSkillService`, screenshots `01-home-progress` | Free basis, Premium mogelijk voor uitbreidingen | Iedereen | Gebruiker ziet per vaardigheid tijd, XP, level en activiteit. | `/features/skill-tracker`, homepage |
| 78 herkenbare skill-iconen | `skill_icon_type.dart` vermeldt 78 unieke iconen | Free basis | Zelfontwikkeling, studenten, gezinnen | Minder setup-frictie: starten met herkenbare categorieen zoals studie, sport, muziek, lezen, code. | Features, download |
| Favoriete en meest gebruikte skills | `home_providers.dart`, favorite/top used skills | Free basis | Iedereen | Snel terug naar de skills die belangrijk zijn. | Homepage, features |
| Meertalige skill-zoekdata | `skill_localization_service.dart`, zes locales | Free basis | Internationale gebruikers | Lokale taal maakt onboarding begrijpelijker. | Locale SEO, download |
| Guest Mode | `guest_state_models.dart`, `GUEST_STATE_ARCHITECTURE.md` | Free | Nieuwe bezoekers | Proberen zonder account; later converteren naar account/sync. | Homepage, pricing, FAQ |

Marketingtaal:

- "Kies een skill, start een focus timer en zie je voortgang groeien."
- "Geen lege gewoonte-lijst, maar oefentijd die gekoppeld is aan vaardigheden."

Voorzichtig:

- Claim niet "onbeperkt eigen skills aanmaken" totdat de productie-UX daarvoor is bevestigd. De code wijst vooral op centrale skill definitions en admin-managed skills.

### 2. Focus timers

| Klantvriendelijke naam | Productbewijs | Plan | Doelgroepen | Voordeel | SEO / pagina |
| --- | --- | --- | --- | --- | --- |
| Focus Timer | `timer_models.dart`, screenshot `02-focus-timer` | Free basis | Iedereen | Elke sessie is gekoppeld aan een skill, dus tijd wordt voortgang. | `/features/focus-timer`, homepage |
| Pomodoro timer | `TimerTechnique.pomodoro` | Free basis | Studenten, focus/productiviteit | Bekende 25/5 structuur voor studie en werk. | `/features/pomodoro-timer` |
| 52-17 timer | `TimerTechnique.rule5217`, PremiumFeatures timer techniques | Premium | Focus/productiviteit | Langere focusblokken met vaste pauze. | Features, Premium |
| Deep Work timer | `TimerTechnique.deepWork`, PremiumFeatures timer techniques | Premium | Professionals, studenten | 90-minuten focusblok voor diep werk. | `/features/deep-work-timer` |
| Flowtime timer | `TimerTechnique.flowtime`, custom duration | Premium/custom timers | Zelfontwikkeling, creatief werk | Flexibele sessieduur met smart break. | `/features/flowtime-timer` |
| Until Time timer | `TimerTechnique.untilTime` | Check paywall status | Studenten, planners | Werken tot een gekozen eindtijd. | Focus timer page |
| EMOM intervaltimer | `TimerTechnique.emom`, EMOM rounds/seconds | Check paywall status | Sport, training, actieve routines | Ronde-gebaseerde intervalfocus. | Niche landing, features |
| Smart breaks | `getBreakDuration`, `includeBreak` | Free/Premium afhankelijk techniek | Focus/productiviteit | Pauzeduur past bij focustijd. | Focus timer page |
| Audio cues en timergeluiden | `assets/audio`, audio settings l10n | Free basis, Premium audio | Iedereen | Minder schermchecken tijdens sessies. | Features, Premium |
| Live/background timer-notificaties | `background_timer_service.dart`, notification docs | Free basis | iOS/Android gebruikers | Timer blijft bruikbaar buiten het hoofdscherm. | Download, FAQ |

Marketingtaal:

- "Start een timer voor precies de vaardigheid waar je aan werkt."
- "Van Pomodoro tot Deep Work en Flowtime: kies de focusvorm die past bij je taak."

Voorzichtig:

- Vermijd "blokkeert apps" of "voorkomt afleiding" tenzij app blocking echt bestaat. Forest gebruikt die claim; SkillQuest draait meer om skill-gekoppelde focus.
- Vermeld EMOM alleen als fitness/interval-use-case, niet als algemene Pomodoro-vervanger.

### 3. XP, levels, streaks en beloningen

| Klantvriendelijke naam | Productbewijs | Plan | Doelgroepen | Voordeel | SEO / pagina |
| --- | --- | --- | --- | --- | --- |
| XP per focussessie | `family_timer_session.xpGained`, `xp_level_calculator`, screenshots | Free basis | Iedereen | Elke minuut voelt meetbaar. | Homepage, features |
| Levels per skill | `Skill.level`, `xp_level_calculator` | Free basis | Zelfontwikkeling, studenten | Groei is zichtbaar per vaardigheid. | Skill tracker page |
| Dagelijkse streak | `STREAK_SYSTEM.md`: 10 XP per dag | Free basis | Habit/focus gebruikers | Consistentie wordt zichtbaar. | `/features/streaks` |
| Streak freezes | `STREAK_SYSTEM.md` | Free/Premium check nodig | Habit gebruikers | Een gemiste dag hoeft niet direct alles te breken. | Streaks FAQ |
| Theme unlocks door progressie | `STREAK_SYSTEM.md`, `THEME_SYSTEM.md` | Free/Premium afhankelijk theme | Gamification, Premium | Beloningen voelen persoonlijk en zichtbaar. | Features, Premium |
| Session reward screen | screenshot `03-session-reward` | Free basis | Iedereen | Positieve feedback na afronden. | Homepage visuals |
| Progress notifications | `progress_notification_service.dart`, l10n weekly/monthly/yearly | Opt-in | Terugkerende gebruikers | Week-, maand- en jaaroverzichten houden motivatie vast. | FAQ, trust/privacy |

Marketingtaal:

- "Verdien XP voor de tijd die je investeert."
- "Maak consistent oefenen zichtbaar met levels, streaks en voortgang per skill."

Voorzichtig:

- Geen "bewezen 43% betere consistentie" of vergelijkbare resultaten zonder eigen data. De oude Play Store doc bevat zulke claims; niet gebruiken.

### 4. Statistieken en voortgang

| Klantvriendelijke naam | Productbewijs | Plan | Doelgroepen | Voordeel | SEO / pagina |
| --- | --- | --- | --- | --- | --- |
| Statistieken per dag/week/maand/jaar | `stats` feature, l10n, screenshot `04-statistics` | Basic + Premium advanced | Iedereen | Gebruiker ziet waar de tijd naartoe gaat. | `/features/progress-statistics` |
| Skill breakdown | child stats l10n, stats widgets | Basic + Premium advanced | Studenten, ouders, zelfontwikkeling | Zicht op welke vaardigheden echt aandacht krijgen. | Features |
| Sessiehistorie | timer persistence interfaces, Premium unlimited history | Basic beperkt, Premium uitgebreid | Power users | Terugkijken op oefengedrag. | Premium |
| Data export | `PremiumFeatures.dataExport` | Premium | Professionals, power users | Eigen analyse of rapportage buiten de app. | Pricing, FAQ |
| Child stats dashboard | `child_stats_*` l10n, family providers | Family | Ouders/gezinnen | Ouders zien sessies, minuten, XP, skill breakdown en recente activiteit. | `/features/family`, pricing |

Marketingtaal:

- "Zie niet alleen dat je geoefend hebt, maar waaraan, hoe lang en met welk resultaat."
- "Voor ouders: gesprekken over oefenen worden gebaseerd op zichtbare inzet."

Voorzichtig:

- Data export staat als Premium feature in het model. Controleer de zichtbare UI voordat dit prominent op homepage/pricing komt.

### 5. Social motivatie, challenges en rankings

| Klantvriendelijke naam | Productbewijs | Plan | Doelgroepen | Voordeel | SEO / pagina |
| --- | --- | --- | --- | --- | --- |
| Vrienden toevoegen | `social` feature, friend invite l10n | Account vereist | Sociale motivatie | Accountability met bekenden. | `/features/friends-challenges` |
| Vriendstatistieken met privacy toggle | `SOCIAL_FRIENDS_STATS.md` | Account vereist | Sociale motivatie | Delen kan, maar staat onder controle van de gebruiker. | Trust, features |
| Challenges | `challenge.dart`: XP Race, Active Days Battle; UI ondersteunt creation options | Account vereist | Studenten, vrienden, gezinnen | Samen naar een doel werken. | Features, FAQ |
| Challenge detail met progress/activity | `challenge_detail_screen`, l10n | Account vereist | Sociale motivatie | Zicht op wie voorloopt en welke sessies meetellen. | Features |
| Rankings | `ranking_period.dart`, screenshot `05-rankings` | Account vereist | Competitieve gebruikers | Vergelijken per week, maand en all-time. | `/features/leaderboards` |
| Leagues | `league_tier.dart`: bronze t/m diamond | Account vereist | Sociale motivatie | Competitie voelt als seizoensprogressie. | Rankings landing |
| Activity feed | `friend_activity.dart`, social docs | Account vereist, privacy-afhankelijk | Sociale motivatie | Successen zichtbaar maken zonder alles openbaar te maken. | Features |

Marketingtaal:

- "Gebruik vrienden, challenges en rankings wanneer accountability helpt."
- "Deel voortgang gecontroleerd: social stats staan achter een privacy-instelling."

Voorzichtig:

- Niet formuleren als "openbare community" als het primair om vrienden/accepted connections gaat.

### 6. Family, ouders en ontwikkeling van kinderen

| Klantvriendelijke naam | Productbewijs | Plan | Doelgroepen | Voordeel | SEO / pagina |
| --- | --- | --- | --- | --- | --- |
| Family abonnement tot 6 leden | `SubscriptionProduct.family*`, l10n `max. 6 gezinsleden` | Family | Ouders/gezinnen | Een huishouden kan samen Premium gebruiken. | Pricing |
| Familiegroep met rollen | `FamilyRole`: owner, parent, child, normal | Family | Ouders/gezinnen | Rechten zijn duidelijk gescheiden. | Family page |
| Ouders zien kindstatistieken | `canViewChildrenStats`, child stats l10n | Family | Ouders | Oefentijd en voortgang worden zichtbaar. | `/features/family` |
| Ouders starten timers voor kinderen | `canStartTimersForChildren`, `FamilyTimerScreen`, `FamilyTimerSession` | Family | Ouders | Oefentijd krijgt een duidelijk startpunt en doel. | Family page, pricing |
| Sessie gekoppeld aan kindaccount | `family_timer_session_explanation` l10n, model `childUserId` | Family | Ouders/kinderen | Ouder helpt starten, maar voortgang telt bij het kind. | Family page |
| Kind ziet ouder-gestarte timers | `FamilyRole.child.description` | Family | Gezinnen | Kind weet waar het aan werkt. | Family page |
| Weekdoelen voor kinderen | `SkillGoal`, `parentCreatedGoals`, `childGoals` | Family | Ouders/kinderen | Doelen in minuten of sessies geven houvast. | Family page |
| Complimenten | `ComplimentType`, `ComplimentService` | Family/social context | Ouders/kinderen | Positieve feedback naast cijfers en XP. | Family page |
| Familie uitnodigen met link/QR/code | family invite l10n | Family | Gezinnen | Minder frictie bij gezinssetup. | Pricing, FAQ |
| Join requests met goedkeuring | family invite l10n | Family | Ouders | De eigenaar houdt controle over leden. | FAQ |

Aanbevolen Family-positionering:

> Met Family kunnen ouders oefentijd begeleiden zonder de voortgang van hun kind over te nemen. Ouders kunnen timers starten, kindstatistieken bekijken, weekdoelen zetten en complimenten sturen. Zo krijgt het kind structuur en ziet het gezin samen waar naartoe wordt gewerkt.

Waarom dit werkt:

- Ouders zoeken vaak naar houvast, routine en inzicht, niet naar nog een "game".
- "Parent dashboard", "child progress", "kids habit tracker" en "family productivity" zijn herkenbare zoektermen, maar de copy moet juridisch voorzichtig blijven door de 13+ privacytekst.

Voorzichtig:

- De privacytekst zegt dat SkillQuest geschikt is voor 13+ en niet bewust gegevens verzamelt van kinderen onder 13. Vermijd daarom "voor kinderen vanaf 6 jaar" of ADHD/gedragsclaims.
- Claim niet dat ouders op afstand het apparaat van het kind besturen. De onderbouwde claim is dat een ouder een timer kan starten in de family context en dat de sessie bij het kind wordt geregistreerd.

### 7. Premium, personalisatie en abonnementen

| Klantvriendelijke naam | Productbewijs | Plan | Doelgroepen | Voordeel | SEO / pagina |
| --- | --- | --- | --- | --- | --- |
| Premium Monthly/Yearly | `SubscriptionProduct.monthly/yearly` | Premium: EUR 3.99/mnd, EUR 39.99/jr | Power users | Meer flexibiliteit en diepte. | Pricing |
| Family Monthly/Yearly | `SubscriptionProduct.familyMonthly/familyYearly` | Family: EUR 6.99/mnd, EUR 69.99/jr | Gezinnen | Premium + gezinsstructuur. | Pricing |
| Geavanceerde timermodi | `PremiumFeatures.timerTechniques` | Premium | Focus/productiviteit | Deep Work, 52-17, Flowtime. | Pricing, focus page |
| Custom timer durations | `PremiumFeatures.customTimers` | Premium | Focus/productiviteit | Eigen Flowtime/persoonlijke timers. | Pricing |
| Advanced stats | `PremiumFeatures.advancedStats` | Premium | Power users | Trends en historische data. | Pricing |
| Unlimited history | `PremiumFeatures.unlimitedHistory` | Premium | Power users | Lange termijn inzicht. | Pricing |
| Premium audio | `PremiumFeatures.premiumAudio` | Premium | Focus gebruikers | Meer geluiden/audio-opties. | Pricing |
| Themes | `THEME_SYSTEM.md`, screenshot `07-themes-profile` | Free unlocks + Premium themes | Iedereen, Premium | App voelt persoonlijker. | Features, Premium |
| Light/dark/system mode | `THEME_SYSTEM.md`, theme mode system | Free/Premium afhankelijk themes | Iedereen | Werkt in elke omgeving. | Features |

Aanbevolen pricing copy:

- Free: "Start met skill tracking, focus timers, XP, levels en Guest Mode."
- Premium: "Voor gebruikers die meer timermodi, diepere statistieken, personalisatie en historie willen."
- Family: "Premium voor het gezin, plus ouderrollen, kindstatistieken, timers voor kinderen, weekdoelen en complimenten."

Voorzichtig:

- Lifetime en Early Bird staan nog in legacy metadata, maar de objective zegt expliciet: niet noemen.
- "Unlimited skills" staat in storecopy/website als claim, maar de codebron wijst vooral op skill definitions. Verifieer productlimieten voordat dit een prominent pricing-item blijft.

## SEO keyword map

| Zoekintentie | Primaire termen | Secundaire termen | Aanbevolen pagina | Content angle |
| --- | --- | --- | --- | --- |
| Skill tracking | skill tracker app, skill development app | practice tracker, track learning progress, vaardigheid tracker | `/features/skill-tracker` | Vaardigheden kiezen, timer starten, XP/levels volgen. |
| Focus timer | focus timer app, focus timer | time tracker for focus, focus session app, productiviteit timer | `/features/focus-timer` | Skill-gekoppelde timers, smart breaks, geluiden. |
| Pomodoro | Pomodoro timer app, study Pomodoro timer | 25 minute timer, Pomodoro for studying | `/features/pomodoro-timer` | Bekende techniek plus XP/progress. |
| Deep work / Flowtime | deep work timer, Flowtime timer | 52 17 rule timer, custom focus timer | `/features/deep-work-flowtime` | Premium timermodi voor langere focus. |
| Habit/streak | habit tracker with streaks, streak tracker app | XP habit tracker, gamified habit tracker | `/features/streaks` | Streaks, freezes, XP en zichtbare consistentie. |
| Study | study timer app, study tracker app | exam study timer, homework timer, leren tracker | `/features/study-timer` | Studie-uren meetbaar maken per vak/skill. |
| Progress stats | progress tracking app, productivity statistics | skill progress dashboard, time tracking statistics | `/features/progress-statistics` | Dag/week/maand/jaar en skill breakdown. |
| Family | parent dashboard app, family productivity app | child progress tracker, kids habit tracker, ouder kind app | `/features/family` | Structuur, timers voor kinderen, child stats, doelen. |
| Social accountability | friends challenges app, leaderboard productivity app | skill challenges, accountability app | `/features/friends-challenges` | Vrienden, challenges, rankings met privacygrenzen. |
| Premium comparison | skill tracker pricing, family plan app | premium productivity app, family subscription | `/pricing` | Free/Premium/Family helder vergelijken. |
| Download intent | SkillQuest app, SkillQuest iOS, SkillQuest Android alpha | App Store SkillQuest, Google Play closed testing | `/download` | iOS live, Android alpha/closed testing. |

Locale-aanpak:

- English als mastercopy houden voor vertaling en SEO-consistentie.
- Nederlandse pagina's gebruiken klanttaal zoals "focus timer", "studietimer", "vaardigheden bijhouden", "ouder dashboard", "voortgang kind", "gewoonte tracker", "streaks".
- Beschermde termen consistent houden: SkillQuest, XP, Premium, Family, Focus Timer, Guest Mode, EMOM.

## Aanbevolen website-structuur

### Homepage

Doel: snel uitleggen voor wie SkillQuest is en waarom het verschilt.

Aanbevolen volgorde:

1. Hero: SkillQuest als skill tracker met focus timers, XP en Family-tools.
2. Use-case split: zelfontwikkeling, ouders/gezinnen, studenten, focus/productiviteit, social.
3. Product loop: kies skill -> start timer -> verdien XP -> bekijk voortgang -> kom terug.
4. Family highlight: timers voor kinderen, child stats, doelen, complimenten.
5. Screenshot gallery met echte schermen.
6. Premium/Family preview.
7. Privacy/trust: App Store live, Android alpha, geen fake ratings, account deletion, support.
8. Download/lead CTA.

### Features page

Maak van de features page geen korte kaartenwand, maar een inhoudelijke hub met interne links:

- Skill tracking
- Focus timers
- XP, levels en streaks
- Statistics and progress
- Friends, challenges and rankings
- Family tools
- Premium personalization
- Guest Mode and privacy

### Pricing page

De huidige Free/Premium/Family structuur is goed. Versterk de verschillen:

- Free = starten en waarde voelen.
- Premium = meer diepte, meer personalisatie, meer historie.
- Family = Premium plus begeleiding, rollen, child stats, timers, doelen en complimenten.

### Download page

Moet release-status exact houden:

- iOS: live op App Store.
- Android: Alpha / closed testing via Google Play.
- Gebruik echte screenshots en vermeld dat Android listing mogelijk pas zichtbaar is na acceptatie als tester.

### FAQ

Aanbevolen FAQ-vragen:

1. Kan ik SkillQuest gratis proberen?
2. Wat is het verschil tussen Free, Premium en Family?
3. Welke focus timers ondersteunt SkillQuest?
4. Kan ik Pomodoro gebruiken?
5. Wat zijn XP, levels en streaks?
6. Wat kunnen ouders met Family?
7. Kunnen ouders timers voor kinderen starten?
8. Kan ik de voortgang van mijn kind zien?
9. Is SkillQuest geschikt voor jonge kinderen?
10. Hoe werkt Android alpha / closed testing?
11. Hoe worden mijn gegevens beschermd?
12. Hoe verwijder ik mijn account?

## Prioriteit voor nieuwe SEO-landingspagina's

### Prioriteit 1

1. `/features/focus-timer`
   - Hoogste brede intentie.
   - Koppelt Pomodoro, Deep Work, Flowtime en smart breaks.
   - CTA naar download en Premium.

2. `/features/family`
   - Sterk onderscheidend.
   - Direct relevant voor Family-abonnement.
   - Moet parent dashboard, child stats, timers, doelen en complimenten uitleggen.

3. `/features/skill-tracker`
   - Kernpositionering.
   - Laat zien waarom SkillQuest geen gewone habit list is.

4. `/features/progress-statistics`
   - Onderbouwt paid value en vertrouwen.
   - Sluit aan op screenshots en storecopy.

### Prioriteit 2

5. `/features/pomodoro-timer`
6. `/features/streaks`
7. `/features/friends-challenges`
8. `/features/study-timer`

### Prioriteit 3

9. `/features/deep-work-flowtime`
10. `/features/leaderboards`
11. `/features/themes`
12. `/features/guest-mode`

## Concrete copyblokken

### Homepage hero - English master

**Headline**  
SkillQuest

**Subheadline**  
Build skills with focus timers, XP, levels, statistics, friends, challenges, and Family tools. Start free and turn every focused minute into visible progress.

**CTA**  
Download on the App Store  
Join Android alpha

### Homepage hero - Nederlands

**Headline**  
SkillQuest

**Subheadline**  
Bouw vaardigheden met focus timers, XP, levels, statistieken, vrienden, challenges en Family-tools. Start gratis en maak elke focusminuut zichtbaar.

### Family section

**Headline**  
Geef kinderen structuur zonder hun voortgang over te nemen

**Body**  
Met Family kunnen ouders timers starten voor kinderen, kindstatistieken bekijken, weekdoelen instellen en complimenten sturen. Zo weet je kind waar het aan werkt, terwijl jij zicht houdt op inzet, oefentijd en groei.

**Bullets**

- Bekijk sessies, minuten, XP en actieve skills.
- Start een timer voor een kind wanneer het tijd is om te oefenen.
- Zet weekdoelen in minuten of sessies.
- Geef positieve feedback met complimenten.
- Family vereist een Family-abonnement.

### Focus timer section

**Headline**  
Een focus timer die je voortgang bijhoudt

**Body**  
Start een sessie voor de skill die je wilt verbeteren. SkillQuest ondersteunt bekende focusvormen zoals Pomodoro en uitgebreidere technieken zoals Deep Work, 52-17, Flowtime, Until Time en EMOM, afhankelijk van je plan en instellingen.

### Student copy

**Headline**  
Maak studietijd meetbaar

**Body**  
Gebruik SkillQuest voor vakken, projecten, examens of taalstudie. Start een timer, verdien XP en bekijk per dag, week en maand waar je tijd naartoe ging.

### Self-improvement copy

**Headline**  
Werk aan de vaardigheden die je steeds uitstelt

**Body**  
Of je nu leest, sport, programmeert, schrijft, muziek oefent of een nieuwe routine opbouwt: SkillQuest maakt kleine sessies zichtbaar en helpt je terugkomen.

### Social motivation copy

**Headline**  
Motivatie met grenzen

**Body**  
Voeg vrienden toe, start challenges en vergelijk voortgang in rankings. Je bepaalt zelf wat je deelt; vriendstatistieken zijn gekoppeld aan privacy-instellingen.

### Premium pricing copy

**Premium**  
Voor gebruikers die meer controle willen over hun focus en voortgang. Premium ontgrendelt geavanceerde timermodi, uitgebreidere statistieken, meer historie en personalisatie.

**Family**  
Voor gezinnen die samen structuur willen opbouwen. Family bevat Premium voor het gezin plus ouderrollen, kindstatistieken, timers voor kinderen, doelen en complimenten.

### FAQ copy

**Kunnen ouders timers voor kinderen starten?**  
Ja. Met Family kunnen ouders en eigenaars timers starten voor kinderen binnen de familieomgeving. De sessie wordt gekoppeld aan het kind, zodat voortgang en oefentijd zichtbaar blijven.

**Kan ik zien wanneer mijn kind timers heeft gestart?**  
Met Family kunnen ouders kindstatistieken bekijken, inclusief sessies, minuten, XP, skill breakdown en recente activiteit.

**Is Family inbegrepen in Premium?**  
Nee. Family is een apart abonnement voor gezinnen. Premium is bedoeld voor individuele gebruikers; Family voegt gezinsbeheer en ouder-kind functies toe.

**Is Android al publiek beschikbaar?**  
Android is momenteel beschikbaar via Google Play alpha / closed testing. iOS is live op de App Store.

**Is SkillQuest een medische of therapeutische app?**  
Nee. SkillQuest is een productiviteits- en skill tracking app. Gebruik geen medische claims in marketingcopy.

## Claims voorzichtig formuleren

Niet gebruiken zonder extra bewijs:

- "Bewezen 43% meer consistentie", "2.5x langere streaks" of vergelijkbare resultaatclaims.
- "Voor kinderen vanaf 6 jaar" of ADHD/autisme/gedragsverbeteringclaims.
- "Remote control" of "ouders besturen het apparaat van hun kind".
- "Android is live in Google Play" zolang Android alleen alpha/closed testing is.
- "Unlimited skills" totdat productlimieten en UI bevestigd zijn.
- "Alle 19 themes" tenzij de actuele production data/UI dat exact bevestigt.
- "Data export" prominent in hero/pricing voordat de zichtbare productflow is gecontroleerd.
- "Lifetime" of "Early Bird" prijzen.
- Fake ratings, fake download counts of oncontroleerbare testimonials.

Wel gebruiken, met onderbouwing:

- "Live on the App Store. Android alpha on Google Play."
- "Family: EUR 6.99/month or EUR 69.99/year."
- "Premium: EUR 3.99/month or EUR 39.99/year."
- "Parents can start timers for children and view child statistics with Family."
- "SkillQuest supports focus timer techniques including Pomodoro, Deep Work, 52-17, Flowtime, Until Time and EMOM."
- "Guest Mode lets users start before creating an account."
- "SkillQuest is ad-free" alleen als dependency/audit bevestigt dat er geen advertenties of ad SDK's actief zijn.

## Openstaande risico's en acties

1. Store metadata gebruikt nog `hello@zenithreborn.com`, terwijl de objective `hello@skill-quest.app` voorschrijft. Actie: metadata en store listings corrigeren.
2. Oude Play Store documentatie noemt Lifetime/Early Bird en resultaatclaims. Actie: markeren als verouderd of vervangen.
3. Privacytekst zegt 13+. Actie: Family-copy juridisch laten aansluiten op leeftijdsbeleid voordat "kids habit tracker" agressief wordt ingezet.
4. Feature access per plan moet nog exact worden gevalideerd in de UI. Actie: Free/Premium/Family matrix naast paywall en subscription guards leggen.
5. Data export en unlimited history staan in het model. Actie: checken of de user-facing flow live is voordat dit prominent wordt.
6. Website heeft al algemene features, maar nog weinig diepe SEO-content. Actie: prioriteit 1 landing pages bouwen.

## Aannames en onzekerheden

- App Store live-status, Android alpha-status, prijzen en supportmail zijn overgenomen uit het goal objective en de websitebron. Voor een publicatie-audit moeten de live stores nog opnieuw worden gecontroleerd.
- De feature-inventaris gebruikt app-code en documentatie als bron. Sommige items, zoals data export en unlimited history, zijn in het model aanwezig maar moeten in de zichtbare UI worden bevestigd voordat ze prominent in marketingcopy komen.
- Family-timers zijn onderbouwd als ouder-gestarte sessies die aan het kind worden gekoppeld. De precieze UX rond notificaties op het apparaat van het kind is niet geclaimd.
- "Kids habit tracker" is alleen als SEO-term opgenomen. De marketingcopy zelf moet voorzichtig blijven door de 13+ privacytekst.
- De exacte Free/Premium/Family-limieten moeten naast de paywall en RevenueCat-productconfiguratie worden gevalideerd voordat een definitieve vergelijkingstabel live gaat.

## Implementatie-aanpak

Aanbevolen volgorde:

1. Werk `src/lib/marketing.ts` bij met scherpere feature- en Family-copy.
2. Breid FAQ uit op pricing en eventueel aparte support/FAQ-page.
3. Maak `/features/focus-timer`, `/features/family`, `/features/skill-tracker` en `/features/progress-statistics`.
4. Gebruik echte screenshots per pagina, niet alleen een generieke gallery.
5. Voeg per pagina unieke metadata en FAQ JSON-LD toe waar relevant.
6. Corrigeer store metadata supportmail en oude prijs/resultaatclaims.
7. Meet CTA clicks: App Store, Android Alpha, pricing, Family, email lead.

## Korte conclusie

SkillQuest heeft genoeg bewezen functionaliteit voor een veel sterkere marketingwebsite dan de huidige brede homepage. De grootste kans zit in product-led SEO: aparte pagina's voor focus timers, skill tracking, family/parent tools en progress statistics. De Family-laag verdient meer uitleg, omdat ouders niet alleen willen weten dat er een abonnement is, maar vooral hoe SkillQuest hen helpt om oefentijd, doelen en ontwikkeling zichtbaar te maken.
