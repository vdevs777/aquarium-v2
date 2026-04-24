import { handleApiError } from "@/api/helpers/handle-api-error";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/useToast";
import { DialogProps } from "@/interfaces/DialogProps";
import { cultureStageService } from "@/services/culture-stage.service";
import { fishFeedService } from "@/services/fish-feed.service";
import { productionUnitModelService } from "@/services/production-unit-model.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProductionUnitModelDialogProps = DialogProps;

export function ProductionUnitModelDialog({
  open,
  onOpenChange,
}: ProductionUnitModelDialogProps) {
  const router = useRouter();
  const { id } = router.query;

  const qc = useQueryClient();

  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const { data: productionUnitModels } = useQuery({
    queryFn: () => productionUnitModelService.getAll(),
    queryKey: ["production-unit-models"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      cultureStageService.addModel(Number(id), Number(selectedModelId!)),
    onSuccess: () => {
      onOpenChange(false);
      setSelectedModelId(null);
      qc.invalidateQueries({
        queryKey: ["culture-stage-production-unit-models", id],
      });
      toast({
        title: "Modelo adicionado com sucesso!",
        description:
          "O modelo de unidade produtiva foi adicionado com sucesso à fase de cultivo.",
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  useEffect(() => {
    if (!open) {
      setSelectedModelId(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-3">
        <DialogTitle>Adicionar modelo de unidade produtiva</DialogTitle>
        <DialogDescription>
          Selecione o modelo de unidade produtiva que você deseja adicionar.
        </DialogDescription>
        <Select
          onValueChange={setSelectedModelId}
          value={selectedModelId ?? undefined}
        >
          <SelectTrigger disabled={isPending}>
            <SelectValue placeholder="Selecione um modelo" />
          </SelectTrigger>
          <SelectContent side="bottom" className="h-80">
            {productionUnitModels?.map((model) => (
              <SelectItem value={String(model.id)} key={model.id}>
                {model.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-row justify-end gap-2">
          <Button
            disabled={!selectedModelId}
            loading={isPending}
            onClick={() => mutate()}
          >
            Adicionar
          </Button>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
