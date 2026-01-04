import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        try {
          const response = await api.post('/auth/login/', { email, password });

          if (response.data && response.data.tokens) {
            set({
              isAuthenticated: true,
              user: response.data.user,
              token: response.data.tokens.access,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },
      signup: async (username: string, email: string, password: string) => {
        try {
          // Django requires confirm_password
          const response = await api.post('/auth/register/', {
            username,
            email,
            password,
            confirm_password: password
          });

          if (response.data && response.data.tokens) {
            set({
              isAuthenticated: true,
              user: response.data.user,
              token: response.data.tokens.access,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Signup failed:', error);
          return false;
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
        localStorage.removeItem('auth-storage'); // Optional: clear persisted state
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

