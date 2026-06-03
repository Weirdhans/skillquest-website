import {NextRequest, NextResponse} from 'next/server';
import {resolveAuthLocale, withAuthLocale} from '@/lib/authI18n';
import {createSupabaseServerClient} from '@/lib/supabase/server';

function safeNext(next: string | null) {
  return next === '/auth/reset-password' ? next : '/auth/reset-password';
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = safeNext(requestUrl.searchParams.get('next'));
  const locale = resolveAuthLocale(
    requestUrl.searchParams.get('locale') ??
      request.headers.get('accept-language')
  );

  if (code != null && code.length > 0) {
    const supabase = await createSupabaseServerClient();
    const {error} = await supabase.auth.exchangeCodeForSession(code);

    if (error == null) {
      return NextResponse.redirect(
        new URL(withAuthLocale(next, locale), requestUrl.origin),
        303
      );
    }
  }

  return NextResponse.redirect(
    new URL(
      withAuthLocale('/auth/reset-password?error=expired', locale),
      requestUrl.origin
    ),
    303
  );
}
