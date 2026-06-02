import PasswordResetForm from '@/components/PasswordResetForm';

type ResetPasswordPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams
}: ResetPasswordPageProps) {
  const params = await searchParams;

  return <PasswordResetForm initialExpired={params.error === 'expired'} />;
}
