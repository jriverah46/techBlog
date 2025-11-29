import { notFound } from 'next/navigation';
import { API_URL } from '@/lib/config';
import type { Post } from '@/lib/types';
import { CommentForm } from '@/components/forms/comment-form';
import { CommentList } from '@/components/comments/comment-list';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { timeAgo } from '@/lib/utils';

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Post no encontrado');
  }
  return res.json();
}

interface PostDetailPageProps {
  params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  let post: Post | null = null;
  try {
    post = await getPost(params.id);
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <article className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="font-semibold text-slate-800 dark:text-slate-100">{post.author?.name}</span>
          <span>•</span>
          <span>{timeAgo(post.createdAt)}</span>
          <span>•</span>
          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
            {post.status === 'published' ? 'Publicado' : 'Borrador'}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{post.title}</h1>
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id}>#{tag.name}</Badge>
            ))}
          </div>
        ) : null}
        <div className="prose max-w-none dark:prose-invert">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <p>
            Última actualización: <strong>{new Date(post.updatedAt).toLocaleString()}</strong>
          </p>
          <Link href={`/posts/${post.id}/edit`} className="text-slate-900 underline dark:text-white">
            Editar
          </Link>
        </div>
      </article>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Comentarios</h2>
          <p className="text-sm text-slate-500">Comparte tu feedback con la comunidad.</p>
          <div className="mt-6">
            <CommentForm postId={post.id} onCreated={() => {}} />
          </div>
        </div>
        <div>
          <CommentList postId={post.id} />
        </div>
      </section>
    </div>
  );
}

