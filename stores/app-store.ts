import { create } from 'zustand';

/**
 * Example Zustand store for global state management
 * 
 * Usage:
 * import { useAppStore } from '@/stores/app-store';
 * 
 * const { user, setUser } = useAppStore();
 */

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ user: null, isLoading: false }),
}));
