import { notFound } from 'next/navigation';
import { Header } from '@/features/menu-publico/components/Header';
import { HeroSection } from '@/features/menu-publico/components/HeroSection';
import { CategoryNav } from '@/features/menu-publico/components/CategoryNav';
import { MenuCard } from '@/features/menu-publico/components/MenuCard';
import { Footer } from '@/features/menu-publico/components/Footer';
import { getMenuPublico } from '@/features/menu-publico/api/menu-publico-api';

interface PageProps {
  params: Promise<{ restaurante: string }>;
}

export default async function MenuPublicoPage({ params }: PageProps) {
  const { restaurante: slug } = await params;
  const menu = await getMenuPublico(slug);

  if (!menu) {
    notFound();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full min-w-0 max-w-lg flex-col overflow-x-hidden bg-linear-to-b from-rose-50 via-white to-indigo-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <Header restaurante={menu} />
      <HeroSection restaurante={menu} />
      <CategoryNav categorias={menu.categorias} />

      <main className="min-w-0 flex-1 space-y-10 px-5 py-8">
        {menu.categorias.map((categoria) => (
          <section key={categoria.id} id={`categoria-${categoria.id}`} className="scroll-mt-16 space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 dark:bg-indigo-700" />
              {categoria.nombre}
            </h2>
            <div className="-mx-5 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-4 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
              {categoria.platos.map((plato) => (
                <div key={plato.id} className="h-auto w-[85vw] max-w-75 shrink-0 snap-center">
                  <MenuCard plato={plato} slug={slug} />
                </div>
              ))}
            </div>
          </section>
        ))}

        {menu.categorias.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
            Este restaurante todavía no cargó su menú.
          </p>
        )}
      </main>

      <Footer restaurante={menu} />
    </div>
  );
}
