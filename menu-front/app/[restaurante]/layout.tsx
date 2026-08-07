import type { Metadata } from 'next';
import { getMenuPublico } from '@/features/menu-publico/api/menu-publico-api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ restaurante: string }>;
}): Promise<Metadata> {
  const { restaurante: slug } = await params;
  const menu = await getMenuPublico(slug);

  if (!menu) {
    return {};
  }

  return {
    title: menu.nombre,
    icons: menu.logoUrl ? { icon: menu.logoUrl } : undefined,
  };
}

export default function RestauranteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
