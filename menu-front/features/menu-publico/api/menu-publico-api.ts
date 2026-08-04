import type { MenuPublico, PlatoDetallePublico } from '../types/menu-publico';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function getMenuPublico(slug: string): Promise<MenuPublico | null> {
  const res = await fetch(`${API_URL}/public/restaurantes/${slug}/menu`, {
    // Es una página pública de alto tráfico (cada mesa escaneando el QR):
    // no tiene sentido "no-store" como en el panel admin, alcanza con
    // revalidar cada 60s para que los cambios de precio/disponibilidad
    // se reflejen rápido sin pegarle a la DB en cada request.
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('No se pudo cargar el menú');
  }

  return res.json() as Promise<MenuPublico>;
}

export async function getPlatoPublico(
  slug: string,
  platoId: string,
): Promise<PlatoDetallePublico | null> {
  const res = await fetch(`${API_URL}/public/restaurantes/${slug}/platos/${platoId}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('No se pudo cargar el plato');
  }

  return res.json() as Promise<PlatoDetallePublico>;
}
