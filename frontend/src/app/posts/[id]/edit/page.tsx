"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PostForm } from '@/components/forms/post-form';
import type { Post } from '@/lib/types';
import { postsService } from '@/services/posts';
import { useProtectedRoute } from '@/hooks/use-protected-route';

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const { token } = useProtectedRoute();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    postsService
      .get(params.id)
      .then(setPost)
      .catch(() => setError('No pudimos cargar el post'));
  }, [params?.id]);

  if (!token) {
    return <p className="text-sm text-slate-500">Redirigiendo al inicio de sesión...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!post) {
    return <p className="text-sm text-slate-500">Cargando contenido...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Editar artículo</h1>
        <p className="text-sm text-slate-500">Realiza ajustes y vuelve a publicar cuando estés listo.</p>
      </div>
      <PostForm initialData={post} onSuccess={(updated) => router.push(`/posts/${updated.id}`)} />
    </div>
  );
}

