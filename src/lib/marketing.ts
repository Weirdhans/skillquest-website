import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';

export type Locale = (typeof routing.locales)[number];

export const SITE_URL = 'https://www.skill-quest.app';
export const SUPPORT_EMAIL = 'hello@skill-quest.app';
export const APP_STORE_URL =
  'https://apps.apple.com/us/app/skillquest-skill-tracker/id6755604671?uo=4';
export const ANDROID_ALPHA_JOIN_URL =
  'https://play.google.com/apps/testing/com.skillquest.app';
export const ANDROID_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.skillquest.app';
// Testers must be added to the Play Console tester list before
// ANDROID_ALPHA_JOIN_URL works for them, so every "join the alpha" CTA
// routes here first instead of straight to Google Play.
export const ANDROID_SIGNUP_URL = '/download?platform=android#android-alpha';

export const PRICING = {
  premiumMonthly: '€3.99',
  premiumYearly: '€39.99',
  familyMonthly: '€6.99',
  familyYearly: '€69.99'
} as const;

const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano'
};

const localeToOg: Record<Locale, string> = {
  nl: 'nl_NL',
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',
  it: 'it_IT'
};

const languageTags: Record<Locale, string> = {
  nl: 'nl-NL',
  en: 'en-US',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  it: 'it-IT'
};

export const screenshotNames = [
  '01-home-progress.png',
  '02-focus-timer.png',
  '03-session-reward.png',
  '04-statistics.png',
  '05-rankings.png',
  '06-social-family.png',
  '07-themes-profile.png'
] as const;

export type ScreenshotName = (typeof screenshotNames)[number];

export function screenshotPath(locale: string, name: ScreenshotName) {
  const safeLocale = isLocale(locale) ? locale : routing.defaultLocale;
  return `/screenshots/${safeLocale}/${name}`;
}

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export function getMarketingCopy(locale: string): MarketingCopy {
  return marketingCopy[
    isLocale(locale) ? locale : routing.defaultLocale
  ] as MarketingCopy;
}

export function localizedPath(locale: Locale, path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
}

export function alternateLanguages(path = '') {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [
        languageTags[locale],
        localizedPath(locale, path)
      ])
    ),
    'x-default': localizedPath(routing.defaultLocale, path)
  };
}

export function createPageMetadata({
  locale,
  path = '',
  title,
  description
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const canonical = localizedPath(locale, path);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: alternateLanguages(path)
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SkillQuest',
      locale: localeToOg[locale],
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => localeToOg[item]),
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og/skillquest-og.png`,
          width: 1024,
          height: 500,
          alt: 'SkillQuest app preview'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og/skillquest-og.png`]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function softwareApplicationJsonLd(locale: Locale) {
  const copy = getMarketingCopy(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SkillQuest - Skill Tracker',
    alternateName: 'SkillQuest',
    description: copy.meta.description,
    url: localizedPath(locale),
    image: `${SITE_URL}/og/skillquest-og.png`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, Android',
    inLanguage: languageTags[locale],
    offers: [
      {
        '@type': 'Offer',
        name: 'Free download',
        price: '0',
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        name: 'Premium monthly',
        price: '3.99',
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        name: 'Premium yearly',
        price: '39.99',
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        name: 'Family monthly',
        price: '6.99',
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        name: 'Family yearly',
        price: '69.99',
        priceCurrency: 'EUR'
      }
    ],
    downloadUrl: APP_STORE_URL,
    sameAs: [APP_STORE_URL, ANDROID_ALPHA_JOIN_URL]
  };
}

