'use client';

import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import type { Categoria, CreatePlatoInput, Etiqueta, Plato } from '../types/plato';
import { createPlato, updatePlato } from '../api/platos-api';

interface PlatoFormProps {
  token: string;
  categorias: Categoria[];
  etiquetas: Etiqueta[];
  platoAEditar: Plato | null;
  onSuccess: (plato: Plato) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors duration-150 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500';
const labelClass = 'mb-1 block text-sm font-medium text-gray-900';

export function PlatoForm({
  token,
  categorias,
  etiquetas,
  platoAEditar,
  onSuccess,
  onCancel,
}: PlatoFormProps) {
  const esEdicion = Boolean(platoAEditar);

  const [form, setForm] = useState<CreatePlatoInput>({
    nombre: platoAEditar?.nombre ?? '',
    descripcion: platoAEditar?.descripcion ?? '',
    precio: platoAEditar ? Number(platoAEditar.precio) : 0,
    categoriaId: platoAEditar?.categoriaId ?? categorias[0]?.id ?? '',
    imagenUrl: platoAEditar?.imagenUrl ?? '',
    disponible: platoAEditar?.disponible ?? true,
    etiquetas: platoAEditar?.etiquetas.map((e) => e.id) ?? [],
  });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleEtiqueta(etiquetaId: string) {
    setForm((prev) => ({
      ...prev,
      etiquetas: prev.etiquetas?.includes(etiquetaId)
        ? prev.etiquetas.filter((id) => id !== etiquetaId)
        : [...(prev.etiquetas ?? []), etiquetaId],
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setEnviando(true);
    setError(null);

    const payload: CreatePlatoInput = {
      ...form,
      descripcion: form.descripcion?.trim() || undefined,
      imagenUrl: form.imagenUrl?.trim() || undefined,
    };

    try {
      const plato =
        esEdicion && platoAEditar
          ? await updatePlato(platoAEditar.id, payload, token)
          : await createPlato(payload, token);

      onSuccess(plato);
    } catch {
      const mensaje = 'No se pudo guardar el plato. Revisá los datos e intentá de nuevo.';
      setError(mensaje);
      toast.error(mensaje);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900">{esEdicion ? 'Editar plato' : 'Nuevo plato'}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>Nombre</label>
          <input
            required
            minLength={2}
            maxLength={120}
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Descripción</label>
          <textarea
            maxLength={500}
            rows={3}
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Precio</label>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Categoría</label>
          <select
            required
            value={form.categoriaId}
            onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}
            className={inputClass}
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>URL de imagen</label>
          <input
            type="url"
            value={form.imagenUrl}
            onChange={(e) => setForm({ ...form, imagenUrl: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Etiquetas</label>
          <div className="flex flex-wrap gap-3">
            {etiquetas.map((etiqueta) => (
              <label key={etiqueta.id} className="flex items-center gap-2 text-sm text-gray-900">
                <input
                  type="checkbox"
                  checked={form.etiquetas?.includes(etiqueta.id) ?? false}
                  onChange={() => toggleEtiqueta(etiqueta.id)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                {etiqueta.nombre}
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-900">
          <input
            type="checkbox"
            checked={form.disponible}
            onChange={(e) => setForm({ ...form, disponible: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          Disponible en el menú
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3 pt-2">
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
          {enviando ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear plato'}
        </button>
      </div>
    </form>
  );
}
