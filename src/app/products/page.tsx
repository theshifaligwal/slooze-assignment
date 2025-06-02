"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  ChevronDown,
  TrendingUp,
  Download,
  Filter,
  CheckCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Sample product data to match the Figma design
interface SampleProduct {
  id: string;
  name: string;
  image: string;
  views: string;
  pricing: string;
  revenue: string;
  manager: string;
  status: "published" | "draft";
}

const initialProducts: SampleProduct[] = [
  {
    id: "1",
    name: "iPhone 12 Pro",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
  {
    id: "2",
    name: "MacBook Pro 2023",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
  {
    id: "3",
    name: "MacBook Pro 2023",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "draft",
  },
  {
    id: "4",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
  {
    id: "5",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "draft",
  },
  {
    id: "6",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
  {
    id: "7",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "draft",
  },
  {
    id: "8",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
  {
    id: "9",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
  {
    id: "10",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "draft",
  },
  {
    id: "11",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
  {
    id: "12",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
  {
    id: "13",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "draft",
  },
  {
    id: "14",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
  {
    id: "15",
    name: "Product Name Place Here",
    image: "/api/placeholder/40/40",
    views: "14,000",
    pricing: "$1,000",
    revenue: "$164,000",
    manager: "Edit",
    status: "published",
  },
];

const ITEMS_PER_PAGE = 10;

// Notification types
type NotificationType = "success" | "info" | "warning" | "error";

interface Notification {
  type: NotificationType;
  title: string;
  description: string;
}

export default function ProductsPage() {
  const router = useRouter();

  // State management
  const [products, setProducts] = useState<SampleProduct[]>(initialProducts);
  const [activeTab, setActiveTab] = useState<"published" | "draft">(
    "published"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<SampleProduct | null>(
    null
  );
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof SampleProduct>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Notification modal state
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Filter and paginate products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        product.status === activeTab &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort products
    filtered.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      const direction = sortDirection === "asc" ? 1 : -1;
      return aValue.localeCompare(bValue) * direction;
    });

    return filtered;
  }, [products, activeTab, searchTerm, sortColumn, sortDirection]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleDeleteClick = (product: SampleProduct) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      // Actually remove the product from state
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));

      // Remove from selected products if it was selected
      setSelectedProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productToDelete.id);
        return newSet;
      });

      // Show success notification
      showNotification(
        "success",
        "Product deleted",
        `"${productToDelete.name}" has been successfully deleted.`
      );

      // Adjust current page if needed
      const newFilteredProducts = products.filter(
        (p) =>
          p.id !== productToDelete.id &&
          p.status === activeTab &&
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const newTotalPages = Math.ceil(
        newFilteredProducts.length / ITEMS_PER_PAGE
      );
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleEditClick = (productId: string) => {
    // Navigate to edit page
    router.push(`/products/edit/${productId}`);
  };

  const handleAddProduct = () => {
    try {
      // Navigate to add product page
      router.push("/products/add");
    } catch (error) {
      console.error("Navigation error:", error);
      showNotification(
        "error",
        "Navigation failed",
        "Unable to navigate to add product page. Please try again."
      );
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(new Set(paginatedProducts.map((p) => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleSort = (column: keyof SampleProduct) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleBulkDelete = () => {
    const selectedCount = selectedProducts.size;

    // Remove selected products
    setProducts((prev) => prev.filter((p) => !selectedProducts.has(p.id)));
    setSelectedProducts(new Set());

    showNotification(
      "success",
      "Products deleted",
      `${selectedCount} product${
        selectedCount > 1 ? "s" : ""
      } deleted successfully.`
    );

    // Adjust current page if needed
    const newFilteredProducts = products.filter(
      (p) =>
        !selectedProducts.has(p.id) &&
        p.status === activeTab &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const newTotalPages = Math.ceil(
      newFilteredProducts.length / ITEMS_PER_PAGE
    );
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const handleDownload = (format: string) => {
    // Simulate download functionality
    const dataToDownload = filteredAndSortedProducts.map((product) => ({
      name: product.name,
      views: product.views,
      pricing: product.pricing,
      revenue: product.revenue,
      status: product.status,
    }));

    // Show success notification
    showNotification(
      "success",
      "Download started",
      `Downloading ${dataToDownload.length} products as ${format.toUpperCase()}`
    );

    // Simulate download process
    console.log(
      `Downloading ${dataToDownload.length} products as ${format}:`,
      dataToDownload
    );
  };

  const handleFilter = (filterType: string) => {
    switch (filterType) {
      case "price-high":
        setSortColumn("pricing");
        setSortDirection("desc");
        break;
      case "price-low":
        setSortColumn("pricing");
        setSortDirection("asc");
        break;
      case "views-high":
        setSortColumn("views");
        setSortDirection("desc");
        break;
      default:
        break;
    }

    showNotification(
      "info",
      "Filter applied",
      `Products sorted by ${filterType.replace("-", " ")}`
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setSortColumn("name");
    setSortDirection("asc");

    showNotification("info", "Filters cleared", "All filters have been reset");
  };

  const handleTabChange = (tab: "published" | "draft") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedProducts(new Set()); // Clear selections when changing tabs
    setSearchTerm(""); // Clear search when changing tabs
  };

  const handleStatusToggle = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              status:
                product.status === "published"
                  ? "draft"
                  : ("published" as "published" | "draft"),
            }
          : product
      )
    );

    const product = products.find((p) => p.id === productId);
    const newStatus = product?.status === "published" ? "draft" : "published";

    showNotification(
      "success",
      "Status updated",
      `"${product?.name}" is now ${newStatus}`
    );
  };

  // Chart component for the sidebar
  const ChartComponent = ({
    title,
    value,
    color,
  }: {
    title: string;
    value: string;
    color: string;
  }) => (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
              </span>
              <div className="flex items-center text-xs">
                <span className="text-green-500 dark:text-green-400 mr-1">
                  ▲
                </span>
                <span className="text-green-500 dark:text-green-400">0%</span>
              </div>
            </div>
          </div>
          <div className="h-20 relative">
            {/* Simple chart representation */}
            <svg className="w-full h-full" viewBox="0 0 300 80">
              <path
                d="M0,60 Q75,40 150,45 T300,35"
                stroke={color}
                strokeWidth="2"
                fill="none"
                className="opacity-80"
              />
              <path
                d="M0,60 Q75,40 150,45 T300,35 L300,80 L0,80 Z"
                fill={`url(#gradient-${title.replace(/\s+/g, "")})`}
                className="opacity-20"
              />
              <defs>
                <linearGradient
                  id={`gradient-${title.replace(/\s+/g, "")}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Nov 20th</span>
              <span>Dec 20th</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const allSelected =
    paginatedProducts.length > 0 &&
    paginatedProducts.every((p) => selectedProducts.has(p.id));
  const someSelected = paginatedProducts.some((p) =>
    selectedProducts.has(p.id)
  );

  // Show notification modal
  const showNotification = (
    type: NotificationType,
    title: string,
    description: string
  ) => {
    setNotification({ type, title, description });
    setNotificationOpen(true);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "info":
        return <Info className="h-6 w-6 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex gap-6 h-[calc(100vh-4rem)]">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Product
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Showing {filteredAndSortedProducts.length} of {products.length}{" "}
                products
              </p>
            </div>
            <Button onClick={handleAddProduct} className="shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleTabChange("published")}
              className={cn(
                "pb-4 px-1 text-sm font-medium border-b-2 transition-colors",
                activeTab === "published"
                  ? "border-primary text-primary dark:text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              )}
            >
              Published (
              {products.filter((p) => p.status === "published").length})
            </button>
            <button
              onClick={() => handleTabChange("draft")}
              className={cn(
                "pb-4 px-1 text-sm font-medium border-b-2 transition-colors",
                activeTab === "draft"
                  ? "border-primary text-primary dark:text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              )}
            >
              Draft ({products.filter((p) => p.status === "draft").length})
            </button>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="pl-10 w-80 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleFilter("price-high")}>
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilter("price-low")}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilter("views-high")}>
                    Views: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={clearFilters}>
                    Clear Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {selectedProducts.size > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  Delete Selected ({selectedProducts.size})
                </Button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDownload("csv")}>
                  Download as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("xlsx")}>
                  Download as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("pdf")}>
                  Download as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Table */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-700">
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={allSelected}
                        ref={(el) => {
                          if (el)
                            el.indeterminate = someSelected && !allSelected;
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </TableHead>
                    <TableHead
                      className="text-gray-600 dark:text-gray-400 font-medium cursor-pointer hover:text-gray-900 dark:hover:text-white"
                      onClick={() => handleSort("name")}
                    >
                      Product Name
                      <TrendingUp
                        className={cn(
                          "h-4 w-4 inline ml-1 transition-transform",
                          sortColumn === "name" &&
                            sortDirection === "desc" &&
                            "rotate-180"
                        )}
                      />
                    </TableHead>
                    <TableHead
                      className="text-gray-600 dark:text-gray-400 font-medium cursor-pointer hover:text-gray-900 dark:hover:text-white"
                      onClick={() => handleSort("views")}
                    >
                      Views
                      <TrendingUp
                        className={cn(
                          "h-4 w-4 inline ml-1 transition-transform",
                          sortColumn === "views" &&
                            sortDirection === "desc" &&
                            "rotate-180"
                        )}
                      />
                    </TableHead>
                    <TableHead
                      className="text-gray-600 dark:text-gray-400 font-medium cursor-pointer hover:text-gray-900 dark:hover:text-white"
                      onClick={() => handleSort("pricing")}
                    >
                      Pricing
                      <TrendingUp
                        className={cn(
                          "h-4 w-4 inline ml-1 transition-transform",
                          sortColumn === "pricing" &&
                            sortDirection === "desc" &&
                            "rotate-180"
                        )}
                      />
                    </TableHead>
                    <TableHead
                      className="text-gray-600 dark:text-gray-400 font-medium cursor-pointer hover:text-gray-900 dark:hover:text-white"
                      onClick={() => handleSort("revenue")}
                    >
                      Revenue
                      <TrendingUp
                        className={cn(
                          "h-4 w-4 inline ml-1 transition-transform",
                          sortColumn === "revenue" &&
                            sortDirection === "desc" &&
                            "rotate-180"
                        )}
                      />
                    </TableHead>
                    <TableHead className="text-gray-600 dark:text-gray-400 font-medium">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="text-gray-500 dark:text-gray-400">
                          {searchTerm
                            ? `No products found for "${searchTerm}"`
                            : `No ${activeTab} products found`}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedProducts.map((product) => (
                      <TableRow
                        key={product.id}
                        className={cn(
                          "border-gray-200 dark:border-gray-700",
                          selectedProducts.has(product.id) &&
                            "bg-blue-50 dark:bg-blue-900/20"
                        )}
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={selectedProducts.has(product.id)}
                            onChange={(e) =>
                              handleSelectProduct(product.id, e.target.checked)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                {product.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </span>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Status:{" "}
                                <span
                                  className={cn(
                                    "font-medium",
                                    product.status === "published"
                                      ? "text-green-600"
                                      : "text-yellow-600"
                                  )}
                                >
                                  {product.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {product.views}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {product.pricing}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {product.revenue}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditClick(product.id)}
                              className="text-primary hover:text-primary/80 p-0 h-auto font-normal"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusToggle(product.id)}
                              className="text-secondary-foreground hover:text-secondary-foreground/80 p-0 h-auto font-normal"
                            >
                              {product.status === "published"
                                ? "Unpublish"
                                : "Publish"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(product)}
                              className="text-destructive hover:text-destructive/80 p-0 h-auto font-normal"
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="border-gray-300 dark:border-gray-600"
              >
                ‹
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-8 h-8 p-0",
                      currentPage === page
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    )}
                  >
                    {page}
                  </Button>
                );
              })}

              {totalPages > 5 && (
                <>
                  <span className="text-gray-400">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className={cn(
                      "w-8 h-8 p-0",
                      currentPage === totalPages
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    )}
                  >
                    {totalPages}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="border-gray-300 dark:border-gray-600"
              >
                ›
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar - Relate Data */}
        <div className="w-80 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Relate Data
          </h2>

          <ChartComponent
            title="Total Views"
            value={products
              .reduce((sum, p) => sum + parseInt(p.views.replace(",", "")), 0)
              .toLocaleString()}
            color="#fbbf24"
          />

          <ChartComponent
            title="Total Sales"
            value={products.length.toLocaleString()}
            color="#3b82f6"
          />

          <ChartComponent
            title="Total Earning"
            value={`$${products
              .reduce(
                (sum, p) => sum + parseInt(p.revenue.replace(/[$,]/g, "")),
                0
              )
              .toLocaleString()}`}
            color="#10b981"
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{productToDelete?.name}
              &rdquo;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification Modal */}
      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {notification && getNotificationIcon(notification.type)}
              {notification?.title}
            </DialogTitle>
            <DialogDescription>{notification?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setNotificationOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
