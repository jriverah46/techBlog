"use client";

import Link from 'next/link';
import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Bienvenido de nuevo</h1>
        <p className="mt-2 text-sm text-slate-500">
          ¿Aún no tienes cuenta?{' '}
          <Link href="/register" className="font-semibold text-slate-900 underline dark:text-white">
            Regístrate aquí
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  );
}

