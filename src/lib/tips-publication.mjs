// When a tips article becomes public. Plain .mjs so tests/tips.test.mjs can
// import it without a TypeScript build.
//
// An article is public from 00:00 UTC on its publishedAt date (YYYY-MM-DD) and
// stays public after that. Everything that lists or links to tips (index,
// article pages, sitemap, hreflang alternates, RSS feeds, pin images) goes
// through src/lib/tips.ts, which filters with these functions.

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/** The UTC calendar day of `now` as YYYY-MM-DD. */
export function utcDay(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

/**
 * True when the article may be shown at `now`. A publishedAt that is not a
 * plain YYYY-MM-DD date never counts as published, so a typo hides an article
 * instead of publishing it early.
 */
export function isPublished(article, now = new Date()) {
  return DATE_ONLY.test(article.publishedAt) && article.publishedAt <= utcDay(now);
}
