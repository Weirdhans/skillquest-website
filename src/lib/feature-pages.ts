import {routing} from '@/i18n/routing';
import type {Locale, ScreenshotName} from '@/lib/marketing';

// Guides that exist in every locale.
export const translatedFeatureLandingSlugs = [
  'focus-timer',
  'family',
  'skill-tracker',
  'progress-statistics',
  'pomodoro-timer',
  'active-days',
  'friends-challenges',
  'study-timer',
  'deep-work-flowtime',
  'themes',
  'guest-mode'
] as const;

// Guides written for English searches only (decision of 25 November 2026).
// They exist in no other locale: no page (404), no static params, no sitemap
// entry, no place in the guides list and no hreflang link to another language.
// Translate them only once Search Console shows the English pages get
// impressions; a translated guide moves to translatedFeatureLandingSlugs.
export const englishOnlyFeatureLandingSlugs = [
  'reading-timer',
  'homework-timer'
] as const;

const englishOnlyLocales: readonly Locale[] = ['en'];

export type TranslatedFeatureLandingSlug = (typeof translatedFeatureLandingSlugs)[number];
export type EnglishOnlyFeatureLandingSlug = (typeof englishOnlyFeatureLandingSlugs)[number];
export type FeatureLandingSlug = TranslatedFeatureLandingSlug | EnglishOnlyFeatureLandingSlug;

export const featureLandingSlugs: readonly FeatureLandingSlug[] = [
  ...translatedFeatureLandingSlugs,
  ...englishOnlyFeatureLandingSlugs
];

function isTranslatedSlug(slug: string): slug is TranslatedFeatureLandingSlug {
  return translatedFeatureLandingSlugs.some((item) => item === slug);
}

function isEnglishOnlySlug(slug: string): slug is EnglishOnlyFeatureLandingSlug {
  return englishOnlyFeatureLandingSlugs.some((item) => item === slug);
}

// The 4 flagship pages shown in the featured grid on the homepage and
// /features. The rest are still fully built, indexed, and linked, just
// surfaced through the lighter /guides list instead of a big card grid.
export const featuredFeatureLandingSlugs = [
  'focus-timer',
  'family',
  'skill-tracker',
  'progress-statistics'
] as const satisfies readonly TranslatedFeatureLandingSlug[];

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
  guidesCta: string;
};

const featureOverviewCopy: Record<Locale, FeatureOverviewCopy> = {
  nl: {
    eyebrow: 'Functies per behoefte',
    title: 'Ontdek hoe SkillQuest helpt in echte routines',
    body:
      'Van focus timers tot Family-tools: deze pagina’s leggen uit wat SkillQuest doet, voor wie het werkt en welke voortgang zichtbaar wordt.',
    cta: 'Bekijk functie',
    guidesCta: 'Bekijk alle guides'
  },
  en: {
    eyebrow: 'Features by use case',
    title: 'Explore how SkillQuest helps in real routines',
    body:
      'From focus timers to Family tools, these pages explain what SkillQuest does, who it helps, and which progress becomes visible.',
    cta: 'View feature',
    guidesCta: 'Browse all guides'
  },
  de: {
    eyebrow: 'Funktionen nach Bedarf',
    title: 'So hilft SkillQuest in echten Routinen',
    body:
      'Von Fokus-Timern bis zu Family-Tools: Diese Seiten zeigen, was SkillQuest kann, wem es hilft und welcher Fortschritt sichtbar wird.',
    cta: 'Funktion ansehen',
    guidesCta: 'Alle Guides ansehen'
  },
  fr: {
    eyebrow: 'Fonctions par usage',
    title: 'Découvre comment SkillQuest t’aide au quotidien',
    body:
      'Des minuteurs de concentration aux outils Family, ces pages expliquent ce que fait SkillQuest, à qui elle s’adresse et quels progrès deviennent visibles.',
    cta: 'Voir la fonction',
    guidesCta: 'Voir tous les guides'
  },
  es: {
    eyebrow: 'Funciones por necesidad',
    title: 'Descubre cómo SkillQuest ayuda en rutinas reales',
    body:
      'Desde temporizadores de enfoque hasta herramientas Family, estas páginas explican qué hace SkillQuest, a quién ayuda y qué progreso se vuelve visible.',
    cta: 'Ver función',
    guidesCta: 'Ver todas las guías'
  },
  it: {
    eyebrow: 'Funzioni per ogni esigenza',
    title: 'Scopri come SkillQuest ti aiuta ogni giorno',
    body:
      'Dai timer di concentrazione agli strumenti Family, queste pagine spiegano cosa fa SkillQuest, a chi serve e quali progressi diventano visibili.',
    cta: 'Scopri la funzione',
    guidesCta: 'Vedi tutte le guide'
  }
};

// Written for parents who search for an app. Every product claim here is also
// made on the English /parents page, the family, focus-timer, guest-mode,
// skill-tracker or progress-statistics guides, or /pricing. The copy speaks to
// parents ("your child") and never says "for kids" or "for children": the app
// is not presented as a service directed to children.
const englishOnlyPages: Record<EnglishOnlyFeatureLandingSlug, FeatureLandingPage> = {
  'reading-timer': {
    slug: 'reading-timer',
    eyebrow: 'Reading Timer',
    title: 'A reading timer that shows your child’s progress',
    metaTitle: 'Reading Timer for Daily Reading Practice | SkillQuest',
    metaDescription:
      'A reading timer app for parents: set 10 minutes, let your child read, and watch the minutes add up as XP and levels. Free to use, no account needed.',
    summary:
      'Set a countdown for your child’s daily reading, 10 minutes or whatever the school asks for. Every minute of reading earns XP for the Reading skill, so your child can see the reading add up.',
    cardSummary:
      'A countdown for daily reading, with XP, levels, and progress your child can see.',
    screenshot: '01-home-progress.png',
    primaryCta: 'Download SkillQuest',
    secondaryCta: 'SkillQuest for parents',
    sections: [
      {
        title: 'A countdown for daily reading',
        body:
          'Choose Reading as the skill, start the timer, and let your child read. SkillQuest started this way: the maker’s son had to read for 10 minutes a day for school, and keeping track with a timer worked better than expected.',
        bullets: [
          'The timer counts down and is set to 10 minutes by default.',
          'Change the length to match what the school or teacher asks for.',
          'The timer keeps running while your child reads; no one needs to watch the screen.'
        ]
      },
      {
        title: 'Reading time turns into visible progress',
        body:
          'Every minute of reading earns 1 XP for the Reading skill. Over the weeks, those minutes become levels and statistics your child can look back on.',
        bullets: [
          'XP and levels for the Reading skill.',
          'Statistics by day, week, month, and year.',
          'Active days show how many days your child read.',
          'The app rewards practice, not performance.'
        ]
      },
      {
        title: 'Start free, add Family when you want it',
        body:
          'You can start without an account and without paying. The Family plan is for parents who want to follow their child’s reading from their own phone.',
        bullets: [
          'Guest Mode: no account or email needed to try it.',
          'Free to install, with no ads.',
          'With Family, you can start the timer on your own phone, and the minutes count toward your child’s progress.',
          'Family is EUR 6.99/month or EUR 69.99/year.'
        ]
      }
    ],
    faq: [
      {
        question: 'How long should a child read each day?',
        answer:
          'There is no set rule. Ask what your child’s school recommends. The SkillQuest timer is set to 10 minutes by default, and you can change it to match. A little reading every day is usually easier to keep up than a long session now and then.'
      },
      {
        question: 'Does the reading timer work without an account?',
        answer:
          'Yes. With Guest Mode, your child can use the timer, earn XP, and see progress without an account. Progress is stored on the device, and it carries over if you create an account later. Family features need an account.'
      },
      {
        question: 'Does my child need their own phone?',
        answer:
          'No. SkillQuest runs on iPhone, iPad, and Android, so your child can use a device you already have at home. If your child is still young, the Family plan lets you start the timer on your own phone, and the reading time counts toward your child’s progress.'
      },
      {
        question: 'Isn’t a reading app just more screen time?',
        answer:
          'The timer keeps running while your child reads; no one needs to look at the screen. The screen is only used to start the timer and view the progress afterward.'
      },
      {
        question: 'What does SkillQuest cost?',
        answer:
          'Installing and using SkillQuest is free, and there are no ads. The Family plan, which lets a parent start timers for a child and see their statistics, is EUR 6.99/month or EUR 69.99/year.'
      }
    ]
  },
  'homework-timer': {
    slug: 'homework-timer',
    eyebrow: 'Homework Timer',
    title: 'A homework timer that gives homework time a clear start and end',
    metaTitle: 'Homework Timer App for Families | SkillQuest',
    metaDescription:
      'A homework timer app for parents: set a timer for homework time, let it count down, and see the minutes add up as XP and progress. Free, no account needed.',
    summary:
      'Give homework time a fixed length. Start a countdown, let your child work, and see the minutes add up afterward. SkillQuest is a timer with progress, not a homework planner.',
    cardSummary:
      'A countdown for homework time, with the minutes adding up to XP and progress.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Download SkillQuest',
    secondaryCta: 'SkillQuest for parents',
    sections: [
      {
        title: 'A clear block of homework time',
        body:
          'Choose the homework skill and start the timer. It counts down from the length you set and keeps running while your child works; no one needs to watch the screen.',
        bullets: [
          'The timer is set to 10 minutes by default.',
          'Set a longer or shorter time to suit the task.',
          'The screen is only for starting the timer and checking progress afterward.'
        ]
      },
      {
        title: 'See the time add up',
        body:
          'Every minute earns 1 XP for the skill, so the effort counts, not the grade. Over the weeks, you and your child can see how much time went into homework.',
        bullets: [
          'XP and levels per skill.',
          'Statistics by day, week, month, and year.',
          'Active days show how many days your child put in the time.',
          'Reading or an instrument can be tracked as separate skills.'
        ]
      },
      {
        title: 'Start free, add Family when you want it',
        body:
          'You can start without an account and without paying. The Family plan is for parents who want to start the timer and follow progress from their own phone.',
        bullets: [
          'Guest Mode: no account or email needed to try it.',
          'Free to install, with no ads.',
          'With Family, you can start the timer on your own phone and see your child’s statistics.',
          'Family is EUR 6.99/month or EUR 69.99/year.'
        ]
      }
    ],
    faq: [
      {
        question: 'How long should my child spend on homework each day?',
        answer:
          'That depends on age, school, and class. Ask the school what it expects. In SkillQuest you then set the timer to that length; the default is 10 minutes.'
      },
      {
        question: 'Can SkillQuest keep track of homework assignments?',
        answer:
          'No. SkillQuest is a timer with progress, made for daily practice such as reading or an instrument. It does not list assignments or deadlines. For homework, use it to time the work and see the minutes add up.'
      },
      {
        question: 'Does the homework timer work without an account?',
        answer:
          'Yes. With Guest Mode, your child can use the timer, earn XP, and see progress without an account. Progress is stored on the device, and it carries over if you create an account later. Family features need an account.'
      },
      {
        question: 'Does my child need their own phone?',
        answer:
          'No. SkillQuest runs on iPhone, iPad, and Android, so your child can use a device you already have at home. If your child is still young, the Family plan lets you start the timer on your own phone, and the time counts toward your child’s progress.'
      },
      {
        question: 'What does SkillQuest cost?',
        answer:
          'Installing and using SkillQuest is free, and there are no ads. The Family plan, which lets a parent start timers for a child and see their statistics, is EUR 6.99/month or EUR 69.99/year.'
      }
    ]
  }
};

