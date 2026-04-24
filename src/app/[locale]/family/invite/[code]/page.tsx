import FamilyInviteLanding from '@/components/FamilyInviteLanding';

export default async function FamilyInvitePage({
  params
}: {
  params: Promise<{locale: string; code: string}>;
}) {
  const {locale, code} = await params;
  return <FamilyInviteLanding locale={locale} rawCode={code} />;
}
