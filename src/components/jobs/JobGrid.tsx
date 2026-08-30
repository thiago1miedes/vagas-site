import { JobCard } from '@/components/jobs/JobCard';
import type { Job } from '@/types/job';

/**
 * Grade editorial de duas colunas, usada nos blocos da home.
 * As páginas de listagem continuam usando `JobList`, em coluna única.
 */
export function JobGrid({ jobs }: { jobs: Job[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {jobs.map((job) => (
        <li key={job.slug} className="h-full">
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
