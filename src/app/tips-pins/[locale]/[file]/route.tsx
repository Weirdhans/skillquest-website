import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import sharp from 'sharp';
import {isLocale} from '@/lib/marketing';
import {PIN_HEIGHT, PIN_WIDTH} from '@/lib/tip-pin';
import {getAllTips, getTip, getTipsUiCopy} from '@/lib/tips';

// Built once per article and language, as .png and as .jpg (Instagram only takes
// JPEG through its API, so the social queue tool asks for the .jpg of every pin).
// The path has an extension, so the locale middleware leaves it alone. Only
// articles that are public at build time are prerendered; a later one is built on
// its first request after its publishedAt day (dynamicParams) and answers 404
// before that, for both formats.
export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600; // seconds; a literal, Next.js cannot read an imported value

export function generateStaticParams() {
  return getAllTips().flatMap((tip) =>
    ['png', 'jpg'].map((extension) => ({locale: tip.locale, file: `${tip.slug}.${extension}`}))
  );
}

const BACKGROUND = 'linear-gradient(160deg, #043d47 0%, #032a33 55%, #021b22 100%)';
const ACCENT = '#26cda0';
const MUTED = '#bed6d6';
const JPEG_BACKGROUND = '#021b22';
const JPEG_QUALITY = 92;
const NOT_FOUND_CACHE_CONTROL = 'no-store';

// Satori needs TTF/OTF. The fonts live in the repo (both SIL Open Font
// License) so the build does not depend on Google Fonts: one timed-out font
// request used to fail the whole deployment.
const FONT_DIR = join(process.cwd(), 'assets', 'fonts');
const fontsPromise = Promise.all([
  readFile(join(FONT_DIR, 'BricolageGrotesque-Bold.ttf')),
  readFile(join(FONT_DIR, 'Geist-Medium.ttf'))
]);

export async function GET(
  _request: Request,
  {params}: {params: Promise<{locale: string; file: string}>}
) {
  const {locale, file} = await params;
  const asJpeg = file.endsWith('.jpg');
  const slug = file.replace(/\.(png|jpg)$/, '');
  const tip = isLocale(locale) ? getTip(locale, slug) : undefined;
  const copy = isLocale(locale) ? getTipsUiCopy(locale) : undefined;

  if (!tip || !copy) {
    // Not remembered as missing: the article goes live at 00:00 UTC and Pinterest or
    // Buffer may ask before that.
    return new Response('Not found', {status: 404, headers: {'Cache-Control': NOT_FOUND_CACHE_CONTROL}});
  }

  const eyebrow = `${copy.eyebrow} · ${tip.eyebrow}`.toUpperCase();
  const footer = `skill-quest.app/${locale}/tips`;
  const logo = await readFile(join(process.cwd(), 'public', 'skillquest-logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  const [display, body] = await fontsPromise;

  const image = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '90px 80px 80px',
          background: BACKGROUND,
          fontFamily: 'Geist'
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={84} height={84} style={{borderRadius: 20}} alt="" />
          <div style={{fontFamily: 'Bricolage', fontSize: 46, color: 'white'}}>SkillQuest</div>
        </div>

        <div
          style={{
            marginTop: 110,
            fontSize: 30,
            letterSpacing: 3,
            color: ACCENT
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: 'Bricolage',
            fontSize: 84,
            lineHeight: 1.08,
            color: 'white'
          }}
        >
          {tip.title}
        </div>
        <div style={{marginTop: 40, fontSize: 38, lineHeight: 1.4, color: MUTED}}>
          {tip.cardSummary}
        </div>

        <div style={{flexGrow: 1}} />

        <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <div style={{fontSize: 32, color: ACCENT}}>{footer}</div>
          <svg width="260" height="170" viewBox="0 0 260 170">
            <polyline
              points="0,160 70,145 130,90 165,90 205,40 230,40 255,8"
              fill="none"
              stroke={ACCENT}
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    ),
    {
      width: PIN_WIDTH,
      height: PIN_HEIGHT,
      fonts: [
        {name: 'Bricolage', data: display, weight: 700, style: 'normal'},
        {name: 'Geist', data: body, weight: 500, style: 'normal'}
      ]
    }
  );

  if (!asJpeg) {
    return image;
  }

  // The pin has no transparency (a flat gradient), but flatten onto the darkest
  // gradient colour anyway so an alpha channel can never turn black.
  const png = Buffer.from(await image.arrayBuffer());
  const jpeg = await sharp(png).flatten({background: JPEG_BACKGROUND}).jpeg({quality: JPEG_QUALITY}).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': image.headers.get('Cache-Control') ?? 'public, max-age=31536000, immutable'
    }
  });
}
