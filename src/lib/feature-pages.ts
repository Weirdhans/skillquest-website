import type {Locale, ScreenshotName} from '@/lib/marketing';

export const featureLandingSlugs = [
  'focus-timer',
  'family',
  'skill-tracker',
  'progress-statistics'
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
  }
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
  }
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
  }
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
