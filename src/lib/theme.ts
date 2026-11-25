// The theme preference and how it reaches the page. Shared by the navbar
// (the button) and ThemeSync (puts the theme back after a client-side
// navigation). Only call these in the browser, from effects or handlers.

// Three preferences, two resolved themes. The stored value is the *preference*,
// so 'system' keeps following the OS instead of freezing whatever it resolved to
// at the moment of the click. Before this there was no way back to 'system'
// once you had picked a side.
export type ThemePref = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'skillquest-theme';
export const THEME_CYCLE: ThemePref[] = ['light', 'dark', 'system'];

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

export function subscribeToPref(onChange: () => void) {
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

export function getServerPref(): ThemePref {
  return 'system';
}

export function getClientPref(): ThemePref {
  return memoryPref ?? readStoredPref();
}

export function storePref(next: ThemePref) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    // Stored, so read it from storage from now on. A page without the navbar
    // has no storage listener, and a kept copy would go stale there when
    // another tab changes the theme.
    memoryPref = null;
  } catch {
    // The visible theme should still change if storage is unavailable.
    memoryPref = next;
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

export function systemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function resolveTheme(pref: ThemePref): Theme {
  return pref === 'system' ? systemTheme() : pref;
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
}
