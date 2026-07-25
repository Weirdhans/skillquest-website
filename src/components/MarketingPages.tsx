import Image from 'next/image';
import {Link} from '@/i18n/routing';
import LeadCapture from '@/components/LeadCapture';
import StoreLinks from '@/components/StoreLinks';
import {Reveal, Stagger, StaggerItem} from '@/components/Reveal';
import ProductScrollTour from '@/components/ProductScrollTour';
import {CheckCircle} from '@phosphor-icons/react/dist/ssr';
import {
  ANDROID_ALPHA_JOIN_URL,
  ANDROID_SIGNUP_URL,
  APP_STORE_URL,
  type Locale,
  type MarketingCopy,
  faqJsonLd,
  screenshotNames,
  screenshotPath,
  softwareApplicationJsonLd
} from '@/lib/marketing';
import {
  getFeatureLandingOverview,
  getFeaturedFeatureLandingPages
} from '@/lib/feature-pages';

type PageProps = {
  locale: Locale;
  copy: MarketingCopy;
};

function JsonLd({data}: {data: unknown}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  align = 'center'
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: 'center' | 'left';
}) {
  const centered = align === 'center';
  return (
    <div
      className={
        centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left'
      }
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] theme-eyebrow">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-section text-balance theme-title">
        {title}
      </h2>
      {body && <p className="mt-4 text-lead theme-copy">{body}</p>}
    </div>
  );
}

