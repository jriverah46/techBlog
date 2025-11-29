import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: string | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: enUS,
  });
}

