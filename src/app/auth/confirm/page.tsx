import Link from 'next/link';

type ConfirmPageProps = {
  searchParams: Promise<{
    token_hash?: string;
    type?: string;
    next?: string;
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
  const hasRecoveryToken = tokenHash.length > 0 && type === 'recovery';

  return (
    <main className="min-h-screen bg-background-50 px-6 py-12 text-gray-900">
      <section className="mx-auto flex min-h-[80vh] w-full max-w-xl items-center">
        <div className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-phoenix text-lg font-bold text-white">
            SQ
          </div>

          {hasRecoveryToken ? (
            <>
              <h1 className="heading-md mb-4">Wachtwoord opnieuw instellen</h1>
              <p className="text-body mb-6">
                Bevestig dat je je SkillQuest-wachtwoord wilt wijzigen. Daarna
                kun je een nieuw wachtwoord kiezen.
              </p>

              <form action="/api/auth/confirm" method="post" className="space-y-4">
                <input type="hidden" name="token_hash" value={tokenHash} />
                <input type="hidden" name="type" value={type} />
                <input type="hidden" name="next" value={next} />

                <button type="submit" className="btn btn-primary w-full">
                  Doorgaan
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="heading-md mb-4">Resetlink verlopen</h1>
              <p className="text-body mb-6">
                Deze link mist gegevens of is niet meer geldig. Vraag een nieuwe
                wachtwoordreset aan.
              </p>

              <Link href="/auth/forgot-password" className="btn btn-primary w-full">
                Nieuwe resetlink aanvragen
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
