import { requireAuthToken } from '@/lib/auth';
import { EtiquetaList } from '@/features/etiquetas/components/EtiquetaList';
import { getEtiquetas } from '@/features/etiquetas/api/etiquetas-api';

export default async function EtiquetasPage() {
  const token = await requireAuthToken();
  const etiquetas = await getEtiquetas(token);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Etiquetas</h1>
      <EtiquetaList token={token} etiquetasIniciales={etiquetas} />
    </div>
  );
}
