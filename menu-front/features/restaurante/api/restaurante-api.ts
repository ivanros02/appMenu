import type { RestaurantePerfil, UpdateRestauranteInput } from '../types/restaurante';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body: { message?: string } | null = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.message ?? 'Error al comunicarse con el servidor');
  }

  return res.json() as Promise<T>;
}

export function getMiRestaurante(token: string): Promise<RestaurantePerfil> {
  return request<RestaurantePerfil>('/restaurantes/mi-restaurante', token);
}

export function updateMiRestaurante(
  data: UpdateRestauranteInput,
  token: string,
): Promise<RestaurantePerfil> {
  return request<RestaurantePerfil>('/restaurantes/mi-restaurante', token, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
