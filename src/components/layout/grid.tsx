import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      default: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: "default",
    align: "stretch",
    justify: "start",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, align, justify, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap, align, justify, className }))}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

// Grid item component
const gridItemVariants = cva("", {
  variants: {
    span: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
      full: "col-span-full",
    },
    start: {
      1: "col-start-1",
      2: "col-start-2",
      3: "col-start-3",
      4: "col-start-4",
      5: "col-start-5",
      6: "col-start-6",
      7: "col-start-7",
      8: "col-start-8",
      9: "col-start-9",
      10: "col-start-10",
      11: "col-start-11",
      12: "col-start-12",
    },
  },
  defaultVariants: {
    span: 1,
  },
});

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, start, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridItemVariants({ span, start, className }))}
        {...props}
      />
    );
  }
);
GridItem.displayName = "GridItem";

// Specialized grid layouts for common patterns
const StatsGrid = React.forwardRef<HTMLDivElement, Omit<GridProps, "cols">>(
  ({ className, ...props }, ref) => (
    <Grid
      ref={ref}
      cols={4}
      gap="md"
      className={cn("", className)}
      {...props}
    />
  )
);
StatsGrid.displayName = "StatsGrid";

const CardsGrid = React.forwardRef<HTMLDivElement, Omit<GridProps, "cols">>(
  ({ className, ...props }, ref) => (
    <Grid
      ref={ref}
      cols={3}
      gap="md"
      className={cn("", className)}
      {...props}
    />
  )
);
CardsGrid.displayName = "CardsGrid";

const DashboardGrid = React.forwardRef<
  HTMLDivElement,
  Omit<GridProps, "cols" | "gap">
>(({ className, ...props }, ref) => (
  <Grid ref={ref} cols={12} gap="lg" className={cn("", className)} {...props} />
));
DashboardGrid.displayName = "DashboardGrid";

export {
  Grid,
  GridItem,
  StatsGrid,
  CardsGrid,
  DashboardGrid,
  gridVariants,
  gridItemVariants,
};
