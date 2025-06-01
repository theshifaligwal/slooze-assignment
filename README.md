# 🧾 Slooze - Commodities Management System

A comprehensive commodities management system built with Next.js, TypeScript, and modern web technologies. This application provides role-based access control for managing inventory, products, and supplies with both Manager and Store Keeper roles.

## 🚀 Features

- **Role-Based Authentication**: Manager and Store Keeper roles with different permissions
- **Product Management**: Full CRUD operations for commodity products
- **Dark/Light Theme**: Seamless theme switching with persistence
- **Responsive Design**: Mobile-first design following Figma specifications
- **Real-time Updates**: Live data synchronization across the application
- **Mock API**: Development-ready mock endpoints for testing

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **API**: Axios with Mock Adapter (development)
- **Charts**: Recharts
- **Theme**: next-themes
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd slooze
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Test Credentials

The application comes with pre-configured test users:

### Manager Account

- **Email**: `manager@slooze.com`
- **Password**: `manager123`
- **Permissions**: Full access to dashboard and all features

### Store Keeper Account

- **Email**: `keeper@slooze.com`
- **Password**: `keeper123`
- **Permissions**: Limited access (no dashboard access)

## 📁 Project Structure

```
slooze/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Home page (setup test)
│   ├── components/            # Reusable components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── theme-provider.tsx # Theme context provider
│   │   ├── theme-toggle.tsx   # Dark/light mode toggle
│   │   └── mock-api-initializer.tsx # Mock API setup
│   ├── constants/             # Application constants
│   │   └── config.ts          # Configuration constants
│   ├── lib/                   # Utility libraries
│   │   ├── utils.ts           # General utilities
│   │   └── api-mock.ts        # Mock API endpoints
│   └── store/                 # Zustand state stores
│       ├── auth-store.ts      # Authentication state
│       └── products-store.ts  # Products state
└── public/                   # Static assets
```

## 🎨 Design System

The application strictly follows Figma design specifications with:

- **Light & Dark Themes**: Pixel-perfect implementation of both themes
- **Component Library**: shadcn/ui components styled to match designs
- **Responsive Layout**: Mobile-first approach maintaining design integrity
- **Color Palette**: Exact color matching from Figma specifications

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Mock API Endpoints

The development environment includes mock API endpoints:

- `POST /api/auth/login` - User authentication
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### State Management

The application uses Zustand for state management with two main stores:

1. **Auth Store** (`useAuthStore`): Manages user authentication, login/logout, and session persistence
2. **Products Store** (`useProductsStore`): Handles product data, CRUD operations, and filtering