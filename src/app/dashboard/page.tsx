"use client";

import { useEffect, useState } from "react";
import { ManagerGuard } from "@/components/auth-guard";
import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardStats } from "@/components/dashboard-stats";
import { DashboardCharts } from "@/components/dashboard-charts";
import { useProductsStore } from "@/store/products-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardPage() {
  const { products, fetchProducts, isLoading } = useProductsStore();
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    recentOrders: 24,
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      const totalValue = products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );

      const lowStockItems = products.filter(
        (product) => product.quantity < 100
      ).length;

      setDashboardData({
        totalProducts: products.length,
        totalValue,
        lowStockItems,
        recentOrders: 24,
      });
    }
  }, [products]);

  // Get recent products (last 5)
  const recentProducts = products
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  return (
    <ManagerGuard>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back! Here&apos;s what&apos;s happening with your
              inventory.
            </p>
          </div>

          {/* Statistics Cards */}
          <DashboardStats
            totalProducts={dashboardData.totalProducts}
            totalValue={dashboardData.totalValue}
            lowStockItems={dashboardData.lowStockItems}
            recentOrders={dashboardData.recentOrders}
          />

          {/* Charts Section */}
          <DashboardCharts />

          {/* Recent Products Table */}
          <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600 dark:text-gray-400">
                        Product
                      </TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400">
                        Category
                      </TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400">
                        Quantity
                      </TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400">
                        Price
                      </TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {product.category}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {product.quantity} {product.unit}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          ${product.price}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`
                            inline-flex px-2 py-1 text-xs font-medium rounded-full
                            ${
                              product.quantity < 100
                                ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                : product.quantity < 200
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            }
                          `}
                          >
                            {product.quantity < 100
                              ? "Low Stock"
                              : product.quantity < 200
                              ? "Medium Stock"
                              : "In Stock"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ManagerGuard>
  );
}
