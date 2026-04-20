import { Sprout } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { env } from "@/env";

type PopulateButtonProps = {
  onClick?: () => void;
};

export function PopulateButton({ onClick }: PopulateButtonProps) {
  if (env.NEXT_PUBLIC_API_MODE !== "mock") return null;

  return (
    <Button variant="outline" onClick={onClick}>
      <Sprout />
      Popular tabela
    </Button>
  );
}
