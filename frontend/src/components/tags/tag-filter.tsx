"use client";

import { useQuery } from '@tanstack/react-query';
import { tagsService } from '@/services/tags';
import { Badge } from '@/components/ui/badge';

interface TagFilterProps {
  selected: number[];
  onToggle: (id: number) => void;
}

export function TagFilter({ selected, onToggle }: TagFilterProps) {
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: tagsService.list,
  });

  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = selected.includes(tag.id);
        return (
          <button
            key={tag.id}
            onClick={() => onToggle(tag.id)}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 rounded-full"
          >
            <Badge
              className={
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'cursor-pointer border border-transparent hover:border-slate-200'
              }
            >
              #{tag.name}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}

