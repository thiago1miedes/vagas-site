import { cn } from '@/lib/utils';

/** Largura máxima e respiro lateral padrão de todas as páginas. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-container px-5 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
