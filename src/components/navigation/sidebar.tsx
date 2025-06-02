import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { ROUTES, ROLES } from "@/constants/config";
import { LayoutDashboard, Package, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current: boolean;
  roles?: string[];
}

export function Sidebar({ isOpen = true, onClose, className }: SidebarProps) {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const navigation: NavigationItem[] = [
    ...(user?.role === ROLES.MANAGER
      ? [
          {
            name: "Dashboard",
            href: ROUTES.dashboard,
            icon: LayoutDashboard,
            current: pathname === ROUTES.dashboard,
          },
        ]
      : []),
    {
      name: "Products",
      href: ROUTES.products,
      icon: Package,
      current:
        pathname.startsWith(ROUTES.products) && pathname !== ROUTES.addProduct,
    },
    {
      name: "Add Product",
      href: ROUTES.addProduct,
      icon: Plus,
      current: pathname === ROUTES.addProduct,
    },
  ];

  return (
    <aside
      className={cn(
        `
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-200 ease-in-out
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 
        shadow-lg lg:shadow-none border-r border-gray-200 dark:border-gray-700
        pt-16 lg:pt-0
        `,
        className
      )}
    >
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    item.current
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                  onClick={onClose}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

// Overlay component for mobile
interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarOverlay({ isOpen, onClose }: SidebarOverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      onClick={onClose}
    />
  );
}

// Complete sidebar with overlay for mobile
interface SidebarWithOverlayProps extends SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarWithOverlay({
  isOpen,
  onClose,
  ...sidebarProps
}: SidebarWithOverlayProps) {
  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} {...sidebarProps} />
      <SidebarOverlay isOpen={isOpen} onClose={onClose} />
    </>
  );
}
