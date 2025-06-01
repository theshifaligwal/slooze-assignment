"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { ROUTES, ROLES } from "@/constants/config";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    // Wait for auth state to load
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      // Redirect to login if not authenticated
      router.push(ROUTES.login);
    } else {
      // Redirect to appropriate dashboard based on role
      const defaultRoute =
        user.role === ROLES.MANAGER ? ROUTES.dashboard : ROUTES.products;
      router.push(defaultRoute);
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // This should not render as we redirect above, but just in case
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}
