"use client";

import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '@/hooks/use-protected-route';
import { PostForm } from '@/components/forms/post-form';

export default function NewPostPage() {
  const router = useRouter();
  const { token } = useProtectedRoute();

  if (!token) {
    return (
      <p className="text-sm text-slate-500">
        Redirigiendo al inicio de sesión...
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Nuevo artículo</h1>
        <p className="text-sm text-slate-500">
          Comparte conocimientos con la comunidad. Puedes publicarlo de inmediato o guardarlo como borrador.
        </p>
      </div>
      <PostForm onSuccess={(post) => router.push(`/posts/${post.id}`)} />
    </div>
  );
}

