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

// Helper function to create a JWT-like token for middleware
function createToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    })
  );
  return `${header}.${payload}.signature`;
}

// Helper function to set cookie
function setCookie(name: string, value: string, days: number = 1) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;samesite=lax`;
}

// Helper function to delete cookie
function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

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

          // Create a proper token for middleware
          const token = createToken(data.user);

          // Set cookie for middleware access
          if (typeof window !== "undefined") {
            setCookie(AUTH_CONFIG.tokenKey, token);
          }

          set({
            user: data.user,
            token,
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
        // Delete cookie
        if (typeof window !== "undefined") {
          deleteCookie(AUTH_CONFIG.tokenKey);
        }

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
        // Update cookie when token changes
        if (typeof window !== "undefined") {
          setCookie(AUTH_CONFIG.tokenKey, token);
        }
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
      onRehydrateStorage: () => (state) => {
        // Sync cookie on rehydration
        if (state?.token && typeof window !== "undefined") {
          setCookie(AUTH_CONFIG.tokenKey, state.token);
        }
      },
    }
  )
);
