import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "bg-muted",
      card: "bg-card border border-border",
      text: "bg-muted/60",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

// Predefined skeleton components for common UI patterns
const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 rounded-lg border bg-card", className)}
    {...props}
  >
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full" />
    </div>
  </div>
));
SkeletonCard.displayName = "SkeletonCard";

const SkeletonTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { rows?: number }
>(({ className, rows = 5, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-3", className)} {...props}>
    {/* Table header */}
    <div className="flex space-x-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
    {/* Table rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    ))}
  </div>
));
SkeletonTable.displayName = "SkeletonTable";

const SkeletonChart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 rounded-lg border bg-card", className)}
    {...props}
  >
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-48 w-full" />
    </div>
  </div>
));
SkeletonChart.displayName = "SkeletonChart";

export {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  SkeletonChart,
  skeletonVariants,
};
