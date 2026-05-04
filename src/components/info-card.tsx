import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/router";
import { HTMLAttributes } from "react";

interface InfoCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  number?: number;
  details?: string;
  link?: string;
  color: string;
  hasBar?: boolean;
}

export function InfoCard({
  icon: Icon,
  number,
  title,
  details,
  link,
  color,
  className,
  hasBar,
  ...rest
}: InfoCardProps) {
  const router = useRouter();

  function redirect() {
    if (link) {
      router.push(link);
    }
    return;
  }

  return (
    <>
      <div className="flex flex-row w-auto">
        <div
          className={cn(
            "h-auto w-1 rounded-tl-[8px] rounded-bl-[8px] drop-shadow-sm",
            hasBar ? "block" : "hidden",
          )}
          style={{
            background: color,
            color: color,
          }}
        >
          .
        </div>
        <div
          className={cn(
            "min-w-full h-22 rounded-md border border-input bg-white flex",
            className,
          )}
          {...rest}
        >
          <div className="flex p-4 flex-col min-w-full gap-2.5">
            <div className="flex w-full items-center gap-2">
              <Icon size={20} style={{ color: color }} />
              <h4 className="font-semibold truncate">{title}</h4>
            </div>
            <div className="flex w-full justify-between items-center">
              <span
                className={cn(
                  "text-blue-500 text-sm",
                  link && "cursor-pointer hover:text-blue-600",
                )}
                onClick={redirect}
              >
                {details}
              </span>
              <span className={`font-bold text-xl`} style={{ color: color }}>
                {number}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
