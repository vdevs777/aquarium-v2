import { cn } from "@/lib/utils";
import { primaryColorHEX } from "@/utils/primary-color";
import { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  icon: LucideIcon;
  title: string;
  path?: string[];
  color?: string;
};

export function PageHeader({
  icon: Icon,
  title,
  path,
  color,
}: PageHeaderProps) {
  function getFormattedPath(): string {
    if (!path) return "";

    if (path.length === 0) return "";
    if (path.length === 1) return `${path[0]} /`;
    return path.join(" / ");
  }

  return (
    <div className="flex flex-row items-center gap-3 mb-6">
      <div
        className={cn("size-10 rounded-sm flex items-center justify-center")}
        style={{
          backgroundColor: color ?? primaryColorHEX,
        }}
      >
        <Icon size={22} className="text-white" />
      </div>
      <div className="flex flex-col justify-center">
        {path && (
          <p className="text-sm text-muted-foreground">{getFormattedPath()}</p>
        )}
        <h1 className="font-bold text-xl">{title}</h1>
      </div>
    </div>
  );
}
