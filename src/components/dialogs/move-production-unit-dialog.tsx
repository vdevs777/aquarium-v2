import { DialogProps } from "@/interfaces/others/DialogProps";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Select } from "../ui/select";
import { SelectController } from "../controllers/select-controller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MoveProductionUnitSchema,
  moveProductionUnitSchema,
} from "@/schemas/move-production-unit-schema";
import { useQuery } from "@tanstack/react-query";
import { productionSectorService } from "@/services/production-sector.service";
import { InputController } from "../controllers/input-controller";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect } from "react";

type MoveProductionUnitDialogProps = DialogProps & {
  onSubmit: (data: MoveProductionUnitSchema) => Promise<void>;
};

export function MoveProductionUnitDialog({
  open,
  onOpenChange,
  onSubmit,
}: MoveProductionUnitDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<MoveProductionUnitSchema>({
    resolver: zodResolver(moveProductionUnitSchema),
  });

  const { data: productionSectors, isLoading: isLoadingProductionSectors } =
    useQuery({
      queryKey: ["production-sectors"],
      queryFn: productionSectorService.getAll,
    });

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Movimentar unidade</DialogTitle>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label>Setor de destino</Label>
            <SelectController
              control={control}
              name="idSetorDestino"
              placeholder="Selecione o setor de destino"
              contentClassName="max-h-72"
              loading={isLoadingProductionSectors}
              options={
                productionSectors?.map((sector) => ({
                  value: String(sector.id),
                  label: sector.nome ?? "Sem nome",
                })) ?? []
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Sequência</Label>
            <InputController
              control={control}
              name="sequencia"
              type="number"
              min="0"
              step="1"
              placeholder="Sequência"
            />
          </div>

          <Button className="w-full" type="submit" loading={isSubmitting}>
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
