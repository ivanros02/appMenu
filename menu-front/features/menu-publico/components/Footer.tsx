import { Music2, Phone } from 'lucide-react';
import type { MenuPublico } from '../types/menu-publico';

interface FooterProps {
  restaurante: MenuPublico;
}

// lucide-react sacó los íconos de marcas (Instagram, etc.) de sus versiones
// recientes por temas de trademark, así que este va como SVG inline.
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer({ restaurante }: FooterProps) {
  const tieneRedes = restaurante.instagramUrl || restaurante.tiktokUrl;

  return (
    <footer className="space-y-5 rounded-t-3xl border-t border-rose-100 bg-white px-5 py-8 dark:border-slate-800 dark:bg-slate-950">
      {tieneRedes && (
        <div className="flex items-center justify-center gap-3">
          {restaurante.instagramUrl && (
            <a
              href={restaurante.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors duration-200 hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              <InstagramIcon />
            </a>
          )}
          {restaurante.tiktokUrl && (
            <a
              href={restaurante.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors duration-200 hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              <Music2 className="h-5 w-5" />
            </a>
          )}
        </div>
      )}

      {restaurante.telefono && (
        <a
          href={`tel:${restaurante.telefono}`}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-800 px-4 py-3.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          <Phone className="h-4 w-4" />
          Llamar / Reservar
        </a>
      )}

      <p className="text-center text-xs text-slate-400 dark:text-slate-600">
        Menú potenciado por MiSaaS
      </p>
    </footer>
  );
}
