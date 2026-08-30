import Link from 'next/link';

import { ArrowRight } from '@/components/ui/icons';
import { getCategoryName } from '@/data/categories';
import { formatPublishedAt } from '@/lib/formatDate';
import { cn } from '@/lib/utils';
import type { Job } from '@/types/job';

/**
 * Item da lista de vagas: card discreto, clicável por inteiro.
 *
 * `featured` amplia o card e mostra um trecho da descrição — usado para a vaga
 * de abertura da home, no lugar de uma "matéria principal".
 */
export function JobCard({
  job,
  featured = false,
}: {
  job: Job;
  featured?: boolean;
}) {
  const meta = [job.workModel, job.employmentType, job.seniority].join(' · ');

  return (
    <article className="h-full">
      <Link
        href={`/vagas/${job.slug}`}
        className={cn(
          'group flex h-full flex-col rounded-card border border-line bg-white transition-colors duration-150 hover:border-navy',
          featured ? 'p-6 sm:p-8' : 'p-5 sm:p-6',
        )}
      >
        <p className="eyebrow">{getCategoryName(job.category)}</p>

        <h3
          className={cn(
            'mt-2.5 font-semibold tracking-tight text-ink',
            featured ? 'text-2xl leading-snug' : 'text-lg',
          )}
        >
          {job.title}
        </h3>
        <p className={cn('mt-1 text-slate', featured ? 'text-base' : 'text-sm')}>
          {job.company}
        </p>

        {featured ? (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            {job.description}
          </p>
        ) : null}

        <p className="mt-3 text-sm text-muted">{meta}</p>

        <div className="mt-5 flex flex-1 items-end justify-between gap-4">
          <time
            dateTime={job.publishedAt}
            className="text-xs text-muted"
            suppressHydrationWarning
          >
            {formatPublishedAt(job.publishedAt)}
          </time>
          <ArrowRight className="text-navy transition-transform duration-150 group-hover:translate-x-1" />
        </div>
      </Link>
    </article>
  );
}
