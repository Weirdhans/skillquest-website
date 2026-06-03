import Link from 'next/link';
import {headers} from 'next/headers';
import {getAuthCopy, resolveAuthLocale, withAuthLocale} from '@/lib/authI18n';

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
    <main className="min-h-screen bg-background-50 px-6 py-12 text-gray-900">
      <section className="mx-auto flex min-h-[80vh] w-full max-w-xl items-center">
        <div className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-phoenix text-lg font-bold text-white">
            {copy.logoText}
          </div>

          {hasRecoveryToken ? (
            <>
              <h1 className="heading-md mb-4">{copy.confirmTitle}</h1>
              <p className="text-body mb-6">{copy.confirmIntro}</p>

              <form action="/api/auth/confirm" method="post" className="space-y-4">
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
              <h1 className="heading-md mb-4">{copy.expiredTitle}</h1>
              <p className="text-body mb-6">{copy.confirmExpiredBody}</p>

              <Link
                href={withAuthLocale('/auth/forgot-password', locale)}
                className="btn btn-primary w-full"
              >
                {copy.requestNewLink}
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
