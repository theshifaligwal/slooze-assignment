import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const contentContainerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-2xl",
      default: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
    padding: {
      none: "",
      sm: "px-4 py-4",
      default: "px-6 py-6",
      lg: "px-8 py-8",
    },
    spacing: {
      none: "",
      sm: "space-y-4",
      default: "space-y-6",
      lg: "space-y-8",
    },
  },
  defaultVariants: {
    size: "default",
    padding: "default",
    spacing: "default",
  },
});

export interface ContentContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentContainerVariants> {}

const ContentContainer = React.forwardRef<
  HTMLDivElement,
  ContentContainerProps
>(({ className, size, padding, spacing, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        contentContainerVariants({ size, padding, spacing, className })
      )}
      {...props}
    />
  );
});
ContentContainer.displayName = "ContentContainer";

// Specialized containers for different page types
const DashboardContainer = React.forwardRef<
  HTMLDivElement,
  Omit<ContentContainerProps, "size" | "padding">
>(({ className, ...props }, ref) => (
  <ContentContainer
    ref={ref}
    size="xl"
    padding="lg"
    className={cn("", className)}
    {...props}
  />
));
DashboardContainer.displayName = "DashboardContainer";

const FormContainer = React.forwardRef<
  HTMLDivElement,
  Omit<ContentContainerProps, "size">
>(({ className, ...props }, ref) => (
  <ContentContainer
    ref={ref}
    size="lg"
    className={cn("", className)}
    {...props}
  />
));
FormContainer.displayName = "FormContainer";

const AuthContainer = React.forwardRef<
  HTMLDivElement,
  Omit<ContentContainerProps, "size" | "padding">
>(({ className, ...props }, ref) => (
  <ContentContainer
    ref={ref}
    size="sm"
    padding="default"
    className={cn("", className)}
    {...props}
  />
));
AuthContainer.displayName = "AuthContainer";

export {
  ContentContainer,
  DashboardContainer,
  FormContainer,
  AuthContainer,
  contentContainerVariants,
};
