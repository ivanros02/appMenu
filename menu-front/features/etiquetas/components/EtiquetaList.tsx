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
          className="text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-indigo-600"
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
        <h1 className="text-2xl font-semibold text-gray-900">Etiquetas</h1>
        <button
          onClick={abrirCreacion}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500"
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

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <ul className="divide-y divide-gray-200">
          {etiquetas.map((etiqueta) => (
            <li
              key={etiqueta.id}
              className="flex items-center justify-between px-4 py-3 text-sm text-gray-900 transition-colors duration-150 hover:bg-gray-50"
            >
              <span className="font-medium">{etiqueta.nombre}</span>
              <div>
                <button
                  onClick={() => abrirEdicion(etiqueta)}
                  className="mr-3 text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-indigo-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => setEtiquetaAEliminar(etiqueta)}
                  disabled={isPending}
                  className="text-sm font-medium text-red-600 transition-colors duration-150 hover:text-red-700 disabled:opacity-50"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}

          {etiquetas.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-gray-900">
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
