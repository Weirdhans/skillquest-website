// Runs before first paint so the page never flashes the wrong theme.
// The stored value is a preference ('light' | 'dark' | 'system'), not a resolved
// theme, so 'system' keeps deferring to the OS on every load. Anything else,
// including the absence of a value, resolves to the OS as well.
//
// Shared between the marketing tree and the standalone routes (/auth/*,
// /invite/*, /auth-callback). Those sit outside [locale] and used to have no
// theme handling at all, which pinned them to the light token set.
export const themeInitScript = `
(() => {
  try {
    const pref = window.localStorage.getItem('skillquest-theme');
    const theme = pref === 'light' || pref === 'dark'
      ? pref
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;
