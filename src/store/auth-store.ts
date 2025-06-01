import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AUTH_CONFIG, ROLES } from "@/constants/config";
import { api } from "@/lib/api-mock";

export interface User {
  id: string;
  email: string;
  name: string;
  role: typeof ROLES.MANAGER | typeof ROLES.STORE_KEEPER;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.post("/auth/login", { email, password });
          const data = response.data;

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          let errorMessage = "Login failed";

          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (
            typeof error === "object" &&
            error !== null &&
            "response" in error
          ) {
            const axiosError = error as {
              response?: { data?: { error?: string } };
            };
            errorMessage = axiosError.response?.data?.error || "Login failed";
          }

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: !!user });
      },

      setToken: (token: string) => {
        set({ token });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: AUTH_CONFIG.tokenKey,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
