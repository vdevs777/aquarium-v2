import { DialogProps } from "@/interfaces/others/DialogProps";
import { BasicDialog } from "../basic-dialog";
import { Label } from "../ui/label";
import { SelectController } from "../controllers/select-controller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StockingSchema, stockingSchema } from "@/schemas/stocking-schema";
import { useQuery } from "@tanstack/react-query";
import { fishBatchService } from "@/services/fish-batch.service";
import { formatFishBatchDisplayWithDetails } from "@/helpers/format-fish-batch-display-with-details";
import { Switch } from "../ui/switch";
import { InputController } from "../controllers/input-controller";
import { useEffect, useState } from "react";
import { productionSectorService } from "@/services/production-sector.service";
import { Button } from "../ui/button";
import { PackagePlus } from "lucide-react";

type StockingDialogProps = DialogProps & {
  productionUnit: { code: string; sequence: number };
  onSubmit: (data: StockingSchema) => Promise<void>;
};

export function StockingDialog({
  productionUnit: { code, sequence },
  onSubmit,
  ...rest
}: StockingDialogProps) {
  const [isTotalStocking, setIsTotalStocking] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<StockingSchema>({
    resolver: zodResolver(stockingSchema),
  });

  const { data: fishBatches, isLoading: loadingFishBatches } = useQuery({
    queryFn: fishBatchService.getAll,
    queryKey: ["fish-batches"],
  });

  const { data: productionSectors, isLoading: loadingProductionSectors } =
    useQuery({
      queryFn: productionSectorService.getAll,
      queryKey: ["production-sectors"],
    });

  const selectedFishBatch = fishBatches?.find(
    (fishBatch) => fishBatch.id === watch("loteProducaoId"),
  );

  useEffect(() => {
    if (!selectedFishBatch) return;

    if (isTotalStocking) {
      setValue(
        "quantidade",
        selectedFishBatch.numeroTotalPeixes -
          selectedFishBatch.numeroPeixesAlocados,
      );
      clearErrors("quantidade");
    } else {
      setValue("quantidade", 0);
    }
  }, [selectedFishBatch, isTotalStocking, setValue]);

  useEffect(() => {
    if (!rest.open) reset();
  }, [rest.open]);

  return (
    <BasicDialog title="Povoamento" {...rest}>
      <div className="space-y-4">
        {(code || sequence) && (
          <h4 className="text-lg font-semibold">
            {code}.{sequence}
          </h4>
        )}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label>Lote de cultivo</Label>
            <SelectController
              control={control}
              name="loteProducaoId"
              placeholder="Selecione o lote produtivo"
              contentClassName="max-h-72"
              loading={loadingFishBatches}
              options={
                fishBatches?.map((fishBatch) => ({
                  value: String(fishBatch.id),
                  label: formatFishBatchDisplayWithDetails(fishBatch),
                })) ?? []
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Povoamento total</Label>
            <Switch
              onCheckedChange={setIsTotalStocking}
              checked={isTotalStocking}
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
              disabled={isTotalStocking}
            />
          </div>
          <div className="space-y-2">
            <Label>Setor produtivo</Label>
            <SelectController
              control={control}
              name="setorProdutivoId"
              placeholder="Selecione o setor produtivo"
              contentClassName="max-h-72"
              loading={loadingFishBatches}
              options={
                productionSectors?.map((sector) => ({
                  value: String(sector.id),
                  label: sector.nome,
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
              placeholder="Informe a sequência"
            />
          </div>
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Povoar <PackagePlus />
          </Button>
        </form>
      </div>
    </BasicDialog>
  );
}
