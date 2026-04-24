import FamilyInviteLanding from '@/components/FamilyInviteLanding';

export default async function FamilyInvitePage({
  params
}: {
  params: Promise<{code: string}>;
}) {
  const {code} = await params;
  return <FamilyInviteLanding locale="nl" rawCode={code} />;
}
