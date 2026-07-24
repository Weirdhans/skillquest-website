import type {Metadata} from 'next';
import Footer from '@/components/Footer';
import {routing} from '@/i18n/routing';
import {
  createPageMetadata,
  isLocale,
  type Locale
} from '@/lib/marketing';
import {getChangelogEntries} from '@/lib/changelog';

type ChangelogPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
};

const copyByLocale: Record<Locale, ChangelogPageCopy> = {
  en: {
    metaTitle: "What's New | SkillQuest Changelog",
    metaDescription:
      'See what recently changed on skill-quest.app: the Android alpha signup flow, multilingual account emails, spam protection, security, and new pages.',
    eyebrow: "What's new",
    heading: 'Recent changes to SkillQuest',
    subtitle:
      "A running log of what changed on the website and in the signup flow, so you always know what's new."
  },
  nl: {
    metaTitle: 'Wat is er nieuw | SkillQuest changelog',
    metaDescription:
      'Bekijk wat er recent is veranderd op skill-quest.app: de Android alpha-aanmeldflow, meertalige accountmails, spambescherming, beveiliging en nieuwe pagina’s.',
    eyebrow: 'Wat is er nieuw',
    heading: 'Recente wijzigingen aan SkillQuest',
    subtitle:
      'Een overzicht van wat er is veranderd op de website en in de aanmeldflow, zodat je altijd weet wat er nieuw is.'
  },
  de: {
    metaTitle: 'Neuigkeiten | SkillQuest Changelog',
    metaDescription:
      'Sieh, was sich kürzlich auf skill-quest.app geändert hat: der Android-Alpha-Anmeldeprozess, mehrsprachige Kontomails, Spamschutz, Sicherheit und neue Seiten.',
    eyebrow: 'Neuigkeiten',
    heading: 'Aktuelle Änderungen an SkillQuest',
    subtitle:
      'Ein laufendes Protokoll der Änderungen an der Website und im Anmeldeprozess, damit du immer weißt, was neu ist.'
  },
  fr: {
    metaTitle: 'Nouveautés | Changelog SkillQuest',
    metaDescription:
      "Découvre ce qui a changé récemment sur skill-quest.app : le processus d'inscription à l'alpha Android, les e-mails de compte multilingues, la protection anti-spam, la sécurité et les nouvelles pages.",
    eyebrow: 'Nouveautés',
    heading: 'Changements récents sur SkillQuest',
    subtitle:
      "Un journal des changements apportés au site et au processus d'inscription, pour toujours savoir ce qui est nouveau."
  },
  es: {
    metaTitle: 'Novedades | Changelog de SkillQuest',
    metaDescription:
      'Descubre qué ha cambiado recientemente en skill-quest.app: el registro para la alpha de Android, los correos de cuenta multilingües, la protección antispam, la seguridad y las nuevas páginas.',
    eyebrow: 'Novedades',
    heading: 'Cambios recientes en SkillQuest',
    subtitle:
      'Un registro de lo que ha cambiado en el sitio web y en el proceso de registro, para que siempre sepas qué hay de nuevo.'
  },
  it: {
    metaTitle: 'Novità | Changelog di SkillQuest',
    metaDescription:
      "Scopri cosa è cambiato di recente su skill-quest.app: l'iscrizione all'alpha Android, le email account multilingue, la protezione antispam, la sicurezza e le nuove pagine.",
    eyebrow: 'Novità',
    heading: 'Modifiche recenti a SkillQuest',
    subtitle:
      "Un registro di ciò che è cambiato sul sito e nel processo di iscrizione, così sai sempre cosa c'è di nuovo."
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
    path: '/changelog',
    title: copy.metaTitle,
    description: copy.metaDescription
  });
}

function formatDate(dateIso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(`${dateIso}T00:00:00Z`));
  } catch {
    return dateIso;
  }
}

export default async function ChangelogPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;
  const entries = getChangelogEntries(safeLocale);

  return (
    <>
      <main className="theme-page pt-20">
        <section className="theme-hero-band py-16 text-white md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-200">
                {copy.eyebrow}
              </p>
              <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
                {copy.heading}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-gray-200">
                {copy.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-custom">
            <ol className="mx-auto max-w-3xl space-y-6">
              {entries.map((entry, index) => (
                <li
                  key={`${entry.date}-${entry.title}-${index}`}
                  className="rounded-lg p-6 theme-card md:p-8"
                >
                  <time
                    dateTime={entry.date}
                    className="text-sm font-semibold uppercase tracking-wide theme-eyebrow"
                  >
                    {formatDate(entry.date, safeLocale)}
                  </time>
                  <h2 className="mt-2 font-display text-xl font-bold theme-title md:text-2xl">
                    {entry.title}
                  </h2>
                  <p className="mt-3 leading-relaxed theme-copy">
                    {entry.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
