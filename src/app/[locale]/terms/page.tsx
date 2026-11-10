import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import Footer from '@/components/Footer';
import {Link, routing} from '@/i18n/routing';
import {
  SUPPORT_EMAIL,
  createPageMetadata,
  isLocale,
  type Locale
} from '@/lib/marketing';
import {splitLinks, termsCopy} from '@/lib/terms';

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
  const copy = termsCopy[safeLocale];

  return createPageMetadata({
    locale: safeLocale,
    path: '/terms',
    title: copy.metaTitle,
    description: copy.metaDescription
  });
}

// A text can hold links ("/page" on this site, "#s-3" on this page, or a full
// address) and the support address, which becomes a mailto link.
function renderText(text: string): ReactNode[] {
  return splitLinks(text).flatMap((segment, index) => {
    if (segment.type === 'link') {
      const className = 'font-semibold underline';
      if (segment.href.startsWith('/')) {
        return [
          <Link key={index} href={segment.href} className={className}>
            {segment.label}
          </Link>
        ];
      }
      const external = segment.href.startsWith('http');
      return [
        <a
          key={index}
          href={segment.href}
          className={className}
          {...(external ? {target: '_blank', rel: 'noreferrer'} : {})}
        >
          {segment.label}
        </a>
      ];
    }
    return segment.value
      .split(SUPPORT_EMAIL)
      .flatMap((part, partIndex, parts) =>
        partIndex < parts.length - 1
          ? [
              part,
              <a
                key={`${index}-${partIndex}`}
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-semibold underline"
              >
                {SUPPORT_EMAIL}
              </a>
            ]
          : [part]
      );
  });
}

export default async function TermsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : routing.defaultLocale;
  const copy = termsCopy[safeLocale];

  const updated = new Intl.DateTimeFormat(safeLocale, {
    dateStyle: 'long',
    timeZone: 'UTC'
  }).format(new Date(`${copy.updated}T00:00:00Z`));

  // Anchor ids are positional, so the same section is /terms#s-7 in every language.
  const sections = copy.sections.map((section, index) => ({
    ...section,
    id: `s-${index + 1}`,
    number: String(index + 1).padStart(2, '0')
  }));

  return (
    <>
      <main className="theme-page min-h-screen">
        <header className="container-custom pb-10 pt-32 md:pt-36">
          <div
            className="max-w-3xl border-b pb-10"
            style={{borderColor: 'var(--sq-border)'}}
          >
            <p className="text-sm font-semibold uppercase tracking-wide theme-eyebrow">
              {copy.lastUpdatedLabel}: <span className="nums">{updated}</span>
            </p>
            <h1 className="mt-4 font-display text-section text-balance theme-title">
              {copy.heading}
            </h1>
          </div>
        </header>

        <div className="container-custom pb-20">
          <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            {/* Fifteen sections are too many to scroll blind. On desktop the
                index rides along; on mobile it is skipped rather than stacked,
                where it would only be a second copy of the page. */}
            <nav
              aria-label={copy.heading}
              className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
            >
              <ol
                className="space-y-1 border-l"
                style={{borderColor: 'var(--sq-border)'}}
              >
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-sm transition hover:border-current theme-copy hover:theme-title"
                    >
                      <span className="nums text-xs opacity-60">
                        {section.number}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="max-w-3xl">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={`scroll-mt-28 ${index === 0 ? '' : 'mt-12 border-t pt-12'}`}
                  style={
                    index === 0 ? undefined : {borderColor: 'var(--sq-border)'}
                  }
                >
                  <p className="nums mb-3 text-sm theme-eyebrow">
                    {section.number}
                  </p>
                  <h2 className="font-display text-subsection font-bold theme-title">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-lg leading-relaxed theme-copy">
                    {section.blocks.map((block, blockIndex) =>
                      block.type === 'p' ? (
                        <p key={blockIndex}>{renderText(block.text)}</p>
                      ) : (
                        <ul
                          key={blockIndex}
                          className="list-disc space-y-3 pl-6 marker:text-current"
                        >
                          {block.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              {item.lead ? (
                                <strong className="theme-title">
                                  {item.lead}
                                </strong>
                              ) : null}
                              {item.lead ? ' ' : null}
                              {renderText(item.text)}
                            </li>
                          ))}
                        </ul>
                      )
                    )}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
