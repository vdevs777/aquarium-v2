import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

interface SidebarSubButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  url: string;
  insideCollapsible?: boolean;
}

export function SidebarSubButton({
  text,
  url,
  insideCollapsible = false,
  className,
  style,
  ...rest
}: SidebarSubButtonInterface) {
  const router = useRouter();

  const fixedUrl = url.startsWith("/") ? url : `/${url}`;

  const isActive = router.pathname === fixedUrl;

  return (
    <Link href={fixedUrl} passHref>
      <button
        {...rest}
        style={style}
        className={cn(
          "relative group w-full transition-all duration-75 h-8 rounded-none flex justify-start gap-4 bg-white my-0 text-sm items-center text-black hover:bg-zinc-200",
          isActive && "font-bold",
          insideCollapsible ? "pl-20" : "pl-12",
        )}
      >
        <span className={cn("font-normal", isActive && "font-bold", className)}>
          {text}
        </span>

        <span
          className={cn(
            "absolute right-0 h-full w-1 transition-opacity",
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            "bg-[var(--sidebar-color,hsl(var(--primary)))]",
          )}
        />
      </button>
    </Link>
  );
}
