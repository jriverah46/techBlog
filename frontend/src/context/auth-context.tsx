"use client";

import { createContext, useCallback, useContext, useEffect, useState, useTransition } from 'react';
import { authService, type LoginInput, type RegisterInput } from '@/services/auth';
import type { User } from '@/lib/types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'techblog.auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<{ user: User | null; token: string | null }>({
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    startTransition(() => {
      if (stored) {
        const { user: storedUser, token: storedToken } = JSON.parse(stored);
        setAuthState({ user: storedUser, token: storedToken });
      }
      setIsLoading(false);
    });
  }, []);

  const persist = (nextUser: User | null, nextToken: string | null) => {
    if (nextUser && nextToken) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = useCallback(async (data: LoginInput) => {
    const response = await authService.login(data);
    setAuthState({ user: response.user, token: response.accessToken });
    persist(response.user, response.accessToken);
  }, []);

  const register = useCallback(async (data: RegisterInput) => {
    const response = await authService.register(data);
    setAuthState({ user: response.user, token: response.accessToken });
    persist(response.user, response.accessToken);
  }, []);

  const logout = useCallback(() => {
    setAuthState({ user: null, token: null });
    persist(null, null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

