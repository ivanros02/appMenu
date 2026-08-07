import { requireAuthToken } from '@/lib/auth';
import { getMiRestaurante } from '@/features/restaurante/api/restaurante-api';
import { RestauranteForm } from '@/features/restaurante/components/RestauranteForm';
import { CodigoQR } from '@/features/restaurante/components/CodigoQR';

export default async function ConfiguracionPage() {
  const token = await requireAuthToken();
  const perfil = await getMiRestaurante(token);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Configuración del restaurante</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[2fr_1fr]">
        <RestauranteForm token={token} perfil={perfil} />
        <CodigoQR slug={perfil.slug} wifiNombre={perfil.wifiNombre} wifiPassword={perfil.wifiPassword} />
      </div>
    </div>
  );
}
