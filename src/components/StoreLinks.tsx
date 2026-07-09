import {
  ANDROID_ALPHA_JOIN_URL,
  APP_STORE_URL
} from '@/lib/marketing';

type StoreLinksProps = {
  appStoreLabel: string;
  androidLabel: string;
  tone?: 'dark' | 'light';
  className?: string;
};

export default function StoreLinks({
  appStoreLabel,
  androidLabel,
  tone = 'dark',
  className = ''
}: StoreLinksProps) {
  const secondaryClass =
    tone === 'dark'
      ? 'border-white/40 text-white hover:bg-white/10'
      : 'border-primary-200 text-primary-800 hover:bg-primary-50 dark:border-primary-700 dark:text-primary-100 dark:hover:bg-primary-900/30';

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-lg bg-phoenix-flame px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-phoenix-fire focus:outline-none focus:ring-4 focus:ring-phoenix-flame/30"
      >
        {appStoreLabel}
      </a>
      <a
        href={ANDROID_ALPHA_JOIN_URL}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex min-h-12 items-center justify-center rounded-lg border px-5 py-3 text-center font-semibold transition focus:outline-none focus:ring-4 focus:ring-primary-500/20 ${secondaryClass}`}
      >
        {androidLabel}
      </a>
    </div>
  );
}
