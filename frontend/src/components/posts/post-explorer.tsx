"use client";

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postsService } from '@/services/posts';
import { Input } from '@/components/ui/input';
import { PostCard } from './post-card';
import { TagFilter } from '../tags/tag-filter';

export function PostExplorer() {
  const { data: posts = [], isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: postsService.list,
  });

  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tagId) => post.tags?.some((tag) => tag.id === tagId));

      return matchesSearch && matchesTags;
    });
  }, [posts, search, selectedTags]);

  const toggleTag = (id: number) => {
    setSelectedTags((prev) => (prev.includes(id) ? prev.filter((tag) => tag !== id) : [...prev, id]));
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Buscar</label>
            <Input
              placeholder="Título, autor o contenido..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Filtrar por etiquetas</label>
            <div className="mt-2">
              <TagFilter selected={selectedTags} onToggle={toggleTag} />
            </div>
          </div>
        </div>
      </div>

      {isFetching && (
        <p className="text-sm text-slate-500 dark:text-slate-400">Cargando publicaciones más recientes...</p>
      )}

      <div className="grid gap-6">
        {filtered.length ? (
          filtered.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No hay artículos que coincidan con tu búsqueda. Intenta con otros filtros.
          </p>
        )}
      </div>
    </section>
  );
}

