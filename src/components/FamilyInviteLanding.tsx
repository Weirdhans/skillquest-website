'use client';

import InviteLanding from '@/components/InviteLanding';

// Kept as its own entry point because two routes import it by name, but the
// screen itself is the friend invite with a different deep link and wording.
export default function FamilyInviteLanding({
  locale,
  rawCode
}: {
  locale: string;
  rawCode: string;
}) {
  return <InviteLanding locale={locale} rawCode={rawCode} variant="family" />;
}
