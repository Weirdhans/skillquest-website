import {getTranslations} from 'next-intl/server'
import {routing} from '@/i18n/routing'
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

// Define section keys per locale - these must match the keys in messages/{locale}.json
const SECTION_KEYS_BY_LOCALE: Record<string, string[]> = {
  nl: [
    'introductie', 'gegevensbeheerder', 'welkeGegevensVerzamelenWe', 'hoeGebruikenWeJouwGegevens',
    'juridischeGrondslagVoorVerwerking', 'hoeBeschermenWeJouwGegevens', 'derdePartijDiensten',
    'cookiesEnTracking', 'jouwAvgRechten', 'gegevensretentie', 'kinderenEnPrivacy',
    'internationaleGegevensoverdracht', 'wijzigingenInDitPrivacybeleid', 'contactOpnemen'
  ],
  en: [
    'introduction', 'dataController', 'whatDataDoWeCollect', 'howDoWeUseYourData',
    'legalBasisForProcessing', 'howDoWeProtectYourData', 'thirdpartyServices',
    'cookiesAndTracking', 'yourGdprRights', 'dataRetention', 'childrenAndPrivacy',
    'internationalDataTransfer', 'changesToThisPrivacyPolicy', 'contactUs'
  ],
  de: [
    'einleitung', 'verantwortlicherFrDieDatenverarbeitung', 'welcheDatenSammelnWir',
    'wieVerwendenWirIhreDaten', 'rechtsgrundlageFrDieVerarbeitung', 'wieSchtzenWirIhreDaten',
    'diensteDritter', 'cookiesUndTracking', 'ihreDsgvorechte', 'datenaufbewahrung',
    'kinderUndDatenschutz', 'internationaleDatenbermittlung', 'nderungenDieserDatenschutzrichtlinie',
    'kontaktAufnehmen'
  ],
  fr: [
    'introduction', 'responsableDuTraitement', 'quellesDonnesCollectonsnous',
    'commentUtilisonsnousVosDonnes', 'baseJuridiqueDuTraitement', 'commentProtgeonsnousVosDonnes',
    'servicesTiers', 'cookiesEtSuivi', 'vosDroitsEnVertuDuRgpd', 'conservationDesDonnes',
    'enfantsEtConfidentialit', 'transfertInternationalDeDonnes',
    'modificationsDeCettePolitiqueDeConfidentialit', 'nousContacter'
  ],
  es: [
    'introduccin', 'responsableDelTratamiento', 'quDatosRecopilamos', 'cmoUsamosTusDatos',
    'baseLegalParaElTratamiento', 'cmoProtegemosTusDatos', 'serviciosDeTerceros',
    'cookiesYSeguimiento', 'tusDerechosBajoElRgpd', 'retencinDeDatos', 'niosYPrivacidad',
    'transferenciaInternacionalDeDatos', 'cambiosAEstaPolticaDePrivacidad', 'contactar'
  ],
  it: [
    'introduzione', 'titolareDelTrattamento', 'qualiDatiRaccogliamo', 'comeUtilizziamoITuoiDati',
    'baseGiuridicaPerIlTrattamento', 'comeProteggiamoITuoiDati', 'serviziDiTerzeParti',
    'cookieETracciamento', 'iTuoiDirittiAiSensiDelGdpr', 'conservazioneDeiDati',
    'bambiniEPrivacy', 'trasferimentoInternazionaleDiDati',
    'modificheAQuestaInformativaSullaPrivacy', 'contattaci'
  ]
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })

  // Get section keys for current locale
  const sectionKeys = SECTION_KEYS_BY_LOCALE[locale] || SECTION_KEYS_BY_LOCALE['nl']

  const sections = sectionKeys.map((key, index) => ({
    key,
    // Anchor ids are positional rather than derived from the translated key, so
    // the same section is /privacy#s-9 in every language.
    id: `s-${index + 1}`,
    number: String(index + 1).padStart(2, '0'),
    title: t(`sections.${key}.title`),
    content: t.raw(`sections.${key}.content`) as string
  }))

  return (
    <>
      <main className="theme-page min-h-screen">
        <header className="container-custom pb-10 pt-32 md:pt-36">
          <div className="max-w-3xl border-b pb-10" style={{borderColor: 'var(--sq-border)'}}>
            <p className="text-sm font-semibold uppercase tracking-wide theme-eyebrow">
              {t('lastUpdatedLabel')}: <span className="nums">{t('lastUpdated')}</span>
            </p>
            <h1 className="mt-4 font-display text-section text-balance theme-title">
              {t('heading')}
            </h1>
          </div>
        </header>

        <div className="container-custom pb-20">
          <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            {/* Fourteen sections is too many to scroll blind. On desktop the
                index rides along; on mobile it is skipped entirely rather than
                stacked, where it would just be a second copy of the page. */}
            <nav
              aria-label={t('heading')}
              className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
            >
              <ol className="space-y-1 border-l" style={{borderColor: 'var(--sq-border)'}}>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-sm transition hover:border-current theme-copy hover:theme-title"
                    >
                      <span className="nums text-xs opacity-60">{section.number}</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="max-w-3xl">
              {sections.map((section, index) => (
                <section
                  key={section.key}
                  id={section.id}
                  className={`scroll-mt-28 ${index === 0 ? '' : 'mt-12 border-t pt-12'}`}
                  style={index === 0 ? undefined : {borderColor: 'var(--sq-border)'}}
                >
                  <p className="nums mb-3 text-sm theme-eyebrow">{section.number}</p>
                  <h2 className="font-display text-subsection font-bold theme-title">
                    {section.title}
                  </h2>
                  {/* The translated bodies are HTML fragments, so this is the
                      one place a prose context is still the right tool. */}
                  <div
                    className="prose prose-lg mt-4 max-w-none theme-copy"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}

              <div className="mt-12 border-t pt-8 text-sm theme-copy" style={{borderColor: 'var(--sq-border)'}}>
                <p>
                  <strong className="theme-title">Contact:</strong>{' '}
                  <a href="mailto:hello@skill-quest.app" className="underline">
                    hello@skill-quest.app
                  </a>
                </p>
                <p className="mt-1">
                  <strong className="theme-title">Website:</strong>{' '}
                  <a href="https://www.skill-quest.app" className="underline">
                    www.skill-quest.app
                  </a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
