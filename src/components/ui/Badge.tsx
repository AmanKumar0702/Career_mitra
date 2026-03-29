import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "gray";

const variantStyles: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  default: { bg: "rgba(6,182,212,0.1)",   color: "#22d3ee",  border: "rgba(6,182,212,0.2)"  },
  success: { bg: "rgba(34,197,94,0.1)",   color: "#4ade80",  border: "rgba(34,197,94,0.2)"  },
  warning: { bg: "rgba(234,179,8,0.1)",   color: "#facc15",  border: "rgba(234,179,8,0.2)"  },
  danger:  { bg: "rgba(239,68,68,0.1)",   color: "#f87171",  border: "rgba(239,68,68,0.2)"  },
  gray:    { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "rgba(255,255,255,0.1)" },
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className, children, style, ...props }: BadgeProps) {
  const v = variantStyles[variant];
  return (
    <span
      className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold", className)}
      style={{ background: v.bg, color: v.color, border: `1px solid ${v.border}`, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
