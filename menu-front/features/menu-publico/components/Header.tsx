import Image from 'next/image';
import { Globe } from 'lucide-react';
import type { MenuPublico } from '../types/menu-publico';

interface HeaderProps {
  restaurante: MenuPublico;
}

export function Header({ restaurante }: HeaderProps) {
  return (
    <header className="flex items-center justify-center border-b border-white/20 bg-white/20 px-5 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        {restaurante.logoUrl ? (
          <Image
            src={restaurante.logoUrl}
            alt={restaurante.nombre}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white/30"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark text-sm font-semibold text-white ring-2 ring-white/30">
            {restaurante.nombre.charAt(0)}
          </div>
        )}
        <span className="text-base font-semibold tracking-tight text-brand-text">
          {restaurante.nombre}
        </span>
      </div>

      {/* Maqueta: el selector de idioma todavía no está implementado 
      <button
        type="button"
        aria-label="Cambiar idioma"
        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-dark text-white shadow-lg shadow-black/20 transition-opacity duration-200 hover:opacity-90"
      >
        <Globe className="h-5 w-5" />
      </button>
      */}
      
    </header>
  );
}
