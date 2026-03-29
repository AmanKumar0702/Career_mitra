import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, children, hover, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-[#1e293b] shadow-sm transition-all duration-200",
        hover && "cursor-pointer hover:shadow-md hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
