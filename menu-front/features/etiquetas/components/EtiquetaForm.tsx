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
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors duration-150 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500';

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
      className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-gray-900">Nombre de la etiqueta</label>
        <input
          required
          minLength={2}
          maxLength={60}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={inputClass}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-900 transition-colors duration-150 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500 disabled:opacity-50"
        >
          {enviando ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear etiqueta'}
        </button>
      </div>
    </form>
  );
}
