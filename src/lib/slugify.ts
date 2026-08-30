import { normalize } from '@/lib/utils';

/**
 * Converte um texto em slug de URL.
 * Útil ao criar o nome do arquivo de uma vaga nova:
 * slugify('UX/UI Designer') + '-' + slugify('Empresa XYZ')
 */
export function slugify(value: string): string {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Slug padrão de uma vaga, a partir do cargo e da empresa. */
export function jobSlug(title: string, company: string): string {
  return `${slugify(title)}-${slugify(company)}`;
}
