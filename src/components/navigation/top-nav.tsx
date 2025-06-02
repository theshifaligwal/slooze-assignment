import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Menu, Bell } from "lucide-react";
import { ROUTES } from "@/constants/config";
import { cn } from "@/lib/utils";

interface TopNavProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
  className?: string;
}

export function TopNav({
  onMenuToggle,
  showMenuButton = true,
  className,
}: TopNavProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.login);
  };

  return (
    <nav
      className={cn(
        "bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700",
        className
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            {showMenuButton && (
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={onMenuToggle}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Slooze
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {user?.role.replace("_", " ")}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
