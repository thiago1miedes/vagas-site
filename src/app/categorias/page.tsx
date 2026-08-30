import type { Metadata } from 'next';
import Link from 'next/link';

import { CategoryList } from '@/components/categories/CategoryList';
import { Container } from '@/components/layout/Container';
import { ArrowRight } from '@/components/ui/icons';
import { areas } from '@/data/areas';
import { getCategoriesByArea } from '@/data/categories';
import { countJobsByCategory } from '@/lib/jobs';

export const metadata: Metadata = {
  title: 'Categorias',
  description:
    'Todas as categorias do site, agrupadas por área: design, arquitetura e urbanismo, biologia e farmácia, e programação.',
};

export default function CategoriesPage() {
  const counts = countJobsByCategory();

  const blocks = areas.map((area) => ({
    area,
    categories: getCategoriesByArea(area.slug).map((category) => ({
      ...category,
      count: counts[category.slug] ?? 0,
    })),
  }));

  return (
    <Container>
      <div className="py-14 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Categorias
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Encontre vagas de acordo com sua área de atuação.
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {blocks.map(({ area, categories }) => (
            <section key={area.slug} aria-labelledby={`categorias-${area.slug}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <div>
                  <h2
                    id={`categorias-${area.slug}`}
                    className="text-xl font-semibold tracking-tight text-ink"
                  >
                    {area.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{area.tagline}</p>
                </div>
                <Link
                  href={`/areas/${area.slug}`}
                  className="group inline-flex items-center gap-2 whitespace-nowrap text-sm text-navy transition-colors duration-150 hover:text-indigo"
                >
                  Ver a área
                  <ArrowRight className="transition-transform duration-150 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-6">
                <CategoryList categories={categories} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
