import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';

export type Locale = (typeof routing.locales)[number];

export const SITE_URL = 'https://www.skill-quest.app';
export const SUPPORT_EMAIL = 'hello@skill-quest.app';
// Canonical listing for structured data and search engines.
export const APP_STORE_LISTING_URL =
  'https://apps.apple.com/app/skillquest-skill-tracker/id6755604671';
// Store buttons carry an App Store Connect campaign token (ct), so installs
// from the website show up under Analytics -> Campaigns. pt is the provider ID.
export const APP_STORE_URL =
  'https://apps.apple.com/app/apple-store/id6755604671?pt=128291575&ct=website&mt=8';
export const ANDROID_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.skillquest.app';

// Subscription prices in euros. Copy gets them through PRICES[locale], which
// follows each language's notation (€ 3,99 in Dutch, 3,99 € in German, €3.99
// in English); structured data uses the plain numbers.
export const PRICE_AMOUNTS = {
  free: 0,
  premiumMonthly: 3.99,
  premiumYearly: 39.99,
  familyMonthly: 6.99,
  familyYearly: 69.99
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

export const languageTags: Record<Locale, string> = {
  nl: 'nl-NL',
  en: 'en-US',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  it: 'it-IT'
};

export function formatEuro(locale: Locale, amount: number) {
  return new Intl.NumberFormat(languageTags[locale], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2
  }).format(amount);
}

export const PRICES = Object.fromEntries(
  routing.locales.map((locale) => [
    locale,
    Object.fromEntries(
      Object.entries(PRICE_AMOUNTS).map(([key, amount]) => [key, formatEuro(locale, amount)])
    )
  ])
) as Record<Locale, Record<keyof typeof PRICE_AMOUNTS, string>>;

export const screenshotNames = [
  '01-home-progress.png',
  '02-focus-timer.png',
  '04-statistics.png',
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

/**
 * hreflang links for a page. `locales` lists the languages the page exists in
 * (default: all of them). x-default points at the default locale when the page
 * exists there, otherwise at the first listed locale.
 */
export function alternateLanguages(
  path = '',
  locales: readonly Locale[] = routing.locales
): Record<string, string> {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [languageTags[locale], localizedPath(locale, path)])
  );
  const fallback = locales.includes(routing.defaultLocale)
    ? routing.defaultLocale
    : locales[0];
  if (fallback) {
    languages['x-default'] = localizedPath(fallback, path);
  }
  return languages;
}

