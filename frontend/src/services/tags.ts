import { apiFetch } from '@/lib/api';
import type { Tag } from '@/lib/types';

export const tagsService = {
  list: () => apiFetch<Tag[]>('/tags'),
};

