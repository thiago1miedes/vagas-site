import Link from 'next/link';

import { cn } from '@/lib/utils';

/** Marca do projeto: wordmark simples, sem símbolo. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'text-[17px] font-semibold tracking-tight text-navy transition-colors duration-150 hover:text-indigo',
        className,
      )}
    >
      Vagas<span className="text-muted">Design</span>
    </Link>
  );
}
