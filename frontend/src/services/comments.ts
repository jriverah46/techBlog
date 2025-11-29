import { apiFetch } from '@/lib/api';
import type { Comment, CreateCommentPayload } from '@/lib/types';

export const commentsService = {
  listByPost: (postId: string) => apiFetch<Comment[]>(`/comments/post/${postId}`),
  create: (token: string, data: CreateCommentPayload) =>
    apiFetch<Comment>('/comments', {
      method: 'POST',
      token,
      body: data,
    }),
  update: (token: string, id: number, content: string) =>
    apiFetch<Comment>(`/comments/${id}`, {
      method: 'PATCH',
      token,
      body: { content },
    }),
  remove: (token: string, id: number) =>
    apiFetch<{ deleted: boolean }>(`/comments/${id}`, {
      method: 'DELETE',
      token,
    }),
};

