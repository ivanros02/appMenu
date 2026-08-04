import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getPlatoPublico } from '@/features/menu-publico/api/menu-publico-api';

const formatoPrecio = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

interface PageProps {
  params: Promise<{ restaurante: string; id: string }>;
}

export default async function PlatoDetallePage({ params }: PageProps) {
  const { restaurante: slug, id } = await params;
  const plato = await getPlatoPublico(slug, id);

  if (!plato) {
    notFound();
  }

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-lg overflow-x-hidden bg-white dark:bg-slate-950">
      <div className="relative h-[50vh] min-h-80 w-full">
        {plato.imagenUrl ? (
          <Image
            src={plato.imagenUrl}
            alt={plato.nombre}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-rose-200 via-indigo-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        <Link
          href={`/${slug}`}
          aria-label="Volver al menú"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/40"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>

        <div className="absolute inset-x-0 bottom-8 z-10 px-5">
          <p className="text-sm font-medium text-white/80">{plato.categoria.nombre}</p>
          <h1 className="mt-1 text-2xl font-semibold text-white">{plato.nombre}</h1>
        </div>
      </div>

      <main className="relative z-10 -mt-8 space-y-6 rounded-t-[40px] bg-white pb-28 pt-6 dark:bg-slate-950">
        <div className="mx-5 flex items-stretch divide-x divide-slate-200 overflow-hidden rounded-2xl bg-slate-50 dark:divide-slate-800 dark:bg-slate-900">
          <span className="flex-1 px-3 py-3 text-center text-sm font-bold text-slate-800 dark:text-slate-100">
            {formatoPrecio.format(Number(plato.precio))}
          </span>
          {plato.etiquetas.map((etiqueta) => (
            <span
              key={etiqueta.id}
              className="flex-1 px-3 py-3 text-center text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {etiqueta.nombre}
            </span>
          ))}
        </div>

        {plato.descripcion && (
          <div className="space-y-2 px-5">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Acerca de</h2>
            <p className="leading-relaxed text-slate-500 dark:text-slate-400">
              {plato.descripcion}
            </p>
          </div>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-lg px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Link
          href={`/${slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-4 text-white shadow-lg shadow-indigo-600/30 transition-colors duration-200 hover:bg-indigo-500"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="font-semibold">Volver al menú</span>
        </Link>
      </div>
    </div>
  );
}
