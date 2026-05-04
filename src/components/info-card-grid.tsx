import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

interface InfoCardGridProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export function InfoCardGrid({
  children,
  className,
  ...rest
}: InfoCardGridProps) {
  return (
    <div
      className={cn(
        "grid 2xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-5",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
