import Link from 'next/link';
import { requireAuthToken } from '@/lib/auth';
import { PlatoList } from '@/features/platos/components/PlatoList';
import { getPlatos } from '@/features/platos/api/platos-api';
import { getCategorias } from '@/features/platos/api/categorias-api';
import { getEtiquetas } from '@/features/platos/api/etiquetas-api';

export default async function PlatosPage() {
  const token = await requireAuthToken();

  const [platos, categorias, etiquetas] = await Promise.all([
    getPlatos(token),
    getCategorias(token),
    getEtiquetas(token),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-4 flex justify-end gap-4">
        <Link
          href="/dashboard/categorias"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Categorías
        </Link>
        <Link
          href="/dashboard/etiquetas"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Etiquetas
        </Link>
        <Link
          href="/dashboard/configuracion"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Configuración
        </Link>
        <Link
          href="/dashboard/cambiar-password"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Cambiar contraseña
        </Link>
      </div>
      <PlatoList token={token} categorias={categorias} etiquetas={etiquetas} platosIniciales={platos} />
    </main>
  );
}
