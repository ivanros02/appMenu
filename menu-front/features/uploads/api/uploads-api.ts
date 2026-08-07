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

// No se puede reusar el helper `request()` de los otros *-api.ts: ese fuerza
// 'Content-Type: application/json', y un FormData con archivo necesita que
// el browser ponga el boundary del multipart solo (sin header manual).
export async function subirImagen(archivo: File, token: string): Promise<string> {
  const formData = new FormData();
  formData.append('archivo', archivo);

  const res = await fetch(`${API_URL}/uploads/imagen`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const body: { message?: string } | null = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.message ?? 'No se pudo subir la imagen');
  }

  const data = (await res.json()) as { url: string };
  return data.url;
}
