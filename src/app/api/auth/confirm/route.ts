import type {EmailOtpType} from '@supabase/supabase-js';
import {NextRequest, NextResponse} from 'next/server';
import {resolveAuthLocale, withAuthLocale} from '@/lib/authI18n';
import {createSupabaseServerClient} from '@/lib/supabase/server';

function safeNext(next: FormDataEntryValue | null) {
  return next === '/auth/reset-password' ? next : '/auth/reset-password';
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const tokenHash = formData.get('token_hash');
  const type = formData.get('type');
  const next = safeNext(formData.get('next'));
  const localeEntry = formData.get('locale');
  const locale = resolveAuthLocale(
    typeof localeEntry === 'string'
      ? localeEntry
      : request.headers.get('accept-language')
  );
  const origin = new URL(request.url).origin;

  if (
    typeof tokenHash === 'string' &&
    tokenHash.length > 0 &&
    type === 'recovery'
  ) {
    const supabase = await createSupabaseServerClient();
    const {error} = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType
    });

    if (error == null) {
      return NextResponse.redirect(new URL(withAuthLocale(next, locale), origin), 303);
    }
  }

  return NextResponse.redirect(
    new URL(withAuthLocale('/auth/reset-password?error=expired', locale), origin),
    303
  );
}
