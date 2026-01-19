import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string, refresh: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (access, refresh) => {
        console.log('Setting tokens:', { access, refresh });
        set({ accessToken: access, refreshToken: refresh });
      },
      clearAuth: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        console.log('Store rehydrated:', state);
      },
    },
  ),
);
