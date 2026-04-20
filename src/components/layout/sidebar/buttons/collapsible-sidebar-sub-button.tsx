import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/router";

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
  const [isSubButtonsVisible, setSubButtonsVisible] = useState(false);
  const router = useRouter();
  const path = router.pathname.split("/")[3];

  const toggleSubButtons = () => {
    setSubButtonsVisible(!isSubButtonsVisible);
  };

  return (
    <>
      <Button
        className={`bg-primary ${
          isSubButtonsVisible ? "font-bold" : "font-normal"
        } relative group w-full h-8 rounded-none flex justify-start gap-4  bg-[#FAFAFA] text-slate-800 hover:bg-zinc-200`}
        onClick={toggleSubButtons}
      >
        <div className="flex items-center gap-4">
          <span
            className={`ml-9 ${
              path === subSectionName ? "font-bold" : "font-normal"
            }`}
          >
            {text}
          </span>
        </div>
        <div className="ml-auto">
          {!isSubButtonsVisible && (
            <ChevronDown className="text-gray-600 " width={16} />
          )}
          {isSubButtonsVisible && (
            <ChevronUp className="text-gray-600 " width={16} />
          )}
        </div>
        {path === subSectionName ? (
          <span
            className={`absolute right-0 h-full w-1 bg-primary opacity-100`}
          ></span>
        ) : (
          <span
            className={`absolute right-0 h-full w-1 bg-primary opacity-0 group-hover:opacity-100`}
          ></span>
        )}
      </Button>
      {isSubButtonsVisible && <>{children}</>}
    </>
  );
}
