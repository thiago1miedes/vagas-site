import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CategoryTags } from '@/components/categories/CategoryTags';
import { JobList } from '@/components/jobs/JobList';
import { Container } from '@/components/layout/Container';
import { buttonClasses } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ArrowLeft } from '@/components/ui/icons';
import { areas, getAreaBySlug } from '@/data/areas';
import { getCategoriesByArea } from '@/data/categories';
import { countJobsByCategory, getJobsByArea } from '@/lib/jobs';
import { pluralizeJobs } from '@/lib/utils';

/**
 * As datas relativas ("Publicada hoje") são calculadas na geração da página.
 * Revalidar uma vez por dia mantém esse texto correto sem novo deploy.
 */
export const revalidate = 86400;

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const area = getAreaBySlug((await params).slug);
  if (!area) return { title: 'Área não encontrada' };

  return {
    title: `Vagas de ${area.name}`,
    description: area.description,
    alternates: { canonical: `/areas/${area.slug}` },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const area = getAreaBySlug((await params).slug);
  if (!area) notFound();

  const jobs = getJobsByArea(area.slug);
  const counts = countJobsByCategory();
  const categories = getCategoriesByArea(area.slug).map((category) => ({
    ...category,
    count: counts[category.slug] ?? 0,
  }));

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-slate transition-colors duration-150 hover:text-navy"
        >
          <ArrowLeft className="transition-transform duration-150 group-hover:-translate-x-1" />
          Voltar para a home
        </Link>

        <header className="mt-8 max-w-2xl">
          <p className="eyebrow">Área</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {area.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {area.description}
          </p>
        </header>

        <div className="mt-8">
          <CategoryTags categories={categories} />
        </div>

        <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
          {pluralizeJobs(jobs.length)}
          {jobs.length === 1 ? ' aberta' : ' abertas'}
        </p>

        <div className="mt-4">
          {jobs.length > 0 ? (
            <JobList jobs={jobs} />
          ) : (
            <EmptyState
              title="Nenhuma vaga nesta área por enquanto"
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