export function faqJsonLd(items: ReadonlyArray<{question: string; answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export const marketingCopy = {
  en: {
    localeName: localeNames.en,
    meta: {
      title: 'SkillQuest | Build Skills With Focus Timers, XP, and Family Tools',
      description:
        'SkillQuest helps self-improvement users and families build skills with focus timers, XP, statistics, friends, challenges, and privacy-first sync.'
    },
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      download: 'Download',
      support: 'Support',
      cta: 'Get the app'
    },
    hero: {
      eyebrow: 'Live on the App Store. Android alpha on Google Play.',
      title: 'SkillQuest',
      subtitle:
        'Build skills with focus timers, XP, levels, statistics, friends, challenges, and family tools. Start for free and turn every focused minute into visible progress.',
      primaryCta: 'Download on the App Store',
      secondaryCta: 'Join Android alpha',
      tertiaryCta: 'Compare pricing',
      trust: ['Free to start', 'No ads', 'Privacy-first sync']
    },
    audiences: {
      heading: 'One skill tracker for personal growth and guided family practice',
      items: [
        {
          title: 'For self-improvement',
          body:
            'Track study, training, creative work, reading, coding, music practice, and any habit you want to strengthen.'
        },
        {
          title: 'For parents',
          body:
            'Create structure around practice time, support children with timers, and keep progress visible without turning it into pressure.'
        }
      ]
    },
    familySupport: {
      badge: 'Family subscription',
      heading: 'Give children structure without taking over their progress',
      body:
        'With the Family plan, parents can see when a child starts focus timers and can start timers for children when it is time to practice. That gives families a shared rhythm: the child knows what to work on, and parents can support the routine without guessing.',
      items: [
        {
          title: 'See timer activity',
          body:
            'Follow when practice sessions are started, so conversations about school, sports, music, or creative work are based on visible effort.'
        },
        {
          title: 'Start timers for children',
          body:
            'Help a child begin a focused session from the family setup, turning practice time into a clear next step.'
        },
        {
          title: 'Work toward a goal',
          body:
            'XP, levels, and skill progress turn repeated practice into something parents and children can review together.'
        },
        {
          title: 'Included in Family',
          body:
            `These parent-child tools are part of the Family subscription at ${PRICING.familyMonthly}/month or ${PRICING.familyYearly}/year.`
        }
      ],
      note:
        'Family features require a Family subscription and are designed to create guidance, structure, and shared motivation.',
      cta: 'View Family plan',
      imageAlt: 'SkillQuest family and social tools screenshot'
    },
    product: {
      heading: 'Real progress, not another vague habit list',
      body:
        'SkillQuest connects timers, skills, XP, streaks, stats, friends, rankings, and family features in one focused mobile app.',
      captions: [
        'Build every skill',
        'Focus with timers',
        'Earn XP daily',
        'See your progress',
        'Climb the rankings',
        'Grow together',
        'Make it yours'
      ]
    },
    benefits: {
      heading: 'What users come back for',
      items: [
        {
          title: 'Focus timers for skills',
          body:
            'Start a session for the skill you are building and keep the effort tied to real progress.'
        },
        {
          title: 'XP, levels, and streaks',
          body:
            'Make progress visible after every session with rewards that reinforce consistency.'
        },
        {
          title: 'Statistics by skill',
          body:
            'Review time, sessions, and growth by day, week, month, and year.'
        },
        {
          title: 'Social and family motivation',
          body:
            'Use friends, challenges, leaderboards, and family tools when accountability helps.'
        },
        {
          title: 'Themes and personalization',
          body:
            'Customize the experience while keeping the core workflow simple and repeatable.'
        },
        {
          title: 'Guest Mode',
          body:
            'Try the app immediately before creating an account or syncing progress.'
        }
      ]
    },
    pricingPreview: {
      heading: 'Simple subscription choices',
      body:
        `Premium is ${PRICING.premiumMonthly}/month or ${PRICING.premiumYearly}/year. Family is ${PRICING.familyMonthly}/month or ${PRICING.familyYearly}/year.`,
      cta: 'See plans'
    },
    trust: {
      heading: 'Built for trust before scale',
      items: [
        'Store and release information is kept factual and current.',
        'App Store is live. Android is clearly marked as alpha/closed testing.',
        'Support is available at hello@skill-quest.app.',
        'Account deletion and privacy pages are linked from every locale.'
      ]
    },
    lead: {
      badge: 'Product updates',
      heading: 'Get Android alpha and feature updates',
      subheading:
        'Leave your email for SkillQuest updates. Choose Android to join the waitlist for our Google Play closed test.',
      platformQuestion: 'Which updates do you want?',
      platforms: {
        ios: 'iOS',
        android: 'Android',
        both: 'Both'
      },
      placeholder: 'you@example.com',
      submit: 'Keep me updated',
      submitting: 'Submitting...',
      submitted: 'Signed up',
      success: 'Check your inbox for the confirmation link.',
      duplicate: 'You are already on the list.',
      pendingVerification: 'You signed up earlier but have not confirmed yet.',
      resendLink: 'Resend verification email',
      error: 'Something went wrong. Please try again.',
      gmailHint:
        "Use the Google account email you'll install SkillQuest with — that's the address we add to the Play Console tester list.",
      privacy: 'No spam. Unsubscribe anytime.'
    },
    finalCta: {
      heading: 'Start building the skills you keep meaning to practice',
      body:
        'Download SkillQuest on the App Store or join the Android alpha through Google Play closed testing.',
      primary: 'Download on the App Store',
      secondary: 'Join Android alpha'
    },
    footer: {
      description:
        'SkillQuest helps people and families turn focused practice into visible skill growth.',
      product: 'Product',
      resources: 'Resources',
      legal: 'Legal',
      download: 'Download',
      features: 'Features',
      pricing: 'Pricing',
      support: 'Support',
      privacy: 'Privacy Policy',
      deleteAccount: 'Account deletion',
      changePassword: 'Change password'
    },
    download: {
      metaTitle: 'Download SkillQuest | App Store and Android Alpha',
      metaDescription:
        'Download SkillQuest on the App Store or join the Android closed test on Google Play.',
      title: 'Download SkillQuest',
      subtitle:
        'SkillQuest is live on the App Store. Android is currently available through Google Play closed testing.',
      iosTitle: 'iPhone and iPad',
      iosStatus: 'Available now on the App Store',
      iosBody:
        'Download the live iOS release and start tracking skills, timers, XP, stats, friends, and family tools.',
      iosCta: 'Open App Store',
      androidTitle: 'Android',
      androidStatus: 'Alpha / closed testing',
      androidBody:
        "Sign up below with the Google account email you use on Android. Once we add you to the Google Play tester list, we'll email you the install link.",
      androidCta: 'Join Android alpha',
      testerNote:
        "We add new testers in batches. You'll get an email as soon as you can install — open it with the same Google account you signed up with.",
      androidAlreadyAdded: 'Already accepted as a tester? Open the Play Store test page.',
      screenshotsHeading: 'See the app before you install',
      screenshotsBody:
        'These screenshots are generated from the real SkillQuest app using clean demo data.',
      finalHeading: 'Choose your platform',
      finalBody:
        'iOS users can install now. Android users can join the alpha and install through Google Play once accepted.'
    },
    pricing: {
      metaTitle: 'SkillQuest Pricing | Premium and Family Plans',
      metaDescription:
        'Compare Free, Premium, and Family pricing for SkillQuest. Premium is €3.99/month or €39.99/year. Family is €6.99/month or €69.99/year.',
      title: 'SkillQuest pricing',
      subtitle:
        'Start free. Upgrade when deeper statistics, more freedom, or family tools become worth paying for.',
      billingNote: 'Subscriptions are managed through the App Store or Google Play.',
      plans: [
        {
          name: 'Free',
          price: '€0',
          cadence: 'Start immediately',
          description:
            'Try SkillQuest with Guest Mode and core skill tracking before you subscribe.',
          features: ['Focus timers', '78 skills', 'XP and levels', 'Guest Mode']
        },
        {
          name: 'Premium',
          price: `${PRICING.premiumMonthly}/month`,
          cadence: `${PRICING.premiumYearly}/year`,
          description:
            'For users who want more freedom, expanded statistics, extra themes, and advanced features.',
          features: [
            'Unlimited skill growth',
            'Expanded statistics',
            'Extra themes',
            'Advanced timer features'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICING.familyMonthly}/month`,
          cadence: `${PRICING.familyYearly}/year`,
          description:
            'For parents who want Premium plus family structure, child statistics, timer support, goals, and compliments.',
          features: [
            'Family management',
            'View child timer activity and stats',
            'Start timers for children',
            'Shared goals and compliments',
            'Premium features for the household'
          ]
        }
      ],
      faq: [
        {
          question: 'Can I start without paying?',
          answer:
            'Yes. SkillQuest includes a free start with Guest Mode and core skill tracking.'
        },
        {
          question: 'What are the final subscription prices?',
          answer:
            'Premium is €3.99 per month or €39.99 per year. Family is €6.99 per month or €69.99 per year.'
        },
        {
          question: 'How do I cancel?',
          answer:
            'Subscriptions are managed by the App Store or Google Play. You can cancel through the store account that started the subscription.'
        }
      ]
    },
    featuresPage: {
      metaTitle: 'SkillQuest Features | Focus Timers, XP, Stats, Friends, Family',
      metaDescription:
        'Explore SkillQuest features for skill tracking, focus timers, XP, levels, statistics, leaderboards, friends, family tools, Guest Mode, and privacy-first sync.',
      title: 'Features that turn practice into progress',
      subtitle:
        'SkillQuest is built around the loop that matters: choose a skill, focus, earn XP, review progress, and come back tomorrow.',
      sections: [
        {
          title: 'Track any skill',
          body:
            'Use SkillQuest for studying, sports, music practice, reading, coding, creative work, or habits you want to strengthen.'
        },
        {
          title: 'Focus timers',
          body:
            'Use timer techniques like Pomodoro, Deep Work, Flowtime, 52-17, custom sessions, and EMOM where supported by the app.'
        },
        {
          title: 'Progress you can inspect',
          body:
            'XP, levels, streaks, session history, and charts show what you actually practiced.'
        },
        {
          title: 'Motivation with boundaries',
          body:
            'Friends, challenges, rankings, and Family tools add accountability without replacing the real work.'
        },
        {
          title: 'Parent-guided practice',
          body:
            'With Family, parents can see when children start timers, start timers for them, and help turn practice into a clear goal.'
        }
      ]
    }
  },
  nl: {
    localeName: localeNames.nl,
    meta: {
      title: 'SkillQuest | Bouw vaardigheden met focus timers, XP en familie-tools',
      description:
        'SkillQuest helpt gebruikers en gezinnen vaardigheden op te bouwen met focus timers, XP, statistieken, vrienden, challenges en privacygerichte synchronisatie.'
    },
    nav: {
      features: 'Functies',
      pricing: 'Prijzen',
      download: 'Download',
      support: 'Support',
      cta: 'Download de app'
    },
    hero: {
      eyebrow: 'Live in de App Store. Android alpha via Google Play.',
      title: 'SkillQuest',
      subtitle:
        'Bouw vaardigheden met focus timers, XP, levels, statistieken, vrienden, challenges en familie-tools. Start gratis en maak elke focusminuut zichtbaar.',
      primaryCta: 'Download in de App Store',
      secondaryCta: 'Doe mee met Android alpha',
      tertiaryCta: 'Vergelijk prijzen',
      trust: ['Gratis starten', 'Geen advertenties', 'Privacygerichte sync']
    },
    audiences: {
      heading: 'Een skill tracker voor persoonlijke groei en begeleide gezinspraktijk',
      items: [
        {
          title: 'Voor persoonlijke groei',
          body:
            'Track studie, training, creatief werk, lezen, programmeren, muziek oefenen en elke gewoonte die je wilt versterken.'
        },
        {
          title: 'Voor ouders',
          body:
            'Breng structuur in oefentijd, ondersteun kinderen met timers en maak voortgang zichtbaar zonder extra druk.'
        }
      ]
    },
    familySupport: {
      badge: 'Family abonnement',
      heading: 'Geef kinderen structuur zonder hun voortgang over te nemen',
      body:
        'Met het Family abonnement kunnen ouders zien wanneer een kind focus timers start en zelf timers starten voor kinderen wanneer het tijd is om te oefenen. Zo krijgt het gezin een gedeeld ritme: het kind weet waar het aan werkt en ouders kunnen de routine ondersteunen zonder te hoeven gokken.',
      items: [
        {
          title: 'Bekijk timeractiviteit',
          body:
            'Zie wanneer oefensessies worden gestart, zodat gesprekken over school, sport, muziek of creatief werk gebaseerd zijn op zichtbare inzet.'
        },
        {
          title: 'Start timers voor kinderen',
          body:
            'Help een kind een gefocuste sessie beginnen vanuit de familieomgeving, zodat oefentijd een duidelijke volgende stap wordt.'
        },
        {
          title: 'Werk naar een doel',
          body:
            'XP, levels en skillvoortgang maken herhaald oefenen zichtbaar voor ouder en kind.'
        },
        {
          title: 'Onderdeel van Family',
          body:
            `Deze ouder-kind functies horen bij het Family abonnement van ${PRICING.familyMonthly}/maand of ${PRICING.familyYearly}/jaar.`
        }
      ],
      note:
        'Familiefuncties vereisen een Family abonnement en zijn bedoeld voor houvast, structuur en gedeelde motivatie.',
      cta: 'Bekijk Family',
      imageAlt: 'SkillQuest familie- en sociale tools screenshot'
    },
    product: {
      heading: 'Echte voortgang, geen vage gewoontelijst',
      body:
        'SkillQuest combineert timers, skills, XP, streaks, statistieken, vrienden, rankings en familie-tools in één gerichte mobiele app.',
      captions: [
        'Bouw elke skill',
        'Focus met timers',
        'Verdien dagelijks XP',
        'Bekijk je voortgang',
        'Klim in rankings',
        'Groei samen',
        'Maak het persoonlijk'
      ]
    },
    benefits: {
      heading: 'Waarom gebruikers terugkomen',
      items: [
        {
          title: 'Focus timers per skill',
          body:
            'Start een sessie voor de vaardigheid waaraan je werkt en koppel inzet aan echte voortgang.'
        },
        {
          title: 'XP, levels en streaks',
          body:
            'Maak voortgang zichtbaar na elke sessie met beloningen die consistentie versterken.'
        },
        {
          title: 'Statistieken per skill',
          body:
            'Bekijk tijd, sessies en groei per dag, week, maand en jaar.'
        },
        {
          title: 'Sociale en familie-motivatie',
          body:
            'Gebruik vrienden, challenges, leaderboards en familie-tools wanneer accountability helpt.'
        },
        {
          title: 'Thema’s en personalisatie',
          body:
            'Pas de ervaring aan terwijl de kernflow simpel en herhaalbaar blijft.'
        },
        {
          title: 'Guest Mode',
          body:
            'Probeer de app direct voordat je een account maakt of voortgang synchroniseert.'
        }
      ]
    },
    pricingPreview: {
      heading: 'Eenvoudige abonnementen',
      body:
        `Premium is ${PRICING.premiumMonthly}/maand of ${PRICING.premiumYearly}/jaar. Family is ${PRICING.familyMonthly}/maand of ${PRICING.familyYearly}/jaar.`,
      cta: 'Bekijk plannen'
    },
    trust: {
      heading: 'Gebouwd voor vertrouwen',
      items: [
        'Store- en release-informatie blijft feitelijk en actueel.',
        'App Store is live. Android staat duidelijk als alpha/closed testing.',
        'Support is bereikbaar via hello@skill-quest.app.',
        'Privacy en accountverwijdering zijn in elke taal gelinkt.'
      ]
    },
    lead: {
      badge: 'Productupdates',
      heading: 'Ontvang Android alpha- en feature-updates',
      subheading:
        'Laat je e-mail achter voor SkillQuest-updates. Kies Android om je aan te melden voor de wachtlijst van onze Google Play closed test.',
      platformQuestion: 'Welke updates wil je ontvangen?',
      platforms: {
        ios: 'iOS',
        android: 'Android',
        both: 'Beide'
      },
      placeholder: 'jij@voorbeeld.nl',
      submit: 'Houd me op de hoogte',
      submitting: 'Versturen...',
      submitted: 'Aangemeld',
      success: 'Check je inbox voor de bevestigingslink.',
      duplicate: 'Je staat al op de lijst.',
      pendingVerification: 'Je hebt je eerder aangemeld maar nog niet bevestigd.',
      resendLink: 'Verificatiemail opnieuw sturen',
      error: 'Er ging iets mis. Probeer het opnieuw.',
      gmailHint:
        'Gebruik het Google-account e-mailadres waarmee je SkillQuest op Android gaat installeren — dat adres voegen we toe aan de Play Console tester-lijst.',
      privacy: 'Geen spam. Uitschrijven kan altijd.'
    },
    finalCta: {
      heading: 'Begin met de skills die je steeds wilt oefenen',
      body:
        'Download SkillQuest in de App Store of doe mee met de Android alpha via Google Play closed testing.',
      primary: 'Download in de App Store',
      secondary: 'Doe mee met Android alpha'
    },
    footer: {
      description:
        'SkillQuest helpt mensen en gezinnen om gefocuste oefentijd om te zetten in zichtbare skillgroei.',
      product: 'Product',
      resources: 'Bronnen',
      legal: 'Juridisch',
      download: 'Download',
      features: 'Functies',
      pricing: 'Prijzen',
      support: 'Support',
      privacy: 'Privacybeleid',
      deleteAccount: 'Account verwijderen',
      changePassword: 'Wachtwoord wijzigen'
    },
    download: {
      metaTitle: 'Download SkillQuest | App Store en Android Alpha',
      metaDescription:
        'Download SkillQuest in de App Store of doe mee met de Android closed test via Google Play.',
      title: 'Download SkillQuest',
      subtitle:
        'SkillQuest is live in de App Store. Android is nu beschikbaar via Google Play closed testing.',
      iosTitle: 'iPhone en iPad',
      iosStatus: 'Nu beschikbaar in de App Store',
      iosBody:
        'Download de live iOS-release en start met skills, timers, XP, statistieken, vrienden en familie-tools.',
      iosCta: 'Open App Store',
      androidTitle: 'Android',
      androidStatus: 'Alpha / closed testing',
      androidBody:
        'Meld je hieronder aan met het Google-account e-mailadres dat je op Android gebruikt. Zodra we je hebben toegevoegd aan de Google Play tester-lijst, sturen we je een e-mail met de installatielink.',
      androidCta: 'Doe mee met Android alpha',
      testerNote:
        'We voegen nieuwe testers in batches toe. Zodra je kunt installeren ontvang je een e-mail — open die met hetzelfde Google-account waarmee je je hebt aangemeld.',
      androidAlreadyAdded: 'Al geaccepteerd als tester? Open de Play Store testpagina.',
      screenshotsHeading: 'Bekijk de app voordat je installeert',
      screenshotsBody:
        'Deze screenshots komen uit de echte SkillQuest app met schone demodata.',
      finalHeading: 'Kies je platform',
      finalBody:
        'iOS-gebruikers kunnen nu installeren. Android-gebruikers kunnen de alpha joinen en daarna installeren via Google Play.'
    },
    pricing: {
      metaTitle: 'SkillQuest Prijzen | Premium en Family',
      metaDescription:
        'Vergelijk Free, Premium en Family voor SkillQuest. Premium is €3.99/maand of €39.99/jaar. Family is €6.99/maand of €69.99/jaar.',
      title: 'SkillQuest prijzen',
      subtitle:
        'Start gratis. Upgrade wanneer diepere statistieken, meer vrijheid of familie-tools de moeite waard zijn.',
      billingNote: 'Abonnementen worden beheerd via de App Store of Google Play.',
      plans: [
        {
          name: 'Free',
          price: '€0',
          cadence: 'Direct starten',
          description:
            'Probeer SkillQuest met Guest Mode en basis skill tracking voordat je betaalt.',
          features: ['Focus timers', '78 skills', 'XP en levels', 'Guest Mode']
        },
        {
          name: 'Premium',
          price: `${PRICING.premiumMonthly}/maand`,
          cadence: `${PRICING.premiumYearly}/jaar`,
          description:
            'Voor gebruikers die meer vrijheid, uitgebreidere statistieken, extra thema’s en geavanceerde functies willen.',
          features: [
            'Onbeperkte skillgroei',
            'Uitgebreidere statistieken',
            'Extra thema’s',
            'Geavanceerde timerfuncties'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICING.familyMonthly}/maand`,
          cadence: `${PRICING.familyYearly}/jaar`,
          description:
            'Voor ouders die Premium willen combineren met gezinsstructuur, kindstatistieken, timerondersteuning, doelen en complimenten.',
          features: [
            'Familiebeheer',
            'Bekijk timeractiviteit en statistieken van kinderen',
            'Start timers voor kinderen',
            'Gedeelde doelen en complimenten',
            'Premium functies voor het huishouden'
          ]
        }
      ],
      faq: [
        {
          question: 'Kan ik gratis starten?',
          answer:
            'Ja. SkillQuest bevat een gratis start met Guest Mode en basis skill tracking.'
        },
        {
          question: 'Wat zijn de definitieve abonnementstarieven?',
          answer:
            'Premium is €3.99 per maand of €39.99 per jaar. Family is €6.99 per maand of €69.99 per jaar.'
        },
        {
          question: 'Hoe annuleer ik?',
          answer:
            'Abonnementen worden beheerd door de App Store of Google Play. Annuleren doe je via het store-account waarmee het abonnement is gestart.'
        }
      ]
    },
    featuresPage: {
      metaTitle: 'SkillQuest Functies | Focus timers, XP, statistieken, vrienden, familie',
      metaDescription:
        'Ontdek SkillQuest functies voor skill tracking, focus timers, XP, levels, statistieken, leaderboards, vrienden, familie-tools, Guest Mode en privacygerichte sync.',
      title: 'Functies die oefenen omzetten in voortgang',
      subtitle:
        'SkillQuest draait om de loop die telt: kies een skill, focus, verdien XP, bekijk voortgang en kom morgen terug.',
      sections: [
        {
          title: 'Track elke skill',
          body:
            'Gebruik SkillQuest voor studie, sport, muziek, lezen, programmeren, creatief werk of gewoontes die je wilt versterken.'
        },
        {
          title: 'Focus timers',
          body:
            'Gebruik timertechnieken zoals Pomodoro, Deep Work, Flowtime, 52-17, custom sessies en EMOM waar de app dat ondersteunt.'
        },
        {
          title: 'Voortgang die je kunt inspecteren',
          body:
            'XP, levels, streaks, sessiegeschiedenis en grafieken laten zien wat je echt hebt geoefend.'
        },
        {
          title: 'Motivatie met grenzen',
          body:
            'Vrienden, challenges, rankings en Family tools voegen accountability toe zonder het echte werk te vervangen.'
        },
        {
          title: 'Ouderbegeleide oefentijd',
          body:
            'Met Family kunnen ouders zien wanneer kinderen timers starten, timers voor hen starten en oefentijd koppelen aan een duidelijk doel.'
        }
      ]
    }
  },
  de: {
    localeName: localeNames.de,
    meta: {
      title: 'SkillQuest | Skills mit Fokus-Timern, XP und Familienfunktionen aufbauen',
      description:
        'SkillQuest hilft Nutzern und Familien, Skills mit Fokus-Timern, XP, Statistiken, Freunden, Challenges und datenschutzorientierter Synchronisierung aufzubauen.'
    },
    nav: {
      features: 'Funktionen',
      pricing: 'Preise',
      download: 'Download',
      support: 'Support',
      cta: 'App laden'
    },
    hero: {
      eyebrow: 'Live im App Store. Android Alpha über Google Play.',
      title: 'SkillQuest',
      subtitle:
        'Baue Skills mit Fokus-Timern, XP, Levels, Statistiken, Freunden, Challenges und Familienfunktionen auf. Starte kostenlos und mache jede Fokusminute sichtbar.',
      primaryCta: 'Im App Store laden',
      secondaryCta: 'Android Alpha beitreten',
      tertiaryCta: 'Preise vergleichen',
      trust: ['Kostenlos starten', 'Keine Werbung', 'Datenschutzorientierte Sync']
    },
    audiences: {
      heading: 'Ein Skill Tracker für persönliche Entwicklung und begleitete Familienpraxis',
      items: [
        {
          title: 'Für persönliche Entwicklung',
          body:
            'Tracke Lernen, Training, kreative Arbeit, Lesen, Programmieren, Musikübung und jede Gewohnheit, die du stärken willst.'
        },
        {
          title: 'Für Eltern',
          body:
            'Gib Übungszeit Struktur, unterstütze Kinder mit Timern und mache Fortschritt sichtbar, ohne zusätzlichen Druck zu erzeugen.'
        }
      ]
    },
    familySupport: {
      badge: 'Family Abo',
      heading: 'Gib Kindern Struktur, ohne ihren Fortschritt zu übernehmen',
      body:
        'Mit dem Family Abo können Eltern sehen, wann ein Kind Fokus-Timer startet, und Timer für Kinder starten, wenn Übungszeit ist. So bekommt die Familie einen gemeinsamen Rhythmus: Das Kind weiß, woran es arbeitet, und Eltern können die Routine unterstützen, ohne zu raten.',
      items: [
        {
          title: 'Timeraktivität sehen',
          body:
            'Sieh, wann Übungssessions gestartet werden, damit Gespräche über Schule, Sport, Musik oder kreative Arbeit auf sichtbarem Einsatz basieren.'
        },
        {
          title: 'Timer für Kinder starten',
          body:
            'Hilf einem Kind, aus der Familienumgebung heraus eine fokussierte Session zu beginnen und Übungszeit in einen klaren nächsten Schritt zu verwandeln.'
        },
        {
          title: 'Auf ein Ziel hinarbeiten',
          body:
            'XP, Levels und Skillfortschritt machen regelmäßiges Üben für Eltern und Kinder gemeinsam sichtbar.'
        },
        {
          title: 'In Family enthalten',
          body:
            `Diese Eltern-Kind-Funktionen gehören zum Family Abo für ${PRICING.familyMonthly}/Monat oder ${PRICING.familyYearly}/Jahr.`
        }
      ],
      note:
        'Familienfunktionen erfordern ein Family Abo und sind für Orientierung, Struktur und gemeinsame Motivation gedacht.',
      cta: 'Family ansehen',
      imageAlt: 'SkillQuest Screenshot mit Familien- und Sozialfunktionen'
    },
    product: {
      heading: 'Echter Fortschritt statt vager Gewohnheitsliste',
      body:
        'SkillQuest verbindet Timer, Skills, XP, Streaks, Statistiken, Freunde, Rankings und Familienfunktionen in einer fokussierten mobilen App.',
      captions: [
        'Jeden Skill aufbauen',
        'Mit Timern fokussieren',
        'Täglich XP sammeln',
        'Fortschritt sehen',
        'Rankings erklimmen',
        'Gemeinsam wachsen',
        'Persönlich anpassen'
      ]
    },
    benefits: {
      heading: 'Warum Nutzer zurückkommen',
      items: [
        {
          title: 'Fokus-Timer für Skills',
          body:
            'Starte eine Session für den Skill, an dem du arbeitest, und verbinde Aufwand mit echtem Fortschritt.'
        },
        {
          title: 'XP, Levels und Streaks',
          body:
            'Mache Fortschritt nach jeder Session sichtbar und stärke Konsistenz mit Belohnungen.'
        },
        {
          title: 'Statistiken pro Skill',
          body:
            'Prüfe Zeit, Sessions und Wachstum nach Tag, Woche, Monat und Jahr.'
        },
        {
          title: 'Soziale und Familienmotivation',
          body:
            'Nutze Freunde, Challenges, Leaderboards und Familienfunktionen, wenn Verantwortung hilft.'
        },
        {
          title: 'Themes und Personalisierung',
          body:
            'Passe die Erfahrung an, während der Kernablauf einfach und wiederholbar bleibt.'
        },
        {
          title: 'Guest Mode',
          body:
            'Teste die App sofort, bevor du ein Konto erstellst oder Fortschritt synchronisierst.'
        }
      ]
    },
    pricingPreview: {
      heading: 'Einfache Abos',
      body:
        `Premium kostet ${PRICING.premiumMonthly}/Monat oder ${PRICING.premiumYearly}/Jahr. Family kostet ${PRICING.familyMonthly}/Monat oder ${PRICING.familyYearly}/Jahr.`,
      cta: 'Pläne ansehen'
    },
    trust: {
      heading: 'Erst Vertrauen, dann Wachstum',
      items: [
        'Store- und Release-Informationen bleiben sachlich und aktuell.',
        'Der App Store ist live. Android ist klar als Alpha/Closed Testing gekennzeichnet.',
        'Support gibt es über hello@skill-quest.app.',
        'Datenschutz und Kontolöschung sind in jeder Sprache verlinkt.'
      ]
    },
    lead: {
      badge: 'Produktupdates',
      heading: 'Android Alpha- und Feature-Updates erhalten',
      subheading:
        'Hinterlasse deine E-Mail für SkillQuest Updates. Wähle Android, um dich für die Warteliste unseres Google Play Closed Tests anzumelden.',
      platformQuestion: 'Welche Updates möchtest du?',
      platforms: {
        ios: 'iOS',
        android: 'Android',
        both: 'Beides'
      },
      placeholder: 'du@example.com',
      submit: 'Auf dem Laufenden halten',
      submitting: 'Senden...',
      submitted: 'Angemeldet',
      success: 'Prüfe deinen Posteingang für den Bestätigungslink.',
      duplicate: 'Du stehst bereits auf der Liste.',
      pendingVerification: 'Du hast dich früher angemeldet, aber noch nicht bestätigt.',
      resendLink: 'Bestätigung erneut senden',
      error: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
      gmailHint:
        'Nutze die Google-Konto-E-Mail, mit der du SkillQuest installieren wirst — diese Adresse fügen wir der Play-Console-Tester-Liste hinzu.',
      privacy: 'Kein Spam. Abmeldung jederzeit möglich.'
    },
    finalCta: {
      heading: 'Starte mit den Skills, die du schon lange üben willst',
      body:
        'Lade SkillQuest im App Store oder tritt der Android Alpha über Google Play Closed Testing bei.',
      primary: 'Im App Store laden',
      secondary: 'Android Alpha beitreten'
    },
    footer: {
      description:
        'SkillQuest hilft Menschen und Familien, fokussierte Übungszeit in sichtbares Skillwachstum zu verwandeln.',
      product: 'Produkt',
      resources: 'Ressourcen',
      legal: 'Rechtliches',
      download: 'Download',
      features: 'Funktionen',
      pricing: 'Preise',
      support: 'Support',
      privacy: 'Datenschutz',
      deleteAccount: 'Konto löschen',
      changePassword: 'Passwort ändern'
    },
    download: {
      metaTitle: 'SkillQuest herunterladen | App Store und Android Alpha',
      metaDescription:
        'Lade SkillQuest im App Store oder tritt dem Android Closed Test über Google Play bei.',
      title: 'SkillQuest herunterladen',
      subtitle:
        'SkillQuest ist live im App Store. Android ist derzeit über Google Play Closed Testing verfügbar.',
      iosTitle: 'iPhone und iPad',
      iosStatus: 'Jetzt im App Store verfügbar',
      iosBody:
        'Lade die Live-Version für iOS und starte mit Skills, Timern, XP, Statistiken, Freunden und Familienfunktionen.',
      iosCta: 'App Store öffnen',
      androidTitle: 'Android',
      androidStatus: 'Alpha / Closed Testing',
      androidBody:
        'Melde dich unten mit der Google-Konto-E-Mail an, die du auf Android nutzt. Sobald wir dich zur Google Play Tester-Liste hinzugefügt haben, senden wir dir eine E-Mail mit dem Installationslink.',
      androidCta: 'Android Alpha beitreten',
      testerNote:
        'Wir fügen neue Tester in Gruppen hinzu. Sobald du installieren kannst, erhältst du eine E-Mail — öffne den Link mit demselben Google-Konto, mit dem du dich angemeldet hast.',
      androidAlreadyAdded: 'Bereits als Tester akzeptiert? Öffne die Play Store Testseite.',
      screenshotsHeading: 'Sieh dir die App vor der Installation an',
      screenshotsBody:
        'Diese Screenshots stammen aus der echten SkillQuest App mit sauberen Demodaten.',
      finalHeading: 'Wähle deine Plattform',
      finalBody:
        'iOS-Nutzer können jetzt installieren. Android-Nutzer können der Alpha beitreten und danach über Google Play installieren.'
    },
    pricing: {
      metaTitle: 'SkillQuest Preise | Premium und Family',
      metaDescription:
        'Vergleiche Free, Premium und Family für SkillQuest. Premium kostet €3.99/Monat oder €39.99/Jahr. Family kostet €6.99/Monat oder €69.99/Jahr.',
      title: 'SkillQuest Preise',
      subtitle:
        'Starte kostenlos. Upgrade, wenn tiefere Statistiken, mehr Freiheit oder Familienfunktionen den Preis wert sind.',
      billingNote: 'Abos werden über den App Store oder Google Play verwaltet.',
      plans: [
        {
          name: 'Free',
          price: '€0',
          cadence: 'Sofort starten',
          description:
            'Teste SkillQuest mit Guest Mode und zentralem Skill Tracking, bevor du abonnierst.',
          features: ['Fokus-Timer', '78 Skills', 'XP und Levels', 'Guest Mode']
        },
        {
          name: 'Premium',
          price: `${PRICING.premiumMonthly}/Monat`,
          cadence: `${PRICING.premiumYearly}/Jahr`,
          description:
            'Für Nutzer, die mehr Freiheit, erweiterte Statistiken, zusätzliche Themes und fortgeschrittene Funktionen wollen.',
          features: [
            'Unbegrenztes Skillwachstum',
            'Erweiterte Statistiken',
            'Zusätzliche Themes',
            'Fortgeschrittene Timerfunktionen'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICING.familyMonthly}/Monat`,
          cadence: `${PRICING.familyYearly}/Jahr`,
          description:
            'Für Eltern, die Premium mit Familienstruktur, Kinderstatistiken, Timerunterstützung, Zielen und Komplimenten wollen.',
          features: [
            'Familienverwaltung',
            'Timeraktivität und Statistiken von Kindern sehen',
            'Timer für Kinder starten',
            'Gemeinsame Ziele und Komplimente',
            'Premium-Funktionen für den Haushalt'
          ]
        }
      ],
      faq: [
        {
          question: 'Kann ich kostenlos starten?',
          answer:
            'Ja. SkillQuest enthält einen kostenlosen Start mit Guest Mode und zentralem Skill Tracking.'
        },
        {
          question: 'Was sind die endgültigen Abo-Preise?',
          answer:
            'Premium kostet €3.99 pro Monat oder €39.99 pro Jahr. Family kostet €6.99 pro Monat oder €69.99 pro Jahr.'
        },
        {
          question: 'Wie kündige ich?',
          answer:
            'Abos werden vom App Store oder Google Play verwaltet. Du kündigst über das Store-Konto, mit dem das Abo gestartet wurde.'
        }
      ]
    },
    featuresPage: {
      metaTitle: 'SkillQuest Funktionen | Fokus-Timer, XP, Statistiken, Freunde, Familie',
      metaDescription:
        'Entdecke SkillQuest Funktionen für Skill Tracking, Fokus-Timer, XP, Levels, Statistiken, Leaderboards, Freunde, Familienfunktionen, Guest Mode und datenschutzorientierte Sync.',
      title: 'Funktionen, die Übung in Fortschritt verwandeln',
      subtitle:
        'SkillQuest basiert auf dem Ablauf, der zählt: Skill wählen, fokussieren, XP verdienen, Fortschritt prüfen und morgen zurückkommen.',
      sections: [
        {
          title: 'Jeden Skill tracken',
          body:
            'Nutze SkillQuest für Lernen, Sport, Musikübung, Lesen, Programmieren, kreative Arbeit oder Gewohnheiten, die du stärken willst.'
        },
        {
          title: 'Fokus-Timer',
          body:
            'Nutze Timertechniken wie Pomodoro, Deep Work, Flowtime, 52-17, eigene Sessions und EMOM, soweit sie in der App unterstützt werden.'
        },
        {
          title: 'Fortschritt zum Prüfen',
          body:
            'XP, Levels, Streaks, Session-Verlauf und Diagramme zeigen, was du wirklich geübt hast.'
        },
        {
          title: 'Motivation mit Grenzen',
          body:
            'Freunde, Challenges, Rankings und Family Funktionen schaffen Verantwortung, ohne die echte Arbeit zu ersetzen.'
        },
        {
          title: 'Von Eltern begleitete Übungszeit',
          body:
            'Mit Family können Eltern sehen, wann Kinder Timer starten, Timer für sie starten und Übungszeit mit einem klaren Ziel verbinden.'
        }
      ]
    }
  },
  fr: {
    localeName: localeNames.fr,
    meta: {
      title: 'SkillQuest | Développez vos compétences avec timers, XP et famille',
      description:
        'SkillQuest aide les utilisateurs et les familles à développer des compétences avec des minuteurs de concentration, XP, statistiques, amis, défis et synchronisation respectueuse de la vie privée.'
    },
    nav: {
      features: 'Fonctions',
      pricing: 'Prix',
      download: 'Télécharger',
      support: 'Support',
      cta: 'Obtenir l’app'
    },
    hero: {
      eyebrow: 'Disponible sur l’App Store. Android alpha via Google Play.',
      title: 'SkillQuest',
      subtitle:
        'Développez vos compétences avec des minuteurs de concentration, XP, niveaux, statistiques, amis, défis et fonctions famille. Commencez gratuitement et rendez chaque minute visible.',
      primaryCta: 'Télécharger sur l’App Store',
      secondaryCta: 'Rejoindre l’alpha Android',
      tertiaryCta: 'Comparer les prix',
      trust: ['Démarrage gratuit', 'Sans publicité', 'Synchronisation privée']
    },
    audiences: {
      heading: 'Un tracker de compétences pour progresser seul ou en famille',
      items: [
        {
          title: 'Pour progresser soi-même',
          body:
            'Suivez les études, l’entraînement, la création, la lecture, le code, la musique et toute habitude que vous voulez renforcer.'
        },
        {
          title: 'Pour les parents',
          body:
            'Structurez le temps de pratique, aidez les enfants avec des timers et rendez les progrès visibles sans ajouter de pression.'
        }
      ]
    },
    familySupport: {
      badge: 'Abonnement Family',
      heading: 'Donnez de la structure aux enfants sans prendre leur progrès en main',
      body:
        'Avec l’abonnement Family, les parents peuvent voir quand un enfant lance des timers de concentration et lancer des timers pour les enfants quand il est temps de pratiquer. La famille obtient ainsi un rythme partagé : l’enfant sait sur quoi travailler et les parents peuvent soutenir la routine sans deviner.',
      items: [
        {
          title: 'Voir l’activité des timers',
          body:
            'Suivez le démarrage des sessions, pour discuter école, sport, musique ou création à partir d’un effort visible.'
        },
        {
          title: 'Lancer des timers pour les enfants',
          body:
            'Aidez un enfant à commencer une session concentrée depuis l’espace famille, avec une prochaine étape claire.'
        },
        {
          title: 'Avancer vers un objectif',
          body:
            'XP, niveaux et progression des compétences rendent la pratique répétée visible pour parents et enfants.'
        },
        {
          title: 'Inclus dans Family',
          body:
            `Ces fonctions parent-enfant font partie de l’abonnement Family à ${PRICING.familyMonthly}/mois ou ${PRICING.familyYearly}/an.`
        }
      ],
      note:
        'Les fonctions famille nécessitent un abonnement Family et sont conçues pour apporter cadre, structure et motivation partagée.',
      cta: 'Voir Family',
      imageAlt: 'Capture d’écran des fonctions famille et sociales de SkillQuest'
    },
    product: {
      heading: 'Des progrès réels, pas une simple liste d’habitudes',
      body:
        'SkillQuest relie timers, compétences, XP, séries, statistiques, amis, classements et fonctions famille dans une app mobile ciblée.',
      captions: [
        'Développez chaque compétence',
        'Concentrez-vous avec des timers',
        'Gagnez de l’XP chaque jour',
        'Voyez vos progrès',
        'Montez dans les classements',
        'Progressez ensemble',
        'Personnalisez l’expérience'
      ]
    },
    benefits: {
      heading: 'Ce qui fait revenir les utilisateurs',
      items: [
        {
          title: 'Timers par compétence',
          body:
            'Lancez une session pour la compétence travaillée et reliez l’effort à des progrès concrets.'
        },
        {
          title: 'XP, niveaux et séries',
          body:
            'Rendez les progrès visibles après chaque session avec des récompenses qui soutiennent la régularité.'
        },
        {
          title: 'Statistiques par compétence',
          body:
            'Analysez temps, sessions et évolution par jour, semaine, mois et année.'
        },
        {
          title: 'Motivation sociale et familiale',
          body:
            'Utilisez amis, défis, classements et fonctions famille quand l’engagement aide.'
        },
        {
          title: 'Thèmes et personnalisation',
          body:
            'Adaptez l’expérience tout en gardant un flux simple et répétable.'
        },
        {
          title: 'Guest Mode',
          body:
            'Essayez l’app immédiatement avant de créer un compte ou de synchroniser vos progrès.'
        }
      ]
    },
    pricingPreview: {
      heading: 'Des abonnements simples',
      body:
        `Premium coûte ${PRICING.premiumMonthly}/mois ou ${PRICING.premiumYearly}/an. Family coûte ${PRICING.familyMonthly}/mois ou ${PRICING.familyYearly}/an.`,
      cta: 'Voir les plans'
    },
    trust: {
      heading: 'La confiance avant la croissance',
      items: [
        'Les informations de store et de release restent factuelles et à jour.',
        'L’App Store est disponible. Android est indiqué comme alpha/closed testing.',
        'Le support est disponible via hello@skill-quest.app.',
        'La confidentialité et la suppression de compte sont liées dans chaque langue.'
      ]
    },
    lead: {
      badge: 'Actualités produit',
      heading: 'Recevoir les actualités Android alpha et fonctionnalités',
      subheading:
        "Laissez votre e-mail pour recevoir les nouvelles de SkillQuest. Choisissez Android pour rejoindre la liste d'attente de notre test fermé Google Play.",
      platformQuestion: 'Quelles actualités voulez-vous recevoir ?',
      platforms: {
        ios: 'iOS',
        android: 'Android',
        both: 'Les deux'
      },
      placeholder: 'vous@example.com',
      submit: 'Me tenir informé',
      submitting: 'Envoi...',
      submitted: 'Inscrit',
      success: 'Vérifiez votre boîte mail pour le lien de confirmation.',
      duplicate: 'Vous êtes déjà sur la liste.',
      pendingVerification: 'Vous vous êtes déjà inscrit mais pas encore confirmé.',
      resendLink: 'Renvoyer l’e-mail de vérification',
      error: 'Une erreur est survenue. Réessayez.',
      gmailHint:
        "Utilisez l'adresse de votre compte Google avec laquelle vous installerez SkillQuest — c'est cette adresse que nous ajoutons à la liste de testeurs Play Console.",
      privacy: 'Pas de spam. Désinscription possible à tout moment.'
    },
    finalCta: {
      heading: 'Commencez les compétences que vous voulez vraiment pratiquer',
      body:
        'Téléchargez SkillQuest sur l’App Store ou rejoignez l’alpha Android via Google Play closed testing.',
      primary: 'Télécharger sur l’App Store',
      secondary: 'Rejoindre l’alpha Android'
    },
    footer: {
      description:
        'SkillQuest aide les personnes et les familles à transformer la pratique concentrée en progrès visibles.',
      product: 'Produit',
      resources: 'Ressources',
      legal: 'Légal',
      download: 'Télécharger',
      features: 'Fonctions',
      pricing: 'Prix',
      support: 'Support',
      privacy: 'Confidentialité',
      deleteAccount: 'Suppression de compte',
      changePassword: 'Changer le mot de passe'
    },
    download: {
      metaTitle: 'Télécharger SkillQuest | App Store et Android Alpha',
      metaDescription:
        'Téléchargez SkillQuest sur l’App Store ou rejoignez le test fermé Android sur Google Play.',
      title: 'Télécharger SkillQuest',
      subtitle:
        'SkillQuest est disponible sur l’App Store. Android est actuellement disponible via Google Play closed testing.',
      iosTitle: 'iPhone et iPad',
      iosStatus: 'Disponible maintenant sur l’App Store',
      iosBody:
        'Téléchargez la version iOS en ligne et commencez avec compétences, timers, XP, statistiques, amis et fonctions famille.',
      iosCta: 'Ouvrir l’App Store',
      androidTitle: 'Android',
      androidStatus: 'Alpha / closed testing',
      androidBody:
        "Inscrivez-vous ci-dessous avec l'adresse de votre compte Google utilisée sur Android. Dès que nous vous ajoutons à la liste de testeurs Google Play, nous vous envoyons un e-mail avec le lien d'installation.",
      androidCta: 'Rejoindre l’alpha Android',
      testerNote:
        'Nous ajoutons les nouveaux testeurs par lots. Vous recevrez un e-mail dès que vous pourrez installer — ouvrez le lien avec le même compte Google utilisé lors de l’inscription.',
      androidAlreadyAdded: 'Déjà accepté comme testeur ? Ouvrez la page de test Play Store.',
      screenshotsHeading: 'Voir l’app avant installation',
      screenshotsBody:
        'Ces captures proviennent de la vraie app SkillQuest avec des données de démonstration propres.',
      finalHeading: 'Choisissez votre plateforme',
      finalBody:
        'Les utilisateurs iOS peuvent installer maintenant. Les utilisateurs Android peuvent rejoindre l’alpha puis installer via Google Play.'
    },
    pricing: {
      metaTitle: 'Prix SkillQuest | Premium et Family',
      metaDescription:
        'Comparez Free, Premium et Family pour SkillQuest. Premium coûte €3.99/mois ou €39.99/an. Family coûte €6.99/mois ou €69.99/an.',
      title: 'Prix SkillQuest',
      subtitle:
        'Commencez gratuitement. Passez à Premium quand des statistiques plus poussées, plus de liberté ou des fonctions famille valent le coût.',
      billingNote: 'Les abonnements sont gérés via l’App Store ou Google Play.',
      plans: [
        {
          name: 'Free',
          price: '€0',
          cadence: 'Commencer maintenant',
          description:
            'Essayez SkillQuest avec Guest Mode et le suivi de compétences essentiel avant de vous abonner.',
          features: ['Timers de concentration', '78 compétences', 'XP et niveaux', 'Guest Mode']
        },
        {
          name: 'Premium',
          price: `${PRICING.premiumMonthly}/mois`,
          cadence: `${PRICING.premiumYearly}/an`,
          description:
            'Pour les utilisateurs qui veulent plus de liberté, statistiques étendues, thèmes supplémentaires et fonctions avancées.',
          features: [
            'Croissance illimitée des compétences',
            'Statistiques étendues',
            'Thèmes supplémentaires',
            'Fonctions avancées de timer'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICING.familyMonthly}/mois`,
          cadence: `${PRICING.familyYearly}/an`,
          description:
            'Pour les parents qui veulent Premium avec structure familiale, statistiques enfant, timers, objectifs et compliments.',
          features: [
            'Gestion familiale',
            'Voir l’activité timer et les statistiques enfant',
            'Lancer des timers pour les enfants',
            'Objectifs et compliments partagés',
            'Fonctions Premium pour le foyer'
          ]
        }
      ],
      faq: [
        {
          question: 'Puis-je commencer gratuitement ?',
          answer:
            'Oui. SkillQuest inclut un démarrage gratuit avec Guest Mode et le suivi de compétences essentiel.'
        },
        {
          question: 'Quels sont les prix finaux des abonnements ?',
          answer:
            'Premium coûte €3.99 par mois ou €39.99 par an. Family coûte €6.99 par mois ou €69.99 par an.'
        },
        {
          question: 'Comment annuler ?',
          answer:
            'Les abonnements sont gérés par l’App Store ou Google Play. Vous pouvez annuler via le compte store qui a lancé l’abonnement.'
        }
      ]
    },
    featuresPage: {
      metaTitle: 'Fonctions SkillQuest | Timers, XP, stats, amis, famille',
      metaDescription:
        'Explorez les fonctions SkillQuest pour suivi des compétences, timers, XP, niveaux, statistiques, classements, amis, famille, Guest Mode et synchronisation privée.',
      title: 'Des fonctions qui transforment la pratique en progrès',
      subtitle:
        'SkillQuest repose sur la boucle essentielle : choisir une compétence, se concentrer, gagner de l’XP, revoir ses progrès et revenir demain.',
      sections: [
        {
          title: 'Suivre toute compétence',
          body:
            'Utilisez SkillQuest pour études, sport, musique, lecture, code, création ou toute habitude à renforcer.'
        },
        {
          title: 'Timers de concentration',
          body:
            'Utilisez des techniques comme Pomodoro, Deep Work, Flowtime, 52-17, sessions personnalisées et EMOM quand l’app les prend en charge.'
        },
        {
          title: 'Des progrès vérifiables',
          body:
            'XP, niveaux, séries, historique des sessions et graphiques montrent ce que vous avez réellement pratiqué.'
        },
        {
          title: 'Motivation avec limites',
          body:
            'Amis, défis, classements et fonctions Family ajoutent de l’engagement sans remplacer le vrai travail.'
        },
        {
          title: 'Pratique guidée par les parents',
          body:
            'Avec Family, les parents peuvent voir quand les enfants lancent des timers, lancer des timers pour eux et relier la pratique à un objectif clair.'
        }
      ]
    }
  },
  es: {
    localeName: localeNames.es,
    meta: {
      title: 'SkillQuest | Desarrolla habilidades con temporizadores, XP y familia',
      description:
        'SkillQuest ayuda a usuarios y familias a desarrollar habilidades con temporizadores de enfoque, XP, estadísticas, amigos, desafíos y sincronización pensada para la privacidad.'
    },
    nav: {
      features: 'Funciones',
      pricing: 'Precios',
      download: 'Descargar',
      support: 'Soporte',
      cta: 'Obtener la app'
    },
    hero: {
      eyebrow: 'Disponible en App Store. Alpha de Android en Google Play.',
      title: 'SkillQuest',
      subtitle:
        'Desarrolla habilidades con temporizadores de enfoque, XP, niveles, estadísticas, amigos, desafíos y funciones familiares. Empieza gratis y convierte cada minuto en progreso visible.',
      primaryCta: 'Descargar en App Store',
      secondaryCta: 'Unirse a Android alpha',
      tertiaryCta: 'Comparar precios',
      trust: ['Inicio gratis', 'Sin anuncios', 'Sincronización privada']
    },
    audiences: {
      heading: 'Un tracker de habilidades para crecimiento personal y práctica familiar guiada',
      items: [
        {
          title: 'Para crecimiento personal',
          body:
            'Registra estudio, entrenamiento, trabajo creativo, lectura, programación, música y cualquier hábito que quieras fortalecer.'
        },
        {
          title: 'Para padres',
          body:
            'Da estructura al tiempo de práctica, ayuda a los niños con temporizadores y muestra el progreso sin añadir presión.'
        }
      ]
    },
    familySupport: {
      badge: 'Suscripción Family',
      heading: 'Da estructura a los niños sin controlar su progreso',
      body:
        'Con la suscripción Family, los padres pueden ver cuándo un niño inicia temporizadores de enfoque y también iniciar temporizadores para los niños cuando llega el momento de practicar. Así la familia tiene un ritmo compartido: el niño sabe en qué trabajar y los padres pueden apoyar la rutina sin adivinar.',
      items: [
        {
          title: 'Ver actividad de temporizadores',
          body:
            'Sigue cuándo se inician las sesiones para hablar sobre escuela, deporte, música o trabajo creativo desde el esfuerzo visible.'
        },
        {
          title: 'Iniciar temporizadores para niños',
          body:
            'Ayuda a un niño a empezar una sesión enfocada desde el entorno familiar y convierte la práctica en un siguiente paso claro.'
        },
        {
          title: 'Trabajar hacia una meta',
          body:
            'XP, niveles y progreso de habilidades hacen visible la práctica repetida para padres e hijos.'
        },
        {
          title: 'Incluido en Family',
          body:
            `Estas funciones padre-hijo forman parte de la suscripción Family por ${PRICING.familyMonthly}/mes o ${PRICING.familyYearly}/año.`
        }
      ],
      note:
        'Las funciones familiares requieren una suscripción Family y están pensadas para crear guía, estructura y motivación compartida.',
      cta: 'Ver Family',
      imageAlt: 'Captura de SkillQuest con funciones familiares y sociales'
    },
    product: {
      heading: 'Progreso real, no otra lista vaga de hábitos',
      body:
        'SkillQuest conecta temporizadores, habilidades, XP, rachas, estadísticas, amigos, rankings y funciones familiares en una app móvil enfocada.',
      captions: [
        'Desarrolla cada habilidad',
        'Concéntrate con temporizadores',
        'Gana XP a diario',
        'Ve tu progreso',
        'Sube en rankings',
        'Crezcan juntos',
        'Hazlo tuyo'
      ]
    },
    benefits: {
      heading: 'Por qué los usuarios vuelven',
      items: [
        {
          title: 'Temporizadores por habilidad',
          body:
            'Inicia una sesión para la habilidad que trabajas y conecta el esfuerzo con progreso real.'
        },
        {
          title: 'XP, niveles y rachas',
          body:
            'Haz visible el progreso después de cada sesión con recompensas que refuerzan la constancia.'
        },
        {
          title: 'Estadísticas por habilidad',
          body:
            'Revisa tiempo, sesiones y crecimiento por día, semana, mes y año.'
        },
        {
          title: 'Motivación social y familiar',
          body:
            'Usa amigos, desafíos, leaderboards y funciones familiares cuando la responsabilidad compartida ayuda.'
        },
        {
          title: 'Temas y personalización',
          body:
            'Personaliza la experiencia manteniendo un flujo simple y repetible.'
        },
        {
          title: 'Guest Mode',
          body:
            'Prueba la app al instante antes de crear una cuenta o sincronizar tu progreso.'
        }
      ]
    },
    pricingPreview: {
      heading: 'Suscripciones simples',
      body:
        `Premium cuesta ${PRICING.premiumMonthly}/mes o ${PRICING.premiumYearly}/año. Family cuesta ${PRICING.familyMonthly}/mes o ${PRICING.familyYearly}/año.`,
      cta: 'Ver planes'
    },
    trust: {
      heading: 'Confianza antes de crecer',
      items: [
        'La información de tiendas y releases se mantiene factual y actualizada.',
        'App Store está disponible. Android se marca claramente como alpha/closed testing.',
        'Soporte disponible en hello@skill-quest.app.',
        'Privacidad y eliminación de cuenta están enlazadas en cada idioma.'
      ]
    },
    lead: {
      badge: 'Actualizaciones',
      heading: 'Recibe noticias de Android alpha y nuevas funciones',
      subheading:
        'Deja tu email para recibir novedades de SkillQuest. Elige Android para unirte a la lista de espera de nuestro test cerrado de Google Play.',
      platformQuestion: '¿Qué novedades quieres recibir?',
      platforms: {
        ios: 'iOS',
        android: 'Android',
        both: 'Ambas'
      },
      placeholder: 'tu@example.com',
      submit: 'Mantenerme informado',
      submitting: 'Enviando...',
      submitted: 'Registrado',
      success: 'Revisa tu correo para el enlace de confirmación.',
      duplicate: 'Ya estás en la lista.',
      pendingVerification: 'Ya te registraste, pero aún no confirmaste.',
      resendLink: 'Reenviar email de verificación',
      error: 'Algo salió mal. Inténtalo de nuevo.',
      gmailHint:
        'Usa el email de la cuenta de Google con la que instalarás SkillQuest — esa es la dirección que añadimos a la lista de testers de Play Console.',
      privacy: 'Sin spam. Puedes darte de baja cuando quieras.'
    },
    finalCta: {
      heading: 'Empieza con las habilidades que siempre quieres practicar',
      body:
        'Descarga SkillQuest en App Store o únete a la alpha de Android mediante Google Play closed testing.',
      primary: 'Descargar en App Store',
      secondary: 'Unirse a Android alpha'
    },
    footer: {
      description:
        'SkillQuest ayuda a personas y familias a convertir práctica enfocada en crecimiento visible.',
      product: 'Producto',
      resources: 'Recursos',
      legal: 'Legal',
      download: 'Descargar',
      features: 'Funciones',
      pricing: 'Precios',
      support: 'Soporte',
      privacy: 'Privacidad',
      deleteAccount: 'Eliminar cuenta',
      changePassword: 'Cambiar contraseña'
    },
    download: {
      metaTitle: 'Descargar SkillQuest | App Store y Android Alpha',
      metaDescription:
        'Descarga SkillQuest en App Store o únete al test cerrado de Android en Google Play.',
      title: 'Descargar SkillQuest',
      subtitle:
        'SkillQuest está disponible en App Store. Android está disponible actualmente mediante Google Play closed testing.',
      iosTitle: 'iPhone y iPad',
      iosStatus: 'Disponible ahora en App Store',
      iosBody:
        'Descarga la versión iOS en vivo y empieza con habilidades, temporizadores, XP, estadísticas, amigos y funciones familiares.',
      iosCta: 'Abrir App Store',
      androidTitle: 'Android',
      androidStatus: 'Alpha / closed testing',
      androidBody:
        'Regístrate abajo con el email de la cuenta de Google que usas en Android. En cuanto te añadamos a la lista de testers de Google Play, te enviaremos un email con el enlace de instalación.',
      androidCta: 'Unirse a Android alpha',
      testerNote:
        'Añadimos testers nuevos por tandas. Recibirás un email en cuanto puedas instalar — abre el enlace con la misma cuenta de Google con la que te registraste.',
      androidAlreadyAdded: '¿Ya aceptado como tester? Abre la página de test de Play Store.',
      screenshotsHeading: 'Mira la app antes de instalar',
      screenshotsBody:
        'Estas capturas provienen de la app real SkillQuest con datos demo limpios.',
      finalHeading: 'Elige tu plataforma',
      finalBody:
        'Los usuarios de iOS pueden instalar ahora. Los usuarios de Android pueden unirse a la alpha e instalar después desde Google Play.'
    },
    pricing: {
      metaTitle: 'Precios de SkillQuest | Premium y Family',
      metaDescription:
        'Compara Free, Premium y Family para SkillQuest. Premium cuesta €3.99/mes o €39.99/año. Family cuesta €6.99/mes o €69.99/año.',
      title: 'Precios de SkillQuest',
      subtitle:
        'Empieza gratis. Mejora cuando estadísticas más profundas, más libertad o funciones familiares merezcan la pena.',
      billingNote: 'Las suscripciones se gestionan mediante App Store o Google Play.',
      plans: [
        {
          name: 'Free',
          price: '€0',
          cadence: 'Empieza al instante',
          description:
            'Prueba SkillQuest con Guest Mode y seguimiento básico antes de suscribirte.',
          features: ['Temporizadores', '78 habilidades', 'XP y niveles', 'Guest Mode']
        },
        {
          name: 'Premium',
          price: `${PRICING.premiumMonthly}/mes`,
          cadence: `${PRICING.premiumYearly}/año`,
          description:
            'Para usuarios que quieren más libertad, estadísticas ampliadas, temas extra y funciones avanzadas.',
          features: [
            'Crecimiento ilimitado',
            'Estadísticas ampliadas',
            'Temas extra',
            'Funciones avanzadas de temporizador'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICING.familyMonthly}/mes`,
          cadence: `${PRICING.familyYearly}/año`,
          description:
            'Para padres que quieren Premium con estructura familiar, estadísticas infantiles, timers, metas y cumplidos.',
          features: [
            'Gestión familiar',
            'Ver actividad de timers y estadísticas infantiles',
            'Iniciar timers para niños',
            'Metas y cumplidos compartidos',
            'Funciones Premium para el hogar'
          ]
        }
      ],
      faq: [
        {
          question: '¿Puedo empezar sin pagar?',
          answer:
            'Sí. SkillQuest incluye un inicio gratis con Guest Mode y seguimiento básico de habilidades.'
        },
        {
          question: '¿Cuáles son los precios finales?',
          answer:
            'Premium cuesta €3.99 al mes o €39.99 al año. Family cuesta €6.99 al mes o €69.99 al año.'
        },
        {
          question: '¿Cómo cancelo?',
          answer:
            'Las suscripciones las gestionan App Store o Google Play. Puedes cancelar desde la cuenta de la tienda que inició la suscripción.'
        }
      ]
    },
    featuresPage: {
      metaTitle: 'Funciones de SkillQuest | Temporizadores, XP, stats, amigos, familia',
      metaDescription:
        'Explora funciones de SkillQuest para seguimiento de habilidades, temporizadores, XP, niveles, estadísticas, rankings, amigos, familia, Guest Mode y sincronización privada.',
      title: 'Funciones que convierten práctica en progreso',
      subtitle:
        'SkillQuest se basa en el ciclo importante: elige una habilidad, concéntrate, gana XP, revisa progreso y vuelve mañana.',
      sections: [
        {
          title: 'Registra cualquier habilidad',
          body:
            'Usa SkillQuest para estudiar, hacer deporte, practicar música, leer, programar, crear o fortalecer hábitos.'
        },
        {
          title: 'Temporizadores de enfoque',
          body:
            'Usa técnicas como Pomodoro, Deep Work, Flowtime, 52-17, sesiones personalizadas y EMOM cuando la app lo permita.'
        },
        {
          title: 'Progreso que puedes revisar',
          body:
            'XP, niveles, rachas, historial de sesiones y gráficos muestran lo que realmente practicaste.'
        },
        {
          title: 'Motivación con límites',
          body:
            'Amigos, desafíos, rankings y funciones Family añaden responsabilidad sin sustituir el trabajo real.'
        },
        {
          title: 'Práctica guiada por padres',
          body:
            'Con Family, los padres pueden ver cuándo los niños inician temporizadores, iniciar temporizadores para ellos y conectar la práctica con una meta clara.'
        }
      ]
    }
  },
  it: {
    localeName: localeNames.it,
    meta: {
      title: 'SkillQuest | Sviluppa competenze con timer, XP e funzioni famiglia',
      description:
        'SkillQuest aiuta utenti e famiglie a sviluppare competenze con timer di concentrazione, XP, statistiche, amici, sfide e sincronizzazione attenta alla privacy.'
    },
    nav: {
      features: 'Funzioni',
      pricing: 'Prezzi',
      download: 'Scarica',
      support: 'Supporto',
      cta: 'Ottieni l’app'
    },
    hero: {
      eyebrow: 'Disponibile su App Store. Android alpha su Google Play.',
      title: 'SkillQuest',
      subtitle:
        'Sviluppa competenze con timer di concentrazione, XP, livelli, statistiche, amici, sfide e funzioni famiglia. Inizia gratis e trasforma ogni minuto in progresso visibile.',
      primaryCta: 'Scarica da App Store',
      secondaryCta: 'Unisciti ad Android alpha',
      tertiaryCta: 'Confronta i prezzi',
      trust: ['Inizio gratuito', 'Niente pubblicità', 'Sync attenta alla privacy']
    },
    audiences: {
      heading: 'Un tracker di competenze per crescita personale e pratica familiare guidata',
      items: [
        {
          title: 'Per la crescita personale',
          body:
            'Traccia studio, allenamento, lavoro creativo, lettura, programmazione, musica e ogni abitudine che vuoi rafforzare.'
        },
        {
          title: 'Per genitori',
          body:
            'Dai struttura al tempo di pratica, aiuta i figli con i timer e rendi i progressi visibili senza aggiungere pressione.'
        }
      ]
    },
    familySupport: {
      badge: 'Abbonamento Family',
      heading: 'Dai struttura ai figli senza prendere il controllo dei loro progressi',
      body:
        'Con l’abbonamento Family, i genitori possono vedere quando un figlio avvia timer di concentrazione e possono avviare timer per i figli quando è il momento di praticare. Così la famiglia ha un ritmo condiviso: il figlio sa su cosa lavorare e i genitori possono sostenere la routine senza andare a intuito.',
      items: [
        {
          title: 'Vedi l’attività dei timer',
          body:
            'Segui quando iniziano le sessioni, così le conversazioni su scuola, sport, musica o creatività partono da uno sforzo visibile.'
        },
        {
          title: 'Avvia timer per i figli',
          body:
            'Aiuta un figlio a iniziare una sessione focalizzata dall’ambiente famiglia e trasforma la pratica in un passo chiaro.'
        },
        {
          title: 'Lavora verso un obiettivo',
          body:
            'XP, livelli e progressi delle competenze rendono visibile la pratica ripetuta per genitori e figli.'
        },
        {
          title: 'Incluso in Family',
          body:
            `Queste funzioni genitore-figlio fanno parte dell’abbonamento Family a ${PRICING.familyMonthly}/mese o ${PRICING.familyYearly}/anno.`
        }
      ],
      note:
        'Le funzioni famiglia richiedono un abbonamento Family e sono pensate per creare guida, struttura e motivazione condivisa.',
      cta: 'Vedi Family',
      imageAlt: 'Screenshot SkillQuest con funzioni famiglia e social'
    },
    product: {
      heading: 'Progressi reali, non un’altra lista vaga di abitudini',
      body:
        'SkillQuest collega timer, competenze, XP, serie, statistiche, amici, classifiche e funzioni famiglia in un’app mobile focalizzata.',
      captions: [
        'Sviluppa ogni competenza',
        'Concentrati con i timer',
        'Guadagna XP ogni giorno',
        'Vedi i progressi',
        'Sali in classifica',
        'Crescete insieme',
        'Rendilo tuo'
      ]
    },
    benefits: {
      heading: 'Perché gli utenti tornano',
      items: [
        {
          title: 'Timer per competenza',
          body:
            'Avvia una sessione per la competenza su cui lavori e collega lo sforzo a progressi reali.'
        },
        {
          title: 'XP, livelli e serie',
          body:
            'Rendi visibili i progressi dopo ogni sessione con ricompense che rafforzano la costanza.'
        },
        {
          title: 'Statistiche per competenza',
          body:
            'Controlla tempo, sessioni e crescita per giorno, settimana, mese e anno.'
        },
        {
          title: 'Motivazione sociale e familiare',
          body:
            'Usa amici, sfide, classifiche e funzioni famiglia quando l’accountability aiuta.'
        },
        {
          title: 'Temi e personalizzazione',
          body:
            'Personalizza l’esperienza mantenendo semplice e ripetibile il flusso principale.'
        },
        {
          title: 'Guest Mode',
          body:
            'Prova subito l’app prima di creare un account o sincronizzare i progressi.'
        }
      ]
    },
    pricingPreview: {
      heading: 'Abbonamenti semplici',
      body:
        `Premium costa ${PRICING.premiumMonthly}/mese o ${PRICING.premiumYearly}/anno. Family costa ${PRICING.familyMonthly}/mese o ${PRICING.familyYearly}/anno.`,
      cta: 'Vedi i piani'
    },
    trust: {
      heading: 'Fiducia prima della crescita',
      items: [
        'Le informazioni su store e release restano fattuali e aggiornate.',
        'App Store è live. Android è indicato chiaramente come alpha/closed testing.',
        'Il supporto è disponibile a hello@skill-quest.app.',
        'Privacy ed eliminazione account sono linkate in ogni lingua.'
      ]
    },
    lead: {
      badge: 'Aggiornamenti prodotto',
      heading: 'Ricevi aggiornamenti Android alpha e nuove funzioni',
      subheading:
        "Lascia la tua email per ricevere novità su SkillQuest. Scegli Android per iscriverti alla lista d'attesa del nostro closed test Google Play.",
      platformQuestion: 'Quali aggiornamenti vuoi?',
      platforms: {
        ios: 'iOS',
        android: 'Android',
        both: 'Entrambi'
      },
      placeholder: 'tu@example.com',
      submit: 'Tienimi aggiornato',
      submitting: 'Invio...',
      submitted: 'Iscritto',
      success: 'Controlla la posta per il link di conferma.',
      duplicate: 'Sei già nella lista.',
      pendingVerification: 'Ti sei già iscritto ma non hai ancora confermato.',
      resendLink: 'Rinvia email di verifica',
      error: 'Qualcosa è andato storto. Riprova.',
      gmailHint:
        "Usa l'email dell'account Google con cui installerai SkillQuest — è l'indirizzo che aggiungiamo alla lista tester di Play Console.",
      privacy: 'Niente spam. Puoi annullare l’iscrizione quando vuoi.'
    },
    finalCta: {
      heading: 'Inizia dalle competenze che vuoi davvero praticare',
      body:
        'Scarica SkillQuest su App Store o unisciti all’alpha Android tramite Google Play closed testing.',
      primary: 'Scarica da App Store',
      secondary: 'Unisciti ad Android alpha'
    },
    footer: {
      description:
        'SkillQuest aiuta persone e famiglie a trasformare la pratica focalizzata in crescita visibile.',
      product: 'Prodotto',
      resources: 'Risorse',
      legal: 'Legale',
      download: 'Scarica',
      features: 'Funzioni',
      pricing: 'Prezzi',
      support: 'Supporto',
      privacy: 'Privacy',
      deleteAccount: 'Eliminazione account',
      changePassword: 'Cambia password'
    },
    download: {
      metaTitle: 'Scarica SkillQuest | App Store e Android Alpha',
      metaDescription:
        'Scarica SkillQuest da App Store o unisciti al closed test Android su Google Play.',
      title: 'Scarica SkillQuest',
      subtitle:
        'SkillQuest è disponibile su App Store. Android è attualmente disponibile tramite Google Play closed testing.',
      iosTitle: 'iPhone e iPad',
      iosStatus: 'Disponibile ora su App Store',
      iosBody:
        'Scarica la release iOS live e inizia con competenze, timer, XP, statistiche, amici e funzioni famiglia.',
      iosCta: 'Apri App Store',
      androidTitle: 'Android',
      androidStatus: 'Alpha / closed testing',
      androidBody:
        "Iscriviti qui sotto con l'email dell'account Google che usi su Android. Non appena ti aggiungiamo alla lista tester di Google Play, ti inviamo un'email con il link per installare.",
      androidCta: 'Unisciti ad Android alpha',
      testerNote:
        'Aggiungiamo nuovi tester a gruppi. Riceverai un’email non appena potrai installare — apri il link con lo stesso account Google usato per l’iscrizione.',
      androidAlreadyAdded: 'Già accettato come tester? Apri la pagina di test di Play Store.',
      screenshotsHeading: 'Guarda l’app prima di installare',
      screenshotsBody:
        'Questi screenshot provengono dalla vera app SkillQuest con dati demo puliti.',
      finalHeading: 'Scegli la piattaforma',
      finalBody:
        'Gli utenti iOS possono installare ora. Gli utenti Android possono unirsi all’alpha e poi installare da Google Play.'
    },
    pricing: {
      metaTitle: 'Prezzi SkillQuest | Premium e Family',
      metaDescription:
        'Confronta Free, Premium e Family per SkillQuest. Premium costa €3.99/mese o €39.99/anno. Family costa €6.99/mese o €69.99/anno.',
      title: 'Prezzi SkillQuest',
      subtitle:
        'Inizia gratis. Passa a Premium quando statistiche più profonde, più libertà o funzioni famiglia valgono il prezzo.',
      billingNote: 'Gli abbonamenti sono gestiti tramite App Store o Google Play.',
      plans: [
        {
          name: 'Free',
          price: '€0',
          cadence: 'Inizia subito',
          description:
            'Prova SkillQuest con Guest Mode e tracking essenziale prima di abbonarti.',
          features: ['Timer di concentrazione', '78 competenze', 'XP e livelli', 'Guest Mode']
        },
        {
          name: 'Premium',
          price: `${PRICING.premiumMonthly}/mese`,
          cadence: `${PRICING.premiumYearly}/anno`,
          description:
            'Per utenti che vogliono più libertà, statistiche ampliate, temi extra e funzioni avanzate.',
          features: [
            'Crescita illimitata',
            'Statistiche ampliate',
            'Temi extra',
            'Funzioni timer avanzate'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICING.familyMonthly}/mese`,
          cadence: `${PRICING.familyYearly}/anno`,
          description:
            'Per genitori che vogliono Premium con struttura familiare, statistiche dei figli, timer, obiettivi e complimenti.',
          features: [
            'Gestione famiglia',
            'Vedi attività timer e statistiche dei figli',
            'Avvia timer per i figli',
            'Obiettivi e complimenti condivisi',
            'Funzioni Premium per la famiglia'
          ]
        }
      ],
      faq: [
        {
          question: 'Posso iniziare senza pagare?',
          answer:
            'Sì. SkillQuest include un inizio gratuito con Guest Mode e tracking essenziale delle competenze.'
        },
        {
          question: 'Quali sono i prezzi finali?',
          answer:
            'Premium costa €3.99 al mese o €39.99 all’anno. Family costa €6.99 al mese o €69.99 all’anno.'
        },
        {
          question: 'Come annullo?',
          answer:
            'Gli abbonamenti sono gestiti da App Store o Google Play. Puoi annullare dall’account store che ha avviato l’abbonamento.'
        }
      ]
    },
    featuresPage: {
      metaTitle: 'Funzioni SkillQuest | Timer, XP, statistiche, amici, famiglia',
      metaDescription:
        'Scopri le funzioni SkillQuest per skill tracking, timer, XP, livelli, statistiche, classifiche, amici, famiglia, Guest Mode e sync attenta alla privacy.',
      title: 'Funzioni che trasformano la pratica in progresso',
      subtitle:
        'SkillQuest si basa sul ciclo che conta: scegli una competenza, concentrati, guadagna XP, rivedi i progressi e torna domani.',
      sections: [
        {
          title: 'Traccia qualsiasi competenza',
          body:
            'Usa SkillQuest per studio, sport, musica, lettura, programmazione, creatività o abitudini da rafforzare.'
        },
        {
          title: 'Timer di concentrazione',
          body:
            'Usa tecniche come Pomodoro, Deep Work, Flowtime, 52-17, sessioni personalizzate ed EMOM quando supportate dall’app.'
        },
        {
          title: 'Progressi verificabili',
          body:
            'XP, livelli, serie, cronologia sessioni e grafici mostrano cosa hai davvero praticato.'
        },
        {
          title: 'Motivazione con limiti',
          body:
            'Amici, sfide, classifiche e funzioni Family aggiungono responsabilità senza sostituire il lavoro reale.'
        },
        {
          title: 'Pratica guidata dai genitori',
          body:
            'Con Family, i genitori possono vedere quando i figli avviano timer, avviare timer per loro e collegare la pratica a un obiettivo chiaro.'
        }
      ]
    }
  }
} as const;

export type MarketingCopy = (typeof marketingCopy)['en'];
