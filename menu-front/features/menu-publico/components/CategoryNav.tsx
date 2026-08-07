'use client';

import { useState } from 'react';

interface CategoryNavProps {
  categorias: { id: string; nombre: string }[];
}

export function CategoryNav({ categorias }: CategoryNavProps) {
  const [activa, setActiva] = useState(categorias[0]?.id ?? null);

  function irACategoria(id: string) {
    setActiva(id);
    document.getElementById(`categoria-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <nav className="sticky top-0 z-10 w-full min-w-0 overflow-x-auto border-b border-white/20 bg-white/10 backdrop-blur-md">
      <div className="flex gap-2.5 px-5 py-3.5">
        {categorias.map((categoria) => {
          const esActiva = categoria.id === activa;
          return (
            <button
              key={categoria.id}
              type="button"
              onClick={() => irACategoria(categoria.id)}
              className={`shrink-0 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                esActiva
                  ? 'border-transparent bg-brand-dark text-brand-bg'
                  : 'border-slate-900/15 bg-transparent text-brand-text hover:border-slate-900/30 hover:bg-slate-900/5'
              }`}
            >
              {categoria.nombre}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
