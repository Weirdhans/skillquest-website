import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import Footer from '@/components/Footer';

const locales = routing.locales;

// Keep these in sync with your public-facing contact details.
const SUPPORT_EMAIL = 'hello@skill-quest.app';
const WEBSITE_URL = 'https://www.skill-quest.app';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'deleteAccount.meta'});

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function DeleteAccountPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'deleteAccount'});

  const subject = t('emailSubject');
  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;

  const hairline = {borderColor: 'var(--sq-border)'};

  return (
    <>
      <main className="theme-page min-h-screen">
        <header className="container-custom pb-10 pt-32 md:pt-36">
          <div className="max-w-3xl border-b pb-10" style={hairline}>
            <p className="text-sm font-semibold uppercase tracking-wide theme-eyebrow">
              {t('lastUpdatedLabel')}: <span className="nums">{t('lastUpdated')}</span>
            </p>
            <h1 className="mt-4 font-display text-section text-balance theme-title">
              {t('heading')}
            </h1>
            <p className="mt-4 text-lead theme-copy">{t('subtitle')}</p>
          </div>
        </header>

        <div className="container-custom pb-20">
          <article className="max-w-3xl">
            <p className="text-lead theme-copy">{t('intro')}</p>

            {/* The whole page exists to get one email sent, so the action gets
                its own tinted band instead of sitting inside the body copy. */}
            <div className="theme-highlight-band mt-8 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold theme-title">{t('cta.title')}</p>
                <p className="mt-1 text-sm theme-copy">
                  {t('cta.description', {email: SUPPORT_EMAIL})}
                </p>
              </div>
              <a href={mailtoHref} className="btn btn-primary whitespace-nowrap">
                {t('cta.button')}
              </a>
            </div>

            <section className="mt-12 border-t pt-12" style={hairline}>
              <h2 className="font-display text-subsection font-bold theme-title">
                {t('sections.howToRequest.title')}
              </h2>
              {/* Numbered because these steps really are a sequence: the
                  request only works if they happen in this order. */}
              <ol className="mt-6 space-y-5">
                {[
                  t('sections.howToRequest.steps.email', {email: SUPPORT_EMAIL}),
                  t('sections.howToRequest.steps.subject', {subject})
                ].map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="nums shrink-0 text-sm font-semibold theme-eyebrow">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="theme-copy">{step}</span>
                  </li>
                ))}

                <li className="flex gap-4">
                  <span className="nums shrink-0 text-sm font-semibold theme-eyebrow">
                    03
                  </span>
                  <div className="theme-copy">
                    <p>{t('sections.howToRequest.steps.includeTitle')}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {[
                        t('sections.howToRequest.steps.includeItems.accountEmail'),
                        t('sections.howToRequest.steps.includeItems.platform'),
                        t('sections.howToRequest.steps.includeItems.optionalDetails')
                      ].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </li>

                {[
                  t('sections.howToRequest.steps.verification'),
                  t('sections.howToRequest.steps.processing')
                ].map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="nums shrink-0 text-sm font-semibold theme-eyebrow">
                      {String(index + 4).padStart(2, '0')}
                    </span>
                    <span className="theme-copy">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Deleted versus retained is the one comparison on this page, so
                the two lists sit side by side rather than one after the other. */}
            <div className="mt-12 grid gap-10 border-t pt-12 md:grid-cols-2 md:gap-12" style={hairline}>
              <section>
                <h2 className="font-display text-subsection font-bold theme-title">
                  {t('sections.whatWillBeDeleted.title')}
                </h2>
                <ul className="mt-5 space-y-3">
                  {[
                    t('sections.whatWillBeDeleted.items.account'),
                    t('sections.whatWillBeDeleted.items.progress'),
                    t('sections.whatWillBeDeleted.items.social'),
                    t('sections.whatWillBeDeleted.items.push')
                  ].map((item) => (
                    <li key={item} className="flex gap-3 theme-copy">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{backgroundColor: 'var(--sq-brand)'}}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-subsection font-bold theme-title">
                  {t('sections.whatWeMayRetain.title')}
                </h2>
                <p className="mt-4 theme-copy">{t('sections.whatWeMayRetain.note')}</p>
                <ul className="mt-5 space-y-3">
                  {[
                    t('sections.whatWeMayRetain.items.payments'),
                    t('sections.whatWeMayRetain.items.subscriptions'),
                    t('sections.whatWeMayRetain.items.support'),
                    t('sections.whatWeMayRetain.items.security'),
                    t('sections.whatWeMayRetain.items.analytics')
                  ].map((item) => (
                    <li key={item} className="flex gap-3 theme-copy">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{backgroundColor: 'var(--sq-border-strong)'}}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-12 border-t pt-12" style={hairline}>
              <h2 className="font-display text-subsection font-bold theme-title">
                {t('sections.timing.title')}
              </h2>
              <p className="mt-4 theme-copy">{t('sections.timing.body')}</p>
              <p className="mt-4 theme-copy">{t('sections.timing.note')}</p>
            </section>

            <section className="mt-12 border-t pt-12" style={hairline}>
              <h2 className="font-display text-subsection font-bold theme-title">
                {t('sections.contact.title')}
              </h2>
              <p className="mt-4 theme-copy">
                {t('sections.contact.body', {email: SUPPORT_EMAIL})}
              </p>
              <p className="mt-6 text-sm theme-copy">
                <a href={WEBSITE_URL} className="underline">
                  www.skill-quest.app
                </a>
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
