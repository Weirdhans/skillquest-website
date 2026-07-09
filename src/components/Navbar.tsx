'use client';

import type {CSSProperties} from 'react';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {AnimatePresence, motion} from 'framer-motion';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {Link, routing} from '@/i18n/routing';
import {getMarketingCopy, isLocale, type Locale} from '@/lib/marketing';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'skillquest-theme';

function getActiveTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ||
    document.documentElement.dataset.theme === 'dark'
    ? 'dark'
    : 'light';
}

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
}

function SunIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M20.99 13.18A8.5 8.5 0 1 1 10.82 3.01 7 7 0 0 0 20.99 13.18Z" />
    </svg>
  );
}

const languageOptions = routing.locales.map((locale) => ({
  code: locale,
  label: getMarketingCopy(locale).localeName
}));

export default function Navbar() {
  const currentLocale = useLocale();
  const locale: Locale = isLocale(currentLocale)
    ? currentLocale
    : routing.defaultLocale;
  const copy = getMarketingCopy(locale);
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncTheme = () => {
      const preferredTheme = getPreferredTheme();
      applyTheme(preferredTheme);
      setTheme(preferredTheme);
    };
    const frame = window.requestAnimationFrame(syncTheme);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showLangMenu && !target.closest('.language-switcher')) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLangMenu]);

  function switchLanguage(newLocale: Locale) {
    const parts = pathname.split('/');

    if (isLocale(parts[1] ?? '')) {
      parts[1] = newLocale;
      router.push(parts.join('/') || `/${newLocale}`);
    } else {
      router.push(`/${newLocale}${pathname}`);
    }

    setShowLangMenu(false);
  }

  function toggleTheme() {
    const nextTheme: Theme = getActiveTheme() === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    setTheme(nextTheme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The visible theme should still change if storage is unavailable.
    }
  }

  const navLinks = [
    {href: '/features', label: copy.nav.features},
    {href: '/pricing', label: copy.nav.pricing},
    {href: '/download', label: copy.nav.download},
    {href: '/support', label: copy.nav.support}
  ] as const;

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'shadow-sm backdrop-blur-xl'
          : 'backdrop-blur-lg'
      }`}
      style={{
        backgroundColor: 'var(--sq-nav-bg)',
        borderColor: 'var(--sq-nav-border)'
      }}
      initial={{y: -80}}
      animate={{y: 0}}
      transition={{duration: 0.25}}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src="/skillquest-logo.png"
              alt="SkillQuest"
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 object-contain md:h-11 md:w-11"
              priority
            />
            <span className="hidden truncate font-display text-xl font-extrabold sm:block md:text-2xl theme-title">
              SkillQuest
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold transition hover:text-primary-700 theme-muted-strong"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative language-switcher">
              <button
                type="button"
                onClick={() => setShowLangMenu((value) => !value)}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 theme-card"
                aria-label="Change language"
                aria-expanded={showLangMenu}
              >
                <span>{locale.toUpperCase()}</span>
                <svg
                  className={`h-4 w-4 transition-transform theme-copy ${
                    showLangMenu ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{opacity: 0, y: -8}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -8}}
                    transition={{duration: 0.16}}
                    className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg theme-card"
                  >
                    {languageOptions.map((item) => (
                      <button
                        type="button"
                        key={item.code}
                        onClick={() => switchLanguage(item.code)}
                        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-primary-50 dark:hover:bg-primary-900/30 ${
                          item.code === locale
                            ? 'bg-primary-50 font-semibold text-primary-800 dark:bg-primary-900/40 dark:text-primary-100'
                            : 'theme-muted-strong'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-xs font-bold uppercase">
                          {item.code}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4"
              style={{
                backgroundColor: 'var(--sq-surface)',
                borderColor: 'var(--sq-border)',
                color: 'var(--sq-muted-strong)',
                '--tw-ring-color':
                  'color-mix(in srgb, var(--sq-brand) 24%, transparent)'
              } as CSSProperties}
              aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              suppressHydrationWarning
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>


            <Link
              href="/download"
              className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-lg bg-phoenix-flame px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-phoenix-fire sm:text-sm md:px-4"
            >
              {copy.nav.cta}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
