"use client";

import { useQuery } from '@tanstack/react-query';
import { commentsService } from '@/services/comments';
import { timeAgo } from '@/lib/utils';

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const { data: comments = [], isFetching } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentsService.listByPost(postId),
  });

  return (
    <section className="space-y-4">
      {isFetching && <p className="text-sm text-slate-500">Actualizando comentarios...</p>}
      {comments.length === 0 ? (
        <p className="text-sm text-slate-500">Sé la primera persona en comentar.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {comment.author?.name ?? 'Anónimo'}
              </span>
              <span>•</span>
              <span>{timeAgo(comment.createdAt)}</span>
            </div>
            <p className="mt-2 text-slate-700 dark:text-slate-100">{comment.content}</p>
          </div>
        ))
      )}
    </section>
  );
}

