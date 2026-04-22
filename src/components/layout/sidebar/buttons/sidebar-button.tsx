import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/router";

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: LucideIcon;
  path: string;
}

export function SidebarButton({
  icon: Icon,
  path,
  text,
  className,
  ...rest
}: SidebarButtonProps) {
  const router = useRouter();

  const isActive = router.asPath.split("?")[0].startsWith(path);

  function handleClick() {
    router.push(path);
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group w-full h-8 rounded-none flex items-center justify-start gap-4 text-sm font-normal px-2  transition-all duration-75",
        isActive ? "bg-primary text-white" : "bg-white text-black",
        "hover:bg-primary hover:text-white",
        className,
      )}
      {...rest}
    >
      <Icon
        strokeWidth={1.5}
        size={20}
        className={cn(
          isActive ? "text-white" : "text-primary",
          "group-hover:text-white",
        )}
      />
      <span
        className={cn(
          "group-hover:text-white",
          isActive ? "text-white" : "text-black",
        )}
      >
        {text}
      </span>
    </button>
  );
}
