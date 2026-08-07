import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Heart } from 'lucide-react';
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

  const temaVars = {
    '--brand-bg': plato.restaurante.colorFondo ?? '#d4dc94',
    '--brand-text': plato.restaurante.colorTexto ?? '#111111',
  } as React.CSSProperties;

  return (
    <div style={temaVars} className="min-h-screen w-full bg-brand-bg px-3 py-4 sm:px-6 sm:py-8">
      <div className="relative mx-auto flex w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/20 shadow-2xl shadow-black/10 backdrop-blur-xl">
        <div className="relative h-[42vh] min-h-72 w-full">
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
            <div className="h-full w-full bg-linear-to-br from-amber-100 via-lime-100 to-lime-200" />
          )}

          <span
            aria-hidden
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/30 text-white backdrop-blur-md"
          >
            <Heart className="h-4 w-4" />
          </span>
        </div>

        <main className="relative z-10 -mt-8 mx-4 space-y-6 rounded-3xl border border-white/40 bg-white/40 p-6 pb-8 shadow-xl shadow-black/5 backdrop-blur-md">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text/70">
              {plato.categoria.nombre}
            </p>
            <h1 className="text-2xl font-bold text-brand-text">{plato.nombre}</h1>
          </div>

          <div className="flex items-stretch divide-x divide-white/40 overflow-hidden rounded-2xl border border-white/40 bg-white/50">
            <span className="flex-1 px-3 py-3 text-center text-sm font-bold text-brand-text">
              {formatoPrecio.format(Number(plato.precio))}
            </span>
            {plato.etiquetas.map((etiqueta) => (
              <span
                key={etiqueta.id}
                className="flex-1 px-3 py-3 text-center text-sm font-medium text-brand-text/60"
              >
                {etiqueta.nombre}
              </span>
            ))}
          </div>

          {plato.descripcion && (
            <div className="space-y-2">
              <h2 className="text-base font-bold text-brand-text">Acerca de</h2>
              <p className="leading-relaxed text-sm text-brand-text/60">
                {plato.descripcion}
              </p>
            </div>
          )}
        </main>

        <div className="h-28" />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-lg px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Link
          href={`/${slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-4 text-white shadow-xl shadow-black/20 transition-opacity duration-200 hover:opacity-90"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="font-semibold">Volver al menú</span>
        </Link>
      </div>
    </div>
  );
}
