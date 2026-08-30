import fs from 'node:fs';
import path from 'node:path';

import { areas } from '@/data/areas';
import { getCategoryArea, getCategoryBySlug } from '@/data/categories';
import {
  EMPLOYMENT_TYPES,
  SENIORITIES,
  WORK_MODELS,
  type Job,
} from '@/types/job';

/**
 * Única camada que conhece a origem dos dados.
 *
 * Hoje as vagas são arquivos JSON em `src/data/jobs`. Para migrar para um banco
 * no futuro, basta reescrever este arquivo mantendo as funções exportadas — as
 * páginas e componentes não sabem de onde os dados vêm.
 */

const JOBS_DIR = path.join(process.cwd(), 'src', 'data', 'jobs');

let cache: Job[] | null = null;

function fail(file: string, message: string): never {
  throw new Error(`[vagas] ${file}: ${message}`);
}

function requireText(file: string, value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(file, `o campo "${field}" é obrigatório e deve ser um texto.`);
  }
  return value.trim();
}

function requireList(file: string, value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    fail(file, `o campo "${field}" deve ser uma lista de textos.`);
  }
  return value as string[];
}

function requireOneOf<T extends string>(
  file: string,
  value: unknown,
  field: string,
  allowed: readonly T[],
): T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    fail(file, `"${field}" deve ser um destes valores: ${allowed.join(', ')}.`);
  }
  return value as T;
}

function requireDate(file: string, value: unknown, field: string): string {
  const text = requireText(file, value, field);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    fail(file, `"${field}" deve estar no formato AAAA-MM-DD.`);
  }
  return text;
}

function optionalDate(file: string, value: unknown, field: string): string | null {
  if (value === null || value === undefined || value === '') return null;
  return requireDate(file, value, field);
}

/** Valida um JSON de vaga e devolve um objeto tipado. */
function parseJob(file: string, raw: unknown): Job {
  if (typeof raw !== 'object' || raw === null) {
    fail(file, 'o arquivo precisa conter um objeto JSON.');
  }

  const data = raw as Record<string, unknown>;
  const slug = requireText(file, data.slug, 'slug');
  const category = requireText(file, data.category, 'category');

  if (!getCategoryBySlug(category)) {
    fail(
      file,
      `a categoria "${category}" não existe. Adicione-a em src/data/categories.ts.`,
    );
  }

  const expectedFile = `${slug}.json`;
  if (file !== expectedFile) {
    fail(file, `o nome do arquivo deveria ser "${expectedFile}" (igual ao slug).`);
  }

  return {
    id: requireText(file, data.id, 'id'),
    title: requireText(file, data.title, 'title'),
    slug,
    company: requireText(file, data.company, 'company'),
    category,
    description: requireText(file, data.description, 'description'),
    responsibilities: requireList(file, data.responsibilities, 'responsibilities'),
    requirements: requireList(file, data.requirements, 'requirements'),
    differentials: requireList(file, data.differentials ?? [], 'differentials'),
    employmentType: requireOneOf(
      file,
      data.employmentType,
      'employmentType',
      EMPLOYMENT_TYPES,
    ),
    workModel: requireOneOf(file, data.workModel, 'workModel', WORK_MODELS),
    seniority: requireOneOf(file, data.seniority, 'seniority', SENIORITIES),
    location: requireText(file, data.location, 'location'),
    salary: typeof data.salary === 'string' && data.salary.trim() !== ''
      ? data.salary.trim()
      : null,
    applicationUrl: requireText(file, data.applicationUrl, 'applicationUrl'),
    publishedAt: requireDate(file, data.publishedAt, 'publishedAt'),
    expiresAt: optionalDate(file, data.expiresAt, 'expiresAt'),
  };
}

function isExpired(job: Job, today: string): boolean {
  return job.expiresAt !== null && job.expiresAt < today;
}

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function loadJobs(): Job[] {
  if (cache) return cache;

  if (!fs.existsSync(JOBS_DIR)) {
    cache = [];
    return cache;
  }

  const today = todayIso();
  const files = fs
    .readdirSync(JOBS_DIR)
    .filter((file) => file.endsWith('.json'));

  const jobs = files.map((file) => {
    const contents = fs.readFileSync(path.join(JOBS_DIR, file), 'utf8');
    let raw: unknown;
    try {
      raw = JSON.parse(contents);
    } catch {
      fail(file, 'JSON inválido — verifique vírgulas e aspas.');
    }
    return parseJob(file, raw);
  });

  const slugs = new Set<string>();
  for (const job of jobs) {
    if (slugs.has(job.slug)) fail(`${job.slug}.json`, 'slug duplicado.');
    slugs.add(job.slug);
  }

  cache = jobs
    .filter((job) => !isExpired(job, today))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return cache;
}

