"use client";

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
            'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-micro font-semibold uppercase tracking-[0.14em]',
            dark
              ? 'bg-clay-400/15 text-clay-200'
              : 'bg-sage-100/80 text-sage-700 dark:bg-sage-900/50 dark:text-sage-300',
          )}
        >
          {align === 'center' && <span className={cn('h-1.5 w-1.5 rounded-full', dark ? 'bg-clay-300' : 'bg-clay-400')} />}
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'mt-4 text-h2 font-display font-normal text-balance',
          dark ? 'text-ivory-50' : 'text-sage-800 dark:text-ivory-100',
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
