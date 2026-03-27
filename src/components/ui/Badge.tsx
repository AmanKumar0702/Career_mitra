import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "gray";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400",
  success: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  danger:  "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  gray:    "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}