import type { Etiqueta, CreateEtiquetaInput, UpdateEtiquetaInput } from '../types/etiqueta';

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

export function getEtiquetas(token: string): Promise<Etiqueta[]> {
  return request<Etiqueta[]>('/etiquetas', token);
}

export function createEtiqueta(data: CreateEtiquetaInput, token: string): Promise<Etiqueta> {
  return request<Etiqueta>('/etiquetas', token, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateEtiqueta(
  id: string,
  data: UpdateEtiquetaInput,
  token: string,
): Promise<Etiqueta> {
  return request<Etiqueta>(`/etiquetas/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteEtiqueta(id: string, token: string): Promise<void> {
  return request<void>(`/etiquetas/${id}`, token, { method: 'DELETE' });
}
