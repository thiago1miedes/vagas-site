import type { Metadata } from 'next';

import { JobBrowser } from '@/components/jobs/JobBrowser';
import { Container } from '@/components/layout/Container';
import { queryFromSearchParams } from '@/lib/filters';
import { getAllJobs } from '@/lib/jobs';

export const metadata: Metadata = {
  title: 'Todas as vagas',
  description:
    'Todas as vagas abertas do site, com busca e filtros por área, categoria, modelo de trabalho, contrato e nível.',
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const jobs = getAllJobs();
  const initialQuery = queryFromSearchParams(await searchParams);

  return (
    <Container>
      <div className="py-14 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Todas as vagas
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Busque e filtre pelas oportunidades abertas em cada área do
            site.
          </p>
        </header>

        <div className="mt-10">
          <JobBrowser jobs={jobs} initialQuery={initialQuery} />
        </div>
      </div>
    </Container>
  );
}
