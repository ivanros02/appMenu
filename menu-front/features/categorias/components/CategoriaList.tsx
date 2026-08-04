'use client';

import { useState } from 'react';
import type { Categoria } from '../types/categoria';
import { useCategorias } from '../hooks/useCategorias';
import { CategoriaForm } from './CategoriaForm';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface CategoriaListProps {
  token: string;
  categoriasIniciales: Categoria[];
}

export function CategoriaList({ token, categoriasIniciales }: CategoriaListProps) {
  const { categorias, agregarCategoria, actualizarCategoria, eliminarCategoria, isPending } =
    useCategorias(categoriasIniciales, token);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [categoriaEnEdicion, setCategoriaEnEdicion] = useState<Categoria | null>(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState<Categoria | null>(null);

  function abrirCreacion() {
    setCategoriaEnEdicion(null);
    setFormularioAbierto(true);
  }

  function abrirEdicion(categoria: Categoria) {
    setCategoriaEnEdicion(categoria);
    setFormularioAbierto(true);
  }

  function cerrarFormulario() {
    setFormularioAbierto(false);
    setCategoriaEnEdicion(null);
  }

  function handleGuardado(categoria: Categoria) {
    if (categoriaEnEdicion) {
      actualizarCategoria(categoria);
    } else {
      agregarCategoria(categoria);
    }
    cerrarFormulario();
  }

  function confirmarEliminar() {
    if (!categoriaAEliminar) return;
    eliminarCategoria(categoriaAEliminar);
    setCategoriaAEliminar(null);
  }

  // Modo edición: la lista se saca de en medio, igual que en Platos.
  if (formularioAbierto && categoriaEnEdicion) {
    return (
      <div className="space-y-6">
        <button
          onClick={cerrarFormulario}
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Volver a la lista
        </button>
        <CategoriaForm
          token={token}
          categoriaAEditar={categoriaEnEdicion}
          onSuccess={handleGuardado}
          onCancel={cerrarFormulario}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Categorías</h1>
        <button
          onClick={abrirCreacion}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          + Nueva categoría
        </button>
      </div>

      {formularioAbierto && (
        <CategoriaForm
          token={token}
          categoriaAEditar={null}
          onSuccess={handleGuardado}
          onCancel={cerrarFormulario}
        />
      )}

      <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {categorias.map((categoria) => (
            <li
              key={categoria.id}
              className="flex items-center justify-between px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200"
            >
              <span className="font-medium">{categoria.nombre}</span>
              <div>
                <button
                  onClick={() => abrirEdicion(categoria)}
                  className="mr-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  Editar
                </button>
                <button
                  onClick={() => setCategoriaAEliminar(categoria)}
                  disabled={isPending}
                  className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 dark:text-red-400"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}

          {categorias.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
              Todavía no creaste ninguna categoría.
            </li>
          )}
        </ul>
      </div>

      {categoriaAEliminar && (
        <ConfirmDialog
          titulo="Eliminar categoría"
          descripcion={`¿Seguro que querés eliminar "${categoriaAEliminar.nombre}"? Esta acción no se puede deshacer.`}
          onConfirmar={confirmarEliminar}
          onCancelar={() => setCategoriaAEliminar(null)}
        />
      )}
    </div>
  );
}
