"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useProductsStore, Product } from "@/store/products-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Package, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FormData {
  name: string;
  category: string;
  price: string;
  quantity: string;
  unit: string;
  supplier: string;
  description: string;
  expiryDate: string;
}

interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  quantity?: string;
  unit?: string;
  supplier?: string;
}

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const { products, updateProduct, isLoading, fetchProducts } =
    useProductsStore();

  const [productId, setProductId] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    supplier: "",
    description: "",
    expiryDate: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  const categories = [
    "Electronics",
    "Food & Beverages",
    "Clothing",
    "Home & Garden",
    "Health & Beauty",
    "Sports & Recreation",
    "Books & Media",
    "Office Supplies",
    "Automotive",
    "Other",
  ];

  const units = [
    "pcs",
    "kg",
    "g",
    "lbs",
    "oz",
    "l",
    "ml",
    "m",
    "cm",
    "ft",
    "in",
    "box",
    "pack",
    "bottle",
    "jar",
    "bag",
  ];

  useEffect(() => {
    const initializeComponent = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };

    initializeComponent();
  }, [params]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;

      if (products.length === 0) {
        await fetchProducts();
      }

      const foundProduct = products.find((p) => p.id === productId);

      if (foundProduct) {
        setProduct(foundProduct);
        setFormData({
          name: foundProduct.name,
          category: foundProduct.category,
          price: foundProduct.price.toString(),
          quantity: foundProduct.quantity.toString(),
          unit: foundProduct.unit,
          supplier: foundProduct.supplier,
          description: foundProduct.description || "",
          expiryDate: foundProduct.expiryDate || "",
        });
      }

      setIsLoadingProduct(false);
    };

    loadProduct();
  }, [productId, products, fetchProducts]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (
      isNaN(Number(formData.quantity)) ||
      Number(formData.quantity) < 0
    ) {
      newErrors.quantity = "Quantity must be a valid non-negative number";
    }

    if (!formData.unit) {
      newErrors.unit = "Unit is required";
    }

    if (!formData.supplier.trim()) {
      newErrors.supplier = "Supplier is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !product) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProduct(product.id, {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        unit: formData.unit,
        supplier: formData.supplier.trim(),
        description: formData.description.trim() || undefined,
        expiryDate: formData.expiryDate || undefined,
      });

      router.push("/products");
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        unit: product.unit,
        supplier: product.supplier,
        description: product.description || "",
        expiryDate: product.expiryDate || "",
      });
      setErrors({});
    }
  };

  if (isLoadingProduct) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading product...
          </span>
        </div>
      </DashboardLayout>
    );
  }

  if (!product) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 dark:text-red-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            Product not found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The product you&apos;re looking for doesn&apos;t exist or has been
            deleted.
          </p>
          <div className="mt-6">
            <Link href="/products">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/products">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Edit Product
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update product information for {product.name}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Package className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Product Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                      errors.name ? "border-red-500 dark:border-red-400" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${
                        errors.category
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}
                    >
                      <SelectValue
                        placeholder="Select category"
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description (optional)"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Price ($) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                      errors.price ? "border-red-500 dark:border-red-400" : ""
                    }`}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.price}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="quantity"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Quantity *
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange("quantity", e.target.value)
                    }
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                      errors.quantity
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.quantity}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="unit"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Unit *
                  </Label>
                  <Select
                    value={formData.unit}
                    onValueChange={(value) => handleInputChange("unit", value)}
                  >
                    <SelectTrigger
                      className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${
                        errors.unit ? "border-red-500 dark:border-red-400" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder="Select unit"
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      {units.map((unit) => (
                        <SelectItem
                          key={unit}
                          value={unit}
                          className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.unit && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.unit}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplier & Additional Info */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Supplier & Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="supplier"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Supplier *
                  </Label>
                  <Input
                    id="supplier"
                    placeholder="Enter supplier name"
                    value={formData.supplier}
                    onChange={(e) =>
                      handleInputChange("supplier", e.target.value)
                    }
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                      errors.supplier
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                  />
                  {errors.supplier && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.supplier}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="expiryDate"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Expiry Date
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Metadata */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Created:
                  </span>{" "}
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Last Updated:
                  </span>{" "}
                  {new Date(product.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Reset Changes
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Update Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
