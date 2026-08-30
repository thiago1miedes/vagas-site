'use client';

import { useState } from 'react';

import { AreaTabs } from '@/components/areas/AreaTabs';
import { Select, type SelectOption } from '@/components/ui/Select';
import { categories, getCategoriesByArea } from '@/data/categories';
import { hasActiveFilters } from '@/lib/filters';
import { cn } from '@/lib/utils';
import {
  EMPLOYMENT_TYPES,
  SENIORITIES,
  WORK_MODELS,
  type JobQuery,
  type SortOrder,
} from '@/types/job';

const toOptions = (
  placeholder: string,
  values: readonly string[],
): SelectOption[] => [
  { value: '', label: placeholder },
  ...values.map((value) => ({ value, label: value })),
];

/** As categorias oferecidas dependem da área selecionada. */
function categoryOptions(area: string): SelectOption[] {
  const list = area ? getCategoriesByArea(area) : categories;

  return [
    { value: '', label: 'Todas as categorias' },
    ...list.map((category) => ({
      value: category.slug,
      label: category.name,
    })),
  ];
}

const sortOptions: SelectOption[] = [
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'antigas', label: 'Mais antigas' },
];

/** Quantos dos quatro filtros estão em uso (a busca e a área são contadas à parte). */
function countActiveFilters(query: JobQuery): number {
  return [
    query.category,
    query.workModel,
    query.employmentType,
    query.seniority,
  ].filter(Boolean).length;
}

export function JobFilters({
  query,
  onChange,
  onClear,
}: {
  query: JobQuery;
  onChange: (patch: Partial<JobQuery>) => void;
  onClear: () => void;
}) {
  // Em telas menores os filtros ficam recolhidos para não empurrar as vagas
  // para fora da tela. A partir de lg eles aparecem sempre.
  const [open, setOpen] = useState(false);
  const activeCount = countActiveFilters(query);

  return (
    <div className="border-y border-line py-5">
      <AreaTabs
        value={query.area}
        // Trocar de área zera a categoria: ela pertence a uma área específica.
        onChange={(area) => onChange({ area, category: '' })}
      />

      <div className="mt-5 flex items-center justify-between gap-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="filtros-vagas"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate transition-colors duration-150 hover:text-navy"
        >
          Filtros
          {activeCount > 0 ? (
            <span className="text-navy">({activeCount})</span>
          ) : null}
          <svg
            viewBox="0 0 12 8"
            fill="none"
            aria-hidden="true"
            className={cn(
              'h-2 w-3 transition-transform duration-150',
              open && 'rotate-180',
            )}
          >
            <path
              d="M1 1.5 6 6.5l5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {hasActiveFilters(query) ? (
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-navy underline underline-offset-4 transition-colors duration-150 hover:text-indigo"
          >
            Limpar filtros
          </button>
        ) : null}
      </div>

      <div
        id="filtros-vagas"
        className={cn(
          open ? 'mt-5 grid' : 'hidden',
          'grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-5 lg:grid lg:grid-cols-4',
        )}
      >
        <Select
          id="filtro-categoria"
          label="Categoria"
          options={categoryOptions(query.area)}
          value={query.category}
          onChange={(event) => onChange({ category: event.target.value })}
        />
        <Select
          id="filtro-modelo"
          label="Modelo de trabalho"
          options={toOptions('Todos os modelos', WORK_MODELS)}
          value={query.workModel}
          onChange={(event) => onChange({ workModel: event.target.value })}
        />
        <Select
          id="filtro-contrato"
          label="Tipo de contratação"
          options={toOptions('Todos os contratos', EMPLOYMENT_TYPES)}
          value={query.employmentType}
          onChange={(event) => onChange({ employmentType: event.target.value })}
        />
        <Select
          id="filtro-nivel"
          label="Nível profissional"
          options={toOptions('Todos os níveis', SENIORITIES)}
          value={query.seniority}
          onChange={(event) => onChange({ seniority: event.target.value })}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="w-full sm:w-56">
          <Select
            id="ordenacao"
            label="Ordenar por"
            hideLabel
            options={sortOptions}
            value={query.sort}
            onChange={(event) =>
              onChange({ sort: event.target.value as SortOrder })
            }
          />
        </div>

        {hasActiveFilters(query) ? (
          <button
            type="button"
            onClick={onClear}
            className="hidden text-sm text-navy underline underline-offset-4 transition-colors duration-150 hover:text-indigo lg:inline"
          >
            Limpar filtros
          </button>
        ) : null}
      </div>
    </div>
  );
}
