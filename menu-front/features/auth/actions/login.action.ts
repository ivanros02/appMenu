'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/auth';
import { login } from '../api/auth-api';

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!username || !password) {
    return { error: 'Completá usuario y contraseña' };
  }

  let accessToken: string;

  try {
    const respuesta = await login({ username, password });
    accessToken = respuesta.accessToken;
  } catch {
    return { error: 'Usuario o contraseña incorrectos' };
  }

  (await cookies()).set(AUTH_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  redirect('/dashboard/platos');
}
