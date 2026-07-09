import Image from 'next/image';
import {Link} from '@/i18n/routing';
import LeadCapture from '@/components/LeadCapture';
import StoreLinks from '@/components/StoreLinks';
import {
  ANDROID_ALPHA_JOIN_URL,
  APP_STORE_URL,
  type Locale,
  type MarketingCopy,
  faqJsonLd,
  screenshotNames,
  screenshotPath,
  softwareApplicationJsonLd
} from '@/lib/marketing';

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
  body
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide theme-eyebrow">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight theme-title md:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-4 text-lg leading-relaxed theme-copy">{body}</p>}
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
    <section className="theme-final-band py-16 text-white md:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            {copy.finalCta.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-200">
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

function FamilySupportSection({locale, copy}: PageProps) {
  return (
    <section className="theme-highlight-band py-16 md:py-20">
      <div className="container-custom">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide theme-eyebrow">
              {copy.familySupport.badge}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight theme-title md:text-4xl">
              {copy.familySupport.heading}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed theme-copy">
              {copy.familySupport.body}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.familySupport.items.map((item) => (
                <article key={item.title} className="rounded-lg p-5 theme-card">
                  <h3 className="font-display text-xl font-bold theme-title">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed theme-copy">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-5 text-sm font-medium theme-muted-strong">
              {copy.familySupport.note}
            </p>
            <Link href="/pricing" className="btn btn-primary mt-7">
              {copy.familySupport.cta}
            </Link>
          </div>

          <div className="mx-auto w-56 overflow-hidden rounded-lg theme-card md:w-64">
            <Image
              src={screenshotPath(locale, '06-social-family.png')}
              alt={copy.familySupport.imageAlt}
              width={1080}
              height={1920}
              className="h-auto w-full"
              sizes="(max-width: 768px) 224px, 256px"
            />
          </div>
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
        <section className="relative isolate overflow-hidden pt-20 text-white theme-hero-band">
          <Image
            src={screenshotPath(locale, '01-home-progress.png')}
            alt=""
            width={1080}
            height={1920}
            priority
            className="absolute bottom-[-10%] right-[-52%] z-0 h-[72%] w-auto max-w-none opacity-[0.18] sm:right-[-28%] sm:h-[80%] sm:opacity-25 md:right-[4%] md:h-[94%] md:opacity-35 lg:opacity-45"
            sizes="(max-width: 768px) 60vw, 520px"
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/92 via-black/80 to-black/55 md:from-black/78 md:via-black/60 md:to-primary-900/35" />
          <div className="container-custom relative z-10 flex min-h-[82svh] items-center py-14 md:min-h-[86svh] md:py-20">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary-200">
                {copy.hero.eyebrow}
              </p>
              <h1 className="font-display text-5xl font-extrabold leading-none md:text-7xl">
                {copy.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-100 md:text-2xl">
                {copy.hero.subtitle}
              </p>
              <StoreLinks
                appStoreLabel={copy.hero.primaryCta}
                androidLabel={copy.hero.secondaryCta}
                className="mt-8"
              />
              <div className="mt-5">
                <Link
                  href="/pricing"
                  className="inline-flex text-sm font-semibold text-primary-100 underline-offset-4 hover:underline"
                >
                  {copy.hero.tertiaryCta}
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {copy.hero.trust.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-custom">
            <SectionHeader title={copy.audiences.heading} />
            <div className="grid gap-5 md:grid-cols-2">
              {copy.audiences.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg p-6 theme-card"
                >
                  <h3 className="font-display text-2xl font-bold theme-title">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed theme-copy">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FamilySupportSection locale={locale} copy={copy} />

        <section className="theme-section-muted py-16 md:py-20">
          <div className="container-custom">
            <SectionHeader title={copy.product.heading} body={copy.product.body} />
            <ScreenshotGallery locale={locale} captions={copy.product.captions} />
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-custom">
            <SectionHeader title={copy.benefits.heading} />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {copy.benefits.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg p-6 theme-card"
                >
                  <h3 className="font-display text-xl font-bold theme-title">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed theme-copy">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="theme-highlight-band py-16 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl rounded-lg p-8 text-center theme-card md:p-10">
              <h2 className="font-display text-3xl font-bold theme-title md:text-4xl">
                {copy.pricingPreview.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed theme-copy">
                {copy.pricingPreview.body}
              </p>
              <Link href="/pricing" className="btn btn-primary mt-7">
                {copy.pricingPreview.cta}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-custom">
            <SectionHeader title={copy.trust.heading} />
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
              {copy.trust.items.map((item) => (
                <div
                  key={item}
                  className="rounded-lg p-5 theme-card theme-muted-strong"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <LeadCapture copy={copy.lead} />
        <FinalCta copy={copy} />
      </main>
    </>
  );
}

export function DownloadMarketingPage({locale, copy}: PageProps) {
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
              <a
                href={ANDROID_ALPHA_JOIN_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mt-6"
              >
                {copy.download.androidCta}
              </a>
              <p className="mt-4 text-sm leading-relaxed theme-copy">
                {copy.download.testerNote}
              </p>
            </article>
          </div>
        </div>
      </section>

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
