import Image from 'next/image';
import Link from 'next/link';
import type { PlatoPublico } from '../types/menu-publico';
import { getEtiquetaColor } from '../lib/etiqueta-color';

const formatoPrecio = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

interface MenuCardProps {
  plato: PlatoPublico;
  slug: string;
}

export function MenuCard({ plato, slug }: MenuCardProps) {
  return (
    <Link
      href={`/${slug}/platos/${plato.id}`}
      className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex gap-4">
        {plato.imagenUrl && (
          <Image
            src={plato.imagenUrl}
            alt={plato.nombre}
            width={88}
            height={88}
            className="h-22 w-22 shrink-0 rounded-xl object-cover ring-1 ring-slate-100 dark:ring-slate-800"
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="min-w-0 font-semibold text-slate-800 dark:text-slate-100">{plato.nombre}</h3>
            <span className="shrink-0 font-bold text-indigo-600 dark:text-indigo-400">
              {formatoPrecio.format(Number(plato.precio))}
            </span>
          </div>
          {plato.descripcion && (
            <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
              {plato.descripcion}
            </p>
          )}
        </div>
      </div>

      {plato.etiquetas.length > 0 && (
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          {plato.etiquetas.map((etiqueta) => (
            <span
              key={etiqueta.id}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getEtiquetaColor(etiqueta.id)}`}
            >
              {etiqueta.nombre}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
