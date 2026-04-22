import { handleApiError } from "@/api/helpers/handle-api-error";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/useToast";
import { DialogProps } from "@/interfaces/DialogProps";
import { usersService } from "@/services/users.service";
import { useMutation } from "@tanstack/react-query";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

type InviteDialogProps = DialogProps;

export function InviteDialog({ open, onOpenChange }: InviteDialogProps) {
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => usersService.invite(email),
    onSuccess: () => {
      toast({
        title: "Usuário convidado com sucesso!",
        description:
          "O usuário receberá um e-mail com instruções para acessar o sistema.",
      });
      onOpenChange(false);
    },
    onError: (error) => handleApiError(error),
  });

  useEffect(() => {
    if (!open) setEmail("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-3">
        <DialogTitle>Convidar um usuário</DialogTitle>
        <DialogDescription>
          Informe o e-mail do usuário que você deseja convidar
        </DialogDescription>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          <Input
            required
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
          <Button className="w-full" type="submit" loading={isPending}>
            <User /> Convidar usuário
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
