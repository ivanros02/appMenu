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
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Platos</h1>
      <PlatoList token={token} categorias={categorias} etiquetas={etiquetas} platosIniciales={platos} />
    </div>
  );
}
