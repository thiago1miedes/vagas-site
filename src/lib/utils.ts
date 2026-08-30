/** Marcas de acentuação separadas pela normalização NFD. */
const DIACRITICS = /[\u0300-\u036f]/g;

/** Junta classes condicionais do Tailwind sem depender de bibliotecas. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Remove acentos e normaliza para comparações de busca. */
export function normalize(value: string): string {
  return value.normalize('NFD').replace(DIACRITICS, '').toLowerCase().trim();
}

/** "3 vagas" / "1 vaga" / "Nenhuma vaga". */
export function pluralizeJobs(count: number): string {
  if (count === 0) return 'Nenhuma vaga';
  return count === 1 ? '1 vaga' : `${count} vagas`;
}
