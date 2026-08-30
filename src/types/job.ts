/**
 * Modelo de dados de uma vaga.
 *
 * As listas abaixo são a fonte da verdade para os filtros do site: qualquer
 * valor usado nos arquivos de `src/data/jobs` precisa existir aqui.
 */

export const WORK_MODELS = ['Remoto', 'Híbrido', 'Presencial'] as const;
export const EMPLOYMENT_TYPES = ['CLT', 'PJ', 'Freelancer', 'Estágio'] as const;
export const SENIORITIES = [
  'Estágio',
  'Júnior',
  'Pleno',
  'Sênior',
  'Especialista',
] as const;

export type WorkModel = (typeof WORK_MODELS)[number];
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];
export type Seniority = (typeof SENIORITIES)[number];

export interface Job {
  id: string;
  title: string;
  slug: string;
  company: string;
  /** slug de uma categoria declarada em `src/data/categories.ts` */
  category: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  differentials: string[];
  employmentType: EmploymentType;
  workModel: WorkModel;
  seniority: Seniority;
  location: string;
  /** texto livre, ex.: "R$ 8.000 - R$ 11.000". `null` quando não informado */
  salary: string | null;
  applicationUrl: string;
  /** data ISO (YYYY-MM-DD) */
  publishedAt: string;
  /** data ISO (YYYY-MM-DD). Passada a data, a vaga deixa de aparecer no site */
  expiresAt: string | null;
}

export type SortOrder = 'recentes' | 'antigas';

/** Estado da busca + filtros das páginas de listagem. `''` = sem filtro. */
export interface JobQuery {
  q: string;
  /** slug de uma área declarada em `src/data/areas.ts` */
  area: string;
  category: string;
  workModel: string;
  employmentType: string;
  seniority: string;
  sort: SortOrder;
}
