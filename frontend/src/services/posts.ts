import { apiFetch } from '@/lib/api';
import type { CreatePostPayload, Post, UpdatePostPayload } from '@/lib/types';

export const postsService = {
  list: () => apiFetch<Post[]>('/posts'),
  get: (id: string) => apiFetch<Post>(`/posts/${id}`),
  create: (token: string, data: CreatePostPayload) =>
    apiFetch<Post>('/posts', {
      method: 'POST',
      token,
      body: data,
    }),
  update: (token: string, id: string, data: UpdatePostPayload) =>
    apiFetch<Post>(`/posts/${id}`, {
      method: 'PATCH',
      token,
      body: data,
    }),
  remove: (token: string, id: string) =>
    apiFetch<{ deleted: boolean }>(`/posts/${id}`, {
      method: 'DELETE',
      token,
    }),
};

