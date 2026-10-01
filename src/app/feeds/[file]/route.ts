import {localizedPath, SITE_URL, type Locale} from '@/lib/marketing';
import {tipPinUrl, tipsFeedPath} from '@/lib/tip-pin';
import {getTips, getTipsUiCopy, tipPath, tipsLocales} from '@/lib/tips';

// RSS 2.0 feed of the tips per language, at /feeds/tips-<locale>.xml.
// Pinterest auto-publishes a Pin for every new item, using the enclosure
// image; the .xml extension keeps the locale middleware out of the way.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return tipsLocales().map((locale) => ({file: `tips-${locale}.xml`}));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(
  _request: Request,
  {params}: {params: Promise<{file: string}>}
) {
  const {file} = await params;
  const locale = file.match(/^tips-([a-z]{2})\.xml$/)?.[1] as Locale | undefined;
  const copy = locale ? getTipsUiCopy(locale) : undefined;

  if (!locale || !copy || !tipsLocales().includes(locale)) {
    return new Response('Not found', {status: 404});
  }

  const items = getTips(locale)
    .map((tip) => {
      const link = localizedPath(locale, tipPath(tip));
      return `    <item>
      <title>${escapeXml(tip.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(tip.cardSummary)}</description>
      <pubDate>${new Date(`${tip.publishedAt}T08:00:00Z`).toUTCString()}</pubDate>
      <enclosure url="${tipPinUrl(tip)}" type="image/png" length="0" />
      <media:content url="${tipPinUrl(tip)}" medium="image" type="image/png" width="1000" height="1500" />
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(copy.metaTitle)}</title>
    <link>${localizedPath(locale, '/tips')}</link>
    <description>${escapeXml(copy.metaDescription)}</description>
    <language>${locale}</language>
    <atom:link href="${SITE_URL}${tipsFeedPath(locale)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {'Content-Type': 'application/rss+xml; charset=utf-8'}
  });
}
