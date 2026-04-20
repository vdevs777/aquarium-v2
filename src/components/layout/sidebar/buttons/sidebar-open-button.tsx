import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import { useRouter } from "next/router";

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
  ...rest
}: SidebarOpenButtonProps) {
  const router = useRouter();
  const path = router.pathname.split("/")[pathSplit];
  const [isSubButtonsVisible, setSubButtonsVisible] = useState(false);

  const toggleSubButtons = () => {
    setSubButtonsVisible(!isSubButtonsVisible);
  };

  return (
    <div className="relative">
      <Button
        className={`w-full h-8 bg-neutral-50 rounded-none flex justify-between hover:text-white hover:bg-primary text-primary group ${
          path === sectionName && `bg-primary hover:bg-primary`
        }`}
        onClick={toggleSubButtons}
        {...rest}
      >
        <div className="flex items-center gap-4">
          <span
            className={`group-hover:text-white ${
              path === sectionName && "text-white"
            }`}
          >
            <Icon strokeWidth="1.5px" width={20} />
          </span>
          <span
            className={`text-primary group-hover:text-white ${
              path === sectionName && `text-white`
            } ${isSubButtonsVisible ? "font-bold" : "font-normal"}`}
          >
            {text}
          </span>
        </div>
        <div className="ml-auto">
          {!isSubButtonsVisible && (
            <ChevronDown
              className={`group-hover:text-white ${
                path === sectionName ? "text-white" : "text-primary"
              }`}
              width={16}
            />
          )}
          {isSubButtonsVisible && (
            <ChevronUp
              className={`group-hover:text-white ${
                path === sectionName ? "text-white" : "text-primary"
              }`}
              width={16}
            />
          )}
        </div>
      </Button>
      {isSubButtonsVisible && children}
    </div>
  );
}
