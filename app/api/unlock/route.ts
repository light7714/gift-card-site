import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAuthenticatedCookie, SESSION_COOKIE_NAME } from '@/lib/auth';

function envKeyFromGiftId(giftId: string) {
  return giftId.toUpperCase().replace(/[^A-Z0-9]/g, '_');
}

export async function POST(request: Request) {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (!isAuthenticatedCookie(sessionCookie)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { giftId, unlockPassword } = await request.json();

  if (!giftId || !unlockPassword) {
    return NextResponse.json({ error: 'Missing gift id or unlock password.' }, { status: 400 });
  }

  // Sensitive value check: compares against process.env.GIFT_PASSWORD.
  const giftPassword = process.env.GIFT_PASSWORD;
  if (!giftPassword || unlockPassword !== giftPassword) {
    return NextResponse.json({ error: 'Ye thodi hai apna number' }, { status: 401 });
  }

  const envKey = envKeyFromGiftId(giftId);
  const code = process.env[`GIFT_${envKey}_CODE`];
  const pin = process.env[`GIFT_${envKey}_PIN`];

  if (!code || !pin) {
    return NextResponse.json({ error: 'Gift secret not configured.' }, { status: 404 });
  }

  return NextResponse.json({ code, pin });
}
