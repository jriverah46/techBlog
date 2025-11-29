"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/posts/new', label: 'Nuevo Post', protected: true },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-white">
          TechBlog
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((link) => {
            if (link.protected && !user) return null;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white',
                  pathname === link.href && 'text-slate-900 dark:text-white',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-600 dark:text-slate-200">
                Hola, <span className="font-semibold">{user.name}</span>
              </span>
              <Button variant="outline" onClick={logout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push('/login')}>
                Ingresar
              </Button>
              <Button onClick={() => router.push('/register')}>Crear cuenta</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

