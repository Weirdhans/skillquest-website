'use client';

import NextLink from 'next/link';
import {useLocale} from 'next-intl';
import {Link} from '@/i18n/routing';
import {
  APP_STORE_URL,
  ANDROID_ALPHA_JOIN_URL,
  SUPPORT_EMAIL,
  getMarketingCopy,
  isLocale,
  type Locale
} from '@/lib/marketing';

export default function Footer() {
  const currentLocale = useLocale();
  const locale: Locale = isLocale(currentLocale)
    ? currentLocale
    : 'nl';
  const copy = getMarketingCopy(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-footer">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-bold text-white">
              SkillQuest
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              {copy.footer.description}
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-4 inline-flex text-sm font-semibold text-primary-200 hover:text-white"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-white">{copy.footer.product}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/features" className="hover:text-white">
                  {copy.footer.features}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  {copy.footer.pricing}
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-white">
                  {copy.footer.download}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white">{copy.footer.resources}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  App Store
                </a>
              </li>
              <li>
                <a
                  href={ANDROID_ALPHA_JOIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Android alpha
                </a>
              </li>
              <li>
                <NextLink
                  href={`/auth/forgot-password?locale=${locale}`}
                  className="hover:text-white"
                >
                  {copy.footer.changePassword}
                </NextLink>
              </li>
              <li>
                <Link href="/support" className="hover:text-white">
                  {copy.footer.support}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white">{copy.footer.legal}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  {copy.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/delete-account" className="hover:text-white">
                  {copy.footer.deleteAccount}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-500">
          © {currentYear} SkillQuest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
