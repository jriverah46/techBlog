"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const baseStyles =
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-400',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-300 dark:bg-slate-800 dark:text-slate-100',
  outline:
    'border border-slate-200 hover:bg-slate-50 text-slate-900 dark:border-slate-700 dark:text-slate-100',
  ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => (
    <button ref={ref} className={cn(baseStyles, variants[variant], className)} {...props} />
  ),
);

Button.displayName = 'Button';

