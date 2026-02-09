import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import Footer from '@/components/Footer';

const locales = routing.locales;

// Keep these in sync with your public-facing contact details.
const SUPPORT_EMAIL = 'hello@skill-quest.app';
const WEBSITE_URL = 'https://skill-quest.app';

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

  return (
    <>
      <main className="min-h-screen bg-background-50">
        {/* Header Section */}
        <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16 pt-32 md:pt-36">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {t('heading')}
              </h1>
              <p className="text-lg text-white/90 mb-4">{t('subtitle')}</p>
              <p className="text-sm text-white/80">
                {t('lastUpdatedLabel')}: {t('lastUpdated')}
              </p>
            </div>
          </div>

          {/* Bottom wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-12 md:h-16 fill-background-50"
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container-custom">
            <article className="prose prose-lg prose-primary max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <p className="text-gray-700 leading-relaxed">{t('intro')}</p>

              {/* CTA Callout */}
              <div className="not-prose mt-8 mb-10 p-6 rounded-2xl border-2 border-primary-100 bg-primary-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-gray-900 font-semibold">{t('cta.title')}</p>
                    <p className="text-gray-700 text-sm">
                      {t('cta.description', {email: SUPPORT_EMAIL})}
                    </p>
                  </div>
                  <a href={mailtoHref} className="btn btn-primary whitespace-nowrap">
                    {t('cta.button')}
                  </a>
                </div>
              </div>

              {/* How to request */}
              <section className="mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
                  {t('sections.howToRequest.title')}
                </h2>
                <ol className="list-decimal pl-6 text-gray-700 leading-relaxed space-y-2">
                  <li>
                    {t('sections.howToRequest.steps.email', {email: SUPPORT_EMAIL})}
                  </li>
                  <li>
                    {t('sections.howToRequest.steps.subject', {subject})}
                  </li>
                  <li>
                    {t('sections.howToRequest.steps.includeTitle')}
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>{t('sections.howToRequest.steps.includeItems.accountEmail')}</li>
                      <li>{t('sections.howToRequest.steps.includeItems.platform')}</li>
                      <li>{t('sections.howToRequest.steps.includeItems.optionalDetails')}</li>
                    </ul>
                  </li>
                  <li>{t('sections.howToRequest.steps.verification')}</li>
                  <li>{t('sections.howToRequest.steps.processing')}</li>
                </ol>
              </section>

              {/* What will be deleted */}
              <section className="mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
                  {t('sections.whatWillBeDeleted.title')}
                </h2>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                  <li>{t('sections.whatWillBeDeleted.items.account')}</li>
                  <li>{t('sections.whatWillBeDeleted.items.progress')}</li>
                  <li>{t('sections.whatWillBeDeleted.items.social')}</li>
                  <li>{t('sections.whatWillBeDeleted.items.push')}</li>
                </ul>
              </section>

              {/* What we may retain */}
              <section className="mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
                  {t('sections.whatWeMayRetain.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('sections.whatWeMayRetain.note')}
                </p>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2 mt-4">
                  <li>{t('sections.whatWeMayRetain.items.payments')}</li>
                  <li>{t('sections.whatWeMayRetain.items.subscriptions')}</li>
                  <li>{t('sections.whatWeMayRetain.items.support')}</li>
                  <li>{t('sections.whatWeMayRetain.items.security')}</li>
                  <li>{t('sections.whatWeMayRetain.items.analytics')}</li>
                </ul>
              </section>

              {/* Timing */}
              <section className="mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
                  {t('sections.timing.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('sections.timing.body')}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  {t('sections.timing.note')}
                </p>
              </section>

              {/* Contact */}
              <section className="mb-10 last:mb-0">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
                  {t('sections.contact.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('sections.contact.body', {email: SUPPORT_EMAIL})}
                </p>
              </section>

              {/* Contact Information at Bottom */}
              <div className="mt-12 pt-8 border-t-2 border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  <strong>Contact:</strong> {SUPPORT_EMAIL}
                  <br />
                  <strong>Website:</strong>{' '}
                  <a
                    href={WEBSITE_URL}
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    skill-quest.app
                  </a>
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

