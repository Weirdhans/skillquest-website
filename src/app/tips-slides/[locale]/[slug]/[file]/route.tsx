import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import sharp from 'sharp';
import {isLocale} from '@/lib/marketing';
import {getTip, getTipsUiCopy} from '@/lib/tips';
import {SLIDE_HEIGHT, SLIDE_LOCALES, SLIDE_WIDTH, tipSlides} from '@/lib/tip-slides.mjs';

// The slides of the Instagram/Facebook carousel of a tips article, one JPEG each:
// /tips-slides/en/<slug>/<n>.jpg, n = 1 (cover) up to sections + 2 (closing).
// Instagram only takes JPEG through its API. Slides are built on request, not at
// build time (about nine per article), and answer 404 before the article's
// publishedAt day and for an n outside the carousel, like the pin images.
export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600; // seconds; a literal, Next.js cannot read an imported value

export function generateStaticParams() {
  return [];
}

const BACKGROUND = 'linear-gradient(160deg, #043d47 0%, #032a33 55%, #021b22 100%)';
const ACCENT = '#26cda0';
const MUTED = '#bed6d6';
const JPEG_BACKGROUND = '#021b22';
const JPEG_QUALITY = 92;
const MARGIN = 90;
const NOT_FOUND_CACHE_CONTROL = 'no-store';

const FONT_DIR = join(process.cwd(), 'assets', 'fonts');
const fontsPromise = Promise.all([
  readFile(join(FONT_DIR, 'BricolageGrotesque-Bold.ttf')),
  readFile(join(FONT_DIR, 'Geist-Medium.ttf'))
]);

export async function GET(
  _request: Request,
  {params}: {params: Promise<{locale: string; slug: string; file: string}>}
) {
  const {locale, slug, file} = await params;
  const match = /^([1-9]\d?)\.jpg$/.exec(file);
  const tip = isLocale(locale) && SLIDE_LOCALES.includes(locale) ? getTip(locale, slug) : undefined;
  const copy = isLocale(locale) ? getTipsUiCopy(locale) : undefined;
  const slide = tip && match ? tipSlides(tip).find((item) => item.n === Number(match[1])) : undefined;

  if (!tip || !copy || !slide) {
    // A slide that is not public yet must not be remembered as missing: the article
    // goes live at 00:00 UTC and Buffer or Instagram may ask before that.
    return new Response('Not found', {status: 404, headers: {'Cache-Control': NOT_FOUND_CACHE_CONTROL}});
  }

  const [display, body] = await fontsPromise;
  const logo = await readFile(join(process.cwd(), 'public', 'skillquest-logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  const label = `${copy.eyebrow} · ${tip.eyebrow}`.toUpperCase();

  const header = (
    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 28, letterSpacing: 2, color: ACCENT}}>
      <div style={{display: 'flex', maxWidth: 800}}>{label}</div>
      <div style={{display: 'flex', color: MUTED}}>{`${slide.n}/${slide.total}`}</div>
    </div>
  );

  let content;
  if (slide.kind === 'cover') {
    content = (
      <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        <div style={{display: 'flex', flexDirection: 'column', marginTop: 190}}>
          <div style={{display: 'flex', fontFamily: 'Bricolage', fontSize: slide.title.length > 60 ? 84 : 100, lineHeight: 1.1, color: 'white'}}>
            {slide.title}
          </div>
          <div style={{display: 'flex', marginTop: 44, fontSize: 40, lineHeight: 1.4, color: MUTED}}>{slide.body}</div>
        </div>
        <div style={{flexGrow: 1}} />
        <div style={{display: 'flex', fontSize: 36, color: ACCENT}}>Swipe →</div>
      </div>
    );
  } else if (slide.kind === 'tip') {
    content = (
      <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', paddingBottom: 60}}>
        <div style={{display: 'flex', fontFamily: 'Bricolage', fontSize: 240, lineHeight: 1, color: ACCENT}}>
          {String(slide.number)}
        </div>
        <div style={{display: 'flex', marginTop: 40, fontFamily: 'Bricolage', fontSize: 72, lineHeight: 1.15, color: 'white'}}>
          {slide.title}
        </div>
        {slide.body ? (
          <div style={{display: 'flex', marginTop: 36, fontSize: 40, lineHeight: 1.4, color: MUTED}}>{slide.body}</div>
        ) : null}
      </div>
    );
  } else {
    content = (
      <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        <div style={{display: 'flex', flexDirection: 'column', marginTop: 150}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={150} height={150} style={{borderRadius: 34}} alt="" />
          <div style={{display: 'flex', marginTop: 60, fontFamily: 'Bricolage', fontSize: 84, lineHeight: 1.1, color: 'white'}}>
            Send this to a parent who could use it today.
          </div>
        </div>
        <div style={{flexGrow: 1}} />
        <div style={{display: 'flex', fontSize: 36, color: ACCENT}}>{`skill-quest.app/${locale}/tips`}</div>
      </div>
    );
  }

  const image = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: `70px ${MARGIN}px 90px`,
          background: BACKGROUND,
          fontFamily: 'Geist'
        }}
      >
        {header}
        {content}
      </div>
    ),
    {
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
      fonts: [
        {name: 'Bricolage', data: display, weight: 700, style: 'normal'},
        {name: 'Geist', data: body, weight: 500, style: 'normal'}
      ]
    }
  );

  // Flatten onto the darkest gradient colour so an alpha channel can never turn black.
  const png = Buffer.from(await image.arrayBuffer());
  const jpeg = await sharp(png).flatten({background: JPEG_BACKGROUND}).jpeg({quality: JPEG_QUALITY}).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': image.headers.get('Cache-Control') ?? 'public, max-age=31536000, immutable'
    }
  });
}
