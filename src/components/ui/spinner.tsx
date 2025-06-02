import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin rounded-full border-solid", {
  variants: {
    size: {
      sm: "h-4 w-4 border-2",
      default: "h-6 w-6 border-2",
      lg: "h-8 w-8 border-[3px]",
      xl: "h-12 w-12 border-4",
    },
    variant: {
      default: "border-gray-200 dark:border-gray-700 border-t-primary",
      primary: "border-primary/20 border-t-primary",
      secondary: "border-secondary/20 border-t-secondary-foreground",
      destructive: "border-destructive/20 border-t-destructive",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant, className }))}
        {...props}
      />
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
