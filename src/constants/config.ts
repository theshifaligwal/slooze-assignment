// Application Configuration Constants

export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "Slooze",
  version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  defaultTheme: process.env.NEXT_PUBLIC_DEFAULT_THEME || "light",
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "5000"),
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API === "true",
} as const;

export const AUTH_CONFIG = {
  tokenKey: process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "slooze_auth_token",
  sessionTimeout: parseInt(
    process.env.NEXT_PUBLIC_SESSION_TIMEOUT || "3600000"
  ),
} as const;

export const ROUTES = {
  login: "/login",
  dashboard: "/dashboard",
  products: "/products",
  addProduct: "/products/add",
  editProduct: (id: string) => `/products/edit/${id}`,
} as const;

export const ROLES = {
  MANAGER: "manager",
  STORE_KEEPER: "store_keeper",
} as const;

export const THEME_STORAGE_KEY = "slooze-theme";
