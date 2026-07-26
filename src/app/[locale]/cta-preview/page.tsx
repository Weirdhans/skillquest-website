import Footer from '@/components/Footer';
import {routing} from '@/i18n/routing';
import {getMarketingCopy, isLocale, type Locale} from '@/lib/marketing';

// TEMPORARY. Exists only on the redesign/phase-2 branch so the CTA variants can
// be judged inside the real hero band instead of as swatches. Delete this route
// before merging to master.
//
// Contrast is measured white-or-dark text against the button fill. It does not
// change with the page background, so these numbers hold in both themes.
const VARIANTS = [
  {
    id: 'A',
    label: 'Huidig verloop, witte tekst',
    ratio: '2.84 : 1',
    verdict: 'faalt' as const,
    note: 'Wat er nu live staat.',
    style: {
      background: 'linear-gradient(135deg, #ff6b35 0%, #d2381c 100%)',
      color: '#ffffff'
    }
  },
  {
    id: 'C',
    label: 'Huidig verloop, donkere tekst',
    ratio: '6.31 : 1',
    verdict: 'slaagt' as const,
    note: 'Oranje blijft exact hetzelfde, alleen de tekst verandert.',
    style: {
      background: 'linear-gradient(135deg, #ff6b35 0%, #d2381c 100%)',
      color: '#300d02'
    }
  },
  {
    id: 'D',
    label: 'Effen #d2381c, witte tekst',
    ratio: '4.86 : 1',
    verdict: 'slaagt' as const,
    note: 'De donkere helft van je eigen verloop, zonder verloop.',
    style: {background: '#d2381c', color: '#ffffff'}
  }
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const metadata = {robots: {index: false, follow: false}};

export default async function CtaPreviewPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = getMarketingCopy(safeLocale);

  return (
    <>
      <main className="theme-page pt-20">
        {VARIANTS.map((v) => (
          <section
            key={v.id}
            className="theme-hero-band section-hero text-white"
          >
            <div className="container-custom">
              <div className="grid items-center gap-12 lg:grid-cols-[9fr_3fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-200">
                    Variant {v.id} &middot; {v.label}
                  </p>
                  <h2 className="mt-4 font-display text-display text-balance">
                    {copy.hero.title}
                  </h2>
                  <p className="mt-5 max-w-[46ch] text-lead text-gray-200">
                    {copy.hero.subtitle}
                  </p>
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <span
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold shadow-lg"
                      style={v.style}
                    >
                      {copy.hero.primaryCta}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-base font-semibold text-white">
                      {copy.hero.secondaryCta}
                    </span>
                  </div>
                  <p className="mt-6 text-sm text-gray-300">
                    <span className="nums">{v.ratio}</span>
                    {'  '}
                    <span
                      style={{
                        color: v.verdict === 'slaagt' ? '#7ee2b8' : '#ff9a8a'
                      }}
                    >
                      {v.verdict} (WCAG AA vraagt 4.5 : 1 bij 16px)
                    </span>
                    {'  '}
                    &middot; {v.note}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
