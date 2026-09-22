'use client';

import {useSyncExternalStore} from 'react';

// Hydration-safe replacement for framer-motion's useReducedMotion when the
// value decides WHAT is rendered (not just how it animates). framer's hook
// reads matchMedia during the client's first render, so a reduced-motion
// visitor hydrates a different tree than the server sent (React error #418).
// useSyncExternalStore renders the server snapshot (false) during hydration
// and switches to the real preference straight after.

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
