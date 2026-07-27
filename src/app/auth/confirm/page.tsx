import Link from 'next/link';
import {headers} from 'next/headers';
import AuthShell from '@/components/AuthShell';
import {
  getAuthCopy,
  localizedSitePath,
  resolveAuthLocale,
  withAuthLocale
} from '@/lib/authI18n';

type ConfirmPageProps = {
  searchParams: Promise<{
    token_hash?: string;
    type?: string;
    next?: string;
    locale?: string;
  }>;
};

function safeNext(next?: string) {
  return next === '/auth/reset-password' ? next : '/auth/reset-password';
}

export default async function ConfirmPasswordResetPage({
  searchParams
}: ConfirmPageProps) {
  const params = await searchParams;
  const tokenHash = params.token_hash ?? '';
  const type = params.type ?? '';
  const next = safeNext(params.next);
  const requestHeaders = await headers();
  const locale = resolveAuthLocale(
    params.locale ?? requestHeaders.get('accept-language')
  );
  const copy = getAuthCopy(locale);
  const hasRecoveryToken = tokenHash.length > 0 && type === 'recovery';

  return (
    <AuthShell homeHref={localizedSitePath(locale)}>
      {hasRecoveryToken ? (
        <>
          <h1 className="font-display text-subsection font-bold theme-title">
            {copy.confirmTitle}
          </h1>
          <p className="mt-3 theme-copy">{copy.confirmIntro}</p>

          <form action="/api/auth/confirm" method="post" className="mt-6">
            <input type="hidden" name="token_hash" value={tokenHash} />
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="next" value={next} />
            <input type="hidden" name="locale" value={locale} />

            <button type="submit" className="btn btn-primary w-full">
              {copy.continueButton}
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="font-display text-subsection font-bold theme-title">
            {copy.expiredTitle}
          </h1>
          <p className="mt-3 theme-copy">{copy.confirmExpiredBody}</p>

          <Link
            href={withAuthLocale('/auth/forgot-password', locale)}
            className="btn btn-primary mt-6 w-full"
          >
            {copy.requestNewLink}
          </Link>
        </>
      )}
    </AuthShell>
  );
}
