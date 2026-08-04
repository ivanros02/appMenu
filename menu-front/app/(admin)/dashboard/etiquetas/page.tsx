import Link from 'next/link';
import { requireAuthToken } from '@/lib/auth';
import { EtiquetaList } from '@/features/etiquetas/components/EtiquetaList';
import { getEtiquetas } from '@/features/etiquetas/api/etiquetas-api';

export default async function EtiquetasPage() {
  const token = await requireAuthToken();
  const etiquetas = await getEtiquetas(token);

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
          href="/dashboard/cambiar-password"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Cambiar contraseña
        </Link>
      </div>
      <EtiquetaList token={token} etiquetasIniciales={etiquetas} />
    </main>
  );
}
