import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { JobList } from '@/components/jobs/JobList';
import { Container } from '@/components/layout/Container';
import { buttonClasses } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ArrowLeft } from '@/components/ui/icons';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getJobsByCategory } from '@/lib/jobs';
import { pluralizeJobs } from '@/lib/utils';

/**
 * As datas relativas ("Publicada hoje") são calculadas na geração da página.
 * Revalidar uma vez por dia mantém esse texto correto sem novo deploy.
 */
export const revalidate = 86400;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const category = getCategoryBySlug((await params).slug);
  if (!category) return { title: 'Categoria não encontrada' };

  return {
    title: `Vagas de ${category.name}`,
    description: category.description,
    alternates: { canonical: `/categorias/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const category = getCategoryBySlug((await params).slug);
  if (!category) notFound();

  const jobs = getJobsByCategory(category.slug);

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <Link
          href="/categorias"
          className="group inline-flex items-center gap-2 text-sm text-slate transition-colors duration-150 hover:text-navy"
        >
          <ArrowLeft className="transition-transform duration-150 group-hover:-translate-x-1" />
          Todas as categorias
        </Link>

        <header className="mt-8 max-w-2xl">
          <p className="eyebrow">Categoria</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {category.description}
          </p>
        </header>

        <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
          {pluralizeJobs(jobs.length)}
          {jobs.length === 1 ? ' encontrada' : ' encontradas'}
        </p>

        <div className="mt-4">
          {jobs.length > 0 ? (
            <JobList jobs={jobs} />
          ) : (
            <EmptyState
              title="Nenhuma vaga nesta categoria por enquanto"
              description="Novas oportunidades são adicionadas conforme aparecem. Enquanto isso, veja as vagas das outras áreas."
              action={
                <Link href="/vagas" className={buttonClasses('secondary')}>
                  Ver todas as vagas
                </Link>
              }
            />
          )}
        </div>
      </div>
    </Container>
  );
}
