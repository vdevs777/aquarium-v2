import { cn } from "@/lib/utils";

type BoxProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerInfo?: React.ReactNode;
};

export function Box({ title, children, className, headerInfo }: BoxProps) {
  return (
    <div className={cn("border rounded-md px-4 bg-white", className)}>
      <div className="flex-row flex w-full justify-between items-center">
        <div className="flex h-12 items-center font-semibold">{title}</div>
        {headerInfo}
      </div>
      <div className="pb-4">{children}</div>
    </div>
  );
}
