'use client';

import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import type { Categoria } from '../types/categoria';
import { createCategoria, updateCategoria } from '../api/categorias-api';

interface CategoriaFormProps {
  token: string;
  categoriaAEditar: Categoria | null;
  onSuccess: (categoria: Categoria) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-neutral-100';

export function CategoriaForm({ token, categoriaAEditar, onSuccess, onCancel }: CategoriaFormProps) {
  const esEdicion = Boolean(categoriaAEditar);
  const [nombre, setNombre] = useState(categoriaAEditar?.nombre ?? '');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      const categoria =
        esEdicion && categoriaAEditar
          ? await updateCategoria(categoriaAEditar.id, { nombre }, token)
          : await createCategoria({ nombre }, token);

      onSuccess(categoria);
    } catch {
      const mensaje = 'No se pudo guardar la categoría. Intentá de nuevo.';
      setError(mensaje);
      toast.error(mensaje);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Nombre de la categoría
        </label>
        <input
          required
          minLength={2}
          maxLength={60}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={inputClass}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          {enviando ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear categoría'}
        </button>
      </div>
    </form>
  );
}
