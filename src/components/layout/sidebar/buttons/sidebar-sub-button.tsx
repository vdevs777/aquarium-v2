import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

interface SidebarSubButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  url: string;
}

export function SidebarSubButton({
  text,
  url,
  className,
  ...rest
}: SidebarSubButtonInterface) {
  const router = useRouter();
  const fixedUrl = url.startsWith("/") ? url : `/${url}`;
  const isActive = router.pathname === fixedUrl;

  return (
    <Link href={fixedUrl} passHref>
      <Button
        {...rest}
        className={cn(
          "relative group w-full h-8 rounded-none flex justify-start gap-4  bg-[#FAFAFA] text-primary hover:bg-zinc-200",
          isActive && "font-bold",
        )}
      >
        <span className={cn("font-normal", isActive && "font-bold", className)}>
          {text}
        </span>
        {isActive ? (
          <span
            className={`absolute right-0 h-full w-1 bg-primary opacity-100`}
          ></span>
        ) : (
          <span
            className={`absolute right-0 h-full w-1 bg-primary opacity-0 group-hover:opacity-100`}
          ></span>
        )}
      </Button>
    </Link>
  );
}
