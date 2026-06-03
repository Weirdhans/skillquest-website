import {headers} from 'next/headers';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import {resolveAuthLocale} from '@/lib/authI18n';

type ForgotPasswordPageProps = {
  searchParams: Promise<{
    locale?: string;
  }>;
};

export default async function ForgotPasswordPage({
  searchParams
}: ForgotPasswordPageProps) {
  const params = await searchParams;
  const requestHeaders = await headers();
  const locale = resolveAuthLocale(
    params.locale ?? requestHeaders.get('accept-language')
  );

  return <ForgotPasswordForm locale={locale} />;
}
