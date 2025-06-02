import { create } from "zustand";
import { api } from "@/lib/api-mock";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  supplier: string;
  description?: string;
  expiryDate?: string;
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
}

interface ProductsActions {
  fetchProducts: () => Promise<void>;
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type ProductsStore = ProductsState & ProductsActions;

export const useProductsStore = create<ProductsStore>((set) => ({
  // Initial state
  products: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "",

  // Actions
  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/products");
      const products = response.data;

      set({
        products,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch products";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };
        errorMessage =
          axiosError.response?.data?.error || "Failed to fetch products";
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/products", productData);
      const newProduct = response.data;

      set((state) => ({
        products: [...state.products, newProduct],
        isLoading: false,
        error: null,
      }));
    } catch (error: unknown) {
      let errorMessage = "Failed to add product";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };
        errorMessage =
          axiosError.response?.data?.error || "Failed to add product";
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.put(`/products/${id}`, productData);
      const updatedProduct = response.data;

      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? updatedProduct : product
        ),
        isLoading: false,
        error: null,
      }));
    } catch (error: unknown) {
      let errorMessage = "Failed to update product";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };
        errorMessage =
          axiosError.response?.data?.error || "Failed to update product";
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await api.delete(`/products/${id}`);

      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        isLoading: false,
        error: null,
      }));
    } catch (error: unknown) {
      let errorMessage = "Failed to delete product";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };
        errorMessage =
          axiosError.response?.data?.error || "Failed to delete product";
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },

  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Computed selectors
export const useFilteredProducts = () => {
  const { products, searchTerm, selectedCategory } = useProductsStore();

  return products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
};
