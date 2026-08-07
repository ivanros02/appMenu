import { requireAuthToken } from '@/lib/auth';
import { getPlatos } from '@/features/platos/api/platos-api';
import { getCategorias } from '@/features/categorias/api/categorias-api';
import { getEtiquetas } from '@/features/etiquetas/api/etiquetas-api';
import { UtensilsCrossed, LayoutGrid, Tag } from 'lucide-react';

export default async function DashboardPage() {
  const token = await requireAuthToken();

  const [platos, categorias, etiquetas] = await Promise.all([
    getPlatos(token),
    getCategorias(token),
    getEtiquetas(token),
  ]);

  const kpis = [
    { label: 'Total de platos', value: platos.length, icon: UtensilsCrossed },
    { label: 'Categorías', value: categorias.length, icon: LayoutGrid },
    { label: 'Etiquetas', value: etiquetas.length, icon: Tag },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Resumen</h1>
        <p className="mt-1 text-sm text-gray-900">Estado actual de tu menú.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">{kpi.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900">Últimos platos agregados</h2>
          <div className="mt-6 flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-900">
            Próximamente
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900">Actividad</h2>
          <div className="mt-6 flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-900">
            Próximamente
          </div>
        </div>
      </div>
    </div>
  );
}
