import { DialogProps } from "@/interfaces/others/DialogProps";
import { BasicDialog } from "../basic-dialog";
import { Label } from "../ui/label";
import { SelectController } from "../controllers/select-controller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HarvestSchema, harvestSchema } from "@/schemas/harvest-schema";
import { useQuery } from "@tanstack/react-query";
import { fishBatchService } from "@/services/fish-batch.service";
import { formatFishBatchDisplayWithDetails } from "@/helpers/format-fish-batch-display-with-details";
import { Switch } from "../ui/switch";
import { InputController } from "../controllers/input-controller";
import { useEffect, useState } from "react";
import { productionSectorService } from "@/services/production-sector.service";
import { Button } from "../ui/button";
import { PackagePlus, Redo, Redo2 } from "lucide-react";
import { customerService } from "@/services/customer.service";

type HarvestDialogProps = DialogProps & {
  productionUnit: { code: string; sequence: number };
  onSubmit: (data: HarvestSchema) => Promise<void>;
  defaultValues?: Partial<HarvestSchema>;
  fishAmount: number;
};

export function HarvestDialog({
  productionUnit: { code, sequence },
  onSubmit,
  defaultValues,
  fishAmount,
  ...rest
}: HarvestDialogProps) {
  const [isTotalHarvest, setIsTotalHarvest] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<HarvestSchema>({
    resolver: zodResolver(harvestSchema),
    defaultValues: {
      enviarUnidadeProdutivaParaManutencao: false,
      ...defaultValues,
    },
  });

  const enviarUnidadeProdutivaParaManutencao = watch(
    "enviarUnidadeProdutivaParaManutencao",
  );

  const { data: customers, isLoading: loadingCustomers } = useQuery({
    queryFn: customerService.getAll,
    queryKey: ["customers"],
  });

  useEffect(() => {
    if (isTotalHarvest) {
      setValue("quantidade", fishAmount);
      clearErrors("quantidade");
    } else {
      setValue("quantidade", 0);
    }
  }, [isTotalHarvest]);

  useEffect(() => {
    if (!rest.open) reset();
  }, [rest.open]);

  return (
    <BasicDialog title="Despesca" {...rest}>
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
            <Label>Povoamento total</Label>
            <Switch
              onCheckedChange={setIsTotalHarvest}
              checked={isTotalHarvest}
            />
          </div>
          <div className="space-y-2">
            <Label>Lote de cultivo</Label>
            <SelectController
              control={control}
              name="clienteId"
              placeholder="Selecione o cliente"
              contentClassName="max-h-72"
              loading={loadingCustomers}
              options={
                customers?.map((customer) => ({
                  value: String(customer.id),
                  label: customer.pessoa.nome,
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
              disabled={isTotalHarvest}
            />
          </div>
          <div className="space-y-2">
            <Label>Enviar unidade produtiva para manutenção?</Label>
            <Switch
              checked={enviarUnidadeProdutivaParaManutencao}
              onCheckedChange={(checked) =>
                setValue("enviarUnidadeProdutivaParaManutencao", checked)
              }
            />
          </div>
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Despescar <Redo2 />
          </Button>
        </form>
      </div>
    </BasicDialog>
  );
}
