"use client";

import Link from 'next/link';
import { Post } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/lib/utils';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>{post.author?.name}</span>
        <span>•</span>
        <span>{timeAgo(post.createdAt)}</span>
        {post.status === 'draft' && (
          <>
            <span>•</span>
            <span className="text-amber-500">Borrador</span>
          </>
        )}
      </div>
      <Link href={`/posts/${post.id}`} className="mt-2 block">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{post.title}</h2>
        {post.excerpt && <p className="mt-2 line-clamp-2 text-slate-600 dark:text-slate-300">{post.excerpt}</p>}
      </Link>
      {post.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag.id}>#{tag.name}</Badge>
          ))}
        </div>
      ) : null}
    </article>
  );
}

