'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/lib/auth';
import { changePassword } from '../api/auth-api';

export interface ChangePasswordState {
  error?: string;
  success?: boolean;
}

export async function changePasswordAction(
  _prevState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return { error: 'Tu sesión expiró, volvé a iniciar sesión.' };
  }

  const currentPassword = String(formData.get('currentPassword') ?? '');
  const newPassword = String(formData.get('newPassword') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  if (newPassword.length < 6) {
    return { error: 'La nueva contraseña debe tener al menos 6 caracteres' };
  }

  if (newPassword !== confirmPassword) {
    return { error: 'Las contraseñas nuevas no coinciden' };
  }

  try {
    await changePassword({ currentPassword, newPassword }, token);
  } catch {
    return { error: 'No se pudo cambiar la contraseña. Verificá tu contraseña actual.' };
  }

  return { success: true };
}
