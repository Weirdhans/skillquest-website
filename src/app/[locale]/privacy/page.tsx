import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import Footer from '@/components/Footer'

const locales = routing.locales

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy.meta' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function PrivacyPage() {
  const t = useTranslations('privacy')

  // Get all section keys - these are language-specific camelCase keys
  // We need to get them from the actual translations object
  // Try common keys across all languages
  const possibleSectionKeys = [
    // Dutch
    'introductie', 'gegevensbeheerder', 'welkeGegevensVerzamelenWe', 'hoeGebruikenWeJouwGegevens',
    'juridischeGrondslagVoorVerwerking', 'hoeBeschermenWeJouwGegevens', 'derdePartijDiensten',
    'cookiesEnTracking', 'jouwAvgRechten', 'gegevensretentie', 'kinderenEnPrivacy',
    'internationaleGegevensoverdracht', 'wijzigingenInDitPrivacybeleid', 'contactOpnemen',
    // English
    'introduction', 'dataController', 'whatDataDoWeCollect', 'howDoWeUseYourData',
    'legalBasisForProcessing', 'howDoWeProtectYourData', 'thirdPartyServices',
    'cookiesAndTracking', 'yourGdprRights', 'dataRetention', 'childrenAndPrivacy',
    'internationalDataTransfers', 'changesToThisPrivacyPolicy', 'contactUs',
    // German
    'einleitung', 'verantwortlicherFuerDieDatenverarbeitung', 'welcheDatenSammelnWir',
    // French
    'quellesDonneesCollectonsNous',
    // Spanish
    'queDatosRecopilamos',
    // Italian
    'qualiDatiRaccogliamo'
  ]

  const sectionKeys = possibleSectionKeys.filter(key => {
    try {
      t(`sections.${key}.title`)
      return true
    } catch {
      return false
    }
  })

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
              <p className="text-lg text-white/90">
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
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container-custom">
            <article className="prose prose-lg prose-primary max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Render all sections dynamically */}
              {sectionKeys.map((key) => {
                try {
                  const title = t(`sections.${key}.title`)
                  const content = t.raw(`sections.${key}.content`)

                  return (
                    <section key={key} className="mb-10 last:mb-0">
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
                        {title}
                      </h2>
                      <div
                        className="text-gray-700 leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    </section>
                  )
                } catch (error) {
                  // Skip sections that don't exist in this locale
                  return null
                }
              })}

              {/* Contact Information at Bottom */}
              <div className="mt-12 pt-8 border-t-2 border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  <strong>Contact:</strong> hello@skill-quest.app<br />
                  <strong>Website:</strong> <a href="https://skill-quest.app" className="text-primary-600 hover:text-primary-700 underline">skill-quest.app</a>
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
