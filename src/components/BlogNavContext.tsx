'use client';

import {createContext, useContext} from 'react';

// Whether the blog has a public article in the current language, so the
// footer links to /blog only when that page exists. Set by the locale layout,
// which asks src/lib/blog.ts; kept here so the client footer does not bundle
// the articles.
const BlogNavContext = createContext(false);

export function BlogNavProvider({
  enabled,
  children
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  return <BlogNavContext.Provider value={enabled}>{children}</BlogNavContext.Provider>;
}

export function useBlogNav(): boolean {
  return useContext(BlogNavContext);
}
