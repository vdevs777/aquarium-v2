import { handleApiError } from "@/api/helpers/handle-api-error";
import { InputController } from "@/components/controllers/input-controller";
import { SelectController } from "@/components/controllers/select-controller";
import { FormBox } from "@/components/form-box";
import { FormRow } from "@/components/form-row";
import { FormSubmitButton } from "@/components/form-submit-button";
import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import {
  FeedingType,
  getFeedingTypeId,
  getFeedingTypeOptions,
} from "@/interfaces/enums/FeedingType";
import {
  ProductionUnitCreateSchema,
  productionUnitCreateSchema,
} from "@/schemas/production-unit-schema";
import { productionUnitModelService } from "@/services/production-unit-model.service";
import { productionUnitService } from "@/services/production-unit.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LayoutDashboard } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export function ProductionUnitCreateScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductionUnitCreateSchema>({
    resolver: zodResolver(productionUnitCreateSchema),
    defaultValues: { tipoAlimentacaoId: FeedingType.Manual },
  });

  const { data: productionUnitModels, isLoading: loadingProductionUnitModels } =
    useQuery({
      queryFn: () => productionUnitModelService.getAll(),
      queryKey: ["production-unit-models"],
    });

  async function handleCreate(data: ProductionUnitCreateSchema) {
    try {
      const { id } = await productionUnitService.create(data);

      toast({
        title: "Unidade produtiva cadastrada",
        description: "Disponível para visualização e edição.",
      });

      router.push(`analysis?id=${id}`);
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <div>
      <PageHeader
        path={["Operacional", "Produção", "Unidade produtiva"]}
        title="Cadastrar"
        icon={LayoutDashboard}
        color={sectionColors.operational}
      />
      <form onSubmit={handleSubmit(handleCreate)}>
        <FormBox>
          <FormRow label="Código">
            <InputController
              control={control}
              name="codigo"
              placeholder="Informe o código"
            />
          </FormRow>
          <FormRow label="Modelo de unidade produtiva">
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
          </FormRow>
          <FormRow label="Tipo de alimentação">
            <SelectController
              placeholder="Informe o tipo de alimentação"
              control={control}
              name="tipoAlimentacaoId"
              options={getFeedingTypeOptions()}
              loading={loadingProductionUnitModels}
            />
          </FormRow>
          <FormSubmitButton loading={isSubmitting} />
        </FormBox>
      </form>
    </div>
  );
}