function ScreenshotGallery({
  locale,
  captions,
  compact = false
}: {
  locale: Locale;
  captions: readonly string[];
  compact?: boolean;
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-3">
      {screenshotNames.map((name, index) => (
        <figure
          key={name}
          className={`shrink-0 ${compact ? 'w-48' : 'w-56 md:w-64'}`}
        >
          <div className="overflow-hidden rounded-lg theme-card">
            <Image
              src={screenshotPath(locale, name)}
              alt={captions[index] ?? 'SkillQuest app screenshot'}
              width={1080}
              height={1920}
              className="h-auto w-full"
              sizes="(max-width: 768px) 48vw, 256px"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm font-medium theme-muted-strong">
            {captions[index]}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function FinalCta({copy}: {copy: MarketingCopy}) {
  return (
    <section className="section-hero theme-final-band text-white">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-section text-balance">
            {copy.finalCta.heading}
          </h2>
          <p className="mt-4 text-lead text-gray-200">
            {copy.finalCta.body}
          </p>
          <StoreLinks
            appStoreLabel={copy.finalCta.primary}
            androidLabel={copy.finalCta.secondary}
            className="mt-8 justify-center"
          />
        </div>
      </div>
    </section>
  );
}

// Family: image-led split, screenshot on the LEFT. The other two split sections
// on this page lead with text, so flipping the axis here keeps the page from
// reading as one long zigzag.
function FamilySupportSection({locale, copy}: PageProps) {
  return (
    <section className="section-hero theme-final-band text-white">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="mx-auto w-56 overflow-hidden rounded-2xl border border-white/15 shadow-2xl md:w-72">
              <Image
                src={screenshotPath(locale, '06-social-family.png')}
                alt={copy.familySupport.imageAlt}
                width={1080}
                height={1920}
                className="h-auto w-full"
                sizes="(max-width: 768px) 224px, 288px"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-200">
              {copy.familySupport.badge}
            </p>
            <h2 className="mt-3 max-w-[20ch] font-display text-section text-balance">
              {copy.familySupport.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-lead text-gray-200">
              {copy.familySupport.body}
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {copy.familySupport.items.map((item) => (
                <li key={item.title}>
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-sm font-medium text-gray-300">
              {copy.familySupport.note}
            </p>
            <Link href="/pricing" className="btn btn-primary mt-7">
              {copy.familySupport.cta}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureLandingGrid({locale}: {locale: Locale}) {
  const overview = getFeatureLandingOverview(locale);
  const pages = getFeaturedFeatureLandingPages(locale);

  return (
    <section className="section-standard">
      <div className="container-custom">
        <Reveal>
          <SectionHeader
            eyebrow={overview.eyebrow}
            title={overview.title}
            body={overview.body}
          />
        </Reveal>
        {/* No card boxes. The screenshot carries the visual weight and the text
            sits under it, the way an editorial index would set it. */}
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((page, i) => (
            <Reveal key={page.slug} delay={Math.min(i, 3) * 0.06}>
              <Link
                href={`/features/${page.slug}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={screenshotPath(locale, page.screenshot)}
                    alt={page.title}
                    width={1080}
                    height={1920}
                    className="aspect-[9/14] w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                  />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] theme-eyebrow">
                  {page.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold theme-title group-hover:underline">
                  {page.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed theme-copy">
                  {page.cardSummary}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/guides"
            className="inline-flex text-sm font-semibold text-primary-700 hover:underline dark:text-primary-200"
          >
            {overview.guidesCta} →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomeMarketingPage({locale, copy}: PageProps) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd(locale)} />
      <main className="theme-page">
        {/* Hero: asymmetric split. The headline is a promise, not the brand name -
            the brand already appears in the nav, the logo and the tab title. */}
        <section className="relative isolate overflow-hidden text-white theme-hero-band">
          <div className="container-custom relative z-10 flex min-h-[100dvh] items-center pb-16 pt-24">
            {/* 9/3, not 8/4: the French headline is 57 characters and needs
                ~765px to hold two lines. The phone is capped at 300px anyway,
                so the extra width costs it nothing. */}
            <div className="grid w-full items-center gap-12 lg:grid-cols-[9fr_3fr] lg:gap-12">
              <Stagger>
                <StaggerItem>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-200">
                    {copy.hero.eyebrow}
                  </p>
                </StaggerItem>
                <StaggerItem>
                  {/* No ch-based max-width here. A ch cap scales with font-size,
                      so it pins the headline to a fixed character count and the
                      longer locales wrap to three lines no matter how the type
                      scale is tuned. The grid column is the only limit. */}
                  <h1 className="mt-5 font-display text-display text-balance">
                    {copy.hero.title}
                  </h1>
                </StaggerItem>
                <StaggerItem>
                  <p className="mt-6 max-w-[46ch] text-lead text-gray-200">
                    {copy.hero.subtitle}
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <StoreLinks
                    appStoreLabel={copy.hero.primaryCta}
                    androidLabel={copy.hero.secondaryCta}
                    className="mt-9"
                  />
                </StaggerItem>
              </Stagger>

              {/* The screenshot was a 0.18-opacity background wash. Shipping the
                  full 1080x1920 PNG for a decorative blur was also the LCP cost
                  centre. It is a real element now, at a bounded size. */}
              <div className="relative mx-auto hidden w-full max-w-[300px] lg:block">
                <div
                  aria-hidden
                  className="absolute -inset-8 rounded-full bg-primary-400/20 blur-3xl"
                />
                <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
                  <Image
                    src={screenshotPath(locale, '01-home-progress.png')}
                    alt={copy.product.captions[0] ?? ''}
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

        {/* Trust strip. Used to be pills inside the hero, which pushed the hero
            past the fold. It is its own quiet band now. */}
        <section className="border-b theme-section-muted" style={{borderColor: 'var(--sq-border)'}}>
          <div className="container-custom">
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5">
              {copy.hero.trust.map((item) => (
                <li
                  key={item}
                  className="text-sm font-semibold theme-muted-strong"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Audiences: asymmetric 60/40, not two equal cards. */}
        <section className="section-standard">
          <div className="container-custom">
            <Reveal>
              <SectionHeader title={copy.audiences.heading} align="left" />
            </Reveal>
            <div className="mt-10 grid gap-8 lg:grid-cols-[3fr_2fr]">
              {copy.audiences.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <article className="h-full border-t pt-6" style={{borderColor: 'var(--sq-border-strong)'}}>
                    <h3 className="font-display text-subsection theme-title">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed theme-copy">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FamilySupportSection locale={locale} copy={copy} />

        {/* Product loop: the phone pins and the screen follows the caption you
            are reading. Replaces a sideways-scrolling strip of thumbnails. */}
        <ProductScrollTour
          locale={locale}
          captions={copy.product.captions}
          heading={copy.product.heading}
          body={copy.product.body}
        />

        {/* Benefits: hairline grid, no boxes. Six white rounded cards here was
            the most templated block on the page. */}
        <section className="section-standard theme-section-muted">
          <div className="container-custom">
            <Reveal>
              <SectionHeader title={copy.benefits.heading} align="left" />
            </Reveal>
            <div
              className="mt-12 grid gap-px overflow-hidden md:grid-cols-2 lg:grid-cols-3"
              style={{backgroundColor: 'var(--sq-border)'}}
            >
              {copy.benefits.items.map((item, i) => (
                <Reveal key={item.title} delay={Math.min(i, 3) * 0.05}>
                  <article
                    className="h-full p-8 lg:p-10 theme-section-muted"
                  >
                    <span
                      className="nums text-xs"
                      style={{color: 'var(--sq-brand)'}}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-4 font-display text-subsection theme-title">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed theme-copy">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FeatureLandingGrid locale={locale} />

        {/* Pricing preview: one deliberate centred moment, given extra room
            because it is a conversion step rather than a reading step. */}
        <section className="section-hero theme-highlight-band">
          <div className="container-custom">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-display text-section text-balance theme-title">
                  {copy.pricingPreview.heading}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lead theme-copy">
                  {copy.pricingPreview.body}
                </p>
                <Link href="/pricing" className="btn btn-primary mt-8">
                  {copy.pricingPreview.cta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Trust: plain divided rows. No cards - four boxes here would repeat the
            benefits grid two sections up. Tighter, since it is supporting
            detail rather than a headline moment. */}
        <section className="section-tight">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <SectionHeader title={copy.trust.heading} align="left" />
              </Reveal>
              <ul className="mt-8 divide-y" style={{borderColor: 'var(--sq-border)'}}>
                {copy.trust.items.map((item, i) => (
                  <Reveal key={item} delay={i * 0.05}>
                    <li
                      className="flex gap-4 py-4 theme-muted-strong"
                      style={{borderColor: 'var(--sq-border)'}}
                    >
                      <CheckCircle
                        size={22}
                        weight="fill"
                        className="mt-0.5 shrink-0 text-primary-600 dark:text-primary-300"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <LeadCapture copy={copy.lead} />
        <FinalCta copy={copy} />
      </main>
    </>
  );
}

type DownloadMarketingPageProps = PageProps & {
  // From the ?platform= query string, e.g. set by the Android CTAs so the
  // lead capture form below opens with Android pre-selected.
  requestedPlatform?: string;
};

function isLeadPlatform(
  value: string | undefined
): value is 'ios' | 'android' | 'both' {
  return value === 'ios' || value === 'android' || value === 'both';
}

export function DownloadMarketingPage({
  locale,
  copy,
  requestedPlatform
}: DownloadMarketingPageProps) {
  const initialPlatform = isLeadPlatform(requestedPlatform)
    ? requestedPlatform
    : 'both';
  return (
    <main className="theme-page pt-20">
      <section className="theme-hero-band py-16 text-white md:py-20">
        <div className="container-custom">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-200">
                SkillQuest
              </p>
              <h1 className="font-display text-4xl font-bold md:text-6xl">
                {copy.download.title}
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-gray-200">
                {copy.download.subtitle}
              </p>
            </div>
            <div className="mx-auto w-56 overflow-hidden rounded-lg border border-white/15 bg-white/5 shadow-2xl">
              <Image
                src={screenshotPath(locale, '02-focus-timer.png')}
                alt="SkillQuest focus timer"
                width={1080}
                height={1920}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-lg p-6 theme-card md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide theme-eyebrow">
                {copy.download.iosStatus}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold theme-title">
                {copy.download.iosTitle}
              </h2>
              <p className="mt-4 leading-relaxed theme-copy">
                {copy.download.iosBody}
              </p>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mt-6"
              >
                {copy.download.iosCta}
              </a>
            </article>

            <article className="rounded-lg p-6 theme-card md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide theme-eyebrow">
                {copy.download.androidStatus}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold theme-title">
                {copy.download.androidTitle}
              </h2>
              <p className="mt-4 leading-relaxed theme-copy">
                {copy.download.androidBody}
              </p>
              <Link href={ANDROID_SIGNUP_URL} className="btn btn-primary mt-6">
                {copy.download.androidCta}
              </Link>
              <p className="mt-4 text-sm leading-relaxed theme-copy">
                {copy.download.testerNote}
              </p>
              <a
                href={ANDROID_ALPHA_JOIN_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm underline theme-copy"
              >
                {copy.download.androidAlreadyAdded}
              </a>
            </article>
          </div>
        </div>
      </section>

      <LeadCapture
        key={initialPlatform}
        copy={copy.lead}
        initialPlatform={initialPlatform}
      />

      <section className="theme-section-muted py-16 md:py-20">
        <div className="container-custom">
          <SectionHeader
            title={copy.download.screenshotsHeading}
            body={copy.download.screenshotsBody}
          />
          <ScreenshotGallery
            locale={locale}
            captions={copy.product.captions}
            compact
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold theme-title md:text-4xl">
              {copy.download.finalHeading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed theme-copy">
              {copy.download.finalBody}
            </p>
            <StoreLinks
              appStoreLabel={copy.download.iosCta}
              androidLabel={copy.download.androidCta}
              tone="light"
              className="mt-8 justify-center"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export function PricingMarketingPage({copy}: PageProps) {
  return (
    <>
      <JsonLd data={faqJsonLd(copy.pricing.faq)} />
      <main className="theme-page pt-20">
        <section className="theme-hero-band py-16 text-white md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-200">
                SkillQuest
              </p>
              <h1 className="font-display text-4xl font-bold md:text-6xl">
                {copy.pricing.title}
              </h1>
              <p className="mt-5 text-xl leading-relaxed text-primary-100">
                {copy.pricing.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="grid gap-5 lg:grid-cols-3">
              {copy.pricing.plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-lg p-6 theme-card md:p-8 ${
                    'highlighted' in plan && plan.highlighted
                      ? 'border-phoenix-flame ring-2 ring-phoenix-flame/20'
                      : ''
                  }`}
                >
                  <h2 className="font-display text-2xl font-bold theme-title">
                    {plan.name}
                  </h2>
                  <div className="mt-5">
                    <p className="text-4xl font-bold theme-title">{plan.price}</p>
                    <p className="mt-1 text-sm font-medium theme-copy">
                      {plan.cadence}
                    </p>
                  </div>
                  <p className="mt-5 leading-relaxed theme-copy">
                    {plan.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 theme-muted-strong">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/download" className="btn btn-primary mt-7 w-full">
                    {copy.nav.download}
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center text-sm theme-copy">
              {copy.pricing.billingNote}
            </p>
          </div>
        </section>

        <section className="theme-section-muted py-16 md:py-20">
          <div className="container-custom">
            <SectionHeader title="FAQ" />
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
              {copy.pricing.faq.map((item) => (
                <article
                  key={item.question}
                  className="rounded-lg p-6 theme-card"
                >
                  <h2 className="font-display text-xl font-bold theme-title">
                    {item.question}
                  </h2>
                  <p className="mt-3 leading-relaxed theme-copy">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FinalCta copy={copy} />
      </main>
    </>
  );
}

export function FeaturesMarketingPage({locale, copy}: PageProps) {
  return (
    <main className="theme-page pt-20">
      <section className="theme-hero-band py-16 text-white md:py-20">
        <div className="container-custom">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-200">
                SkillQuest
              </p>
              <h1 className="font-display text-4xl font-bold md:text-6xl">
                {copy.featuresPage.title}
              </h1>
              <p className="mt-5 max-w-3xl text-xl leading-relaxed text-gray-200">
                {copy.featuresPage.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(['01-home-progress.png', '04-statistics.png'] as const).map(
                (name) => (
                  <div
                    key={name}
                    className="overflow-hidden rounded-lg border border-white/15 bg-white/5 shadow-xl"
                  >
                    <Image
                      src={screenshotPath(locale, name)}
                      alt="SkillQuest app screen"
                      width={1080}
                      height={1920}
                      className="h-auto w-full"
                      priority={name === '01-home-progress.png'}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-2">
            {copy.featuresPage.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-lg p-6 theme-card md:p-8"
              >
                <h2 className="font-display text-2xl font-bold theme-title">
                  {section.title}
                </h2>
                <p className="mt-4 leading-relaxed theme-copy">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </div>
        </section>

      <FeatureLandingGrid locale={locale} />

      <section className="theme-section-muted py-16 md:py-20">
        <div className="container-custom">
          <SectionHeader title={copy.product.heading} body={copy.product.body} />
          <ScreenshotGallery locale={locale} captions={copy.product.captions} />
        </div>
      </section>

      <FinalCta copy={copy} />
    </main>
  );
}
