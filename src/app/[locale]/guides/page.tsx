import type {Metadata} from 'next';
import Footer from '@/components/Footer';
import {Link} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {
  createPageMetadata,
  isLocale,
  type Locale
} from '@/lib/marketing';
import {
  getFeatureLandingPages,
  type FeatureLandingPage,
  type FeatureLandingSlug
} from '@/lib/feature-pages';

type GuidesPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  categories: Record<GuideCategory, string>;
};

type GuideCategory = 'focus' | 'progress' | 'skillsFamily' | 'personalization';

const CATEGORY_BY_SLUG: Record<FeatureLandingSlug, GuideCategory> = {
  'focus-timer': 'focus',
  'pomodoro-timer': 'focus',
  'study-timer': 'focus',
  'deep-work-flowtime': 'focus',
  'progress-statistics': 'progress',
  streaks: 'progress',
  leaderboards: 'progress',
  'friends-challenges': 'progress',
  'skill-tracker': 'skillsFamily',
  family: 'skillsFamily',
  themes: 'personalization',
  'guest-mode': 'personalization'
};

const CATEGORY_ORDER: GuideCategory[] = [
  'focus',
  'progress',
  'skillsFamily',
  'personalization'
];

const copyByLocale: Record<Locale, GuidesPageCopy> = {
  en: {
    metaTitle: 'Guides | SkillQuest',
    metaDescription:
      'Browse every SkillQuest guide: focus techniques, progress and motivation, skills and Family, and personalization, in one place.',
    eyebrow: 'Guides',
    heading: 'Every way to use SkillQuest',
    subtitle:
      'A full index of SkillQuest guides, grouped by topic. Pick the one that matches what you are trying to do.',
    categories: {
      focus: 'Focus techniques',
      progress: 'Progress & motivation',
      skillsFamily: 'Skills & Family',
      personalization: 'Personalization & access'
    }
  },
  nl: {
    metaTitle: 'Guides | SkillQuest',
    metaDescription:
      'Bekijk alle SkillQuest guides: focustechnieken, voortgang en motivatie, skills en Family, en personalisatie, allemaal op één plek.',
    eyebrow: 'Guides',
    heading: 'Alles wat je met SkillQuest kunt doen',
    subtitle:
      'Een volledig overzicht van SkillQuest guides, gegroepeerd per onderwerp. Kies degene die past bij wat je zoekt.',
    categories: {
      focus: 'Focustechnieken',
      progress: 'Voortgang & motivatie',
      skillsFamily: 'Skills & Family',
      personalization: 'Personalisatie & toegang'
    }
  },
  de: {
    metaTitle: 'Guides | SkillQuest',
    metaDescription:
      'Alle SkillQuest-Guides an einem Ort: Fokustechniken, Fortschritt und Motivation, Skills und Family sowie Personalisierung.',
    eyebrow: 'Guides',
    heading: 'Alles, was du mit SkillQuest tun kannst',
    subtitle:
      'Ein vollständiger Überblick über alle SkillQuest-Guides, gruppiert nach Thema. Wähle den, der zu deinem Ziel passt.',
    categories: {
      focus: 'Fokustechniken',
      progress: 'Fortschritt & Motivation',
      skillsFamily: 'Skills & Family',
      personalization: 'Personalisierung & Zugang'
    }
  },
  fr: {
    metaTitle: 'Guides | SkillQuest',
    metaDescription:
      'Parcours tous les guides SkillQuest : techniques de concentration, progrès et motivation, compétences et Family, personnalisation.',
    eyebrow: 'Guides',
    heading: 'Toutes les façons d’utiliser SkillQuest',
    subtitle:
      'Un index complet des guides SkillQuest, classés par thème. Choisis celui qui correspond à ce que tu cherches.',
    categories: {
      focus: 'Techniques de concentration',
      progress: 'Progrès & motivation',
      skillsFamily: 'Compétences & Family',
      personalization: 'Personnalisation & accès'
    }
  },
  es: {
    metaTitle: 'Guías | SkillQuest',
    metaDescription:
      'Consulta todas las guías de SkillQuest: técnicas de concentración, progreso y motivación, habilidades y Family, y personalización.',
    eyebrow: 'Guías',
    heading: 'Todo lo que puedes hacer con SkillQuest',
    subtitle:
      'Un índice completo de las guías de SkillQuest, agrupadas por tema. Elige la que encaje con lo que buscas.',
    categories: {
      focus: 'Técnicas de concentración',
      progress: 'Progreso y motivación',
      skillsFamily: 'Habilidades y Family',
      personalization: 'Personalización y acceso'
    }
  },
  it: {
    metaTitle: 'Guide | SkillQuest',
    metaDescription:
      'Sfoglia tutte le guide di SkillQuest: tecniche di concentrazione, progresso e motivazione, competenze e Family, personalizzazione.',
    eyebrow: 'Guide',
    heading: 'Tutto quello che puoi fare con SkillQuest',
    subtitle:
      'Un indice completo delle guide di SkillQuest, raggruppate per argomento. Scegli quella più adatta a te.',
    categories: {
      focus: 'Tecniche di concentrazione',
      progress: 'Progresso e motivazione',
      skillsFamily: 'Competenze e Family',
      personalization: 'Personalizzazione e accesso'
    }
  }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;

  return createPageMetadata({
    locale: safeLocale,
    path: '/guides',
    title: copy.metaTitle,
    description: copy.metaDescription
  });
}

function groupByCategory(pages: FeatureLandingPage[]) {
  const groups = new Map<GuideCategory, FeatureLandingPage[]>();
  for (const page of pages) {
    const category = CATEGORY_BY_SLUG[page.slug];
    const existing = groups.get(category) ?? [];
    existing.push(page);
    groups.set(category, existing);
  }
  return groups;
}

export default async function GuidesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;
  const pages = getFeatureLandingPages(safeLocale);
  const grouped = groupByCategory(pages);

  return (
    <>
      <main className="theme-page pt-20">
        <section className="theme-hero-band section-hero text-white">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-200">
                {copy.eyebrow}
              </p>
              <h1 className="font-display text-display text-balance">
                {copy.heading}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-gray-200">
                {copy.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="section-standard">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl space-y-14">
              {CATEGORY_ORDER.map((category) => {
                const items = grouped.get(category);
                if (!items || items.length === 0) return null;

                return (
                  <div key={category}>
                    <h2 className="font-display text-section text-balance theme-title">
                      {copy.categories[category]}
                    </h2>
                    <ul className="mt-6 divide-y divide-black/5 dark:divide-white/10">
                      {items.map((page) => (
                        <li key={page.slug}>
                          <Link
                            href={`/features/${page.slug}`}
                            className="group flex flex-col gap-1 py-5 transition hover:opacity-80"
                          >
                            <span className="text-xs font-semibold uppercase tracking-wide theme-eyebrow">
                              {page.eyebrow}
                            </span>
                            <span className="font-display text-lg font-bold theme-title group-hover:underline">
                              {page.title}
                            </span>
                            <span className="text-sm leading-relaxed theme-copy">
                              {page.cardSummary}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
