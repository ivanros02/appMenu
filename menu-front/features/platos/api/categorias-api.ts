import type { Categoria } from '../types/plato';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function getCategorias(token: string): Promise<Categoria[]> {
  const res = await fetch(`${API_URL}/categorias`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('No se pudieron cargar las categorías');
  }

  return res.json() as Promise<Categoria[]>;
}
