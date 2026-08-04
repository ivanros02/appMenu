import Link from 'next/link';
import { requireAuthToken } from '@/lib/auth';
import { CategoriaList } from '@/features/categorias/components/CategoriaList';
import { getCategorias } from '@/features/categorias/api/categorias-api';

export default async function CategoriasPage() {
  const token = await requireAuthToken();
  const categorias = await getCategorias(token);

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
          href="/dashboard/etiquetas"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Etiquetas
        </Link>
        <Link
          href="/dashboard/cambiar-password"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Cambiar contraseña
        </Link>
      </div>
      <CategoriaList token={token} categoriasIniciales={categorias} />
    </main>
  );
}
