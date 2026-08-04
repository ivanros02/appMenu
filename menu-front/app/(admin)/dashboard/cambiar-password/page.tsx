import Link from 'next/link';
import { requireAuthToken } from '@/lib/auth';
import { ChangePasswordForm } from '@/features/auth/components/ChangePasswordForm';

export default async function CambiarPasswordPage() {
  await requireAuthToken();

  return (
    <main className="mx-auto max-w-md px-6 py-10">
      <Link
        href="/dashboard/platos"
        className="mb-6 inline-block text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← Volver a Platos
      </Link>
      <ChangePasswordForm />
    </main>
  );
}
