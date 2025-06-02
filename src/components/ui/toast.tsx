import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100",
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = "Toast";

const ToastAction = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";

const ToastClose = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
));
ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = "ToastDescription";

// Helper component with icon based on variant
interface ToastWithIconProps
  extends React.ComponentPropsWithoutRef<typeof Toast> {
  variant?: "default" | "success" | "destructive" | "warning" | "info";
  title?: string;
  description?: string;
  onClose?: () => void;
}

const ToastWithIcon = React.forwardRef<
  React.ElementRef<typeof Toast>,
  ToastWithIconProps
>(
  (
    {
      variant = "default",
      title,
      description,
      onClose,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const getIcon = () => {
      switch (variant) {
        case "success":
          return (
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          );
        case "destructive":
          return (
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          );
        case "warning":
          return (
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          );
        case "info":
          return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
        default:
          return <Info className="h-5 w-5 text-muted-foreground" />;
      }
    };

    return (
      <Toast ref={ref} variant={variant} className={className} {...props}>
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
            {children}
          </div>
        </div>
        {onClose && <ToastClose onClick={onClose} />}
      </Toast>
    );
  }
);
ToastWithIcon.displayName = "ToastWithIcon";

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
  ToastWithIcon,
  toastVariants,
};
