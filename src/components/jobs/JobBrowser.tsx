'use client';

import { useEffect, useMemo, useState } from 'react';

import { JobFilters } from '@/components/jobs/JobFilters';
import { JobList } from '@/components/jobs/JobList';
import { JobSearch } from '@/components/jobs/JobSearch';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { EMPTY_QUERY, filterJobs, searchParamsFromQuery } from '@/lib/filters';
import { pluralizeJobs } from '@/lib/utils';
import type { Job, JobQuery } from '@/types/job';

/**
 * Orquestra busca, filtros e listagem da página /vagas.
 *
 * Recebe todas as vagas já renderizadas pelo servidor e filtra no navegador:
 * a lista muda sem recarregar a página. O estado é refletido na URL, para que
 * um resultado filtrado possa ser compartilhado ou recarregado.
 */
export function JobBrowser({
  jobs,
  initialQuery,
}: {
  jobs: Job[];
  initialQuery: JobQuery;
}) {
  const [query, setQuery] = useState<JobQuery>(initialQuery);

  const results = useMemo(() => filterJobs(jobs, query), [jobs, query]);

  // Mantém a URL em sincronia sem provocar nova navegação.
  useEffect(() => {
    const params = searchParamsFromQuery(query);
    const url = params ? `${window.location.pathname}?${params}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }, [query]);

  const update = (patch: Partial<JobQuery>) =>
    setQuery((current) => ({ ...current, ...patch }));

  const clear = () => setQuery({ ...EMPTY_QUERY, sort: query.sort });

  return (
    <div>
      <JobSearch value={query.q} onChange={(q) => update({ q })} />

      <div className="mt-6">
        <JobFilters query={query} onChange={update} onClear={clear} />
      </div>

      <p
        className="mt-6 text-sm text-muted"
        role="status"
        aria-live="polite"
      >
        {pluralizeJobs(results.length)}
        {results.length === 1 ? ' encontrada' : ' encontradas'}
      </p>

      <div className="mt-4">
        {results.length > 0 ? (
          <JobList jobs={results} />
        ) : (
          <EmptyState
            title="Nenhuma vaga encontrada"
            description="Tente outros termos de busca ou remova alguns filtros para ver mais oportunidades."
            action={
              <Button variant="secondary" onClick={clear}>
                Limpar filtros
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
