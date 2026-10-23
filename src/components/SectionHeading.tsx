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
            'text-micro font-semibold uppercase',
            dark ? 'text-clay-400' : 'text-clay-500',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'mt-4 text-h2 font-display font-normal text-balance',
          dark ? 'text-ivory-50' : 'text-forest-800 dark:text-ivory-100',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-body leading-relaxed text-pretty',
            dark ? 'text-ivory-200/70' : 'text-ink-600 dark:text-ivory-300/70',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