/** Todas as vagas abertas, da mais recente para a mais antiga. */
export function getAllJobs(): Job[] {
  return loadJobs();
}

export function getJobBySlug(slug: string): Job | undefined {
  return loadJobs().find((job) => job.slug === slug);
}

export function getRecentJobs(limit: number): Job[] {
  return loadJobs().slice(0, limit);
}

/** Data de publicação mais recente entre as vagas abertas, ou `null` se não houver vagas. */
export function getLatestPublishedDate(): string | null {
  const jobs = loadJobs();
  return jobs.length > 0 ? jobs[0].publishedAt : null;
}

/** Posição da área da vaga na ordem declarada em `src/data/areas.ts`. */
function areaRank(job: Job): number {
  const area = getCategoryArea(job.category);
  const index = areas.findIndex((candidate) => candidate.slug === area);
  return index === -1 ? areas.length : index;
}

/**
 * Ordena as vagas pela ordem das áreas — Design primeiro, por ser o foco do
 * projeto — mantendo a data como critério de desempate.
 */
export function sortJobsByArea(jobs: Job[]): Job[] {
  return [...jobs].sort((a, b) => {
    const difference = areaRank(a) - areaRank(b);
    if (difference !== 0) return difference;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

/**
 * Todas as vagas publicadas na data mais recente — a leva do dia, agrupada por
 * área para a home.
 */
export function getJobsOfTheDay(): Job[] {
  const jobs = loadJobs();
  const latest = getLatestPublishedDate();
  if (!latest) return [];
  return sortJobsByArea(jobs.filter((job) => job.publishedAt === latest));
}

/** Vagas recentes de dias anteriores à leva mais nova, para a prévia da home. */
export function getPreviousJobs(limit: number): Job[] {
  const jobs = loadJobs();
  const latest = getLatestPublishedDate();
  if (!latest) return [];
  return jobs.filter((job) => job.publishedAt !== latest).slice(0, limit);
}

/** Todas as vagas abertas de uma área (Design, Biologia & Farmácia, Programação). */
export function getJobsByArea(areaSlug: string): Job[] {
  return loadJobs().filter((job) => getCategoryArea(job.category) === areaSlug);
}

/** Quantidade de vagas abertas por slug de área. */
export function countJobsByArea(): Record<string, number> {
  return loadJobs().reduce<Record<string, number>>((counts, job) => {
    const area = getCategoryArea(job.category);
    if (area) counts[area] = (counts[area] ?? 0) + 1;
    return counts;
  }, {});
}

export function getJobsByCategory(categorySlug: string): Job[] {
  return loadJobs().filter((job) => job.category === categorySlug);
}

/** Quantidade de vagas abertas por slug de categoria. */
export function countJobsByCategory(): Record<string, number> {
  return loadJobs().reduce<Record<string, number>>((counts, job) => {
    counts[job.category] = (counts[job.category] ?? 0) + 1;
    return counts;
  }, {});
}

/**
 * Vagas relacionadas: sempre dentro da mesma área, priorizando mesma categoria,
 * depois mesmo modelo de trabalho e mesmo nível. Se não houver semelhantes
 * suficientes, completa com as vagas mais recentes da área.
 */
export function getRelatedJobs(job: Job, limit = 4): Job[] {
  const area = getCategoryArea(job.category);

  const scored = loadJobs()
    .filter(
      (candidate) =>
        candidate.slug !== job.slug && getCategoryArea(candidate.category) === area,
    )
    .map((candidate) => {
      let score = 0;
      if (candidate.category === job.category) score += 4;
      if (candidate.workModel === job.workModel) score += 2;
      if (candidate.seniority === job.seniority) score += 1;
      return { candidate, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.candidate.publishedAt.localeCompare(a.candidate.publishedAt);
    });

  return scored.slice(0, limit).map((entry) => entry.candidate);
}
