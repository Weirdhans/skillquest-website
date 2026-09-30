import {routing} from '@/i18n/routing';
import {languageTags, localizedPath, type Locale} from '@/lib/marketing';

// Tips are articles that answer questions people search for, such as "my
// child does not want to read". Unlike the feature guides they are written
// per language: an article only exists in the locales listed here, and its
// slug can differ per locale. Translations come from DeepL, never from an AI
// writing tool.

export const TIPS_AUTHOR = 'Hans Vlasblom';

export type TipSection = {
  title: string;
  paragraphs: string[];
};

export type TipArticle = {
  /** Shared across the language versions of one article. */
  id: string;
  locale: Locale;
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  cardSummary: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  readingMinutes: number;
  sections: TipSection[];
  app: {
    title: string;
    body: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export type TipsUiCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  byline: string;
  readingTime: (minutes: number) => string;
  iphoneCta: string;
  androidCta: string;
  androidNote: string;
  faqHeading: string;
  moreTips: string;
};

const uiCopy: Partial<Record<Locale, TipsUiCopy>> = {
  nl: {
    metaTitle: 'Tips voor oefenen en lezen | SkillQuest',
    metaDescription:
      'Praktische tips om elke dag te oefenen, voor kinderen en volwassenen: van lezen tot een instrument. Geschreven door de maker van SkillQuest.',
    eyebrow: 'Tips',
    heading: 'Tips om elke dag te oefenen',
    subtitle:
      'Praktische tips voor lezen, een instrument of iets anders wat je wilt leren. Geschreven door Hans Vlasblom, vader en maker van SkillQuest.',
    byline: 'Door Hans Vlasblom, vader en maker van SkillQuest',
    readingTime: (minutes) => `${minutes} minuten lezen`,
    iphoneCta: 'Download voor iPhone en iPad',
    androidCta: 'Android-testversie',
    androidNote:
      'Android zit nog in een testfase van Google Play. Via de testversie doe je mee en help je de app beter te maken.',
    faqHeading: 'Veelgestelde vragen',
    moreTips: 'Meer tips'
  }
};

const articles: TipArticle[] = [
  {
    id: 'child-reluctant-reader',
    locale: 'nl',
    slug: 'kind-wil-niet-lezen',
    eyebrow: 'Lezen',
    title: 'Kind heeft geen zin in lezen? Zo wordt 10 minuten per dag makkelijker',
    metaTitle: 'Kind wil niet lezen: 7 tips voor 10 minuten per dag | SkillQuest',
    metaDescription:
      'Heeft je kind geen zin in lezen? Zeven praktische tips om elke dag 10 minuten lezen vol te houden, van een vast moment tot voortgang zichtbaar maken.',
    intro:
      'Elke dag even lezen klinkt simpel, tot je kind er geen zin in heeft. Dit zijn tips die bij ons thuis hielpen, en wat je kunt doen als het een keer niet lukt.',
    cardSummary:
      'Zeven praktische tips om dagelijks 10 minuten lezen vol te houden, ook als je kind er geen zin in heeft.',
    publishedAt: '2026-09-30',
    readingMinutes: 4,
    sections: [
      {
        title: '1. Maak het klein en vast',
        paragraphs: [
          'Tien minuten is kort genoeg om zonder gemopper te beginnen, en lang genoeg om echt iets te lezen. Kies er een vast moment bij: na het eten, voor het slapengaan of meteen na school.',
          'Een vast moment scheelt elke dag de discussie of het nu wel of niet moet. Het hoort er gewoon bij, net als tandenpoetsen.'
        ]
      },
      {
        title: '2. Laat je kind zelf kiezen wat het leest',
        paragraphs: [
          'Een strip, een tijdschrift over voetbal of een boek over dinosaurussen: alles telt. Een boek dat je kind zelf heeft uitgekozen, leest makkelijker dan een boek dat moet.',
          'Neem je kind mee naar de bibliotheek en laat het zelf de kast doorzoeken. Een boek dat na drie bladzijden tegenvalt, mag terug.'
        ]
      },
      {
        title: '3. Zet een timer',
        paragraphs: [
          'Een timer maakt duidelijk wanneer het klaar is. Je kind weet dat het na tien minuten mag stoppen, en dat maakt beginnen makkelijker.',
          'Soms merkt je kind als de timer afgaat dat het eigenlijk verder wil lezen. Dan is dat mooi meegenomen, maar het hoeft niet.'
        ]
      },
      {
        title: '4. Maak de voortgang zichtbaar',
        paragraphs: [
          'Bij ons thuis moest mijn zoon voor school elke dag 10 minuten lezen. We zetten daar toch al een timer voor, dus ik ging ook bijhouden hoeveel hij al gelezen had.',
          'Dat werkte beter dan ik had verwacht. Hij pakt nu zelf zijn iPad en start de timer. Soms stopt hij eerder, soms leest hij door. Hij wordt blij als hij weer een dag gelezen heeft, en liet zijn voortgang laatst trots aan zijn meester zien.',
          'Je hebt daar geen app voor nodig. Een lijstje op de koelkast of een kalender met een vinkje per dag werkt ook. Het gaat erom dat je kind ziet dat al die korte momenten optellen.'
        ]
      },
      {
        title: '5. Prijs de moeite, niet het niveau',
        paragraphs: [
          'Zeg liever "knap dat je weer tien minuten hebt gelezen" dan "wat lees je goed". Moeite heeft je kind zelf in de hand, het niveau niet altijd.',
          'Zo leert je kind dat oefenen telt, ook op dagen dat lezen nog lastig gaat.'
        ]
      },
      {
        title: '6. Lees af en toe samen',
        paragraphs: [
          'Lees om de beurt een bladzijde, of lees jij voor en leest je kind het laatste stukje. Samen lezen voelt minder als huiswerk en meer als tijd samen.',
          'Het is ook een mooie manier om moeilijke woorden te bespreken zonder dat het een les wordt.'
        ]
      },
      {
        title: '7. Stop op een goed moment',
        paragraphs: [
          'Heeft je kind echt geen zin, stop dan liever na vijf fijne minuten dan na tien minuten ruzie. Morgen is er weer een dag.',
          'Het gaat om de gewoonte, niet om één avond. Een week met vijf korte leesmomenten is meer waard dan één lange avond met tranen.'
        ]
      }
    ],
    app: {
      title: 'Hoe SkillQuest hierbij helpt',
      body: 'Uit dat bijhouden is SkillQuest ontstaan. Je kiest een vaardigheid, zoals lezen of een instrument, start een timer en ziet na elke sessie hoe die groeit. Je krijgt punten voor elke minuut oefenen, niet voor het resultaat. Met de gezinsmodus zie je als ouder de voortgang van je kind.'
    },
    faq: [
      {
        question: 'Hoe lang moet een kind per dag lezen?',
        answer:
          'Daar is geen vaste regel voor. Vraag gerust wat de school adviseert; bij ons vroeg de school om 10 minuten per dag. Elke dag een beetje is meestal makkelijker vol te houden dan af en toe heel lang.'
      },
      {
        question: 'Tellen strips en tijdschriften ook als lezen?',
        answer:
          'Ja. Alles wat je kind met plezier leest, telt: strips, tijdschriften, informatieve boeken of een boek dat het al drie keer gelezen heeft.'
      },
      {
        question: 'Is een app niet gewoon extra schermtijd?',
        answer:
          'In SkillQuest loopt de timer door terwijl je kind leest; niemand hoeft naar het scherm te kijken. Het scherm is alleen voor het starten van de timer en het overzicht achteraf.'
      },
      {
        question: 'Vanaf welke leeftijd kan een kind SkillQuest gebruiken?',
        answer:
          'SkillQuest is gemaakt voor kinderen en volwassenen. Kinderen gebruiken de timer, hun vaardigheden en hun eigen voortgang; vrienden, ranglijsten en aankopen staan voor hen uit. Is je kind nog jong, dan kun je met de gezinsmodus de timer ook op je eigen telefoon starten, en telt de oefentijd mee bij je kind.'
      }
    ]
  }
];

export function getTipsUiCopy(locale: Locale): TipsUiCopy | undefined {
  return uiCopy[locale];
}

export function getTips(locale: Locale): TipArticle[] {
  return articles
    .filter((article) => article.locale === locale)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getTip(locale: Locale, slug: string): TipArticle | undefined {
  return articles.find(
    (article) => article.locale === locale && article.slug === slug
  );
}

export function getAllTips(): TipArticle[] {
  return articles;
}

/** Locales that have both UI copy and at least one article. */
export function tipsLocales(): Locale[] {
  return routing.locales.filter(
    (locale) => uiCopy[locale] && getTips(locale).length > 0
  );
}

export function hasTips(locale: Locale): boolean {
  return tipsLocales().includes(locale);
}

export function tipPath(article: TipArticle): string {
  return `/tips/${article.slug}`;
}

/** hreflang links to the language versions that exist of this article. */
export function tipAlternates(article: TipArticle): Record<string, string> {
  const versions = articles.filter((item) => item.id === article.id);
  const languages: Record<string, string> = Object.fromEntries(
    versions.map((item) => [
      languageTags[item.locale],
      localizedPath(item.locale, tipPath(item))
    ])
  );
  const fallback =
    versions.find((item) => item.locale === routing.defaultLocale) ??
    versions[0];
  languages['x-default'] = localizedPath(fallback.locale, tipPath(fallback));
  return languages;
}

/** hreflang links for the tips index, limited to locales that have tips. */
export function tipsIndexAlternates(): Record<string, string> {
  const locales = tipsLocales();
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [languageTags[locale], localizedPath(locale, '/tips')])
  );
  const fallback = locales.includes(routing.defaultLocale)
    ? routing.defaultLocale
    : locales[0];
  if (fallback) {
    languages['x-default'] = localizedPath(fallback, '/tips');
  }
  return languages;
}
