import Image from 'next/image';
import { Globe } from 'lucide-react';
import type { MenuPublico } from '../types/menu-publico';

interface HeaderProps {
  restaurante: MenuPublico;
}

export function Header({ restaurante }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-rose-100 bg-white/90 px-5 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex items-center gap-3">
        {restaurante.logoUrl ? (
          <Image
            src={restaurante.logoUrl}
            alt={restaurante.nombre}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-rose-100 dark:ring-slate-800"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white ring-2 ring-rose-100 dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-800">
            {restaurante.nombre.charAt(0)}
          </div>
        )}
        <span className="text-base font-semibold tracking-tight text-slate-800 dark:text-slate-100">
          {restaurante.nombre}
        </span>
      </div>

      {/* Maqueta: el selector de idioma todavía no está implementado */}
      <button
        type="button"
        aria-label="Cambiar idioma"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors duration-200 hover:bg-rose-50 hover:text-rose-500 dark:bg-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
      >
        <Globe className="h-5 w-5" />
      </button>
    </header>
  );
}
