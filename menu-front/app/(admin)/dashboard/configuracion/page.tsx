import Link from 'next/link';
import { requireAuthToken } from '@/lib/auth';
import { getMiRestaurante } from '@/features/restaurante/api/restaurante-api';
import { RestauranteForm } from '@/features/restaurante/components/RestauranteForm';
import { CodigoQR } from '@/features/restaurante/components/CodigoQR';

export default async function ConfiguracionPage() {
  const token = await requireAuthToken();
  const perfil = await getMiRestaurante(token);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-4 flex justify-between">
        <Link
          href="/dashboard/platos"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Volver a Platos
        </Link>
        <Link
          href={`/${perfil.slug}`}
          target="_blank"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Ver menú público ↗
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Configuración del restaurante
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[2fr_1fr]">
        <RestauranteForm token={token} perfil={perfil} />
        <CodigoQR slug={perfil.slug} />
      </div>
    </main>
  );
}
