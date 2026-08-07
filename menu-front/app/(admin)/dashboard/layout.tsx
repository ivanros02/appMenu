import { requireAuthToken } from '@/lib/auth';
import { getMiRestaurante } from '@/features/restaurante/api/restaurante-api';
import { DashboardShell } from '@/features/dashboard/components/DashboardShell';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = await requireAuthToken();
  const perfil = await getMiRestaurante(token);

  return (
    <DashboardShell restauranteNombre={perfil.nombre} slug={perfil.slug}>
      {children}
    </DashboardShell>
  );
}
