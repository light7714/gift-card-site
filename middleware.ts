import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedCookie, SESSION_COOKIE_NAME } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const cookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!isAuthenticatedCookie(cookieValue)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/surprise/:path*', '/gifts/:path*']
};
