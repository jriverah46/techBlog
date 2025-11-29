export type PostStatus = 'draft' | 'published';

export interface Tag {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  bio?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  status: PostStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  author: User;
  comments?: Comment[];
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  excerpt?: string;
  status?: PostStatus;
  tagIds?: number[];
}

export type UpdatePostPayload = Partial<CreatePostPayload>;

export interface CreateCommentPayload {
  postId: string;
  content: string;
}

