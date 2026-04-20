import { Button } from "@/components/ui/button";
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
    <Button
      onClick={handleClick}
      className={[
        "w-full h-8 rounded-none flex justify-start gap-4 font-normal group",
        "bg-white text-black hover:bg-primary hover:text-white",
        isActive && "bg-primary text-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <Icon
        strokeWidth={1.5}
        size={20}
        className={cn(
          "group-hover:text-white",
          isActive ? "text-white" : "text-primary",
        )}
      />
      {text}
    </Button>
  );
}
