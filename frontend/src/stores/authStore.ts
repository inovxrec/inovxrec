import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Note: This is mock authentication. In production, connect to Lovable Cloud for real JWT auth.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Mock validation
        if (email && password.length >= 6) {
          set({
            isAuthenticated: true,
            user: {
              id: '1',
              username: email.split('@')[0],
              email,
            },
            token: 'mock-jwt-token-' + Date.now(),
          });
          return true;
        }
        return false;
      },
      signup: async (username: string, email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock validation
        if (username && email && password.length >= 6) {
          set({
            isAuthenticated: true,
            user: {
              id: '1',
              username,
              email,
            },
            token: 'mock-jwt-token-' + Date.now(),
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
