import { cn } from "@/lib/utils";
import { Check, X, AlertTriangle, Info } from "lucide-react";

export type StatusType = "success" | "error" | "warning" | "info" | "neutral";

interface StatusProps {
  type: StatusType;
  label?: string;
  variant?: "default" | "inverted";
}

export function Status({ type, label, variant = "default" }: StatusProps) {
  const Icon = {
    success: Check,
    error: X,
    warning: AlertTriangle,
    info: Info,
    neutral: Info,
  }[type];

  const colorMap = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-500",
    info: "text-blue-600",
    neutral: "text-zinc-500",
  };

  const bgMap = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500",
    info: "bg-blue-600",
    neutral: "bg-zinc-400",
  };

  if (variant === "inverted") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full w-6 h-6",
          bgMap[type],
        )}
      >
        <Icon size={14} className="text-white" />
        {label}
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center justify-center", colorMap[type])}
    >
      <Icon size={16} strokeWidth={2} />
    </span>
  );
}
