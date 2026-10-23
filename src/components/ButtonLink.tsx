import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

const variants: Record<Variant, string> = {
  primary:
    'bg-clay-500 text-white hover:bg-clay-600 shadow-sm shadow-clay-900/20',
  secondary:
    'bg-forest-800 text-ivory-50 hover:bg-forest-900 shadow-sm',
  ghost:
    'bg-transparent text-forest-700 hover:bg-forest-50 border border-forest-700/20',
};

type Props = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({ children, href, variant = 'primary', className, onClick }: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98]',
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
