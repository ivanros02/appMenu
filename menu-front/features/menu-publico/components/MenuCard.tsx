import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
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
      className="group relative flex h-full flex-col items-center rounded-3xl border border-white/40 bg-white/40 pb-4 pt-14 text-center shadow-xl shadow-black/5 backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30"
    >
      {plato.imagenUrl ? (
        <Image
          src={plato.imagenUrl}
          alt={plato.nombre}
          width={96}
          height={96}
          className="absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full object-cover ring-4 ring-white/80 drop-shadow-[0_12px_16px_rgba(0,0,0,0.18)] dark:ring-white/10"
        />
      ) : (
        <div className="absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-linear-to-br from-amber-100 to-lime-200 ring-4 ring-white/80 drop-shadow-[0_12px_16px_rgba(0,0,0,0.18)] dark:from-slate-700 dark:to-slate-800 dark:ring-white/10" />
      )}

      <div className="min-w-0 px-4">
        <h3 className="truncate text-base font-bold text-brand-text">{plato.nombre}</h3>
        <p className="mt-0.5 text-sm font-semibold text-brand-text">
          {formatoPrecio.format(Number(plato.precio))}
        </p>
        {plato.descripcion && (
          <p className="mt-1.5 line-clamp-2 break-all text-xs text-slate-500 dark:text-slate-400">
            {plato.descripcion}
          </p>
        )}
      </div>

      {plato.etiquetas.length > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 px-4">
          {plato.etiquetas.map((etiqueta) => (
            <span
              key={etiqueta.id}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getEtiquetaColor(etiqueta.id)}`}
            >
              {etiqueta.nombre}
            </span>
          ))}
        </div>
      )}

      <span className="absolute -bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/70 text-brand-dark shadow-md backdrop-blur-sm transition-colors duration-200 group-hover:bg-white">
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      </span>
    </Link>
  );
}
