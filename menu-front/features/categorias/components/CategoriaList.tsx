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
          className="text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-indigo-600"
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
        <h1 className="text-2xl font-semibold text-gray-900">Categorías</h1>
        <button
          onClick={abrirCreacion}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500"
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

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <ul className="divide-y divide-gray-200">
          {categorias.map((categoria) => (
            <li
              key={categoria.id}
              className="flex items-center justify-between px-4 py-3 text-sm text-gray-900 transition-colors duration-150 hover:bg-gray-50"
            >
              <span className="font-medium">{categoria.nombre}</span>
              <div>
                <button
                  onClick={() => abrirEdicion(categoria)}
                  className="mr-3 text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-indigo-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => setCategoriaAEliminar(categoria)}
                  disabled={isPending}
                  className="text-sm font-medium text-red-600 transition-colors duration-150 hover:text-red-700 disabled:opacity-50"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}

          {categorias.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-gray-900">
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
