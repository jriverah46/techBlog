import { apiFetch } from '@/lib/api';
import type { AuthResponse } from '@/lib/types';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const authService = {
  login: (data: LoginInput) =>
    apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: data,
    }),
  register: (data: RegisterInput) =>
    apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: data,
    }),
};

