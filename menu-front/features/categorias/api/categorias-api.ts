import type { Categoria, CreateCategoriaInput, UpdateCategoriaInput } from '../types/categoria';

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

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export function getCategorias(token: string): Promise<Categoria[]> {
  return request<Categoria[]>('/categorias', token);
}

export function createCategoria(data: CreateCategoriaInput, token: string): Promise<Categoria> {
  return request<Categoria>('/categorias', token, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateCategoria(
  id: string,
  data: UpdateCategoriaInput,
  token: string,
): Promise<Categoria> {
  return request<Categoria>(`/categorias/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteCategoria(id: string, token: string): Promise<void> {
  return request<void>(`/categorias/${id}`, token, { method: 'DELETE' });
}
