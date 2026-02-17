export const SESSION_COOKIE_NAME = 'romantic_session';

export function isAuthenticatedCookie(value?: string) {
  const sessionToken = process.env.SESSION_TOKEN;
  return Boolean(value && sessionToken && value === sessionToken);
}
