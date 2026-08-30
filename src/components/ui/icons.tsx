import { cn } from '@/lib/utils';

/**
 * Os poucos ícones usados no site, desenhados à mão para não trazer uma
 * biblioteca inteira por três formas.
 */

/** Lupa posicionada dentro do campo de busca. */
export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted',
        className,
      )}
    >
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m13.5 13.5 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Seta usada nos cards e botões. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn('h-4 w-4', className)}>
      <path
        d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Seta para a esquerda, usada no link "Voltar para vagas". */
export function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn('h-4 w-4', className)}>
      <path
        d="M16 10H5m0 0 4.5-4.5M5 10l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
