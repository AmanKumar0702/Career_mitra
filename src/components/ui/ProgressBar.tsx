import { cn } from "@/lib/utils";

type ProgressColor = "blue" | "green" | "yellow" | "red" | "purple";

const colorClasses: Record<ProgressColor, string> = {
  blue:   "bg-blue-500",
  green:  "bg-green-500",
  yellow: "bg-yellow-500",
  red:    "bg-red-500",
  purple: "bg-purple-500",
};

interface ProgressBarProps {
  value: number;       // current value
  max?: number;        // max value (default 100)
  color?: ProgressColor;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = "blue",
  className,
  showLabel = false,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{value} / {max}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", colorClasses[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}