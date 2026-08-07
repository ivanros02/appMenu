'use client';

import { useState } from 'react';
import type { Categoria, Etiqueta, Plato } from '../types/plato';
import { usePlatos } from '../hooks/usePlatos';
import { PlatoForm } from './PlatoForm';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface PlatoListProps {
  token: string;
  categorias: Categoria[];
  etiquetas: Etiqueta[];
  platosIniciales: Plato[];
}

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
});

export function PlatoList({ token, categorias, etiquetas, platosIniciales }: PlatoListProps) {
  const { platos, agregarPlato, actualizarPlato, eliminarPlato, isPending } = usePlatos(
    platosIniciales,
    token,
  );
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [platoEnEdicion, setPlatoEnEdicion] = useState<Plato | null>(null);
  const [platoAEliminar, setPlatoAEliminar] = useState<Plato | null>(null);

  function abrirCreacion() {
    setPlatoEnEdicion(null);
    setFormularioAbierto(true);
  }

  function abrirEdicion(plato: Plato) {
    setPlatoEnEdicion(plato);
    setFormularioAbierto(true);
  }

  function cerrarFormulario() {
    setFormularioAbierto(false);
    setPlatoEnEdicion(null);
  }

  function handleGuardado(plato: Plato) {
    if (platoEnEdicion) {
      actualizarPlato(plato);
    } else {
      agregarPlato(plato);
    }
    cerrarFormulario();
  }

  function confirmarEliminar() {
    if (!platoAEliminar) return;
    eliminarPlato(platoAEliminar);
    setPlatoAEliminar(null);
  }

  // Modo edición: se saca la lista de en medio para que el usuario se
  // enfoque solo en el plato que está tocando, sin ruido alrededor.
  if (formularioAbierto && platoEnEdicion) {
    return (
      <div className="space-y-6">
        <button
          onClick={cerrarFormulario}
          className="text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-indigo-600"
        >
          ← Volver a la lista
        </button>
        <PlatoForm
          token={token}
          categorias={categorias}
          etiquetas={etiquetas}
          platoAEditar={platoEnEdicion}
          onSuccess={handleGuardado}
          onCancel={cerrarFormulario}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Platos</h1>
        <button
          onClick={abrirCreacion}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500"
        >
          + Nuevo plato
        </button>
      </div>

      {formularioAbierto && (
        <PlatoForm
          token={token}
          categorias={categorias}
          etiquetas={etiquetas}
          platoAEditar={null}
          onSuccess={handleGuardado}
          onCancel={cerrarFormulario}
        />
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-900">
            <tr>
              <th className="px-4 py-3 font-medium">Plato</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {platos.map((plato) => {
              const categoria = categorias.find((c) => c.id === plato.categoriaId);
              return (
                <tr key={plato.id} className="text-gray-900 transition-colors duration-150 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {plato.imagenUrl ? (
                        // Las imágenes vienen de URLs arbitrarias cargadas por cada restaurante,
                        // por eso se evita next/image (requeriría whitelistear cada dominio).
                        <img
                          src={plato.imagenUrl}
                          alt={plato.nombre}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-100" />
                      )}
                      <span className="font-medium">{plato.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{categoria?.nombre ?? '—'}</td>
                  <td className="px-4 py-3">{formatoPrecio.format(Number(plato.precio))}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        plato.disponible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {plato.disponible ? 'Disponible' : 'Pausado'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => abrirEdicion(plato)}
                      className="mr-3 text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-indigo-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setPlatoAEliminar(plato)}
                      disabled={isPending}
                      className="text-sm font-medium text-red-600 transition-colors duration-150 hover:text-red-700 disabled:opacity-50"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}

            {platos.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-900">
                  Todavía no cargaste ningún plato.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {platoAEliminar && (
        <ConfirmDialog
          titulo="Eliminar plato"
          descripcion={`¿Seguro que querés eliminar "${platoAEliminar.nombre}"? Esta acción no se puede deshacer.`}
          onConfirmar={confirmarEliminar}
          onCancelar={() => setPlatoAEliminar(null)}
        />
      )}
    </div>
  );
}
