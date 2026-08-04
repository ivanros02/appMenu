import type { Etiqueta } from '../types/plato';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function getEtiquetas(token: string): Promise<Etiqueta[]> {
  const res = await fetch(`${API_URL}/etiquetas`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('No se pudieron cargar las etiquetas');
  }

  return res.json() as Promise<Etiqueta[]>;
}
