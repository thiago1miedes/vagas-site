import Link from 'next/link';

import type { CategoryWithCount } from '@/types/category';

/** Categorias como etiquetas simples, usadas na home. */
export function CategoryTags({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/categorias/${category.slug}`}
            className="inline-flex items-center rounded-md border border-line px-3.5 py-2 text-sm text-slate transition-colors duration-150 hover:border-navy hover:text-navy"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
