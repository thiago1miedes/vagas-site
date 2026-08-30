import { JobCard } from '@/components/jobs/JobCard';
import type { Job } from '@/types/job';

/** Lista vertical de vagas, sempre em coluna única. */
export function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <ul className="space-y-3">
      {jobs.map((job) => (
        <li key={job.slug}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
