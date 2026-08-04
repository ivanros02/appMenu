'use client';

import { useCallback, useState, useTransition } from 'react';
import { toast } from 'sonner';
import type { Etiqueta } from '../types/etiqueta';
import { ApiError, deleteEtiqueta } from '../api/etiquetas-api';

export function useEtiquetas(etiquetasIniciales: Etiqueta[], token: string) {
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>(etiquetasIniciales);
  const [isPending, startTransition] = useTransition();

  const agregarEtiqueta = useCallback((etiqueta: Etiqueta) => {
    setEtiquetas((prev) =>
      [...prev, etiqueta].sort((a, b) => a.nombre.localeCompare(b.nombre)),
    );
    toast.success(`"${etiqueta.nombre}" se creó correctamente`);
  }, []);

  const actualizarEtiqueta = useCallback((etiqueta: Etiqueta) => {
    setEtiquetas((prev) => prev.map((e) => (e.id === etiqueta.id ? etiqueta : e)));
    toast.success(`"${etiqueta.nombre}" se actualizó correctamente`);
  }, []);

  const eliminarEtiqueta = useCallback(
    (etiqueta: Etiqueta) => {
      startTransition(async () => {
        try {
          await deleteEtiqueta(etiqueta.id, token);
          setEtiquetas((prev) => prev.filter((e) => e.id !== etiqueta.id));
          toast.success(`"${etiqueta.nombre}" se eliminó correctamente`);
        } catch (err) {
          toast.error(
            err instanceof ApiError ? err.message : `No se pudo eliminar "${etiqueta.nombre}".`,
          );
        }
      });
    },
    [token],
  );

  return { etiquetas, agregarEtiqueta, actualizarEtiqueta, eliminarEtiqueta, isPending };
}
