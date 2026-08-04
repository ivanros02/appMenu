'use client';

import { useCallback, useState, useTransition } from 'react';
import { toast } from 'sonner';
import type { Plato } from '../types/plato';
import { deletePlato } from '../api/platos-api';

export function usePlatos(platosIniciales: Plato[], token: string) {
  const [platos, setPlatos] = useState<Plato[]>(platosIniciales);
  const [isPending, startTransition] = useTransition();

  const agregarPlato = useCallback((plato: Plato) => {
    setPlatos((prev) => [plato, ...prev]);
    toast.success(`"${plato.nombre}" se creó correctamente`);
  }, []);

  const actualizarPlato = useCallback((plato: Plato) => {
    setPlatos((prev) => prev.map((p) => (p.id === plato.id ? plato : p)));
    toast.success(`"${plato.nombre}" se actualizó correctamente`);
  }, []);

  const eliminarPlato = useCallback(
    (plato: Plato) => {
      startTransition(async () => {
        try {
          await deletePlato(plato.id, token);
          setPlatos((prev) => prev.filter((p) => p.id !== plato.id));
          toast.success(`"${plato.nombre}" se eliminó correctamente`);
        } catch {
          toast.error(`No se pudo eliminar "${plato.nombre}". Intentá de nuevo.`);
        }
      });
    },
    [token],
  );

  return { platos, agregarPlato, actualizarPlato, eliminarPlato, isPending };
}
