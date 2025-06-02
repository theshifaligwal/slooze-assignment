# Global Components Documentation

This document outlines all the reusable components created based on the Figma design system for the Slooze application.

## 🔧 Shared UI Components

### Button Component (`/ui/button.tsx`)

Enhanced button component with multiple variants extracted from Figma styles:

- **Variants**: default, destructive, outline, secondary, ghost, link, success, warning, info, gradient, outline-primary, outline-destructive
- **Sizes**: default, sm, lg, xl, icon, icon-sm, icon-lg
- **Features**: Loading states with spinner, disabled states
- **Specialized**: LoadingButton, IconButton

```tsx
import { Button, LoadingButton, IconButton } from "@/components/ui/button"

<Button variant="success" size="lg">Success Button</Button>
<LoadingButton loading={isLoading} loadingText="Saving...">Save</LoadingButton>
<IconButton size="icon-lg"><Plus /></IconButton>
```

### Loading Components (`/ui/spinner.tsx`, `/ui/skeleton.tsx`)

- **Spinner**: Multiple sizes (sm, default, lg, xl) and variants (default, primary, secondary, destructive)
- **Skeleton**: Various skeleton patterns (default, card, text) with predefined layouts
- **Specialized**: SkeletonCard, SkeletonTable, SkeletonChart

```tsx
import { Spinner, Skeleton, SkeletonCard } from "@/components/ui"

<Spinner size="lg" variant="primary" />
<SkeletonCard />
<SkeletonTable rows={5} />
```

### Toast System (`/ui/toast.tsx`)

Comprehensive notification system following Figma color scheme:

- **Variants**: default, success, destructive, warning, info
- **Features**: Icons, titles, descriptions, close buttons
- **Components**: Toast, ToastAction, ToastClose, ToastTitle, ToastDescription, ToastWithIcon

```tsx
import { ToastWithIcon } from "@/components/ui/toast";

<ToastWithIcon
  variant="success"
  title="Success!"
  description="Operation completed successfully"
  onClose={() => {}}
/>;
```

### Breadcrumb Navigation (`/ui/breadcrumb.tsx`)

Accessible breadcrumb navigation styled according to Figma:

- **Components**: Breadcrumb, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage
- **Helper**: BreadcrumbFromPath for easy path-based breadcrumbs
- **Features**: Home icon, custom separators, current page highlighting

```tsx
import { BreadcrumbFromPath } from "@/components/ui/breadcrumb";

<BreadcrumbFromPath
  paths={[{ label: "Products", href: "/products" }, { label: "Add Product" }]}
/>;
```

## 🧭 Navigation Components

### Top Navigation (`/navigation/top-nav.tsx`)

Reusable top navigation bar extracted from dashboard layout:

- **Features**: Logo, mobile menu toggle, notifications, theme toggle, user dropdown
- **Props**: onMenuToggle, showMenuButton, className
- **Styling**: Matches Figma navigation designs exactly

### Sidebar Navigation (`/navigation/sidebar.tsx`)

Pixel-perfect sidebar implementation:

- **Components**: Sidebar, SidebarOverlay, SidebarWithOverlay
- **Features**: Role-based navigation, active states, mobile responsive
- **Styling**: Exact match to Figma sidebar specifications

```tsx
import { SidebarWithOverlay } from "@/components/navigation";

<SidebarWithOverlay
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>;
```

## 📐 Layout Components

### Page Wrapper (`/layout/page-wrapper.tsx`)

Top-level page container following Figma page structure:

- **Variants**: default, dashboard, auth
- **Padding**: none, sm, default, lg
- **Features**: Full-height, background variants

### Content Container (`/layout/content-container.tsx`)

Responsive content containers matching Figma content areas:

- **Sizes**: sm, default, lg, xl, full
- **Variants**: ContentContainer, DashboardContainer, FormContainer, AuthContainer
- **Features**: Responsive padding, consistent spacing

### Grid System (`/layout/grid.tsx`)

Flexible grid system based on Figma layout grids:

- **Components**: Grid, GridItem
- **Specialized**: StatsGrid, CardsGrid, DashboardGrid
- **Features**: Responsive columns, gap control, alignment options

```tsx
import { DashboardGrid, GridItem } from "@/components/layout";

<DashboardGrid>
  <GridItem span={4}>Stats Section</GridItem>
  <GridItem span={8}>Charts Section</GridItem>
</DashboardGrid>;
```

## 📁 Organization

Components are organized in logical directories:

- `/ui/` - Core UI components (buttons, inputs, etc.)
- `/navigation/` - Navigation-specific components
- `/layout/` - Layout and grid components

Each directory has an `index.ts` file for easy importing:

```tsx
// Instead of multiple imports
import { Grid } from "@/components/layout/grid";
import { ContentContainer } from "@/components/layout/content-container";

// Use barrel exports
import { Grid, ContentContainer } from "@/components/layout";
```

## 🎨 Design System Compliance

All components strictly adhere to the Figma design system:

- **Colors**: Use CSS custom properties from theme system
- **Typography**: Match Figma font sizes and weights
- **Spacing**: Consistent padding and margins
- **Shadows**: Exact shadow specifications
- **Border Radius**: Consistent with design language
- **Dark/Light Themes**: Full support for both modes

## 🚀 Usage

These components can be used throughout the application to maintain design consistency and reduce code duplication. They are built with accessibility in mind and follow React best practices.

For specific usage examples, refer to the existing pages in the application where these components are already being used.
