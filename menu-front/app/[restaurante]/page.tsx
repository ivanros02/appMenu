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

  const temaVars = {
    '--brand-bg': menu.colorFondo ?? '#d4dc94',
    '--brand-text': menu.colorTexto ?? '#111111',
  } as React.CSSProperties;

  return (
    <div style={temaVars} className="min-h-screen w-full bg-brand-bg px-3 py-4 sm:px-6 sm:py-8">
      <div className="mx-auto flex w-full min-w-0 max-w-lg flex-col rounded-3xl border border-white/30 bg-white/20 shadow-2xl shadow-black/10 backdrop-blur-xl sm:max-w-2xl lg:max-w-4xl">
        <div className="overflow-hidden rounded-t-3xl">
          <Header restaurante={menu} />
        </div>

        <HeroSection restaurante={menu} />
        <CategoryNav categorias={menu.categorias} />

        <main className="min-w-0 flex-1 space-y-12 px-5 py-8">
          {menu.categorias.map((categoria) => (
            <section key={categoria.id} id={`categoria-${categoria.id}`} className="scroll-mt-16 space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-bold text-brand-text">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-dark" />
                {categoria.nombre}
              </h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-14 pt-10 sm:grid-cols-3 lg:grid-cols-4">
                {categoria.platos.map((plato) => (
                  <MenuCard key={plato.id} plato={plato} slug={slug} />
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

        <div className="overflow-hidden rounded-b-3xl">
          <Footer restaurante={menu} />
        </div>
      </div>
    </div>
  );
}
