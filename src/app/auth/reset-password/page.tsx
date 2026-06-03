import {headers} from 'next/headers';
import PasswordResetForm from '@/components/PasswordResetForm';
import {resolveAuthLocale} from '@/lib/authI18n';

type ResetPasswordPageProps = {
  searchParams: Promise<{
    error?: string;
    locale?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const requestHeaders = await headers();
  const locale = resolveAuthLocale(
    params.locale ?? requestHeaders.get('accept-language')
  );

  return (
    <PasswordResetForm
      initialExpired={params.error === 'expired'}
      locale={locale}
    />
  );
}
