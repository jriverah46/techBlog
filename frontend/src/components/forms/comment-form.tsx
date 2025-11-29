"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { commentsService } from '@/services/comments';
import { useAuth } from '@/context/auth-context';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const schema = z.object({
  content: z.string().min(3, 'El comentario es muy corto'),
});

type FormValues = z.infer<typeof schema>;

export function CommentForm({ postId }: { postId: string }) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    if (!token) {
      toast.error('Inicia sesión para comentar');
      return;
    }
    try {
      await commentsService.create(token, { postId, content: values.content });
      reset();
      toast.success('Comentario publicado');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No pudimos agregar tu comentario');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Textarea placeholder="Comparte tu opinión..." {...register('content')} />
      {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Publicando...' : 'Comentar'}
      </Button>
    </form>
  );
}

