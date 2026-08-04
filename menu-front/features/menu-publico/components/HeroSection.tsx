import { MapPin, Wifi } from 'lucide-react';
import type { MenuPublico } from '../types/menu-publico';

interface HeroSectionProps {
  restaurante: MenuPublico;
}

export function HeroSection({ restaurante }: HeroSectionProps) {
  return (
    <section className="space-y-3 px-5 py-5">
      {restaurante.horarioTexto && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {restaurante.horarioTexto}
        </span>
      )}

      <div className="flex flex-wrap gap-2">
        {restaurante.googleMapsUrl && restaurante.direccion && (
          <a
            href={restaurante.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm transition-colors duration-200 hover:border-indigo-100 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-900 dark:hover:text-indigo-400"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            {restaurante.direccion}
          </a>
        )}

        {restaurante.wifiNombre && (
          <span className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <Wifi className="h-4 w-4 shrink-0" />
            {restaurante.wifiNombre}
            {restaurante.wifiPassword && ` · ${restaurante.wifiPassword}`}
          </span>
        )}
      </div>
    </section>
  );
}
