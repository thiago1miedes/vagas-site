import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-150';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-indigo',
  secondary: 'border border-line bg-transparent text-navy hover:border-navy',
};

/** Classes do botão, para usar também em links (<Link className={...}>). */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  className?: string,
): string {
  return cn(base, variants[variant], className);
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
