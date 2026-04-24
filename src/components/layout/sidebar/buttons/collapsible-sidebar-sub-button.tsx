import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

interface CollapsibleSidebarSubButtonInterface {
  text: string;
  children: ReactNode;
  subSectionName: string;
}

export function CollapsibleSidebarSubButton({
  text,
  children,
  subSectionName,
}: CollapsibleSidebarSubButtonInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const path = router.pathname.split("/")[3];
  const isActive = path === subSectionName;

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div>
      <button
        onClick={toggle}
        className={cn(
          "relative group w-full h-8 flex items-center justify-between px-2 pl-12 text-sm transition-all duration-75",
          "bg-white text-black",
          "hover:bg-primary hover:text-white",
        )}
      >
        <span
          className={cn(
            "group-hover:text-white text-black",
            isActive && "font-bold",
          )}
        >
          {text}
        </span>

        {isOpen ? (
          <ChevronUp
            size={16}
            className={cn("text-primary", "group-hover:text-white")}
          />
        ) : (
          <ChevronDown
            size={16}
            className={cn("text-primary", "group-hover:text-white")}
          />
        )}

        {/* barra lateral */}
      </button>

      {/* conteúdo colapsável com animação suave */}
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
