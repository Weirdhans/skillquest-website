'use client';

import type {CSSProperties} from 'react';
import {useEffect, useState, useSyncExternalStore} from 'react';
import Image from 'next/image';
import {AnimatePresence, motion, useMotionValueEvent, useScroll} from 'framer-motion';
import {CaretDown, Monitor, Moon, Sun} from '@phosphor-icons/react';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {Link, routing} from '@/i18n/routing';
import {getMarketingCopy, isLocale, type Locale} from '@/lib/marketing';

// Three preferences, two resolved themes. The stored value is the *preference*,
// so 'system' keeps following the OS instead of freezing whatever it resolved to
// at the moment of the click. Before this there was no way back to 'system'
// once you had picked a side.
type ThemePref = 'light' | 'dark' | 'system';
type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'skillquest-theme';
const THEME_CYCLE: ThemePref[] = ['light', 'dark', 'system'];

// The preference lives in localStorage, which the server cannot see. Reading
// it during render (a lazy useState initializer did that before) made the
// client's first render differ from the SSR markup whenever a visitor had
// picked light or dark: the button's sr-only label and icon changed, and
// suppressHydrationWarning only covers the element's own text, not children.
// That was React error #418 on every page load. useSyncExternalStore renders
// the server snapshot ('system') during hydration and the stored value right
// after, without a mismatch.
//
// memoryPref keeps a pick made while storage is unavailable (private mode,
// blocked site data), so the button still cycles.
let memoryPref: ThemePref | null = null;
const prefListeners = new Set<() => void>();

function subscribeToPref(onChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    memoryPref = null;
    onChange();
  };

  prefListeners.add(onChange);
  window.addEventListener('storage', handleStorage);
  return () => {
    prefListeners.delete(onChange);
    window.removeEventListener('storage', handleStorage);
  };
}

function getServerPref(): ThemePref {
  return 'system';
}

function getClientPref(): ThemePref {
  return memoryPref ?? readStoredPref();
}

function storePref(next: ThemePref) {
  memoryPref = next;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // The visible theme should still change if storage is unavailable.
  }
  prefListeners.forEach((listener) => listener());
}

function readStoredPref(): ThemePref {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    return 'system';
  }
  return 'system';
}

function systemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function resolveTheme(pref: ThemePref): Theme {
  return pref === 'system' ? systemTheme() : pref;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
}

const THEME_LABELS: Record<Locale, Record<ThemePref, string>> = {
  nl: {light: 'Licht', dark: 'Donker', system: 'Systeem'},
  en: {light: 'Light', dark: 'Dark', system: 'System'},
  de: {light: 'Hell', dark: 'Dunkel', system: 'System'},
  fr: {light: 'Clair', dark: 'Sombre', system: 'Système'},
  es: {light: 'Claro', dark: 'Oscuro', system: 'Sistema'},
  it: {light: 'Chiaro', dark: 'Scuro', system: 'Sistema'}
};

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
  const themePref = useSyncExternalStore(
    subscribeToPref,
    getClientPref,
    getServerPref
  );
  const themeLabels = THEME_LABELS[locale] ?? THEME_LABELS.en;

  // useScroll instead of a raw scroll listener: that ran on every scroll frame
  // with no batching, and setState per frame re-rendered the whole nav.
  const {scrollY} = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 8;
    setIsScrolled((prev) => (prev === next ? prev : next));
  });

  // While the preference is 'system', follow the OS live. Without this the page
  // would keep the theme it resolved to at load even if the OS flips (which it
  // does on a schedule for a lot of people).
  useEffect(() => {
    if (themePref !== 'system') return;

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme(systemTheme());

    // No immediate handleChange() here: the init script applied the theme
    // before paint and cycleTheme() applies it on a click. Calling it on mount
    // would run during the hydration pass, where themePref is still the
    // 'system' server snapshot, and overwrite a stored light/dark choice.
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [themePref]);

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

  function cycleTheme() {
    const next =
      THEME_CYCLE[(THEME_CYCLE.indexOf(themePref) + 1) % THEME_CYCLE.length]!;

    applyTheme(resolveTheme(next));
    storePref(next);
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
        {/* Capped at 72px so the nav never eats into the hero. It measured 81px
            before, which pushed the hero CTA below a 900px fold. */}
        <div className="flex h-16 items-center justify-between gap-4 md:h-[72px]">
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
                <CaretDown
                  size={16}
                  weight="bold"
                  aria-hidden
                  className={`transition-transform theme-copy ${
                    showLangMenu ? 'rotate-180' : ''
                  }`}
                />
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

            {/* Cycles light -> dark -> system. The icon shows the current
                preference, not the resolved theme, so the monitor icon means
                "following your device" rather than a third colour scheme. */}
            <button
              type="button"
              onClick={cycleTheme}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4"
              style={{
                backgroundColor: 'var(--sq-surface)',
                borderColor: 'var(--sq-border)',
                color: 'var(--sq-muted-strong)',
                '--tw-ring-color':
                  'color-mix(in srgb, var(--sq-brand) 24%, transparent)'
              } as CSSProperties}
              aria-label={`${themeLabels.light} / ${themeLabels.dark} / ${themeLabels.system}`}
              title={themeLabels[themePref]}
            >
              <span className="sr-only">{themeLabels[themePref]}</span>
              {themePref === 'light' ? (
                <Sun size={18} weight="bold" aria-hidden />
              ) : themePref === 'dark' ? (
                <Moon size={18} weight="bold" aria-hidden />
              ) : (
                <Monitor size={18} weight="bold" aria-hidden />
              )}
            </button>


            <Link
              href="/download"
              className="btn-cta-solid inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold shadow-sm transition sm:text-sm md:px-4"
            >
              {copy.nav.cta}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