const pages: Record<Locale, Record<TranslatedFeatureLandingSlug, FeatureLandingPage>> = {
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
            'SkillQuest is bedoeld voor gebruikers van 13 jaar en ouder, ook binnen Family.'
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
            'Elke sessie kan XP, levels, actieve dagen en statistieken voeden. Daardoor zie je niet alleen wat je wilt doen, maar wat je echt hebt gedaan.',
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
            'Maak later een account voor sync, vrienden en challenges.',
            'Je voortgang wordt lokaal op je apparaat opgeslagen.'
          ]
        }
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
            'Meer sessiehistorie voor lange termijn inzicht.'
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
            'Verzamel actieve dagen als je regelmatig oefent.'
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
    'active-days': {
      slug: 'active-days',
      eyebrow: 'Actieve dagen',
      title: 'Actieve dagen: zie hoe regelmatig je oefent',
      metaTitle: 'Actieve dagen | Zie hoe vaak je oefent | SkillQuest',
      metaDescription:
        'SkillQuest telt actieve dagen: elke dag waarop je minstens 10 minuten oefent. Een gemiste dag kost niets, en je totaal gaat nooit terug naar nul.',
      summary:
        'Een dag telt als actieve dag zodra je die dag in totaal minstens 10 minuten oefent. Je totaal gaat alleen omhoog, dus een gemiste dag kost je niets en regelmatig oefenen blijft zichtbaar.',
      cardSummary:
        'Dagen met minstens 10 minuten oefenen tellen op tot een totaal dat nooit terug naar nul gaat.',
      screenshot: '04-statistics.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'Bekijk focus timers',
      sections: [
        {
          title: 'Wat telt als actieve dag',
          body:
            'Oefen op een dag in totaal minstens 10 minuten, met elke timer en elke skill, en die dag telt als actieve dag.',
          bullets: [
            'Elke volle minuut oefenen levert 1 XP op, dus 10 minuten is 10 XP.',
            'Kortere sessies op dezelfde dag tellen bij elkaar op.',
            'Elke dag telt één keer, hoe lang je ook oefent.'
          ]
        },
        {
          title: 'Een gemiste dag kost niets',
          body:
            'Actieve dagen hoeven niet op elkaar te volgen. Sla je een dag over, dan blijft je totaal precies staan waar het stond.',
          bullets: [
            'Je totaal gaat alleen omhoog en wordt nooit teruggezet.',
            'Er valt niets te beschermen en niets te verliezen.',
            'Pak het weer op wanneer het jou uitkomt.'
          ]
        },
        {
          title: 'Mijlpalen die regelmatig oefenen laten zien',
          body:
            'Over weken en maanden laten actieve dagen zien hoe vaak je echt hebt geoefend, niet alleen hoe lang.',
          bullets: [
            'Mijlpalen bij 7, 30 en 100 actieve dagen, en verder.',
            'Sommige thema’s ontgrendel je bij een bepaald aantal actieve dagen.',
            'Daag vrienden uit voor een Strijd om actieve dagen.'
          ]
        }
      ],
      faq: [
        {
          question: 'Wat is een actieve dag in SkillQuest?',
          answer:
            'Een dag waarop je in totaal minstens 10 minuten met een timer oefent. Elke dag telt één keer mee voor je totaal.'
        },
        {
          question: 'Wat gebeurt er als ik een dag mis?',
          answer:
            'Niets. Een gemiste dag haalt niets weg: je totaal blijft gelijk en wordt nooit teruggezet.'
        },
        {
          question: 'Zijn actieve dagen gratis?',
          answer:
            'Ja. Actieve dagen, XP, levels en statistieken horen bij de gratis app.'
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
      secondaryCta: 'Zo werken actieve dagen',
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
            'Mijlpalen in actieve dagen kunnen als activiteitsposts verschijnen, zodat voortgang wordt opgemerkt zonder een openbare feed te worden.',
          bullets: [
            'Automatische posts bij mijlpalen zoals 7, 30 of 100 actieve dagen.',
            'Privacybewust posten respecteert je instellingen.',
            'Gebouwd voor vrienden en geaccepteerde connecties, geen openbare tijdlijn.'
          ]
        }
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
            'Actieve dagen laten zien hoe regelmatig je studeert.',
            'Statistieken tonen welke vakken aandacht krijgen en welke niet.'
          ]
        }
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
      secondaryCta: 'Bekijk hoe actieve dagen werken',
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
            'Thema’s ontgrendel je door levels en mijlpalen in actieve dagen te halen.'
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
      faq: [
        {
          question: 'Ondersteunt SkillQuest donkere modus?',
          answer:
            'Ja. SkillQuest ondersteunt lichte modus, donkere modus en een systeemmodus die je apparaat volgt.'
        },
        {
          question: 'Hoe ontgrendel ik meer thema’s?',
          answer:
            'Sommige thema’s ontgrendel je met je voortgang, zoals levels en actieve dagen. Premium voegt extra thema’s toe.'
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
            'Guest Mode is een startpunt, geen doodlopende weg. Wanneer je klaar bent voor synchronisatie, vrienden of challenges, neemt het aanmaken van een account je lokale voortgang mee.',
          bullets: [
            'Zet om naar een volledig account zonder lokale voortgang te verliezen.',
            'Ontgrendelt synchronisatie tussen apparaten, vrienden en challenges.',
            'Geen druk om te beslissen voordat je de app hebt geprobeerd.'
          ]
        },
        {
          title: 'Wat beperkt blijft in Guest Mode',
          body:
            'Sommige functies zijn van nature afhankelijk van een account, omdat ze andere mensen of synchronisatie tussen apparaten betreffen.',
          bullets: [
            'Vrienden en challenges vereisen een account.',
            'Family-functies vereisen een account en een familiegroep.',
            'Alleen-lokale voortgang wordt niet geback-upt totdat je een account maakt.'
          ]
        }
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
            'Vrienden, challenges en Family-functies vereisen een account, omdat ze synchronisatie met andere mensen inhouden.'
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
            'SkillQuest is intended for users aged 13 and up, including those using Family.'
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
            'Every session feeds XP, levels, active days, and statistics, so you see what you actually practiced.',
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
            'Create an account later for sync, friends, and challenges.',
            'Your progress is stored locally on your device.'
          ]
        }
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
            'More session history for long-term insight.'
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
            'Collect active days when you practice regularly.'
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
    'active-days': {
      slug: 'active-days',
      eyebrow: 'Active Days',
      title: 'Active days: see how regularly you practice',
      metaTitle: 'Active Days | See How Often You Practice | SkillQuest',
      metaDescription:
        'SkillQuest counts active days: every day with at least 10 minutes of practice. A missed day takes nothing away, and your total never resets.',
      summary:
        'A day counts as an active day once you practice for at least 10 minutes in total that day. Your total only goes up, so a missed day costs you nothing and regular practice still shows.',
      cardSummary:
        'Days with at least 10 minutes of practice add up to a total that never resets.',
      screenshot: '04-statistics.png',
      primaryCta: 'Download SkillQuest',
      secondaryCta: 'View focus timers',
      sections: [
        {
          title: 'What counts as an active day',
          body:
            'Practice for at least 10 minutes in total on a day, with any timer and any skill, and that day counts as an active day.',
          bullets: [
            'Every full minute of practice earns 1 XP, so 10 minutes earns 10 XP.',
            'Shorter sessions on the same day add up.',
            'Each day counts once, however long you practice.'
          ]
        },
        {
          title: 'A missed day costs nothing',
          body:
            'Active days do not have to follow each other. Skip a day and your total stays exactly where it was.',
          bullets: [
            'Your total only goes up and never resets.',
            'There is nothing to protect and nothing to lose.',
            'Pick up again whenever it suits you.'
          ]
        },
        {
          title: 'Milestones that show regular practice',
          body:
            'Over weeks and months, active days show how often you actually practiced, not just how long.',
          bullets: [
            'Milestones at 7, 30, and 100 active days, and beyond.',
            'Some themes unlock when you reach a number of active days.',
            'Challenge friends to an Active Days Battle.'
          ]
        }
      ],
      faq: [
        {
          question: 'What is an active day in SkillQuest?',
          answer:
            'A day on which you practice for at least 10 minutes in total with a timer. Each day counts once toward your total.'
        },
        {
          question: 'What happens if I miss a day?',
          answer:
            'Nothing. A missed day takes nothing away: your total stays the same and never resets.'
        },
        {
          question: 'Are active days free?',
          answer:
            'Yes. Active days, XP, levels, and statistics are part of the free app.'
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
      secondaryCta: 'How active days work',
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
            'Active-day milestones can show up as activity posts, so progress gets noticed without turning into a public feed.',
          bullets: [
            'Automatic posts for milestones like 7, 30, or 100 active days.',
            'Privacy-aware posting respects your settings.',
            'Built for friends and accepted connections, not a public timeline.'
          ]
        }
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
            'Active days show how regularly you study.',
            'Statistics show which subjects are getting attention and which are not.'
          ]
        }
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
      secondaryCta: 'See how active days work',
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
            'Themes unlock as you reach levels and active-day milestones.'
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
      faq: [
        {
          question: 'Does SkillQuest support dark mode?',
          answer:
            'Yes. SkillQuest supports light mode, dark mode, and a system mode that follows your device.'
        },
        {
          question: 'How do I unlock more themes?',
          answer:
            'Some themes unlock through your progress, such as levels and active days. Premium adds extra themes.'
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
            'Guest Mode is a starting point, not a dead end. When you are ready for sync, friends, or challenges, creating an account carries your local progress forward.',
          bullets: [
            'Convert to a full account without losing local progress.',
            'Unlocks sync across devices, friends, and challenges.',
            'No pressure to decide before you have tried the app.'
          ]
        },
        {
          title: 'What stays limited in Guest Mode',
          body:
            'Some features depend on an account by nature, since they involve other people or cross-device sync.',
          bullets: [
            'Friends and challenges need an account.',
            'Family features require an account and a family group.',
            'Local-only progress is not backed up until you create an account.'
          ]
        }
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
            'Friends, challenges, and Family features require an account, since they involve syncing with other people.'
        }
      ]
    }
  },
  de: {} as Record<TranslatedFeatureLandingSlug, FeatureLandingPage>,
  fr: {} as Record<TranslatedFeatureLandingSlug, FeatureLandingPage>,
  es: {} as Record<TranslatedFeatureLandingSlug, FeatureLandingPage>,
  it: {} as Record<TranslatedFeatureLandingSlug, FeatureLandingPage>
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
          'Sammle aktive Tage durch regelmäßiges Üben.'
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
          'SkillQuest richtet sich an Nutzer ab 13 Jahren, auch innerhalb von Family.'
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
      'Verfolge Fähigkeiten, XP, Levels, aktive Tage und Fokuszeit in einer mobilen App.',
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
          'Kombiniere Timer mit XP, Levels und aktiven Tagen.',
          'Sieh, welche Fähigkeiten wirklich Aufmerksamkeit bekommen.'
        ]
      },
      {
        title: 'Gamification für wiederholtes Üben',
        body:
          'XP, Levels und aktive Tage machen Fortschritt greifbar, ohne zu behaupten, dass Ergebnisse garantiert sind.',
        bullets: [
          'XP nach abgeschlossenen Sessions.',
          'Levels als sichtbare Meilensteine.',
          'Aktive Tage für wiederkehrende Routinen.',
          'Freunde und Challenges für zusätzliche Motivation.'
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
          'Bessere Sicht auf Skill-Aufschlüsselungen.'
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
          'Sammle aktive Tage, wenn du regelmäßig übst.'
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
  'active-days': {
    ...pages.en['active-days'],
    eyebrow: 'Aktive Tage',
    title: 'Aktive Tage: Sieh, wie regelmäßig du übst',
    metaTitle: 'Aktive Tage | Sieh, wie oft du übst | SkillQuest',
    metaDescription:
      'SkillQuest zählt aktive Tage: jeden Tag mit mindestens 10 Minuten Übung. Ein verpasster Tag kostet nichts, und deine Gesamtzahl wird nie zurückgesetzt.',
    summary:
      'Ein Tag zählt als aktiver Tag, sobald du an diesem Tag insgesamt mindestens 10 Minuten übst. Deine Gesamtzahl steigt nur, also kostet dich ein verpasster Tag nichts und regelmäßiges Üben bleibt sichtbar.',
    cardSummary:
      'Tage mit mindestens 10 Minuten Übung ergeben eine Gesamtzahl, die nie zurückgesetzt wird.',
    primaryCta: 'SkillQuest herunterladen',
    secondaryCta: 'Focus Timer ansehen',
    sections: [
      {
        title: 'Was als aktiver Tag zählt',
        body:
          'Übe an einem Tag insgesamt mindestens 10 Minuten, mit jedem Timer und jeder Fähigkeit, dann zählt dieser Tag als aktiver Tag.',
        bullets: [
          'Jede volle Minute Übung bringt 1 XP, 10 Minuten also 10 XP.',
          'Kürzere Sessions am selben Tag werden zusammengezählt.',
          'Jeder Tag zählt einmal, egal wie lange du übst.'
        ]
      },
      {
        title: 'Ein verpasster Tag kostet nichts',
        body:
          'Aktive Tage müssen nicht aufeinanderfolgen. Lässt du einen Tag aus, bleibt deine Gesamtzahl genau, wo sie war.',
        bullets: [
          'Deine Gesamtzahl steigt nur und wird nie zurückgesetzt.',
          'Es gibt nichts zu schützen und nichts zu verlieren.',
          'Mach einfach weiter, wann es dir passt.'
        ]
      },
      {
        title: 'Meilensteine, die regelmäßiges Üben zeigen',
        body:
          'Über Wochen und Monate zeigen aktive Tage, wie oft du wirklich geübt hast, nicht nur wie lange.',
        bullets: [
          'Meilensteine bei 7, 30 und 100 aktiven Tagen und darüber hinaus.',
          'Manche Designs schaltest du mit einer bestimmten Zahl aktiver Tage frei.',
          'Fordere Freunde zu einer Aktive-Tage-Schlacht heraus.'
        ]
      }
    ],
    faq: [
      {
        question: 'Was ist ein aktiver Tag in SkillQuest?',
        answer:
          'Ein Tag, an dem du insgesamt mindestens 10 Minuten mit einem Timer übst. Jeder Tag zählt einmal für deine Gesamtzahl.'
      },
      {
        question: 'Was passiert, wenn ich einen Tag verpasse?',
        answer:
          'Nichts. Ein verpasster Tag nimmt dir nichts weg: Deine Gesamtzahl bleibt gleich und wird nie zurückgesetzt.'
      },
      {
        question: 'Sind aktive Tage kostenlos?',
        answer:
          'Ja. Aktive Tage, XP, Levels und Statistiken gehören zur kostenlosen App.'
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
    secondaryCta: 'So funktionieren aktive Tage',
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
          'Meilensteine bei aktiven Tagen können als Aktivitätsbeiträge angezeigt werden, sodass deine Fortschritte wahrgenommen werden, ohne dass daraus ein öffentlicher Feed wird.',
        bullets: [
          'Automatische Beiträge zu Meilensteinen wie 7, 30 oder 100 aktive Tage.',
          'Beim datenschutzbewussten Posten werden deine Einstellungen berücksichtigt.',
          'Für Freunde und akzeptierte Kontakte gedacht, nicht als öffentliche Pinnwand.'
        ]
      }
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
          'Aktive Tage zeigen, wie regelmäßig du lernst.',
          'Die Statistiken zeigen, welche Themen Beachtung finden und welche nicht.'
        ]
      }
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
    secondaryCta: 'Sieh dir an, wie aktive Tage funktionieren',
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
          'Designs schaltest du mit Levels und Meilensteinen bei aktiven Tagen frei.'
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
    faq: [
      {
        question: 'Unterstützt SkillQuest den Dunkelmodus?',
        answer:
          'Ja. SkillQuest unterstützt den Hellmodus, den Dunkelmodus und einen Systemmodus, der sich an die Einstellungen deines Geräts anpasst.'
      },
      {
        question: 'Wie schalte ich weitere Designs frei?',
        answer:
          'Manche Designs schaltest du mit deinem Fortschritt frei, zum Beispiel mit Levels und aktiven Tagen. Premium bringt zusätzliche Designs.'
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
          'Der Guest Mode ist ein Ausgangspunkt, keine Sackgasse. Wenn du bereit bist für Synchronisierung, Freunde oder Herausforderungen, kannst du durch die Erstellung eines Kontos deinen lokalen Spielfortschritt übernehmen.',
        bullets: [
          'Wechsle zu einem Vollkonto, ohne deinen lokalen Spielfortschritt zu verlieren.',
          'Ermöglicht die Synchronisierung zwischen Geräten sowie Freunde und Herausforderungen.',
          'Du musst dich nicht entscheiden, bevor du die App ausprobiert hast.'
        ]
      },
      {
        title: 'Was im Guest Mode eingeschränkt bleibt',
        body:
          'Manche Funktionen sind naturgemäß an ein Konto gebunden, da sie andere Personen betreffen oder eine geräteübergreifende Synchronisierung erfordern.',
        bullets: [
          'Für Freunde und Herausforderungen brauchst du ein Konto.',
          'Für die Family-Funktionen brauchst du ein Konto und eine Family-Gruppe.',
          'Der lokal gespeicherte Spielfortschritt wird erst gesichert, wenn du ein Konto erstellst.'
        ]
      }
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
          'Für die Funktionen Freunde, Herausforderungen und Family ist ein Konto erforderlich, da sie die Synchronisierung mit anderen Personen beinhalten.'
      }
    ]
  }
};

