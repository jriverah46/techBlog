"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TagFilter } from '@/components/tags/tag-filter';
import { postsService } from '@/services/posts';
import { useAuth } from '@/context/auth-context';
import { toast } from 'sonner';
import type { Post } from '@/lib/types';

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(30, 'El contenido debe tener al menos 30 caracteres'),
  excerpt: z.string().max(280, 'Máximo 280 caracteres').optional(),
  status: z.enum(['draft', 'published']).default('draft'),
});

type FormValues = z.infer<typeof schema>;

interface PostFormProps {
  initialData?: Post;
  onSuccess?: (post: Post) => void;
}

export function PostForm({ initialData, onSuccess }: PostFormProps) {
  const { token } = useAuth();
  const [tagIds, setTagIds] = useState<number[]>(initialData?.tags?.map((tag) => tag.id) ?? []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
      excerpt: initialData?.excerpt ?? '',
      status: initialData?.status ?? 'draft',
    },
  });

  const toggleTag = (id: number) => {
    setTagIds((prev) => (prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id]));
  };

  const onSubmit = async (values: FormValues) => {
    if (!token) {
      toast.error('Inicia sesión para publicar');
      return;
    }
    try {
      const payload = { ...values, tagIds };
      const response = initialData
        ? await postsService.update(token, initialData.id, payload)
        : await postsService.create(token, payload);

      toast.success(initialData ? 'Post actualizado' : 'Post creado');
      onSuccess?.(response);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No pudimos guardar el post');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Título</label>
        <Input placeholder="Ej. Tendencias de IA en 2025" {...register('title')} />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Extracto</label>
        <Textarea placeholder="Resumen corto del artículo" {...register('excerpt')} />
        {errors.excerpt && <p className="mt-1 text-xs text-red-500">{errors.excerpt.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Contenido</label>
        <Textarea placeholder="Comparte tu conocimiento..." {...register('content')} />
        {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Estado</label>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" value="draft" {...register('status')} />
            Borrador
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" value="published" {...register('status')} />
            Publicado
          </label>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Etiquetas</label>
        <div className="mt-2 rounded-xl border border-dashed border-slate-300 p-4 dark:border-slate-700">
          <TagFilter selected={tagIds} onToggle={toggleTag} />
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar post' : 'Publicar'}
      </Button>
    </form>
  );
}

