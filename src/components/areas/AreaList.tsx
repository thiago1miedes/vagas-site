import Link from 'next/link';

import { ArrowRight } from '@/components/ui/icons';
import { pluralizeJobs } from '@/lib/utils';
import type { AreaWithCount } from '@/types/area';

/** Índice das áreas, usado na home e na página de categorias. */
export function AreaList({ areas }: { areas: AreaWithCount[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {areas.map((area) => (
        <li key={area.slug}>
          <Link
            href={`/areas/${area.slug}`}
            className="group flex h-full flex-col rounded-card border border-line bg-white p-5 transition-colors duration-150 hover:border-navy"
          >
            <span className="text-base font-semibold text-ink transition-colors duration-150 group-hover:text-navy">
              {area.name}
            </span>
            <span className="mt-1 text-sm leading-relaxed text-muted">
              {area.tagline}
            </span>
            <span className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
              {pluralizeJobs(area.count)}
              <ArrowRight className="text-navy transition-transform duration-150 group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
