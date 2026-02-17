import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  const { fullName } = await request.json();

  if (!fullName || typeof fullName !== 'string') {
    return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
  }

  // Sensitive value check: compares against process.env.SITE_PASSWORD.
  const sitePassword = process.env.SITE_PASSWORD;
  const sessionToken = process.env.SESSION_TOKEN;

  if (!sitePassword || !sessionToken) {
    return NextResponse.json({ error: 'Server is not configured securely.' }, { status: 500 });
  }

  if (fullName.trim().toLowerCase() !== sitePassword.trim().toLowerCase()) {
    return NextResponse.json({ error: 'Forgot your name? or trying to fool me? 😏' }, { status: 401 });
  }

  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 10
  });

  return NextResponse.json({ success: true });
}
