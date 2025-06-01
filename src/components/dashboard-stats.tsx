"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, DollarSign, ShoppingCart } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
}

function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
}: StatCardProps) {
  const changeColor = {
    positive: "text-green-600 dark:text-green-400",
    negative: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400",
  }[changeType];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </div>
        {change && <p className={`text-xs ${changeColor} mt-1`}>{change}</p>}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  recentOrders: number;
}

export function DashboardStats({
  totalProducts,
  totalValue,
  lowStockItems,
  recentOrders,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      change: "+2.5% from last month",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "Total Inventory Value",
      value: `$${totalValue.toLocaleString()}`,
      change: "+12.3% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Low Stock Items",
      value: lowStockItems,
      change: lowStockItems > 0 ? "Requires attention" : "All items in stock",
      changeType:
        lowStockItems > 0 ? ("negative" as const) : ("positive" as const),
      icon: AlertTriangle,
    },
    {
      title: "Recent Orders",
      value: recentOrders,
      change: "+8.2% from last week",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
