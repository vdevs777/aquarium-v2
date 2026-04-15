import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type FormRowProps = {
  label: string;
  htmlFor?: string;
  labelColSpan?: number;
  inputColSpan?: number;
  children: ReactNode;
};

export function FormRow({
  label,
  htmlFor,
  labelColSpan = 2,
  inputColSpan = 10,
  children,
}: FormRowProps) {
  const colSpanArray = [
    "",
    "md:col-span-1",
    "md:col-span-2",
    "md:col-span-3",
    "md:col-span-4",
    "md:col-span-5",
    "md:col-span-6",
    "md:col-span-7",
    "md:col-span-8",
    "md:col-span-9",
    "md:col-span-10",
    "md:col-span-11",
    "md:col-span-12",
  ];

  const labelClass = colSpanArray[labelColSpan];
  const inputClass = colSpanArray[inputColSpan];

  return (
    <div
      className={cn(
        "flex flex-col gap-1 md:gap-4 md:grid md:grid-cols-12 md:text-end md:items-center",
      )}
    >
      <Label
        className={cn("w-full md:flex md:justify-end", labelClass)}
        htmlFor={htmlFor}
      >
        {label}
      </Label>
      <div className={cn("w-full text-left", inputClass)}>{children}</div>
    </div>
  );
}
