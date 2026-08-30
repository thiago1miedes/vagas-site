import { cn } from '@/lib/utils';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Sempre obrigatório: mesmo escondido, o campo precisa de rótulo. */
  label: string;
  id: string;
  /** Esconde o rótulo visualmente, mantendo-o para leitores de tela. */
  hideLabel?: boolean;
  size?: 'md' | 'lg';
}

export function Input({
  label,
  id,
  hideLabel = false,
  size = 'md',
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={cn(
          'mb-2 block text-sm font-medium text-slate',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </label>
      <input
        id={id}
        className={cn(
          'w-full rounded-md border border-line bg-white text-ink placeholder:text-muted',
          'transition-colors duration-150 hover:border-muted focus:border-navy',
          size === 'lg' ? 'px-4 py-4 text-base' : 'px-3.5 py-2.5 text-sm',
          className,
        )}
        {...props}
      />
    </div>
  );
}
