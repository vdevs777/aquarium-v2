import { DialogProps } from "@/interfaces/others/DialogProps";
import { BasicDialog } from "../basic-dialog";
import { Label } from "../ui/label";
import { SelectController } from "../controllers/select-controller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransferSchema, transferSchema } from "@/schemas/transfer-schema";
import { useQuery } from "@tanstack/react-query";
import { fishBatchService } from "@/services/fish-batch.service";
import { formatFishBatchDisplayWithDetails } from "@/helpers/format-fish-batch-display-with-details";
import { Switch } from "../ui/switch";
import { InputController } from "../controllers/input-controller";
import { useEffect, useState } from "react";
import { productionSectorService } from "@/services/production-sector.service";
import { Button } from "../ui/button";
import { PackagePlus, RefreshCcw } from "lucide-react";
import { productionUnitService } from "@/services/production-unit.service";
import { formatProductionUnitName } from "@/helpers/format-production-unit-name";

type TransferDialogProps = DialogProps & {
  productionUnit: { code: string; sequence: number };
  onSubmit: (data: TransferSchema) => Promise<void>;
  fishAmount: number;
};

export function TransferDialog({
  productionUnit: { code, sequence },
  onSubmit,
  fishAmount,
  ...rest
}: TransferDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TransferSchema>({
    resolver: zodResolver(transferSchema),
  });

  const { data: productionUnits, isLoading: loadingProductionUnits } = useQuery(
    {
      queryFn: productionUnitService.getAll,
      queryKey: ["production-units"],
    },
  );

  useEffect(() => {
    if (!rest.open) reset();
  }, [rest.open]);

  return (
    <BasicDialog title="Transferência" {...rest}>
      <div className="space-y-4">
        <div className="space-y-1">
          {(code || sequence) && (
            <h4 className="text-lg font-semibold">
              {code}.{sequence}
            </h4>
          )}
          <p>Número de peixes: {fishAmount}</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label>Unidade produtiva de destino</Label>
            <SelectController
              control={control}
              name="unidadeProdutivaDestinoId"
              placeholder="Selecione a unidade produtiva de destino"
              contentClassName="max-h-72"
              loading={loadingProductionUnits}
              options={
                productionUnits?.map((unit) => ({
                  value: String(unit.id),
                  label: formatProductionUnitName(unit),
                })) ?? []
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Quantidade</Label>
            <InputController
              control={control}
              name="quantidade"
              placeholder="Informe a quantidade desejada"
              type="number"
              step="1"
              min="1"
              max={fishAmount}
            />
          </div>

          <Button type="submit" className="w-full" loading={isSubmitting}>
            Transferir <RefreshCcw />
          </Button>
        </form>
      </div>
    </BasicDialog>
  );
}
