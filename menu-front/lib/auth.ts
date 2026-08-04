import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const AUTH_COOKIE_NAME = 'token';

export async function requireAuthToken(): Promise<string> {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    redirect('/login');
  }

  return token;
}
