'use client';

import { useCallback, useState, useTransition } from 'react';
import { toast } from 'sonner';
import type { Categoria } from '../types/categoria';
import { ApiError, deleteCategoria } from '../api/categorias-api';

export function useCategorias(categoriasIniciales: Categoria[], token: string) {
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasIniciales);
  const [isPending, startTransition] = useTransition();

  const agregarCategoria = useCallback((categoria: Categoria) => {
    setCategorias((prev) =>
      [...prev, categoria].sort((a, b) => a.nombre.localeCompare(b.nombre)),
    );
    toast.success(`"${categoria.nombre}" se creó correctamente`);
  }, []);

  const actualizarCategoria = useCallback((categoria: Categoria) => {
    setCategorias((prev) => prev.map((c) => (c.id === categoria.id ? categoria : c)));
    toast.success(`"${categoria.nombre}" se actualizó correctamente`);
  }, []);

  const eliminarCategoria = useCallback(
    (categoria: Categoria) => {
      startTransition(async () => {
        try {
          await deleteCategoria(categoria.id, token);
          setCategorias((prev) => prev.filter((c) => c.id !== categoria.id));
          toast.success(`"${categoria.nombre}" se eliminó correctamente`);
        } catch (err) {
          toast.error(
            err instanceof ApiError ? err.message : `No se pudo eliminar "${categoria.nombre}".`,
          );
        }
      });
    },
    [token],
  );

  return { categorias, agregarCategoria, actualizarCategoria, eliminarCategoria, isPending };
}
