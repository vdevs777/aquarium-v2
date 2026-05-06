import { DialogProps } from "@/interfaces/others/DialogProps";
import {
  productionUnitEditSchema,
  ProductionUnitEditSchema,
} from "@/schemas/production-unit-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { BasicDialog } from "../basic-dialog";
import { Label } from "../ui/label";
import { InputController } from "../controllers/input-controller";
import { SelectController } from "../controllers/select-controller";
import { useQuery } from "@tanstack/react-query";
import { productionUnitModelService } from "@/services/production-unit-model.service";
import { Button } from "../ui/button";
import { FormSubmitButton } from "../form-submit-button";
import { getFeedingTypeOptions } from "@/interfaces/enums/FeedingType";
import { useEffect } from "react";

type EditProductionUnitDialogProps = DialogProps & {
  defaultValues: ProductionUnitEditSchema;
  onSubmit: (data: ProductionUnitEditSchema) => Promise<void>;
};

export function EditProductionUnitDialog({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
}: EditProductionUnitDialogProps) {
  const { data: productionUnitModels, isLoading: loadingProductionUnitModels } =
    useQuery({
      queryFn: () => productionUnitModelService.getAll(),
      queryKey: ["production-unit-models"],
    });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(productionUnitEditSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <BasicDialog
      onOpenChange={onOpenChange}
      open={open}
      title="Editar unidade produtiva"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label>Código</Label>
          <InputController
            control={control}
            name="codigo"
            placeholder="Informe o código"
          />
        </div>
        <div className="space-y-2">
          <Label>Modelo de unidade produtiva</Label>
          <SelectController
            placeholder="Informe o modelo de unidade produtiva"
            control={control}
            name="modeloUnidadeProdutivaId"
            options={
              productionUnitModels?.map((model) => ({
                value: String(model.id),
                label: model.nome,
              })) ?? []
            }
            loading={loadingProductionUnitModels}
          />
        </div>
        <div className="space-y-2">
          <Label>Sequência</Label>
          <InputController
            control={control}
            name="sequencia"
            placeholder="Informe a sequência"
            type="number"
            step="1"
            min="0"
          />
        </div>{" "}
        <div className="space-y-2">
          <Label>Tipo de alimentação</Label>
          <SelectController
            placeholder="Informe o tipo de alimentação"
            control={control}
            name="tipoAlimentacaoId"
            options={getFeedingTypeOptions()}
            loading={loadingProductionUnitModels}
          />
        </div>
        <FormSubmitButton loading={isSubmitting} />
      </form>
    </BasicDialog>
  );
}
