import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { useRouter } from "next/router";

type CreateButtonProps = {
  children?: string | ReactNode;
  onClick?: () => void;
};

export function CreateButton({
  children = "Cadastrar novo",
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
    <Button variant="outline" onClick={onClickOrDefault}>
      <Plus />
      {children}
    </Button>
  );
}
