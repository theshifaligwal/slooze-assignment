"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { useProductsStore } from "@/store/products-store";
import { useEffect } from "react";

export default function HomePage() {
  const { login, logout, user, isLoading, error } = useAuthStore();
  const {
    fetchProducts,
    products,
    isLoading: productsLoading,
  } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleTestLogin = async () => {
    await login("manager@slooze.com", "manager123");
  };

  const handleLogout = () => {
    logout();
  };

  const handleRefreshProducts = () => {
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Slooze Setup Test</h1>
          <ThemeToggle />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Test</CardTitle>
              <CardDescription>
                Test the authentication store and mock API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user ? (
                <div>
                  <p className="text-green-600">✅ Logged in as: {user.name}</p>
                  <p>Role: {user.role}</p>
                  <p>Email: {user.email}</p>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="mt-2"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">Not logged in</p>
                  <Button
                    onClick={handleTestLogin}
                    disabled={isLoading}
                    className="mt-2"
                  >
                    {isLoading ? "Logging in..." : "Test Login (Manager)"}
                  </Button>
                  {error && <p className="text-red-600 mt-2">Error: {error}</p>}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products Store Test</CardTitle>
              <CardDescription>
                Test the products store and mock data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <p>Products loaded: {products.length}</p>
                <Button
                  onClick={handleRefreshProducts}
                  disabled={productsLoading}
                  variant="outline"
                  size="sm"
                >
                  {productsLoading ? "Loading..." : "Refresh"}
                </Button>
              </div>
              {products.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-green-600">
                    ✅ Products loaded successfully
                  </p>
                  <div className="text-sm text-gray-600">
                    {products.slice(0, 3).map((product) => (
                      <div key={product.id}>
                        • {product.name} - {product.category}
                      </div>
                    ))}
                    {products.length > 3 && (
                      <div>... and {products.length - 3} more</div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">No products loaded</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Setup Status</CardTitle>
            <CardDescription>Verify all components are working</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span>Next.js App Router</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span>Tailwind CSS & shadcn/ui</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span>Theme Provider (Light/Dark mode)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span>Zustand Stores</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span>Mock API with axios-mock-adapter</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span>TypeScript Configuration</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-gray-600">
          <p>
            🎉 Initial setup complete! Ready to start building the Slooze
            application.
          </p>
          <p className="text-sm mt-2">
            Test credentials: manager@slooze.com / manager123 or
            keeper@slooze.com / keeper123
          </p>
        </div>
      </div>
    </div>
  );
}
