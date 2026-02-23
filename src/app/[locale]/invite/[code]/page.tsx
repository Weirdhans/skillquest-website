import InviteLanding from '@/components/InviteLanding';

export default async function InvitePage({
  params,
}: {
  params: Promise<{locale: string; code: string}>;
}) {
  const {locale, code} = await params;
  return <InviteLanding locale={locale} rawCode={code} />;
}

