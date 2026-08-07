'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { subirImagen } from '../api/uploads-api';

interface CampoImagenProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  token: string;
}

export function CampoImagen({ label, value, onChange, token }: CampoImagenProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const archivo = event.target.files?.[0];
    event.target.value = '';
    if (!archivo) return;

    setSubiendo(true);
    try {
      const url = await subirImagen(archivo, token);
      onChange(url);
    } catch {
      toast.error('No se pudo subir la imagen. Probá de nuevo.');
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-900">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- URL arbitraria (R2 u otra), mismo criterio que PlatoList
          <img src={value} alt="" className="h-14 w-14 rounded-lg border border-gray-200 object-cover" />
        ) : (
          <div className="h-14 w-14 shrink-0 rounded-lg border border-dashed border-gray-300 bg-gray-50" />
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={subiendo}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 transition-colors duration-150 hover:bg-gray-100 disabled:opacity-50"
        >
          {subiendo ? 'Subiendo...' : value ? 'Cambiar imagen' : 'Subir imagen'}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFile}
          className="hidden"
        />
      </div>
    </div>
  );
}