export function createPageMetadata({
  locale,
  path = '',
  title,
  description,
  locales = routing.locales
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  /** The languages this page exists in; hreflang and og:locale:alternate list only these. */
  locales?: readonly Locale[];
}): Metadata {
  const canonical = localizedPath(locale, path);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: alternateLanguages(path, locales)
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SkillQuest',
      locale: localeToOg[locale],
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => localeToOg[item]),
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og/skillquest-og.png`,
          width: 1200,
          height: 630,
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
        price: String(PRICE_AMOUNTS.free),
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        name: 'Premium monthly',
        price: String(PRICE_AMOUNTS.premiumMonthly),
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        name: 'Premium yearly',
        price: String(PRICE_AMOUNTS.premiumYearly),
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        name: 'Family monthly',
        price: String(PRICE_AMOUNTS.familyMonthly),
        priceCurrency: 'EUR'
      },
      {
        '@type': 'Offer',
        name: 'Family yearly',
        price: String(PRICE_AMOUNTS.familyYearly),
        priceCurrency: 'EUR'
      }
    ],
    downloadUrl: APP_STORE_LISTING_URL,
    sameAs: [APP_STORE_LISTING_URL, ANDROID_STORE_URL]
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
      eyebrow: 'Live on the App Store and Google Play.',
      title: 'Every focused minute counts toward a skill',
      subtitle:
        'A skill tracker with built-in focus timers. Earn XP, collect active days, and see exactly where your practice time goes.',
      primaryCta: 'Download on the App Store',
      secondaryCta: 'Download for Android',
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
            `These parent-child tools are part of the Family subscription at ${PRICES.en.familyMonthly}/month or ${PRICES.en.familyYearly}/year.`
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
        'SkillQuest connects timers, skills, XP, active days, stats, friends, challenges, and family features in one focused mobile app.',
      captions: [
        'Build every skill',
        'Focus with timers',
        'See your progress',
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
          title: 'XP, levels, and active days',
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
            'Use friends, challenges, and family tools when accountability helps.'
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
        `Premium is ${PRICES.en.premiumMonthly}/month or ${PRICES.en.premiumYearly}/year. Family is ${PRICES.en.familyMonthly}/month or ${PRICES.en.familyYearly}/year.`,
      cta: 'See plans'
    },
    trust: {
      heading: 'Built for trust before scale',
      items: [
        'Read about app changes on the “What’s new” page.',
        'Available on the App Store and Google Play.',
        'Support is available at hello@skill-quest.app.',
        'Account deletion and privacy pages are linked from every locale.'
      ]
    },
    lead: {
      badge: 'Newsletter',
      heading: 'Subscribe to the newsletter',
      subheading: 'Now and then an email about new features in SkillQuest and tips for building skills, for yourself or with your kids.',
      placeholder: 'you@example.com',
      emailLabel: 'Email address',
      submit: 'Subscribe',
      submitting: 'Sending...',
      submitted: 'Almost done',
      success: 'Check your inbox and confirm with the link in the email.',
      rateLimited: "You've tried a few times already. Try again in an hour.",
      busy: "We can't send any more confirmation emails today. Try again tomorrow.",
      invalidEmail: 'Enter a valid email address.',
      error: 'Something went wrong. Try again.',
      privacy: 'No spam. Every newsletter has a link to unsubscribe.',
      privacyLink: 'How we handle your data'
    },
    finalCta: {
      heading: 'Start building the skills you keep meaning to practice',
      body:
        'Download SkillQuest on the App Store or Google Play.',
      primary: 'Download on the App Store',
      secondary: 'Download for Android'
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
      terms: 'Terms of Service',
      deleteAccount: 'Account deletion',
      changePassword: 'Change password',
      changelog: "What's new",
      guides: 'Guides'
    },
    download: {
      metaTitle: 'Download SkillQuest | App Store and Google Play',
      metaDescription:
        'Download SkillQuest on the App Store or Google Play.',
      title: 'Download SkillQuest',
      subtitle:
        'SkillQuest is available on the App Store and Google Play.',
      iosTitle: 'iPhone and iPad',
      iosStatus: 'Available now on the App Store',
      iosBody:
        'Download the live iOS release and start tracking skills, timers, XP, stats, friends, and family tools.',
      iosCta: 'Open App Store',
      androidTitle: 'Android',
      androidStatus: 'Available now on Google Play',
      androidBody:
        'Download the Android app and start practicing with timers, XP, and stats.',
      androidCta: 'Download for Android',
      qrIos: 'On a computer? Scan with your iPhone or iPad to open the App Store.',
      qrAndroid: 'On a computer? Scan with your Android phone to open this page there.',
      screenshotsHeading: 'See the app before you install',
      screenshotsBody:
        'These screenshots are generated from the real SkillQuest app using clean demo data.',
      finalHeading: 'Choose your platform',
      finalBody:
        'iOS and Android users can install now.'
    },
    pricing: {
      metaTitle: 'SkillQuest Pricing | Premium and Family Plans',
      metaDescription:
        `Compare Free, Premium, and Family pricing for SkillQuest. Premium is ${PRICES.en.premiumMonthly}/month or ${PRICES.en.premiumYearly}/year. Family is ${PRICES.en.familyMonthly}/month or ${PRICES.en.familyYearly}/year.`,
      title: 'SkillQuest pricing',
      subtitle:
        'Start free. Premium adds extra themes; Family adds tools for parents.',
      billingNote: 'Subscriptions are managed through the App Store or Google Play.',
      plans: [
        {
          name: 'Free',
          price: PRICES.en.free,
          cadence: 'Start immediately',
          description:
            'Everything you need to practice and see your progress. You can start without an account.',
          features: [
            'All focus timer techniques',
            '185 skills',
            'XP and levels',
            'Statistics',
            'Active days',
            'Friends and challenges',
            'Guest Mode'
          ]
        },
        {
          name: 'Premium',
          price: `${PRICES.en.premiumMonthly}/month`,
          cadence: `${PRICES.en.premiumYearly}/year`,
          description:
            'For users who want extra themes. Everything else in SkillQuest is free.',
          features: [
            'Extra themes',
            'Everything in Free'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICES.en.familyMonthly}/month`,
          cadence: `${PRICES.en.familyYearly}/year`,
          description:
            'For parents who want to guide practice at home: family management, timers for children, child statistics, goals, and compliments, plus the Premium themes.',
          features: [
            'Family management',
            'Start timers for children',
            'See child statistics, with permission',
            'Goals and compliments',
            'Premium themes for the household'
          ]
        }
      ],
      faq: [
        {
          question: 'Can I start without paying?',
          answer:
            'Yes. Timers, skills, XP, levels, statistics, active days, friends, and challenges are free. With Guest Mode you can start without an account.'
        },
        {
          question: 'What are the final subscription prices?',
          answer:
            `Premium is ${PRICES.en.premiumMonthly} per month or ${PRICES.en.premiumYearly} per year. Family is ${PRICES.en.familyMonthly} per month or ${PRICES.en.familyYearly} per year.`
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
        'Explore SkillQuest features for skill tracking, focus timers, XP, levels, statistics, friends, challenges, family tools, Guest Mode, and privacy-first sync.',
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
            'XP, levels, active days, session history, and charts show what you actually practiced.'
        },
        {
          title: 'Motivation with boundaries',
          body:
            'Friends, challenges, and Family tools add accountability without replacing the real work.'
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
      eyebrow: 'Live in de App Store en op Google Play.',
      title: 'Elke minuut focus telt mee voor een vaardigheid',
      subtitle:
        'Een skill tracker met ingebouwde focus timers. Verdien XP, verzamel actieve dagen en zie precies waar je oefentijd heen gaat.',
      primaryCta: 'Download in de App Store',
      secondaryCta: 'Download voor Android',
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
            `Deze ouder-kind functies horen bij het Family abonnement van ${PRICES.nl.familyMonthly}/maand of ${PRICES.nl.familyYearly}/jaar.`
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
        'SkillQuest combineert timers, skills, XP, actieve dagen, statistieken, vrienden, challenges en familie-tools in één gerichte mobiele app.',
      captions: [
        'Bouw elke skill',
        'Focus met timers',
        'Bekijk je voortgang',
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
          title: 'XP, levels en actieve dagen',
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
            'Gebruik vrienden, challenges en familie-tools wanneer accountability helpt.'
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
        `Premium is ${PRICES.nl.premiumMonthly}/maand of ${PRICES.nl.premiumYearly}/jaar. Family is ${PRICES.nl.familyMonthly}/maand of ${PRICES.nl.familyYearly}/jaar.`,
      cta: 'Bekijk plannen'
    },
    trust: {
      heading: 'Gebouwd voor vertrouwen',
      items: [
        'Lees over appwijzigingen op de pagina “Wat is er nieuw”.',
        'Beschikbaar in de App Store en op Google Play.',
        'Support is bereikbaar via hello@skill-quest.app.',
        'Privacy en accountverwijdering zijn in elke taal gelinkt.'
      ]
    },
    lead: {
      badge: 'Nieuwsbrief',
      heading: 'Schrijf je in voor de nieuwsbrief',
      subheading: 'Af en toe een e-mail over nieuwe functies in SkillQuest en tips om vaardigheden op te bouwen, voor jezelf of samen met je kinderen.',
      placeholder: 'jij@voorbeeld.nl',
      emailLabel: 'E-mailadres',
      submit: 'Inschrijven',
      submitting: 'Versturen...',
      submitted: 'Bijna klaar',
      success: 'Kijk in je inbox en bevestig je inschrijving met de link in de e-mail.',
      rateLimited: 'Je hebt het al een paar keer geprobeerd. Probeer het over een uur opnieuw.',
      busy: 'We kunnen vandaag geen bevestigingsmails meer versturen. Probeer het morgen opnieuw.',
      invalidEmail: 'Vul een geldig e-mailadres in.',
      error: 'Er ging iets mis. Probeer het opnieuw.',
      privacy: 'Geen spam. In elke nieuwsbrief kun je je afmelden.',
      privacyLink: 'Zo gaan we om met je gegevens'
    },
    finalCta: {
      heading: 'Begin met de skills die je steeds wilt oefenen',
      body:
        'Download SkillQuest in de App Store of op Google Play.',
      primary: 'Download in de App Store',
      secondary: 'Download voor Android'
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
      terms: 'Gebruiksvoorwaarden',
      deleteAccount: 'Account verwijderen',
      changePassword: 'Wachtwoord wijzigen',
      changelog: 'Wat is er nieuw',
      guides: 'Guides'
    },
    download: {
      metaTitle: 'Download SkillQuest | App Store en Google Play',
      metaDescription:
        'Download SkillQuest in de App Store of op Google Play.',
      title: 'Download SkillQuest',
      subtitle:
        'SkillQuest is beschikbaar in de App Store en op Google Play.',
      iosTitle: 'iPhone en iPad',
      iosStatus: 'Nu beschikbaar in de App Store',
      iosBody:
        'Download de live iOS-release en start met skills, timers, XP, statistieken, vrienden en familie-tools.',
      iosCta: 'Open App Store',
      androidTitle: 'Android',
      androidStatus: 'Nu beschikbaar op Google Play',
      androidBody:
        'Download de Android-app en oefen met timers, XP en statistieken.',
      androidCta: 'Download voor Android',
      qrIos: 'Zit je achter de computer? Scan dan met je iPhone of iPad om de App Store te openen.',
      qrAndroid: 'Zit je achter de computer? Scan dan met je Android-telefoon om deze pagina daar te openen.',
      screenshotsHeading: 'Bekijk de app voordat je installeert',
      screenshotsBody:
        'Deze screenshots komen uit de echte SkillQuest app met schone demodata.',
      finalHeading: 'Kies je platform',
      finalBody:
        'iOS- en Android-gebruikers kunnen nu installeren.'
    },
    pricing: {
      metaTitle: 'SkillQuest Prijzen | Premium en Family',
      metaDescription:
        `Vergelijk Free, Premium en Family voor SkillQuest. Premium is ${PRICES.nl.premiumMonthly}/maand of ${PRICES.nl.premiumYearly}/jaar. Family is ${PRICES.nl.familyMonthly}/maand of ${PRICES.nl.familyYearly}/jaar.`,
      title: 'SkillQuest prijzen',
      subtitle:
        'Start gratis. Premium voegt extra thema’s toe; Family voegt hulpmiddelen voor ouders toe.',
      billingNote: 'Abonnementen worden beheerd via de App Store of Google Play.',
      plans: [
        {
          name: 'Free',
          price: PRICES.nl.free,
          cadence: 'Direct starten',
          description:
            'Alles wat je nodig hebt om te oefenen en je voortgang te zien. Je kunt beginnen zonder account.',
          features: [
            'Alle focustimertechnieken',
            '185 vaardigheden',
            'XP en levels',
            'Statistieken',
            'Actieve dagen',
            'Vrienden en uitdagingen',
            'Guest Mode'
          ]
        },
        {
          name: 'Premium',
          price: `${PRICES.nl.premiumMonthly}/maand`,
          cadence: `${PRICES.nl.premiumYearly}/jaar`,
          description:
            'Voor gebruikers die extra thema’s willen. Al het andere in SkillQuest is gratis.',
          features: [
            'Extra thema’s',
            'Alles uit Free'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICES.nl.familyMonthly}/maand`,
          cadence: `${PRICES.nl.familyYearly}/jaar`,
          description:
            'Voor ouders die het oefenen thuis willen begeleiden: gezinsbeheer, timers voor kinderen, kindstatistieken, doelen en complimenten, plus de Premium-thema’s.',
          features: [
            'Familiebeheer',
            'Start timers voor kinderen',
            'Bekijk statistieken van kinderen, met toestemming',
            'Doelen en complimenten',
            'Premium-thema’s voor het huishouden'
          ]
        }
      ],
      faq: [
        {
          question: 'Kan ik gratis starten?',
          answer:
            'Ja. Timers, vaardigheden, XP, levels, statistieken, actieve dagen, vrienden en uitdagingen zijn gratis. Met Guest Mode begin je zonder account.'
        },
        {
          question: 'Wat zijn de definitieve abonnementstarieven?',
          answer:
            `Premium is ${PRICES.nl.premiumMonthly} per maand of ${PRICES.nl.premiumYearly} per jaar. Family is ${PRICES.nl.familyMonthly} per maand of ${PRICES.nl.familyYearly} per jaar.`
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
        'Ontdek SkillQuest functies voor skill tracking, focus timers, XP, levels, statistieken, vrienden, challenges, familie-tools, Guest Mode en privacygerichte sync.',
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
            'XP, levels, actieve dagen, sessiegeschiedenis en grafieken laten zien wat je echt hebt geoefend.'
        },
        {
          title: 'Motivatie met grenzen',
          body:
            'Vrienden, challenges en Family tools voegen accountability toe zonder het echte werk te vervangen.'
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
      eyebrow: 'Live im App Store und bei Google Play.',
      title: 'Jede fokussierte Minute zählt für einen Skill',
      subtitle:
        'Ein Skill-Tracker mit integrierten Focus-Timern. Sammle XP und aktive Tage und sieh genau, wohin deine Übungszeit fließt.',
      primaryCta: 'Im App Store laden',
      secondaryCta: 'Für Android herunterladen',
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
            `Diese Eltern-Kind-Funktionen gehören zum Family Abo für ${PRICES.de.familyMonthly}/Monat oder ${PRICES.de.familyYearly}/Jahr.`
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
        'SkillQuest verbindet Timer, Skills, XP, aktive Tage, Statistiken, Freunde, Herausforderungen und Familienfunktionen in einer fokussierten mobilen App.',
      captions: [
        'Jeden Skill aufbauen',
        'Mit Timern fokussieren',
        'Fortschritt sehen',
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
          title: 'XP, Levels und aktive Tage',
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
            'Nutze Freunde, Herausforderungen und Familienfunktionen, wenn Verantwortung hilft.'
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
        `Premium kostet ${PRICES.de.premiumMonthly}/Monat oder ${PRICES.de.premiumYearly}/Jahr. Family kostet ${PRICES.de.familyMonthly}/Monat oder ${PRICES.de.familyYearly}/Jahr.`,
      cta: 'Pläne ansehen'
    },
    trust: {
      heading: 'Erst Vertrauen, dann Wachstum',
      items: [
        'Lies auf der Seite „Neuigkeiten“, was sich in der App geändert hat.',
        'Verfügbar im App Store und bei Google Play.',
        'Support gibt es über hello@skill-quest.app.',
        'Datenschutz und Kontolöschung sind in jeder Sprache verlinkt.'
      ]
    },
    lead: {
      badge: 'Newsletter',
      heading: 'Abonniere den Newsletter',
      subheading: 'Ab und zu eine E-Mail über neue Funktionen bei SkillQuest und Tipps zum Aufbau von Fähigkeiten – für dich selbst oder gemeinsam mit deinen Kindern.',
      placeholder: 'du@example.com',
      emailLabel: 'E-Mail-Adresse',
      submit: 'Abonnieren',
      submitting: 'Wird gesendet ...',
      submitted: 'Fast fertig',
      success: 'Schau in deinen Posteingang und bestätige die Anmeldung über den Link in der E-Mail.',
      rateLimited: 'Du hast es schon ein paar Mal versucht. Versuch es in einer Stunde noch einmal.',
      busy: 'Wir können heute keine weiteren Bestätigungs-E-Mails mehr versenden. Versuch es morgen noch einmal.',
      invalidEmail: 'Gib eine gültige E-Mail-Adresse ein.',
      error: 'Es ist ein Fehler aufgetreten. Versuch es noch einmal.',
      privacy: 'Kein Spam. Jeder Newsletter enthält einen Link zum Abmelden.',
      privacyLink: 'Wie wir mit deinen Daten umgehen'
    },
    finalCta: {
      heading: 'Starte mit den Skills, die du schon lange üben willst',
      body:
        'Lade SkillQuest im App Store oder bei Google Play herunter.',
      primary: 'Im App Store laden',
      secondary: 'Für Android herunterladen'
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
      terms: 'Nutzungsbedingungen',
      deleteAccount: 'Konto löschen',
      changePassword: 'Passwort ändern',
      changelog: 'Neuigkeiten',
      guides: 'Guides'
    },
    download: {
      metaTitle: 'SkillQuest herunterladen | App Store und Google Play',
      metaDescription:
        'Lade SkillQuest im App Store oder bei Google Play herunter.',
      title: 'SkillQuest herunterladen',
      subtitle:
        'SkillQuest ist im App Store und bei Google Play verfügbar.',
      iosTitle: 'iPhone und iPad',
      iosStatus: 'Jetzt im App Store verfügbar',
      iosBody:
        'Lade die Live-Version für iOS und starte mit Skills, Timern, XP, Statistiken, Freunden und Familienfunktionen.',
      iosCta: 'App Store öffnen',
      androidTitle: 'Android',
      androidStatus: 'Jetzt bei Google Play verfügbar',
      androidBody:
        'Lade die Android-App herunter und übe mit Timern, XP und Statistiken.',
      androidCta: 'Für Android herunterladen',
      qrIos: 'Bist du am Computer? Scanne den Code mit deinem iPhone oder iPad, um den App Store zu öffnen.',
      qrAndroid: 'Bist du am Computer? Scanne den Code mit deinem Android-Handy, um diese Seite dort zu öffnen.',
      screenshotsHeading: 'Sieh dir die App vor der Installation an',
      screenshotsBody:
        'Diese Screenshots stammen aus der echten SkillQuest App mit sauberen Demodaten.',
      finalHeading: 'Wähle deine Plattform',
      finalBody:
        'iOS- und Android-Nutzer können jetzt installieren.'
    },
    pricing: {
      metaTitle: 'SkillQuest Preise | Premium und Family',
      metaDescription:
        `Vergleiche Free, Premium und Family für SkillQuest. Premium kostet ${PRICES.de.premiumMonthly}/Monat oder ${PRICES.de.premiumYearly}/Jahr. Family kostet ${PRICES.de.familyMonthly}/Monat oder ${PRICES.de.familyYearly}/Jahr.`,
      title: 'SkillQuest Preise',
      subtitle:
        'Starte kostenlos. Premium bringt zusätzliche Designs, Family Werkzeuge für Eltern.',
      billingNote: 'Abos werden über den App Store oder Google Play verwaltet.',
      plans: [
        {
          name: 'Free',
          price: PRICES.de.free,
          cadence: 'Sofort starten',
          description:
            'Alles, was du zum Üben und für deinen sichtbaren Fortschritt brauchst. Du kannst ohne Konto starten.',
          features: [
            'Alle Fokus-Timer-Techniken',
            '185 Fähigkeiten',
            'XP und Levels',
            'Statistiken',
            'Aktive Tage',
            'Freunde und Herausforderungen',
            'Guest Mode'
          ]
        },
        {
          name: 'Premium',
          price: `${PRICES.de.premiumMonthly}/Monat`,
          cadence: `${PRICES.de.premiumYearly}/Jahr`,
          description:
            'Für Nutzer, die zusätzliche Designs möchten. Alles andere in SkillQuest ist kostenlos.',
          features: [
            'Zusätzliche Designs',
            'Alles aus Free'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICES.de.familyMonthly}/Monat`,
          cadence: `${PRICES.de.familyYearly}/Jahr`,
          description:
            'Für Eltern, die das Üben zu Hause begleiten möchten: Familienverwaltung, Timer für Kinder, Kinderstatistiken, Ziele und Komplimente, dazu die Premium-Designs.',
          features: [
            'Familienverwaltung',
            'Timer für Kinder starten',
            'Statistiken von Kindern sehen, mit Einwilligung',
            'Ziele und Komplimente',
            'Premium-Designs für den Haushalt'
          ]
        }
      ],
      faq: [
        {
          question: 'Kann ich kostenlos starten?',
          answer:
            'Ja. Timer, Fähigkeiten, XP, Levels, Statistiken, aktive Tage, Freunde und Herausforderungen sind kostenlos. Mit dem Guest Mode startest du ohne Konto.'
        },
        {
          question: 'Was sind die endgültigen Abo-Preise?',
          answer:
            `Premium kostet ${PRICES.de.premiumMonthly} pro Monat oder ${PRICES.de.premiumYearly} pro Jahr. Family kostet ${PRICES.de.familyMonthly} pro Monat oder ${PRICES.de.familyYearly} pro Jahr.`
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
        'Entdecke SkillQuest Funktionen für Skill Tracking, Fokus-Timer, XP, Levels, Statistiken, Freunde, Herausforderungen, Familienfunktionen, Guest Mode und datenschutzorientierte Sync.',
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
            'XP, Levels, aktive Tage, Session-Verlauf und Diagramme zeigen, was du wirklich geübt hast.'
        },
        {
          title: 'Motivation mit Grenzen',
          body:
            'Freunde, Herausforderungen und Family Funktionen schaffen Verantwortung, ohne die echte Arbeit zu ersetzen.'
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
      title: 'SkillQuest | Développe tes compétences : minuteurs, XP et famille',
      description:
        'SkillQuest aide les personnes et les familles à développer leurs compétences : minuteurs de concentration, XP, statistiques, amis, défis et synchronisation privée.'
    },
    nav: {
      features: 'Fonctions',
      pricing: 'Prix',
      download: 'Télécharger',
      support: 'Support',
      cta: 'Obtenir l’app'
    },
    hero: {
      eyebrow: 'Disponible sur l’App Store et sur Google Play.',
      title: 'Chaque minute de concentration compte pour une compétence',
      subtitle:
        'Une app de suivi de compétences avec minuteurs de concentration intégrés. Gagne des XP, accumule des jours actifs et vois exactement où passe ton temps de pratique.',
      primaryCta: 'Télécharger sur l’App Store',
      secondaryCta: 'Télécharger pour Android',
      tertiaryCta: 'Comparer les prix',
      trust: ['Démarrage gratuit', 'Sans publicité', 'Synchronisation privée']
    },
    audiences: {
      heading: 'Un suivi de compétences pour progresser seul ou en famille',
      items: [
        {
          title: 'Pour ton développement personnel',
          body:
            'Suis tes études, ton entraînement, tes créations, tes lectures, ton code, ta musique et toute habitude que tu veux renforcer.'
        },
        {
          title: 'Pour les parents',
          body:
            'Structure le temps de pratique, aide tes enfants avec des minuteurs et rends les progrès visibles, sans ajouter de pression.'
        }
      ]
    },
    familySupport: {
      badge: 'Abonnement Family',
      heading: 'Offre un cadre à tes enfants sans prendre le contrôle de leur progression',
      body:
        'Avec l’abonnement Family, les parents voient quand un enfant lance un minuteur de concentration et peuvent en lancer un pour lui quand il est temps de pratiquer. La famille trouve ainsi un rythme commun : l’enfant sait sur quoi travailler, et les parents soutiennent la routine sans avoir à deviner.',
      items: [
        {
          title: 'Voir l’activité des minuteurs',
          body:
            'Vois quand les sessions démarrent, pour parler d’école, de sport, de musique ou de création à partir d’un effort visible.'
        },
        {
          title: 'Lancer des minuteurs pour les enfants',
          body:
            'Aide ton enfant à démarrer une session de concentration depuis l’espace famille, avec une prochaine étape claire.'
        },
        {
          title: 'Avancer vers un objectif',
          body:
            'XP, niveaux et progression des compétences rendent la pratique régulière visible pour les parents comme pour les enfants.'
        },
        {
          title: 'Inclus dans Family',
          body:
            `Ces fonctions parent-enfant font partie de l’abonnement Family à ${PRICES.fr.familyMonthly}/mois ou ${PRICES.fr.familyYearly}/an.`
        }
      ],
      note:
        'Les fonctions famille nécessitent un abonnement Family. Elles sont conçues pour apporter un cadre et une motivation partagée.',
      cta: 'Voir Family',
      imageAlt: 'Capture d’écran des fonctions famille et sociales de SkillQuest'
    },
    product: {
      heading: 'Des progrès réels, pas une simple liste d’habitudes',
      body:
        'SkillQuest relie minuteurs, compétences, XP, jours actifs, statistiques, amis, défis et fonctions famille dans une app mobile qui va à l’essentiel.',
      captions: [
        'Développe chaque compétence',
        'Concentre-toi avec les minuteurs',
        'Vois tes progrès',
        'Progresse avec les autres',
        'Personnalise l’expérience'
      ]
    },
    benefits: {
      heading: 'Ce qui fait revenir les utilisateurs',
      items: [
        {
          title: 'Minuteurs par compétence',
          body:
            'Lance une session pour la compétence que tu travailles et relie l’effort à des progrès concrets.'
        },
        {
          title: 'XP, niveaux et jours actifs',
          body:
            'Rends tes progrès visibles après chaque session, avec des récompenses qui encouragent la régularité.'
        },
        {
          title: 'Statistiques par compétence',
          body:
            'Analyse le temps, les sessions et ton évolution par jour, semaine, mois et année.'
        },
        {
          title: 'Motivation sociale et familiale',
          body:
            'Appuie-toi sur les amis, les défis et les fonctions famille quand s’engager devant les autres t’aide à tenir.'
        },
        {
          title: 'Thèmes et personnalisation',
          body:
            'Adapte l’expérience tout en gardant un parcours simple, facile à répéter.'
        },
        {
          title: 'Mode invité',
          body:
            'Essaie l’app tout de suite, avant de créer un compte ou de synchroniser tes progrès.'
        }
      ]
    },
    pricingPreview: {
      heading: 'Des abonnements simples',
      body:
        `Premium coûte ${PRICES.fr.premiumMonthly}/mois ou ${PRICES.fr.premiumYearly}/an. Family coûte ${PRICES.fr.familyMonthly}/mois ou ${PRICES.fr.familyYearly}/an.`,
      cta: 'Voir les formules'
    },
    trust: {
      heading: 'La confiance avant la croissance',
      items: [
        'Retrouve les changements de l’app sur la page « Nouveautés ».',
        'Disponible sur l’App Store et sur Google Play.',
        'Le support est disponible via hello@skill-quest.app.',
        'Les pages de confidentialité et de suppression de compte sont accessibles dans chaque langue.'
      ]
    },
    lead: {
      badge: 'Newsletter',
      heading: 'Abonne-toi à la newsletter',
      subheading: 'De temps en temps, tu recevras un e-mail sur les nouvelles fonctionnalités de SkillQuest et des conseils pour développer tes compétences, que ce soit pour toi ou avec tes enfants.',
      placeholder: 'toi@example.com',
      emailLabel: 'Adresse e-mail',
      submit: "S'abonner",
      submitting: 'Envoi en cours...',
      submitted: "C'est presque fini",
      success: "Vérifie ta boîte de réception et confirme en cliquant sur le lien contenu dans l'e-mail.",
      rateLimited: 'Tu as déjà essayé plusieurs fois. Réessaie dans une heure.',
      busy: "Nous ne pouvons plus envoyer d'e-mails de confirmation aujourd'hui. Réessaie demain.",
      invalidEmail: 'Entre une adresse e-mail valide.',
      error: "Une erreur s'est produite. Réessaie.",
      privacy: 'Pas de spam. Chaque newsletter comporte un lien pour se désabonner.',
      privacyLink: 'Comment nous traitons tes données'
    },
    finalCta: {
      heading: 'Commence par les compétences que tu veux vraiment pratiquer',
      body:
        'Télécharge SkillQuest sur l’App Store ou sur Google Play.',
      primary: 'Télécharger sur l’App Store',
      secondary: 'Télécharger pour Android'
    },
    footer: {
      description:
        'SkillQuest aide les personnes et les familles à transformer des séances de concentration en progrès visibles.',
      product: 'Produit',
      resources: 'Ressources',
      legal: 'Légal',
      download: 'Télécharger',
      features: 'Fonctions',
      pricing: 'Prix',
      support: 'Support',
      privacy: 'Confidentialité',
      terms: 'Conditions d\'utilisation',
      deleteAccount: 'Suppression de compte',
      changePassword: 'Changer le mot de passe',
      changelog: 'Nouveautés',
      guides: 'Guides'
    },
    download: {
      metaTitle: 'Télécharger SkillQuest | App Store et Google Play',
      metaDescription:
        'Télécharge SkillQuest sur l’App Store ou sur Google Play.',
      title: 'Télécharger SkillQuest',
      subtitle:
        'SkillQuest est disponible sur l’App Store et sur Google Play.',
      iosTitle: 'iPhone et iPad',
      iosStatus: 'Disponible dès maintenant sur l’App Store',
      iosBody:
        'Télécharge la version iOS et commence avec les compétences, les minuteurs, les XP, les statistiques, les amis et les fonctions famille.',
      iosCta: 'Ouvrir l’App Store',
      androidTitle: 'Android',
      androidStatus: 'Disponible dès maintenant sur Google Play',
      androidBody:
        'Télécharge l’app Android et entraîne-toi avec des minuteurs, des XP et des statistiques.',
      androidCta: 'Télécharger pour Android',
      qrIos: 'Tu es sur un ordinateur ? Scanne le code avec ton iPhone ou ton iPad pour ouvrir l’App Store.',
      qrAndroid: 'Tu es sur un ordinateur ? Scanne le code avec ton téléphone Android pour y ouvrir cette page.',
      screenshotsHeading: 'Découvrir l’app avant de l’installer',
      screenshotsBody:
        'Ces captures proviennent de la vraie app SkillQuest avec des données de démonstration.',
      finalHeading: 'Choisis ta plateforme',
      finalBody:
        'Les utilisateurs iOS et Android peuvent l’installer dès maintenant.'
    },
    pricing: {
      metaTitle: 'Prix SkillQuest | Premium et Family',
      metaDescription:
        `Compare Free, Premium et Family pour SkillQuest. Premium coûte ${PRICES.fr.premiumMonthly}/mois ou ${PRICES.fr.premiumYearly}/an. Family coûte ${PRICES.fr.familyMonthly}/mois ou ${PRICES.fr.familyYearly}/an.`,
      title: 'Prix SkillQuest',
      subtitle:
        'Commence gratuitement. Premium ajoute des thèmes supplémentaires, Family des outils pour les parents.',
      billingNote: 'Les abonnements sont gérés via l’App Store ou Google Play.',
      plans: [
        {
          name: 'Free',
          price: PRICES.fr.free,
          cadence: 'Commencer maintenant',
          description:
            'Tout ce qu’il te faut pour pratiquer et voir tes progrès. Tu peux commencer sans compte.',
          features: [
            'Toutes les techniques de minuteur',
            '185 compétences',
            'XP et niveaux',
            'Statistiques',
            'Jours actifs',
            'Amis et défis',
            'Mode invité'
          ]
        },
        {
          name: 'Premium',
          price: `${PRICES.fr.premiumMonthly}/mois`,
          cadence: `${PRICES.fr.premiumYearly}/an`,
          description:
            'Pour celles et ceux qui veulent des thèmes supplémentaires. Tout le reste dans SkillQuest est gratuit.',
          features: [
            'Thèmes supplémentaires',
            'Tout ce qui est dans Free'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICES.fr.familyMonthly}/mois`,
          cadence: `${PRICES.fr.familyYearly}/an`,
          description:
            'Pour les parents qui veulent accompagner la pratique à la maison : gestion de la famille, minuteurs pour les enfants, statistiques des enfants, objectifs et compliments, plus les thèmes Premium.',
          features: [
            'Gestion familiale',
            'Lancer des minuteurs pour les enfants',
            'Voir les statistiques des enfants, avec autorisation',
            'Objectifs et compliments',
            'Thèmes Premium pour le foyer'
          ]
        }
      ],
      faq: [
        {
          question: 'Puis-je commencer gratuitement ?',
          answer:
            'Oui. Les minuteurs, les compétences, les XP, les niveaux, les statistiques, les jours actifs, les amis et les défis sont gratuits. Avec le mode invité, tu peux commencer sans compte.'
        },
        {
          question: 'Quels sont les prix finaux des abonnements ?',
          answer:
            `Premium coûte ${PRICES.fr.premiumMonthly} par mois ou ${PRICES.fr.premiumYearly} par an. Family coûte ${PRICES.fr.familyMonthly} par mois ou ${PRICES.fr.familyYearly} par an.`
        },
        {
          question: 'Comment annuler ?',
          answer:
            'Les abonnements sont gérés par l’App Store ou Google Play. Tu peux annuler ton abonnement depuis le compte App Store ou Google Play avec lequel tu t’es abonné.'
        }
      ]
    },
    featuresPage: {
      metaTitle: 'Fonctions SkillQuest | Minuteurs, XP, stats, amis, famille',
      metaDescription:
        'Découvre les fonctions de SkillQuest : suivi des compétences, minuteurs, XP, niveaux, statistiques, amis, défis, famille, mode invité et synchronisation privée.',
      title: 'Des fonctions qui transforment la pratique en progrès',
      subtitle:
        'SkillQuest repose sur la boucle essentielle : choisir une compétence, se concentrer, gagner de l’XP, revoir ses progrès et revenir demain.',
      sections: [
        {
          title: 'Suivre toute compétence',
          body:
            'Utilise SkillQuest pour tes études, le sport, la musique, la lecture, le code, la création ou toute habitude que tu veux renforcer.'
        },
        {
          title: 'Minuteurs de concentration',
          body:
            'Utilise des techniques comme Pomodoro, Deep Work, Flowtime, 52-17, des sessions personnalisées et EMOM quand l’app les prend en charge.'
        },
        {
          title: 'Des progrès vérifiables',
          body:
            'XP, niveaux, jours actifs, historique des sessions et graphiques montrent ce que tu as réellement pratiqué.'
        },
        {
          title: 'Motivation avec limites',
          body:
            'Amis, défis et fonctions Family ajoutent de l’engagement sans remplacer le vrai travail.'
        },
        {
          title: 'Pratique guidée par les parents',
          body:
            'Avec Family, les parents peuvent voir quand les enfants lancent des minuteurs, en lancer pour eux et relier la pratique à un objectif clair.'
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
      eyebrow: 'Disponible en App Store y en Google Play.',
      title: 'Cada minuto de concentración cuenta para una habilidad',
      subtitle:
        'Un skill tracker con focus timers integrados. Gana XP, suma días activos y ve exactamente adónde va tu tiempo de práctica.',
      primaryCta: 'Descargar en App Store',
      secondaryCta: 'Descárgala para Android',
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
            `Estas funciones padre-hijo forman parte de la suscripción Family por ${PRICES.es.familyMonthly}/mes o ${PRICES.es.familyYearly}/año.`
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
        'SkillQuest conecta temporizadores, habilidades, XP, días activos, estadísticas, amigos, retos y funciones familiares en una app móvil enfocada.',
      captions: [
        'Desarrolla cada habilidad',
        'Concéntrate con temporizadores',
        'Ve tu progreso',
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
          title: 'XP, niveles y días activos',
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
            'Usa amigos, retos y funciones familiares cuando la responsabilidad compartida ayuda.'
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
        `Premium cuesta ${PRICES.es.premiumMonthly}/mes o ${PRICES.es.premiumYearly}/año. Family cuesta ${PRICES.es.familyMonthly}/mes o ${PRICES.es.familyYearly}/año.`,
      cta: 'Ver planes'
    },
    trust: {
      heading: 'Confianza antes de crecer',
      items: [
        'Consulta los cambios de la app en la página «Novedades».',
        'Disponible en App Store y en Google Play.',
        'Soporte disponible en hello@skill-quest.app.',
        'Privacidad y eliminación de cuenta están enlazadas en cada idioma.'
      ]
    },
    lead: {
      badge: 'Boletín informativo',
      heading: 'Suscríbete al boletín',
      subheading: 'De vez en cuando te mandaremos un correo sobre las novedades de SkillQuest y consejos para desarrollar habilidades, ya sea para ti o con tus hijos.',
      placeholder: 'tu@example.com',
      emailLabel: 'Correo electrónico',
      submit: 'Suscribirse',
      submitting: 'Enviando...',
      submitted: 'Ya casi está',
      success: 'Echa un vistazo a tu bandeja de entrada y confirma tu suscripción con el enlace del correo.',
      rateLimited: 'Ya lo has intentado unas cuantas veces. Vuelve a intentarlo dentro de una hora.',
      busy: 'Hoy no podemos enviar más correos de confirmación. Inténtalo de nuevo mañana.',
      invalidEmail: 'Introduce una dirección de correo electrónico válida.',
      error: 'Ha habido un error. Inténtalo de nuevo.',
      privacy: 'Sin spam. Cada boletín incluye un enlace para darte de baja.',
      privacyLink: 'Cómo tratamos tus datos'
    },
    finalCta: {
      heading: 'Empieza con las habilidades que siempre quieres practicar',
      body:
        'Descarga SkillQuest en App Store o en Google Play.',
      primary: 'Descargar en App Store',
      secondary: 'Descárgala para Android'
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
      terms: 'Condiciones de servicio',
      deleteAccount: 'Eliminar cuenta',
      changePassword: 'Cambiar contraseña',
      changelog: 'Novedades',
      guides: 'Guías'
    },
    download: {
      metaTitle: 'Descargar SkillQuest | App Store y Google Play',
      metaDescription:
        'Descarga SkillQuest en App Store o en Google Play.',
      title: 'Descargar SkillQuest',
      subtitle:
        'SkillQuest está disponible en App Store y en Google Play.',
      iosTitle: 'iPhone y iPad',
      iosStatus: 'Disponible ahora en App Store',
      iosBody:
        'Descarga la versión iOS en vivo y empieza con habilidades, temporizadores, XP, estadísticas, amigos y funciones familiares.',
      iosCta: 'Abrir App Store',
      androidTitle: 'Android',
      androidStatus: 'Disponible ahora en Google Play',
      androidBody:
        'Descarga la app para Android y practica con temporizadores, XP y estadísticas.',
      androidCta: 'Descárgala para Android',
      qrIos: '¿Estás en el ordenador? Escanea el código con tu iPhone o iPad para abrir la App Store.',
      qrAndroid: '¿Estás en el ordenador? Escanea el código con tu móvil Android para abrir esta página allí.',
      screenshotsHeading: 'Mira la app antes de instalar',
      screenshotsBody:
        'Estas capturas provienen de la app real SkillQuest con datos demo limpios.',
      finalHeading: 'Elige tu plataforma',
      finalBody:
        'Los usuarios de iOS y Android pueden instalar ahora.'
    },
    pricing: {
      metaTitle: 'Precios de SkillQuest | Premium y Family',
      metaDescription:
        `Compara Free, Premium y Family para SkillQuest. Premium cuesta ${PRICES.es.premiumMonthly}/mes o ${PRICES.es.premiumYearly}/año. Family cuesta ${PRICES.es.familyMonthly}/mes o ${PRICES.es.familyYearly}/año.`,
      title: 'Precios de SkillQuest',
      subtitle:
        'Empieza gratis. Premium añade temas extra y Family, herramientas para padres.',
      billingNote: 'Las suscripciones se gestionan mediante App Store o Google Play.',
      plans: [
        {
          name: 'Free',
          price: PRICES.es.free,
          cadence: 'Empieza al instante',
          description:
            'Todo lo que necesitas para practicar y ver tu progreso. Puedes empezar sin cuenta.',
          features: [
            'Todas las técnicas de temporizador',
            '185 habilidades',
            'XP y niveles',
            'Estadísticas',
            'Días activos',
            'Amigos y retos',
            'Guest Mode'
          ]
        },
        {
          name: 'Premium',
          price: `${PRICES.es.premiumMonthly}/mes`,
          cadence: `${PRICES.es.premiumYearly}/año`,
          description:
            'Para quien quiere temas extra. Todo lo demás en SkillQuest es gratis.',
          features: [
            'Temas extra',
            'Todo lo de Free'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICES.es.familyMonthly}/mes`,
          cadence: `${PRICES.es.familyYearly}/año`,
          description:
            'Para padres que quieren acompañar la práctica en casa: gestión familiar, temporizadores para niños, estadísticas infantiles, metas y cumplidos, además de los temas Premium.',
          features: [
            'Gestión familiar',
            'Iniciar temporizadores para niños',
            'Ver estadísticas infantiles, con permiso',
            'Metas y cumplidos',
            'Temas Premium para el hogar'
          ]
        }
      ],
      faq: [
        {
          question: '¿Puedo empezar sin pagar?',
          answer:
            'Sí. Los temporizadores, las habilidades, los XP, los niveles, las estadísticas, los días activos, los amigos y los retos son gratis. Con Guest Mode puedes empezar sin cuenta.'
        },
        {
          question: '¿Cuáles son los precios finales?',
          answer:
            `Premium cuesta ${PRICES.es.premiumMonthly} al mes o ${PRICES.es.premiumYearly} al año. Family cuesta ${PRICES.es.familyMonthly} al mes o ${PRICES.es.familyYearly} al año.`
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
        'Explora funciones de SkillQuest para seguimiento de habilidades, temporizadores, XP, niveles, estadísticas, amigos, retos, familia, Guest Mode y sincronización privada.',
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
            'XP, niveles, días activos, historial de sesiones y gráficos muestran lo que realmente practicaste.'
        },
        {
          title: 'Motivación con límites',
          body:
            'Amigos, retos y funciones Family añaden responsabilidad sin sustituir el trabajo real.'
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
      title: 'SkillQuest | Sviluppa le tue abilità con timer, XP e funzioni famiglia',
      description:
        'SkillQuest aiuta persone e famiglie a sviluppare le proprie abilità con timer di concentrazione, XP, statistiche, amici, sfide e sincronizzazione rispettosa della privacy.'
    },
    nav: {
      features: 'Funzioni',
      pricing: 'Prezzi',
      download: 'Scarica',
      support: 'Supporto',
      cta: 'Ottieni l’app'
    },
    hero: {
      eyebrow: 'Disponibile su App Store e su Google Play.',
      title: 'Ogni minuto di concentrazione conta per un’abilità',
      subtitle:
        'Un’app per tracciare le tue abilità, con timer di concentrazione integrati. Guadagna XP, accumula giorni attivi e vedi esattamente dove va il tuo tempo di pratica.',
      primaryCta: 'Scarica da App Store',
      secondaryCta: 'Scarica per Android',
      tertiaryCta: 'Confronta i prezzi',
      trust: ['Inizia gratis', 'Niente pubblicità', 'Sincronizzazione rispettosa della privacy']
    },
    audiences: {
      heading: 'Un tracker di abilità per la crescita personale e la pratica guidata in famiglia',
      items: [
        {
          title: 'Per la crescita personale',
          body:
            'Traccia studio, allenamento, lavoro creativo, lettura, programmazione, musica e ogni abitudine che vuoi rafforzare.'
        },
        {
          title: 'Per i genitori',
          body:
            'Dai struttura al tempo di pratica, aiuta i figli con i timer e rendi i progressi visibili senza aggiungere pressione.'
        }
      ]
    },
    familySupport: {
      badge: 'Abbonamento Family',
      heading: 'Dai struttura alla routine dei tuoi figli senza prendere il controllo dei loro progressi',
      body:
        'Con l’abbonamento Family, i genitori possono vedere quando un figlio avvia un timer di concentrazione e possono avviare i timer per i figli quando è il momento di fare pratica. Così la famiglia ha un ritmo condiviso: il figlio sa su cosa lavorare e i genitori possono sostenere la routine senza dover tirare a indovinare.',
      items: [
        {
          title: 'Vedi l’attività dei timer',
          body:
            'Segui quando iniziano le sessioni, così le conversazioni su scuola, sport, musica o creatività partono da uno sforzo visibile.'
        },
        {
          title: 'Avvia timer per i figli',
          body:
            'Aiuta tuo figlio a iniziare una sessione di concentrazione dalla sezione famiglia, con un passo successivo chiaro.'
        },
        {
          title: 'Lavora verso un obiettivo',
          body:
            'XP, livelli e progressi delle abilità rendono visibile la pratica costante a genitori e figli.'
        },
        {
          title: 'Incluso in Family',
          body:
            `Queste funzioni genitore-figlio fanno parte dell’abbonamento Family a ${PRICES.it.familyMonthly}/mese o ${PRICES.it.familyYearly}/anno.`
        }
      ],
      note:
        'Le funzioni famiglia richiedono un abbonamento Family e sono pensate per offrire orientamento, struttura e motivazione condivisa.',
      cta: 'Vedi Family',
      imageAlt: 'Screenshot SkillQuest con funzioni famiglia e social'
    },
    product: {
      heading: 'Progressi reali, non un’altra lista vaga di abitudini',
      body:
        'SkillQuest collega timer, abilità, XP, giorni attivi, statistiche, amici, sfide e funzioni famiglia in un’unica app mobile, semplice e mirata.',
      captions: [
        'Sviluppa ogni abilità',
        'Concentrati con i timer',
        'Vedi i progressi',
        'Cresci insieme agli altri',
        'Personalizza a modo tuo'
      ]
    },
    benefits: {
      heading: 'Perché gli utenti continuano a usare SkillQuest',
      items: [
        {
          title: 'Timer per abilità',
          body:
            'Avvia una sessione per l’abilità su cui lavori e collega l’impegno a progressi reali.'
        },
        {
          title: 'XP, livelli e giorni attivi',
          body:
            'Rendi visibili i progressi dopo ogni sessione con ricompense che rafforzano la costanza.'
        },
        {
          title: 'Statistiche per abilità',
          body:
            'Controlla tempo, sessioni e crescita per giorno, settimana, mese e anno.'
        },
        {
          title: 'Motivazione sociale e familiare',
          body:
            'Usa amici, sfide e funzioni famiglia quando condividere i tuoi impegni con qualcuno ti dà la spinta giusta.'
        },
        {
          title: 'Temi e personalizzazione',
          body:
            'Personalizza l’esperienza senza complicare il percorso principale, che resta semplice e ripetibile.'
        },
        {
          title: 'Modalità ospite',
          body:
            'Prova subito l’app prima di creare un account o sincronizzare i progressi.'
        }
      ]
    },
    pricingPreview: {
      heading: 'Abbonamenti semplici',
      body:
        `Premium costa ${PRICES.it.premiumMonthly}/mese o ${PRICES.it.premiumYearly}/anno. Family costa ${PRICES.it.familyMonthly}/mese o ${PRICES.it.familyYearly}/anno.`,
      cta: 'Vedi i piani'
    },
    trust: {
      heading: 'Fiducia prima della crescita',
      items: [
        'Leggi gli aggiornamenti dell’app nella pagina «Novità».',
        'Disponibile su App Store e su Google Play.',
        'Per il supporto scrivi a hello@skill-quest.app.',
        'Le pagine su privacy ed eliminazione dell’account sono disponibili in ogni lingua.'
      ]
    },
    lead: {
      badge: 'Newsletter',
      heading: 'Iscriviti alla newsletter',
      subheading: "Di tanto in tanto un'email con le novità di SkillQuest e consigli per sviluppare le tue abilità, da solo o insieme ai tuoi figli.",
      placeholder: 'tu@example.com',
      emailLabel: 'Indirizzo email',
      submit: 'Iscriviti',
      submitting: 'Invio in corso...',
      submitted: 'Ci siamo quasi',
      success: "Controlla la tua casella di posta e conferma con il link nell'email.",
      rateLimited: "Ci hai già provato un paio di volte. Riprova tra un'ora.",
      busy: 'Oggi non possiamo più inviare email di conferma. Riprova domani.',
      invalidEmail: 'Inserisci un indirizzo e-mail valido.',
      error: 'Si è verificato un errore. Riprova.',
      privacy: 'Niente spam. Ogni newsletter ha un link per annullare l’iscrizione.',
      privacyLink: 'Come trattiamo i tuoi dati'
    },
    finalCta: {
      heading: 'Inizia dalle abilità che vuoi davvero praticare',
      body:
        'Scarica SkillQuest su App Store o su Google Play.',
      primary: 'Scarica da App Store',
      secondary: 'Scarica per Android'
    },
    footer: {
      description:
        'SkillQuest aiuta persone e famiglie a trasformare la pratica mirata in crescita visibile.',
      product: 'Prodotto',
      resources: 'Risorse',
      legal: 'Note legali',
      download: 'Scarica',
      features: 'Funzioni',
      pricing: 'Prezzi',
      support: 'Supporto',
      privacy: 'Privacy',
      terms: 'Termini di servizio',
      deleteAccount: 'Eliminazione account',
      changePassword: 'Cambia password',
      changelog: 'Novità',
      guides: 'Guide'
    },
    download: {
      metaTitle: 'Scarica SkillQuest | App Store e Google Play',
      metaDescription:
        'Scarica SkillQuest su App Store o su Google Play.',
      title: 'Scarica SkillQuest',
      subtitle:
        'SkillQuest è disponibile su App Store e su Google Play.',
      iosTitle: 'iPhone e iPad',
      iosStatus: 'Disponibile ora su App Store',
      iosBody:
        'Scarica l’app per iOS e inizia con abilità, timer, XP, statistiche, amici e funzioni famiglia.',
      iosCta: 'Apri App Store',
      androidTitle: 'Android',
      androidStatus: 'Disponibile ora su Google Play',
      androidBody:
        'Scarica l’app Android ed esercitati con timer, XP e statistiche.',
      androidCta: 'Scarica per Android',
      qrIos: 'Sei al computer? Scansiona il codice con il tuo iPhone o iPad per aprire l’App Store.',
      qrAndroid: 'Sei al computer? Scansiona il codice con il tuo telefono Android per aprire questa pagina sul telefono.',
      screenshotsHeading: 'Guarda l’app prima di installarla',
      screenshotsBody:
        'Questi screenshot provengono dalla vera app SkillQuest con dati di esempio.',
      finalHeading: 'Scegli la piattaforma',
      finalBody:
        'Puoi installare subito l’app su iOS e Android.'
    },
    pricing: {
      metaTitle: 'Prezzi SkillQuest | Premium e Family',
      metaDescription:
        `Confronta Free, Premium e Family per SkillQuest. Premium costa ${PRICES.it.premiumMonthly}/mese o ${PRICES.it.premiumYearly}/anno. Family costa ${PRICES.it.familyMonthly}/mese o ${PRICES.it.familyYearly}/anno.`,
      title: 'Prezzi SkillQuest',
      subtitle:
        'Inizia gratis. Premium aggiunge temi extra, Family strumenti per i genitori.',
      billingNote: 'Gli abbonamenti sono gestiti tramite App Store o Google Play.',
      plans: [
        {
          name: 'Free',
          price: PRICES.it.free,
          cadence: 'Inizia subito',
          description:
            'Tutto ciò che ti serve per esercitarti e vedere i tuoi progressi. Puoi iniziare senza account.',
          features: [
            'Tutte le tecniche di timer',
            '185 abilità',
            'XP e livelli',
            'Statistiche',
            'Giorni attivi',
            'Amici e sfide',
            'Modalità ospite'
          ]
        },
        {
          name: 'Premium',
          price: `${PRICES.it.premiumMonthly}/mese`,
          cadence: `${PRICES.it.premiumYearly}/anno`,
          description:
            'Per chi vuole temi extra. Tutto il resto in SkillQuest è gratuito.',
          features: [
            'Temi extra',
            'Tutto ciò che c’è in Free'
          ],
          highlighted: true
        },
        {
          name: 'Family',
          price: `${PRICES.it.familyMonthly}/mese`,
          cadence: `${PRICES.it.familyYearly}/anno`,
          description:
            'Per i genitori che vogliono accompagnare la pratica a casa: gestione della famiglia, timer per i figli, statistiche dei figli, obiettivi e complimenti, più i temi Premium.',
          features: [
            'Gestione famiglia',
            'Avvia i timer per i figli',
            'Vedi le statistiche dei figli, con autorizzazione',
            'Obiettivi e complimenti',
            'Temi Premium per la famiglia'
          ]
        }
      ],
      faq: [
        {
          question: 'Posso iniziare senza pagare?',
          answer:
            'Sì. Timer, abilità, XP, livelli, statistiche, giorni attivi, amici e sfide sono gratuiti. Con la Modalità ospite puoi iniziare senza account.'
        },
        {
          question: 'Quali sono i prezzi finali?',
          answer:
            `Premium costa ${PRICES.it.premiumMonthly} al mese o ${PRICES.it.premiumYearly} all’anno. Family costa ${PRICES.it.familyMonthly} al mese o ${PRICES.it.familyYearly} all’anno.`
        },
        {
          question: 'Come posso annullare l’abbonamento?',
          answer:
            'Gli abbonamenti sono gestiti da App Store o Google Play. Puoi annullare l’abbonamento dall’account dello store con cui lo hai attivato.'
        }
      ]
    },
    featuresPage: {
      metaTitle: 'Funzioni SkillQuest | Timer, XP, statistiche, amici, famiglia',
      metaDescription:
        'Scopri le funzioni di SkillQuest: tracciamento delle abilità, timer, XP, livelli, statistiche, amici, sfide, famiglia, Modalità ospite e sincronizzazione attenta alla privacy.',
      title: 'Funzioni che trasformano la pratica in progresso',
      subtitle:
        'SkillQuest si basa sul ciclo che conta: scegli un’abilità, concentrati, guadagna XP, rivedi i progressi e torna domani.',
      sections: [
        {
          title: 'Traccia qualsiasi abilità',
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
            'XP, livelli, giorni attivi, cronologia sessioni e grafici mostrano cosa hai davvero praticato.'
        },
        {
          title: 'Motivazione senza pressioni',
          body:
            'Amici, sfide e funzioni Family ti danno un motivo in più per impegnarti, senza sostituire il lavoro vero.'
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
