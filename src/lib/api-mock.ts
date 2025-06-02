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
    name: "iPhone 12 Pro",
    category: "Electronics",
    price: 1000,
    quantity: 50,
    unit: "pcs",
    supplier: "Apple Store",
    description: "Latest iPhone with Pro camera system",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "MacBook Pro 2023",
    category: "Electronics",
    price: 2500,
    quantity: 25,
    unit: "pcs",
    supplier: "Apple Store",
    description: "High-performance laptop for professionals",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Samsung Galaxy S23",
    category: "Electronics",
    price: 800,
    quantity: 30,
    unit: "pcs",
    supplier: "Samsung Electronics",
    description: "Premium Android smartphone",
    expiryDate: "2025-12-31",
    status: "draft",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Dell XPS 13",
    category: "Electronics",
    price: 1200,
    quantity: 15,
    unit: "pcs",
    supplier: "Dell Technologies",
    description: "Ultrabook with premium build quality",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    name: "Sony WH-1000XM4",
    category: "Electronics",
    price: 350,
    quantity: 40,
    unit: "pcs",
    supplier: "Sony Corporation",
    description: "Premium noise-canceling headphones",
    expiryDate: "2025-12-31",
    status: "draft",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "6",
    name: "iPad Air",
    category: "Electronics",
    price: 600,
    quantity: 35,
    unit: "pcs",
    supplier: "Apple Store",
    description: "Versatile tablet for work and creativity",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z",
  },
  {
    id: "7",
    name: "Microsoft Surface Pro",
    category: "Electronics",
    price: 900,
    quantity: 20,
    unit: "pcs",
    supplier: "Microsoft Corporation",
    description: "2-in-1 laptop tablet hybrid",
    expiryDate: "2025-12-31",
    status: "draft",
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-07T00:00:00Z",
  },
  {
    id: "8",
    name: "Nintendo Switch",
    category: "Electronics",
    price: 300,
    quantity: 60,
    unit: "pcs",
    supplier: "Nintendo Co.",
    description: "Hybrid gaming console",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "9",
    name: "AirPods Pro",
    category: "Electronics",
    price: 250,
    quantity: 80,
    unit: "pcs",
    supplier: "Apple Store",
    description: "Wireless earbuds with ANC",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-09T00:00:00Z",
  },
  {
    id: "10",
    name: 'Samsung Monitor 27"',
    category: "Electronics",
    price: 400,
    quantity: 25,
    unit: "pcs",
    supplier: "Samsung Electronics",
    description: "4K UHD monitor for productivity",
    expiryDate: "2025-12-31",
    status: "draft",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "11",
    name: "Logitech MX Master 3",
    category: "Electronics",
    price: 100,
    quantity: 50,
    unit: "pcs",
    supplier: "Logitech International",
    description: "Advanced wireless mouse",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z",
  },
  {
    id: "12",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 150,
    quantity: 40,
    unit: "pcs",
    supplier: "Keychron",
    description: "RGB mechanical gaming keyboard",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "13",
    name: "Webcam HD",
    category: "Electronics",
    price: 80,
    quantity: 30,
    unit: "pcs",
    supplier: "Logitech International",
    description: "1080p HD webcam for streaming",
    expiryDate: "2025-12-31",
    status: "draft",
    createdAt: "2024-01-13T00:00:00Z",
    updatedAt: "2024-01-13T00:00:00Z",
  },
  {
    id: "14",
    name: "External SSD 1TB",
    category: "Electronics",
    price: 120,
    quantity: 45,
    unit: "pcs",
    supplier: "Samsung Electronics",
    description: "Portable external storage device",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
  },
  {
    id: "15",
    name: "Power Bank 20000mAh",
    category: "Electronics",
    price: 50,
    quantity: 70,
    unit: "pcs",
    supplier: "Anker Innovations",
    description: "High-capacity portable charger",
    expiryDate: "2025-12-31",
    status: "published",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
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
