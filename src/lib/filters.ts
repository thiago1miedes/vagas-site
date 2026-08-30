import { getAreaName } from '@/data/areas';
import { getCategoryArea, getCategoryName } from '@/data/categories';
import { normalize } from '@/lib/utils';
import type { Job, JobQuery, SortOrder } from '@/types/job';

/**
 * Busca, filtros e ordenação — funções puras, sem acesso ao sistema de
 * arquivos, para poderem rodar também no navegador.
 */

export const EMPTY_QUERY: JobQuery = {
  q: '',
  area: '',
  category: '',
  workModel: '',
  employmentType: '',
  seniority: '',
  sort: 'recentes',
};

/** Texto onde a busca procura: cargo, empresa, área, categoria, local e conteúdo. */
function searchableText(job: Job): string {
  const area = getCategoryArea(job.category);

  return normalize(
    [
      job.title,
      job.company,
      getAreaName(area),
      area,
      getCategoryName(job.category),
      job.category,
      job.location,
      job.workModel,
      job.employmentType,
      job.seniority,
      job.description,
      ...job.requirements,
      ...job.differentials,
    ].join(' '),
  );
}

/** Todos os termos digitados precisam aparecer na vaga. */
function matchesSearch(job: Job, term: string): boolean {
  const words = normalize(term).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;

  const haystack = searchableText(job);
  return words.every((word) => haystack.includes(word));
}

export function sortJobs(jobs: Job[], sort: SortOrder): Job[] {
  return [...jobs].sort((a, b) =>
    sort === 'antigas'
      ? a.publishedAt.localeCompare(b.publishedAt)
      : b.publishedAt.localeCompare(a.publishedAt),
  );
}

/** Aplica busca e filtros em conjunto e devolve a lista já ordenada. */
export function filterJobs(jobs: Job[], query: JobQuery): Job[] {
  const filtered = jobs.filter((job) => {
    if (query.area && getCategoryArea(job.category) !== query.area) return false;
    if (query.category && job.category !== query.category) return false;
    if (query.workModel && job.workModel !== query.workModel) return false;
    if (query.employmentType && job.employmentType !== query.employmentType) {
      return false;
    }
    if (query.seniority && job.seniority !== query.seniority) return false;
    return matchesSearch(job, query.q);
  });

  return sortJobs(filtered, query.sort);
}

/** Indica se há algo para "Limpar filtros" limpar. */
export function hasActiveFilters(query: JobQuery): boolean {
  return (
    query.q.trim() !== '' ||
    query.area !== '' ||
    query.category !== '' ||
    query.workModel !== '' ||
    query.employmentType !== '' ||
    query.seniority !== ''
  );
}

/** Monta o JobQuery a partir dos parâmetros da URL (?q=&area=&categoria=...). */
export function queryFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): JobQuery {
  const read = (key: string): string => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? '';
  };

  return {
    q: read('q'),
    area: read('area'),
    category: read('categoria'),
    workModel: read('modelo'),
    employmentType: read('contrato'),
    seniority: read('nivel'),
    sort: read('ordem') === 'antigas' ? 'antigas' : 'recentes',
  };
}

/** Converte o estado atual em querystring, omitindo o que está vazio. */
export function searchParamsFromQuery(query: JobQuery): string {
  const params = new URLSearchParams();
  if (query.q.trim()) params.set('q', query.q.trim());
  if (query.area) params.set('area', query.area);
  if (query.category) params.set('categoria', query.category);
  if (query.workModel) params.set('modelo', query.workModel);
  if (query.employmentType) params.set('contrato', query.employmentType);
  if (query.seniority) params.set('nivel', query.seniority);
  if (query.sort === 'antigas') params.set('ordem', 'antigas');
  return params.toString();
}
