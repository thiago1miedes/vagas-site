import Link from 'next/link';

import { ArrowRight } from '@/components/ui/icons';
import { pluralizeJobs } from '@/lib/utils';
import type { CategoryWithCount } from '@/types/category';

/** Lista das categorias com a quantidade de vagas abertas em cada uma. */
export function CategoryList({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-10 border-t border-line sm:grid-cols-2">
      {categories.map((category) => (
        <li key={category.slug} className="border-b border-line">
          <Link
            href={`/categorias/${category.slug}`}
            className="group flex items-center justify-between gap-6 py-5 transition-colors duration-150"
          >
            <span>
              <span className="block text-base font-semibold text-ink transition-colors duration-150 group-hover:text-navy">
                {category.name}
              </span>
              <span className="mt-1 block text-sm text-muted">
                {pluralizeJobs(category.count)}
              </span>
            </span>
            <ArrowRight className="shrink-0 text-navy transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
