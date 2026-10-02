import type {Metadata} from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';
import {Reveal} from '@/components/Reveal';
import StoreLinks from '@/components/StoreLinks';
import {Check} from '@phosphor-icons/react/dist/ssr';
import {Link, routing} from '@/i18n/routing';
import {
  PRICES,
  createPageMetadata,
  faqJsonLd,
  isLocale,
  screenshotPath,
  type Locale
} from '@/lib/marketing';
import {parentsPage} from '@/lib/parents-page';

// App Store link with its own campaign token, so installs from this page show
// up separately in App Store Connect > Analytics > Campaigns.
const APP_STORE_PARENTS_URL =
  'https://apps.apple.com/app/apple-store/id6755604671?pt=128291575&ct=ouders-pagina&mt=8';

function withPrices(locale: Locale, text: string): string {
  return text
    .replace('{familyMonthly}', PRICES[locale].familyMonthly)
    .replace('{familyYearly}', PRICES[locale].familyYearly);
}

function JsonLd({data}: {data: unknown}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}

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
  const copy = parentsPage[safeLocale];

  return createPageMetadata({
    locale: safeLocale,
    path: '/parents',
    title: copy.metaTitle,
    description: copy.metaDescription
  });
}

export default async function ParentsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = parentsPage[safeLocale];
  const faq = copy.faq.map((item) => ({question: item.q, answer: withPrices(safeLocale, item.a)}));

  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <main className="theme-page">
        <section className="relative isolate overflow-hidden text-white theme-hero-band">
          <div className="container-custom relative z-10 pb-16 pt-28 lg:pb-24 lg:pt-32">
            <div className="grid w-full items-center gap-12 lg:grid-cols-[9fr_3fr]">
              {/* No entrance animation: the headline and buttons are the LCP. */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-200">
                  {copy.eyebrow}
                </p>
                <h1 className="mt-5 font-display text-display text-balance">{copy.title}</h1>
                <p className="mt-6 max-w-[46ch] text-lead text-gray-200">{copy.subtitle}</p>
                <StoreLinks
                  appStoreLabel={copy.iosCta}
                  androidLabel={copy.androidCta}
                  appStoreUrl={APP_STORE_PARENTS_URL}
                  className="mt-9"
                />
                <p className="mt-4 text-sm text-gray-300">{copy.freeNote}</p>
              </div>
              <div className="relative mx-auto hidden w-full max-w-[300px] lg:block">
                <div
                  aria-hidden
                  className="absolute -inset-8 rounded-full bg-primary-400/20 blur-3xl"
                />
                <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
                  <Image
                    src={screenshotPath(safeLocale, '01-home-progress.png')}
                    alt=""
                    width={1080}
                    height={1920}
                    priority
                    className="h-auto w-full"
                    sizes="300px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-standard">
          <div className="container-custom">
            <Reveal>
              <div className="mx-auto max-w-2xl">
                <h2 className="font-display text-section text-balance theme-title">
                  {copy.storyHeading}
                </h2>
                {copy.story.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-lg leading-relaxed theme-copy">
                    {paragraph}
                  </p>
                ))}
                <p className="mt-6 text-sm font-semibold theme-eyebrow">{copy.storySignature}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-standard theme-section-muted">
          <div className="container-custom">
            <Reveal>
              <h2 className="font-display text-section text-balance theme-title">
                {copy.stepsHeading}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-3">
              {copy.steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <article className="h-full border-t pt-6" style={{borderColor: 'var(--sq-border-strong)'}}>
                    <span className="nums text-xs" style={{color: 'var(--sq-brand)'}} aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-display text-subsection theme-title">{step.title}</h3>
                    <p className="mt-3 leading-relaxed theme-copy">{step.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-standard">
          <div className="container-custom">
            <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
              <Reveal>
                <h2 className="font-display text-section text-balance theme-title">
                  {copy.familyHeading}
                </h2>
                {copy.family.map((line) => withPrices(safeLocale, line)).map((line) => (
                  <p key={line} className="mt-5 leading-relaxed theme-copy">
                    {line}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-display text-section text-balance theme-title">
                  {copy.safeHeading}
                </h2>
                <ul className="mt-6 space-y-4">
                  {copy.safe.map((item) => (
                    <li key={item} className="flex gap-3 theme-muted-strong">
                      <Check
                        size={18}
                        weight="bold"
                        className="mt-1 shrink-0 text-primary-600 dark:text-primary-300"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-standard theme-section-muted">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <h2 className="font-display text-section text-balance theme-title">
                  {copy.faqHeading}
                </h2>
              </Reveal>
              <dl className="mt-8 divide-y" style={{borderColor: 'var(--sq-border)'}}>
                {faq.map((item) => (
                  <div key={item.question} className="py-6">
                    <dt className="font-display text-subsection theme-title">{item.question}</dt>
                    <dd className="mt-2 leading-relaxed theme-copy">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="section-hero theme-final-band text-white">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-section text-balance">{copy.finalHeading}</h2>
              <StoreLinks
                appStoreLabel={copy.iosCta}
                androidLabel={copy.androidCta}
                appStoreUrl={APP_STORE_PARENTS_URL}
                className="mt-8 justify-center"
              />
              <p className="mt-6 text-sm text-gray-300">
                <Link href="/tips" className="underline hover:text-white">
                  {copy.tipsCta}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
