import { handleApiError } from "@/api/helpers/handle-api-error";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/useToast";
import { DialogProps } from "@/interfaces/others/DialogProps";
import { productionSectorService } from "@/services/production-sector.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type CreateDialogProps = DialogProps;

export function CreateDialog({ open, onOpenChange }: CreateDialogProps) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => productionSectorService.create(name),
    onSuccess: () => {
      toast({
        title: "Setor criado",
        description: "O setor produtivo foi criado com sucesso.",
      });
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ["production-sectors-details"],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  function handleCreate() {
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para o setor produtivo.",
        variant: "destructive",
      });
      return;
    }

    mutate();
  }

  useEffect(() => {
    if (!open) setName("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-4">
        <DialogTitle>Cadastrar setor</DialogTitle>
        <Input
          placeholder="Insira um nome para o setor"
          value={name}
          disabled={isPending}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleCreate} loading={isPending}>
          Cadastrar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
