'use client';

import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import type { Etiqueta } from '../types/etiqueta';
import { createEtiqueta, updateEtiqueta } from '../api/etiquetas-api';

interface EtiquetaFormProps {
  token: string;
  etiquetaAEditar: Etiqueta | null;
  onSuccess: (etiqueta: Etiqueta) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-neutral-100';

export function EtiquetaForm({ token, etiquetaAEditar, onSuccess, onCancel }: EtiquetaFormProps) {
  const esEdicion = Boolean(etiquetaAEditar);
  const [nombre, setNombre] = useState(etiquetaAEditar?.nombre ?? '');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      const etiqueta =
        esEdicion && etiquetaAEditar
          ? await updateEtiqueta(etiquetaAEditar.id, { nombre }, token)
          : await createEtiqueta({ nombre }, token);

      onSuccess(etiqueta);
    } catch {
      const mensaje = 'No se pudo guardar la etiqueta. Intentá de nuevo.';
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
          Nombre de la etiqueta
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
          {enviando ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear etiqueta'}
        </button>
      </div>
    </form>
  );
}
