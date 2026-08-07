import { requireAuthToken } from '@/lib/auth';
import { ChangePasswordForm } from '@/features/auth/components/ChangePasswordForm';

export default async function CambiarPasswordPage() {
  await requireAuthToken();

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Cambiar contraseña</h1>
      <ChangePasswordForm />
    </div>
  );
}