pages.fr = {
  'focus-timer': {
    ...pages.en['focus-timer'],
    title: 'Un minuteur de concentration qui suit tes progrès',
    eyebrow: 'Minuteur de concentration',
    metaTitle: 'Minuteur de concentration | Pomodoro, Deep Work, Flowtime | SkillQuest',
    metaDescription:
      'Utilise SkillQuest comme minuteur de concentration : Pomodoro, Deep Work, 52-17, Flowtime, Until Time et EMOM. Chaque session fait grimper tes XP et tes niveaux.',
    summary:
      'Lance un minuteur pour la compétence que tu développes. SkillQuest relie tes minutes de concentration aux XP, aux niveaux, aux statistiques et à une progression visible.',
    cardSummary:
      'Pomodoro, Deep Work, Flowtime et autres modes de minuteur, reliés à une vraie progression de tes compétences.',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Comparer Premium',
    sections: [
      {
        title: 'Choisis le minuteur adapté à ta tâche',
        body:
          'SkillQuest propose plusieurs façons de se concentrer, pour que tu ne sois pas limité à un seul rythme Pomodoro.',
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
          'Un minuteur n’est pas séparé de ta progression. Tu choisis d’abord une compétence, puis tu vois tes XP, tes niveaux et tes statistiques évoluer.',
        bullets: [
          'Gagne de l’XP après chaque session terminée.',
          'Suis ton temps de concentration par compétence.',
          'Consulte tes sessions par compétence dans les statistiques.',
          'Collectionne des jours actifs en pratiquant régulièrement.'
        ]
      },
      {
        title: 'Premium pour plus de liberté de concentration',
        body:
          'Premium s’adresse à celles et ceux qui veulent plus de techniques, des durées personnalisées et des statistiques plus poussées.',
        bullets: [
          'Durée Flowtime personnalisée et minuteurs personnalisés.',
          'Modes de minuteur avancés pour différentes routines.',
          'Plus d’historique et de statistiques pour suivre ta progression sur la durée.',
          'Premium coûte EUR 3.99 par mois ou EUR 39.99 par an.'
        ]
      }
    ],
    faq: [
      {
        question: 'SkillQuest est-elle une application Pomodoro ?',
        answer:
          'Oui. SkillQuest prend en charge Pomodoro et d’autres modes de concentration comme 52-17, Deep Work, Flowtime, Until Time et EMOM. Certaines fonctions avancées sont incluses dans Premium.'
      },
      {
        question: 'Les minuteurs sont-ils liés aux compétences ?',
        answer:
          'Oui. Les sessions terminées sont liées à la compétence choisie, ce qui rend les XP, les statistiques et la progression visibles.'
      },
      {
        question: 'Puis-je utiliser des durées personnalisées ?',
        answer:
          'Oui. Les durées personnalisées et les options avancées de minuteur font partie des fonctions Premium.'
      }
    ]
  },
  family: {
    ...pages.en.family,
    title: 'Aide tes enfants à s’entraîner avec un cadre clair, des objectifs et des progrès visibles',
    metaTitle: 'Family pour parents | Minuteurs, objectifs, statistiques | SkillQuest',
    metaDescription:
      'Avec SkillQuest Family, les parents lancent des minuteurs pour leurs enfants, consultent leurs statistiques, fixent des objectifs hebdomadaires et envoient des compliments.',
    summary:
      'Family donne un cadre aux parents sans prendre le contrôle de la progression de l’enfant. Minuteurs, objectifs, XP et compliments rendent le temps de pratique concret.',
    cardSummary:
      'Les parents peuvent lancer des minuteurs, consulter les statistiques de leurs enfants, fixer des objectifs et les encourager positivement.',
    primaryCta: 'Voir Family',
    secondaryCta: 'Télécharger l’app',
    sections: [
      {
        title: 'Vois quand tes enfants pratiquent',
        body:
          'Avec Family, les parents peuvent voir quelles sessions ont été lancées et suivre l’évolution de chaque compétence.',
        bullets: [
          'Consulte l’activité des minuteurs de tes enfants.',
          'Vérifie leurs statistiques : sessions, minutes et XP.',
          'Discute de la progression par compétence.',
          'Un espace familial privé avec des rôles pour les parents.'
        ]
      },
      {
        title: 'Lance des minuteurs pour tes enfants',
        body:
          'Les parents et le titulaire du compte peuvent lancer un minuteur pour un enfant. La session est liée à l’enfant, pour que la progression reste visible de son côté.',
        bullets: [
          'Choisis un enfant et une compétence depuis l’espace famille.',
          'Lance une session de pratique quand un objectif clair s’impose.',
          'Relie les minutes de concentration aux XP et à la progression.',
          'Les enfants voient les minuteurs lancés par leurs parents.'
        ]
      },
      {
        title: 'Avancer ensemble vers des objectifs',
        body:
          'Family prend en charge les objectifs hebdomadaires et les compliments, pour que l’accompagnement ne se résume pas au contrôle.',
        bullets: [
          'Fixe des objectifs en minutes ou en sessions.',
          'Envoie des compliments pour l’effort et les progrès.',
          'Donne à ta famille une prochaine étape claire.',
          'Family coûte EUR 6.99 par mois ou EUR 69.99 par an.'
        ]
      }
    ],
    faq: [
      {
        question: 'Les parents peuvent-ils lancer des minuteurs pour les enfants ?',
        answer:
          'Oui. Avec Family, les parents et le titulaire du compte peuvent lancer des minuteurs pour les enfants au sein du groupe familial.'
      },
      {
        question: 'Puis-je voir la progression de mon enfant ?',
        answer:
          'Oui. Family inclut des statistiques enfant avec sessions, minutes, XP, répartition par compétence et activité récente.'
      },
      {
        question: 'Family est-il inclus dans Premium ?',
        answer:
          'Non. Family est un abonnement familial séparé : il inclut Premium, avec en plus des rôles parent, des statistiques enfant, des minuteurs pour les enfants, des objectifs et des compliments.'
      },
      {
        question: 'SkillQuest est-il destiné aux jeunes enfants ?',
        answer:
          'SkillQuest est destiné aux utilisateurs de 13 ans et plus, y compris dans Family.'
      }
    ]
  },
  'skill-tracker': {
    ...pages.en['skill-tracker'],
    title: 'Suis tes compétences, pas seulement tes tâches',
    eyebrow: 'Suivi de compétences',
    metaTitle: 'App de suivi de compétences | XP, niveaux et progression | SkillQuest',
    metaDescription:
      'SkillQuest suit tes compétences en études, sport, musique, lecture, code, création et routines. Lance des minuteurs et suis tes XP, tes niveaux et tes progrès.',
    summary:
      'SkillQuest t’aide à développer tes compétences en reliant ton vrai temps de pratique à la progression, aux XP, aux niveaux et aux statistiques.',
    cardSummary:
      'Suis tes compétences, tes XP, tes niveaux, tes jours actifs et ton temps de concentration dans une seule app mobile.',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Voir les minuteurs de concentration',
    sections: [
      {
        title: 'Pars de la compétence, pas d’une tâche générique',
        body:
          'SkillQuest rattache chaque session à une compétence, pour que travail, apprentissage et loisirs deviennent une progression visible.',
        bullets: [
          'Utilise les compétences de départ ou crée les tiennes.',
          'Suis tes études, le sport, la musique, la lecture, le code et la création.',
          'Associe minuteurs, XP, niveaux et jours actifs.',
          'Vois quelles compétences reçoivent vraiment ton attention.'
        ]
      },
      {
        title: 'Gamification pour pratiquer régulièrement',
        body:
          'XP, niveaux et jours actifs rendent le progrès concret, sans promettre de résultats garantis.',
        bullets: [
          'XP après les sessions terminées.',
          'Niveaux comme jalons visibles.',
          'Jours actifs pour les routines répétées.',
          'Amis et défis pour une motivation supplémentaire.'
        ]
      },
      {
        title: 'Commence gratuitement, passe à l’offre supérieure si besoin',
        body:
          'Le mode invité et les fonctions Free t’aident à démarrer. Premium et Family ajoutent plus de profondeur quand SkillQuest entre dans ta routine.',
        bullets: [
          'Mode invité pour commencer rapidement.',
          'Premium pour plus de liberté côté minuteurs et statistiques.',
          'Family pour une structure parent-enfant.',
          'Synchronisation respectueuse de la vie privée pour les comptes.'
        ]
      }
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
          'Oui. SkillQuest prend en charge les compétences personnalisées, pour que l’app colle à ta vraie routine.'
      },
      {
        question: 'SkillQuest est-elle une app de suivi d’habitudes ?',
        answer:
          'SkillQuest ressemble en partie aux applis de suivi d’habitudes, mais met davantage l’accent sur les compétences, le temps de concentration, les XP, les niveaux et une progression mesurable.'
      }
    ]
  },
  'progress-statistics': {
    ...pages.en['progress-statistics'],
    title: 'Vois tes progrès avec les statistiques, les XP et l’historique de tes compétences',
    eyebrow: 'Suivi de la progression',
    metaTitle: 'Statistiques de progression | Suivi de compétences et XP | SkillQuest',
    metaDescription:
      'Consulte tes statistiques SkillQuest par jour, semaine, mois et année : XP, sessions, minutes, répartition des compétences et, avec Family, statistiques des enfants.',
    summary:
      'SkillQuest rend le temps de pratique mesurable avec statistiques, répartitions par compétence, XP, historique de sessions et progrès par période.',
    cardSummary:
      'Statistiques pour minutes de concentration, sessions, XP, compétences et progression enfant avec Family.',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Comparer Premium',
    sections: [
      {
        title: 'Comprends où passe ton temps',
        body:
          'Les statistiques t’aident à repérer des tendances dans ton temps de pratique et ta concentration par compétence, sans les présenter comme un résultat garanti.',
        bullets: [
          'Consulte tes sessions et tes minutes par période.',
          'Compare tes compétences et ton activité.',
          'Utilise les XP et les niveaux comme repères de progression.',
          'Vérifie tes sessions récentes et ton historique.'
        ]
      },
      {
        title: 'Des analyses plus poussées avec Premium',
        body:
          'Premium s’adresse aux utilisateurs qui veulent aller au-delà des statistiques de base.',
        bullets: [
          'Statistiques et tendances étendues.',
          'Plus d’historique pour les routines à long terme.',
          'Meilleure visibilité sur les répartitions par compétence.'
        ]
      },
      {
        title: 'Rendre visible la progression des enfants avec Family',
        body:
          'Avec Family, les parents peuvent consulter la progression des enfants et faciliter la discussion autour du temps de pratique.',
        bullets: [
          'Statistiques enfant avec sessions, minutes et XP.',
          'Activité des minuteurs pour voir quand la pratique commence.',
          'Objectifs et compliments rendent l’accompagnement plus concret.',
          'Family est un abonnement séparé pour les familles.'
        ]
      }
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
          'Premium inclut des statistiques étendues et plus d’historique. Regarde dans l’app pour voir les fonctions actuellement disponibles.'
      },
      {
        question: 'Les parents peuvent-ils voir les statistiques des enfants ?',
        answer:
          'Oui. Family inclut des statistiques des enfants pour les parents et le titulaire du compte au sein du groupe familial.'
      }
    ]
  },
  'pomodoro-timer': {
    slug: 'pomodoro-timer',
    eyebrow: 'Minuteur Pomodoro',
    title: 'Un minuteur Pomodoro adapté à tes compétences',
    metaTitle: 'Appli Pomodoro | Séances d\'étude et de concentration | SkillQuest',
    metaDescription:
      'Minuteur Pomodoro gratuit pour étudier et travailler en toute concentration. Chaque sprint de 25 minutes te rapporte des XP et fait progresser tes compétences.',
    summary:
      'Le rythme Pomodoro classique 25/5, intégré à SkillQuest, pour que chaque sprint te fasse gagner des XP, des niveaux et te fasse progresser dans la compétence que tu t\'entraînes à maîtriser.',
    cardSummary:
      'Le rythme Pomodoro classique 25/5, lié aux XP, aux niveaux et à la progression des compétences.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Comparer les techniques de minuteur',
    sections: [
      {
        title: 'La technique Pomodoro, sans avoir besoin d\'une appli spécifique',
        body:
          'La méthode Pomodoro divise le travail en courtes sessions de concentration ponctuées de pauses régulières. SkillQuest intègre cette méthode parmi plusieurs autres techniques de minuteur ; tu n\'as donc pas besoin d\'une application Pomodoro distincte en plus de ton outil de suivi.',
        bullets: [
          'Des sprints de concentration de 25 minutes avec des pauses intégrées.',
          'Disponible dans la formule gratuite, sans abonnement.',
          'Cela fonctionne pour les études, le travail, la lecture ou n\'importe quelle compétence que tu suis.',
        ]
      },
      {
        title: 'Chaque sprint compte pour une compétence',
        body:
          'Un minuteur Pomodoro, à lui seul, ne fait que mesurer le temps. SkillQuest associe chaque sprint à la compétence que tu as choisie, ce qui te permet de transformer ta concentration en progrès visibles.',
        bullets: [
          'Gagne des XP après chaque session Pomodoro terminée.',
          'Consulte les sessions classées par compétence dans tes statistiques.',
          'Collectionne des jours actifs en pratiquant régulièrement.',
        ]
      },
      {
        title: 'Au-delà de la méthode Pomodoro, quand tu as besoin de plus',
        body:
          'Certaines tâches nécessitent des sessions de concentration plus longues ou plus flexibles que 25 minutes. SkillQuest propose d\'autres techniques auxquelles tu peux passer sans quitter l\'appli.',
        bullets: [
          '« Deep Work » et « 52-17 » pour les sessions plus longues.',
          '« Flowtime » et « Until Time » pour des durées flexibles.',
          'Avec l\'abonnement Premium, tu débloques l\'ensemble des techniques de minuteur.',
        ]
      },
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
  'active-days': {
    ...pages.en['active-days'],
    eyebrow: 'Jours actifs',
    title: 'Jours actifs : vois à quel point tu pratiques régulièrement',
    metaTitle: 'Jours actifs | Vois à quelle fréquence tu pratiques | SkillQuest',
    metaDescription:
      'SkillQuest compte les jours actifs : chaque jour avec au moins 10 minutes de pratique. Un jour manqué ne coûte rien et ton total ne revient jamais à zéro.',
    summary:
      'Une journée compte comme jour actif dès que tu pratiques au moins 10 minutes au total ce jour-là. Ton total ne fait qu’augmenter : un jour manqué ne te coûte rien et ta régularité reste visible.',
    cardSummary:
      'Les jours avec au moins 10 minutes de pratique s’additionnent dans un total qui ne revient jamais à zéro.',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Voir les minuteurs de concentration',
    sections: [
      {
        title: 'Ce qui compte comme jour actif',
        body:
          'Pratique au moins 10 minutes au total dans la journée, avec n’importe quel minuteur et n’importe quelle compétence, et ce jour compte comme jour actif.',
        bullets: [
          'Chaque minute complète de pratique rapporte 1 XP : 10 minutes rapportent donc 10 XP.',
          'Les sessions plus courtes d’une même journée s’additionnent.',
          'Chaque jour compte une fois, quelle que soit la durée de ta pratique.'
        ]
      },
      {
        title: 'Un jour manqué ne coûte rien',
        body:
          'Les jours actifs n’ont pas besoin de se suivre. Si tu sautes un jour, ton total reste exactement où il était.',
        bullets: [
          'Ton total ne fait qu’augmenter et ne revient jamais à zéro.',
          'Il n’y a rien à protéger et rien à perdre.',
          'Reprends quand ça te convient.'
        ]
      },
      {
        title: 'Des étapes qui montrent ta régularité',
        body:
          'Au fil des semaines et des mois, les jours actifs montrent à quelle fréquence tu as vraiment pratiqué, pas seulement combien de temps.',
        bullets: [
          'Des étapes à 7, 30 et 100 jours actifs, et au-delà.',
          'Certains thèmes se débloquent quand tu atteins un certain nombre de jours actifs.',
          'Défie tes amis dans une Bataille des jours actifs.'
        ]
      }
    ],
    faq: [
      {
        question: 'Qu’est-ce qu’un jour actif dans SkillQuest ?',
        answer:
          'Un jour où tu pratiques au moins 10 minutes au total avec un minuteur. Chaque jour compte une fois dans ton total.'
      },
      {
        question: 'Que se passe-t-il si je manque un jour ?',
        answer:
          'Rien. Un jour manqué ne t’enlève rien : ton total reste le même et ne revient jamais à zéro.'
      },
      {
        question: 'Les jours actifs sont-ils gratuits ?',
        answer:
          'Oui. Les jours actifs, les XP, les niveaux et les statistiques font partie de l’app gratuite.'
      }
    ]
  },
  'friends-challenges': {
    slug: 'friends-challenges',
    eyebrow: 'Amis et défis',
    title: 'Rends la progression un peu plus conviviale',
    metaTitle: 'Amis et défis | Garde la motivation pour tes compétences | SkillQuest',
    metaDescription:
      'Ajoute des amis, lance des défis (Course XP, Bataille des jours actifs) et partage tes progrès comme tu veux, grâce aux paramètres de confidentialité de SkillQuest.',
    summary:
      'Ajoute des amis, lance des défis et trouve la motivation dont tu as besoin quand tu le souhaites, grâce à des paramètres de confidentialité qui te permettent de partager ce que tu veux, comme tu le veux.',
    cardSummary:
      'Des amis, des défis et un fil d\'activité, avec des paramètres de confidentialité que tu gères toi-même.',
    screenshot: '06-social-family.png',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Comment fonctionnent les jours actifs',
    sections: [
      {
        title: 'Ajoute des amis pour te motiver vraiment',
        body:
          'Quand on s’entraîne tout seul, on a vite tendance à perdre sa motivation. En ajoutant des amis sur SkillQuest, tu profites de l’élan que te donnent les personnes que tu connais vraiment.',
        bullets: [
          'Envoie et accepte des demandes d\'amis directement depuis l\'appli.',
          'Consulte les statistiques de tes amis dès que chacun a donné son accord.',
          'Un bouton de confidentialité te permet de contrôler le partage de tes données.',
        ]
      },
      {
        title: 'Des défis qui nous rapprochent d\'un objectif commun',
        body:
          'Les défis transforment la pratique individuelle en un effort collectif, qu\'il s\'agisse d\'une Course XP ou d\'une Bataille des jours actifs.',
        bullets: [
          'Lance une Course XP ou une Bataille des jours actifs avec tes amis.',
          'Suis la progression du défi et les dernières activités avec tes amis.',
          'Découvre qui est en tête sans perdre de vue tes propres progrès.',
        ]
      },
      {
        title: 'Un fil d\'activité qui met à l\'honneur les moments forts',
        body:
          'Les étapes de jours actifs peuvent apparaître sous forme de publications d\'activité, ce qui permet de mettre en avant tes progrès sans pour autant créer un fil d\'actualité public.',
        bullets: [
          'Des publications automatiques pour marquer des étapes comme 7, 30 ou 100 jours d\'activité.',
          'La publication respectueuse de la vie privée tient compte de tes paramètres.',
          'Conçu pour tes amis et tes contacts approuvés, pas pour un mur public.',
        ]
      },
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
          'SkillQuest prend en charge différents types de défis, comme la « Course XP » et la « Bataille des jours actifs », avec un suivi commun des progrès.'
      },
    ]
  },
  'study-timer': {
    slug: 'study-timer',
    eyebrow: 'Minuteur d\'étude',
    title: 'Un minuteur d’étude qui fait bien plus que mesurer le temps',
    metaTitle: 'Minuteur d\'étude | Suis tes sessions d\'étude par matière | SkillQuest',
    metaDescription:
      'Utilise SkillQuest comme minuteur d’étude pour tes examens, devoirs et révisions. Suis ton temps d’étude par matière avec XP, niveaux et statistiques.',
    summary:
      'Transforme tes sessions d\'étude en progrès visibles par matière, grâce à des minuteurs de concentration, des points d\'expérience (XP) et des statistiques conçues pour un apprentissage régulier, et pas seulement pour un simple compte à rebours.',
    cardSummary:
      'Suivi des sessions d\'étude par matière, avec les XP, les niveaux et les statistiques.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Commencer à étudier avec SkillQuest',
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
          'Il est plus facile de garder ses habitudes d’étude quand on voit clairement ses progrès, au lieu de devoir les deviner.',
        bullets: [
          'Les XP et les niveaux par matière te permettent de suivre tes progrès.',
          'Les jours actifs montrent à quel point tu étudies régulièrement.',
          'Les statistiques montrent quelles matières tu travailles le plus et lesquelles tu délaisses.',
        ]
      },
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
    metaTitle: 'Minuteur Deep Work et Flowtime | Concentration Premium | SkillQuest',
    metaDescription:
      'Deep Work, 52-17 et Flowtime dans SkillQuest : des sessions de concentration longues et sans interruption. Techniques de minuteur Premium, durée personnalisable.',
    summary:
      'Quand une tâche nécessite un sprint de plus de 25 minutes, les modes « Deep Work », « 52-17 » et « Flowtime » te permettent de bénéficier de plages de concentration plus longues et flexibles, qui comptent quand même pour tes XP et ta progression.',
    cardSummary:
      'Deep Work, 52-17 et Flowtime pour des séances de concentration plus longues et flexibles.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Comparer les formules Premium',
    secondaryCta: 'Voir toutes les techniques de minuteur',
    sections: [
      {
        title: 'Le « Deep Work » pour des sessions de concentration sans interruption',
        body:
          'Deep Work est conçu pour des sessions de travail prolongées et consacrées à une seule tâche, pour le genre de travail qui perd de sa valeur s\'il est interrompu toutes les 25 minutes.',
        bullets: [
          'Des sessions de concentration plus longues que celles de la méthode Pomodoro, consacrées à une seule tâche.',
          'Ça compte pour les XP, les niveaux et les statistiques, comme n\'importe quelle autre session.',
          'Ça fait partie des techniques de minuteur Premium.',
        ]
      },
      {
        title: '52-17 pour un rythme structuré à longue durée',
        body:
          '52 minutes de concentration suivies d\'une pause de 17 minutes, c\'est un rythme qui s\'appuie sur les cycles naturels d\'attention, ce qui est pratique pour les longues sessions de travail ou d\'étude.',
        bullets: [
          'Un rapport « concentration/détente » fixe, inspiré de la recherche.',
          'Idéal pour les sessions de travail ou d\'étude de plusieurs heures.',
          'Inclus dans la version Premium, avec d\'autres techniques de minuteur.',
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
        question: 'Ces techniques de minuteur sont-elles gratuites ?',
        answer:
          'Deep Work, 52-17 et Flowtime font partie de l\'offre Premium, tout comme les durées de minuteur personnalisées et les statistiques plus détaillées.'
      },
    ]
  },
  themes: {
    slug: 'themes',
    eyebrow: 'Thèmes',
    title: 'Fais de SkillQuest une appli à ton image',
    metaTitle: 'Thèmes et personnalisation | Clair, sombre et à débloquer | SkillQuest',
    metaDescription:
      'Modes clair, sombre et système, plus des thèmes à débloquer selon ta progression : SkillQuest prend l’apparence que tu veux.',
    summary:
      'Le mode clair, le mode sombre, le mode système et toute une série de thèmes à débloquer te permettent de personnaliser l\'apparence et l\'ambiance de SkillQuest comme tu le souhaites, certains thèmes étant même liés à ta propre progression.',
    cardSummary:
      'Mode clair, mode sombre et mode système, ainsi que des thèmes que tu débloques au fur et à mesure de ta progression.',
    screenshot: '07-themes-profile.png',
    primaryCta: 'Télécharger SkillQuest',
    secondaryCta: 'Découvrir comment fonctionnent les jours actifs',
    sections: [
      {
        title: 'Mode clair, mode sombre et mode système',
        body:
          'SkillQuest s\'adapte par défaut à ton appareil, mais tu peux le verrouiller en mode clair ou sombre quand tu veux.',
        bullets: [
          'Le mode système s\'adapte automatiquement à ton appareil.',
          'Tu peux passer manuellement du mode clair au mode sombre à tout moment.',
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
          'Les thèmes se débloquent au fil des niveaux et des étapes de jours actifs.',
        ]
      },
      {
        title: 'Une personnalisation qui reste cohérente',
        body:
          'Les thèmes changent la couleur et l’ambiance, mais pas la structure de l’appli : changer de thème ne t’oblige jamais à réapprendre où se trouvent tes fonctions.',
        bullets: [
          'Une mise en page homogène pour tous les thèmes.',
          'Les couleurs s\'adaptent sans nuire à la lisibilité ni au contraste.',
          'Le fonctionnement reste le même pour le suivi des compétences, les minuteurs et les statistiques.',
        ]
      },
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
          'Certains thèmes se débloquent avec ta progression, par exemple les niveaux et les jours actifs. Premium ajoute des thèmes supplémentaires.'
      },
      {
        question: 'Est-ce que les thèmes modifient le fonctionnement de l\'appli ?',
        answer:
          'Non. Les thèmes ne changent que l\'apparence. Le suivi des compétences, les minuteurs et les statistiques fonctionnent de la même manière quel que soit le thème.'
      },
    ]
  },
  'guest-mode': {
    slug: 'guest-mode',
    eyebrow: 'Mode invité',
    title: 'Essaie SkillQuest avant de créer un compte',
    metaTitle: 'Mode invité | Essaie SkillQuest sans compte | SkillQuest',
    metaDescription:
      'Le mode invité de SkillQuest te permet de suivre tes compétences, de lancer des minuteurs de concentration et de gagner des XP en local avant de créer un compte.',
    summary:
      'Le mode invité t\'épargne l\'inscription. Suis tes compétences, lance des minuteurs de concentration et gagne des XP directement sur ton appareil, puis crée un compte quand tu seras prêt.',
    cardSummary:
      'Essaie le suivi des compétences et les minuteurs de concentration en local, avant de créer un compte.',
    screenshot: '01-home-progress.png',
    primaryCta: 'Commencer en tant qu\'invité',
    secondaryCta: 'Comparer les formules Free, Premium et Family',
    sections: [
      {
        title: 'Pas besoin de compte pour commencer',
        body:
          'Le mode invité te permet d\'ouvrir SkillQuest et de commencer tout de suite à suivre une compétence, sans avoir à t\'inscrire au préalable.',
        bullets: [
          'Le suivi des compétences principales, les minuteurs de concentration, l\'XP et les niveaux fonctionnent en mode invité.',
          'Ta progression est enregistrée localement sur ton appareil.',
          'Pas besoin d\'adresse e-mail ni de compte pour essayer l\'appli.',
        ]
      },
      {
        title: 'Crée un compte quand ça te semble utile',
        body:
          'Le mode invité, c\'est un point de départ, pas une impasse. Quand tu seras prêt pour la synchronisation, les amis ou les défis, créer un compte te permettra de conserver ta progression locale.',
        bullets: [
          'Passe à un compte complet sans perdre ta progression locale.',
          'Active la synchronisation entre tes appareils et débloque les amis et les défis.',
          'Pas besoin de te décider avant d\'avoir testé l\'appli.',
        ]
      },
      {
        title: 'Ce qui reste limité en mode invité',
        body:
          'Certaines fonctionnalités nécessitent forcément un compte, car elles impliquent d\'autres personnes ou une synchronisation entre appareils.',
        bullets: [
          'Pour accéder aux amis et aux défis, il faut un compte.',
          'Pour profiter des fonctionnalités Family, il faut un compte et un groupe Family.',
          'Ta progression n’est pas sauvegardée en ligne tant que tu n’as pas créé de compte.',
        ]
      },
    ],
    faq: [
      {
        question: 'Est-ce que j\'ai besoin d\'un compte pour utiliser SkillQuest ?',
        answer:
          'Non. Le mode invité te permet d\'utiliser les fonctionnalités principales de suivi des compétences et les minuteurs de concentration sans avoir à créer de compte.'
      },
      {
        question: 'Qu\'est-ce qui va se passer avec ma progression si je crée un compte plus tard ?',
        answer:
          'En quittant le mode invité, ta progression locale sera transférée vers ton nouveau compte.'
      },
      {
        question: 'Qu\'est-ce que je ne peux pas faire en mode invité ?',
        answer:
          'Les fonctionnalités « Amis », « Défis » et « Family » nécessitent un compte, car elles impliquent une synchronisation avec d\'autres personnes.'
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
          'Suma días activos practicando con regularidad.'
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
          'SkillQuest está dirigido a usuarios de 13 años o más, también dentro de Family.'
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
      'Sigue habilidades, XP, niveles, días activos y tiempo de enfoque en una app móvil.',
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
          'Combina timers con XP, niveles y días activos.',
          'Ve qué habilidades reciben atención real.'
        ]
      },
      {
        title: 'Gamificación para practicar con regularidad',
        body:
          'XP, niveles y días activos hacen tangible el progreso, sin prometer resultados garantizados.',
        bullets: [
          'XP después de sesiones completadas.',
          'Niveles como hitos visibles.',
          'Días activos para rutinas repetidas.',
          'Amigos y desafíos para motivación adicional.'
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
          'Mejor visibilidad de desgloses por habilidad.'
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
          'Suma días activos practicando con regularidad.',
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
  'active-days': {
    ...pages.en['active-days'],
    eyebrow: 'Días activos',
    title: 'Días activos: ve con qué regularidad practicas',
    metaTitle: 'Días activos | Ve con qué frecuencia practicas | SkillQuest',
    metaDescription:
      'SkillQuest cuenta los días activos: cada día con al menos 10 minutos de práctica. Saltarte un día no cuesta nada y tu total nunca vuelve a cero.',
    summary:
      'Un día cuenta como día activo en cuanto practicas al menos 10 minutos en total ese día. Tu total solo sube, así que saltarte un día no te cuesta nada y tu práctica regular se sigue viendo.',
    cardSummary:
      'Los días con al menos 10 minutos de práctica suman un total que nunca vuelve a cero.',
    primaryCta: 'Descargar SkillQuest',
    secondaryCta: 'Ver temporizadores de concentración',
    sections: [
      {
        title: 'Qué cuenta como día activo',
        body:
          'Practica al menos 10 minutos en total en un día, con cualquier temporizador y cualquier habilidad, y ese día cuenta como día activo.',
        bullets: [
          'Cada minuto completo de práctica te da 1 XP, así que 10 minutos son 10 XP.',
          'Las sesiones más cortas del mismo día se suman.',
          'Cada día cuenta una vez, practiques el tiempo que practiques.'
        ]
      },
      {
        title: 'Saltarte un día no cuesta nada',
        body:
          'Los días activos no tienen que ser seguidos. Si te saltas un día, tu total se queda exactamente donde estaba.',
        bullets: [
          'Tu total solo sube y nunca vuelve a cero.',
          'No hay nada que proteger ni nada que perder.',
          'Retómalo cuando te venga bien.'
        ]
      },
      {
        title: 'Hitos que muestran tu práctica regular',
        body:
          'Con las semanas y los meses, los días activos muestran con qué frecuencia practicaste de verdad, no solo cuánto tiempo.',
        bullets: [
          'Hitos a los 7, 30 y 100 días activos, y más allá.',
          'Algunos temas se desbloquean al alcanzar cierto número de días activos.',
          'Reta a tus amigos a una Batalla de días activos.'
        ]
      }
    ],
    faq: [
      {
        question: '¿Qué es un día activo en SkillQuest?',
        answer:
          'Un día en el que practicas al menos 10 minutos en total con un temporizador. Cada día cuenta una vez para tu total.'
      },
      {
        question: '¿Qué pasa si me salto un día?',
        answer:
          'Nada. Saltarte un día no te quita nada: tu total sigue igual y nunca vuelve a cero.'
      },
      {
        question: '¿Los días activos son gratis?',
        answer:
          'Sí. Los días activos, los XP, los niveles y las estadísticas forman parte de la app gratuita.'
      }
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
    secondaryCta: 'Cómo funcionan los días activos',
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
          'Los hitos de días activos pueden aparecer como publicaciones de actividad, así que se nota tu progreso sin que se convierta en un feed público.',
        bullets: [
          'Publicaciones automáticas para hitos como 7, 30 o 100 días de actividad.',
          'Las publicaciones que respetan la privacidad tienen en cuenta tu configuración.',
          'Hecho para amigos y contactos aceptados, no para un muro público.',
        ]
      },
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
          'Los días activos muestran con qué regularidad estudias.',
          'Las estadísticas muestran qué temas están llamando la atención y cuáles no.',
        ]
      },
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
    secondaryCta: 'Descubre cómo funcionan los días activos',
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
          'Los temas se desbloquean al alcanzar niveles e hitos de días activos.',
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
    faq: [
      {
        question: '¿SkillQuest es compatible con el modo oscuro?',
        answer:
          'Sí. SkillQuest es compatible con el modo claro, el modo oscuro y un modo de sistema que se adapta a tu dispositivo.'
      },
      {
        question: '¿Cómo puedo desbloquear más temas?',
        answer:
          'Algunos temas se desbloquean con tu progreso, como los niveles y los días activos. Premium añade temas extra.'
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
          'El «Guest Mode» es un punto de partida, no un callejón sin salida. Cuando estés listo para la sincronización, los amigos o los retos, al crear una cuenta podrás conservar tu progreso local.',
        bullets: [
          'Cambia a una cuenta completa sin perder el progreso local.',
          'Te permite sincronizar entre dispositivos y usar amigos y retos.',
          'No te sientas presionado a decidirte antes de haber probado la app.',
        ]
      },
      {
        title: 'Qué funciones están limitadas en el Guest Mode',
        body:
          'Algunas funciones dependen, por su propia naturaleza, de tener una cuenta, ya que implican a otras personas o la sincronización entre dispositivos.',
        bullets: [
          'Para acceder a los amigos y los retos, necesitas una cuenta.',
          'Para usar las funciones Family, necesitas una cuenta y un grupo Family.',
          'El progreso que solo se guarda localmente no se guarda en la nube hasta que crees una cuenta.',
        ]
      },
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
          'Las funciones de «Amigos», «Retos» y «Family» requieren una cuenta, ya que implican sincronizarse con otras personas.'
      },
    ]
  },
};

