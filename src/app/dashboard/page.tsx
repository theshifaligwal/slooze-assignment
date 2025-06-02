"use client";

import { useRouter } from "next/navigation";
import { ManagerGuard } from "@/components/auth-guard";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Search,
  Plus,
  TrendingUp,
  MoreHorizontal,
  Eye,
  DollarSign,
  Users,
  Activity,
} from "lucide-react";

// Mock data matching the Figma designs
const overviewData = [
  { month: "Jan", value: 2000 },
  { month: "Feb", value: 1500 },
  { month: "Mar", value: 4500 },
  { month: "Apr", value: 4800 },
  { month: "May", value: 3000 },
  { month: "Jun", value: 2800 },
  { month: "Jul", value: 4200 },
  { month: "Aug", value: 3500 },
  { month: "Sep", value: 3200 },
  { month: "Oct", value: 1800 },
  { month: "Nov", value: 3000 },
  { month: "Dec", value: 3200 },
];

const weeklyEarningData = [
  { day: "Mo", value: 200 },
  { day: "Tu", value: 300 },
  { day: "We", value: 520 },
  { day: "Th", value: 350 },
  { day: "Fr", value: 400 },
  { day: "Sa", value: 450 },
  { day: "Su", value: 300 },
];

const monthlyLineData = [
  { month: "Jan", value: 150 },
  { month: "Feb", value: 200 },
  { month: "Mar", value: 250 },
  { month: "Apr", value: 480 },
  { month: "May", value: 300 },
  { month: "Jun", value: 280 },
  { month: "Jul", value: 350 },
  { month: "Aug", value: 380 },
  { month: "Sep", value: 450 },
  { month: "Oct", value: 420 },
  { month: "Nov", value: 480 },
  { month: "Dec", value: 520 },
];

const subscriptionsLineData = [
  { x: 0, value: 200 },
  { x: 1, value: 250 },
  { x: 2, value: 300 },
  { x: 3, value: 280 },
  { x: 4, value: 250 },
  { x: 5, value: 350 },
  { x: 6, value: 400 },
];

