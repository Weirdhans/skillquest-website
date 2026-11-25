'use client';

import {useLayoutEffect} from 'react';
import {usePathname} from 'next/navigation';
import {applyTheme, getClientPref, resolveTheme} from '@/lib/theme';

// Puts the theme back on <html> after a client-side navigation.
//
// Only the [locale] layout renders <html>. When that layout re-mounts (a
// language switch) or unmounts (the footer link to /auth/forgot-password),
// React resets <html> to the attributes it rendered itself, which drops the
// `dark` class and data-theme that the init script set. That script only runs
// on a full page load. The page then fell back to light while the stored
// preference still said dark or system.
//
// A layout effect runs after React touched the DOM and before the browser
// paints, so there is no frame in the wrong theme. It reads the stored
// preference directly: on the first load that gives the same answer as the
// init script, so it changes nothing there.
export default function ThemeSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    applyTheme(resolveTheme(getClientPref()));
  }, [pathname]);

  return null;
}
