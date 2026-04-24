import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { useRouter } from "next/router";

type CreateButtonProps = {
  children?: string | ReactNode;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null
    | undefined;
  onClick?: () => void;
};

export function CreateButton({
  children = "Cadastrar novo",
  variant = "outline",
  onClick,
}: CreateButtonProps) {
  const router = useRouter();

  const onClickOrDefault = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("create");
    }
  };

  return (
    <Button variant={variant} onClick={onClickOrDefault}>
      <Plus />
      {children}
    </Button>
  );
}
