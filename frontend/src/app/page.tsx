import Link from 'next/link';
import { PostExplorer } from '@/components/posts/post-explorer';

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Comunidad Tech</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
          Comparte artículos técnicos, descubre tendencias y conecta con la comunidad.
        </h1>
        <p className="mt-4 text-lg text-slate-200">
          TechBlog es una plataforma creada para quienes viven, aprenden y respiran tecnología.
Aquí podrás explorar artículos actualizados, descubrir novedades del mundo tech, y formar parte de una comunidad apasionada por la innovación.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/posts/new"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Crear un artículo
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>

      <PostExplorer />
    </div>
  );
}
