import { cn } from '@/lib/utils';

/** Etiqueta discreta, usada para categorias e informações curtas. */
export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line px-2.5 py-1',
        'text-[11px] font-semibold uppercase tracking-eyebrow text-navy',
        className,
      )}
    >
      {children}
    </span>
  );
}
