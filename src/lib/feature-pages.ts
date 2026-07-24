import type {Locale, ScreenshotName} from '@/lib/marketing';

export const featureLandingSlugs = [
  'focus-timer',
  'family',
  'skill-tracker',
  'progress-statistics',
  'pomodoro-timer',
  'streaks',
  'friends-challenges',
  'study-timer',
  'deep-work-flowtime',
  'leaderboards',
  'themes',
  'guest-mode'
] as const;

export type FeatureLandingSlug = (typeof featureLandingSlugs)[number];

export type FeatureLandingPage = {
  slug: FeatureLandingSlug;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  cardSummary: string;
  screenshot: ScreenshotName;
  primaryCta: string;
  secondaryCta: string;
  sections: Array<{
    title: string;
    body: string;
    bullets: string[];
  }>;
  seoTerms: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

type FeatureOverviewCopy = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

const featureOverviewCopy: Record<Locale, FeatureOverviewCopy> = {
  nl: {
    eyebrow: 'Functies per behoefte',
    title: 'Ontdek hoe SkillQuest helpt in echte routines',
    body:
      'Van focus timers tot Family-tools: deze pagina’s leggen uit wat SkillQuest doet, voor wie het werkt en welke voortgang zichtbaar wordt.',
    cta: 'Bekijk functie'
  },
  en: {
    eyebrow: 'Features by use case',
    title: 'Explore how SkillQuest helps in real routines',
    body:
      'From focus timers to Family tools, these pages explain what SkillQuest does, who it helps, and which progress becomes visible.',
    cta: 'View feature'
  },
  de: {
    eyebrow: 'Funktionen nach Bedarf',
    title: 'So hilft SkillQuest in echten Routinen',
    body:
      'Von Fokus-Timern bis zu Family-Tools: Diese Seiten zeigen, was SkillQuest kann, wem es hilft und welcher Fortschritt sichtbar wird.',
    cta: 'Funktion ansehen'
  },
  fr: {
    eyebrow: 'Fonctions par usage',
    title: 'Découvrez comment SkillQuest aide au quotidien',
    body:
      'Des minuteurs de concentration aux outils Family, ces pages expliquent ce que fait SkillQuest, pour qui cela fonctionne et quels progrès deviennent visibles.',
    cta: 'Voir la fonction'
  },
  es: {
    eyebrow: 'Funciones por necesidad',
    title: 'Descubre cómo SkillQuest ayuda en rutinas reales',
    body:
      'Desde temporizadores de enfoque hasta herramientas Family, estas páginas explican qué hace SkillQuest, a quién ayuda y qué progreso se vuelve visible.',
    cta: 'Ver función'
  },
  it: {
    eyebrow: 'Funzioni per uso',
    title: 'Scopri come SkillQuest aiuta nelle routine reali',
    body:
      'Dai timer di concentrazione agli strumenti Family, queste pagine spiegano cosa fa SkillQuest, a chi serve e quali progressi diventano visibili.',
    cta: 'Vedi funzione'
  }
};

const pages: Record<Locale, Record<FeatureLandingSlug, FeatureLandingPage>> = {
  nl: {
    'focus-timer': {
      slug: 'focus-timer',
      eyebrow: 'Focus Timer',
      title: 'Een focus timer die je voortgang bijhoudt',
      metaTitle: 'Focus Timer App | Pomodoro, Deep Work en Flowtime | SkillQuest',
      metaDescription:
        'Gebruik SkillQuest als focus timer voor Pomodoro, Deep Work, 52-17, Flowtime, Until Time en EMOM. Elke sessie telt mee voor XP, levels en voortgang.',
      summary:
        'Start een timer voor de vaardigheid waar je aan werkt. SkillQuest koppelt focusminuten aan XP, levels, statistieken en zichtbare groei.',
      cardSummary:
        'Pomodoro, Deep Work, Flowtime en andere timermodi gekoppeld aan echte skill progressie.',
      screenshot: '02-focus-timer.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'Vergelijk Premium',
      sections: [
        {
          title: 'Kies de timer die bij je taak past',
          body:
            'SkillQuest ondersteunt meerdere focusvormen, zodat je niet vastzit aan een enkele Pomodoro-flow.',
          bullets: [
            'Pomodoro voor korte studie- en werksprints.',
            'Deep Work en 52-17 voor langere concentratieblokken.',
            'Flowtime en Until Time voor flexibele sessies.',
            'EMOM voor intervaltrainingen en actieve routines.'
          ]
        },
        {
          title: 'Elke minuut telt mee voor een skill',
          body:
            'Een timer staat niet los van je voortgang. Je kiest eerst een skill en ziet daarna XP, levels en statistieken groeien.',
          bullets: [
            'Verdien XP na afgeronde sessies.',
            'Bekijk sessies per skill in je statistieken.',
            'Gebruik smart breaks waar de timermodus dit ondersteunt.'
          ]
        },
        {
          title: 'Premium voor meer focusvrijheid',
          body:
            'Premium is bedoeld voor gebruikers die meer timermodi, custom duur en diepere statistieken willen.',
          bullets: [
            'Geavanceerde technieken zoals Deep Work, 52-17 en Flowtime.',
            'Custom Flowtime-duur en gepersonaliseerde timers.',
            'Meer historie en uitgebreidere voortgangsinzichten.',
            'Premium kost EUR 3.99 per maand of EUR 39.99 per jaar.'
          ]
        }
      ],
      seoTerms: [
        'focus timer app',
        'pomodoro timer',
        'deep work timer',
        'flowtime timer',
        'study timer'
      ],
      faq: [
        {
          question: 'Kan ik SkillQuest als Pomodoro timer gebruiken?',
          answer:
            'Ja. Pomodoro is een ondersteunde timermodus. SkillQuest voegt daar XP, levels en voortgang per skill aan toe.'
        },
        {
          question: 'Welke timermodi ondersteunt SkillQuest?',
          answer:
            'De app ondersteunt Pomodoro, 52-17, Deep Work, Flowtime, Until Time en EMOM. Sommige geavanceerde functies horen bij Premium.'
        },
        {
          question: 'Wordt mijn focus automatisch opgeslagen?',
          answer:
            'Afgeronde sessies worden gekoppeld aan de gekozen skill, zodat XP, statistieken en voortgang zichtbaar worden.'
        }
      ]
    },
    family: {
      slug: 'family',
      eyebrow: 'Family',
      title: 'Help kinderen oefenen met structuur, doelen en zichtbare voortgang',
      metaTitle: 'Family App voor ouders | Timers, doelen en kindstatistieken | SkillQuest',
      metaDescription:
        'Met SkillQuest Family kunnen ouders timers starten voor kinderen, kindstatistieken bekijken, weekdoelen zetten en complimenten sturen.',
      summary:
        'Family geeft ouders houvast zonder de voortgang van het kind over te nemen. Timers, doelen, XP en complimenten maken oefentijd concreet.',
      cardSummary:
        'Ouders kunnen timers starten, kindstatistieken bekijken, doelen zetten en kinderen positief begeleiden.',
      screenshot: '06-social-family.png',
      primaryCta: 'Bekijk Family',
      secondaryCta: 'Download de app',
      sections: [
        {
          title: 'Ouders krijgen inzicht in oefentijd',
          body:
            'Met Family kunnen ouders zien welke sessies zijn gestart en hoe voortgang zich ontwikkelt per skill.',
          bullets: [
            'Bekijk sessies, minuten, XP en actieve skills.',
            'Zie recente activiteit en skill breakdown.',
            'Gebruik voortgang als basis voor gesprekken over school, sport, muziek of creatief werk.'
          ]
        },
        {
          title: 'Start timers voor kinderen',
          body:
            'Ouders en eigenaars kunnen een timer starten voor een kind. De sessie wordt aan het kind gekoppeld, zodat de voortgang daar zichtbaar blijft.',
          bullets: [
            'Kies een kind en skill vanuit de familieomgeving.',
            'Maak oefentijd een duidelijke volgende stap.',
            'Het kind ziet timers die door ouders zijn gestart.'
          ]
        },
        {
          title: 'Werk samen naar een doel',
          body:
            'Family ondersteunt weekdoelen en complimenten, zodat begeleiding niet alleen uit controle bestaat.',
          bullets: [
            'Zet doelen in minuten of sessies.',
            'Volg voortgang richting het doel.',
            'Stuur complimenten voor inzet en vooruitgang.',
            'Family kost EUR 6.99 per maand of EUR 69.99 per jaar.'
          ]
        }
      ],
      seoTerms: [
        'parent dashboard app',
        'kids habit tracker',
        'child progress tracker',
        'family productivity app',
        'ouder kind app'
      ],
      faq: [
        {
          question: 'Kunnen ouders timers voor kinderen starten?',
          answer:
            'Ja. Met Family kunnen ouders en eigenaars timers starten voor kinderen binnen de familieomgeving.'
        },
        {
          question: 'Kan ik de voortgang van mijn kind zien?',
          answer:
            'Ja. Family bevat kindstatistieken met sessies, minuten, XP, skill breakdown en recente activiteit.'
        },
        {
          question: 'Is Family hetzelfde als Premium?',
          answer:
            'Nee. Family is een apart gezinsabonnement met Premium plus ouderrollen, kindstatistieken, timers voor kinderen, doelen en complimenten.'
        },
        {
          question: 'Voor welke leeftijd is SkillQuest bedoeld?',
          answer:
            'SkillQuest gebruikt een 13+ privacykader. Marketing rond kinderen moet daarom zorgvuldig worden geformuleerd.'
        }
      ]
    },
    'skill-tracker': {
      slug: 'skill-tracker',
      eyebrow: 'Skill Tracker',
      title: 'Track vaardigheden in plaats van losse taken',
      metaTitle: 'Skill Tracker App | XP, levels en oefentijd | SkillQuest',
      metaDescription:
        'SkillQuest is een skill tracker voor studie, sport, muziek, lezen, code, creatief werk en routines. Start timers en volg XP, levels en progressie.',
      summary:
        'SkillQuest helpt je kiezen waar je aan werkt, meet de tijd die je investeert en maakt groei zichtbaar per vaardigheid.',
      cardSummary:
        'Kies een skill, start een timer en zie XP, levels en voortgang groeien.',
      screenshot: '01-home-progress.png',
      primaryCta: 'Start gratis',
      secondaryCta: 'Bekijk focus timers',
      sections: [
        {
          title: 'Gebouwd rond vaardigheden',
          body:
            'Gebruik SkillQuest voor studie, sport, muziek, lezen, programmeren, creatief werk of elke routine die oefening vraagt.',
          bullets: [
            '78 herkenbare skill-iconen in de app.',
            'Favorieten en meest gebruikte skills voor snelle toegang.',
            'Skillnamen en zoekdata zijn meertalig ingericht.'
          ]
        },
        {
          title: 'Van oefentijd naar progressie',
          body:
            'Elke sessie kan XP, levels, streaks en statistieken voeden. Daardoor zie je niet alleen wat je wilt doen, maar wat je echt hebt gedaan.',
          bullets: [
            'XP en levels per skill.',
            'Session reward na afgeronde focus.',
            'Statistieken per periode en skill.'
          ]
        },
        {
          title: 'Probeer zonder account',
          body:
            'Guest Mode verlaagt de drempel. Je kunt starten voordat je een account maakt of voortgang synchroniseert.',
          bullets: [
            'Start direct met core skill tracking.',
            'Maak later een account voor sync, vrienden, rankings en uitgebreidere functies.',
            'Geen advertenties in de marketingpositionering, mits release-audit dit blijft bevestigen.'
          ]
        }
      ],
      seoTerms: [
        'skill tracker app',
        'skill development app',
        'practice tracker',
        'learning progress tracker',
        'vaardigheden bijhouden'
      ],
      faq: [
        {
          question: 'Is SkillQuest een habit tracker?',
          answer:
            'SkillQuest kan routines ondersteunen, maar is sterker als skill tracker: elke focusminuut wordt gekoppeld aan een vaardigheid.'
        },
        {
          question: 'Voor welke skills kan ik SkillQuest gebruiken?',
          answer:
            'Voor onder meer studie, sport, muziek, lezen, programmeren, creatief werk en persoonlijke routines.'
        },
        {
          question: 'Kan ik gratis starten?',
          answer:
            'Ja. SkillQuest bevat een gratis start met Guest Mode en core skill tracking.'
        }
      ]
    },
    'progress-statistics': {
      slug: 'progress-statistics',
      eyebrow: 'Progress Tracking',
      title: 'Zie waar je tijd echt naartoe gaat',
      metaTitle: 'Progress Tracking App | Statistieken, XP en skill breakdown | SkillQuest',
      metaDescription:
        'Bekijk SkillQuest statistieken per dag, week, maand en jaar. Volg XP, sessies, minuten, skill breakdown en kindstatistieken met Family.',
      summary:
        'SkillQuest maakt oefentijd meetbaar met statistieken, skill breakdowns, XP, sessiehistorie en voortgang per periode.',
      cardSummary:
        'Bekijk sessies, minuten, XP, skill breakdowns en trends per periode.',
      screenshot: '04-statistics.png',
      primaryCta: 'Bekijk de app',
      secondaryCta: 'Vergelijk Premium',
      sections: [
        {
          title: 'Statistieken per periode',
          body:
            'Bekijk je activiteit per dag, week, maand en jaar, zodat je patronen ziet in plaats van alleen losse sessies.',
          bullets: [
            'Tijd, sessies en XP per periode.',
            'Skill breakdown voor beter inzicht.',
            'Progress reports en optionele meldingen voor terugkerende motivatie.'
          ]
        },
        {
          title: 'Diepere inzichten met Premium',
          body:
            'Premium is bedoeld voor gebruikers die verder willen kijken dan de basisstatistieken.',
          bullets: [
            'Uitgebreidere statistieken en trends.',
            'Meer sessiehistorie voor lange termijn inzicht.',
            'Data export staat als Premium feature in de productmodellen en moet zichtbaar worden bevestigd voor prominente claims.'
          ]
        },
        {
          title: 'Inzicht voor gezinnen',
          body:
            'Met Family kunnen ouders de voortgang van kinderen bekijken en oefentijd bespreekbaar maken.',
          bullets: [
            'Kindstatistieken met sessies, minuten en XP.',
            'Skill breakdown en recente activiteit.',
            'Doelen en complimenten maken begeleiding concreter.'
          ]
        }
      ],
      seoTerms: [
        'progress tracking app',
        'productivity statistics',
        'skill progress dashboard',
        'time tracking statistics',
        'child progress tracker'
      ],
      faq: [
        {
          question: 'Welke statistieken toont SkillQuest?',
          answer:
            'SkillQuest toont onder meer sessies, minuten, XP, skill breakdown en voortgang per periode.'
        },
        {
          question: 'Kan ik lange termijn trends bekijken?',
          answer:
            'Premium bevat uitgebreidere statistieken en meer historie. Controleer de app voor de actuele zichtbare functies.'
        },
        {
          question: 'Kunnen ouders statistieken van kinderen bekijken?',
          answer:
            'Ja. Family bevat kindstatistieken voor ouders en eigenaars binnen de familieomgeving.'
        }
      ]
    },
    'pomodoro-timer': {
      slug: 'pomodoro-timer',
      eyebrow: 'Pomodoro-timer',
      title: 'Een Pomodoro-timer die is afgestemd op jouw vaardigheden',
      metaTitle: 'Pomodoro-timer-app | Studie- en concentratiesessies | SkillQuest',
      metaDescription:
        'Gebruik SkillQuest als gratis Pomodoro-timer om te studeren en geconcentreerd te werken. Elke sprint van 25 minuten telt mee voor XP, levels en je vaardigheidsvooruitgang.',
      summary:
        'Het klassieke 25/5 Pomodoro-ritme zit ingebouwd in SkillQuest, zodat elke sprint XP, levels en vooruitgang oplevert voor de vaardigheid die je aan het oefenen bent.',
      cardSummary:
        'Het klassieke 25/5-focusritme, gekoppeld aan XP, levels en vaardigheidsvooruitgang.',
      screenshot: '02-focus-timer.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'Vergelijk verschillende timertechnieken',
      sections: [
        {
          title: 'De Pomodoro-techniek, zonder aparte app',
          body:
            'Bij de Pomodoro-methode wordt het werk opgedeeld in korte, geconcentreerde sprints met regelmatige pauzes. SkillQuest heeft dit ingebouwd als een van de verschillende timertechnieken, dus je hebt geen aparte Pomodoro-app nodig naast je tracker.',
          bullets: [
            'Concentratiesprints van 25 minuten met ingebouwde pauzes.',
            'Beschikbaar in het gratis pakket, geen abonnement nodig.',
            'Handig voor je studie, werk, lezen of welke vaardigheid je ook bijhoudt.'
          ]
        },
        {
          title: 'Elke sprint telt mee voor een vaardigheid',
          body:
            'Een Pomodoro-timer meet op zichzelf alleen maar de tijd. SkillQuest koppelt elke sprint aan de vaardigheid die je hebt gekozen, zodat je focus zich vertaalt in zichtbare vooruitgang.',
          bullets: [
            'Verdien XP na elke voltooide Pomodoro-sessie.',
            'Bekijk in je statistieken de sessies, gegroepeerd per vaardigheid.',
            'Houd je streaks bij voor een consistent Pomodoro-ritme.'
          ]
        },
        {
          title: 'Meer dan alleen Pomodoro als je meer nodig hebt',
          body:
            'Voor sommige taken heb je langere of flexibelere concentratieperiodes nodig dan 25 minuten. SkillQuest biedt ook andere technieken waar je op kunt overschakelen zonder de app te verlaten.',
          bullets: [
            'Deep Work en 52-17 voor langere sessies.',
            'Flowtime en Until Time voor flexibele tijdsduur.',
            'Met Premium krijg je toegang tot alle timertechnieken.'
          ]
        }
      ],
      seoTerms: [
        'pomodoro timer app',
        'pomodoro timer studeren',
        '25 minuten timer',
        'studie pomodoro app',
        'gratis pomodoro timer'
      ],
      faq: [
        {
          question: 'Is de Pomodoro-timer gratis in SkillQuest?',
          answer:
            'Ja. Pomodoro zit in het gratis abonnement, net als XP, levels en basisstatistieken.'
        },
        {
          question: 'Kan ik de Pomodoro-methode gebruiken om te studeren?',
          answer:
            'Ja. Veel gebruikers houden hun studiesessies bij met Pomodoro en koppelen elke sprint aan een studiegerelateerde vaardigheid.'
        },
        {
          question: 'Wat gebeurt er als een Pomodoro-sessie afgelopen is?',
          answer:
            'De sessie wordt toegevoegd aan je vaardigheidsstatistieken en levert XP op, dus je concentratietijd vertaalt zich in zichtbare vooruitgang.'
        }
      ]
    },
    streaks: {
      slug: 'streaks',
      eyebrow: 'Streaks',
      title: 'Maak van consistentie een streak die je echt kunt zien',
      metaTitle: 'Streak Tracker-app met XP | Bouw dagelijkse gewoontes op | SkillQuest',
      metaDescription:
        'SkillQuest houdt voor elke vaardigheid die je oefent een dagelijkse streak bij, met XP, levels en streak freezes, zodat één gemiste dag je voortgang niet tenietdoet.',
      summary:
        'Met een dagelijkse streak houd je bij hoe regelmatig je meedoet, en dankzij XP en levels voelt die regelmaat echt als vooruitgang, niet alleen maar als een getal.',
      cardSummary:
        'Dagelijkse streaks met XP en streak freezes, zodat je consistentie zichtbaar blijft.',
      screenshot: '03-session-reward.png',
      primaryCta: 'Begin je streak',
      secondaryCta: 'Kijk hoe XP werkt',
      sections: [
        {
          title: 'Streaks waarbij je beloond wordt als je meedoet',
          body:
            'Elke dag dat je een concentratiesessie voltooit, wordt je streak langer. Het is een simpel, zichtbaar signaal dat van de vraag "Heb ik vandaag geoefend?" een doorlopende telling maakt.',
          bullets: [
            'Verdien 10 XP voor een actieve dag, bovenop de XP die je per sessie krijgt.',
            'Streaks gelden voor alle vaardigheden die je bijhoudt.',
            'Bekijk in één oogopslag je huidige en langste streak.'
          ]
        },
        {
          title: 'Streak freezes beschermen je tegen een incidentele misser',
          body:
            'Soms zit het leven je gewoon in de weg. Dankzij streak freezes hoef je door één gemiste dag niet meteen weken van consistentie te verliezen.',
          bullets: [
            'Bescherm je streak tegen een enkele gemiste dag.',
            'Blijf op de lange termijn gemotiveerd, zonder dat het een alles-of-niets-gevoel wordt.',
            'Mijlpaalstreaks (7, 30, 100+ dagen) kunnen deelbare activiteitsposts opleveren.'
          ]
        },
        {
          title: 'Streaks betekenen meer dan alleen maar cijfers',
          body:
            'Consistentie in SkillQuest draait om meer dan alleen een teller: thema’s en beloningen hangen samen met je voortgang.',
          bullets: [
            'Ontgrendel thema’s door gestaag vooruitgang te boeken.',
            'Combineer streaks met XP en levels voor een completer beeld.',
            'Gebruik streak-mijlpalen als natuurlijke momenten om even te kijken hoe het gaat.'
          ]
        }
      ],
      seoTerms: [
        'streak tracker app',
        'gewoonte tracker met streaks',
        'dagelijkse streak app',
        'xp gewoonte app',
        'gamified habit tracker'
      ],
      faq: [
        {
          question: 'Hoe werkt het streaksysteem in SkillQuest?',
          answer:
            'Als je op een bepaalde dag een focussessie voltooit, blijft je streak intact en verdien je 10 XP voor die actieve dag, bovenop de XP van de sessie zelf.'
        },
        {
          question: 'Wat gebeurt er als ik een dag oversla?',
          answer:
            'Streak freezes kunnen je streak beschermen tegen een incidentele gemiste dag, zodat één gemiste dag je voortgang niet tenietdoet.'
        },
        {
          question: 'Is streak tracking gratis?',
          answer:
            'Ja. Dagelijkse streaks, XP en levels zitten bij het gratis abonnement inbegrepen.'
        }
      ]
    },
    'friends-challenges': {
      slug: 'friends-challenges',
      eyebrow: 'Vrienden & Challenges',
      title: 'Maak voortgang een beetje socialer',
      metaTitle: 'Vrienden & Challenges-app | Accountability voor focus en vaardigheden | SkillQuest',
      metaDescription:
        'Voeg vrienden toe, doe mee aan de XP Race en Active Days challenges, en deel je voortgang op jouw eigen manier met de social features en privacy-instellingen van SkillQuest.',
      summary:
        'Voeg vrienden toe, start challenges en zorg dat je accountability krijgt wanneer je dat wilt, met privacy-instellingen waarmee je alles op jouw manier deelt.',
      cardSummary:
        'Vrienden, challenges en een activiteitenfeed, met privacy-instellingen die je zelf bepaalt.',
      screenshot: '06-social-family.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'Bekijk de rankings',
      sections: [
        {
          title: 'Voeg vrienden toe voor echte accountability',
          body:
            'Voortgang die je alleen bijhoudt, kun je makkelijk negeren. Door vrienden toe te voegen binnen SkillQuest krijg je de accountability die ontstaat doordat het om mensen gaat die je echt kent.',
          bullets: [
            'Stuur en accepteer vriendschapsverzoeken in de app.',
            'Bekijk vriendstatistieken wanneer beide kanten dat toestaan.',
            'Een privacy-schakelaar houdt delen onder jouw controle.'
          ]
        },
        {
          title: 'Challenges die naar een gedeeld doel toewerken',
          body:
            'Challenges maken van individueel oefenen een gezamenlijke push, of dat nu een XP Race of een Active Days Battle is.',
          bullets: [
            'Start een XP Race of Active Days Battle met vrienden.',
            'Volg challenge-voortgang en recente activiteit samen.',
            'Zie wie voorloopt zonder je eigen voortgang uit het oog te verliezen.'
          ]
        },
        {
          title: 'Een activiteitenfeed die mijlpalen viert',
          body:
            'Streaks en andere mijlpalen kunnen als activiteitsposts verschijnen, zodat voortgang wordt opgemerkt zonder een openbare feed te worden.',
          bullets: [
            'Automatische posts bij mijlpalen zoals 7, 30 of 100 actieve dagen.',
            'Privacybewust posten respecteert je instellingen.',
            'Gebouwd voor vrienden en geaccepteerde connecties, geen openbare tijdlijn.'
          ]
        }
      ],
      seoTerms: [
        'vrienden challenges app',
        'accountability app',
        'skill challenges',
        'leaderboard productiviteits-app',
        'sociale gewoonte app'
      ],
      faq: [
        {
          question: 'Heb ik vrienden nodig om SkillQuest te gebruiken?',
          answer:
            'Nee. Vrienden en challenges zijn optionele social features bovenop de kern van skill tracking.'
        },
        {
          question: 'Kan ik bepalen wat vrienden zien?',
          answer:
            'Ja. Een privacy-schakelaar bepaalt of vrienden je statistieken en activiteit kunnen zien.'
        },
        {
          question: 'Welke soorten challenges kan ik starten?',
          answer:
            'SkillQuest ondersteunt challenge-types zoals XP Race en Active Days Battle, met gezamenlijke voortgang.'
        }
      ]
    },
    'study-timer': {
      slug: 'study-timer',
      eyebrow: 'Studietimer',
      title: 'Een studietimer die meer bijhoudt dan alleen de klok',
      metaTitle: 'Studietimer-app | Studiesessies bijhouden per vak | SkillQuest',
      metaDescription:
        'Gebruik SkillQuest als studietimer voor examens, huiswerk en herhaling. Houd studietijd per vak bij met XP, levels en statistieken.',
      summary:
        'Maak van studiesessies zichtbare voortgang per vak, met focus timers, XP en statistieken gebouwd voor herhaald studeren, niet slechts één aftelklok.',
      cardSummary:
        'Studiesessies bijgehouden per vak, met XP, levels en statistieken.',
      screenshot: '02-focus-timer.png',
      primaryCta: 'Begin met studeren via SkillQuest',
      secondaryCta: 'Vergelijk focus timers',
      sections: [
        {
          title: 'Houd studietijd per vak bij, niet alleen in totaal',
          body:
            'Behandel elk vak of examen als een eigen skill, zodat je precies ziet hoe studietijd verdeeld is, niet slechts één gecombineerd getal.',
          bullets: [
            'Maak een skill per vak, cursus of examen.',
            'Kies Pomodoro, Deep Work of Flowtime afhankelijk van de taak.',
            'Bekijk sessiegeschiedenis en totalen per vak.'
          ]
        },
        {
          title: 'Ingebouwde structuur voor examenperiodes',
          body:
            'Studeren voor examens betekent vaak wisselen tussen korte herhalingssprints en langere diepe sessies. SkillQuest ondersteunt beide zonder extra instellen.',
          bullets: [
            'Korte Pomodoro-sprints voor flashcards en snelle herhaling.',
            'Langere Deep Work- of Flowtime-sessies voor proefexamens.',
            'Smart breaks afgestemd op de gekozen techniek.'
          ]
        },
        {
          title: 'Motivatie voor de lange termijn',
          body:
            'Studieroutines zijn makkelijker vol te houden wanneer voortgang zichtbaar is, niet alleen verondersteld.',
          bullets: [
            'XP en levels per vak houden inzet zichtbaar.',
            'Dagelijkse streaks ondersteunen consistente studiegewoontes.',
            'Statistieken tonen welke vakken aandacht krijgen en welke niet.'
          ]
        }
      ],
      seoTerms: [
        'studietimer app',
        'studie tracker app',
        'examen studietimer',
        'huiswerk timer',
        'studie pomodoro app'
      ],
      faq: [
        {
          question: 'Kan ik studietijd per vak bijhouden?',
          answer:
            'Ja. Maak een skill per vak of examen, en SkillQuest houdt tijd, XP en statistieken apart bij voor elk vak.'
        },
        {
          question: 'Welke timer is het beste om te studeren?',
          answer:
            'Pomodoro werkt goed voor herhalingssprints, terwijl Deep Work of Flowtime beter passen bij langere studie- of proefexamensessies.'
        },
        {
          question: 'Is de studietimer gratis?',
          answer:
            'Ja. Skill tracking, Pomodoro, XP en levels zijn beschikbaar in de gratis versie.'
        }
      ]
    },
    'deep-work-flowtime': {
      slug: 'deep-work-flowtime',
      eyebrow: 'Deep Work & Flowtime',
      title: 'Langere focusblokken voor werk dat diepgang vraagt',
      metaTitle: 'Deep Work & Flowtime Timer | Premium focussessies | SkillQuest',
      metaDescription:
        'Gebruik Deep Work, 52-17 en Flowtime in SkillQuest voor langere, ononderbroken focussessies. Premium timertechnieken met eigen duur.',
      summary:
        'Wanneer een taak meer vraagt dan een sprint van 25 minuten, geven Deep Work, 52-17 en Flowtime je langere, flexibele focusblokken die nog steeds meetellen voor XP en voortgang.',
      cardSummary:
        'Deep Work, 52-17 en Flowtime voor langere, flexibele focussessies.',
      screenshot: '02-focus-timer.png',
      primaryCta: 'Vergelijk Premium',
      secondaryCta: 'Bekijk alle timertechnieken',
      sections: [
        {
          title: 'Deep Work voor ononderbroken focusblokken',
          body:
            'Deep Work is gebouwd voor langere, single-task sessies, voor werk dat waarde verliest als het elke 25 minuten wordt onderbroken.',
          bullets: [
            'Langere focusblokken dan Pomodoro, gericht op één taak.',
            'Telt mee voor dezelfde XP, levels en statistieken als elke andere sessie.',
            'Onderdeel van de Premium timertechnieken.'
          ]
        },
        {
          title: '52-17 voor een gestructureerd lang-focus-ritme',
          body:
            '52 minuten focus gevolgd door een pauze van 17 minuten is een ritme gebouwd rond natuurlijke aandachtscycli, nuttig voor langere werk- of studieblokken.',
          bullets: [
            'Een vaste, onderzoeksgeïnspireerde verhouding tussen focus en pauze.',
            'Geschikt voor werk- of studiesessies van meerdere uren.',
            'Inbegrepen bij Premium naast andere timertechnieken.'
          ]
        },
        {
          title: 'Flowtime voor flexibele, zelfgestuurde sessies',
          body:
            'Flowtime legt je niet vast op een vaste duur. Je werkt tot je vanzelf een pauze wilt, en de sessie telt nog steeds mee.',
          bullets: [
            'Eigen duur, ingesteld door jou in plaats van een vaste techniek.',
            'Geschikt voor creatief werk, programmeren of schrijfsessies.',
            'Smart breaks schalen mee met hoelang je gefocust was.'
          ]
        }
      ],
      seoTerms: [
        'deep work timer',
        'flowtime timer',
        '52 17 regel timer',
        'aangepaste focus timer',
        'lange focussessie app'
      ],
      faq: [
        {
          question: 'Wat is het verschil tussen Deep Work en Flowtime?',
          answer:
            'Deep Work is een langer, vast focusblok, terwijl Flowtime je een eigen duur laat instellen en op je eigen tempo laat werken.'
        },
        {
          question: 'Is 52-17 hetzelfde als Pomodoro?',
          answer:
            'Nee. 52-17 gebruikt langere focusperiodes en pauzes dan het klassieke 25/5-ritme van Pomodoro.'
        },
        {
          question: 'Zijn deze timertechnieken gratis?',
          answer:
            'Deep Work, 52-17 en Flowtime zijn onderdeel van Premium, samen met eigen timerduur en diepere statistieken.'
        }
      ]
    },
    leaderboards: {
      slug: 'leaderboards',
      eyebrow: 'Rankings',
      title: 'Zie hoe je voortgang zich verhoudt, op jouw voorwaarden',
      metaTitle: 'Leaderboards & Rankings App | Vergelijk skill-voortgang | SkillQuest',
      metaDescription:
        'SkillQuest rankings vergelijken XP en actieve dagen per week, maand en all-time, met bronze-tot-diamond leagues voor blijvende motivatie.',
      summary:
        'Rankings maken van XP en actieve dagen een ranglijst die je wekelijks, maandelijks of all-time kunt bekijken, met leagues die competitie een gevoel van progressie geven.',
      cardSummary:
        'Wekelijkse, maandelijkse en all-time rankings met bronze-tot-diamond leagues.',
      screenshot: '05-rankings.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'Voeg vrienden toe',
      sections: [
        {
          title: 'Rankings over verschillende periodes',
          body:
            'Eén all-time ranglijst kan onbereikbaar aanvoelen als je net begint. SkillQuest rangschikt daarom over wekelijkse, maandelijkse en all-time periodes.',
          bullets: [
            'Wekelijkse en maandelijkse rankings resetten de race regelmatig.',
            'All-time rankings belonen langdurige consistentie.',
            'Rankings zijn gebaseerd op XP en actieve dagen.'
          ]
        },
        {
          title: 'Leagues geven een gevoel van progressie',
          body:
            'Leagues van bronze tot diamond maken van competitie iets waar je doorheen beweegt, geen enkele vaste ranglijst.',
          bullets: [
            'Stijg door leagues terwijl je actief blijft.',
            'Concurreer met mensen op een vergelijkbaar niveau, niet iedereen tegelijk.',
            'Leagues staan naast vrienden en challenges voor extra motivatie.'
          ]
        },
        {
          title: 'Competitie zonder je eigen voortgang te verliezen',
          body:
            'Rankings werken naast je persoonlijke statistieken, niet in plaats daarvan, zodat concurreren niet betekent dat je je eigen groei uit het oog verliest.',
          bullets: [
            'Persoonlijke XP, levels en streaks blijven zichtbaar, ongeacht rang.',
            'Rankings passen van nature bij vrienden en challenges.',
            'Nuttig voor competitieve gebruikers, optioneel voor de rest.'
          ]
        }
      ],
      seoTerms: [
        'leaderboard app',
        'skill ranglijst',
        'ranking productiviteits-app',
        'xp ranglijst',
        'competitieve gewoonte app'
      ],
      faq: [
        {
          question: 'Hoe worden rankings berekend?',
          answer:
            'Rankings zijn gebaseerd op XP en actieve dagen, getoond per week, maand en all-time.'
        },
        {
          question: 'Wat zijn leagues?',
          answer:
            'Leagues groeperen gebruikers van bronze tot diamond, zodat competitie plaatsvindt tussen mensen op een vergelijkbaar niveau in plaats van iedereen tegelijk.'
        },
        {
          question: 'Moet ik concurreren om SkillQuest te gebruiken?',
          answer:
            'Nee. Rankings en leagues zijn optioneel. Kern skill tracking, XP en levels werken hetzelfde met of zonder.'
        }
      ]
    },
    themes: {
      slug: 'themes',
      eyebrow: 'Thema’s',
      title: 'Maak SkillQuest jouw app',
      metaTitle: 'App Thema’s & Personalisatie | Licht, Donker & Ontgrendelbare Thema’s | SkillQuest',
      metaDescription:
        'SkillQuest ondersteunt licht, donker en systeemmodus plus ontgrendelbare thema’s gekoppeld aan je voortgang, zodat de app eruitziet zoals jij wilt.',
      summary:
        'Lichte modus, donkere modus, systeemmodus en een set ontgrendelbare thema’s laten SkillQuest eruitzien en aanvoelen zoals jij wilt, met sommige thema’s gekoppeld aan je eigen voortgang.',
      cardSummary:
        'Licht, donker en systeemmodus, plus thema’s die je ontgrendelt door voortgang.',
      screenshot: '07-themes-profile.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'Bekijk hoe streaks werken',
      sections: [
        {
          title: 'Licht, donker en systeemmodus',
          body:
            'SkillQuest volgt standaard je apparaat, maar je kunt het altijd vastzetten op lichte of donkere modus wanneer je dat wilt.',
          bullets: [
            'Systeemmodus volgt automatisch je apparaat.',
            'Schakel op elk moment handmatig naar lichte of donkere modus.',
            'Elk thema is gebouwd volgens Material 3-standaarden voor consistent contrast.'
          ]
        },
        {
          title: 'Thema’s die je ontgrendelt, niet alleen kiest',
          body:
            'Sommige thema’s zijn gekoppeld aan je voortgang, zodat personalisatie een andere vorm van zichtbare groei wordt, niet slechts een instellingenmenu.',
          bullets: [
            'Ontgrendel extra thema’s door consistente voortgang.',
            'Gratis ontgrendelingen staan naast Premium themaopties.',
            'Thema-ontgrendelingen sluiten aan bij hetzelfde streak- en XP-systeem als de rest.'
          ]
        },
        {
          title: 'Personalisatie die consistent blijft',
          body:
            'Thema’s veranderen kleur en sfeer, niet de structuur van de app, dus wisselen van thema betekent nooit opnieuw leren waar dingen staan.',
          bullets: [
            'Consistente layout in elk thema.',
            'Kleuren passen zich aan zonder leesbaarheid of contrast te breken.',
            'Werkt hetzelfde bij skill tracking, timers en statistieken.'
          ]
        }
      ],
      seoTerms: [
        'app thema’s',
        'donkere modus gewoonte app',
        'personalisatie app',
        'ontgrendelbare thema’s app',
        'licht donker modus app'
      ],
      faq: [
        {
          question: 'Ondersteunt SkillQuest donkere modus?',
          answer:
            'Ja. SkillQuest ondersteunt lichte modus, donkere modus en een systeemmodus die je apparaat volgt.'
        },
        {
          question: 'Hoe ontgrendel ik meer thema’s?',
          answer:
            'Sommige thema’s ontgrendel je door consistente voortgang, zoals streaks, naast thema’s beschikbaar met Premium.'
        },
        {
          question: 'Veranderen thema’s hoe de app werkt?',
          answer:
            'Nee. Thema’s veranderen alleen het uiterlijk. Skill tracking, timers en statistieken werken hetzelfde in elk thema.'
        }
      ]
    },
    'guest-mode': {
      slug: 'guest-mode',
      eyebrow: 'Guest Mode',
      title: 'Probeer SkillQuest voordat je een account maakt',
      metaTitle: 'Guest Mode | Probeer SkillQuest zonder account | SkillQuest',
      metaDescription:
        'Met SkillQuest Guest Mode volg je skills, start je focus timers en verdien je XP lokaal voordat je een account maakt, zodat je het risicovrij kunt proberen.',
      summary:
        'Guest Mode haalt de aanmeldstap weg. Volg skills, start focus timers en verdien XP lokaal op je apparaat, en maak een account wanneer je er klaar voor bent.',
      cardSummary:
        'Probeer kern skill tracking en focus timers lokaal, voordat je een account maakt.',
      screenshot: '01-home-progress.png',
      primaryCta: 'Begin als gast',
      secondaryCta: 'Vergelijk Free, Premium & Family',
      sections: [
        {
          title: 'Geen account nodig om te beginnen',
          body:
            'Met Guest Mode open je SkillQuest en begin je direct met het bijhouden van een skill, zonder aanmeldstap in de weg.',
          bullets: [
            'Kern skill tracking, focus timers, XP en levels werken in Guest Mode.',
            'Voortgang wordt lokaal opgeslagen op je apparaat.',
            'Geen e-mail of account nodig om de app te proberen.'
          ]
        },
        {
          title: 'Maak een account wanneer het zinvol is',
          body:
            'Guest Mode is een startpunt, geen doodlopende weg. Wanneer je klaar bent voor synchronisatie, vrienden of rankings, neemt het aanmaken van een account je lokale voortgang mee.',
          bullets: [
            'Zet om naar een volledig account zonder lokale voortgang te verliezen.',
            'Ontgrendelt synchronisatie tussen apparaten, vrienden en rankings.',
            'Geen druk om te beslissen voordat je de app hebt geprobeerd.'
          ]
        },
        {
          title: 'Wat beperkt blijft in Guest Mode',
          body:
            'Sommige functies zijn van nature afhankelijk van een account, omdat ze andere mensen of synchronisatie tussen apparaten betreffen.',
          bullets: [
            'Vrienden, challenges en rankings vereisen een account.',
            'Family-functies vereisen een account en een familiegroep.',
            'Alleen-lokale voortgang wordt niet geback-upt totdat je een account maakt.'
          ]
        }
      ],
      seoTerms: [
        'app proberen zonder account',
        'gewoonte tracker zonder aanmelden',
        'guest mode app',
        'skill tracker zonder account',
        'gratis proberen gewoonte app'
      ],
      faq: [
        {
          question: 'Heb ik een account nodig om SkillQuest te gebruiken?',
          answer:
            'Nee. Met Guest Mode gebruik je kern skill tracking en focus timers zonder een account aan te maken.'
        },
        {
          question: 'Wat gebeurt er met mijn voortgang als ik later een account maak?',
          answer:
            'Overstappen vanuit Guest Mode neemt je lokale voortgang mee naar je nieuwe account.'
        },
        {
          question: 'Wat kan ik niet doen in Guest Mode?',
          answer:
            'Vrienden, challenges, rankings en Family-functies vereisen een account, omdat ze synchronisatie met andere mensen inhouden.'
        }
      ]
    }
  },
  en: {
    'focus-timer': {
      slug: 'focus-timer',
      eyebrow: 'Focus Timer',
      title: 'A focus timer that keeps progress visible',
      metaTitle: 'Focus Timer App | Pomodoro, Deep Work, and Flowtime | SkillQuest',
      metaDescription:
        'Use SkillQuest as a focus timer for Pomodoro, Deep Work, 52-17, Flowtime, Until Time, and EMOM. Each session counts toward XP, levels, and progress.',
      summary:
        'Start a timer for the skill you are building. SkillQuest connects focused minutes to XP, levels, statistics, and visible growth.',
      cardSummary:
        'Pomodoro, Deep Work, Flowtime, and other timer modes connected to real skill progress.',
      screenshot: '02-focus-timer.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'Compare Premium',
      sections: [
        {
          title: 'Choose the timer for the work ahead',
          body:
            'SkillQuest supports multiple focus methods, so you are not locked into one Pomodoro workflow.',
          bullets: [
            'Pomodoro for short study and work sprints.',
            'Deep Work and 52-17 for longer concentration blocks.',
            'Flowtime and Until Time for flexible sessions.',
            'EMOM for interval training and active routines.'
          ]
        },
        {
          title: 'Every minute belongs to a skill',
          body:
            'A timer is not separate from progress. Choose a skill first, then watch XP, levels, and statistics grow.',
          bullets: [
            'Earn XP after completed sessions.',
            'Review sessions per skill in statistics.',
            'Use smart breaks where supported by the timer mode.'
          ]
        },
        {
          title: 'Premium unlocks more focus freedom',
          body:
            'Premium is for users who want more timer techniques, custom duration, and deeper statistics.',
          bullets: [
            'Advanced techniques such as Deep Work, 52-17, and Flowtime.',
            'Custom Flowtime duration and personalized timers.',
            'More history and expanded progress insights.',
            'Premium is EUR 3.99/month or EUR 39.99/year.'
          ]
        }
      ],
      seoTerms: [
        'focus timer app',
        'pomodoro timer',
        'deep work timer',
        'flowtime timer',
        'study timer'
      ],
      faq: [
        {
          question: 'Can I use SkillQuest as a Pomodoro timer?',
          answer:
            'Yes. Pomodoro is supported, with XP, levels, and progress per skill added on top.'
        },
        {
          question: 'Which timer methods does SkillQuest support?',
          answer:
            'The app supports Pomodoro, 52-17, Deep Work, Flowtime, Until Time, and EMOM. Some advanced features belong to Premium.'
        },
        {
          question: 'Is my focus progress saved?',
          answer:
            'Completed sessions are linked to the selected skill, making XP, statistics, and progress visible.'
        }
      ]
    },
    family: {
      slug: 'family',
      eyebrow: 'Family',
      title: 'Help children practice with structure, goals, and visible progress',
      metaTitle: 'Family App for Parents | Timers, Goals, and Child Stats | SkillQuest',
      metaDescription:
        'With SkillQuest Family, parents can start timers for children, view child statistics, set weekly goals, and send compliments.',
      summary:
        'Family gives parents structure without taking over a child’s progress. Timers, goals, XP, and compliments make practice time concrete.',
      cardSummary:
        'Parents can start timers, view child statistics, set goals, and support children with positive feedback.',
      screenshot: '06-social-family.png',
      primaryCta: 'View Family',
      secondaryCta: 'Download the app',
      sections: [
        {
          title: 'Parents get insight into practice time',
          body:
            'With Family, parents can see which sessions were started and how progress develops by skill.',
          bullets: [
            'View sessions, minutes, XP, and active skills.',
            'See recent activity and skill breakdowns.',
            'Use visible effort to support conversations about school, sports, music, or creative work.'
          ]
        },
        {
          title: 'Start timers for children',
          body:
            'Parents and owners can start a timer for a child. The session is linked to the child, so progress stays visible there.',
          bullets: [
            'Choose a child and skill from the family setup.',
            'Turn practice time into a clear next step.',
            'Children can see timers started by parents.'
          ]
        },
        {
          title: 'Work toward goals together',
          body:
            'Family supports weekly goals and compliments, so guidance is not just control.',
          bullets: [
            'Set goals in minutes or sessions.',
            'Track progress toward the goal.',
            'Send compliments for effort and growth.',
            'Family is EUR 6.99/month or EUR 69.99/year.'
          ]
        }
      ],
      seoTerms: [
        'parent dashboard app',
        'kids habit tracker',
        'child progress tracker',
        'family productivity app',
        'family plan app'
      ],
      faq: [
        {
          question: 'Can parents start timers for children?',
          answer:
            'Yes. With Family, parents and owners can start timers for children inside the family setup.'
        },
        {
          question: 'Can I view my child’s progress?',
          answer:
            'Yes. Family includes child statistics with sessions, minutes, XP, skill breakdowns, and recent activity.'
        },
        {
          question: 'Is Family included in Premium?',
          answer:
            'No. Family is a separate household subscription with Premium plus parent roles, child stats, child timers, goals, and compliments.'
        },
        {
          question: 'What age is SkillQuest for?',
          answer:
            'SkillQuest uses a 13+ privacy framework, so child-focused marketing should be phrased carefully.'
        }
      ]
    },
    'skill-tracker': {
      slug: 'skill-tracker',
      eyebrow: 'Skill Tracker',
      title: 'Track skills instead of loose tasks',
      metaTitle: 'Skill Tracker App | XP, Levels, and Practice Time | SkillQuest',
      metaDescription:
        'SkillQuest is a skill tracker for study, sports, music, reading, coding, creative work, and routines. Start timers and track XP, levels, and progress.',
      summary:
        'SkillQuest helps you choose what to practice, measure the time you invest, and make growth visible by skill.',
      cardSummary:
        'Choose a skill, start a timer, and watch XP, levels, and progress grow.',
      screenshot: '01-home-progress.png',
      primaryCta: 'Start free',
      secondaryCta: 'View focus timers',
      sections: [
        {
          title: 'Built around skills',
          body:
            'Use SkillQuest for study, sports, music, reading, coding, creative work, or any routine that needs practice.',
          bullets: [
            '78 recognizable skill icons in the app.',
            'Favorites and most-used skills for quick access.',
            'Skill names and search data are localized.'
          ]
        },
        {
          title: 'From practice time to progress',
          body:
            'Every session can feed XP, levels, streaks, and statistics, so you see what you actually practiced.',
          bullets: [
            'XP and levels per skill.',
            'Session rewards after completed focus.',
            'Statistics by period and skill.'
          ]
        },
        {
          title: 'Try before creating an account',
          body:
            'Guest Mode lowers the barrier. Start before creating an account or syncing progress.',
          bullets: [
            'Start with core skill tracking immediately.',
            'Create an account later for sync, friends, rankings, and expanded features.',
            'Ad-free positioning should remain tied to release audits.'
          ]
        }
      ],
      seoTerms: [
        'skill tracker app',
        'skill development app',
        'practice tracker',
        'learning progress tracker',
        'track skills'
      ],
      faq: [
        {
          question: 'Is SkillQuest a habit tracker?',
          answer:
            'SkillQuest can support routines, but it is stronger as a skill tracker: each focused minute is linked to a skill.'
        },
        {
          question: 'Which skills can I track?',
          answer:
            'Use it for study, sports, music, reading, coding, creative work, and personal routines.'
        },
        {
          question: 'Can I start for free?',
          answer:
            'Yes. SkillQuest includes a free start with Guest Mode and core skill tracking.'
        }
      ]
    },
    'progress-statistics': {
      slug: 'progress-statistics',
      eyebrow: 'Progress Tracking',
      title: 'See where your time actually goes',
      metaTitle: 'Progress Tracking App | Stats, XP, and Skill Breakdown | SkillQuest',
      metaDescription:
        'View SkillQuest statistics by day, week, month, and year. Track XP, sessions, minutes, skill breakdowns, and child stats with Family.',
      summary:
        'SkillQuest makes practice time measurable with statistics, skill breakdowns, XP, session history, and progress by period.',
      cardSummary:
        'Review sessions, minutes, XP, skill breakdowns, and trends by period.',
      screenshot: '04-statistics.png',
      primaryCta: 'View the app',
      secondaryCta: 'Compare Premium',
      sections: [
        {
          title: 'Statistics by period',
          body:
            'Review activity by day, week, month, and year, so you see patterns instead of isolated sessions.',
          bullets: [
            'Time, sessions, and XP by period.',
            'Skill breakdowns for better insight.',
            'Progress reports and optional notifications for recurring motivation.'
          ]
        },
        {
          title: 'Deeper insights with Premium',
          body:
            'Premium is for users who want to look beyond basic statistics.',
          bullets: [
            'Expanded statistics and trends.',
            'More session history for long-term insight.',
            'Data export exists in product models and should be visually confirmed before prominent claims.'
          ]
        },
        {
          title: 'Insight for families',
          body:
            'With Family, parents can review child progress and make practice time easier to discuss.',
          bullets: [
            'Child stats with sessions, minutes, and XP.',
            'Skill breakdowns and recent activity.',
            'Goals and compliments make guidance more concrete.'
          ]
        }
      ],
      seoTerms: [
        'progress tracking app',
        'productivity statistics',
        'skill progress dashboard',
        'time tracking statistics',
        'child progress tracker'
      ],
      faq: [
        {
          question: 'Which statistics does SkillQuest show?',
          answer:
            'SkillQuest shows sessions, minutes, XP, skill breakdowns, and progress by period.'
        },
        {
          question: 'Can I view long-term trends?',
          answer:
            'Premium includes expanded statistics and more history. Check the app for the current visible feature set.'
        },
        {
          question: 'Can parents view children’s statistics?',
          answer:
            'Yes. Family includes child statistics for parents and owners inside the family setup.'
        }
      ]
    },
    'pomodoro-timer': {
      slug: 'pomodoro-timer',
      eyebrow: 'Pomodoro Timer',
      title: 'A Pomodoro timer built around your skills',
      metaTitle: 'Pomodoro Timer App | Study & Focus Sessions | SkillQuest',
      metaDescription:
        'Use SkillQuest as a free Pomodoro timer for studying and focused work. Every 25-minute sprint counts toward XP, levels, and skill progress.',
      summary:
        'The classic 25/5 Pomodoro rhythm, built into SkillQuest so every sprint feeds XP, levels, and progress for the skill you are practicing.',
      cardSummary:
        'The classic 25/5 focus rhythm, connected to XP, levels, and skill progress.',
      screenshot: '02-focus-timer.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'Compare timer techniques',
      sections: [
        {
          title: 'The Pomodoro technique, without the separate app',
          body:
            'Pomodoro splits work into short, focused sprints with regular breaks. SkillQuest builds this in as one of several timer techniques, so you do not need a separate Pomodoro app next to your tracker.',
          bullets: [
            '25-minute focus sprints with built-in breaks.',
            'Available on the free tier, no subscription required.',
            'Works for studying, work tasks, reading, or any skill you track.'
          ]
        },
        {
          title: 'Every sprint counts toward a skill',
          body:
            'A Pomodoro timer on its own only measures time. SkillQuest links each sprint to the skill you chose, so focus becomes visible progress.',
          bullets: [
            'Earn XP after every completed Pomodoro session.',
            'See sessions grouped by skill in your statistics.',
            'Track streaks for consistent Pomodoro habits.'
          ]
        },
        {
          title: 'Beyond Pomodoro when you need more',
          body:
            'Some tasks need longer or more flexible focus blocks than 25 minutes. SkillQuest includes other techniques you can switch to without leaving the app.',
          bullets: [
            'Deep Work and 52-17 for longer sessions.',
            'Flowtime and Until Time for flexible durations.',
            'Premium unlocks the full set of timer techniques.'
          ]
        }
      ],
      seoTerms: [
        'pomodoro timer app',
        'pomodoro timer for studying',
        '25 minute timer',
        'study pomodoro app',
        'free pomodoro timer'
      ],
      faq: [
        {
          question: 'Is the Pomodoro timer free in SkillQuest?',
          answer:
            'Yes. Pomodoro is available on the free tier, along with XP, levels, and basic statistics.'
        },
        {
          question: 'Can I use Pomodoro for studying?',
          answer:
            'Yes. Many users track study sessions with Pomodoro, linking each sprint to a study-related skill.'
        },
        {
          question: 'What happens after a Pomodoro session ends?',
          answer:
            'The session is added to your skill statistics and earns XP, so your focus time turns into visible progress.'
        }
      ]
    },
    streaks: {
      slug: 'streaks',
      eyebrow: 'Streaks',
      title: 'Turn consistency into a streak you can see',
      metaTitle: 'Streak Tracker App with XP | Build Daily Habits | SkillQuest',
      metaDescription:
        'SkillQuest tracks a daily streak for every skill you practice, with XP, levels, and streak freezes so one missed day does not erase your progress.',
      summary:
        'A daily streak tracks how consistently you show up, backed by XP and levels so consistency feels like progress, not just a number.',
      cardSummary:
        'Daily streaks with XP and streak freezes, so consistency stays visible.',
      screenshot: '03-session-reward.png',
      primaryCta: 'Start your streak',
      secondaryCta: 'See how XP works',
      sections: [
        {
          title: 'Streaks that reward showing up',
          body:
            'Every day you complete a focus session, your streak grows. It is a simple, visible signal that turns "did I practice today?" into a running count.',
          bullets: [
            'Earn 10 XP for an active day, on top of session XP.',
            'Streaks work across all the skills you track.',
            'See your current and longest streak at a glance.'
          ]
        },
        {
          title: 'Streak freezes protect an occasional miss',
          body:
            'Life gets in the way sometimes. Streak freezes mean one missed day does not have to reset weeks of consistency.',
          bullets: [
            'Protect your streak from an occasional missed day.',
            'Keep long-term motivation without an all-or-nothing feel.',
            'Milestone streaks (7, 30, 100+ days) can trigger shareable activity posts.'
          ]
        },
        {
          title: 'Streaks unlock more than numbers',
          body:
            'Consistency in SkillQuest is tied to more than a counter: themes and rewards connect to your progress.',
          bullets: [
            'Unlock themes through consistent progress.',
            'Combine streaks with XP and levels for a fuller picture.',
            'Use streak milestones as natural check-in points.'
          ]
        }
      ],
      seoTerms: [
        'streak tracker app',
        'habit tracker with streaks',
        'daily streak app',
        'xp habit tracker',
        'gamified habit tracker'
      ],
      faq: [
        {
          question: 'How does the streak system work in SkillQuest?',
          answer:
            'Completing a focus session on a given day keeps your streak alive and earns 10 XP for that active day, on top of session XP.'
        },
        {
          question: 'What happens if I miss a day?',
          answer:
            'Streak freezes can protect your streak from an occasional missed day, so one gap does not erase your progress.'
        },
        {
          question: 'Is streak tracking free?',
          answer:
            'Yes. Daily streaks, XP, and levels are part of the free tier.'
        }
      ]
    },
    'friends-challenges': {
      slug: 'friends-challenges',
      eyebrow: 'Friends & Challenges',
      title: 'Make progress a little more social',
      metaTitle: 'Friends & Challenges App | Accountability for Focus & Skills | SkillQuest',
      metaDescription:
        'Add friends, join XP Race and Active Days challenges, and share progress on your own terms with SkillQuest social features and privacy controls.',
      summary:
        'Add friends, start challenges, and get accountability when you want it, with privacy controls that keep sharing on your own terms.',
      cardSummary:
        'Friends, challenges, and an activity feed, with privacy controls you control.',
      screenshot: '06-social-family.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'View leaderboards',
      sections: [
        {
          title: 'Add friends for real accountability',
          body:
            'Progress tracked alone can be easy to ignore. Adding friends inside SkillQuest brings in the kind of accountability that comes from people you actually know.',
          bullets: [
            'Send and accept friend requests inside the app.',
            'See friend stats when both sides allow it.',
            'A privacy toggle keeps sharing under your control.'
          ]
        },
        {
          title: 'Challenges that work toward a shared goal',
          body:
            'Challenges turn individual practice into a shared push, whether that is an XP Race or an Active Days Battle.',
          bullets: [
            'Start an XP Race or Active Days Battle with friends.',
            'Track challenge progress and recent activity together.',
            'See who is ahead without losing sight of your own progress.'
          ]
        },
        {
          title: 'An activity feed that celebrates milestones',
          body:
            'Streaks and other milestones can show up as activity posts, so progress gets noticed without turning into a public feed.',
          bullets: [
            'Automatic posts for milestones like 7, 30, or 100 active days.',
            'Privacy-aware posting respects your settings.',
            'Built for friends and accepted connections, not a public timeline.'
          ]
        }
      ],
      seoTerms: [
        'friends challenges app',
        'accountability app',
        'skill challenges',
        'leaderboard productivity app',
        'social habit tracker'
      ],
      faq: [
        {
          question: 'Do I need friends to use SkillQuest?',
          answer:
            'No. Friends and challenges are optional social features on top of core skill tracking.'
        },
        {
          question: 'Can I control what friends see?',
          answer:
            'Yes. A privacy toggle controls whether friends can see your stats and activity.'
        },
        {
          question: 'What kinds of challenges can I start?',
          answer:
            'SkillQuest supports challenge types such as XP Race and Active Days Battle, with shared progress tracking.'
        }
      ]
    },
    'study-timer': {
      slug: 'study-timer',
      eyebrow: 'Study Timer',
      title: 'A study timer that tracks more than the clock',
      metaTitle: 'Study Timer App | Track Study Sessions by Subject | SkillQuest',
      metaDescription:
        'Use SkillQuest as a study timer for exams, homework, and revision. Track study time per subject with XP, levels, and statistics.',
      summary:
        'Turn study sessions into visible progress per subject, with focus timers, XP, and statistics built for repeated studying, not just a single countdown.',
      cardSummary:
        'Study sessions tracked per subject, with XP, levels, and statistics.',
      screenshot: '02-focus-timer.png',
      primaryCta: 'Start studying with SkillQuest',
      secondaryCta: 'Compare focus timers',
      sections: [
        {
          title: 'Track study time per subject, not just in total',
          body:
            'Treat each subject or exam as its own skill, so you can see exactly how study time is split, not just one combined number.',
          bullets: [
            'Create a skill per subject, course, or exam.',
            'Choose Pomodoro, Deep Work, or Flowtime depending on the task.',
            'See session history and totals per subject.'
          ]
        },
        {
          title: 'Built-in structure for exam periods',
          body:
            'Studying for exams often means switching between short review sprints and longer deep sessions. SkillQuest supports both without extra setup.',
          bullets: [
            'Short Pomodoro sprints for flashcards and quick review.',
            'Longer Deep Work or Flowtime sessions for practice exams.',
            'Smart breaks matched to the technique you choose.'
          ]
        },
        {
          title: 'Motivation for the long haul',
          body:
            'Study routines are easier to keep up when progress is visible, not just implied.',
          bullets: [
            'XP and levels per subject keep effort visible.',
            'Daily streaks support consistent study habits.',
            'Statistics show which subjects are getting attention and which are not.'
          ]
        }
      ],
      seoTerms: [
        'study timer app',
        'study tracker app',
        'exam study timer',
        'homework timer',
        'study pomodoro app'
      ],
      faq: [
        {
          question: 'Can I track study time per subject?',
          answer:
            'Yes. Create a skill for each subject or exam, and SkillQuest tracks time, XP, and statistics separately for each one.'
        },
        {
          question: 'Which timer is best for studying?',
          answer:
            'Pomodoro works well for review sprints, while Deep Work or Flowtime suit longer study or practice-exam sessions.'
        },
        {
          question: 'Is the study timer free?',
          answer:
            'Yes. Skill tracking, Pomodoro, XP, and levels are available on the free tier.'
        }
      ]
    },
    'deep-work-flowtime': {
      slug: 'deep-work-flowtime',
      eyebrow: 'Deep Work & Flowtime',
      title: 'Longer focus blocks for work that needs depth',
      metaTitle: 'Deep Work & Flowtime Timer | Premium Focus Sessions | SkillQuest',
      metaDescription:
        'Use Deep Work, 52-17, and Flowtime in SkillQuest for longer, uninterrupted focus sessions. Premium timer techniques with custom duration.',
      summary:
        'When a task needs more than a 25-minute sprint, Deep Work, 52-17, and Flowtime give you longer, flexible focus blocks that still count toward XP and progress.',
      cardSummary:
        'Deep Work, 52-17, and Flowtime for longer, flexible focus sessions.',
      screenshot: '02-focus-timer.png',
      primaryCta: 'Compare Premium',
      secondaryCta: 'View all timer techniques',
      sections: [
        {
          title: 'Deep Work for uninterrupted focus blocks',
          body:
            'Deep Work is built for extended, single-task sessions, for the kind of work that loses value if it gets interrupted every 25 minutes.',
          bullets: [
            'Longer focus blocks than Pomodoro, aimed at a single task.',
            'Counts toward the same XP, levels, and statistics as any other session.',
            'Part of the Premium timer techniques.'
          ]
        },
        {
          title: '52-17 for a structured long-focus rhythm',
          body:
            '52 minutes of focus followed by a 17-minute break is a rhythm built around natural attention cycles, useful for longer work or study blocks.',
          bullets: [
            'A fixed, research-inspired focus-to-break ratio.',
            'Good for multi-hour work or study sessions.',
            'Included with Premium alongside other timer techniques.'
          ]
        },
        {
          title: 'Flowtime for flexible, self-paced sessions',
          body:
            'Flowtime does not lock you into a fixed duration. You work until you naturally want a break, and the session still counts.',
          bullets: [
            'Custom duration, set by you rather than a fixed technique.',
            'Suited to creative work, coding, or writing sessions.',
            'Smart breaks scale with how long you focused.'
          ]
        }
      ],
      seoTerms: [
        'deep work timer',
        'flowtime timer',
        '52 17 rule timer',
        'custom focus timer',
        'long focus session app'
      ],
      faq: [
        {
          question: 'What is the difference between Deep Work and Flowtime?',
          answer:
            'Deep Work is a longer, fixed-style focus block, while Flowtime lets you set a custom duration and work at your own pace.'
        },
        {
          question: 'Is 52-17 the same as Pomodoro?',
          answer:
            'No. 52-17 uses longer focus periods and breaks than the classic 25/5 Pomodoro rhythm.'
        },
        {
          question: 'Are these timer techniques free?',
          answer:
            'Deep Work, 52-17, and Flowtime are part of Premium, alongside custom timer durations and deeper statistics.'
        }
      ]
    },
    leaderboards: {
      slug: 'leaderboards',
      eyebrow: 'Leaderboards',
      title: 'See how your progress compares, on your terms',
      metaTitle: 'Leaderboards & Rankings App | Compete on Skill Progress | SkillQuest',
      metaDescription:
        'SkillQuest rankings compare XP and active days across weekly, monthly, and all-time periods, with bronze-to-diamond leagues for ongoing motivation.',
      summary:
        'Rankings turn XP and active days into a leaderboard you can check weekly, monthly, or all-time, with leagues that give competition a sense of progression.',
      cardSummary:
        'Weekly, monthly, and all-time rankings with bronze-to-diamond leagues.',
      screenshot: '05-rankings.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'Add friends',
      sections: [
        {
          title: 'Rankings across different time periods',
          body:
            'A single all-time ranking can feel out of reach if you are just starting out. SkillQuest ranks across weekly, monthly, and all-time periods instead.',
          bullets: [
            'Weekly and monthly rankings reset the race regularly.',
            'All-time rankings reward long-term consistency.',
            'Rankings are based on XP and active days.'
          ]
        },
        {
          title: 'Leagues add a sense of progression',
          body:
            'Leagues from bronze to diamond turn competition into something you move through, not a single fixed leaderboard.',
          bullets: [
            'Move up through leagues as you stay active.',
            'Compete against people at a similar level, not everyone at once.',
            'Leagues sit alongside friends and challenges for extra motivation.'
          ]
        },
        {
          title: 'Competition without losing your own progress',
          body:
            'Rankings work alongside your personal statistics, not instead of them, so competing does not mean losing sight of your own growth.',
          bullets: [
            'Personal XP, levels, and streaks stay visible regardless of rank.',
            'Rankings pair naturally with friends and challenges.',
            'Useful for competitive users, optional for everyone else.'
          ]
        }
      ],
      seoTerms: [
        'leaderboard app',
        'skill leaderboard',
        'ranking productivity app',
        'xp leaderboard',
        'competitive habit tracker'
      ],
      faq: [
        {
          question: 'How are rankings calculated?',
          answer:
            'Rankings are based on XP and active days, shown across weekly, monthly, and all-time periods.'
        },
        {
          question: 'What are leagues?',
          answer:
            'Leagues group users from bronze to diamond, so competition happens against people at a similar level rather than everyone at once.'
        },
        {
          question: 'Do I have to compete to use SkillQuest?',
          answer:
            'No. Rankings and leagues are optional. Core skill tracking, XP, and levels work the same with or without them.'
        }
      ]
    },
    themes: {
      slug: 'themes',
      eyebrow: 'Themes',
      title: 'Make SkillQuest feel like your app',
      metaTitle: 'App Themes & Personalization | Light, Dark & Unlockable Themes | SkillQuest',
      metaDescription:
        'SkillQuest supports light, dark, and system mode plus unlockable themes tied to your progress, so the app looks the way you want it to.',
      summary:
        'Light mode, dark mode, system mode, and a set of unlockable themes let SkillQuest look and feel the way you want, with some themes tied to your own progress.',
      cardSummary:
        'Light, dark, and system mode, plus themes you unlock through progress.',
      screenshot: '07-themes-profile.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'See how streaks work',
      sections: [
        {
          title: 'Light, dark, and system mode',
          body:
            'SkillQuest follows your device by default, but you can lock it to light or dark mode whenever you prefer.',
          bullets: [
            'System mode matches your device automatically.',
            'Switch to light or dark mode manually at any time.',
            'Every theme is built to Material 3 standards for consistent contrast.'
          ]
        },
        {
          title: 'Themes you unlock, not just pick',
          body:
            'Some themes are tied to your progress, so personalization becomes another form of visible growth, not just a settings menu.',
          bullets: [
            'Unlock additional themes through consistent progress.',
            'Free unlocks sit alongside Premium theme options.',
            'Theme unlocks connect to the same streak and XP system as everything else.'
          ]
        },
        {
          title: 'Personalization that stays consistent',
          body:
            'Themes change color and mood, not the structure of the app, so switching themes never means relearning where things are.',
          bullets: [
            'Consistent layout across every theme.',
            'Colors adapt without breaking readability or contrast.',
            'Works the same across skill tracking, timers, and statistics.'
          ]
        }
      ],
      seoTerms: [
        'app themes',
        'dark mode habit app',
        'personalization app',
        'unlockable themes app',
        'light dark mode app'
      ],
      faq: [
        {
          question: 'Does SkillQuest support dark mode?',
          answer:
            'Yes. SkillQuest supports light mode, dark mode, and a system mode that follows your device.'
        },
        {
          question: 'How do I unlock more themes?',
          answer:
            'Some themes unlock through consistent progress, such as streaks, alongside themes available with Premium.'
        },
        {
          question: 'Do themes change how the app works?',
          answer:
            'No. Themes change appearance only. Skill tracking, timers, and statistics work the same across every theme.'
        }
      ]
    },
    'guest-mode': {
      slug: 'guest-mode',
      eyebrow: 'Guest Mode',
      title: 'Try SkillQuest before creating an account',
      metaTitle: 'Guest Mode | Try SkillQuest Without an Account | SkillQuest',
      metaDescription:
        'SkillQuest Guest Mode lets you track skills, run focus timers, and earn XP locally before creating an account, so you can try it risk-free.',
      summary:
        'Guest Mode removes the signup step. Track skills, run focus timers, and earn XP locally on your device, then create an account whenever you are ready.',
      cardSummary:
        'Try core skill tracking and focus timers locally, before creating an account.',
      screenshot: '01-home-progress.png',
      primaryCta: 'Start as a guest',
      secondaryCta: 'Compare Free, Premium & Family',
      sections: [
        {
          title: 'No account needed to get started',
          body:
            'Guest Mode lets you open SkillQuest and start tracking a skill immediately, with no signup step in the way.',
          bullets: [
            'Core skill tracking, focus timers, XP, and levels work in Guest Mode.',
            'Progress is stored locally on your device.',
            'No email or account required to try the app.'
          ]
        },
        {
          title: 'Create an account when it makes sense',
          body:
            'Guest Mode is a starting point, not a dead end. When you are ready for sync, friends, or rankings, creating an account carries your local progress forward.',
          bullets: [
            'Convert to a full account without losing local progress.',
            'Unlocks sync across devices, friends, and rankings.',
            'No pressure to decide before you have tried the app.'
          ]
        },
        {
          title: 'What stays limited in Guest Mode',
          body:
            'Some features depend on an account by nature, since they involve other people or cross-device sync.',
          bullets: [
            'Friends, challenges, and rankings need an account.',
            'Family features require an account and a family group.',
            'Local-only progress is not backed up until you create an account.'
          ]
        }
      ],
      seoTerms: [
        'try app without account',
        'no signup habit tracker',
        'guest mode app',
        'skill tracker no account',
        'free trial habit app'
      ],
      faq: [
        {
          question: 'Do I need an account to use SkillQuest?',
          answer:
            'No. Guest Mode lets you use core skill tracking and focus timers without creating an account.'
        },
        {
          question: 'What happens to my progress if I create an account later?',
          answer:
            'Converting from Guest Mode carries your local progress forward into your new account.'
        },
        {
          question: 'What can I not do in Guest Mode?',
          answer:
            'Friends, challenges, rankings, and Family features require an account, since they involve syncing with other people.'
        }
      ]
    }
  },
  de: {} as Record<FeatureLandingSlug, FeatureLandingPage>,
  fr: {} as Record<FeatureLandingSlug, FeatureLandingPage>,
  es: {} as Record<FeatureLandingSlug, FeatureLandingPage>,
  it: {} as Record<FeatureLandingSlug, FeatureLandingPage>
};

pages.de = {
  'focus-timer': {
    ...pages.en['focus-timer'],
    title: 'Ein Focus Timer, der deinen Fortschritt sichtbar macht',
    metaTitle: 'Focus Timer App | Pomodoro, Deep Work und Flowtime | SkillQuest',
    metaDescription:
      'Nutze SkillQuest als Focus Timer für Pomodoro, Deep Work, 52-17, Flowtime, Until Time und EMOM. Jede Session zählt für XP, Level und Fortschritt.',
    summary:
      'Starte einen Timer für die Fähigkeit, an der du arbeitest. SkillQuest verbindet Fokusminuten mit XP, Levels, Statistiken und sichtbarem Wachstum.',
    cardSummary:
      'Pomodoro, Deep Work, Flowtime und weitere Timer-Modi, verbunden mit echtem Skill-Fortschritt.',
    primaryCta: 'SkillQuest herunterladen',
    secondaryCta: 'Premium vergleichen',
    sections: [
      {
        title: 'Wähle den Timer, der zu deiner Aufgabe passt',
        body:
          'SkillQuest unterstützt mehrere Fokusformen, damit du nicht auf einen einzigen Pomodoro-Ablauf festgelegt bist.',
        bullets: [
          'Pomodoro für kurze Lern- und Arbeitsphasen.',
          'Deep Work und 52-17 für längere Konzentrationsblöcke.',
          'Flowtime und Until Time für flexible Sessions.',
          'EMOM für Intervalltraining und aktive Routinen.'
        ]
      },
      {
        title: 'Jede Minute zählt für eine Fähigkeit',
        body:
          'Ein Timer steht nicht getrennt vom Fortschritt. Du wählst zuerst eine Fähigkeit und siehst danach XP, Levels und Statistiken wachsen.',
        bullets: [
          'Verdiene XP nach abgeschlossenen Sessions.',
          'Verfolge Fokuszeit pro Fähigkeit.',
          'Sieh Sessions pro Skill in deinen Statistiken.',
          'Baue Streaks durch wiederholtes Üben auf.'
        ]
      },
      {
        title: 'Premium für mehr Fokusfreiheit',
        body:
          'Premium ist für Nutzer gedacht, die mehr Timer-Techniken, eigene Dauer und tiefere Statistiken wollen.',
        bullets: [
          'Eigene Flowtime-Dauer und personalisierte Timer.',
          'Erweiterte Timer-Modi für verschiedene Routinen.',
          'Mehr Verlauf und Statistiken für langfristigen Fortschritt.',
          'Premium kostet EUR 3.99 pro Monat oder EUR 39.99 pro Jahr.'
        ]
      }
    ],
    seoTerms: [
      'focus timer app',
      'pomodoro app',
      'deep work timer',
      'flowtime timer',
      'skill timer',
      'productivity timer'
    ],
    faq: [
      {
        question: 'Ist SkillQuest eine Pomodoro App?',
        answer:
          'Ja. SkillQuest unterstützt Pomodoro und weitere Fokusmodi wie 52-17, Deep Work, Flowtime, Until Time und EMOM. Einige erweiterte Funktionen gehören zu Premium.'
      },
      {
        question: 'Werden Timer mit Fähigkeiten verknüpft?',
        answer:
          'Ja. Abgeschlossene Sessions werden mit dem ausgewählten Skill verbunden, sodass XP, Statistiken und Fortschritt sichtbar werden.'
      },
      {
        question: 'Kann ich eigene Timer-Dauern nutzen?',
        answer:
          'Ja. Eigene Dauer und erweiterte Timer-Optionen sind Teil der Premium-Funktionen.'
      }
    ]
  },
  family: {
    ...pages.en.family,
    title: 'Hilf Kindern beim Üben mit Struktur, Zielen und sichtbarem Fortschritt',
    metaTitle: 'Family App für Eltern | Timer, Ziele und Kinderstatistiken | SkillQuest',
    metaDescription:
      'Mit SkillQuest Family können Eltern Timer für Kinder starten, Kinderstatistiken ansehen, Wochenziele setzen und Komplimente senden.',
    summary:
      'Family gibt Eltern Orientierung, ohne den Fortschritt des Kindes zu übernehmen. Timer, Ziele, XP und Komplimente machen Übungszeit konkret.',
    cardSummary:
      'Eltern können Timer starten, Kinderstatistiken ansehen, Ziele setzen und Kinder positiv begleiten.',
    primaryCta: 'Family ansehen',
    secondaryCta: 'App herunterladen',
    sections: [
      {
        title: 'Verfolge, wann Kinder üben',
        body:
          'Mit Family können Eltern sehen, welche Sessions gestartet wurden und wie sich Fortschritt pro Skill entwickelt.',
        bullets: [
          'Timer-Aktivität von Kindern ansehen.',
          'Kinderstatistiken für Sessions, Minuten und XP prüfen.',
          'Fortschritt pro Fähigkeit besprechen.',
          'Private Familienumgebung mit Elternrollen.'
        ]
      },
      {
        title: 'Timer für Kinder starten',
        body:
          'Eltern und Eigentümer können einen Timer für ein Kind starten. Die Session wird dem Kind zugeordnet, sodass der Fortschritt dort sichtbar bleibt.',
        bullets: [
          'Wähle ein Kind und einen Skill aus der Familienumgebung.',
          'Starte Übungszeit, wenn ein klares Ziel gebraucht wird.',
          'Verknüpfe Fokusminuten mit XP und Fortschritt.',
          'Kinder sehen Timer, die von Eltern gestartet wurden.'
        ]
      },
      {
        title: 'Gemeinsam auf Ziele hinarbeiten',
        body:
          'Family unterstützt Wochenziele und Komplimente, damit Begleitung nicht nur aus Kontrolle besteht.',
        bullets: [
          'Setze Ziele in Minuten oder Sessions.',
          'Sende Komplimente für Einsatz und Entwicklung.',
          'Gib Familien einen klaren nächsten Schritt.',
          'Family kostet EUR 6.99 pro Monat oder EUR 69.99 pro Jahr.'
        ]
      }
    ],
    seoTerms: [
      'family productivity app',
      'app fuer eltern',
      'kind timer app',
      'lern timer fuer kinder',
      'eltern kind app'
    ],
    faq: [
      {
        question: 'Können Eltern Timer für Kinder starten?',
        answer:
          'Ja. Mit Family können Eltern und Eigentümer Timer für Kinder innerhalb der Familienumgebung starten.'
      },
      {
        question: 'Kann ich den Fortschritt meines Kindes sehen?',
        answer:
          'Ja. Family enthält Kinderstatistiken mit Sessions, Minuten, XP, Skill-Aufschlüsselung und letzter Aktivität.'
      },
      {
        question: 'Ist Family in Premium enthalten?',
        answer:
          'Nein. Family ist ein eigenes Familienabo mit Premium plus Elternrollen, Kinderstatistiken, Timern für Kinder, Zielen und Komplimenten.'
      },
      {
        question: 'Ist SkillQuest für junge Kinder gedacht?',
        answer:
          'SkillQuest nutzt einen 13+-Datenschutzrahmen. Marketing rund um Kinder muss deshalb sorgfältig formuliert werden.'
      }
    ]
  },
  'skill-tracker': {
    ...pages.en['skill-tracker'],
    title: 'Verfolge Fähigkeiten statt nur Aufgaben',
    metaTitle: 'Skill Tracker App | XP, Levels und Skill-Fortschritt | SkillQuest',
    metaDescription:
      'SkillQuest ist ein Skill Tracker für Lernen, Sport, Musik, Lesen, Programmieren, kreatives Arbeiten und Routinen. Starte Timer und verfolge XP, Levels und Fortschritt.',
    summary:
      'SkillQuest hilft dir, Fähigkeiten aufzubauen, indem du echte Übungszeit mit Fortschritt, XP, Levels und Statistiken verbindest.',
    cardSummary:
      'Verfolge Fähigkeiten, XP, Levels, Streaks und Fokuszeit in einer mobilen App.',
    primaryCta: 'SkillQuest herunterladen',
    secondaryCta: 'Focus Timer ansehen',
    sections: [
      {
        title: 'Beginne mit dem Skill, nicht mit einer generischen Aufgabe',
        body:
          'SkillQuest richtet jede Session auf eine Fähigkeit aus, damit Arbeit, Lernen und Hobbys als Entwicklung sichtbar werden.',
        bullets: [
          'Nutze Startskills oder erstelle eigene Skills.',
          'Verfolge Lernen, Sport, Musik, Lesen, Code und kreative Arbeit.',
          'Kombiniere Timer mit XP, Levels und Streaks.',
          'Sieh, welche Fähigkeiten wirklich Aufmerksamkeit bekommen.'
        ]
      },
      {
        title: 'Gamification für wiederholtes Üben',
        body:
          'XP, Levels und Streaks machen Fortschritt greifbar, ohne zu behaupten, dass Ergebnisse garantiert sind.',
        bullets: [
          'XP nach abgeschlossenen Sessions.',
          'Levels als sichtbare Meilensteine.',
          'Streaks für wiederkehrende Routinen.',
          'Leaderboards und Challenges für zusätzliche Motivation.'
        ]
      },
      {
        title: 'Kostenlos starten, bei Bedarf upgraden',
        body:
          'Guest Mode und Free-Funktionen helfen beim Einstieg. Premium und Family fügen mehr Tiefe hinzu, wenn SkillQuest Teil deiner Routine wird.',
        bullets: [
          'Guest Mode für schnellen Start.',
          'Premium für mehr Timerfreiheit und Statistiken.',
          'Family für Eltern-Kind-Struktur.',
          'Datenschutzorientierte Synchronisierung für Konten.'
        ]
      }
    ],
    seoTerms: [
      'skill tracker app',
      'habit tracker alternative',
      'xp productivity app',
      'skill progress tracker',
      'practice tracker'
    ],
    faq: [
      {
        question: 'Welche Skills kann ich verfolgen?',
        answer:
          'SkillQuest kann für Lernen, Arbeit, Fitness, Musik, Lesen, Programmieren, kreative Projekte und eigene Routinen genutzt werden.'
      },
      {
        question: 'Kann ich eigene Skills erstellen?',
        answer:
          'Ja. SkillQuest unterstützt eigene Skills, damit die App zu deiner echten Routine passt.'
      },
      {
        question: 'Ist SkillQuest ein Habit Tracker?',
        answer:
          'SkillQuest überschneidet sich mit Habit Trackern, konzentriert sich aber stärker auf Fähigkeiten, Fokuszeit, XP, Levels und messbaren Fortschritt.'
      }
    ]
  },
  'progress-statistics': {
    ...pages.en['progress-statistics'],
    title: 'Sieh Fortschritt in Statistiken, XP und Skill-Verlauf',
    metaTitle: 'Fortschrittsstatistiken | Skill Tracking und XP | SkillQuest',
    metaDescription:
      'Sieh SkillQuest Statistiken nach Tag, Woche, Monat und Jahr. Verfolge XP, Sessions, Minuten, Skill-Aufschlüsselung und Kinderstatistiken mit Family.',
    summary:
      'SkillQuest macht Übungszeit messbar mit Statistiken, Skill-Aufschlüsselungen, XP, Session-Verlauf und Fortschritt pro Zeitraum.',
    cardSummary:
      'Statistiken für Fokusminuten, Sessions, XP, Skills und Family-Kinderfortschritt.',
    primaryCta: 'SkillQuest herunterladen',
    secondaryCta: 'Premium vergleichen',
    sections: [
      {
        title: 'Verstehe, wohin deine Zeit geht',
        body:
          'Statistiken helfen dir, Muster in Übungszeit und Skill-Fokus zu sehen, ohne sie als garantierte Ergebnisse zu verkaufen.',
        bullets: [
          'Sieh Sessions und Minuten pro Zeitraum.',
          'Vergleiche Skills und Aktivität.',
          'Nutze XP und Levels als Fortschrittssignale.',
          'Prüfe kürzliche Sessions und Verlauf.'
        ]
      },
      {
        title: 'Tiefere Einblicke mit Premium',
        body:
          'Premium ist für Nutzer gedacht, die mehr als Basisstatistiken sehen möchten.',
        bullets: [
          'Erweiterte Statistiken und Trends.',
          'Mehr Verlauf für langfristige Routinen.',
          'Bessere Sicht auf Skill-Aufschlüsselungen.',
          'Datenexport ist im Produktmodell als Premium-Funktion vorhanden und sollte vor prominenten Claims sichtbar bestätigt werden.'
        ]
      },
      {
        title: 'Kinderfortschritt mit Family sichtbar machen',
        body:
          'Mit Family können Eltern den Fortschritt von Kindern ansehen und Übungszeit leichter besprechen.',
        bullets: [
          'Kinderstatistiken mit Sessions, Minuten und XP.',
          'Timer-Aktivität zeigt, wann Übungszeit beginnt.',
          'Ziele und Komplimente machen Begleitung konkreter.',
          'Family ist ein eigenes Abo für Familien.'
        ]
      }
    ],
    seoTerms: [
      'productivity statistics',
      'skill statistics app',
      'time tracking statistics',
      'xp progress tracker',
      'family progress app'
    ],
    faq: [
      {
        question: 'Welche Statistiken zeigt SkillQuest?',
        answer:
          'SkillQuest zeigt Sessions, Minuten, XP, Skill-Fortschritt und Aktivität über verschiedene Zeiträume.'
      },
      {
        question: 'Kann ich langfristige Trends sehen?',
        answer:
          'Premium enthält erweiterte Statistiken und mehr Verlauf. Prüfe die App für den aktuell sichtbaren Funktionsumfang.'
      },
      {
        question: 'Können Eltern Kinderstatistiken ansehen?',
        answer:
          'Ja. Family enthält Kinderstatistiken für Eltern und Eigentümer innerhalb der Familienumgebung.'
      }
    ]
  },
  'pomodoro-timer': {
    slug: 'pomodoro-timer',
    eyebrow: 'Pomodoro-Timer',
    title: 'Ein Pomodoro-Timer, der auf deine Fähigkeiten zugeschnitten ist',
    metaTitle: 'Pomodoro-Timer-App | Lern- und Konzentrationssitzungen | SkillQuest',
    metaDescription:
      'Nutze SkillQuest als kostenlosen Pomodoro-Timer fürs Lernen und konzentriertes Arbeiten. Jeder 25-minütige Sprint zählt für XP, Level und den Fortschritt deiner Fähigkeiten.',
    summary:
      'Der klassische 25/5-Pomodoro-Rhythmus ist in SkillQuest integriert, sodass jeder Sprint dir XP, Level und Fortschritte für die Fähigkeit bringt, die du gerade trainierst.',
    cardSummary:
      'Der klassische 25/5-Fokusrhythmus, verbunden mit XP, Stufen und dem Fortschritt bei den Fertigkeiten.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'SkillQuest herunterladen',
    secondaryCta: 'Vergleiche Timer-Techniken',
    sections: [
      {
        title: 'Die Pomodoro-Technik – ganz ohne eigene App',
        body:
          'Bei der Pomodoro-Methode wird die Arbeit in kurze, konzentrierte Arbeitsphasen mit regelmäßigen Pausen unterteilt. SkillQuest integriert dies als eine von mehreren Timer-Techniken, sodass du neben deinem Tracker keine separate Pomodoro-App benötigst.',
        bullets: [
          '25-minütige Konzentrationssprints mit integrierten Pausen.',
          'Im kostenlosen Tarif verfügbar, kein Abonnement erforderlich.',
          'Eignet sich zum Lernen, für Arbeitsaufgaben, zum Lesen oder für jede andere Fähigkeit, die du nachverfolgst.'
        ]
      },
      {
        title: 'Jeder Sprint zählt für eine Fertigkeit',
        body:
          'Ein Pomodoro-Timer allein misst nur die Zeit. SkillQuest verknüpft jeden Sprint mit der von dir gewählten Fähigkeit, sodass aus Konzentration sichtbarer Fortschritt wird.',
        bullets: [
          'Verdiene nach jeder abgeschlossenen Pomodoro-Sitzung XP.',
          'Sieh dir in deinen Statistiken die nach Fähigkeiten gruppierten Sitzungen an.',
          'Verfolge deine Streaks, um deine Pomodoro-Gewohnheiten konsequent beizubehalten.'
        ]
      },
      {
        title: 'Mehr als nur Pomodoro – wenn du mehr brauchst',
        body:
          'Manche Aufgaben erfordern längere oder flexiblere Konzentrationsphasen als 25 Minuten. SkillQuest bietet weitere Techniken, zu denen du wechseln kannst, ohne die App zu verlassen.',
        bullets: [
          'Deep Work und 52-17 für längere Sitzungen.',
          'Flowtime und Until Time für flexible Zeiträume.',
          'Mit Premium schaltest du alle Timer-Techniken frei.'
        ]
      }
    ],
    seoTerms: [
      'Pomodoro-Timer-App',
      'Pomodoro-Timer fürs Lernen',
      '25-Minuten-Timer',
      'Pomodoro-App zum Lernen',
      'Kostenloser Pomodoro-Timer'
    ],
    faq: [
      {
        question: 'Ist der Pomodoro-Timer bei SkillQuest kostenlos?',
        answer:
          'Ja. Pomodoro ist in der kostenlosen Version verfügbar, ebenso wie XP, Level und grundlegende Statistiken.'
      },
      {
        question: 'Kann ich die Pomodoro-Technik zum Lernen nutzen?',
        answer:
          'Ja. Viele Nutzer erfassen ihre Lernsitzungen mit Pomodoro und verknüpfen jeden Sprint mit einer lernbezogenen Fähigkeit.'
      },
      {
        question: 'Was passiert, wenn eine Pomodoro-Sitzung zu Ende ist?',
        answer:
          'Die Sitzung wird zu deinen Skill-Statistiken hinzugefügt und bringt dir XP ein, sodass sich deine Konzentrationszeit in sichtbare Fortschritte verwandelt.'
      }
    ]
  },
  streaks: {
    slug: 'streaks',
    eyebrow: 'Streaks',
    title: 'Mach aus Beständigkeit eine Serie, die man sehen kann',
    metaTitle: 'Streak Tracker App mit XP | Tägliche Gewohnheiten aufbauen | SkillQuest',
    metaDescription:
      'SkillQuest verfolgt für jede Fähigkeit, die du übst, eine tägliche Serie – mit XP, Levels und Serien-Pausen, damit ein verpasster Tag deinen Fortschritt nicht zunichte macht.',
    summary:
      'Eine tägliche Serie hält fest, wie regelmäßig du dabei bist – unterstützt durch XP und Level, damit sich Regelmäßigkeit wie Fortschritt anfühlt und nicht nur wie eine Zahl.',
    cardSummary:
      'Tägliche Serien mit XP und Serienunterbrechungen, damit die Kontinuität sichtbar bleibt.',
    screenshot: '03-session-reward.png',
    primaryCta: 'Starte deine Serie',
    secondaryCta: 'Schau dir an, wie XP funktioniert',
    sections: [
      {
        title: 'Serien, bei denen man schon fürs Mitmachen belohnt wird',
        body:
          'Jeden Tag, an dem du eine Fokus-Sitzung absolvierst, wächst deine Serie. Das ist ein einfaches, sichtbares Zeichen, das aus der Frage „Habe ich heute geübt?“ eine fortlaufende Zählung macht.',
        bullets: [
          'Du bekommst 10 XP für einen aktiven Tag – zusätzlich zu den XP aus der Sitzung.',
          'Serien gelten für alle Fähigkeiten, die du verfolgst.',
          'Hier siehst du deine aktuelle und deine längste Serie auf einen Blick.'
        ]
      },
      {
        title: 'Serien-Freezes schützen vor gelegentlichen Fehlschlägen',
        body:
          'Manchmal kommt einem das Leben einfach dazwischen. Dank der „Streak-Freeze“-Funktion muss ein versäumter Tag nicht gleich bedeuten, dass wochenlange Beständigkeit zunichte gemacht wird.',
        bullets: [
          'Schütze deine Serie vor einem gelegentlichen Ausfalltag.',
          'Bleib langfristig motiviert, ohne das Gefühl zu haben, dass es nur „alles oder nichts“ gibt.',
          'Meilenstein-Serien (7, 30, 100+ Tage) können Beiträge auslösen, die geteilt werden können.'
        ]
      },
      {
        title: 'Serien bringen mehr als nur Zahlen',
        body:
          'Die Kontinuität bei SkillQuest beschränkt sich nicht nur auf einen Zähler: Themen und Belohnungen sind mit deinem Fortschritt verknüpft.',
        bullets: [
          'Schalte Themen durch kontinuierliche Fortschritte frei.',
          'Kombiniere Serien mit XP und Levels, um ein umfassenderes Bild zu erhalten.',
          'Nutze Meilensteine deiner Serie als natürliche Kontrollpunkte.'
        ]
      }
    ],
    seoTerms: [
      'App zum Nachverfolgen von Serien',
      'Gewohnheits-Tracker mit Serien',
      'App für tägliche Serien',
      'xp-Gewohnheits-Tracker',
      'Habit-Tracker mit Gamification-Elementen'
    ],
    faq: [
      {
        question: 'Wie funktioniert das Streak-System bei SkillQuest?',
        answer:
          'Wenn du an einem bestimmten Tag eine Fokus-Session abschließt, bleibt deine Serie erhalten und du erhältst zusätzlich zu den XP für die Session 10 XP für diesen aktiven Tag.'
      },
      {
        question: 'Was passiert, wenn ich einen Tag auslasse?',
        answer:
          'Streak-Freezes können deine Serie vor einem gelegentlichen Ausfalltag schützen, sodass eine Lücke deinen Fortschritt nicht zunichte macht.'
      },
      {
        question: 'Ist die Streak-Tracking-Funktion kostenlos?',
        answer:
          'Ja. Tägliche Serien, XP und Level sind Teil der kostenlosen Version.'
      }
    ]
  },
  'friends-challenges': {
    slug: 'friends-challenges',
    eyebrow: 'Freunde & Herausforderungen',
    title: 'Mach den Fortschritt ein bisschen geselliger',
    metaTitle: 'App „Friends & Challenges“ | Verantwortlichkeit für Konzentration und Fähigkeiten | SkillQuest',
    metaDescription:
      'Füge Freunde hinzu, nimm an den „XP Race“- und „Active Days“-Herausforderungen teil und teile deine Fortschritte ganz nach deinen eigenen Vorstellungen – dank der sozialen Funktionen und Datenschutzeinstellungen von SkillQuest.',
    summary:
      'Füge Freunde hinzu, starte Herausforderungen und lass dich motivieren, wann immer du willst – mit Datenschutzeinstellungen, mit denen du selbst bestimmst, was du teilst.',
    cardSummary:
      'Freunde, Herausforderungen und ein Aktivitätsfeed – mit Datenschutzeinstellungen, die du selbst festlegst.',
    screenshot: '06-social-family.png',
    primaryCta: 'SkillQuest herunterladen',
    secondaryCta: 'Ranglisten anzeigen',
    sections: [
      {
        title: 'Füge Freunde hinzu, um dich wirklich zur Rechenschaft zu ziehen',
        body:
          'Wenn man seinen Fortschritt nur selbst verfolgt, kann man ihn leicht aus den Augen verlieren. Wenn du in SkillQuest Freunde hinzufügst, entsteht eine Art gegenseitiger Verantwortung, die dadurch entsteht, dass es Leute sind, die du tatsächlich kennst.',
        bullets: [
          'Du kannst innerhalb der App Freundschaftsanfragen senden und annehmen.',
          'Du kannst die Statistiken deiner Freunde sehen, wenn beide Seiten dem zustimmen.',
          'Mit einem Datenschutz-Schalter behältst du die Kontrolle über die Freigabe.'
        ]
      },
      {
        title: 'Herausforderungen, die auf ein gemeinsames Ziel hinführen',
        body:
          'Herausforderungen machen aus dem individuellen Training einen gemeinsamen Ansporn, egal ob es sich um ein XP-Rennen oder einen „Active Days“-Wettkampf handelt.',
        bullets: [
          'Starte ein XP-Rennen oder einen „Active Days“-Kampf mit Freunden.',
          'Verfolgt gemeinsam den Fortschritt bei den Herausforderungen und die letzten Aktivitäten.',
          'Schau dir an, wer vorne liegt, ohne dabei deinen eigenen Fortschritt aus den Augen zu verlieren.'
        ]
      },
      {
        title: 'Ein Aktivitäts-Feed, der Meilensteine feiert',
        body:
          'Serien und andere Meilensteine können als Aktivitätsbeiträge angezeigt werden, sodass deine Fortschritte wahrgenommen werden, ohne dass daraus ein öffentlicher Feed wird.',
        bullets: [
          'Automatische Beiträge zu Meilensteinen wie 7, 30 oder 100 aktive Tage.',
          'Beim datenschutzbewussten Posten werden deine Einstellungen berücksichtigt.',
          'Für Freunde und akzeptierte Kontakte gedacht, nicht als öffentliche Pinnwand.'
        ]
      }
    ],
    seoTerms: [
      'App für Herausforderungen unter Freunden',
      'App zur Selbstkontrolle',
      'Geschicklichkeitsherausforderungen',
      'Produktivitäts-App mit Rangliste',
      'Tracker für soziale Gewohnheiten'
    ],
    faq: [
      {
        question: 'Brauche ich Freunde, um SkillQuest zu nutzen?',
        answer:
          'Nein. Freunde und Herausforderungen sind optionale soziale Funktionen, die zusätzlich zur Erfassung der Kernfähigkeiten angeboten werden.'
      },
      {
        question: 'Kann ich festlegen, was meine Freunde sehen?',
        answer:
          'Ja. Mit einem Privatsphäre-Schalter kannst du festlegen, ob deine Freunde deine Statistiken und Aktivitäten sehen können.'
      },
      {
        question: 'Welche Arten von Herausforderungen kann ich starten?',
        answer:
          'SkillQuest unterstützt Herausforderungen wie das XP-Rennen und den „Active Days“-Wettkampf, bei denen der Fortschritt gemeinsam verfolgt wird.'
      }
    ]
  },
  'study-timer': {
    slug: 'study-timer',
    eyebrow: 'Lern-Timer',
    title: 'Ein Lern-Timer, der mehr als nur die Zeit misst',
    metaTitle: 'Lern-Timer-App | Lernsitzungen nach Fach verfolgen | SkillQuest',
    metaDescription:
      'Nutze SkillQuest als Lern-Timer für Prüfungen, Hausaufgaben und zum Lernen. Verfolge deine Lernzeit pro Fach mit XP, Levels und Statistiken.',
    summary:
      'Verwandle deine Lernsitzungen in sichtbare Fortschritte pro Fach – mit Konzentrations-Timern, XP und Statistiken, die speziell für wiederholtes Lernen entwickelt wurden und nicht nur für einen einmaligen Countdown.',
    cardSummary:
      'Lernsitzungen nach Fach geordnet, mit XP, Stufen und Statistiken.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Fang an, mit SkillQuest zu lernen',
    secondaryCta: 'Fokus-Timer vergleichen',
    sections: [
      {
        title: 'Erfasse die Lernzeit pro Fach, nicht nur die Gesamtzeit',
        body:
          'Betrachte jedes Fach oder jede Prüfung als eigene Fähigkeit, damit du genau sehen kannst, wie sich die Lernzeit aufteilt, und nicht nur eine Gesamtzahl vor Augen hast.',
        bullets: [
          'Erstelle eine Fertigkeit pro Fach, Kurs oder Prüfung.',
          'Wähle je nach Aufgabe zwischen Pomodoro, Deep Work oder Flowtime.',
          'Sieh dir den Sitzungsverlauf und die Gesamtzahlen pro Fach an.'
        ]
      },
      {
        title: 'Integrierte Struktur für Prüfungszeiträume',
        body:
          'Das Lernen für Prüfungen bedeutet oft, zwischen kurzen Wiederholungsrunden und längeren, intensiven Lernsitzungen hin und her zu wechseln. SkillQuest unterstützt beides, ohne dass du dafür extra etwas einrichten musst.',
        bullets: [
          'Kurze Pomodoro-Sprints für Lernkarten und eine schnelle Wiederholung.',
          'Längere Deep-Work- oder Flowtime-Sitzungen für Übungsprüfungen.',
          'Intelligente Pausen, die auf die von dir gewählte Technik abgestimmt sind.'
        ]
      },
      {
        title: 'Motivation auf lange Sicht',
        body:
          'Lernroutinen lassen sich leichter durchhalten, wenn der Fortschritt sichtbar ist und nicht nur angedeutet wird.',
        bullets: [
          'XP und Stufen pro Fach machen den Fortschritt sichtbar.',
          'Tägliche Serien fördern beständige Lerngewohnheiten.',
          'Die Statistiken zeigen, welche Themen Beachtung finden und welche nicht.'
        ]
      }
    ],
    seoTerms: [
      'Lern-Timer-App',
      'App zum Nachverfolgen des Lernfortschritts',
      'Lern-Timer für Prüfungen',
      'Hausaufgaben-Timer',
      'Pomodoro-App zum Lernen'
    ],
    faq: [
      {
        question: 'Kann ich die Lernzeit pro Fach nachverfolgen?',
        answer:
          'Ja. Erstelle für jedes Fach oder jede Prüfung eine eigene Fertigkeit, und SkillQuest erfasst Zeit, XP und Statistiken für jede davon separat.'
      },
      {
        question: 'Welcher Timer eignet sich am besten zum Lernen?',
        answer:
          'Pomodoro eignet sich gut für Wiederholungssprints, während Deep Work oder Flowtime eher für längere Lern- oder Übungsprüfungssitzungen geeignet sind.'
      },
      {
        question: 'Ist der Lern-Timer kostenlos?',
        answer:
          'Ja. Die Funktionen Skill Tracking, Pomodoro, XP und Level sind in der kostenlosen Version verfügbar.'
      }
    ]
  },
  'deep-work-flowtime': {
    slug: 'deep-work-flowtime',
    eyebrow: 'Deep Work & Flowtime',
    title: 'Längere Konzentrationsphasen für Aufgaben, die Tiefenkonzentration erfordern',
    metaTitle: 'Deep Work & Flowtime Timer | Premium-Konzentrationssitzungen | SkillQuest',
    metaDescription:
      'Nutze Deep Work, 52-17 und Flowtime in SkillQuest für längere, ununterbrochene Konzentrationsphasen. Premium-Timertechniken mit individuell einstellbarer Dauer.',
    summary:
      'Wenn eine Aufgabe mehr als einen 25-minütigen Sprint erfordert, bieten dir Deep Work, 52-17 und Flowtime längere, flexible Konzentrationsblöcke, die trotzdem für XP und deinen Fortschritt zählen.',
    cardSummary:
      'Deep Work, 52-17 und Flowtime für längere, flexible Konzentrationsphasen.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Premium vergleichen',
    secondaryCta: 'Alle Timer-Techniken anzeigen',
    sections: [
      {
        title: 'Deep Work für ungestörte Konzentrationsphasen',
        body:
          'Deep Work ist für längere Arbeitsphasen konzipiert, in denen man sich ganz auf eine einzige Aufgabe konzentriert – für die Art von Arbeit, die an Wert verliert, wenn sie alle 25 Minuten unterbrochen wird.',
        bullets: [
          'Längere Konzentrationsphasen als beim Pomodoro-Prinzip, die auf eine einzige Aufgabe ausgerichtet sind.',
          'Zählt genauso für die XP, Stufen und Werte wie jede andere Sitzung auch.',
          'Ein Teil der Premium-Timer-Techniken.'
        ]
      },
      {
        title: '52-17 für einen strukturierten Langzeit-Rhythmus',
        body:
          '52 Minuten konzentriertes Arbeiten, gefolgt von einer 17-minütigen Pause – das ist ein Rhythmus, der sich an natürlichen Aufmerksamkeitszyklen orientiert und sich gut für längere Arbeits- oder Lernphasen eignet.',
        bullets: [
          'Ein festgelegtes, wissenschaftlich fundiertes Verhältnis von Fokus zu Unterbrechung.',
          'Ideal für mehrstündige Arbeits- oder Lernsitzungen.',
          'Im Premium-Paket enthalten, zusammen mit anderen Timer-Funktionen.'
        ]
      },
      {
        title: 'Flowtime für flexible Trainingseinheiten, die du ganz nach deinem eigenen Tempo gestalten kannst',
        body:
          'Bei Flowtime bist du nicht an eine feste Dauer gebunden. Du arbeitest so lange, bis du ganz natürlich eine Pause brauchst, und die Sitzung zählt trotzdem.',
        bullets: [
          'Individuelle Dauer, die du selbst festlegst, statt einer festgelegten Methode.',
          'Ideal für kreatives Arbeiten, Programmieren oder Schreibsitzungen.',
          'Die Länge der Smart-Pausen richtet sich danach, wie lange du konzentriert gearbeitet hast.'
        ]
      }
    ],
    seoTerms: [
      'Timer für konzentriertes Arbeiten',
      'Laufzeit-Timer',
      '52 17-Regel-Timer',
      'Individueller Fokussier-Timer',
      'App für lange Fokus-Sitzungen'
    ],
    faq: [
      {
        question: 'Was ist der Unterschied zwischen Deep Work und Flowtime?',
        answer:
          'Deep Work ist ein längerer, festgelegter Konzentrationsblock, während du bei Flowtime eine individuelle Dauer festlegen und in deinem eigenen Tempo arbeiten kannst.'
      },
      {
        question: 'Ist 52-17 dasselbe wie Pomodoro?',
        answer:
          'Nein. 52-17 sieht längere Konzentrationsphasen und Pausen vor als der klassische 25/5-Pomodoro-Rhythmus.'
      },
      {
        question: 'Sind diese Timer-Techniken kostenlos?',
        answer:
          'Deep Work, 52-17 und Flowtime gehören zum Premium-Paket, ebenso wie individuell einstellbare Timer-Dauern und detailliertere Statistiken.'
      }
    ]
  },
  leaderboards: {
    slug: 'leaderboards',
    eyebrow: 'Ranglisten',
    title: 'Schau dir an, wie deine Fortschritte im Vergleich abschneiden – ganz nach deinen Vorstellungen',
    metaTitle: 'App für Bestenlisten und Ranglisten | Messe dich im Fortschritt deiner Fähigkeiten | SkillQuest',
    metaDescription:
      'Die SkillQuest-Ranglisten vergleichen XP und aktive Tage über Wochen, Monate und den gesamten Zeitraum hinweg, wobei Ligen von Bronze bis Diamant für anhaltende Motivation sorgen.',
    summary:
      'In den Ranglisten werden XP und aktive Tage in eine Bestenliste umgewandelt, die du wöchentlich, monatlich oder als Gesamtwertung einsehen kannst – mit Ligen, die dem Wettbewerb ein Gefühl des Fortschritts verleihen.',
    cardSummary:
      'Wochen-, Monats- und Gesamt-Ranglisten mit Ligen von Bronze bis Diamant.',
    screenshot: '05-rankings.png',
    primaryCta: 'SkillQuest herunterladen',
    secondaryCta: 'Freunde hinzufügen',
    sections: [
      {
        title: 'Ranglisten über verschiedene Zeiträume hinweg',
        body:
          'Eine einzige Gesamtwertung kann sich unerreichbar anfühlen, wenn du gerade erst anfängst. SkillQuest erstellt stattdessen Ranglisten für wöchentliche, monatliche und Gesamtzeiträume.',
        bullets: [
          'Durch wöchentliche und monatliche Ranglisten wird das Rennen regelmäßig neu gestartet.',
          'In den Allzeit-Ranglisten wird langfristige Beständigkeit belohnt.',
          'Die Ranglisten basieren auf XP und aktiven Tagen.'
        ]
      },
      {
        title: 'Ligen sorgen für ein Gefühl des Fortschritts',
        body:
          'Ligen von Bronze bis Diamant machen den Wettbewerb zu etwas, das man durchläuft – und nicht zu einer einzigen festen Rangliste.',
        bullets: [
          'Steige in den Ligen auf, solange du aktiv bleibst.',
          'Tritt gegen Leute an, die auf einem ähnlichen Niveau sind – nicht gegen alle auf einmal.',
          'In den Ligen trittst du gegen Freunde an und nimmst Herausforderungen an, um dich zusätzlich zu motivieren.'
        ]
      },
      {
        title: 'Wettkampf, ohne den eigenen Fortschritt zu verlieren',
        body:
          'Ranglisten ergänzen deine persönlichen Statistiken, sie ersetzen sie nicht – daher bedeutet der Wettkampf nicht, dass du deine eigene Entwicklung aus den Augen verlierst.',
        bullets: [
          'Persönliche XP, Level und Streaks bleiben unabhängig vom Rang sichtbar.',
          'Ranglisten passen einfach perfekt zu Freunden und Herausforderungen.',
          'Nützlich für ambitionierte Nutzer, für alle anderen optional.'
        ]
      }
    ],
    seoTerms: [
      'Ranglisten-App',
      'Rangliste nach Fähigkeiten',
      'App zur Bewertung der Produktivität',
      'XP-Rangliste',
      'Wettbewerbsorientierter Gewohnheits-Tracker'
    ],
    faq: [
      {
        question: 'Wie werden die Ranglisten berechnet?',
        answer:
          'Die Ranglisten basieren auf XP und aktiven Tagen und werden für wöchentliche, monatliche und Gesamtzeiträume angezeigt.'
      },
      {
        question: 'Was sind Ligen?',
        answer:
          'In den Ligen werden die Spieler von Bronze bis Diamant eingeteilt, sodass man gegen Leute auf einem ähnlichen Niveau antritt und nicht gegen alle auf einmal.'
      },
      {
        question: 'Muss ich an einem Wettbewerb teilnehmen, um SkillQuest nutzen zu können?',
        answer:
          'Nein. Ranglisten und Ligen sind optional. Die Erfassung der Kernfähigkeiten, die XP und die Stufen funktionieren mit oder ohne sie genauso.'
      }
    ]
  },
  themes: {
    slug: 'themes',
    eyebrow: 'Themen',
    title: 'Mach SkillQuest zu deiner ganz persönlichen App',
    metaTitle: 'App-Designs & Personalisierung | Helle, dunkle und freischaltbare Designs | SkillQuest',
    metaDescription:
      'SkillQuest unterstützt den hellen, den dunklen und den Systemmodus sowie freischaltbare Designs, die an deinen Fortschritt gekoppelt sind – so sieht die App genau so aus, wie du es möchtest.',
    summary:
      'Mit dem Hellmodus, dem Dunkelmodus, dem Systemmodus und einer Reihe von freischaltbaren Designs kannst du SkillQuest ganz nach deinen Wünschen gestalten – einige Designs hängen sogar von deinem eigenen Fortschritt ab.',
    cardSummary:
      'Hell-, Dunkel- und Systemmodus sowie Designs, die du im Laufe des Spiels freischaltest.',
    screenshot: '07-themes-profile.png',
    primaryCta: 'SkillQuest herunterladen',
    secondaryCta: 'Schau dir an, wie Streaks funktionieren',
    sections: [
      {
        title: 'Hell-, Dunkel- und Systemmodus',
        body:
          'SkillQuest passt sich standardmäßig an die Einstellungen deines Geräts an, du kannst es aber jederzeit auf den hellen oder dunklen Modus festlegen, ganz wie du möchtest.',
        bullets: [
          'Der Systemmodus passt sich automatisch an dein Gerät an.',
          'Du kannst jederzeit manuell zwischen dem hellen und dem dunklen Modus wechseln.',
          'Jedes Theme wurde nach den Material 3-Standards entwickelt, um einen einheitlichen Kontrast zu gewährleisten.'
        ]
      },
      {
        title: 'Themen, die du freischaltest – und nicht einfach nur auswählst',
        body:
          'Manche Designs sind an deinen Fortschritt gekoppelt, sodass die Personalisierung zu einer weiteren Form sichtbaren Fortschritts wird und nicht nur ein Einstellungsmenü ist.',
        bullets: [
          'Schalte durch kontinuierliche Fortschritte weitere Designs frei.',
          'Neben den kostenlosen Freischaltungen gibt es auch Premium-Designoptionen.',
          'Das Freischalten von Designs ist mit demselben Streak- und XP-System verknüpft wie alles andere auch.'
        ]
      },
      {
        title: 'Personalisierung, die durchgängig bleibt',
        body:
          'Themes ändern die Farbe und die Atmosphäre, nicht aber die Struktur der App – wenn du also das Theme wechselst, musst du nie wieder neu lernen, wo sich die Dinge befinden.',
        bullets: [
          'Einheitliches Layout bei allen Designs.',
          'Die Farben passen sich an, ohne dass die Lesbarkeit oder der Kontrast darunter leiden.',
          'Funktioniert bei der Nachverfolgung von Fähigkeiten, Timern und Statistiken auf die gleiche Weise.'
        ]
      }
    ],
    seoTerms: [
      'App-Designs',
      'App zur Gewöhnung an den Dunkelmodus',
      'Personalisierungs-App',
      'App mit freischaltbaren Designs',
      'App mit hellem und dunklem Modus'
    ],
    faq: [
      {
        question: 'Unterstützt SkillQuest den Dunkelmodus?',
        answer:
          'Ja. SkillQuest unterstützt den Hellmodus, den Dunkelmodus und einen Systemmodus, der sich an die Einstellungen deines Geräts anpasst.'
      },
      {
        question: 'Wie schalte ich weitere Designs frei?',
        answer:
          'Manche Designs schaltest du durch kontinuierlichen Fortschritt frei, zum Beispiel durch Streaks, während andere Designs mit Premium verfügbar sind.'
      },
      {
        question: 'Beeinflussen Designs die Funktionsweise der App?',
        answer:
          'Nein. Die Designs ändern lediglich das Erscheinungsbild. Die Erfassung von Fähigkeiten, Timer und Statistiken funktionieren bei allen Designs gleich.'
      }
    ]
  },
  'guest-mode': {
    slug: 'guest-mode',
    eyebrow: 'Guest Mode',
    title: 'Probier SkillQuest aus, bevor du ein Konto erstellst',
    metaTitle: 'Guest Mode | Probier SkillQuest ohne Konto aus | SkillQuest',
    metaDescription:
      'Im SkillQuest-Guest Mode kannst du Fähigkeiten nachverfolgen, Fokus-Timer nutzen und lokal XP sammeln, bevor du ein Konto erstellst – so kannst du das Spiel ganz ohne Risiko ausprobieren.',
    summary:
      'Im Guest Mode entfällt der Anmeldeschritt. Verfolge deine Fähigkeiten, nutze Fokus-Timer und sammle XP direkt auf deinem Gerät – und erstelle dann ein Konto, wann immer du bereit bist.',
    cardSummary:
      'Probier die Erfassung der Kernkompetenzen und die Konzentrations-Timer erst mal lokal aus, bevor du ein Konto erstellst.',
    screenshot: '01-home-progress.png',
    primaryCta: 'Als Gast starten',
    secondaryCta: 'Vergleiche Free, Premium und Family',
    sections: [
      {
        title: 'Du brauchst kein Konto, um loszulegen',
        body:
          'Im Guest Mode kannst du SkillQuest öffnen und sofort mit der Erfassung einer Fähigkeit beginnen, ohne dich vorher anmelden zu müssen.',
        bullets: [
          'Die Erfassung der Kernfähigkeiten, Konzentrations-Timer, XP und Level funktionieren im Guest Mode.',
          'Der Fortschritt wird lokal auf deinem Gerät gespeichert.',
          'Du brauchst weder eine E-Mail-Adresse noch ein Konto, um die App auszuprobieren.'
        ]
      },
      {
        title: 'Erstelle ein Konto, wenn es Sinn macht',
        body:
          'Der Guest Mode ist ein Ausgangspunkt, keine Sackgasse. Wenn du bereit bist für Synchronisierung, Freunde oder Ranglisten, kannst du durch die Erstellung eines Kontos deinen lokalen Spielfortschritt übernehmen.',
        bullets: [
          'Wechsle zu einem Vollkonto, ohne deinen lokalen Spielfortschritt zu verlieren.',
          'Ermöglicht die Synchronisierung über verschiedene Geräte, Freunde und Ranglisten hinweg.',
          'Du musst dich nicht entscheiden, bevor du die App ausprobiert hast.'
        ]
      },
      {
        title: 'Was im Guest Mode eingeschränkt bleibt',
        body:
          'Manche Funktionen sind naturgemäß an ein Konto gebunden, da sie andere Personen betreffen oder eine geräteübergreifende Synchronisierung erfordern.',
        bullets: [
          'Für Freunde, Herausforderungen und Ranglisten brauchst du ein Konto.',
          'Für die Family-Funktionen brauchst du ein Konto und eine Family-Gruppe.',
          'Der lokal gespeicherte Spielfortschritt wird erst gesichert, wenn du ein Konto erstellst.'
        ]
      }
    ],
    seoTerms: [
      'App ohne Konto ausprobieren',
      'Gewohnheits-Tracker ohne Anmeldung',
      'App im Guest Mode',
      'Skill Tracker ohne Konto',
      'Kostenlose Testversion der Gewohnheits-App'
    ],
    faq: [
      {
        question: 'Brauche ich ein Konto, um SkillQuest zu nutzen?',
        answer:
          'Nein. Im Guest Mode kannst du die Kernfähigkeits-Tracking-Funktion und die Fokus-Timer nutzen, ohne ein Konto anzulegen.'
      },
      {
        question: 'Was passiert mit meinem Fortschritt, wenn ich später ein Konto erstelle?',
        answer:
          'Wenn du vom Guest Mode umsteigst, wird dein lokaler Spielfortschritt in dein neues Konto übernommen.'
      },
      {
        question: 'Was kann ich im Guest Mode nicht tun?',
        answer:
          'Für die Funktionen Freunde, Herausforderungen, Ranglisten und Family ist ein Konto erforderlich, da sie die Synchronisierung mit anderen Personen beinhalten.'
      }
    ]
  }
};

pages.fr = {
  'focus-timer': {
    ...pages.en['focus-timer'],
    title: 'Un Focus Timer qui suit vos progrès',
    metaTitle: 'Application Focus Timer | Pomodoro, Deep Work et Flowtime | SkillQuest',
    metaDescription:
      'Utilisez SkillQuest comme Focus Timer pour Pomodoro, Deep Work, 52-17, Flowtime, Until Time et EMOM. Chaque session compte pour XP, niveaux et progrès.',
    summary:
      'Lancez un timer pour la compétence que vous développez. SkillQuest relie les minutes de concentration à XP, aux niveaux, aux statistiques et à une progression visible.',
    cardSummary:
      'Pomodoro, Deep Work, Flowtime et autres modes de timer reliés à une vraie progression de compétence.',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Comparer Premium',
    sections: [
      {
        title: 'Choisissez le timer adapté à votre tâche',
        body:
          'SkillQuest prend en charge plusieurs formes de concentration, afin que vous ne soyez pas limité à un seul flux Pomodoro.',
        bullets: [
          'Pomodoro pour des sessions courtes d’étude ou de travail.',
          'Deep Work et 52-17 pour des blocs de concentration plus longs.',
          'Flowtime et Until Time pour des sessions flexibles.',
          'EMOM pour les entraînements par intervalles et les routines actives.'
        ]
      },
      {
        title: 'Chaque minute compte pour une compétence',
        body:
          'Un timer n’est pas séparé de votre progression. Vous choisissez d’abord une compétence, puis vous voyez XP, niveaux et statistiques évoluer.',
        bullets: [
          'Gagnez de l’XP après les sessions terminées.',
          'Suivez le temps de concentration par compétence.',
          'Consultez les sessions par compétence dans les statistiques.',
          'Construisez des séries grâce à la pratique répétée.'
        ]
      },
      {
        title: 'Premium pour plus de liberté de concentration',
        body:
          'Premium s’adresse aux utilisateurs qui veulent plus de techniques de timer, une durée personnalisée et des statistiques plus profondes.',
        bullets: [
          'Durée Flowtime personnalisée et timers personnalisés.',
          'Modes de timer avancés pour différentes routines.',
          'Plus d’historique et de statistiques pour le progrès à long terme.',
          'Premium coûte EUR 3.99 par mois ou EUR 39.99 par an.'
        ]
      }
    ],
    seoTerms: [
      'application focus timer',
      'application pomodoro',
      'deep work timer',
      'flowtime timer',
      'timer de competence',
      'timer productivite'
    ],
    faq: [
      {
        question: 'SkillQuest est-elle une application Pomodoro ?',
        answer:
          'Oui. SkillQuest prend en charge Pomodoro et d’autres modes de concentration comme 52-17, Deep Work, Flowtime, Until Time et EMOM. Certaines fonctions avancées appartiennent à Premium.'
      },
      {
        question: 'Les timers sont-ils liés aux compétences ?',
        answer:
          'Oui. Les sessions terminées sont liées à la compétence choisie, ce qui rend XP, statistiques et progression visibles.'
      },
      {
        question: 'Puis-je utiliser des durées personnalisées ?',
        answer:
          'Oui. Les durées personnalisées et options de timer avancées font partie des fonctions Premium.'
      }
    ]
  },
  family: {
    ...pages.en.family,
    title: 'Aidez les enfants à pratiquer avec structure, objectifs et progrès visibles',
    metaTitle: 'Application Family pour parents | Timers, objectifs et statistiques enfant | SkillQuest',
    metaDescription:
      'Avec SkillQuest Family, les parents peuvent lancer des timers pour les enfants, consulter les statistiques enfant, définir des objectifs hebdomadaires et envoyer des compliments.',
    summary:
      'Family donne un cadre aux parents sans prendre le contrôle de la progression de l’enfant. Timers, objectifs, XP et compliments rendent le temps de pratique concret.',
    cardSummary:
      'Les parents peuvent lancer des timers, consulter les statistiques enfant, définir des objectifs et accompagner positivement.',
    primaryCta: 'Voir Family',
    secondaryCta: 'Télécharger l’app',
    sections: [
      {
        title: 'Voyez quand les enfants pratiquent',
        body:
          'Avec Family, les parents peuvent voir quelles sessions ont été lancées et comment la progression évolue par compétence.',
        bullets: [
          'Consultez l’activité des timers des enfants.',
          'Vérifiez les statistiques enfant pour sessions, minutes et XP.',
          'Discutez de la progression par compétence.',
          'Environnement familial privé avec rôles parent.'
        ]
      },
      {
        title: 'Lancez des timers pour les enfants',
        body:
          'Les parents et propriétaires peuvent lancer un timer pour un enfant. La session est liée à l’enfant, afin que la progression reste visible de son côté.',
        bullets: [
          'Choisissez un enfant et une compétence depuis l’espace famille.',
          'Lancez le temps de pratique quand un objectif clair est nécessaire.',
          'Reliez les minutes de concentration à XP et à la progression.',
          'Les enfants voient les timers lancés par les parents.'
        ]
      },
      {
        title: 'Avancez ensemble vers des objectifs',
        body:
          'Family prend en charge les objectifs hebdomadaires et les compliments, afin que l’accompagnement ne soit pas seulement du contrôle.',
        bullets: [
          'Définissez des objectifs en minutes ou en sessions.',
          'Envoyez des compliments pour l’effort et la progression.',
          'Donnez à la famille une prochaine étape claire.',
          'Family coûte EUR 6.99 par mois ou EUR 69.99 par an.'
        ]
      }
    ],
    seoTerms: [
      'application productivite famille',
      'application pour parents',
      'timer enfant',
      'timer apprentissage enfant',
      'application parent enfant'
    ],
    faq: [
      {
        question: 'Les parents peuvent-ils lancer des timers pour les enfants ?',
        answer:
          'Oui. Avec Family, les parents et propriétaires peuvent lancer des timers pour les enfants dans l’environnement familial.'
      },
      {
        question: 'Puis-je voir la progression de mon enfant ?',
        answer:
          'Oui. Family inclut des statistiques enfant avec sessions, minutes, XP, répartition par compétence et activité récente.'
      },
      {
        question: 'Family est-il inclus dans Premium ?',
        answer:
          'Non. Family est un abonnement familial séparé avec Premium plus rôles parent, statistiques enfant, timers pour enfants, objectifs et compliments.'
      },
      {
        question: 'SkillQuest est-il destiné aux jeunes enfants ?',
        answer:
          'SkillQuest utilise un cadre de confidentialité 13+. Le marketing autour des enfants doit donc rester formulé avec prudence.'
      }
    ]
  },
  'skill-tracker': {
    ...pages.en['skill-tracker'],
    title: 'Suivez les compétences, pas seulement les tâches',
    metaTitle: 'Application Skill Tracker | XP, niveaux et progression | SkillQuest',
    metaDescription:
      'SkillQuest est un Skill Tracker pour études, sport, musique, lecture, code, travail créatif et routines. Lancez des timers et suivez XP, niveaux et progrès.',
    summary:
      'SkillQuest vous aide à développer des compétences en reliant le vrai temps de pratique à la progression, XP, aux niveaux et aux statistiques.',
    cardSummary:
      'Suivez compétences, XP, niveaux, séries et temps de concentration dans une app mobile.',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Voir les Focus Timers',
    sections: [
      {
        title: 'Commencez par la compétence, pas par une tâche générique',
        body:
          'SkillQuest oriente chaque session vers une compétence, afin que travail, apprentissage et loisirs deviennent une progression visible.',
        bullets: [
          'Utilisez des compétences de départ ou créez les vôtres.',
          'Suivez études, sport, musique, lecture, code et création.',
          'Associez timers, XP, niveaux et séries.',
          'Voyez quelles compétences reçoivent vraiment votre attention.'
        ]
      },
      {
        title: 'Gamification pour pratiquer régulièrement',
        body:
          'XP, niveaux et séries rendent le progrès concret, sans promettre de résultats garantis.',
        bullets: [
          'XP après les sessions terminées.',
          'Niveaux comme jalons visibles.',
          'Séries pour les routines répétées.',
          'Classements et défis pour une motivation supplémentaire.'
        ]
      },
      {
        title: 'Commencez gratuitement, évoluez si besoin',
        body:
          'Guest Mode et les fonctions Free aident à démarrer. Premium et Family ajoutent plus de profondeur lorsque SkillQuest fait partie de votre routine.',
        bullets: [
          'Guest Mode pour commencer rapidement.',
          'Premium pour plus de liberté de timer et de statistiques.',
          'Family pour une structure parent-enfant.',
          'Synchronisation respectueuse de la vie privée pour les comptes.'
        ]
      }
    ],
    seoTerms: [
      'application skill tracker',
      'alternative habit tracker',
      'application productivite xp',
      'suivi progression competence',
      'practice tracker'
    ],
    faq: [
      {
        question: 'Quelles compétences puis-je suivre ?',
        answer:
          'SkillQuest peut être utilisé pour les études, le travail, le fitness, la musique, la lecture, le code, les projets créatifs et les routines personnelles.'
      },
      {
        question: 'Puis-je créer mes propres compétences ?',
        answer:
          'Oui. SkillQuest prend en charge les compétences personnalisées afin que l’app corresponde à votre vraie routine.'
      },
      {
        question: 'SkillQuest est-elle une app de suivi d’habitudes ?',
        answer:
          'SkillQuest recoupe certains usages des habit trackers, mais se concentre davantage sur les compétences, le temps de concentration, XP, les niveaux et le progrès mesurable.'
      }
    ]
  },
  'progress-statistics': {
    ...pages.en['progress-statistics'],
    title: 'Voyez vos progrès avec statistiques, XP et historique de compétences',
    metaTitle: 'Statistiques de progression | Skill Tracking et XP | SkillQuest',
    metaDescription:
      'Consultez les statistiques SkillQuest par jour, semaine, mois et année. Suivez XP, sessions, minutes, répartition des compétences et statistiques enfant avec Family.',
    summary:
      'SkillQuest rend le temps de pratique mesurable avec statistiques, répartitions par compétence, XP, historique de sessions et progrès par période.',
    cardSummary:
      'Statistiques pour minutes de concentration, sessions, XP, compétences et progression enfant avec Family.',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Comparer Premium',
    sections: [
      {
        title: 'Comprenez où va votre temps',
        body:
          'Les statistiques aident à voir les tendances dans votre temps de pratique et votre focus par compétence, sans présenter cela comme un résultat garanti.',
        bullets: [
          'Consultez sessions et minutes par période.',
          'Comparez compétences et activité.',
          'Utilisez XP et niveaux comme signaux de progression.',
          'Vérifiez les sessions récentes et l’historique.'
        ]
      },
      {
        title: 'Des insights plus profonds avec Premium',
        body:
          'Premium s’adresse aux utilisateurs qui veulent aller au-delà des statistiques de base.',
        bullets: [
          'Statistiques et tendances étendues.',
          'Plus d’historique pour les routines à long terme.',
          'Meilleure visibilité sur les répartitions par compétence.',
          'L’export de données existe comme fonction Premium dans les modèles produit et doit être confirmé visiblement avant toute promesse forte.'
        ]
      },
      {
        title: 'Rendre visible la progression des enfants avec Family',
        body:
          'Avec Family, les parents peuvent consulter la progression des enfants et rendre le temps de pratique plus facile à discuter.',
        bullets: [
          'Statistiques enfant avec sessions, minutes et XP.',
          'Activité des timers pour voir quand la pratique commence.',
          'Objectifs et compliments rendent l’accompagnement plus concret.',
          'Family est un abonnement séparé pour les familles.'
        ]
      }
    ],
    seoTerms: [
      'statistiques productivite',
      'application statistiques competence',
      'statistiques time tracking',
      'suivi progression xp',
      'application progression famille'
    ],
    faq: [
      {
        question: 'Quelles statistiques SkillQuest affiche-t-elle ?',
        answer:
          'SkillQuest affiche sessions, minutes, XP, progression par compétence et activité sur différentes périodes.'
      },
      {
        question: 'Puis-je voir des tendances à long terme ?',
        answer:
          'Premium inclut des statistiques étendues et plus d’historique. Consultez l’app pour les fonctions actuellement visibles.'
      },
      {
        question: 'Les parents peuvent-ils voir les statistiques des enfants ?',
        answer:
          'Oui. Family inclut des statistiques enfant pour les parents et propriétaires dans l’environnement familial.'
      }
    ]
  },
  'pomodoro-timer': {
    slug: 'pomodoro-timer',
    eyebrow: 'Minuteur Pomodoro',
    title: 'Un minuteur Pomodoro adapté à tes compétences',
    metaTitle: 'Appli Pomodoro | Séances d\'étude et de concentration | SkillQuest',
    metaDescription:
      'Utilise SkillQuest comme minuteur Pomodoro gratuit pour étudier et travailler en toute concentration. Chaque sprint de 25 minutes te permet de gagner des XP, de passer au niveau supérieur et de progresser dans tes compétences.',
    summary:
      'Le rythme Pomodoro classique 25/5, intégré à SkillQuest, pour que chaque sprint te fasse gagner des XP, des niveaux et te fasse progresser dans la compétence que tu t\'entraînes à maîtriser.',
    cardSummary:
      'Le rythme de progression classique 25/5, lié à l\'XP, aux niveaux et à la progression des compétences.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Comparer les techniques de minuterie',
    sections: [
      {
        title: 'La technique Pomodoro, sans avoir besoin d\'une appli spécifique',
        body:
          'La méthode Pomodoro divise le travail en courtes sessions de concentration ponctuées de pauses régulières. SkillQuest intègre cette méthode parmi plusieurs autres techniques de chronométrage ; tu n\'as donc pas besoin d\'une appli Pomodoro séparée en plus de ton outil de suivi.',
        bullets: [
          'Des sprints de concentration de 25 minutes avec des pauses intégrées.',
          'Disponible dans la formule gratuite, sans abonnement.',
          'Ça marche pour les études, le boulot, la lecture ou n\'importe quelle compétence que tu suis.',
        ]
      },
      {
        title: 'Chaque sprint compte pour une compétence',
        body:
          'Un minuteur Pomodoro, à lui seul, ne fait que mesurer le temps. SkillQuest associe chaque sprint à la compétence que tu as choisie, ce qui te permet de transformer ta concentration en progrès visibles.',
        bullets: [
          'Gagne des XP après chaque session Pomodoro terminée.',
          'Consulte les sessions classées par compétence dans tes statistiques.',
          'Suis tes streaks pour adopter des habitudes Pomodoro régulières.',
        ]
      },
      {
        title: 'Au-delà de la méthode Pomodoro, quand tu as besoin de plus',
        body:
          'Certaines tâches nécessitent des sessions de concentration plus longues ou plus flexibles que 25 minutes. SkillQuest propose d\'autres techniques auxquelles tu peux passer sans quitter l\'appli.',
        bullets: [
          '« Deep Work » et « 52-17 » pour les sessions plus longues.',
          '« Flowtime » et « Until Time » pour des durées flexibles.',
          'Avec l\'abonnement Premium, tu débloques l\'ensemble des techniques de chronomètre.',
        ]
      },
    ],
    seoTerms: [
      'appli de chronomètre Pomodoro',
      'minuterie Pomodoro pour étudier',
      'Minuterie de 25 minutes',
      'application Pomodoro pour étudier',
      'minuterie Pomodoro gratuite',
    ],
    faq: [
      {
        question: 'Le minuteur Pomodoro est-il gratuit dans SkillQuest ?',
        answer:
          'Oui. Pomodoro est disponible dans la version gratuite, tout comme les XP, les niveaux et les statistiques de base.'
      },
      {
        question: 'Est-ce que je peux utiliser la méthode Pomodoro pour étudier ?',
        answer:
          'Oui. Beaucoup d\'utilisateurs gèrent leurs sessions d\'étude avec Pomodoro, en associant chaque sprint à une compétence liée aux études.'
      },
      {
        question: 'Que se passe-t-il une fois qu\'une session Pomodoro est terminée ?',
        answer:
          'Cette séance est prise en compte dans tes statistiques de compétence et te rapporte des XP ; ainsi, le temps que tu consacres à te concentrer se traduit par des progrès visibles.'
      },
    ]
  },
  streaks: {
    slug: 'streaks',
    eyebrow: 'Streaks',
    title: 'Fais de ta régularité une streak de succès que tu peux constater',
    metaTitle: 'L\'appli Streak Tracker avec XP | Développe des habitudes quotidiennes | SkillQuest',
    metaDescription:
      'SkillQuest comptabilise une streak quotidienne pour chaque compétence que tu t\'entraînes à maîtriser, avec des XP, des niveaux et la possibilité de geler ta streak pour qu\'un jour manqué n\'efface pas ta progression.',
    summary:
      'Une streak quotidienne te permet de suivre ta régularité, avec des XP et des niveaux pour que cette régularité te donne l\'impression de progresser, et pas seulement d\'accumuler des chiffres.',
    cardSummary:
      'Des streaks quotidiennes avec des XP et des pauses dans la streak, pour que ta régularité reste visible.',
    screenshot: '03-session-reward.png',
    primaryCta: 'Commence ta streak',
    secondaryCta: 'Découvre comment fonctionne XP',
    sections: [
      {
        title: 'Des streaks qui te récompensent juste pour ta présence',
        body:
          'Chaque jour où tu fais une séance de concentration, ta streak s\'allonge. C\'est un indicateur simple et visible qui transforme la question « Est-ce que je me suis entraîné aujourd\'hui ? » en un compteur qui ne s\'arrête pas.',
        bullets: [
          'Gagne 10 XP pour chaque journée active, en plus des XP de session.',
          'Les streaks s\'appliquent à toutes les compétences que tu suis.',
          'Découvre d\'un seul coup d\'œil ta streak actuelle et ta plus longue streak.',
        ]
      },
      {
        title: 'Les streaks te permettent de rattraper un raté de temps en temps',
        body:
          'Parfois, la vie vient tout chambouler. Grâce aux Streak Freezes, un jour manqué ne remet pas à zéro des semaines d\'assiduité.',
        bullets: [
          'Évite de voir ta streak s\'interrompre à cause d\'un jour manqué de temps en temps.',
          'Garde ta motivation sur le long terme sans te sentir obligé de tout donner ou de tout laisser tomber.',
          'Les streaks de jours consécutifs (7, 30, 100+ jours) peuvent déclencher la publication de posts d\'activité que tu peux partager.',
        ]
      },
      {
        title: 'Les streaks, c\'est bien plus que de simples chiffres',
        body:
          'Dans SkillQuest, la cohérence ne se résume pas à un simple compteur : les thèmes et les récompenses sont liés à ta progression.',
        bullets: [
          'Débloque des thèmes en progressant régulièrement.',
          'Associe les streaks à l\'XP et aux niveaux pour avoir une vision plus complète.',
          'Utilise les étapes importantes de ta streak comme points de repère naturels.',
        ]
      },
    ],
    seoTerms: [
      'appli pour suivre ses streaks de jours sans interruption',
      'suivi d\'habitudes avec streaks de jours consécutifs',
      'appli de défi quotidien',
      'Suivi des habitudes xp',
      'suivi des habitudes sous forme de jeu',
    ],
    faq: [
      {
        question: 'Comment fonctionne le système de streaks dans SkillQuest ?',
        answer:
          'Si tu termines une session ciblée un jour donné, ça te permet de maintenir ta streak d\'affilée et tu gagnes 10 XP pour cette journée, en plus des XP de la session.'
      },
      {
        question: 'Que se passe-t-il si je rate une journée ?',
        answer:
          'Les Streak Freezes te permettent de protéger ta streak en cas de jour manqué de temps en temps, pour qu\'un seul jour d\'interruption n\'efface pas tes progrès.'
      },
      {
        question: 'Est-ce que le suivi des streaks est gratuit ?',
        answer:
          'Oui. Les streaks quotidiennes, les XP et les niveaux font partie de la formule gratuite.'
      },
    ]
  },
  'friends-challenges': {
    slug: 'friends-challenges',
    eyebrow: 'Amis et défis',
    title: 'Rends la progression un peu plus conviviale',
    metaTitle: 'Application « Friends & Challenges » | Se responsabiliser pour améliorer sa concentration et ses compétences | SkillQuest',
    metaDescription:
      'Ajoute des amis, participe aux défis « XP Race » et « Active Days », et partage tes progrès comme tu le souhaites grâce aux fonctionnalités sociales et aux paramètres de confidentialité de SkillQuest.',
    summary:
      'Ajoute des amis, lance des défis et trouve la motivation dont tu as besoin quand tu le souhaites, grâce à des paramètres de confidentialité qui te permettent de partager ce que tu veux, comme tu le veux.',
    cardSummary:
      'Des amis, des défis et un fil d\'activité, avec des paramètres de confidentialité que tu gères toi-même.',
    screenshot: '06-social-family.png',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Voir les classements',
    sections: [
      {
        title: 'Ajoute des amis pour te motiver vraiment',
        body:
          'Quand on suit ses progrès tout seul, on a tendance à les ignorer facilement. En ajoutant des amis sur SkillQuest, tu bénéficies de cette motivation que t\'apportent les gens que tu connais vraiment.',
        bullets: [
          'Envoie et accepte des demandes d\'amis directement depuis l\'appli.',
          'Tu peux voir les statistiques de tes amis quand les deux parties l\'autorisent.',
          'Un bouton de confidentialité te permet de contrôler le partage de tes données.',
        ]
      },
      {
        title: 'Des défis qui nous rapprochent d\'un objectif commun',
        body:
          'Les défis transforment la pratique individuelle en un effort collectif, qu\'il s\'agisse d\'une course aux XP ou d\'une bataille « Active Days ».',
        bullets: [
          'Lance une course XP ou une bataille « Active Days » avec tes potes.',
          'Suivez ensemble la progression du défi et les dernières activités.',
          'Découvre qui est en tête sans perdre de vue tes propres progrès.',
        ]
      },
      {
        title: 'Un fil d\'activité qui met à l\'honneur les moments forts',
        body:
          'Les streaks et autres jalons peuvent apparaître sous forme de publications d\'activité, ce qui permet de mettre en avant tes progrès sans pour autant créer un fil d\'actualité public.',
        bullets: [
          'Des publications automatiques pour marquer des étapes comme 7, 30 ou 100 jours d\'activité.',
          'La publication respectueuse de la vie privée tient compte de tes paramètres.',
          'Conçu pour tes amis et tes contacts approuvés, pas pour un mur public.',
        ]
      },
    ],
    seoTerms: [
      'application de défis entre amis',
      'appli de suivi',
      'épreuves d\'habileté',
      'appli de productivité avec classement',
      'suivi des habitudes sociales',
    ],
    faq: [
      {
        question: 'Est-ce que j\'ai besoin d\'amis pour utiliser SkillQuest ?',
        answer:
          'Non. Les amis et les défis sont des fonctionnalités sociales facultatives qui viennent s\'ajouter au suivi des compétences de base.'
      },
      {
        question: 'Est-ce que je peux choisir ce que mes amis voient ?',
        answer:
          'Oui. Un bouton de confidentialité te permet de choisir si tes amis peuvent voir tes statistiques et ton activité.'
      },
      {
        question: 'Quels types de défis je peux lancer ?',
        answer:
          'SkillQuest prend en charge différents types de défis, comme la « Course aux XP » et la « Bataille des jours actifs », avec un suivi commun des progrès.'
      },
    ]
  },
  'study-timer': {
    slug: 'study-timer',
    eyebrow: 'Minuteur d\'étude',
    title: 'Un minuteur d\'étude qui fait bien plus que simplement compter le temps',
    metaTitle: 'Appli Study Timer | Suis tes sessions d\'étude par matière | SkillQuest',
    metaDescription:
      'Utilise SkillQuest comme minuteur d\'étude pour tes examens, tes devoirs et tes révisions. Suis le temps passé à étudier par matière grâce aux XP, aux niveaux et aux statistiques.',
    summary:
      'Transforme tes sessions d\'étude en progrès visibles par matière, grâce à des minuteurs de concentration, des points d\'expérience (XP) et des statistiques conçues pour un apprentissage régulier, et pas seulement pour un simple compte à rebours.',
    cardSummary:
      'Suivi des sessions d\'étude par matière, avec les XP, les niveaux et les statistiques.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Commence à étudier avec SkillQuest',
    secondaryCta: 'Comparer les minuteurs de concentration',
    sections: [
      {
        title: 'Suis le temps d\'étude par matière, pas seulement le temps total',
        body:
          'Considère chaque matière ou chaque examen comme une compétence à part entière, pour que tu puisses voir exactement comment se répartit ton temps d\'étude, et pas seulement un chiffre global.',
        bullets: [
          'Crée une compétence par matière, cours ou examen.',
          'Choisis entre « Pomodoro », « Deep Work » ou « Flowtime » selon la tâche à accomplir.',
          'Consulte l\'historique des sessions et les totaux par matière.',
        ]
      },
      {
        title: 'Structure intégrée pour les périodes d\'examens',
        body:
          'Pour réviser ses examens, on alterne souvent entre de courtes sessions de révision rapide et des sessions plus longues et plus approfondies. SkillQuest prend en charge les deux sans configuration supplémentaire.',
        bullets: [
          'De courtes sessions Pomodoro pour les fiches de révision et une révision rapide.',
          'Des sessions plus longues de « Deep Work » ou de « Flowtime » pour t\'entraîner aux examens blancs.',
          'Des pauses intelligentes adaptées à la technique que tu choisis.',
        ]
      },
      {
        title: 'La motivation pour tenir sur la durée',
        body:
          'C\'est plus facile de garder ses habitudes d\'étude quand on voit clairement les progrès qu\'on fait, plutôt que de juste les deviner.',
        bullets: [
          'Les XP et les niveaux par matière te permettent de suivre tes progrès.',
          'Les streaks quotidiennes t\'aident à prendre de bonnes habitudes d\'étude.',
          'Les statistiques montrent quelles matières suscitent l\'intérêt et lesquelles n\'en suscitent pas.',
        ]
      },
    ],
    seoTerms: [
      'appli de minuterie pour étudier',
      'appli de suivi des révisions',
      'minuterie pour réviser les examens',
      'minuterie pour les devoirs',
      'application Pomodoro pour étudier',
    ],
    faq: [
      {
        question: 'Est-ce que je peux suivre le temps d\'étude par matière ?',
        answer:
          'Oui. Crée une compétence pour chaque matière ou chaque examen, et SkillQuest enregistre le temps, les XP et les statistiques séparément pour chacune d\'entre elles.'
      },
      {
        question: 'Quel minuteur est le mieux adapté pour étudier ?',
        answer:
          'La méthode Pomodoro marche bien pour les sessions de révision rapides, tandis que le « Deep Work » ou le « Flowtime » conviennent mieux aux sessions d\'étude plus longues ou aux entraînements aux examens.'
      },
      {
        question: 'Le minuteur d\'étude est-il gratuit ?',
        answer:
          'Oui. Le suivi des compétences, la méthode Pomodoro, les XP et les niveaux sont disponibles dans la version gratuite.'
      },
    ]
  },
  'deep-work-flowtime': {
    slug: 'deep-work-flowtime',
    eyebrow: 'Deep Work & Flowtime',
    title: 'Des sessions de concentration plus longues pour les tâches qui demandent de la profondeur',
    metaTitle: 'Minuteur Deep Work & Flowtime | Sessions de concentration Premium | SkillQuest',
    metaDescription:
      'Utilise Deep Work, 52-17 et Flowtime dans SkillQuest pour des sessions de concentration plus longues et sans interruption. Techniques de minuterie Premium avec durée personnalisable.',
    summary:
      'Quand une tâche nécessite un sprint de plus de 25 minutes, les modes « Deep Work », « 52-17 » et « Flowtime » te permettent de bénéficier de plages de concentration plus longues et flexibles, qui comptent quand même pour tes XP et ta progression.',
    cardSummary:
      'Deep Work, 52-17 et Flowtime pour des séances de concentration plus longues et flexibles.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Comparer les formules Premium',
    secondaryCta: 'Voir toutes les techniques de chronométrage',
    sections: [
      {
        title: 'Le « Deep Work » pour des sessions de concentration sans interruption',
        body:
          'Deep Work est conçu pour des sessions de travail prolongées et consacrées à une seule tâche, pour le genre de travail qui perd de sa valeur s\'il est interrompu toutes les 25 minutes.',
        bullets: [
          'Des sessions de concentration plus longues que celles de la méthode Pomodoro, consacrées à une seule tâche.',
          'Ça compte pour les XP, les niveaux et les statistiques, comme n\'importe quelle autre session.',
          'Ça fait partie des techniques de chronométrage « Premium ».',
        ]
      },
      {
        title: '52-17 pour un rythme structuré à longue durée',
        body:
          '52 minutes de concentration suivies d\'une pause de 17 minutes, c\'est un rythme qui s\'appuie sur les cycles naturels d\'attention, ce qui est pratique pour les longues sessions de travail ou d\'étude.',
        bullets: [
          'Un rapport « concentration/détente » fixe, inspiré de la recherche.',
          'Idéal pour les sessions de travail ou d\'étude de plusieurs heures.',
          'Inclus dans la version Premium, avec d\'autres techniques de minuterie.',
        ]
      },
      {
        title: 'Flowtime pour des séances flexibles, à ton rythme',
        body:
          'Avec Flowtime, tu n\'es pas obligé de respecter une durée fixe. Tu travailles jusqu\'à ce que tu aies naturellement envie de faire une pause, et la session est quand même comptabilisée.',
        bullets: [
          'Une durée personnalisée, que tu définis toi-même, plutôt qu\'une technique fixe.',
          'Idéal pour le travail créatif, le codage ou les séances d\'écriture.',
          'La durée des pauses intelligentes s\'adapte à la durée de ta concentration.',
        ]
      },
    ],
    seoTerms: [
      'minuterie pour le « deep work »',
      'minuterie de durée d\'écoulement',
      'Minuterie « 52 17 »',
      'minuterie de mise au point personnalisée',
      'appli pour les sessions de concentration prolongées',
    ],
    faq: [
      {
        question: 'Quelle est la différence entre le « Deep Work » et le « Flowtime » ?',
        answer:
          'Le « Deep Work » est une session de concentration plus longue et à durée fixe, tandis que le « Flowtime » te permet de définir une durée personnalisée et de travailler à ton rythme.'
      },
      {
        question: 'Est-ce que la méthode 52-17, c\'est la même chose que la méthode Pomodoro ?',
        answer:
          'Non. 52-17 propose des périodes de concentration et des pauses plus longues que le rythme Pomodoro classique 25/5.'
      },
      {
        question: 'Ces techniques de minuterie sont-elles gratuites ?',
        answer:
          'Deep Work, 52-17 et Flowtime font partie de l\'offre Premium, tout comme les durées de minuterie personnalisées et les statistiques plus détaillées.'
      },
    ]
  },
  leaderboards: {
    slug: 'leaderboards',
    eyebrow: 'Classements',
    title: 'Découvre où tu en es, à ton rythme',
    metaTitle: 'Appli de classements et de tableaux d\'honneur | Mesure-toi aux autres en fonction de tes progrès | SkillQuest',
    metaDescription:
      'Les classements SkillQuest comparent les points d\'expérience (XP) et les jours d\'activité sur des périodes hebdomadaires, mensuelles et depuis le début, avec des divisions allant du bronze au diamant pour te motiver en permanence.',
    summary:
      'Les classements transforment les XP et les jours d\'activité en un tableau des meilleurs que tu peux consulter chaque semaine, chaque mois ou depuis le début, avec des ligues qui donnent à la compétition un sentiment de progression.',
    cardSummary:
      'Classements hebdomadaires, mensuels et historiques, avec des divisions allant du bronze au diamant.',
    screenshot: '05-rankings.png',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Ajouter des amis',
    sections: [
      {
        title: 'Classements sur différentes périodes',
        body:
          'Un classement général « de tous les temps » peut te sembler hors de portée si tu débutes. SkillQuest établit plutôt des classements hebdomadaires, mensuels et généraux.',
        bullets: [
          'Les classements hebdomadaires et mensuels remettent régulièrement les compteurs à zéro.',
          'Les classements de tous les temps récompensent la régularité sur le long terme.',
          'Les classements sont basés sur les XP et les jours d\'activité.',
        ]
      },
      {
        title: 'Les ligues apportent un sentiment de progression',
        body:
          'Les divisions, du bronze au diamant, font de la compétition un parcours à franchir, et non un simple classement figé.',
        bullets: [
          'Gagne des échelons au fur et à mesure que tu restes actif.',
          'Affronte des adversaires de ton niveau, pas tout le monde en même temps.',
          'Les ligues, c\'est l\'occasion de jouer avec tes potes et de relever des défis pour te motiver encore plus.',
        ]
      },
      {
        title: 'Rivaliser sans perdre tes progrès',
        body:
          'Les classements viennent s\'ajouter à tes statistiques personnelles, ils ne les remplacent pas ; participer à la compétition ne signifie donc pas que tu dois perdre de vue ta propre progression.',
        bullets: [
          'L\'XP personnelle, les niveaux et les streaks restent visibles, quel que soit ton rang.',
          'Les classements vont naturellement de pair avec les amis et les défis.',
          'Utile pour les utilisateurs qui aiment la compétition, facultatif pour tous les autres.',
        ]
      },
    ],
    seoTerms: [
      'appli de classement',
      'classement des compétences',
      'classement des applis de productivité',
      'Classement XP',
      'application pour suivre ses habitudes, dans un esprit de compétition',
    ],
    faq: [
      {
        question: 'Comment les classements sont-ils calculés ?',
        answer:
          'Les classements sont basés sur les XP et les jours d\'activité, et sont affichés sur des périodes hebdomadaires, mensuelles et depuis le début.'
      },
      {
        question: 'C\'est quoi, les ligues ?',
        answer:
          'Les ligues classent les joueurs de « bronze » à « diamant », ce qui permet de jouer contre des adversaires de niveau similaire plutôt que contre tout le monde en même temps.'
      },
      {
        question: 'Est-ce que je dois participer à un concours pour utiliser SkillQuest ?',
        answer:
          'Non. Les classements et les ligues sont facultatifs. Le suivi des compétences de base, les XP et les niveaux fonctionnent de la même manière, qu\'ils soient présents ou non.'
      },
    ]
  },
  themes: {
    slug: 'themes',
    eyebrow: 'Thèmes',
    title: 'Fais en sorte que SkillQuest te donne l\'impression que c\'est ton application',
    metaTitle: 'Thèmes et personnalisation de l\'appli | Thèmes clair, sombre et à débloquer | SkillQuest',
    metaDescription:
      'SkillQuest prend en charge les modes clair, sombre et système, ainsi que des thèmes à débloquer en fonction de ta progression, pour que l\'appli ait exactement l\'apparence que tu souhaites.',
    summary:
      'Le mode clair, le mode sombre, le mode système et toute une série de thèmes à débloquer te permettent de personnaliser l\'apparence et l\'ambiance de SkillQuest comme tu le souhaites, certains thèmes étant même liés à ta propre progression.',
    cardSummary:
      'Mode clair, mode sombre et mode système, ainsi que des thèmes que tu débloques au fur et à mesure de ta progression.',
    screenshot: '07-themes-profile.png',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Découvre comment fonctionnent les streaks',
    sections: [
      {
        title: 'Mode clair, mode sombre et mode système',
        body:
          'SkillQuest s\'adapte par défaut à ton appareil, mais tu peux le verrouiller en mode clair ou foncé quand tu veux.',
        bullets: [
          'Le mode système s\'adapte automatiquement à ton appareil.',
          'Tu peux passer manuellement du mode clair au mode foncé à tout moment.',
          'Chaque thème est conçu selon les normes de Material 3 pour garantir un contraste homogène.',
        ]
      },
      {
        title: 'Des thèmes à débloquer, pas seulement à choisir',
        body:
          'Certains thèmes sont liés à ta progression, ce qui fait de la personnalisation une autre forme de progression visible, et pas seulement un menu de paramètres.',
        bullets: [
          'Débloque des thèmes supplémentaires en progressant régulièrement.',
          'Les déblocages gratuits coexistent avec les options de thèmes Premium.',
          'Le déblocage des thèmes est lié au même système de streaks et d\'XP que tout le reste.',
        ]
      },
      {
        title: 'Une personnalisation qui reste cohérente',
        body:
          'Les thèmes changent la couleur et l\'ambiance, mais pas la structure de l\'appli ; du coup, changer de thème ne t\'oblige jamais à réapprendre où se trouvent les choses.',
        bullets: [
          'Une mise en page homogène pour tous les thèmes.',
          'Les couleurs s\'adaptent sans nuire à la lisibilité ni au contraste.',
          'Ça marche pareil pour le suivi des compétences, les chronomètres et les statistiques.',
        ]
      },
    ],
    seoTerms: [
      'thèmes d\'appli',
      'appli pour prendre l\'habitude du mode sombre',
      'appli de personnalisation',
      'appli de thèmes à débloquer',
      'appli en mode clair/foncé',
    ],
    faq: [
      {
        question: 'Est-ce que SkillQuest prend en charge le mode sombre ?',
        answer:
          'Oui. SkillQuest prend en charge le mode clair, le mode sombre et un mode système qui s\'adapte à ton appareil.'
      },
      {
        question: 'Comment faire pour débloquer d\'autres thèmes ?',
        answer:
          'Certains thèmes se débloquent en progressant régulièrement, par exemple grâce à des streaks de jours consécutifs, tandis que d\'autres sont disponibles avec l\'abonnement Premium.'
      },
      {
        question: 'Est-ce que les thèmes modifient le fonctionnement de l\'appli ?',
        answer:
          'Non. Les thèmes ne changent que l\'apparence. Le suivi des compétences, les chronomètres et les statistiques fonctionnent de la même manière quel que soit le thème.'
      },
    ]
  },
  'guest-mode': {
    slug: 'guest-mode',
    eyebrow: 'Guest Mode',
    title: 'Essaie SkillQuest avant de créer un compte',
    metaTitle: 'Guest Mode | Essaie SkillQuest sans compte | SkillQuest',
    metaDescription:
      'Le Guest Mode de SkillQuest te permet de suivre tes compétences, d\'utiliser des minuteurs de concentration et de gagner des XP en local avant de créer un compte, pour que tu puisses l\'essayer sans risque.',
    summary:
      'Le Guest Mode te permet de passer l\'étape d\'inscription. Suis tes compétences, lance des minuteurs de concentration et gagne des XP directement sur ton appareil, puis crée un compte quand tu seras prêt.',
    cardSummary:
      'Essaie les fonctionnalités de suivi des compétences clés et les minuteurs de concentration en mode hors ligne, avant de créer un compte.',
    screenshot: '01-home-progress.png',
    primaryCta: 'Commence en tant qu\'invité',
    secondaryCta: 'Compare les formules Gratuit, Premium et Family',
    sections: [
      {
        title: 'Pas besoin de compte pour commencer',
        body:
          'Le Guest Mode te permet d\'ouvrir SkillQuest et de commencer tout de suite à suivre une compétence, sans avoir à t\'inscrire au préalable.',
        bullets: [
          'Le suivi des compétences principales, les minuteurs de concentration, l\'XP et les niveaux fonctionnent en Guest Mode.',
          'Ta progression est enregistrée localement sur ton appareil.',
          'Pas besoin d\'adresse e-mail ni de compte pour essayer l\'appli.',
        ]
      },
      {
        title: 'Crée un compte quand ça te semble utile',
        body:
          'Le Guest Mode, c\'est un point de départ, pas une impasse. Quand tu seras prêt pour la synchronisation, les amis ou les classements, créer un compte te permettra de conserver ta progression locale.',
        bullets: [
          'Passe à un compte complet sans perdre ta progression locale.',
          'Permet la synchronisation entre tes appareils, tes amis et les classements.',
          'Pas besoin de te décider avant d\'avoir testé l\'appli.',
        ]
      },
      {
        title: 'Ce qui reste limité en Guest Mode',
        body:
          'Certaines fonctionnalités nécessitent forcément un compte, car elles impliquent d\'autres personnes ou une synchronisation entre appareils.',
        bullets: [
          'Pour accéder à la section « Amis », aux défis et aux classements, il faut un compte.',
          'Pour profiter des fonctionnalités Family, il faut un compte et un groupe Family.',
          'Ta progression locale n\'est pas sauvegardée tant que tu n\'as pas créé de compte.',
        ]
      },
    ],
    seoTerms: [
      'Essaie l\'appli sans compte',
      'suivi d\'habitudes sans inscription',
      'appli « Guest Mode »',
      'Suivi des compétences sans compte',
      'application pour prendre de bonnes habitudes en essai gratuit',
    ],
    faq: [
      {
        question: 'Est-ce que j\'ai besoin d\'un compte pour utiliser SkillQuest ?',
        answer:
          'Non. Le Guest Mode te permet d\'utiliser les fonctionnalités principales de suivi des compétences et les minuteurs de concentration sans avoir à créer de compte.'
      },
      {
        question: 'Qu\'est-ce qui va se passer avec ma progression si je crée un compte plus tard ?',
        answer:
          'En quittant le Guest Mode, ta progression locale sera transférée vers ton nouveau compte.'
      },
      {
        question: 'Qu\'est-ce que je ne peux pas faire en Guest Mode ?',
        answer:
          'Les fonctionnalités « Amis », « Défis », « Classements » et « Family » nécessitent un compte, car elles impliquent une synchronisation avec d\'autres personnes.'
      },
    ]
  },
};

pages.es = {
  'focus-timer': {
    ...pages.en['focus-timer'],
    title: 'Un Focus Timer que registra tu progreso',
    metaTitle: 'App Focus Timer | Pomodoro, Deep Work y Flowtime | SkillQuest',
    metaDescription:
      'Usa SkillQuest como Focus Timer para Pomodoro, Deep Work, 52-17, Flowtime, Until Time y EMOM. Cada sesión cuenta para XP, niveles y progreso.',
    summary:
      'Inicia un timer para la habilidad que estás desarrollando. SkillQuest conecta los minutos de enfoque con XP, niveles, estadísticas y crecimiento visible.',
    cardSummary:
      'Pomodoro, Deep Work, Flowtime y otros modos de timer conectados con progreso real de habilidades.',
    primaryCta: 'Descargar SkillQuest',
    secondaryCta: 'Comparar Premium',
    sections: [
      {
        title: 'Elige el timer que encaja con tu tarea',
        body:
          'SkillQuest admite varias formas de enfoque, para que no dependas de un único flujo Pomodoro.',
        bullets: [
          'Pomodoro para sesiones cortas de estudio y trabajo.',
          'Deep Work y 52-17 para bloques de concentración más largos.',
          'Flowtime y Until Time para sesiones flexibles.',
          'EMOM para entrenamientos por intervalos y rutinas activas.'
        ]
      },
      {
        title: 'Cada minuto cuenta para una habilidad',
        body:
          'Un timer no está separado del progreso. Primero eliges una habilidad y después ves crecer XP, niveles y estadísticas.',
        bullets: [
          'Gana XP después de sesiones completadas.',
          'Sigue el tiempo de enfoque por habilidad.',
          'Revisa sesiones por habilidad en estadísticas.',
          'Construye rachas mediante práctica repetida.'
        ]
      },
      {
        title: 'Premium para más libertad de enfoque',
        body:
          'Premium está pensado para usuarios que quieren más técnicas de timer, duración personalizada y estadísticas más profundas.',
        bullets: [
          'Duración Flowtime personalizada y timers personalizados.',
          'Modos de timer avanzados para diferentes rutinas.',
          'Más historial y estadísticas para progreso a largo plazo.',
          'Premium cuesta EUR 3.99 al mes o EUR 39.99 al año.'
        ]
      }
    ],
    seoTerms: [
      'app focus timer',
      'app pomodoro',
      'deep work timer',
      'flowtime timer',
      'timer de habilidades',
      'timer productividad'
    ],
    faq: [
      {
        question: '¿SkillQuest es una app Pomodoro?',
        answer:
          'Sí. SkillQuest admite Pomodoro y otros modos de enfoque como 52-17, Deep Work, Flowtime, Until Time y EMOM. Algunas funciones avanzadas pertenecen a Premium.'
      },
      {
        question: '¿Los timers se conectan con habilidades?',
        answer:
          'Sí. Las sesiones completadas se vinculan con la habilidad elegida, haciendo visibles XP, estadísticas y progreso.'
      },
      {
        question: '¿Puedo usar duraciones personalizadas?',
        answer:
          'Sí. Las duraciones personalizadas y opciones avanzadas de timer forman parte de las funciones Premium.'
      }
    ]
  },
  family: {
    ...pages.en.family,
    title: 'Ayuda a los niños a practicar con estructura, metas y progreso visible',
    metaTitle: 'App Family para padres | Timers, metas y estadísticas infantiles | SkillQuest',
    metaDescription:
      'Con SkillQuest Family, los padres pueden iniciar timers para niños, ver estadísticas infantiles, definir metas semanales y enviar cumplidos.',
    summary:
      'Family da estructura a los padres sin tomar el control del progreso del niño. Timers, metas, XP y cumplidos hacen concreto el tiempo de práctica.',
    cardSummary:
      'Los padres pueden iniciar timers, ver estadísticas infantiles, definir metas y apoyar con feedback positivo.',
    primaryCta: 'Ver Family',
    secondaryCta: 'Descargar la app',
    sections: [
      {
        title: 'Ve cuándo practican los niños',
        body:
          'Con Family, los padres pueden ver qué sesiones se iniciaron y cómo evoluciona el progreso por habilidad.',
        bullets: [
          'Consulta la actividad de timers de los niños.',
          'Revisa estadísticas infantiles de sesiones, minutos y XP.',
          'Habla del progreso por habilidad.',
          'Entorno familiar privado con roles de padres.'
        ]
      },
      {
        title: 'Inicia timers para niños',
        body:
          'Los padres y propietarios pueden iniciar un timer para un niño. La sesión se vincula al niño para que el progreso siga visible allí.',
        bullets: [
          'Elige un niño y una habilidad desde el entorno familiar.',
          'Inicia tiempo de práctica cuando se necesita una meta clara.',
          'Conecta minutos de enfoque con XP y progreso.',
          'Los niños ven los timers iniciados por los padres.'
        ]
      },
      {
        title: 'Trabajad juntos hacia metas',
        body:
          'Family admite metas semanales y cumplidos, para que el acompañamiento no sea solo control.',
        bullets: [
          'Define metas en minutos o sesiones.',
          'Envía cumplidos por esfuerzo y progreso.',
          'Da a la familia un siguiente paso claro.',
          'Family cuesta EUR 6.99 al mes o EUR 69.99 al año.'
        ]
      }
    ],
    seoTerms: [
      'app productividad familiar',
      'app para padres',
      'timer infantil',
      'timer aprendizaje ninos',
      'app padres hijos'
    ],
    faq: [
      {
        question: '¿Los padres pueden iniciar timers para niños?',
        answer:
          'Sí. Con Family, padres y propietarios pueden iniciar timers para niños dentro del entorno familiar.'
      },
      {
        question: '¿Puedo ver el progreso de mi hijo?',
        answer:
          'Sí. Family incluye estadísticas infantiles con sesiones, minutos, XP, desglose por habilidad y actividad reciente.'
      },
      {
        question: '¿Family está incluido en Premium?',
        answer:
          'No. Family es una suscripción familiar separada con Premium más roles de padres, estadísticas infantiles, timers para niños, metas y cumplidos.'
      },
      {
        question: '¿SkillQuest está pensado para niños pequeños?',
        answer:
          'SkillQuest usa un marco de privacidad 13+. Por eso el marketing sobre niños debe formularse con cuidado.'
      }
    ]
  },
  'skill-tracker': {
    ...pages.en['skill-tracker'],
    title: 'Sigue habilidades, no solo tareas',
    metaTitle: 'App Skill Tracker | XP, niveles y progreso | SkillQuest',
    metaDescription:
      'SkillQuest es un Skill Tracker para estudio, deporte, música, lectura, código, trabajo creativo y rutinas. Inicia timers y sigue XP, niveles y progreso.',
    summary:
      'SkillQuest te ayuda a desarrollar habilidades conectando tiempo real de práctica con progreso, XP, niveles y estadísticas.',
    cardSummary:
      'Sigue habilidades, XP, niveles, rachas y tiempo de enfoque en una app móvil.',
    primaryCta: 'Descargar SkillQuest',
    secondaryCta: 'Ver Focus Timers',
    sections: [
      {
        title: 'Empieza con la habilidad, no con una tarea genérica',
        body:
          'SkillQuest orienta cada sesión hacia una habilidad, para que trabajo, aprendizaje y aficiones se conviertan en desarrollo visible.',
        bullets: [
          'Usa habilidades iniciales o crea las tuyas.',
          'Sigue estudio, deporte, música, lectura, código y trabajo creativo.',
          'Combina timers con XP, niveles y rachas.',
          'Ve qué habilidades reciben atención real.'
        ]
      },
      {
        title: 'Gamificación para practicar con regularidad',
        body:
          'XP, niveles y rachas hacen tangible el progreso, sin prometer resultados garantizados.',
        bullets: [
          'XP después de sesiones completadas.',
          'Niveles como hitos visibles.',
          'Rachas para rutinas repetidas.',
          'Clasificaciones y desafíos para motivación adicional.'
        ]
      },
      {
        title: 'Empieza gratis y mejora cuando lo necesites',
        body:
          'Guest Mode y las funciones Free ayudan a empezar. Premium y Family añaden más profundidad cuando SkillQuest pasa a formar parte de tu rutina.',
        bullets: [
          'Guest Mode para empezar rápido.',
          'Premium para más libertad de timers y estadísticas.',
          'Family para estructura entre padres e hijos.',
          'Sincronización centrada en la privacidad para cuentas.'
        ]
      }
    ],
    seoTerms: [
      'app skill tracker',
      'alternativa habit tracker',
      'app productividad xp',
      'seguimiento progreso habilidades',
      'practice tracker'
    ],
    faq: [
      {
        question: '¿Qué habilidades puedo seguir?',
        answer:
          'SkillQuest puede usarse para estudiar, trabajar, fitness, música, lectura, programación, proyectos creativos y rutinas propias.'
      },
      {
        question: '¿Puedo crear mis propias habilidades?',
        answer:
          'Sí. SkillQuest admite habilidades personalizadas para que la app encaje con tu rutina real.'
      },
      {
        question: '¿SkillQuest es un habit tracker?',
        answer:
          'SkillQuest se solapa con los habit trackers, pero se centra más en habilidades, tiempo de enfoque, XP, niveles y progreso medible.'
      }
    ]
  },
  'progress-statistics': {
    ...pages.en['progress-statistics'],
    title: 'Ve tu progreso en estadísticas, XP e historial de habilidades',
    metaTitle: 'Estadísticas de progreso | Skill Tracking y XP | SkillQuest',
    metaDescription:
      'Consulta estadísticas de SkillQuest por día, semana, mes y año. Sigue XP, sesiones, minutos, desglose de habilidades y estadísticas infantiles con Family.',
    summary:
      'SkillQuest hace medible el tiempo de práctica con estadísticas, desgloses por habilidad, XP, historial de sesiones y progreso por periodo.',
    cardSummary:
      'Estadísticas de minutos de enfoque, sesiones, XP, habilidades y progreso infantil con Family.',
    primaryCta: 'Descargar SkillQuest',
    secondaryCta: 'Comparar Premium',
    sections: [
      {
        title: 'Entiende adónde va tu tiempo',
        body:
          'Las estadísticas ayudan a ver patrones en el tiempo de práctica y el enfoque por habilidad, sin presentarlos como resultados garantizados.',
        bullets: [
          'Consulta sesiones y minutos por periodo.',
          'Compara habilidades y actividad.',
          'Usa XP y niveles como señales de progreso.',
          'Revisa sesiones recientes e historial.'
        ]
      },
      {
        title: 'Insights más profundos con Premium',
        body:
          'Premium está pensado para usuarios que quieren mirar más allá de las estadísticas básicas.',
        bullets: [
          'Estadísticas y tendencias ampliadas.',
          'Más historial para rutinas a largo plazo.',
          'Mejor visibilidad de desgloses por habilidad.',
          'La exportación de datos aparece como función Premium en los modelos de producto y debe confirmarse visualmente antes de hacer claims destacados.'
        ]
      },
      {
        title: 'Haz visible el progreso infantil con Family',
        body:
          'Con Family, los padres pueden revisar el progreso de los niños y hablar con más claridad sobre el tiempo de práctica.',
        bullets: [
          'Estadísticas infantiles con sesiones, minutos y XP.',
          'Actividad de timers para ver cuándo empieza la práctica.',
          'Metas y cumplidos hacen más concreto el acompañamiento.',
          'Family es una suscripción separada para familias.'
        ]
      }
    ],
    seoTerms: [
      'estadisticas productividad',
      'app estadisticas habilidades',
      'estadisticas time tracking',
      'seguimiento progreso xp',
      'app progreso familiar'
    ],
    faq: [
      {
        question: '¿Qué estadísticas muestra SkillQuest?',
        answer:
          'SkillQuest muestra sesiones, minutos, XP, progreso por habilidad y actividad en diferentes periodos.'
      },
      {
        question: '¿Puedo ver tendencias a largo plazo?',
        answer:
          'Premium incluye estadísticas ampliadas y más historial. Revisa la app para ver el conjunto actual de funciones visibles.'
      },
      {
        question: '¿Los padres pueden ver estadísticas de los niños?',
        answer:
          'Sí. Family incluye estadísticas infantiles para padres y propietarios dentro del entorno familiar.'
      }
    ]
  },
  'pomodoro-timer': {
    slug: 'pomodoro-timer',
    eyebrow: 'Temporizador Pomodoro',
    title: 'Un temporizador Pomodoro adaptado a tus habilidades',
    metaTitle: 'App Pomodoro Timer | Sesiones de estudio y concentración | SkillQuest',
    metaDescription:
      'Usa SkillQuest como temporizador Pomodoro gratuito para estudiar y trabajar concentrado. Cada sesión de 25 minutos te da XP, te hace subir de nivel y te ayuda a mejorar tus habilidades.',
    summary:
      'El clásico ritmo Pomodoro de 25/5, integrado en SkillQuest para que cada sprint te dé XP, subas de nivel y avances en la habilidad que estás practicando.',
    cardSummary:
      'El clásico ritmo de enfoque 25/5, vinculado a los XP, los niveles y el progreso de las habilidades.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Descarga SkillQuest',
    secondaryCta: 'Compara las técnicas de temporización',
    sections: [
      {
        title: 'La técnica Pomodoro, sin necesidad de una app aparte',
        body:
          'La técnica Pomodoro divide el trabajo en sesiones cortas y concentradas con descansos regulares. SkillQuest incluye esto como una de sus varias técnicas de temporizador, así que no necesitas una app de Pomodoro aparte junto a tu registro.',
        bullets: [
          'Sesiones de concentración de 25 minutos con descansos incorporados.',
          'Está disponible en el plan gratuito, sin necesidad de suscripción.',
          'Sirve para estudiar, hacer tareas del trabajo, leer o cualquier habilidad que quieras llevar un seguimiento.',
        ]
      },
      {
        title: 'Cada sprint cuenta para una habilidad',
        body:
          'Un temporizador Pomodoro por sí solo solo mide el tiempo. SkillQuest vincula cada sprint a la habilidad que has elegido, así que tu concentración se convierte en un progreso visible.',
        bullets: [
          'Gana XP cada vez que termines una sesión de Pomodoro.',
          'Echa un vistazo a las sesiones agrupadas por habilidad en tus estadísticas.',
          'Lleva un registro de tus rachas para mantener unos hábitos Pomodoro constantes.',
        ]
      },
      {
        title: 'Más allá de Pomodoro, cuando necesitas algo más',
        body:
          'Hay tareas que requieren sesiones de concentración más largas o más flexibles que 25 minutos. SkillQuest incluye otras técnicas a las que puedes cambiar sin salir de la app.',
        bullets: [
          '«Deep Work» y «52-17» para sesiones más largas.',
          '«Flowtime» y «Until Time» para duraciones flexibles.',
          'Con la versión Premium se desbloquean todas las técnicas de temporizador.',
        ]
      },
    ],
    seoTerms: [
      'app de temporizador Pomodoro',
      'Temporizador Pomodoro para estudiar',
      'Temporizador de 25 minutos',
      'Aplicación para estudiar con el método Pomodoro',
      'temporizador Pomodoro gratis',
    ],
    faq: [
      {
        question: '¿El temporizador Pomodoro es gratis en SkillQuest?',
        answer:
          'Sí. Pomodoro está disponible en el plan gratuito, junto con los XP, los niveles y las estadísticas básicas.'
      },
      {
        question: '¿Puedo usar la técnica Pomodoro para estudiar?',
        answer:
          'Sí. Muchos usuarios llevan un seguimiento de sus sesiones de estudio con Pomodoro, vinculando cada sprint a una habilidad relacionada con el estudio.'
      },
      {
        question: '¿Qué pasa cuando acaba una sesión de Pomodoro?',
        answer:
          'La sesión se suma a tus estadísticas de habilidad y te da XP, así que el tiempo que dedicas a concentrarte se convierte en un progreso visible.'
      },
    ]
  },
  streaks: {
    slug: 'streaks',
    eyebrow: 'Rachas',
    title: 'Convierte la constancia en una racha que se note',
    metaTitle: 'App Streak Tracker con XP | Crea hábitos diarios | SkillQuest',
    metaDescription:
      'SkillQuest lleva la cuenta de tu racha diaria para cada habilidad que practiques, con XP, niveles y la posibilidad de congelar la racha, para que un día sin practicar no borre tu progreso.',
    summary:
      'La racha diaria lleva la cuenta de tu constancia, con puntos de experiencia (XP) y niveles, para que esa constancia se sienta como un progreso, no solo como un número.',
    cardSummary:
      'Rachas diarias con XP y pausas en las rachas, para que se vea bien la constancia.',
    screenshot: '03-session-reward.png',
    primaryCta: 'Empieza tu racha',
    secondaryCta: 'Descubre cómo funciona XP',
    sections: [
      {
        title: 'Rachas que te recompensan por participar',
        body:
          'Cada día que haces una sesión de concentración, tu racha va aumentando. Es una señal sencilla y clara que convierte la pregunta «¿he practicado hoy?» en un recuento continuo.',
        bullets: [
          'Gana 10 XP por cada día activo, además de los XP de sesión.',
          'Las rachas se aplican a todas las habilidades que sigues.',
          'Echa un vistazo rápido a tu racha actual y a la más larga que has tenido.',
        ]
      },
      {
        title: 'Las pausas en la racha te protegen si alguna vez fallas',
        body:
          'A veces la vida se interpone. Con las pausas en la racha, un día que te saltes no tiene por qué echar por tierra semanas de constancia.',
        bullets: [
          'Protege tu racha por si alguna vez te saltas un día.',
          'Mantén la motivación a largo plazo sin sentir que es «todo o nada».',
          'Las rachas que marcan hitos (7, 30, 100 o más días) pueden generar publicaciones de actividad que se pueden compartir.',
        ]
      },
      {
        title: 'Las rachas te dan mucho más que simples números',
        body:
          'En SkillQuest, la progresión no se limita a un simple contador: los temas y las recompensas están vinculados a tu progreso.',
        bullets: [
          'Desbloquea temas a medida que vas avanzando.',
          'Combina las rachas con los XP y los niveles para tener una visión más completa.',
          'Usa los hitos de rachas como puntos de control naturales.',
        ]
      },
    ],
    seoTerms: [
      'app para llevar la cuenta de rachas',
      'registro de hábitos con rachas',
      'app de rachas diarias',
      'xp registro de hábitos',
      'aplicación para llevar un seguimiento de hábitos con elementos de juego',
    ],
    faq: [
      {
        question: '¿Cómo funciona el sistema de rachas en SkillQuest?',
        answer:
          'Si completas una sesión de concentración un día determinado, mantienes tu racha y ganas 10 XP por ese día activo, además de los XP de la sesión.'
      },
      {
        question: '¿Qué pasa si me salto un día?',
        answer:
          'Las opciones para congelar la racha pueden proteger tu racha si alguna vez te saltas un día, para que un solo día sin hacer ejercicio no borre todo tu progreso.'
      },
      {
        question: '¿El seguimiento de rachas es gratis?',
        answer:
          'Sí. Las rachas diarias, los XP y los niveles forman parte del plan gratuito.'
      },
    ]
  },
  'friends-challenges': {
    slug: 'friends-challenges',
    eyebrow: 'Amigos y retos',
    title: 'Haz que el progreso sea un poco más social',
    metaTitle: 'App «Amigos y retos» | Compromiso para mejorar la concentración y las habilidades | SkillQuest',
    metaDescription:
      'Añade amigos, participa en los retos «XP Race» y «Active Days», y comparte tus progresos como más te apetezca gracias a las funciones sociales y los controles de privacidad de SkillQuest.',
    summary:
      'Añade amigos, lanza retos y consigue que te animen cuando quieras, con controles de privacidad que te permiten compartir lo que quieras, como tú quieras.',
    cardSummary:
      'Amigos, retos y un feed de actividades, con opciones de privacidad que tú mismo gestionas.',
    screenshot: '06-social-family.png',
    primaryCta: 'Descarga SkillQuest',
    secondaryCta: 'Ver las clasificaciones',
    sections: [
      {
        title: 'Añade amigos para que te hagan rendir cuentas de verdad',
        body:
          'Si solo llevas un seguimiento de tus progresos, es fácil que se te pasen por alto. Añadir amigos en SkillQuest te aporta ese sentido de la responsabilidad que te dan las personas que realmente conoces.',
        bullets: [
          'Envía y acepta solicitudes de amistad desde la app.',
          'Ver las estadísticas de tus amigos cuando ambas partes lo permitan.',
          'Un botón de privacidad te permite controlar lo que compartes.',
        ]
      },
      {
        title: 'Retos que nos acercan a un objetivo común',
        body:
          'Los retos convierten el esfuerzo individual en un esfuerzo conjunto, ya sea en una carrera de XP o en una batalla de «Días Activos».',
        bullets: [
          'Inicia una carrera de XP o una batalla de «Días Activos» con tus amigos.',
          'Seguid juntos el progreso del reto y la actividad reciente.',
          'Mira quién va en cabeza sin perder de vista tu propio progreso.',
        ]
      },
      {
        title: 'Un feed de actividades que celebra los hitos',
        body:
          'Las rachas y otros hitos pueden aparecer como publicaciones de actividad, así que se nota tu progreso sin que se convierta en un feed público.',
        bullets: [
          'Publicaciones automáticas para hitos como 7, 30 o 100 días de actividad.',
          'Las publicaciones que respetan la privacidad tienen en cuenta tu configuración.',
          'Hecho para amigos y contactos aceptados, no para un muro público.',
        ]
      },
    ],
    seoTerms: [
      'app de retos entre amigos',
      'app para mantenerte responsable',
      'retos de habilidad',
      'app de productividad con tabla de clasificación',
      'registro de hábitos sociales',
    ],
    faq: [
      {
        question: '¿Necesito tener amigos para usar SkillQuest?',
        answer:
          'No. Los amigos y los retos son funciones sociales opcionales que se suman al seguimiento básico de tus habilidades.'
      },
      {
        question: '¿Puedo controlar lo que ven mis amigos?',
        answer:
          'Sí. Hay un botón de privacidad que te permite decidir si tus amigos pueden ver tus estadísticas y tu actividad.'
      },
      {
        question: '¿Qué tipo de retos puedo poner en marcha?',
        answer:
          'SkillQuest admite tipos de retos como la «Carrera de XP» y la «Batalla de días activos», con seguimiento compartido del progreso.'
      },
    ]
  },
  'study-timer': {
    slug: 'study-timer',
    eyebrow: 'Temporizador de estudio',
    title: 'Un temporizador de estudio que hace mucho más que marcar el tiempo',
    metaTitle: 'App Study Timer | Lleva un control de tus sesiones de estudio por asignatura | SkillQuest',
    metaDescription:
      'Usa SkillQuest como temporizador de estudio para exámenes, deberes y repaso. Lleva un control del tiempo de estudio por asignatura con XP, niveles y estadísticas.',
    summary:
      'Convierte las sesiones de estudio en un progreso visible por asignatura, con temporizadores de concentración, XP y estadísticas pensadas para el estudio repetido, no solo para una cuenta atrás puntual.',
    cardSummary:
      'Sesiones de estudio registradas por asignatura, con XP, niveles y estadísticas.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Empieza a estudiar con SkillQuest',
    secondaryCta: 'Compara los temporizadores de concentración',
    sections: [
      {
        title: 'Lleva un control del tiempo que dedicas a cada asignatura, no solo del tiempo total',
        body:
          'Considera cada asignatura o examen como una habilidad en sí misma, para que puedas ver exactamente cómo se distribuye el tiempo de estudio, y no solo una cifra global.',
        bullets: [
          'Crea una habilidad por asignatura, curso o examen.',
          'Elige entre Pomodoro, Deep Work o Flowtime según la tarea.',
          'Consulta el historial de sesiones y los totales por asignatura.',
        ]
      },
      {
        title: 'Estructura integrada para los periodos de exámenes',
        body:
          'Estudiar para los exámenes suele implicar alternar entre sesiones cortas de repaso y sesiones más largas y intensas. SkillQuest te permite hacer ambas cosas sin necesidad de configuraciones adicionales.',
        bullets: [
          'Sprints cortos del método Pomodoro para fichas de estudio y repaso rápido.',
          'Sesiones más largas de «Deep Work» o «Flowtime» para hacer exámenes de práctica.',
          'Descansos inteligentes que se adaptan a la técnica que elijas.',
        ]
      },
      {
        title: 'Motivación para el largo plazo',
        body:
          'Es más fácil mantener las rutinas de estudio cuando el progreso se ve, y no solo se intuye.',
        bullets: [
          'Los XP y los niveles por asignatura te permiten ver el progreso que vas haciendo.',
          'Las rachas diarias te ayudan a mantener unos hábitos de estudio constantes.',
          'Las estadísticas muestran qué temas están llamando la atención y cuáles no.',
        ]
      },
    ],
    seoTerms: [
      'app de temporizador para estudiar',
      'app para llevar un seguimiento de tus estudios',
      'temporizador para estudiar para los exámenes',
      'temporizador para los deberes',
      'Aplicación para estudiar con el método Pomodoro',
    ],
    faq: [
      {
        question: '¿Puedo llevar un control del tiempo de estudio por asignatura?',
        answer:
          'Sí. Crea una habilidad para cada asignatura o examen, y SkillQuest lleva un registro del tiempo, los XP y las estadísticas por separado para cada una.'
      },
      {
        question: '¿Qué temporizador es el mejor para estudiar?',
        answer:
          'La técnica del Pomodoro funciona bien para las sesiones cortas de repaso, mientras que el «Deep Work» o el «Flowtime» son más adecuados para sesiones más largas de estudio o de simulacros de examen.'
      },
      {
        question: '¿El temporizador de estudio es gratis?',
        answer:
          'Sí. El seguimiento de habilidades, el método Pomodoro, los XP y los niveles están disponibles en el plan gratuito.'
      },
    ]
  },
  'deep-work-flowtime': {
    slug: 'deep-work-flowtime',
    eyebrow: 'Deep Work & Flowtime',
    title: 'Bloques de concentración más largos para trabajos que requieren profundidad',
    metaTitle: 'Temporizador para Deep Work & Flowtime | Sesiones de concentración Premium | SkillQuest',
    metaDescription:
      'Usa Deep Work, 52-17 y Flowtime en SkillQuest para sesiones de concentración más largas y sin interrupciones. Técnicas de temporizador Premium con duración personalizada.',
    summary:
      'Cuando una tarea requiere un sprint de más de 25 minutos, Deep Work, 52-17 y Flowtime te ofrecen bloques de concentración más largos y flexibles que, además, cuentan para los XP y el progreso.',
    cardSummary:
      'Deep Work, 52-17 y Flowtime para sesiones de concentración más largas y flexibles.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Compara las tarifas Premium',
    secondaryCta: 'Ver todas las técnicas con el cronómetro',
    sections: [
      {
        title: '«Deep Work» para sesiones de concentración sin interrupciones',
        body:
          '«Deep Work» está pensado para sesiones largas en las que te centras en una sola tarea, para ese tipo de trabajo que pierde valor si te interrumpen cada 25 minutos.',
        bullets: [
          'Bloques de concentración más largos que los del método Pomodoro, centrados en una sola tarea.',
          'Cuenta para la misma XP, los mismos niveles y las mismas estadísticas que cualquier otra sesión.',
          'Forma parte de las técnicas del temporizador Premium.',
        ]
      },
      {
        title: '52-17 para un ritmo estructurado de enfoque a largo plazo',
        body:
          '52 minutos de concentración seguidos de un descanso de 17 minutos es un ritmo que se basa en los ciclos naturales de atención, muy útil para sesiones largas de trabajo o estudio.',
        bullets: [
          'Una relación fija entre atención y distracción, basada en la investigación.',
          'Ideal para sesiones de trabajo o estudio de varias horas.',
          'Se incluye en la versión Premium junto con otras técnicas de temporizador.',
        ]
      },
      {
        title: 'Flowtime: sesiones flexibles que puedes hacer a tu propio ritmo',
        body:
          'Flowtime no te obliga a seguir una duración fija. Trabajas hasta que, de forma natural, te apetezca tomarte un descanso, y la sesión sigue contando.',
        bullets: [
          'Duración personalizada, que decides tú mismo en lugar de seguir una técnica fija.',
          'Ideal para trabajos creativos, programar o sesiones de escritura.',
          'Los descansos inteligentes varían en función del tiempo que hayas estado concentrado.',
        ]
      },
    ],
    seoTerms: [
      'temporizador para el trabajo profundo',
      'temporizador de tiempo de flujo',
      '52 17 temporizador de reglas',
      'temporizador de enfoque personalizado',
      'app para sesiones de concentración prolongada',
    ],
    faq: [
      {
        question: '¿Cuál es la diferencia entre el «Deep Work» y el «Flowtime»?',
        answer:
          'El «Deep Work» es un bloque de concentración más largo y de duración fija, mientras que el «Flowtime» te permite establecer una duración personalizada y trabajar a tu propio ritmo.'
      },
      {
        question: '¿El método 52-17 es lo mismo que el Pomodoro?',
        answer:
          'No. 52-17 utiliza periodos de concentración y descansos más largos que el ritmo clásico Pomodoro de 25/5.'
      },
      {
        question: '¿Estas técnicas con el temporizador son gratis?',
        answer:
          '«Deep Work», «52-17» y «Flowtime» forman parte de la versión Premium, junto con los temporizadores personalizables y estadísticas más detalladas.'
      },
    ]
  },
  leaderboards: {
    slug: 'leaderboards',
    eyebrow: 'Clasificaciones',
    title: 'Comprueba cómo va tu progreso, a tu ritmo',
    metaTitle: 'App de tablas de clasificación y rankings | Compite por tu progreso en habilidades | SkillQuest',
    metaDescription:
      'Las clasificaciones de SkillQuest comparan los puntos de experiencia (XP) y los días activos en periodos semanales, mensuales y totales, con ligas que van desde el bronce hasta el diamante para mantenerte motivado.',
    summary:
      'Las clasificaciones convierten los XP y los días activos en una tabla de clasificación que puedes consultar semanalmente, mensualmente o de todos los tiempos, con ligas que aportan a la competición una sensación de progresión.',
    cardSummary:
      'Clasificaciones semanales, mensuales y de todos los tiempos, con ligas que van desde el bronce hasta el diamante.',
    screenshot: '05-rankings.png',
    primaryCta: 'Descarga SkillQuest',
    secondaryCta: 'Añadir amigos',
    sections: [
      {
        title: 'Clasificaciones en diferentes periodos de tiempo',
        body:
          'Una clasificación única de todos los tiempos puede parecer inalcanzable si acabas de empezar. SkillQuest, en cambio, establece clasificaciones semanales, mensuales y de todos los tiempos.',
        bullets: [
          'Las clasificaciones semanales y mensuales reinician la carrera con regularidad.',
          'Las clasificaciones históricas premian la constancia a largo plazo.',
          'Las clasificaciones se basan en los XP y los días de actividad.',
        ]
      },
      {
        title: 'Las ligas te dan la sensación de ir avanzando',
        body:
          'Las ligas, desde la de bronce hasta la de diamante, hacen que la competición sea algo por lo que vas avanzando, en lugar de una única clasificación fija.',
        bullets: [
          'Ve subiendo de categoría a medida que te mantienes activo.',
          'Compite contra gente de tu mismo nivel, no contra todo el mundo a la vez.',
          'Las ligas te permiten jugar junto a tus amigos y participar en retos para tener un poco más de motivación.',
        ]
      },
      {
        title: 'Competir sin perder lo que ya has avanzado',
        body:
          'Las clasificaciones complementan tus estadísticas personales, no las sustituyen, así que competir no significa perder de vista tu propio progreso.',
        bullets: [
          'La XP personal, los niveles y las rachas siguen apareciendo independientemente del rango.',
          'Las clasificaciones van de la mano con los amigos y los retos.',
          'Útil para los usuarios más exigentes, opcional para el resto.',
        ]
      },
    ],
    seoTerms: [
      'app de clasificaciones',
      'clasificación por habilidades',
      'app de productividad mejor valorada',
      'clasificación de XP',
      'aplicación para llevar un seguimiento de hábitos competitiva',
    ],
    faq: [
      {
        question: '¿Cómo se calculan las clasificaciones?',
        answer:
          'Las clasificaciones se basan en los XP y los días de actividad, y se muestran por periodos semanales, mensuales y totales.'
      },
      {
        question: '¿Qué son las ligas?',
        answer:
          'Las ligas agrupan a los usuarios desde el nivel Bronce hasta el Diamante, así que compites contra gente de un nivel similar en lugar de contra todo el mundo a la vez.'
      },
      {
        question: '¿Tengo que participar en una competición para usar SkillQuest?',
        answer:
          'No. Las clasificaciones y las ligas son opcionales. El seguimiento de las habilidades básicas, la XP y los niveles funcionan igual tanto si las tienes como si no.'
      },
    ]
  },
  themes: {
    slug: 'themes',
    eyebrow: 'Temas',
    title: 'Haz que SkillQuest parezca tu propia app',
    metaTitle: 'Temas y personalización de la app | Temas claros, oscuros y desbloqueables | SkillQuest',
    metaDescription:
      'SkillQuest admite los modos claro, oscuro y de sistema, además de temas desbloqueables vinculados a tu progreso, para que la app tenga el aspecto que tú quieras.',
    summary:
      'El modo claro, el modo oscuro, el modo del sistema y un conjunto de temas desbloqueables te permiten personalizar SkillQuest a tu gusto, y algunos temas dependen de tu propio progreso.',
    cardSummary:
      'Modo claro, oscuro y de sistema, además de temas que vas desbloqueando a medida que avanzas.',
    screenshot: '07-themes-profile.png',
    primaryCta: 'Descarga SkillQuest',
    secondaryCta: 'Descubre cómo funcionan las rachas',
    sections: [
      {
        title: 'Modo claro, oscuro y de sistema',
        body:
          'SkillQuest se adapta a la configuración de tu dispositivo por defecto, pero puedes fijarlo en el modo claro o oscuro cuando quieras.',
        bullets: [
          'El modo del sistema se adapta automáticamente a tu dispositivo.',
          'Puedes cambiar al modo claro u oscuro manualmente en cualquier momento.',
          'Todos los temas están diseñados según los estándares de Material 3 para garantizar un contraste uniforme.',
        ]
      },
      {
        title: 'Temas que desbloqueas, no solo eliges',
        body:
          'Algunos temas están vinculados a tu progreso, así que la personalización se convierte en otra forma de crecimiento visible, no solo en un menú de ajustes.',
        bullets: [
          'Desbloquea temas adicionales a medida que vas avanzando.',
          'Los desbloqueos gratuitos se ofrecen junto con las opciones de temas Premium.',
          'Los desbloqueos de temas se vinculan al mismo sistema de rachas y XP que el resto de cosas.',
        ]
      },
      {
        title: 'Una personalización que se mantiene coherente',
        body:
          'Los temas cambian el color y el estilo, pero no la estructura de la app, así que cambiar de tema nunca significa tener que volver a aprender dónde están las cosas.',
        bullets: [
          'Diseño uniforme en todos los temas.',
          'Los colores se adaptan sin que se pierda la legibilidad ni el contraste.',
          'Funciona igual tanto para el seguimiento de habilidades como para los temporizadores y las estadísticas.',
        ]
      },
    ],
    seoTerms: [
      'temas de aplicaciones',
      'app para crear hábitos en modo oscuro',
      'app de personalización',
      'app de temas desbloqueables',
      'app con modo claro y oscuro',
    ],
    faq: [
      {
        question: '¿SkillQuest es compatible con el modo oscuro?',
        answer:
          'Sí. SkillQuest es compatible con el modo claro, el modo oscuro y un modo de sistema que se adapta a tu dispositivo.'
      },
      {
        question: '¿Cómo puedo desbloquear más temas?',
        answer:
          'Algunos temas se desbloquean al avanzar de forma constante, como las rachas, además de los temas disponibles con la versión Premium.'
      },
      {
        question: '¿Los temas cambian el funcionamiento de la app?',
        answer:
          'No. Los temas solo cambian el aspecto. El seguimiento de habilidades, los temporizadores y las estadísticas funcionan igual en todos los temas.'
      },
    ]
  },
  'guest-mode': {
    slug: 'guest-mode',
    eyebrow: 'Guest Mode',
    title: 'Prueba SkillQuest antes de crear una cuenta',
    metaTitle: 'Guest Mode | Prueba SkillQuest sin necesidad de crear una cuenta | SkillQuest',
    metaDescription:
      'El Guest Mode de SkillQuest te permite llevar un seguimiento de tus habilidades, usar temporizadores de concentración y ganar XP de forma local antes de crear una cuenta, para que puedas probarlo sin ningún riesgo.',
    summary:
      'El «Guest Mode» te ahorra el paso de registrarte. Lleva un seguimiento de tus habilidades, usa temporizadores de concentración y gana XP directamente en tu dispositivo; luego, crea una cuenta cuando estés listo.',
    cardSummary:
      'Prueba las funciones de seguimiento de habilidades básicas y los temporizadores de concentración sin necesidad de registrarte, antes de crear una cuenta.',
    screenshot: '01-home-progress.png',
    primaryCta: 'Empieza como invitado',
    secondaryCta: 'Compara las versiones Gratis, Premium y Family',
    sections: [
      {
        title: 'No hace falta tener una cuenta para empezar',
        body:
          'El «Guest Mode» te permite abrir SkillQuest y empezar a hacer un seguimiento de una habilidad al instante, sin tener que registrarte.',
        bullets: [
          'El seguimiento de habilidades básicas, los temporizadores de concentración, la XP y los niveles funcionan en el Guest Mode.',
          'El progreso se guarda localmente en tu dispositivo.',
          'No hace falta un correo electrónico ni una cuenta para probar la app.',
        ]
      },
      {
        title: 'Crea una cuenta cuando te parezca oportuno',
        body:
          'El «Guest Mode» es un punto de partida, no un callejón sin salida. Cuando estés listo para la sincronización, los amigos o las clasificaciones, al crear una cuenta podrás conservar tu progreso local.',
        bullets: [
          'Cambia a una cuenta completa sin perder el progreso local.',
          'Te permite sincronizar entre dispositivos, amigos y clasificaciones.',
          'No te sientas presionado a decidirte antes de haber probado la app.',
        ]
      },
      {
        title: 'Qué funciones están limitadas en el Guest Mode',
        body:
          'Algunas funciones dependen, por su propia naturaleza, de tener una cuenta, ya que implican a otras personas o la sincronización entre dispositivos.',
        bullets: [
          'Para acceder a la sección de amigos, los retos y las clasificaciones, necesitas una cuenta.',
          'Para usar las funciones Family, necesitas una cuenta y un grupo Family.',
          'El progreso que solo se guarda localmente no se guarda en la nube hasta que crees una cuenta.',
        ]
      },
    ],
    seoTerms: [
      'Prueba la app sin necesidad de crear una cuenta',
      'registro de hábitos sin necesidad de registrarte',
      'app del Guest Mode',
      'Seguimiento de habilidades sin cuenta',
      'app para crear hábitos con prueba gratuita',
    ],
    faq: [
      {
        question: '¿Necesito una cuenta para usar SkillQuest?',
        answer:
          'No. El «Guest Mode» te permite usar las funciones básicas de seguimiento de habilidades y los temporizadores de concentración sin necesidad de crear una cuenta.'
      },
      {
        question: '¿Qué pasa con mi progreso si me hago una cuenta más adelante?',
        answer:
          'Al pasar del Guest Mode, tu progreso local se transfiere a tu nueva cuenta.'
      },
      {
        question: '¿Qué es lo que no puedo hacer en el Guest Mode?',
        answer:
          'Las funciones de «Amigos», «Retos», «Clasificaciones» y «Family» requieren una cuenta, ya que implican sincronizarse con otras personas.'
      },
    ]
  },
};

pages.it = {
  'focus-timer': {
    ...pages.en['focus-timer'],
    title: 'Un Focus Timer che tiene traccia dei tuoi progressi',
    metaTitle: 'App Focus Timer | Pomodoro, Deep Work e Flowtime | SkillQuest',
    metaDescription:
      'Usa SkillQuest come Focus Timer per Pomodoro, Deep Work, 52-17, Flowtime, Until Time ed EMOM. Ogni sessione conta per XP, livelli e progresso.',
    summary:
      'Avvia un timer per la competenza su cui stai lavorando. SkillQuest collega i minuti di concentrazione a XP, livelli, statistiche e crescita visibile.',
    cardSummary:
      'Pomodoro, Deep Work, Flowtime e altri modi timer collegati al progresso reale delle competenze.',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Confronta Premium',
    sections: [
      {
        title: 'Scegli il timer adatto al tuo compito',
        body:
          'SkillQuest supporta diverse forme di concentrazione, così non resti bloccato in un unico flusso Pomodoro.',
        bullets: [
          'Pomodoro per brevi sprint di studio e lavoro.',
          'Deep Work e 52-17 per blocchi di concentrazione più lunghi.',
          'Flowtime e Until Time per sessioni flessibili.',
          'EMOM per allenamenti a intervalli e routine attive.'
        ]
      },
      {
        title: 'Ogni minuto conta per una competenza',
        body:
          'Un timer non è separato dai progressi. Prima scegli una competenza, poi vedi crescere XP, livelli e statistiche.',
        bullets: [
          'Guadagna XP dopo le sessioni completate.',
          'Monitora il tempo di concentrazione per competenza.',
          'Rivedi le sessioni per skill nelle statistiche.',
          'Costruisci serie con la pratica ripetuta.'
        ]
      },
      {
        title: 'Premium per più libertà di concentrazione',
        body:
          'Premium è pensato per utenti che vogliono più tecniche timer, durata personalizzata e statistiche più profonde.',
        bullets: [
          'Durata Flowtime personalizzata e timer personalizzati.',
          'Modi timer avanzati per routine diverse.',
          'Più storico e statistiche per il progresso a lungo termine.',
          'Premium costa EUR 3.99 al mese o EUR 39.99 all’anno.'
        ]
      }
    ],
    seoTerms: [
      'app focus timer',
      'app pomodoro',
      'deep work timer',
      'flowtime timer',
      'timer competenze',
      'timer produttivita'
    ],
    faq: [
      {
        question: 'SkillQuest è un’app Pomodoro?',
        answer:
          'Sì. SkillQuest supporta Pomodoro e altri modi di concentrazione come 52-17, Deep Work, Flowtime, Until Time ed EMOM. Alcune funzioni avanzate appartengono a Premium.'
      },
      {
        question: 'I timer sono collegati alle competenze?',
        answer:
          'Sì. Le sessioni completate sono collegate alla skill selezionata, rendendo visibili XP, statistiche e progresso.'
      },
      {
        question: 'Posso usare durate personalizzate?',
        answer:
          'Sì. Durate personalizzate e opzioni timer avanzate fanno parte delle funzioni Premium.'
      }
    ]
  },
  family: {
    ...pages.en.family,
    title: 'Aiuta i figli a praticare con struttura, obiettivi e progresso visibile',
    metaTitle: 'App Family per genitori | Timer, obiettivi e statistiche figli | SkillQuest',
    metaDescription:
      'Con SkillQuest Family, i genitori possono avviare timer per i figli, vedere statistiche dei figli, impostare obiettivi settimanali e inviare complimenti.',
    summary:
      'Family dà ai genitori una struttura senza prendere il controllo dei progressi del figlio. Timer, obiettivi, XP e complimenti rendono concreta la pratica.',
    cardSummary:
      'I genitori possono avviare timer, vedere statistiche dei figli, impostare obiettivi e sostenere con feedback positivo.',
    primaryCta: 'Vedi Family',
    secondaryCta: 'Scarica l’app',
    sections: [
      {
        title: 'Vedi quando i figli praticano',
        body:
          'Con Family, i genitori possono vedere quali sessioni sono state avviate e come si sviluppa il progresso per skill.',
        bullets: [
          'Consulta l’attività timer dei figli.',
          'Controlla statistiche dei figli per sessioni, minuti e XP.',
          'Parla dei progressi per competenza.',
          'Ambiente familiare privato con ruoli genitore.'
        ]
      },
      {
        title: 'Avvia timer per i figli',
        body:
          'Genitori e proprietari possono avviare un timer per un figlio. La sessione viene collegata al figlio, così il progresso resta visibile lì.',
        bullets: [
          'Scegli un figlio e una skill dall’ambiente famiglia.',
          'Avvia il tempo di pratica quando serve un obiettivo chiaro.',
          'Collega minuti di concentrazione a XP e progresso.',
          'I figli vedono i timer avviati dai genitori.'
        ]
      },
      {
        title: 'Lavorate insieme verso obiettivi',
        body:
          'Family supporta obiettivi settimanali e complimenti, così la guida non diventa solo controllo.',
        bullets: [
          'Imposta obiettivi in minuti o sessioni.',
          'Invia complimenti per impegno e crescita.',
          'Dai alla famiglia un prossimo passo chiaro.',
          'Family costa EUR 6.99 al mese o EUR 69.99 all’anno.'
        ]
      }
    ],
    seoTerms: [
      'app produttivita famiglia',
      'app per genitori',
      'timer bambini',
      'timer apprendimento bambini',
      'app genitori figli'
    ],
    faq: [
      {
        question: 'I genitori possono avviare timer per i figli?',
        answer:
          'Sì. Con Family, genitori e proprietari possono avviare timer per i figli dentro l’ambiente famiglia.'
      },
      {
        question: 'Posso vedere i progressi di mio figlio?',
        answer:
          'Sì. Family include statistiche dei figli con sessioni, minuti, XP, suddivisione per skill e attività recente.'
      },
      {
        question: 'Family è incluso in Premium?',
        answer:
          'No. Family è un abbonamento familiare separato con Premium più ruoli genitore, statistiche dei figli, timer per figli, obiettivi e complimenti.'
      },
      {
        question: 'SkillQuest è pensato per bambini piccoli?',
        answer:
          'SkillQuest usa un quadro privacy 13+. Per questo il marketing sui bambini deve essere formulato con attenzione.'
      }
    ]
  },
  'skill-tracker': {
    ...pages.en['skill-tracker'],
    title: 'Monitora competenze, non solo attività',
    metaTitle: 'App Skill Tracker | XP, livelli e progresso | SkillQuest',
    metaDescription:
      'SkillQuest è uno Skill Tracker per studio, sport, musica, lettura, codice, lavoro creativo e routine. Avvia timer e monitora XP, livelli e progresso.',
    summary:
      'SkillQuest ti aiuta a sviluppare competenze collegando tempo reale di pratica a progresso, XP, livelli e statistiche.',
    cardSummary:
      'Monitora competenze, XP, livelli, serie e tempo di concentrazione in un’app mobile.',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Vedi Focus Timer',
    sections: [
      {
        title: 'Parti dalla competenza, non da un’attività generica',
        body:
          'SkillQuest orienta ogni sessione verso una competenza, così lavoro, apprendimento e hobby diventano sviluppo visibile.',
        bullets: [
          'Usa skill iniziali o crea skill personali.',
          'Monitora studio, sport, musica, lettura, codice e lavoro creativo.',
          'Combina timer con XP, livelli e serie.',
          'Vedi quali competenze ricevono davvero attenzione.'
        ]
      },
      {
        title: 'Gamification per praticare con costanza',
        body:
          'XP, livelli e serie rendono il progresso concreto, senza promettere risultati garantiti.',
        bullets: [
          'XP dopo le sessioni completate.',
          'Livelli come traguardi visibili.',
          'Serie per routine ricorrenti.',
          'Classifiche e sfide per motivazione extra.'
        ]
      },
      {
        title: 'Inizia gratis, passa a un piano superiore quando serve',
        body:
          'Guest Mode e le funzioni Free aiutano a iniziare. Premium e Family aggiungono più profondità quando SkillQuest entra nella tua routine.',
        bullets: [
          'Guest Mode per iniziare rapidamente.',
          'Premium per più libertà timer e statistiche.',
          'Family per struttura genitore-figlio.',
          'Sincronizzazione attenta alla privacy per gli account.'
        ]
      }
    ],
    seoTerms: [
      'app skill tracker',
      'alternativa habit tracker',
      'app produttivita xp',
      'tracker progresso competenze',
      'practice tracker'
    ],
    faq: [
      {
        question: 'Quali competenze posso monitorare?',
        answer:
          'SkillQuest può essere usato per studio, lavoro, fitness, musica, lettura, programmazione, progetti creativi e routine personali.'
      },
      {
        question: 'Posso creare skill personali?',
        answer:
          'Sì. SkillQuest supporta skill personalizzate, così l’app si adatta alla tua routine reale.'
      },
      {
        question: 'SkillQuest è un habit tracker?',
        answer:
          'SkillQuest si sovrappone in parte agli habit tracker, ma si concentra di più su competenze, tempo di concentrazione, XP, livelli e progresso misurabile.'
      }
    ]
  },
  'progress-statistics': {
    ...pages.en['progress-statistics'],
    title: 'Vedi progressi in statistiche, XP e storico delle skill',
    metaTitle: 'Statistiche di progresso | Skill Tracking e XP | SkillQuest',
    metaDescription:
      'Visualizza statistiche SkillQuest per giorno, settimana, mese e anno. Monitora XP, sessioni, minuti, suddivisioni per skill e statistiche dei figli con Family.',
    summary:
      'SkillQuest rende misurabile il tempo di pratica con statistiche, suddivisioni per skill, XP, storico sessioni e progresso per periodo.',
    cardSummary:
      'Statistiche per minuti di concentrazione, sessioni, XP, skill e progresso dei figli con Family.',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Confronta Premium',
    sections: [
      {
        title: 'Capisci dove va il tuo tempo',
        body:
          'Le statistiche aiutano a vedere schemi nel tempo di pratica e nel focus per skill, senza presentarli come risultati garantiti.',
        bullets: [
          'Vedi sessioni e minuti per periodo.',
          'Confronta skill e attività.',
          'Usa XP e livelli come segnali di progresso.',
          'Controlla sessioni recenti e storico.'
        ]
      },
      {
        title: 'Insight più profondi con Premium',
        body:
          'Premium è pensato per utenti che vogliono andare oltre le statistiche di base.',
        bullets: [
          'Statistiche e trend ampliati.',
          'Più storico per routine a lungo termine.',
          'Migliore visibilità sulle suddivisioni per skill.',
          'L’export dati è indicato come funzione Premium nei modelli prodotto e va confermato visibilmente prima di claim importanti.'
        ]
      },
      {
        title: 'Rendi visibile il progresso dei figli con Family',
        body:
          'Con Family, i genitori possono rivedere i progressi dei figli e rendere più semplice parlare del tempo di pratica.',
        bullets: [
          'Statistiche dei figli con sessioni, minuti e XP.',
          'Attività timer per vedere quando inizia la pratica.',
          'Obiettivi e complimenti rendono la guida più concreta.',
          'Family è un abbonamento separato per famiglie.'
        ]
      }
    ],
    seoTerms: [
      'statistiche produttivita',
      'app statistiche skill',
      'statistiche time tracking',
      'tracker progresso xp',
      'app progresso famiglia'
    ],
    faq: [
      {
        question: 'Quali statistiche mostra SkillQuest?',
        answer:
          'SkillQuest mostra sessioni, minuti, XP, progresso per skill e attività su diversi periodi.'
      },
      {
        question: 'Posso vedere trend a lungo termine?',
        answer:
          'Premium include statistiche ampliate e più storico. Controlla l’app per l’insieme attuale delle funzioni visibili.'
      },
      {
        question: 'I genitori possono vedere le statistiche dei figli?',
        answer:
          'Sì. Family include statistiche dei figli per genitori e proprietari dentro l’ambiente famiglia.'
      }
    ]
  },
  'pomodoro-timer': {
    slug: 'pomodoro-timer',
    eyebrow: 'Timer Pomodoro',
    title: 'Un timer Pomodoro pensato su misura per le tue capacità',
    metaTitle: 'App Pomodoro Timer | Sessioni di studio e concentrazione | SkillQuest',
    metaDescription:
      'Usa SkillQuest come timer Pomodoro gratuito per studiare e lavorare con concentrazione. Ogni sprint di 25 minuti ti fa guadagnare XP, salire di livello e migliorare le tue abilità.',
    summary:
      'Il classico ritmo Pomodoro 25/5, integrato in SkillQuest in modo che ogni sprint ti faccia guadagnare XP, livelli e progressi per l\'abilità che stai esercitando.',
    cardSummary:
      'Il classico ritmo di progressione 25/5, legato all\'XP, ai livelli e al progresso delle abilità.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Confronta le tecniche di timer',
    sections: [
      {
        title: 'La tecnica del Pomodoro, senza un\'app dedicata',
        body:
          'Il metodo Pomodoro suddivide il lavoro in brevi sessioni concentrate, intervallate da pause regolari. SkillQuest integra questa tecnica tra le varie opzioni di timer disponibili, quindi non hai bisogno di un’app Pomodoro separata oltre al tuo tracker.',
        bullets: [
          'Sprint di concentrazione da 25 minuti con pause integrate.',
          'Disponibile nel piano gratuito, non serve alcun abbonamento.',
          'È utile per lo studio, le attività lavorative, la lettura o qualsiasi altra abilità che vuoi monitorare.',
        ]
      },
      {
        title: 'Ogni sprint conta ai fini dell\'acquisizione di un\'abilità',
        body:
          'Un timer Pomodoro da solo misura solo il tempo. SkillQuest collega ogni sprint all’abilità che hai scelto, così la concentrazione si trasforma in un progresso tangibile.',
        bullets: [
          'Guadagna XP dopo ogni sessione Pomodoro completata.',
          'Guarda le sessioni raggruppate per abilità nelle tue statistiche.',
          'Tieni traccia delle serie consecutive per mantenere costanti le tue abitudini con il metodo Pomodoro.',
        ]
      },
      {
        title: 'Oltre il Pomodoro, quando ti serve qualcosa in più',
        body:
          'Alcune attività richiedono sessioni di concentrazione più lunghe o più flessibili rispetto ai 25 minuti. SkillQuest include altre tecniche a cui puoi passare senza uscire dall\'app.',
        bullets: [
          '"Deep Work" e "52-17" per le sessioni più lunghe.',
          '"Flowtime" e "Until Time" per durate flessibili.',
          'Con l\'abbonamento Premium sblocchi tutte le tecniche relative al timer.',
        ]
      },
    ],
    seoTerms: [
      'app con timer Pomodoro',
      'timer del pomodoro per studiare',
      'Timer da 25 minuti',
      'app per lo studio con il metodo Pomodoro',
      'timer Pomodoro gratuito',
    ],
    faq: [
      {
        question: 'Il timer Pomodoro è gratuito su SkillQuest?',
        answer:
          'Sì. Pomodoro è disponibile nel piano gratuito, insieme agli XP, ai livelli e alle statistiche di base.'
      },
      {
        question: 'Posso usare il metodo Pomodoro per studiare?',
        answer:
          'Sì. Molti utenti tengono traccia delle sessioni di studio con Pomodoro, associando ogni sprint a una competenza legata allo studio.'
      },
      {
        question: 'Cosa succede quando finisce una sessione del Pomodoro?',
        answer:
          'La sessione viene aggiunta alle statistiche delle tue abilità e ti fa guadagnare XP, così il tempo che dedichi alla concentrazione si trasforma in progressi tangibili.'
      },
    ]
  },
  streaks: {
    slug: 'streaks',
    eyebrow: 'Serie',
    title: 'Trasforma la costanza in una serie di successi che puoi vedere con i tuoi occhi',
    metaTitle: 'App Streak Tracker con XP | Crea abitudini quotidiane | SkillQuest',
    metaDescription:
      'SkillQuest tiene traccia della serie giornaliera di ogni abilità che ti alleni, con XP, livelli e la possibilità di mettere in pausa la serie, così un giorno saltato non cancella i tuoi progressi.',
    summary:
      'Una serie giornaliera tiene traccia della tua costanza nel partecipare, con l\'aggiunta di XP e livelli, così la costanza ti sembra un vero progresso, non solo un numero.',
    cardSummary:
      'Serie giornaliere con XP e blocchi delle serie, così la costanza rimane ben visibile.',
    screenshot: '03-session-reward.png',
    primaryCta: 'Inizia la tua serie di vittorie consecutive',
    secondaryCta: 'Scopri come funziona XP',
    sections: [
      {
        title: 'Serie che ti premiano solo per aver partecipato',
        body:
          'Ogni giorno che completi una sessione di concentrazione, la tua serie continua cresce. È un segnale semplice e visibile che trasforma la domanda “Mi sono allenato oggi?” in un conteggio progressivo.',
        bullets: [
          'Guadagna 10 XP per ogni giornata attiva, oltre agli XP della sessione.',
          'Le serie consecutive valgono per tutte le abilità che monitori.',
          'Scopri subito la tua serie attuale e quella più lunga.',
        ]
      },
      {
        title: 'I blocchi della serie proteggono da un errore occasionale',
        body:
          'A volte la vita ti mette i bastoni tra le ruote. Grazie alla funzione “Streak Freeze”, un giorno saltato non significa per forza dover ricominciare da capo dopo settimane di costanza.',
        bullets: [
          'Proteggi la tua serie di giorni consecutivi da qualche giorno saltato ogni tanto.',
          'Mantieni la motivazione a lungo termine senza quella sensazione di “tutto o niente”.',
          'Le serie di giorni consecutivi (7, 30, 100+ giorni) possono far apparire dei post di attività che puoi condividere.',
        ]
      },
      {
        title: 'Le serie di vittorie non sono solo una questione di numeri',
        body:
          'In SkillQuest, la costanza non si limita solo a un contatore: i temi e le ricompense sono legati ai tuoi progressi.',
        bullets: [
          'Sblocca i temi continuando a progredire.',
          'Combina le serie consecutive con i XP (XP) e i livelli per avere un quadro più completo.',
          'Usa i traguardi della serie di giorni consecutivi come punti di controllo naturali.',
        ]
      },
    ],
    seoTerms: [
      'app per tenere traccia della serie di giorni consecutivi',
      'app per monitorare le abitudini con le serie consecutive',
      'app per la serie di giorni consecutivi',
      'xp tracker delle abitudini',
      'app per monitorare le abitudini con elementi di gioco',
    ],
    faq: [
      {
        question: 'Come funziona il sistema delle serie in SkillQuest?',
        answer:
          'Se completi una sessione di concentrazione in un determinato giorno, mantieni viva la tua serie e guadagni 10 XP per quel giorno attivo, oltre agli XP della sessione.'
      },
      {
        question: 'Cosa succede se salto un giorno?',
        answer:
          'I "freeze" della serie possono proteggere la tua serie da un giorno saltato ogni tanto, così un solo giorno di pausa non cancella i tuoi progressi.'
      },
      {
        question: 'Il monitoraggio della serie di giorni consecutivi è gratuito?',
        answer:
          'Sì. Le serie giornaliere, l\'XP e i livelli fanno parte del piano gratuito.'
      },
    ]
  },
  'friends-challenges': {
    slug: 'friends-challenges',
    eyebrow: 'Amici e sfide',
    title: 'Rendi il progresso un po’ più social',
    metaTitle: 'App "Friends & Challenges" | Responsabilità per concentrazione e competenze | SkillQuest',
    metaDescription:
      'Aggiungi amici, partecipa alle sfide XP Race e Active Days e condividi i tuoi progressi come preferisci grazie alle funzionalità social e alle impostazioni sulla privacy di SkillQuest.',
    summary:
      'Aggiungi amici, lancia delle sfide e trova qualcuno che ti sproni quando ne hai voglia, con impostazioni sulla privacy che ti permettono di condividere solo come vuoi tu.',
    cardSummary:
      'Amici, sfide e un feed delle attività, con impostazioni sulla privacy che decidi tu.',
    screenshot: '06-social-family.png',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Visualizza le classifiche',
    sections: [
      {
        title: 'Aggiungi degli amici per sentirti davvero responsabile',
        body:
          'Se segui i tuoi progressi da solo, è facile non farci caso. Aggiungere amici su SkillQuest ti dà quel senso di responsabilità che ti danno le persone che conosci davvero.',
        bullets: [
          'Invia e accetta richieste di amicizia direttamente dall\'app.',
          'Visualizza le statistiche dei tuoi amici quando entrambe le parti lo consentono.',
          'Un pulsante per la privacy ti permette di gestire la condivisione come vuoi.',
        ]
      },
      {
        title: 'Sfide che contribuiscono al raggiungimento di un obiettivo comune',
        body:
          'Le sfide trasformano l\'allenamento individuale in uno sforzo collettivo, che si tratti di una XP Race o di una Active Days Battle.',
        bullets: [
          'Avvia una gara XP o una battaglia "Active Days" con gli amici.',
          'Segui i progressi della sfida e le attività recenti insieme ai tuoi amici.',
          'Scopri chi è in testa senza perdere di vista i tuoi progressi.',
        ]
      },
      {
        title: 'Un feed delle attività che celebra i traguardi raggiunti',
        body:
          'Le serie consecutive e altri traguardi possono apparire come post di attività, così i tuoi progressi si notano senza diventare un feed pubblico.',
        bullets: [
          'Post automatici per traguardi come 7, 30 o 100 giorni di attività.',
          'La pubblicazione attenta alla privacy rispetta le tue impostazioni.',
          'Pensato per gli amici e i contatti approvati, non per una bacheca pubblica.',
        ]
      },
    ],
    seoTerms: [
      'app con sfide tra amici',
      'app per la responsabilità',
      'sfide di abilità',
      'app per la produttività con classifica',
      'app per monitorare le abitudini sociali',
    ],
    faq: [
      {
        question: 'Devo avere degli amici per usare SkillQuest?',
        answer:
          'No. Gli amici e le sfide sono funzioni social facoltative che si aggiungono al monitoraggio delle abilità di base.'
      },
      {
        question: 'Posso decidere cosa vedono i miei amici?',
        answer:
          'Sì. C\'è un\'opzione di privacy che ti permette di decidere se i tuoi amici possono vedere le tue statistiche e la tua attività.'
      },
      {
        question: 'Che tipo di sfide posso lanciare?',
        answer:
          'SkillQuest supporta tipi di sfide come la "Gara XP" e la "Battaglia dei giorni attivi", con monitoraggio condiviso dei progressi.'
      },
    ]
  },
  'study-timer': {
    slug: 'study-timer',
    eyebrow: 'Timer per lo studio',
    title: 'Un timer per lo studio che non si limita a tenere d’occhio l’orologio',
    metaTitle: 'App Study Timer | Tieni traccia delle sessioni di studio per materia | SkillQuest',
    metaDescription:
      'Usa SkillQuest come timer per studiare in vista di esami, compiti e ripassi. Tieni traccia del tempo dedicato allo studio per ogni materia con XP, livelli e statistiche.',
    summary:
      'Trasforma le sessioni di studio in progressi tangibili per ogni materia, grazie a timer di concentrazione, XP e statistiche pensate per lo studio ripetuto, non solo per un singolo conto alla rovescia.',
    cardSummary:
      'Sessioni di studio registrate per materia, con XP, livelli e statistiche.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Inizia a studiare con SkillQuest',
    secondaryCta: 'Confronta i timer di messa a fuoco',
    sections: [
      {
        title: 'Tieni traccia del tempo dedicato allo studio per materia, non solo del totale',
        body:
          'Considera ogni materia o esame come una competenza a sé stante, così potrai vedere esattamente come si ripartisce il tempo dedicato allo studio, invece di avere solo un numero complessivo.',
        bullets: [
          'Crea una competenza per materia, corso o esame.',
          'Scegli tra Pomodoro, Deep Work o Flowtime a seconda dell\'attività.',
          'Visualizza la cronologia delle sessioni e i totali per materia.',
        ]
      },
      {
        title: 'Struttura integrata per i periodi d\'esame',
        body:
          'Studiare per gli esami spesso significa alternare brevi sessioni di ripasso a sessioni più lunghe e approfondite. SkillQuest supporta entrambe le modalità senza bisogno di configurazioni aggiuntive.',
        bullets: [
          'Brevi sessioni Pomodoro con le flashcard e un ripasso veloce.',
          'Sessioni più lunghe di “Deep Work” o “Flowtime” per gli esami di prova.',
          'Pause intelligenti adatte alla tecnica che scegli.',
        ]
      },
      {
        title: 'Motivazione a lungo termine',
        body:
          'È più facile mantenere le abitudini di studio quando i progressi sono visibili, non solo intuibili.',
        bullets: [
          'I punti XP e i livelli per materia ti permettono di tenere sotto controllo i tuoi progressi.',
          'Le serie giornaliere aiutano a mantenere abitudini di studio costanti.',
          'Le statistiche mostrano quali argomenti stanno riscuotendo attenzione e quali no.',
        ]
      },
    ],
    seoTerms: [
      'app con timer per lo studio',
      'app per tenere traccia dello studio',
      'timer per lo studio in vista degli esami',
      'timer per i compiti',
      'app per lo studio con il metodo Pomodoro',
    ],
    faq: [
      {
        question: 'Posso tenere traccia del tempo dedicato allo studio per ogni materia?',
        answer:
          'Sì. Crea un\'abilità per ogni materia o esame, e SkillQuest tiene traccia del tempo, dei XP e delle statistiche separatamente per ciascuna di esse.'
      },
      {
        question: 'Qual è il timer migliore per studiare?',
        answer:
          'Il metodo Pomodoro funziona bene per le sessioni di ripasso veloci, mentre il Deep Work o il Flowtime sono più adatti a sessioni più lunghe di studio o di simulazioni d’esame.'
      },
      {
        question: 'Lo Study Timer è gratuito?',
        answer:
          'Sì. Il monitoraggio delle competenze, il metodo Pomodoro, gli XP e i livelli sono disponibili anche nella versione gratuita.'
      },
    ]
  },
  'deep-work-flowtime': {
    slug: 'deep-work-flowtime',
    eyebrow: 'Deep Work & Flowtime',
    title: 'Blocchi di concentrazione più lunghi per i lavori che richiedono maggiore approfondimento',
    metaTitle: 'Timer per Deep Work & Flowtime | Sessioni di concentrazione Premium | SkillQuest',
    metaDescription:
      'Usa Deep Work, 52-17 e Flowtime su SkillQuest per sessioni di concentrazione più lunghe e senza interruzioni. Tecniche di timer Premium con durata personalizzabile.',
    summary:
      'Quando un’attività richiede uno sprint più lungo di 25 minuti, Deep Work, 52-17 e Flowtime ti offrono blocchi di concentrazione più lunghi e flessibili che continuano a contare ai fini degli XP e dei progressi.',
    cardSummary:
      'Deep Work, 52-17 e Flowtime per sessioni di concentrazione più lunghe e flessibili.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Confronta le tariffe Premium',
    secondaryCta: 'Visualizza tutte le tecniche relative al timer',
    sections: [
      {
        title: 'Deep Work per sessioni di concentrazione senza interruzioni',
        body:
          'Deep Work è pensato per sessioni prolungate dedicate a un’unica attività, per quel tipo di lavoro che perde valore se viene interrotto ogni 25 minuti.',
        bullets: [
          'Blocchi di concentrazione più lunghi rispetto al metodo Pomodoro, dedicati a un’unica attività.',
          'Conta ai fini degli XP, dei livelli e delle statistiche proprio come qualsiasi altra sessione.',
          'Fa parte delle tecniche di timer Premium.',
        ]
      },
      {
        title: '52-17 per un ritmo strutturato a focus lungo',
        body:
          '52 minuti di concentrazione seguiti da una pausa di 17 minuti: è un ritmo che si basa sui cicli naturali dell\'attenzione, utile per sessioni di lavoro o studio più lunghe.',
        bullets: [
          'Un rapporto fisso tra concentrazione e distensione, ispirato alla ricerca.',
          'Ideale per sessioni di lavoro o studio che durano diverse ore.',
          'Incluso nella versione Premium insieme ad altre tecniche di timer.',
        ]
      },
      {
        title: 'Flowtime per sessioni flessibili e personalizzate',
        body:
          'Flowtime non ti impone una durata fissa. Lavori finché non senti il bisogno naturale di fare una pausa, e la sessione viene comunque conteggiata.',
        bullets: [
          'Durata personalizzata, che decidi tu invece di seguire una tecnica fissa.',
          'Ideale per il lavoro creativo, la programmazione o le sessioni di scrittura.',
          'Le pause intelligenti variano in base a quanto tempo sei rimasto concentrato.',
        ]
      },
    ],
    seoTerms: [
      'timer per il lavoro approfondito',
      'timer del tempo di flusso',
      '52 17 timer di regola',
      'timer di messa a fuoco personalizzato',
      'app per sessioni di concentrazione prolungata',
    ],
    faq: [
      {
        question: 'Qual è la differenza tra "Deep Work" e "Flowtime"?',
        answer:
          'Il "Deep Work" è un blocco di concentrazione più lungo e con durata fissa, mentre il "Flowtime" ti permette di impostare una durata personalizzata e di lavorare al tuo ritmo.'
      },
      {
        question: 'Il metodo 52-17 è la stessa cosa del Pomodoro?',
        answer:
          'No. Il metodo 52-17 prevede periodi di concentrazione e pause più lunghi rispetto al classico ritmo Pomodoro 25/5.'
      },
      {
        question: 'Queste tecniche con il timer sono gratuite?',
        answer:
          'Deep Work, 52-17 e Flowtime fanno parte del pacchetto Premium, insieme alle durate personalizzate dei timer e alle statistiche più approfondite.'
      },
    ]
  },
  leaderboards: {
    slug: 'leaderboards',
    eyebrow: 'Classifiche',
    title: 'Scopri come stai andando rispetto agli altri, secondo i tuoi criteri',
    metaTitle: 'App con classifiche e graduatorie | Mettiti alla prova e migliora le tue abilità | SkillQuest',
    metaDescription:
      'Le classifiche di SkillQuest mettono a confronto i XP (XP) e i giorni di attività su base settimanale, mensile e complessiva, con leghe che vanno dal bronzo al diamante per motivarti sempre.',
    summary:
      'Le classifiche trasformano i punti XP e i giorni di attività in una classifica che puoi controllare settimanalmente, mensilmente o di tutti i tempi, con campionati che danno alla competizione un senso di progressione.',
    cardSummary:
      'Classifiche settimanali, mensili e di tutti i tempi con leghe che vanno dal bronzo al diamante.',
    screenshot: '05-rankings.png',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Aggiungi amici',
    sections: [
      {
        title: 'Classifiche relative a diversi periodi di tempo',
        body:
          'Una classifica unica di tutti i tempi può sembrare irraggiungibile se sei appena agli inizi. SkillQuest, invece, stilano classifiche su base settimanale, mensile e di tutti i tempi.',
        bullets: [
          'Le classifiche settimanali e mensili azzerano regolarmente la gara.',
          'Le classifiche di tutti i tempi premiano la costanza nel lungo periodo.',
          'Le classifiche si basano sui punti XP e sui giorni di attività.',
        ]
      },
      {
        title: 'Le leghe danno un senso di progressione',
        body:
          'I livelli, dal bronzo al diamante, trasformano la competizione in un percorso da affrontare, non in una classifica fissa e univoca.',
        bullets: [
          'Sali di livello nelle leghe man mano che rimani attivo.',
          'Gareggia contro persone del tuo stesso livello, non contro tutti insieme.',
          'Le leghe si affiancano agli amici e alle sfide per darti una motivazione in più.',
        ]
      },
      {
        title: 'Gareggia senza perdere i tuoi progressi',
        body:
          'Le classifiche vanno di pari passo con le tue statistiche personali, non le sostituiscono, quindi competere non significa perdere di vista la tua crescita personale.',
        bullets: [
          'L\'XP personale, i livelli e le serie consecutive rimangono visibili indipendentemente dal grado.',
          'Le classifiche vanno di pari passo con gli amici e le sfide.',
          'Utile per chi ama competere, facoltativo per tutti gli altri.',
        ]
      },
    ],
    seoTerms: [
      'app con classifica',
      'classifica delle abilità',
      'app per misurare la produttività',
      'Classifica XP',
      'app per monitorare le abitudini in chiave competitiva',
    ],
    faq: [
      {
        question: 'Come vengono calcolate le classifiche?',
        answer:
          'Le classifiche si basano sui punti XP e sui giorni di attività, riportati su base settimanale, mensile e complessiva.'
      },
      {
        question: 'Cosa sono i campionati?',
        answer:
          'Le leghe raggruppano gli utenti da bronzo a diamante, così ti trovi a competere contro persone di livello simile invece che contro tutti contemporaneamente.'
      },
      {
        question: 'Devo partecipare a una competizione per usare SkillQuest?',
        answer:
          'No. Le classifiche e i campionati sono facoltativi. Il monitoraggio delle abilità principali, l\'XP e i livelli funzionano allo stesso modo sia con che senza di essi.'
      },
    ]
  },
  themes: {
    slug: 'themes',
    eyebrow: 'Temi',
    title: 'Fai in modo che SkillQuest sembri proprio la tua app',
    metaTitle: 'Temi e personalizzazione dell\'app | Temi chiari, scuri e sbloccabili | SkillQuest',
    metaDescription:
      'SkillQuest supporta la modalità chiara, scura e quella di sistema, oltre a temi sbloccabili legati ai tuoi progressi, così l\'app avrà proprio l\'aspetto che desideri.',
    summary:
      'La modalità chiara, quella scura, la modalità di sistema e una serie di temi sbloccabili ti permettono di personalizzare l\'aspetto e l\'esperienza di SkillQuest proprio come vuoi tu, con alcuni temi legati ai tuoi progressi.',
    cardSummary:
      'Modalità chiara, scura e di sistema, oltre ai temi che sblocchi man mano che avanzi nel gioco.',
    screenshot: '07-themes-profile.png',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Scopri come funzionano le serie',
    sections: [
      {
        title: 'Modalità chiara, scura e di sistema',
        body:
          'SkillQuest si adatta automaticamente alle impostazioni del tuo dispositivo, ma puoi impostare la modalità chiara o scura quando vuoi.',
        bullets: [
          'La modalità di sistema si adatta automaticamente al tuo dispositivo.',
          'Puoi passare manualmente alla modalità chiara o scura in qualsiasi momento.',
          'Ogni tema è realizzato secondo gli standard di Material 3 per garantire un contrasto uniforme.',
        ]
      },
      {
        title: 'Temi da sbloccare, non solo da scegliere',
        body:
          'Alcuni temi sono legati ai tuoi progressi, quindi la personalizzazione diventa un’altra forma di crescita visibile, non solo un menu delle impostazioni.',
        bullets: [
          'Sblocca temi aggiuntivi continuando a progredire nel gioco.',
          'Gli sblocchi gratuiti si affiancano alle opzioni dei temi Premium.',
          'Lo sblocco dei temi è collegato allo stesso sistema di serie di vittorie consecutive e XP di tutte le altre funzionalità.',
        ]
      },
      {
        title: 'Una personalizzazione sempre coerente',
        body:
          'I temi cambiano il colore e l\'atmosfera, ma non la struttura dell\'app, quindi cambiare tema non significa mai dover reimparare dove si trovano le cose.',
        bullets: [
          'Layout uniforme in tutti i temi.',
          'I colori si adattano senza compromettere la leggibilità o il contrasto.',
          'Funziona allo stesso modo sia per il monitoraggio delle abilità, sia per i timer, sia per le statistiche.',
        ]
      },
    ],
    seoTerms: [
      'temi delle app',
      'app per le abitudini in modalità scura',
      'app di personalizzazione',
      'app con temi sbloccabili',
      'app con modalità chiara e scura',
    ],
    faq: [
      {
        question: 'SkillQuest supporta la modalità scura?',
        answer:
          'Sì. SkillQuest supporta la modalità chiara, la modalità scura e una modalità di sistema che si adatta alle impostazioni del tuo dispositivo.'
      },
      {
        question: 'Come faccio a sbloccare altri temi?',
        answer:
          'Alcuni temi si sbloccano man mano che vai avanti nel gioco, ad esempio con le serie di risultati positivi, oltre a quelli disponibili con l\'abbonamento Premium.'
      },
      {
        question: 'I temi cambiano il funzionamento dell\'app?',
        answer:
          'No. I temi cambiano solo l\'aspetto. Il monitoraggio delle abilità, i timer e le statistiche funzionano allo stesso modo con tutti i temi.'
      },
    ]
  },
  'guest-mode': {
    slug: 'guest-mode',
    eyebrow: 'Guest Mode',
    title: 'Prova SkillQuest prima di creare un account',
    metaTitle: 'Guest Mode | Prova SkillQuest senza account | SkillQuest',
    metaDescription:
      'La Guest Mode di SkillQuest ti permette di tenere traccia delle tue abilità, impostare timer di concentrazione e guadagnare XP in locale prima di creare un account, così puoi provarla senza rischi.',
    summary:
      'La Guest Mode ti permette di saltare la fase di registrazione. Tieni traccia delle tue abilità, imposta i timer di concentrazione e guadagna XP direttamente sul tuo dispositivo, poi crea un account quando sei pronto.',
    cardSummary:
      'Prova le funzioni di monitoraggio delle competenze fondamentali e i timer di concentrazione in locale, prima di creare un account.',
    screenshot: '01-home-progress.png',
    primaryCta: 'Inizia come ospite',
    secondaryCta: 'Confronta i piani Free, Premium e Family',
    sections: [
      {
        title: 'Non serve un account per iniziare',
        body:
          'La Guest Mode ti permette di aprire SkillQuest e iniziare subito a monitorare una competenza, senza dover prima registrarti.',
        bullets: [
          'Il monitoraggio delle abilità principali, i timer di concentrazione, l\'XP e i livelli funzionano in Guest Mode.',
          'I progressi vengono salvati localmente sul tuo dispositivo.',
          'Non serve né un indirizzo email né un account per provare l\'app.',
        ]
      },
      {
        title: 'Crea un account quando ti sembra opportuno',
        body:
          'La Guest Mode è un punto di partenza, non un vicolo cieco. Quando sarai pronto per la sincronizzazione, gli amici o le classifiche, creando un account potrai portare avanti i tuoi progressi locali.',
        bullets: [
          'Passa a un account completo senza perdere i tuoi progressi locali.',
          'Sblocca la sincronizzazione tra dispositivi, amici e classifiche.',
          'Non c\'è alcuna fretta di decidere prima di aver provato l\'app.',
        ]
      },
      {
        title: 'Cosa rimane limitato nella Guest Mode',
        body:
          'Alcune funzioni sono per loro natura legate all\'account, dato che coinvolgono altre persone o la sincronizzazione tra dispositivi.',
        bullets: [
          'Per gli amici, le sfide e le classifiche serve un account.',
          'Per usare le funzioni Family servono un account e un gruppo Family.',
          'I progressi salvati solo in locale non vengono sottoposti a backup finché non crei un account.',
        ]
      },
    ],
    seoTerms: [
      'Prova l\'app senza account',
      'tracker delle abitudini senza registrazione',
      'app in Guest Mode',
      'Skill Tracker senza account',
      'app per le abitudini con prova gratuita',
    ],
    faq: [
      {
        question: 'Devo avere un account per usare SkillQuest?',
        answer:
          'No. La Guest Mode ti permette di usare le funzioni principali di monitoraggio delle abilità e i timer di concentrazione senza creare un account.'
      },
      {
        question: 'Cosa succede ai miei progressi se creo un account più avanti?',
        answer:
          'Se passi dalla Guest Mode, i tuoi progressi locali verranno trasferiti nel tuo nuovo account.'
      },
      {
        question: 'Cosa non posso fare in Guest Mode?',
        answer:
          'Le funzioni "Amici", "Sfide", "Classifiche" e "Family" richiedono un account, poiché prevedono la sincronizzazione con altre persone.'
      },
    ]
  },
};

export function getFeatureLandingOverview(locale: Locale): FeatureOverviewCopy {
  return featureOverviewCopy[locale] ?? featureOverviewCopy.en;
}

export function getFeatureLandingPages(locale: Locale): FeatureLandingPage[] {
  const localizedPages = pages[locale] ?? pages.en;
  return featureLandingSlugs.map((slug) => localizedPages[slug]);
}

export function getFeatureLandingPage(
  locale: Locale,
  slug: string
): FeatureLandingPage | null {
  if (!featureLandingSlugs.includes(slug as FeatureLandingSlug)) {
    return null;
  }

  const localizedPages = pages[locale] ?? pages.en;
  return localizedPages[slug as FeatureLandingSlug] ?? pages.en[slug as FeatureLandingSlug];
}
