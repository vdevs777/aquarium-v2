import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

type Link = {
  icon: ReactNode;
  name: string;
  to: string;
  disabled?: boolean;
};

type ConfigCardProps = {
  title: string;
  links: Link[];
  color?: string;
};

export function ConfigCard({ title, links, color }: ConfigCardProps) {
  const router = useRouter();

  return (
    <div className="w-full h-auto flex flex-row">
      <div
        className="h-auto w-1 rounded-tl-[8px] rounded-bl-[8px] drop-shadow-sm bg-primary"
        style={
          color
            ? {
                backgroundColor: color,
              }
            : undefined
        }
      />

      <div className="bg-white py-6 pr-4 pl-7 flex flex-col rounded-tr-[8px] rounded-br-[8px] w-full drop-shadow-sm">
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>

          <div className="flex flex-row flex-wrap gap-10">
            {links.map((link, index) => (
              <button
                onClick={() => router.push(link.to)}
                className={cn(
                  "flex flex-row cursor-pointer items-center gap-1 h-9 relative hover:translate-x-2 transition-transform duration-300 disabled:opacity-50 text-primary",
                )}
                style={
                  color
                    ? {
                        color,
                      }
                    : undefined
                }
                key={index}
                disabled={link.disabled}
              >
                {link.icon}

                <p className="text-sm text-blue-600">{link.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