pages.it = {
  'focus-timer': {
    ...pages.en['focus-timer'],
    title: 'Un timer di concentrazione che tiene traccia dei tuoi progressi',
    eyebrow: 'Timer di concentrazione',
    metaTitle: 'Timer di concentrazione | Pomodoro, Deep Work, Flowtime | SkillQuest',
    metaDescription:
      'Usa SkillQuest come timer di concentrazione per Pomodoro, Deep Work, 52-17, Flowtime, Until Time ed EMOM. Ogni sessione conta per XP, livelli e progressi.',
    summary:
      'Avvia un timer per l’abilità su cui stai lavorando. SkillQuest collega i minuti di concentrazione a XP, livelli, statistiche e crescita visibile.',
    cardSummary:
      'Pomodoro, Deep Work, Flowtime e altre modalità timer collegate al progresso reale delle tue abilità.',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Confronta Premium',
    sections: [
      {
        title: 'Scegli il timer adatto alla tua attività',
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
        title: 'Ogni minuto conta per un’abilità',
        body:
          'Il timer non è slegato dai tuoi progressi. Prima scegli un’abilità, poi vedi crescere XP, livelli e statistiche.',
        bullets: [
          'Guadagna XP dopo le sessioni completate.',
          'Monitora il tempo di concentrazione per abilità.',
          'Rivedi le sessioni per abilità nelle statistiche.',
          'Accumula giorni attivi esercitandoti con regolarità.'
        ]
      },
      {
        title: 'Premium per più libertà di concentrazione',
        body:
          'Premium è pensato per chi vuole più tecniche timer, durata personalizzata e statistiche più approfondite.',
        bullets: [
          'Durata Flowtime personalizzata e timer personalizzati.',
          'Modalità timer avanzate per routine diverse.',
          'Uno storico più esteso e statistiche per seguire i progressi a lungo termine.',
          'Premium costa EUR 3.99 al mese o EUR 39.99 all’anno.'
        ]
      }
    ],
    faq: [
      {
        question: 'SkillQuest è un’app Pomodoro?',
        answer:
          'Sì. SkillQuest supporta Pomodoro e altre modalità di concentrazione come 52-17, Deep Work, Flowtime, Until Time ed EMOM. Alcune funzioni avanzate fanno parte di Premium.'
      },
      {
        question: 'I timer sono collegati alle abilità?',
        answer:
          'Sì. Le sessioni completate sono collegate all’abilità selezionata, rendendo visibili XP, statistiche e progresso.'
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
    title: 'Aiuta i tuoi figli a esercitarsi con metodo, obiettivi e progressi visibili',
    metaTitle: 'Family per genitori | Timer, obiettivi e statistiche | SkillQuest',
    metaDescription:
      'Con SkillQuest Family, i genitori possono avviare i timer per i figli, vedere le statistiche dei figli, impostare obiettivi settimanali e inviare complimenti.',
    summary:
      'Family offre ai genitori una struttura, senza togliere ai figli il controllo dei propri progressi. Timer, obiettivi, XP e complimenti rendono concreta la pratica.',
    cardSummary:
      'I genitori possono avviare i timer, vedere le statistiche dei figli, impostare obiettivi e sostenerli con feedback positivi.',
    primaryCta: 'Vedi Family',
    secondaryCta: 'Scarica l’app',
    sections: [
      {
        title: 'Vedi quando i tuoi figli si esercitano',
        body:
          'Con Family, i genitori possono vedere quali sessioni sono state avviate e come si sviluppa il progresso per abilità.',
        bullets: [
          'Consulta l’attività timer dei figli.',
          'Controlla statistiche dei figli per sessioni, minuti e XP.',
          'Parla dei progressi per abilità.',
          'Spazio familiare privato con ruoli per i genitori.'
        ]
      },
      {
        title: 'Avvia timer per i figli',
        body:
          'Genitori e proprietari possono avviare un timer per un figlio. La sessione viene collegata al figlio, così i suoi progressi restano visibili nel suo account.',
        bullets: [
          'Scegli un figlio e un’abilità dalla sezione Famiglia.',
          'Avvia una sessione di pratica quando serve un obiettivo chiaro.',
          'Collega minuti di concentrazione a XP e progresso.',
          'I figli vedono i timer avviati dai genitori.'
        ]
      },
      {
        title: 'Obiettivi da raggiungere insieme',
        body:
          'Family supporta obiettivi settimanali e complimenti, così il sostegno dei genitori non si riduce al semplice controllo.',
        bullets: [
          'Imposta obiettivi in minuti o sessioni.',
          'Invia complimenti per impegno e crescita.',
          'Offri alla famiglia un percorso chiaro da seguire.',
          'Family costa EUR 6.99 al mese o EUR 69.99 all’anno.'
        ]
      }
    ],
    faq: [
      {
        question: 'I genitori possono avviare timer per i figli?',
        answer:
          'Sì. Con Family, genitori e proprietari possono avviare i timer per i figli all’interno della sezione Famiglia.'
      },
      {
        question: 'Posso vedere i progressi di mio figlio?',
        answer:
          'Sì. Family include statistiche dei figli con sessioni, minuti, XP, suddivisione per abilità e attività recente.'
      },
      {
        question: 'Family è incluso in Premium?',
        answer:
          'No. Family è un abbonamento familiare separato con Premium più ruoli genitore, statistiche dei figli, timer per figli, obiettivi e complimenti.'
      },
      {
        question: 'SkillQuest è pensato per bambini piccoli?',
        answer:
          'SkillQuest è destinato a utenti dai 13 anni in su, anche con Family.'
      }
    ]
  },
  'skill-tracker': {
    ...pages.en['skill-tracker'],
    title: 'Monitora le abilità, non solo le attività',
    eyebrow: 'Tracciamento delle abilità',
    metaTitle: 'App per tracciare le abilità | XP, livelli e progresso | SkillQuest',
    metaDescription:
      'SkillQuest ti aiuta a tracciare le abilità: studio, sport, musica, lettura, programmazione, lavoro creativo e routine. Avvia i timer e segui XP, livelli e progressi.',
    summary:
      'SkillQuest ti aiuta a sviluppare abilità collegando tempo reale di pratica a progresso, XP, livelli e statistiche.',
    cardSummary:
      'Monitora abilità, XP, livelli, giorni attivi e tempo di concentrazione in un’app mobile.',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Vedi i timer di concentrazione',
    sections: [
      {
        title: 'Parti dall’abilità, non da un’attività generica',
        body:
          'SkillQuest orienta ogni sessione verso un’abilità, così lavoro, apprendimento e hobby diventano sviluppo visibile.',
        bullets: [
          'Usa abilità iniziali o crea abilità personalizzate.',
          'Monitora studio, sport, musica, lettura, programmazione e lavoro creativo.',
          'Combina timer con XP, livelli e giorni attivi.',
          'Vedi quali abilità ricevono davvero attenzione.'
        ]
      },
      {
        title: 'Gamification per praticare con costanza',
        body:
          'XP, livelli e giorni attivi rendono il progresso concreto, senza promettere risultati garantiti.',
        bullets: [
          'XP dopo le sessioni completate.',
          'Livelli come traguardi visibili.',
          'Giorni attivi per routine ricorrenti.',
          'Amici e sfide per motivazione extra.'
        ]
      },
      {
        title: 'Inizia gratis, passa a un piano superiore quando serve',
        body:
          'La Modalità ospite e le funzioni Free aiutano a iniziare. Premium e Family aggiungono più profondità quando SkillQuest entra nella tua routine.',
        bullets: [
          'Modalità ospite per iniziare subito.',
          'Premium per più libertà con i timer e le statistiche.',
          'Family per struttura genitore-figlio.',
          'Sincronizzazione rispettosa della privacy per gli account.'
        ]
      }
    ],
    faq: [
      {
        question: 'Quali abilità posso monitorare?',
        answer:
          'SkillQuest può essere usato per studio, lavoro, fitness, musica, lettura, programmazione, progetti creativi e routine personali.'
      },
      {
        question: 'Posso creare abilità personalizzate?',
        answer:
          'Sì. SkillQuest supporta abilità personalizzate, così l’app si adatta alla tua routine reale.'
      },
      {
        question: 'SkillQuest è un habit tracker?',
        answer:
          'SkillQuest si sovrappone in parte agli habit tracker, ma si concentra di più su abilità, tempo di concentrazione, XP, livelli e progresso misurabile.'
      }
    ]
  },
  'progress-statistics': {
    ...pages.en['progress-statistics'],
    title: 'Vedi i tuoi progressi con statistiche, XP e storico delle abilità',
    eyebrow: 'Monitoraggio dei progressi',
    metaTitle: 'Statistiche di progresso | Tracciamento abilità e XP | SkillQuest',
    metaDescription:
      'Consulta le statistiche di SkillQuest per giorno, settimana, mese e anno: XP, sessioni, minuti, suddivisione per abilità e statistiche dei figli con Family.',
    summary:
      'SkillQuest rende misurabile il tempo di pratica con statistiche, suddivisioni per abilità, XP, storico sessioni e progresso per periodo.',
    cardSummary:
      'Statistiche per minuti di concentrazione, sessioni, XP, abilità e progresso dei figli con Family.',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Confronta Premium',
    sections: [
      {
        title: 'Capisci dove va il tuo tempo',
        body:
          'Le statistiche ti aiutano a individuare schemi nel tempo di pratica e nella concentrazione per abilità, senza presentarli come risultati garantiti.',
        bullets: [
          'Vedi sessioni e minuti per periodo.',
          'Confronta abilità e attività.',
          'Usa XP e livelli come segnali di progresso.',
          'Controlla sessioni recenti e storico.'
        ]
      },
      {
        title: 'Analisi più approfondite con Premium',
        body:
          'Premium è pensato per chi vuole andare oltre le statistiche di base.',
        bullets: [
          'Statistiche e trend ampliati.',
          'Più storico per routine a lungo termine.',
          'Migliore visibilità sulle suddivisioni per abilità.'
        ]
      },
      {
        title: 'Rendi visibile il progresso dei figli con Family',
        body:
          'Con Family, i genitori possono rivedere i progressi dei figli e rendere più semplice parlare del tempo di pratica.',
        bullets: [
          'Statistiche dei figli con sessioni, minuti e XP.',
          'Attività timer per vedere quando inizia la pratica.',
          'Obiettivi e complimenti rendono il sostegno più concreto.',
          'Family è un abbonamento separato per famiglie.'
        ]
      }
    ],
    faq: [
      {
        question: 'Quali statistiche mostra SkillQuest?',
        answer:
          'SkillQuest mostra sessioni, minuti, XP, progresso per abilità e attività su diversi periodi.'
      },
      {
        question: 'Posso vedere trend a lungo termine?',
        answer:
          'Premium include statistiche ampliate e più storico. Controlla nell’app quali funzioni sono disponibili al momento.'
      },
      {
        question: 'I genitori possono vedere le statistiche dei figli?',
        answer:
          'Sì. Family include statistiche dei figli per genitori e proprietari nella sezione Famiglia.'
      }
    ]
  },
  'pomodoro-timer': {
    slug: 'pomodoro-timer',
    eyebrow: 'Timer Pomodoro',
    title: 'Un timer Pomodoro su misura per le tue abilità',
    metaTitle: 'Timer Pomodoro | Sessioni di studio e concentrazione | SkillQuest',
    metaDescription:
      'Timer Pomodoro gratuito per studiare e lavorare con concentrazione. Ogni sprint di 25 minuti ti fa guadagnare XP, salire di livello e crescere nelle tue abilità.',
    summary:
      'Il classico ritmo Pomodoro 25/5, integrato in SkillQuest in modo che ogni sprint ti faccia guadagnare XP, livelli e progressi per l\'abilità che stai esercitando.',
    cardSummary:
      'Il classico ritmo Pomodoro 25/5, legato a XP, livelli e progressi nelle abilità.',
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
        title: 'Ogni sprint conta per un\'abilità',
        body:
          'Un semplice timer Pomodoro misura soltanto il tempo. SkillQuest collega ogni sprint all’abilità che hai scelto, così la concentrazione si trasforma in un progresso tangibile.',
        bullets: [
          'Guadagna XP dopo ogni sessione Pomodoro completata.',
          'Guarda le sessioni raggruppate per abilità nelle tue statistiche.',
          'Accumula giorni attivi esercitandoti con regolarità.',
        ]
      },
      {
        title: 'Oltre il Pomodoro, quando ti serve qualcosa in più',
        body:
          'Alcune attività richiedono sessioni di concentrazione più lunghe o più flessibili rispetto ai 25 minuti. SkillQuest include altre tecniche a cui puoi passare senza uscire dall\'app.',
        bullets: [
          '"Deep Work" e "52-17" per le sessioni più lunghe.',
          '"Flowtime" e "Until Time" per durate flessibili.',
          'Con Premium sblocchi tutte le tecniche di timer.',
        ]
      },
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
          'Sì. Molti utenti tengono traccia delle sessioni di studio con Pomodoro, associando ogni sprint a un’abilità legata allo studio.'
      },
      {
        question: 'Cosa succede quando finisce una sessione Pomodoro?',
        answer:
          'La sessione viene aggiunta alle statistiche delle tue abilità e ti fa guadagnare XP, così il tempo che dedichi alla concentrazione si trasforma in progressi tangibili.'
      },
    ]
  },
  'active-days': {
    ...pages.en['active-days'],
    eyebrow: 'Giorni attivi',
    title: 'Giorni attivi: guarda con quanta regolarità ti eserciti',
    metaTitle: 'Giorni attivi | Scopri quanto spesso ti eserciti | SkillQuest',
    metaDescription:
      'SkillQuest conta i giorni attivi: ogni giorno con almeno 10 minuti di pratica. Un giorno saltato non costa nulla e il tuo totale non si azzera mai.',
    summary:
      'Un giorno conta come giorno attivo quando quel giorno ti eserciti per almeno 10 minuti in totale. Il tuo totale può solo salire, quindi un giorno saltato non ti costa nulla e la pratica regolare resta visibile.',
    cardSummary:
      'I giorni con almeno 10 minuti di pratica si sommano in un totale che non si azzera mai.',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Vedi i timer di concentrazione',
    sections: [
      {
        title: 'Cosa conta come giorno attivo',
        body:
          'Esercitati per almeno 10 minuti in totale in una giornata, con qualsiasi timer e qualsiasi abilità, e quel giorno conta come giorno attivo.',
        bullets: [
          'Ogni minuto intero di pratica vale 1 XP, quindi 10 minuti valgono 10 XP.',
          'Le sessioni più brevi della stessa giornata si sommano.',
          'Ogni giorno conta una volta sola, per quanto tempo tu ti eserciti.'
        ]
      },
      {
        title: 'Un giorno saltato non costa nulla',
        body:
          'I giorni attivi non devono essere consecutivi. Se salti un giorno, il tuo totale resta esattamente dov’era.',
        bullets: [
          'Il tuo totale può solo salire e non si azzera mai.',
          'Non c’è niente da proteggere e niente da perdere.',
          'Riprendi quando ti va.'
        ]
      },
      {
        title: 'Traguardi che mostrano la pratica regolare',
        body:
          'Nel corso di settimane e mesi, i giorni attivi mostrano quanto spesso ti sei davvero esercitato, non solo per quanto tempo.',
        bullets: [
          'Traguardi a 7, 30 e 100 giorni attivi, e oltre.',
          'Alcuni temi si sbloccano quando raggiungi un certo numero di giorni attivi.',
          'Sfida i tuoi amici in una Battaglia dei giorni attivi.'
        ]
      }
    ],
    faq: [
      {
        question: 'Che cos’è un giorno attivo in SkillQuest?',
        answer:
          'Un giorno in cui ti eserciti per almeno 10 minuti in totale con un timer. Ogni giorno conta una volta nel tuo totale.'
      },
      {
        question: 'Cosa succede se salto un giorno?',
        answer:
          'Niente. Un giorno saltato non ti toglie nulla: il tuo totale resta uguale e non si azzera mai.'
      },
      {
        question: 'I giorni attivi sono gratuiti?',
        answer:
          'Sì. Giorni attivi, XP, livelli e statistiche fanno parte dell’app gratuita.'
      }
    ]
  },
  'friends-challenges': {
    slug: 'friends-challenges',
    eyebrow: 'Amici e sfide',
    title: 'Rendi il progresso un po’ più social',
    metaTitle: 'Amici e sfide | Resta motivato e migliora le tue abilità | SkillQuest',
    metaDescription:
      'Aggiungi amici, partecipa alle sfide (Gara XP, Battaglia dei giorni attivi) e condividi i progressi come vuoi, con le impostazioni sulla privacy di SkillQuest.',
    summary:
      'Aggiungi amici, lancia delle sfide e trova qualcuno che ti sproni quando ne hai bisogno, con impostazioni sulla privacy che ti permettono di condividere solo come vuoi tu.',
    cardSummary:
      'Amici, sfide e un feed delle attività, con impostazioni sulla privacy che decidi tu.',
    screenshot: '06-social-family.png',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Come funzionano i giorni attivi',
    sections: [
      {
        title: 'Aggiungi amici per sentirti davvero coinvolto',
        body:
          'Se segui i tuoi progressi da solo, è facile lasciar perdere. Con gli amici su SkillQuest hai la spinta in più che arriva dalle persone che conosci davvero.',
        bullets: [
          'Invia e accetta richieste di amicizia direttamente dall\'app.',
          'Visualizza le statistiche dei tuoi amici se entrambi avete attivato la condivisione.',
          'Un’opzione per la privacy ti permette di gestire la condivisione come vuoi.',
        ]
      },
      {
        title: 'Sfide per raggiungere un obiettivo insieme',
        body:
          'Le sfide trasformano l\'allenamento individuale in uno sforzo collettivo, che si tratti di una Gara XP o di una Battaglia dei giorni attivi.',
        bullets: [
          'Avvia una Gara XP o una Battaglia dei giorni attivi con gli amici.',
          'Segui i progressi della sfida e le attività recenti insieme ai tuoi amici.',
          'Scopri chi è in testa senza perdere di vista i tuoi progressi.',
        ]
      },
      {
        title: 'Un feed delle attività che celebra i traguardi raggiunti',
        body:
          'I traguardi dei giorni attivi possono apparire come post di attività, così i tuoi progressi si notano senza finire su una bacheca pubblica.',
        bullets: [
          'Post automatici per traguardi come 7, 30 o 100 giorni di attività.',
          'La condivisione rispetta sempre la tua privacy e le tue impostazioni.',
          'Pensato per gli amici e i contatti approvati, non per una bacheca pubblica.',
        ]
      },
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
    title: 'Un timer per lo studio che non si limita a fare da cronometro',
    metaTitle: 'Timer per lo studio | Sessioni per materia | SkillQuest',
    metaDescription:
      'Usa SkillQuest come timer per studiare in vista di esami, compiti e ripassi. Tieni traccia del tempo dedicato allo studio per ogni materia con XP, livelli e statistiche.',
    summary:
      'Trasforma le sessioni di studio in progressi tangibili per ogni materia, grazie a timer di concentrazione, XP e statistiche pensate per lo studio ripetuto, non solo per un singolo conto alla rovescia.',
    cardSummary:
      'Sessioni di studio registrate per materia, con XP, livelli e statistiche.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Inizia a studiare con SkillQuest',
    secondaryCta: 'Confronta i timer di concentrazione',
    sections: [
      {
        title: 'Tieni traccia del tempo dedicato allo studio per materia, non solo del totale',
        body:
          'Considera ogni materia o esame come un’abilità a sé stante, così potrai vedere esattamente come si ripartisce il tempo dedicato allo studio, invece di avere solo un numero complessivo.',
        bullets: [
          'Crea un’abilità per materia, corso o esame.',
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
          'Sessioni più lunghe di Deep Work o Flowtime per le simulazioni d’esame.',
          'Pause intelligenti adatte alla tecnica che scegli.',
        ]
      },
      {
        title: 'Motivazione a lungo termine',
        body:
          'È più facile mantenere le abitudini di studio quando i progressi sono visibili, non solo intuibili.',
        bullets: [
          'I punti XP e i livelli per materia ti permettono di tenere sotto controllo i tuoi progressi.',
          'I giorni attivi mostrano con quanta regolarità studi.',
          'Le statistiche mostrano a quali materie stai dedicando attenzione e a quali no.',
        ]
      },
    ],
    faq: [
      {
        question: 'Posso tenere traccia del tempo dedicato allo studio per ogni materia?',
        answer:
          'Sì. Crea un\'abilità per ogni materia o esame, e SkillQuest tiene traccia del tempo, degli XP e delle statistiche separatamente per ciascuna di esse.'
      },
      {
        question: 'Qual è il timer migliore per studiare?',
        answer:
          'Il metodo Pomodoro funziona bene per le sessioni di ripasso veloci, mentre il Deep Work o il Flowtime sono più adatti a sessioni più lunghe di studio o di simulazioni d’esame.'
      },
      {
        question: 'Il timer per lo studio è gratuito?',
        answer:
          'Sì. Il monitoraggio delle abilità, il metodo Pomodoro, gli XP e i livelli sono disponibili anche nella versione gratuita.'
      },
    ]
  },
  'deep-work-flowtime': {
    slug: 'deep-work-flowtime',
    eyebrow: 'Deep Work & Flowtime',
    title: 'Blocchi di concentrazione più lunghi per il lavoro che richiede approfondimento',
    metaTitle: 'Timer Deep Work e Flowtime | Concentrazione Premium | SkillQuest',
    metaDescription:
      'Usa Deep Work, 52-17 e Flowtime su SkillQuest per sessioni di concentrazione più lunghe e senza interruzioni. Tecniche di timer Premium con durata personalizzabile.',
    summary:
      'Quando un’attività richiede uno sprint più lungo di 25 minuti, Deep Work, 52-17 e Flowtime ti offrono blocchi di concentrazione più lunghi e flessibili che continuano a contare ai fini degli XP e dei progressi.',
    cardSummary:
      'Deep Work, 52-17 e Flowtime per sessioni di concentrazione più lunghe e flessibili.',
    screenshot: '02-focus-timer.png',
    primaryCta: 'Confronta i piani Premium',
    secondaryCta: 'Vedi tutte le tecniche di timer',
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
        title: '52-17 per un ritmo strutturato su sessioni lunghe',
        body:
          '52 minuti di concentrazione seguiti da una pausa di 17 minuti: è un ritmo che si basa sui cicli naturali dell\'attenzione, utile per sessioni di lavoro o studio più lunghe.',
        bullets: [
          'Un rapporto fisso tra concentrazione e pausa, ispirato alla ricerca.',
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
        question: 'Queste tecniche di timer sono gratuite?',
        answer:
          'Deep Work, 52-17 e Flowtime fanno parte di Premium, insieme alle durate personalizzate dei timer e alle statistiche più approfondite.'
      },
    ]
  },
  themes: {
    slug: 'themes',
    eyebrow: 'Temi',
    title: 'Personalizza SkillQuest per renderla davvero tua',
    metaTitle: 'Temi e personalizzazione | Chiaro, scuro e sbloccabili | SkillQuest',
    metaDescription:
      'SkillQuest supporta la modalità chiara, scura e quella di sistema, oltre a temi sbloccabili legati ai tuoi progressi, così l\'app avrà proprio l\'aspetto che desideri.',
    summary:
      'La modalità chiara, quella scura, la modalità di sistema e una serie di temi sbloccabili ti permettono di personalizzare l\'aspetto e l\'esperienza di SkillQuest proprio come vuoi tu, con alcuni temi legati ai tuoi progressi.',
    cardSummary:
      'Modalità chiara, scura e di sistema, oltre ai temi che sblocchi man mano che progredisci.',
    screenshot: '07-themes-profile.png',
    primaryCta: 'Scarica SkillQuest',
    secondaryCta: 'Scopri come funzionano i giorni attivi',
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
          'Sblocca temi aggiuntivi continuando a progredire.',
          'I temi sbloccabili gratuitamente si affiancano alle opzioni del piano Premium.',
          'I temi si sbloccano raggiungendo livelli e traguardi di giorni attivi.',
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
    faq: [
      {
        question: 'SkillQuest supporta la modalità scura?',
        answer:
          'Sì. SkillQuest supporta la modalità chiara, la modalità scura e una modalità di sistema che si adatta alle impostazioni del tuo dispositivo.'
      },
      {
        question: 'Come faccio a sbloccare altri temi?',
        answer:
          'Alcuni temi si sbloccano con i tuoi progressi, ad esempio livelli e giorni attivi. Premium aggiunge temi extra.'
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
    eyebrow: 'Modalità ospite',
    title: 'Prova SkillQuest prima di creare un account',
    metaTitle: 'Modalità ospite | Prova SkillQuest senza account | SkillQuest',
    metaDescription:
      'La Modalità ospite di SkillQuest ti permette di tracciare le tue abilità, usare i timer di concentrazione e guadagnare XP in locale, prima di creare un account.',
    summary:
      'La Modalità ospite ti permette di saltare la fase di registrazione. Tieni traccia delle tue abilità, imposta i timer di concentrazione e guadagna XP direttamente sul tuo dispositivo, poi crea un account quando sei pronto.',
    cardSummary:
      'Prova le funzioni di monitoraggio delle abilità fondamentali e i timer di concentrazione in locale, prima di creare un account.',
    screenshot: '01-home-progress.png',
    primaryCta: 'Inizia come ospite',
    secondaryCta: 'Confronta i piani Free, Premium e Family',
    sections: [
      {
        title: 'Non serve un account per iniziare',
        body:
          'La Modalità ospite ti permette di aprire SkillQuest e iniziare subito a monitorare un’abilità, senza dover prima registrarti.',
        bullets: [
          'Il monitoraggio delle abilità principali, i timer di concentrazione, l\'XP e i livelli funzionano in Modalità ospite.',
          'I progressi vengono salvati localmente sul tuo dispositivo.',
          'Non serve né un indirizzo email né un account per provare l\'app.',
        ]
      },
      {
        title: 'Crea un account quando vuoi',
        body:
          'La Modalità ospite è un punto di partenza, non un vicolo cieco. Quando sarai pronto per la sincronizzazione, gli amici o le sfide, creando un account potrai portare avanti i tuoi progressi locali.',
        bullets: [
          'Passa a un account completo senza perdere i tuoi progressi locali.',
          'Sblocca la sincronizzazione tra dispositivi, gli amici e le sfide.',
          'Non c\'è alcuna fretta di decidere prima di aver provato l\'app.',
        ]
      },
      {
        title: 'Cosa rimane limitato nella Modalità ospite',
        body:
          'Alcune funzioni sono per loro natura legate all\'account, dato che coinvolgono altre persone o la sincronizzazione tra dispositivi.',
        bullets: [
          'Per gli amici e le sfide serve un account.',
          'Per usare le funzioni Family servono un account e un gruppo Family.',
          'I progressi salvati solo in locale non vengono sottoposti a backup finché non crei un account.',
        ]
      },
    ],
    faq: [
      {
        question: 'Devo avere un account per usare SkillQuest?',
        answer:
          'No. La Modalità ospite ti permette di usare le funzioni principali di monitoraggio delle abilità e i timer di concentrazione senza creare un account.'
      },
      {
        question: 'Cosa succede ai miei progressi se creo un account più avanti?',
        answer:
          'Se passi dalla Modalità ospite, i tuoi progressi locali verranno trasferiti nel tuo nuovo account.'
      },
      {
        question: 'Cosa non posso fare in Modalità ospite?',
        answer:
          'Le funzioni "Amici", "Sfide" e "Family" richiedono un account, poiché prevedono la sincronizzazione con altre persone.'
      },
    ]
  },
};

export function getFeatureLandingOverview(locale: Locale): FeatureOverviewCopy {
  return featureOverviewCopy[locale] ?? featureOverviewCopy.en;
}

/** The locales a guide exists in. hreflang, the sitemap and static params follow this. */
export function featureLandingLocales(slug: FeatureLandingSlug): readonly Locale[] {
  return isEnglishOnlySlug(slug) ? englishOnlyLocales : routing.locales;
}

/** The guides that exist in this locale, in display order. */
export function getFeatureLandingSlugs(locale: Locale): FeatureLandingSlug[] {
  return featureLandingSlugs.filter((slug) => featureLandingLocales(slug).includes(locale));
}

/** Every locale/slug pair that has a page, for generateStaticParams. */
export function featureLandingStaticParams(): Array<{locale: Locale; slug: FeatureLandingSlug}> {
  return routing.locales.flatMap((locale) =>
    getFeatureLandingSlugs(locale).map((slug) => ({locale, slug}))
  );
}

export function getFeatureLandingPages(locale: Locale): FeatureLandingPage[] {
  return getFeatureLandingSlugs(locale).flatMap((slug) => {
    const page = getFeatureLandingPage(locale, slug);
    return page ? [page] : [];
  });
}

export function getFeaturedFeatureLandingPages(locale: Locale): FeatureLandingPage[] {
  const localizedPages = pages[locale] ?? pages.en;
  return featuredFeatureLandingSlugs.map((slug) => localizedPages[slug]);
}

/** The guide for this locale and slug, or null when it does not exist in this locale. */
export function getFeatureLandingPage(
  locale: Locale,
  slug: string
): FeatureLandingPage | null {
  if (isEnglishOnlySlug(slug)) {
    return englishOnlyLocales.includes(locale) ? englishOnlyPages[slug] : null;
  }

  if (!isTranslatedSlug(slug)) {
    return null;
  }

  const localizedPages = pages[locale] ?? pages.en;
  return localizedPages[slug] ?? pages.en[slug];
}
