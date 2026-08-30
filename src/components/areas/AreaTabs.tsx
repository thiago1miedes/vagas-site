'use client';

import { areas } from '@/data/areas';
import { cn } from '@/lib/utils';

/** Segmentação principal da listagem: todas as áreas ou uma delas. */
export function AreaTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (area: string) => void;
}) {
  const options = [{ slug: '', shortName: 'Todas as áreas' }, ...areas];

  return (
    <div role="group" aria-label="Filtrar por área" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.slug === value;

        return (
          <button
            key={option.slug || 'todas'}
            type="button"
            onClick={() => onChange(option.slug)}
            aria-pressed={active}
            className={cn(
              'rounded-md border px-3.5 py-2 text-sm transition-colors duration-150',
              active
                ? 'border-navy bg-navy text-white'
                : 'border-line text-slate hover:border-navy hover:text-navy',
            )}
          >
            {option.shortName}
          </button>
        );
      })}
    </div>
  );
}