const performersBarData = [
  { value: 150 },
  { value: 200 },
  { value: 300 },
  { value: 250 },
  { value: 400 },
  { value: 350 },
  { value: 450 },
  { value: 380 },
  { value: 300 },
  { value: 420 },
  { value: 480 },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleAddProduct = () => {
    try {
      router.push("/products/add");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <ManagerGuard>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search"
                  className="pl-10 w-80 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-10"
                />
              </div>
              <Button
                onClick={handleAddProduct}
                className="h-10 px-4 shadow-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Earning Card */}
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Total Earning
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      $112,893.00
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+2.1%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <DollarSign className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Views Card */}
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Views
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      +112,893
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+2.1%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Eye className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Sales Card */}
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Total Sales
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      +112,893
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+2.1%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Activity className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscriptions Card */}
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Subscriptions
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      +112,893
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+2.1%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Users className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overview and Recent Sales Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overview Chart - 2/3 width */}
            <Card className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={overviewData} barCategoryGap="20%">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f0f0f0"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                      dataKey="value"
                      fill="#fb923c"
                      radius={[4, 4, 0, 0]}
                      className="dark:fill-blue-500"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Sales - 1/3 width */}
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Sales
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You made 265 sales this month.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        IM
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        Indra Maulana
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        indramaulana@gmail.com
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      +$1500.00
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="space-y-6">
            {/* Stats Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Stats
              </h2>
              <div className="flex items-center space-x-2 text-sm">
                <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-gray-700 dark:text-gray-300">
                  <option>Aug 20th - Sep 20th</option>
                </select>
                <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-gray-700 dark:text-gray-300">
                  <option>compared to</option>
                </select>
                <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-gray-700 dark:text-gray-300">
                  <option>Previous</option>
                </select>
                <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-gray-700 dark:text-gray-300">
                  <option>2024</option>
                </select>
              </div>
            </div>

            {/* First Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Total Earning Line Chart */}
              <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Earning
                  </CardTitle>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    $112,893.00
                  </p>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+2.1%</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      This Week
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={monthlyLineData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Total Earning Bar Chart */}
              <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Earning
                  </CardTitle>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    $112,893.00
                  </p>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+2.1%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={performersBarData}>
                      <Bar
                        dataKey="value"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Second Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Earning */}
              <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Earning
                  </CardTitle>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    $112,893.00
                  </p>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+2.1%</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      This Week
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyEarningData}>
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                      />
                      <Bar
                        dataKey="value"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Subscriptions */}
              <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Subscriptions
                  </CardTitle>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    +112,893
                  </p>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+2.1%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={subscriptionsLineData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#f59e0b", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Second Stats Section */}
            <div className="space-y-6 mt-12">
              {/* Second Stats Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Stats
                </h2>
                <div className="flex items-center space-x-2 text-sm">
                  <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-gray-700 dark:text-gray-300">
                    <option>Aug 20th - Sep 20th</option>
                  </select>
                  <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-gray-700 dark:text-gray-300">
                    <option>compared to</option>
                  </select>
                  <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-gray-700 dark:text-gray-300">
                    <option>Previous</option>
                  </select>
                  <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-gray-700 dark:text-gray-300">
                    <option>2024</option>
                  </select>
                </div>
              </div>

              {/* Three Column Line Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total Earning
                    </CardTitle>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      +112,893
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+2.1%</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart data={monthlyLineData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total Sales
                    </CardTitle>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      +112,893
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-blue-500 font-medium">+2.1%</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart data={monthlyLineData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total Views
                    </CardTitle>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      +112,893
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-yellow-500 font-medium">+2.1%</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart data={monthlyLineData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Section - Three Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Subscriptions Performers */}
              <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Subscriptions Performers
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Previous This Years
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      +500
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500 mx-auto" />
                  </div>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={performersBarData}>
                      <Bar
                        dataKey="value"
                        fill="#10b981"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <Button
                    variant="outline"
                    className="w-full dark:border-gray-700 dark:text-gray-300"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Top Sales Product */}
              <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      Top Sales Product
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage your payments
                    </p>
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="text-xl">
                          {i % 2 === 0 ? "📱" : "💻"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            MacBook Pro
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            09/10/2024
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          $100
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:border-gray-700 dark:text-gray-300"
                    >
                      Previous
                    </Button>
                    <Button size="sm">Next</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment History */}
              <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      Payment History
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage your payments
                    </p>
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white">
                            Success
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            yourmail@gmail.com
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          $100
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:border-gray-700 dark:text-gray-300"
                    >
                      Previous
                    </Button>
                    <Button size="sm">Next</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16 -mx-8 -mb-8">
            <div className="px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand Column */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">O</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Option
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Ease of shopping is our main focus. With powerful search
                    features and customizable filters, you can easily find the
                    products you are looking for.
                  </p>
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                </div>

                {/* Links Columns */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Get Started
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white"
                      >
                        Service
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white"
                      >
                        Affiliate Program
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white"
                      >
                        About Us
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Get Started
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white"
                      >
                        Platform
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white"
                      >
                        Workout Library
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white"
                      >
                        App Design
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Get Started
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white"
                      >
                        About Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Newsletter and Copyright */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Subscribe to Newsletter
                    </h4>
                    <div className="flex max-w-md">
                      <Input
                        placeholder="Enter Your Email Here"
                        className="rounded-r-none border-gray-300 dark:border-gray-600"
                      />
                      <Button className="rounded-l-none">Subscribe</Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <span>2024 MaxFit</span>
                    <a
                      href="#"
                      className="hover:text-gray-900 dark:hover:text-white"
                    >
                      Twitter
                    </a>
                    <a
                      href="#"
                      className="hover:text-gray-900 dark:hover:text-white"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="hover:text-gray-900 dark:hover:text-white"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </DashboardLayout>
    </ManagerGuard>
  );
}
