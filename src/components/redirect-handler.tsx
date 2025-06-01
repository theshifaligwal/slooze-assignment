"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { ROUTES, ROLES } from "@/constants/config";

export function RedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    // Wait for auth state to load
    if (isLoading) return;

    // If user is authenticated, handle redirects
    if (isAuthenticated && user) {
      // Check if there's a redirect URL from login
      const redirectTo = searchParams.get("redirect");

      if (redirectTo) {
        // Validate that the user has permission to access the redirect URL
        const userPermissions = getRolePermissions(user.role);
        const hasPermission = userPermissions.some((route) =>
          redirectTo.startsWith(route)
        );

        if (hasPermission) {
          router.push(redirectTo);
          return;
        }
      }

      // Redirect to appropriate default page based on role
      const defaultRoute = getDefaultRouteForRole(user.role);
      router.push(defaultRoute);
    }
  }, [isAuthenticated, user, isLoading, router, searchParams]);

  return null; // This component doesn't render anything
}

// Helper function to get permissions for a role
function getRolePermissions(role: string): string[] {
  switch (role) {
    case ROLES.MANAGER:
      return ["/dashboard", "/products", "/products/add"];
    case ROLES.STORE_KEEPER:
      return ["/products", "/products/add"];
    default:
      return [];
  }
}

// Helper function to get default route for a role
function getDefaultRouteForRole(role: string): string {
  switch (role) {
    case ROLES.MANAGER:
      return ROUTES.dashboard;
    case ROLES.STORE_KEEPER:
      return ROUTES.products;
    default:
      return ROUTES.login;
  }
}

// Hook for programmatic redirects based on role
export function useRoleBasedRedirect() {
  const router = useRouter();
  const { user } = useAuthStore();

  const redirectToDefault = () => {
    if (user) {
      const defaultRoute = getDefaultRouteForRole(user.role);
      router.push(defaultRoute);
    } else {
      router.push(ROUTES.login);
    }
  };

  const redirectIfUnauthorized = (requiredRoute: string) => {
    if (!user) {
      router.push(ROUTES.login);
      return false;
    }

    const userPermissions = getRolePermissions(user.role);
    const hasPermission = userPermissions.some((route) =>
      requiredRoute.startsWith(route)
    );

    if (!hasPermission) {
      redirectToDefault();
      return false;
    }

    return true;
  };

  return {
    redirectToDefault,
    redirectIfUnauthorized,
    canAccess: (route: string) => {
      if (!user) return false;
      const userPermissions = getRolePermissions(user.role);
      return userPermissions.some((permission) => route.startsWith(permission));
    },
  };
}
