"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values);
      toast.success('Bienvenido de nuevo 👋');
      router.push('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No pudimos iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Correo</label>
        <Input type="email" placeholder="nombre@correo.com" {...register('email')} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Contraseña</label>
        <Input type="password" placeholder="••••••••" {...register('password')} />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
      </Button>
    </form>
  );
}

