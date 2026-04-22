import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

interface SidebarOpenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: LucideIcon;
  sectionName: string;
  pathSplit?: number;
}

export function SidebarOpenButton({
  text,
  icon: Icon,
  children,
  sectionName,
  pathSplit = 2,
  className,
  ...rest
}: SidebarOpenButtonProps) {
  const router = useRouter();
  const path = router.pathname.split("/")[pathSplit];

  const [isOpen, setIsOpen] = useState(false);

  const isActive = path === sectionName;

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className={cn(
          "w-full h-8 rounded-none flex items-center justify-between font-normal group px-2 transition-all duration-75",
          "bg-white text-black hover:bg-primary hover:text-white",
          isActive && "bg-primary text-white",
          className,
        )}
        {...rest}
      >
        <div className="flex items-center gap-4">
          <Icon
            strokeWidth={1.5}
            size={20}
            className={cn(
              "group-hover:text-white",
              isActive ? "text-white" : "text-primary",
            )}
          />

          <span
            className={cn(
              "group-hover:text-white text-sm",
              isActive ? "text-white" : "text-black",
              isOpen ? "font-bold" : "font-normal",
            )}
          >
            {text}
          </span>
        </div>

        {isOpen ? (
          <ChevronUp
            size={16}
            className={cn(
              "group-hover:text-white",
              isActive ? "text-white" : "text-primary",
            )}
          />
        ) : (
          <ChevronDown
            size={16}
            className={cn(
              "group-hover:text-white",
              isActive ? "text-white" : "text-primary",
            )}
          />
        )}
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
