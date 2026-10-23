import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Reveal } from './Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  dark = false,
}: Props) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.18em]',
            dark ? 'text-clay-300' : 'text-clay-500',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'mt-3 text-h2 font-display',
          dark ? 'text-ivory-50' : 'text-forest-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed',
            dark ? 'text-ivory-200/80' : 'text-ink-500',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
