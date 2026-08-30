import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: SelectOption[];
  hideLabel?: boolean;
}

export function Select({
  label,
  id,
  options,
  hideLabel = false,
  className,
  ...props
}: SelectProps) {
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
      <select
        id={id}
        className={cn(
          'w-full appearance-none rounded-md border border-line bg-white py-2.5 pl-3.5 pr-9 text-sm text-ink',
          'transition-colors duration-150 hover:border-muted focus:border-navy',
          // seta desenhada no próprio fundo, sem depender de biblioteca de ícones
          "bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")] bg-[length:12px_8px] bg-[right_0.875rem_center] bg-no-repeat",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
