import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const breadcrumbVariants = cva(
  "flex items-center space-x-1 text-sm text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const breadcrumbItemVariants = cva(
  "flex items-center space-x-1 transition-colors",
  {
    variants: {
      variant: {
        default: "hover:text-foreground",
        current: "text-foreground font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof breadcrumbVariants> {}

const Breadcrumb = React.forwardRef<HTMLOListElement, BreadcrumbProps>(
  ({ className, size, ...props }, ref) => (
    <nav aria-label="Breadcrumb">
      <ol
        ref={ref}
        className={cn(breadcrumbVariants({ size, className }))}
        {...props}
      />
    </nav>
  )
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps
  extends React.ComponentPropsWithoutRef<"li">,
    VariantProps<typeof breadcrumbItemVariants> {
  href?: string;
  isCurrentPage?: boolean;
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, variant, href, isCurrentPage, children, ...props }, ref) => {
    const itemVariant = isCurrentPage ? "current" : variant;

    return (
      <li
        ref={ref}
        className={cn(
          breadcrumbItemVariants({ variant: itemVariant, className })
        )}
        {...props}
      >
        {href && !isCurrentPage ? (
          <Link href={href} className="hover:text-foreground transition-colors">
            {children}
          </Link>
        ) : (
          <span aria-current={isCurrentPage ? "page" : undefined}>
            {children}
          </span>
        )}
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn("flex items-center", className)}
    {...props}
  >
    {children ?? <ChevronRight className="h-4 w-4" />}
  </li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-medium text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

// Helper component to build breadcrumbs from path segments
export interface BreadcrumbPath {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbFromPathProps extends BreadcrumbProps {
  paths: BreadcrumbPath[];
  showHome?: boolean;
  homeHref?: string;
}

const BreadcrumbFromPath = React.forwardRef<
  HTMLOListElement,
  BreadcrumbFromPathProps
>(({ paths, showHome = true, homeHref = "/", className, ...props }, ref) => (
  <Breadcrumb ref={ref} className={className} {...props}>
    {showHome && (
      <>
        <BreadcrumbItem href={homeHref}>
          <Home className="h-4 w-4" />
        </BreadcrumbItem>
        {paths.length > 0 && <BreadcrumbSeparator />}
      </>
    )}

    {paths.map((path, index) => {
      const isLast = index === paths.length - 1;

      return (
        <React.Fragment key={index}>
          <BreadcrumbItem
            href={!isLast ? path.href : undefined}
            isCurrentPage={isLast}
          >
            <div className="flex items-center space-x-1">
              {path.icon}
              <span>{path.label}</span>
            </div>
          </BreadcrumbItem>

          {!isLast && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    })}
  </Breadcrumb>
));
BreadcrumbFromPath.displayName = "BreadcrumbFromPath";

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbFromPath,
  breadcrumbVariants,
  breadcrumbItemVariants,
};
