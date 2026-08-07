'use client';

import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import type { RestaurantePerfil, UpdateRestauranteInput } from '../types/restaurante';
import { updateMiRestaurante } from '../api/restaurante-api';

interface RestauranteFormProps {
  token: string;
  perfil: RestaurantePerfil;
}

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors duration-150 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500';
const labelClass = 'mb-1 block text-sm font-medium text-gray-900';

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
      <legend className="px-1 text-sm font-semibold text-gray-900">{titulo}</legend>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Campo({
  label,
  value,
  onChange,
  type = 'text',
  full = false,
}: {
  label: string;
  value: string;
  onChange: (valor: string) => void;
  type?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : undefined}>
      <label className={labelClass}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </div>
  );
}

function CampoColor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (valor: string) => void;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 shrink-0 cursor-pointer rounded-md border border-gray-300 bg-white p-1"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          pattern="^#[0-9A-Fa-f]{6}$"
          className={inputClass}
        />
      </div>
    </div>
  );
}

export function RestauranteForm({ token, perfil }: RestauranteFormProps) {
  const [form, setForm] = useState<UpdateRestauranteInput>({
    nombre: perfil.nombre,
    logoUrl: perfil.logoUrl ?? '',
    horarioTexto: perfil.horarioTexto ?? '',
    direccion: perfil.direccion ?? '',
    googleMapsUrl: perfil.googleMapsUrl ?? '',
    wifiNombre: perfil.wifiNombre ?? '',
    wifiPassword: perfil.wifiPassword ?? '',
    telefono: perfil.telefono ?? '',
    instagramUrl: perfil.instagramUrl ?? '',
    tiktokUrl: perfil.tiktokUrl ?? '',
    colorFondo: perfil.colorFondo ?? '#d4dc94',
    colorTexto: perfil.colorTexto ?? '#111111',
  });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof UpdateRestauranteInput>(campo: K, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setGuardando(true);
    setError(null);

    const payload = Object.fromEntries(
      Object.entries(form).map(([clave, valor]) => [clave, valor === '' ? undefined : valor]),
    );

    try {
      await updateMiRestaurante(payload, token);
      toast.success('Cambios guardados correctamente');
    } catch {
      const mensaje = 'No se pudo guardar. Revisá que las URLs sean válidas (https://...).';
      setError(mensaje);
      toast.error(mensaje);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Seccion titulo="Datos generales">
        <Campo label="Nombre del restaurante" value={form.nombre ?? ''} onChange={(v) => set('nombre', v)} full />
        <Campo label="URL del logo" value={form.logoUrl ?? ''} onChange={(v) => set('logoUrl', v)} type="url" />
      </Seccion>

      <Seccion titulo="Ubicación y horario">
        <Campo label="Dirección" value={form.direccion ?? ''} onChange={(v) => set('direccion', v)} full />
        <Campo
          label="Link de Google Maps"
          value={form.googleMapsUrl ?? ''}
          onChange={(v) => set('googleMapsUrl', v)}
          type="url"
        />
        <Campo
          label="Horario (texto libre)"
          value={form.horarioTexto ?? ''}
          onChange={(v) => set('horarioTexto', v)}
        />
      </Seccion>

      <Seccion titulo="WiFi para clientes">
        <Campo label="Nombre de la red" value={form.wifiNombre ?? ''} onChange={(v) => set('wifiNombre', v)} />
        <Campo label="Contraseña" value={form.wifiPassword ?? ''} onChange={(v) => set('wifiPassword', v)} />
      </Seccion>

      <Seccion titulo="Contacto y redes">
        <Campo label="Teléfono (con código de país)" value={form.telefono ?? ''} onChange={(v) => set('telefono', v)} />
        <Campo label="Instagram" value={form.instagramUrl ?? ''} onChange={(v) => set('instagramUrl', v)} type="url" />
        <Campo label="TikTok" value={form.tiktokUrl ?? ''} onChange={(v) => set('tiktokUrl', v)} type="url" />
      </Seccion>

      <Seccion titulo="Apariencia del menú">
        <CampoColor
          label="Color de fondo"
          value={form.colorFondo ?? '#d4dc94'}
          onChange={(v) => set('colorFondo', v)}
        />
        <CampoColor
          label="Color de texto"
          value={form.colorTexto ?? '#111111'}
          onChange={(v) => set('colorTexto', v)}
        />
      </Seccion>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={guardando}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500 disabled:opacity-50"
      >
        {guardando ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </form>
  );
}
