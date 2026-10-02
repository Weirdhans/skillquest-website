import type {Metadata} from 'next';
import Footer from '@/components/Footer';
import {routing} from '@/i18n/routing';
import {communityGuidelines} from '@/lib/community-guidelines';
import {
  SUPPORT_EMAIL,
  createPageMetadata,
  isLocale,
  type Locale
} from '@/lib/marketing';

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
  const copy = communityGuidelines[safeLocale];

  return createPageMetadata({
    locale: safeLocale,
    path: '/community-guidelines',
    title: `${copy.title} | SkillQuest`,
    description: copy.metaDescription
  });
}

export default async function CommunityGuidelinesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = communityGuidelines[safeLocale];
  const [reportBefore, reportAfter] = copy.report.split(SUPPORT_EMAIL);

  return (
    <>
      <main className="theme-page min-h-screen">
        <header className="container-custom pb-10 pt-32 md:pt-36">
          <div
            className="max-w-3xl border-b pb-10"
            style={{borderColor: 'var(--sq-border)'}}
          >
            <h1 className="font-display text-section theme-title">{copy.title}</h1>
            <p className="mt-5 text-lg leading-relaxed theme-copy">{copy.intro}</p>
          </div>
        </header>

        <article className="container-custom max-w-3xl space-y-12 pb-20">
          <section>
            <h2 className="font-display text-subsection theme-title">
              {copy.rulesHeading}
            </h2>
            <ul className="mt-5 space-y-4 text-lg theme-copy">
              {copy.rules.map((rule) => (
                <li
                  key={rule}
                  className="border-b pb-4"
                  style={{borderColor: 'var(--sq-border)'}}
                >
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-subsection theme-title">
              {copy.childrenHeading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed theme-copy">{copy.children}</p>
          </section>

          <section>
            <h2 className="font-display text-subsection theme-title">
              {copy.blockHeading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed theme-copy">{copy.block}</p>
          </section>

          <section>
            <h2 className="font-display text-subsection theme-title">
              {copy.reportHeading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed theme-copy">
              {reportBefore}
              <a className="font-semibold underline" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              {reportAfter}
            </p>
            <p className="mt-4 text-lg leading-relaxed theme-copy">{copy.consequences}</p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
