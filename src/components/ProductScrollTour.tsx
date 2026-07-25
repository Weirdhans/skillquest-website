'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useReducedMotion} from 'framer-motion';
import {screenshotNames, screenshotPath, type Locale} from '@/lib/marketing';

// The phone stays pinned while the captions scroll past it, and the screen
// changes to match the caption you are reading. The seven captions are the
// product loop in order (pick a skill, focus, earn XP, review, compete, share,
// personalise), so the section tells that loop instead of listing it.
//
// Uses the screenshots that already ship for all six locales. No new assets.
//
// Tracking is an IntersectionObserver over one sentinel per step rather than a
// scroll-progress hook: it reports which step is actually centred in the
// viewport, and it does not depend on scroll-event timing.

const STEP_VH = 58;

export default function ProductScrollTour({
  locale,
  captions,
  heading,
  body
}: {
  locale: Locale;
  captions: readonly string[];
  heading: string;
  body: string;
}) {
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.step);
          if (!Number.isNaN(idx)) setActive((prev) => (prev === idx ? prev : idx));
        }
      },
      {
        // A band across the middle of the viewport: the step crossing it is the
        // one the reader is on. Deliberately NOT '-50% 0px -50% 0px' - that
        // collapses the root to zero height, the intersection rect is then empty,
        // and isIntersecting never becomes true. Keep a real band.
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <section className="section-standard">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h2 className="font-display text-section text-balance theme-title">
            {heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lead theme-copy">{body}</p>
        </div>

        {/* Small screens and reduced motion get a plain stacked list. Pinning a
            phone beside text does not survive a 375px viewport, and a
            scroll-driven swap is what reduced-motion users asked us not to do. */}
        <div
          className={`mt-12 grid gap-12 sm:grid-cols-2 ${reduce ? '' : 'lg:hidden'}`}
        >
          {screenshotNames.map((name, i) => (
            <figure key={name}>
              <div
                className="overflow-hidden rounded-2xl border"
                style={{borderColor: 'var(--sq-border)'}}
              >
                <Image
                  src={screenshotPath(locale, name)}
                  alt={captions[i] ?? ''}
                  width={1080}
                  height={1920}
                  className="h-auto w-full"
                  sizes="(max-width: 640px) 90vw, 45vw"
                />
              </div>
              <figcaption className="mt-4 font-display text-subsection theme-title">
                {captions[i]}
              </figcaption>
            </figure>
          ))}
        </div>

        {reduce ? null : (
          <div className="relative mt-16 hidden lg:block">
            <div className="grid grid-cols-[1fr_420px] gap-16">
              {/* Steps. Each is a full step-height block so it can be observed. */}
              <ol>
                {captions.map((caption, i) => (
                  <li
                    key={caption}
                    data-step={i}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="flex items-center"
                    style={{height: `${STEP_VH}vh`}}
                  >
                    <div
                      className="flex items-baseline gap-5 transition-opacity duration-500"
                      style={{opacity: i === active ? 1 : 0.3}}
                    >
                      <span
                        className="nums text-sm"
                        style={{color: 'var(--sq-brand)'}}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="font-display text-balance theme-title"
                        style={{
                          fontSize:
                            i === active
                              ? 'clamp(1.75rem, 2.6vw, 2.5rem)'
                              : 'clamp(1.5rem, 2vw, 1.875rem)',
                          transition: 'font-size 400ms cubic-bezier(0.16,1,0.3,1)'
                        }}
                      >
                        {caption}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Phone pins for the whole column. All screens are stacked; only
                  the active one is opaque. */}
              <div className="relative">
                <div className="sticky top-0 flex h-[100dvh] items-center">
                  <div className="relative mx-auto aspect-[9/19.5] w-[300px]">
                    <div
                      aria-hidden
                      className="absolute -inset-10 rounded-full blur-3xl"
                      style={{
                        background:
                          'color-mix(in srgb, var(--sq-brand) 22%, transparent)'
                      }}
                    />
                    <div
                      className="relative h-full w-full overflow-hidden rounded-[2rem] border shadow-2xl"
                      style={{borderColor: 'var(--sq-border-strong)'}}
                    >
                      {screenshotNames.map((name, i) => (
                        <Image
                          key={name}
                          src={screenshotPath(locale, name)}
                          alt={i === active ? (captions[i] ?? '') : ''}
                          fill
                          className="object-cover object-top transition-opacity duration-500"
                          style={{opacity: i === active ? 1 : 0}}
                          sizes="300px"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
