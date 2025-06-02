import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pageWrapperVariants = cva("min-h-screen bg-background", {
  variants: {
    variant: {
      default: "bg-background",
      dashboard: "bg-gray-50 dark:bg-gray-900",
      auth: "bg-gradient-to-br from-background to-muted/20",
    },
    padding: {
      none: "",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
});

export interface PageWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageWrapperVariants> {}

const PageWrapper = React.forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pageWrapperVariants({ variant, padding, className }))}
        {...props}
      />
    );
  }
);
PageWrapper.displayName = "PageWrapper";

export { PageWrapper, pageWrapperVariants };
