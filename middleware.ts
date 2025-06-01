import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define role-based route permissions
const ROLE_PERMISSIONS = {
  manager: ["/dashboard", "/products", "/products/add"],
  store_keeper: ["/products", "/products/add"],
} as const;

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/login"];

// Protected routes that require authentication
const PROTECTED_ROUTES = ["/dashboard", "/products"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get token from cookie or authorization header
  const token =
    request.cookies.get("slooze_auth_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  // Redirect to login if no token
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Decode the token to get user info (in a real app, you'd verify JWT)
    // For mock purposes, we'll assume token contains user data
    const userData = JSON.parse(atob(token.split(".")[1] || ""));
    const userRole = userData?.role;

    if (!userRole) {
      throw new Error("Invalid token");
    }

    // Check role permissions for the current route
    const allowedRoutes =
      ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS];

    if (!allowedRoutes) {
      // Unknown role - redirect to login
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user has permission for this route
    const hasPermission = allowedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!hasPermission) {
      // Redirect to appropriate default page based on role
      const defaultPage = userRole === "manager" ? "/dashboard" : "/products";
      const redirectUrl = new URL(defaultPage, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // User has permission, allow access
    return NextResponse.next();
  } catch {
    // Invalid token - redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("slooze_auth_token");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
