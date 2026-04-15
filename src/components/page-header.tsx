import { TwColor } from "@/interfaces/TwColor";
import { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  icon: LucideIcon;
  title: string;
  path?: string[];
};

export function PageHeader({ icon: Icon, title, path }: PageHeaderProps) {
  function getFormattedPath(): string {
    if (!path) return "";

    if (path.length === 0) return "";
    if (path.length === 1) return `${path[0]} /`;
    return path.join(" / ");
  }

  return (
    <div className="flex flex-row items-center gap-3 mb-6">
      <div className="size-10 rounded-sm flex items-center justify-center bg-primary">
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
