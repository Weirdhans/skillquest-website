import Image from 'next/image';

// One shell for every standalone screen: password reset, email confirmation,
// friend invites, family invites, app handoff. They used to run on two private
// looks - a dark slate glass panel for the invite and callback screens, a light
// grey one for the password screens - neither of which followed the site theme.
//
// The brand mark is the real logo rather than the old white-on-orange "SQ"
// tile. That tile measured 2.84:1 against AA's 4.5:1, and no amount of tuning
// fixes white text on the brand orange.
export default function AuthShell({
  children,
  homeHref = '/'
}: {
  children: React.ReactNode;
  homeHref?: string;
}) {
  return (
    <main className="theme-page flex min-h-[100dvh] flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-xl">
        <a
          href={homeHref}
          className="mb-8 inline-flex items-center gap-3 transition hover:opacity-80"
        >
          <Image
            src="/skillquest-logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-display text-xl font-extrabold theme-title">
            SkillQuest
          </span>
        </a>

        <div className="theme-card rounded-2xl p-6 sm:p-8">{children}</div>
      </div>
    </main>
  );
}
