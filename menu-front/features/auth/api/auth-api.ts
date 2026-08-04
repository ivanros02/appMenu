import type { ChangePasswordInput, LoginInput } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function login(data: LoginInput): Promise<{ accessToken: string }> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  return res.json() as Promise<{ accessToken: string }>;
}

export async function changePassword(
  data: ChangePasswordInput,
  token: string,
): Promise<{ mensaje: string }> {
  const res = await fetch(`${API_URL}/auth/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  if (!res.ok) {
    const body: { message?: string } | null = await res.json().catch(() => null);
    throw new Error(body?.message ?? 'No se pudo cambiar la contraseña');
  }

  return res.json() as Promise<{ mensaje: string }>;
}
