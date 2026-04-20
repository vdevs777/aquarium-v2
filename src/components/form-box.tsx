import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type FormBoxProps = {
  children: ReactNode;
  className?: string;
};

export function FormBox({ children, className }: FormBoxProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-sm w-full md:w-4/5 p-8 space-y-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
