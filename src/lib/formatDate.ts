const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Interpreta 'YYYY-MM-DD' como data local, sem deslocamento de fuso. */
export function parseDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

/** "18 de agosto de 2026" */
export function formatFullDate(isoDate: string): string {
  return parseDate(isoDate).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Dias inteiros entre a data e hoje (negativo para datas futuras). */
export function daysSince(isoDate: string, today = new Date()): number {
  const start = parseDate(isoDate).getTime();
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return Math.round((end - start) / MS_PER_DAY);
}

/** "24/08" */
export function formatShortDate(isoDate: string): string {
  const date = parseDate(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

/** "Publicada dia 24/08", "Publicada ontem", "Publicada há 2 dias", ... */
export function formatPublishedAt(isoDate: string, today = new Date()): string {
  const days = daysSince(isoDate, today);

  if (days <= 0) return `Publicada dia ${formatShortDate(isoDate)}`;
  if (days === 1) return 'Publicada ontem';
  if (days < 30) return `Publicada há ${days} dias`;

  const months = Math.floor(days / 30);
  if (months === 1) return 'Publicada há 1 mês';
  if (months < 12) return `Publicada há ${months} meses`;

  return `Publicada em ${formatFullDate(isoDate)}`;
}
