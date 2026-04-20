import Link from "next/link";
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
};

export function ConfigCard({ title, links }: ConfigCardProps) {
  const router = useRouter();
  return (
    <div className="w-full h-auto flex flex-row">
      <div
        className={cn(
          `h-auto w-1 rounded-tl-[8px] rounded-bl-[8px] drop-shadow-sm`,
          `bg-primary`,
        )}
      ></div>
      <div className="bg-white py-6 pr-4 pl-7 flex flex-col rounded-tr-[8px] rounded-br-[8px] w-full drop-shadow-sm">
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <div className="flex flex-row flex-wrap gap-10">
            {links.map((link, index) => (
              <button
                onClick={() => router.push(link.to)}
                className={cn(
                  "flex flex-row cursor-pointer text-primary items-center gap-1 h-9 relative hover:translate-x-2 transition-transform duration-300 disabled:opacity-50",
                )}
                key={index}
                disabled={link.disabled}
              >
                {link.icon}
                <p className="text-blue-600 text-sm">{link.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
