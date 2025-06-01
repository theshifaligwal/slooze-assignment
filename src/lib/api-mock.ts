import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ROLES } from "@/constants/config";
import type { User } from "@/store/auth-store";
import type { Product } from "@/store/products-store";

// Create axios instance
export const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// Mock data
const mockUsers: Record<string, { user: User; password: string }> = {
  "manager@slooze.com": {
    user: {
      id: "1",
      email: "manager@slooze.com",
      name: "John Manager",
      role: ROLES.MANAGER,
    },
    password: "manager123",
  },
  "keeper@slooze.com": {
    user: {
      id: "2",
      email: "keeper@slooze.com",
      name: "Jane Keeper",
      role: ROLES.STORE_KEEPER,
    },
    password: "keeper123",
  },
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Rice (Basmati)",
    category: "Grains",
    price: 120,
    quantity: 500,
    unit: "kg",
    supplier: "Grain Masters Ltd",
    description: "Premium quality basmati rice",
    expiryDate: "2024-12-31",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Wheat Flour",
    category: "Grains",
    price: 45,
    quantity: 200,
    unit: "kg",
    supplier: "Flour Mills Co",
    description: "All-purpose wheat flour",
    expiryDate: "2024-11-30",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Sugar",
    category: "Sweeteners",
    price: 55,
    quantity: 150,
    unit: "kg",
    supplier: "Sweet Suppliers",
    description: "Refined white sugar",
    expiryDate: "2025-06-30",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Cooking Oil",
    category: "Oils",
    price: 180,
    quantity: 80,
    unit: "L",
    supplier: "Oil Works Ltd",
    description: "Sunflower cooking oil",
    expiryDate: "2024-10-15",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    name: "Salt",
    category: "Spices",
    price: 25,
    quantity: 100,
    unit: "kg",
    supplier: "Salt Co",
    description: "Iodized table salt",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
];

// Initialize mock adapter
const mock = new MockAdapter(api, { delayResponse: 100 });

// Setup mock endpoints
export const setupMockAPI = () => {
  console.log("Setting up mock API endpoints...");

  // Auth endpoints
  mock.onPost("/auth/login").reply((config) => {
    console.log("Mock API: Login request received", config.data);
    const { email, password } = JSON.parse(config.data);
    const userData = mockUsers[email];

    if (userData && userData.password === password) {
      console.log("Mock API: Login successful for", email);
      return [
        200,
        {
          user: userData.user,
          token: `mock-token-${userData.user.id}`,
        },
      ];
    }

    console.log("Mock API: Login failed for", email);
    return [401, { error: "Invalid credentials" }];
  });

  // Products endpoints
  mock.onGet("/products").reply(() => {
    console.log("Mock API: Products request received");
    console.log("Mock API: Returning", mockProducts.length, "products");
    return [200, mockProducts];
  });

  mock.onPost("/products").reply((config) => {
    const productData = JSON.parse(config.data);
    const newProduct: Product = {
      ...productData,
      id: `${mockProducts.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return [201, newProduct];
  });

  mock.onPut(/\/products\/\d+/).reply((config) => {
    const id = config.url?.split("/").pop();
    const productData = JSON.parse(config.data);
    const index = mockProducts.findIndex((p) => p.id === id);

    if (index !== -1) {
      mockProducts[index] = {
        ...mockProducts[index],
        ...productData,
        updatedAt: new Date().toISOString(),
      };
      return [200, mockProducts[index]];
    }

    return [404, { error: "Product not found" }];
  });

  mock.onDelete(/\/products\/\d+/).reply((config) => {
    const id = config.url?.split("/").pop();
    const index = mockProducts.findIndex((p) => p.id === id);

    if (index !== -1) {
      mockProducts.splice(index, 1);
      return [200, { message: "Product deleted successfully" }];
    }

    return [404, { error: "Product not found" }];
  });

  console.log("Mock API initialized with endpoints:", {
    "POST /api/auth/login": "Authentication",
    "GET /api/products": "Get all products",
    "POST /api/products": "Create product",
    "PUT /api/products/:id": "Update product",
    "DELETE /api/products/:id": "Delete product",
  });
};

// Helper function to get categories
export const getCategories = () => {
  return Array.from(new Set(mockProducts.map((product) => product.category)));
};

// Helper function to get mock users for testing
export const getMockUsers = () => mockUsers;
