import { JobList } from '@/components/jobs/JobList';
import type { Job } from '@/types/job';

/** Bloco final da página da vaga. Não renderiza nada se não houver sugestões. */
export function RelatedJobs({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) return null;

  return (
    <section aria-labelledby="vagas-relacionadas" className="mt-20 border-t border-line pt-12">
      <h2
        id="vagas-relacionadas"
        className="text-xl font-semibold tracking-tight text-ink"
      >
        Vagas relacionadas
      </h2>
      <div className="mt-6">
        <JobList jobs={jobs} />
      </div>
    </section>
  );
}
