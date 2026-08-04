'use client';

import { useState } from 'react';
import type { Etiqueta } from '../types/etiqueta';
import { useEtiquetas } from '../hooks/useEtiquetas';
import { EtiquetaForm } from './EtiquetaForm';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface EtiquetaListProps {
  token: string;
  etiquetasIniciales: Etiqueta[];
}

export function EtiquetaList({ token, etiquetasIniciales }: EtiquetaListProps) {
  const { etiquetas, agregarEtiqueta, actualizarEtiqueta, eliminarEtiqueta, isPending } =
    useEtiquetas(etiquetasIniciales, token);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [etiquetaEnEdicion, setEtiquetaEnEdicion] = useState<Etiqueta | null>(null);
  const [etiquetaAEliminar, setEtiquetaAEliminar] = useState<Etiqueta | null>(null);

  function abrirCreacion() {
    setEtiquetaEnEdicion(null);
    setFormularioAbierto(true);
  }

  function abrirEdicion(etiqueta: Etiqueta) {
    setEtiquetaEnEdicion(etiqueta);
    setFormularioAbierto(true);
  }

  function cerrarFormulario() {
    setFormularioAbierto(false);
    setEtiquetaEnEdicion(null);
  }

  function handleGuardado(etiqueta: Etiqueta) {
    if (etiquetaEnEdicion) {
      actualizarEtiqueta(etiqueta);
    } else {
      agregarEtiqueta(etiqueta);
    }
    cerrarFormulario();
  }

  function confirmarEliminar() {
    if (!etiquetaAEliminar) return;
    eliminarEtiqueta(etiquetaAEliminar);
    setEtiquetaAEliminar(null);
  }

  // Modo edición: la lista se saca de en medio, igual que en Platos.
  if (formularioAbierto && etiquetaEnEdicion) {
    return (
      <div className="space-y-6">
        <button
          onClick={cerrarFormulario}
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Volver a la lista
        </button>
        <EtiquetaForm
          token={token}
          etiquetaAEditar={etiquetaEnEdicion}
          onSuccess={handleGuardado}
          onCancel={cerrarFormulario}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Etiquetas</h1>
        <button
          onClick={abrirCreacion}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          + Nueva etiqueta
        </button>
      </div>

      {formularioAbierto && (
        <EtiquetaForm
          token={token}
          etiquetaAEditar={null}
          onSuccess={handleGuardado}
          onCancel={cerrarFormulario}
        />
      )}

      <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {etiquetas.map((etiqueta) => (
            <li
              key={etiqueta.id}
              className="flex items-center justify-between px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200"
            >
              <span className="font-medium">{etiqueta.nombre}</span>
              <div>
                <button
                  onClick={() => abrirEdicion(etiqueta)}
                  className="mr-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  Editar
                </button>
                <button
                  onClick={() => setEtiquetaAEliminar(etiqueta)}
                  disabled={isPending}
                  className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 dark:text-red-400"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}

          {etiquetas.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
              Todavía no creaste ninguna etiqueta.
            </li>
          )}
        </ul>
      </div>

      {etiquetaAEliminar && (
        <ConfirmDialog
          titulo="Eliminar etiqueta"
          descripcion={`¿Seguro que querés eliminar "${etiquetaAEliminar.nombre}"? Esta acción no se puede deshacer.`}
          onConfirmar={confirmarEliminar}
          onCancelar={() => setEtiquetaAEliminar(null)}
        />
      )}
    </div>
  );
}
