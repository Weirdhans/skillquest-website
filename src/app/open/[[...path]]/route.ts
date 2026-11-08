import {NextResponse} from 'next/server';

// App link for "open the SkillQuest app" (for example the button and QR code on
// the parent's thank-you page, which lives on app.skill-quest.app).
//
// With the app installed (and a build that knows this path), iOS and Android
// open the app directly and this route is never reached. Without the app, the
// browser lands here and is sent on to the explanation page with the store
// buttons. That page is served by the app project on app.skill-quest.app.
//
// The target host is fixed, so the path cannot be used to redirect elsewhere.
const EXPLANATION_ORIGIN = 'https://app.skill-quest.app';

export async function GET(
  _request: Request,
  {params}: {params: Promise<{path?: string[]}>}
) {
  const {path = []} = await params;
  const target = `${EXPLANATION_ORIGIN}/open/${path.map(encodeURIComponent).join('/')}`;
  return NextResponse.redirect(target, 307);
}
