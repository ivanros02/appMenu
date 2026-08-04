'use client';

interface CategoryNavProps {
  categorias: { id: string; nombre: string }[];
}

export function CategoryNav({ categorias }: CategoryNavProps) {
  function irACategoria(id: string) {
    document.getElementById(`categoria-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <nav className="sticky top-0 z-10 w-full min-w-0 overflow-x-auto border-b border-rose-100 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex gap-2.5 px-5 py-3.5">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => irACategoria(categoria.id)}
            className="shrink-0 rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
          >
            {categoria.nombre}
          </button>
        ))}
      </div>
    </nav>
  );
}
