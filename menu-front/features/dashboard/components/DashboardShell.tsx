'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UtensilsCrossed,
  LayoutGrid,
  Tag,
  Settings,
  KeyRound,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Resumen', icon: LayoutDashboard },
  { href: '/dashboard/platos', label: 'Platos', icon: UtensilsCrossed },
  { href: '/dashboard/categorias', label: 'Categorías', icon: LayoutGrid },
  { href: '/dashboard/etiquetas', label: 'Etiquetas', icon: Tag },
  { href: '/dashboard/configuracion', label: 'Configuración', icon: Settings },
  { href: '/dashboard/cambiar-password', label: 'Cambiar contraseña', icon: KeyRound },
];

interface DashboardShellProps {
  restauranteNombre: string;
  slug: string;
  children: React.ReactNode;
}

export function DashboardShell({ restauranteNombre, slug, children }: DashboardShellProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
        <SidebarContent restauranteNombre={restauranteNombre} slug={slug} pathname={pathname} onNavigate={() => {}} />
      </aside>

      {menuAbierto && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-900/50"
            onClick={() => setMenuAbierto(false)}
            aria-hidden
          />
          <aside className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-gray-200 bg-white shadow-xl">
            <div className="flex items-center justify-end px-4 py-3">
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setMenuAbierto(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent
              restauranteNombre={restauranteNombre}
              slug={slug}
              pathname={pathname}
              onNavigate={() => setMenuAbierto(false)}
            />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMenuAbierto(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <Link
            href={`/${slug}`}
            target="_blank"
            className="hidden items-center gap-1.5 text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-gray-900 sm:flex"
          >
            Ver menú público
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
            {restauranteNombre.charAt(0).toUpperCase()}
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  restauranteNombre,
  slug,
  pathname,
  onNavigate,
}: {
  restauranteNombre: string;
  slug: string;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <>
      <div className="flex h-16 items-center gap-2.5 border-b border-gray-200 px-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
          {restauranteNombre.charAt(0).toUpperCase()}
        </div>
        <span className="truncate text-sm font-semibold text-gray-900">{restauranteNombre}</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const activo = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                activo ? 'bg-indigo-50 text-indigo-600' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${activo ? 'text-indigo-600' : 'text-gray-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <Link
          href={`/${slug}`}
          target="_blank"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900"
        >
          <ExternalLink className="h-5 w-5 shrink-0 text-gray-400" />
          Ver menú público
        </Link>
      </div>
    </>
  );
}
