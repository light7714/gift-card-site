import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isAuthenticatedCookie, SESSION_COOKIE_NAME } from '@/lib/auth';
import SurpriseContent from '@/components/SurpriseContent';

export default function SurprisePage() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!isAuthenticatedCookie(sessionCookie)) {
    redirect('/');
  }

  return <SurpriseContent />;
}
