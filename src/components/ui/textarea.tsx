import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: string;
}

function Textarea({ className, error, ...props }: TextareaProps) {
  const hasError = !!error;

  return (
    <textarea
      data-slot="textarea"
      aria-invalid={hasError}
      title={error}
      className={cn(
        "w-full min-h-20 rounded-md border border-input bg-transparent px-2.5 py-2 text-sm text-black shadow-xs outline-none transition-[color,box-shadow]",
        "placeholder:text-muted-foreground",
        "focus:border-primary focus:ring-4 ring-primary/10",
        hasError &&
          "border-destructive focus:border-destructive focus:ring-destructive/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
