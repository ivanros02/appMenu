import { requireAuthToken } from '@/lib/auth';
import { CategoriaList } from '@/features/categorias/components/CategoriaList';
import { getCategorias } from '@/features/categorias/api/categorias-api';

export default async function CategoriasPage() {
  const token = await requireAuthToken();
  const categorias = await getCategorias(token);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Categorías</h1>
      <CategoriaList token={token} categoriasIniciales={categorias} />
    </div>
  );
}
