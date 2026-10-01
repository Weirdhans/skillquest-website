import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {isLocale} from '@/lib/marketing';
import {PIN_HEIGHT, PIN_WIDTH} from '@/lib/tip-pin';
import {getAllTips, getTip, getTipsUiCopy} from '@/lib/tips';

// Built once per article and language; the path ends in .png, so the locale
// middleware leaves it alone.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTips().map((tip) => ({locale: tip.locale, file: `${tip.slug}.png`}));
}

const BACKGROUND = 'linear-gradient(160deg, #043d47 0%, #032a33 55%, #021b22 100%)';
const ACCENT = '#26cda0';
const MUTED = '#bed6d6';

// Satori needs TTF/OTF, so ask Google Fonts for just the characters we draw.
async function loadGoogleFont(family: string, weight: number, text: string) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`
    )
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`No TTF for ${family} ${weight}`);
  return (await fetch(url)).arrayBuffer();
}

export async function GET(
  _request: Request,
  {params}: {params: Promise<{locale: string; file: string}>}
) {
  const {locale, file} = await params;
  const slug = file.replace(/\.png$/, '');
  const tip = isLocale(locale) ? getTip(locale, slug) : undefined;
  const copy = isLocale(locale) ? getTipsUiCopy(locale) : undefined;

  if (!tip || !copy) {
    return new Response('Not found', {status: 404});
  }

  const eyebrow = `${copy.eyebrow} · ${tip.eyebrow}`.toUpperCase();
  const footer = `skill-quest.app/${locale}/tips`;
  const logo = await readFile(join(process.cwd(), 'public', 'skillquest-logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  const [display, body] = await Promise.all([
    loadGoogleFont('Bricolage+Grotesque', 700, `SkillQuest${tip.title}`),
    loadGoogleFont('Geist', 500, `${eyebrow}${tip.cardSummary}${footer}`)
  ]);

  return new ImageResponse(
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
}
