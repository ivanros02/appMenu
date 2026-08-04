import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Panel de administración
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Ingresá con tu usuario para gestionar tu menú
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
