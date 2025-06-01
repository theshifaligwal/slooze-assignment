"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { ROUTES, ROLES } from "@/constants/config";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: typeof ROLES.MANAGER | typeof ROLES.STORE_KEEPER;
  redirectTo?: string;
}

// Define role-based route permissions (must match middleware)
const ROLE_PERMISSIONS = {
  [ROLES.MANAGER]: ["/dashboard", "/products", "/products/add"],
  [ROLES.STORE_KEEPER]: ["/products", "/products/add"],
} as const;

export function AuthGuard({
  children,
  requiredRole,
  redirectTo,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    // Wait for auth state to load
    if (isLoading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
      const loginUrl = `${ROUTES.login}?redirect=${encodeURIComponent(
        pathname
      )}`;
      router.push(loginUrl);
      return;
    }

    // Check role permissions if required
    if (requiredRole && user.role !== requiredRole) {
      const defaultRoute =
        user.role === ROLES.MANAGER ? ROUTES.dashboard : ROUTES.products;
      router.push(redirectTo || defaultRoute);
      return;
    }

    // Check if user has permission for current route
    const userPermissions =
      ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS];
    const hasPermission = userPermissions?.some((route) =>
      pathname.startsWith(route)
    );

    if (!hasPermission) {
      const defaultRoute =
        user.role === ROLES.MANAGER ? ROUTES.dashboard : ROUTES.products;
      router.push(redirectTo || defaultRoute);
      return;
    }
  }, [
    isAuthenticated,
    user,
    isLoading,
    requiredRole,
    redirectTo,
    router,
    pathname,
  ]);

  // Show loading or nothing while checking auth
  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Check role permissions one more time before rendering
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  const userPermissions =
    ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS];
  const hasPermission = userPermissions?.some((route) =>
    pathname.startsWith(route)
  );

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
}

// Specific guards for different roles
export function ManagerGuard({
  children,
  redirectTo,
}: Omit<AuthGuardProps, "requiredRole">) {
  return (
    <AuthGuard requiredRole={ROLES.MANAGER} redirectTo={redirectTo}>
      {children}
    </AuthGuard>
  );
}

export function StoreKeeperGuard({
  children,
  redirectTo,
}: Omit<AuthGuardProps, "requiredRole">) {
  return (
    <AuthGuard requiredRole={ROLES.STORE_KEEPER} redirectTo={redirectTo}>
      {children}
    </AuthGuard>
  );
}

// General authenticated guard (any role)
export function AuthenticatedGuard({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
