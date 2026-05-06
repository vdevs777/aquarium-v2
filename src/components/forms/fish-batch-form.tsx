import { useRouter } from "next/router";

import { fishBatchSchema, FishBatchSchema } from "@/schemas/fish-batch-schema";
import { FormProps } from "@/interfaces/others/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fishBatchService } from "@/services/fish-batch.service";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { FormBox } from "../form-box";
import { FormRow } from "../form-row";
import { SelectController } from "../controllers/select-controller";
import { useQuery } from "@tanstack/react-query";
import { strainsService } from "@/services/strains.service";
import { suppliersService } from "@/services/suppliers.service";
import { InputController } from "../controllers/input-controller";
import { Input } from "../ui/input";
import { FormSubmitButton } from "../form-submit-button";
import { format } from "date-fns";

export function FishBatchForm({
  defaultValues,
  formBoxClassName,
  mode,
}: FormProps<FishBatchSchema>) {
  const router = useRouter();
  const { id } = router.query;

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FishBatchSchema>({
    resolver: zodResolver(fishBatchSchema),
    defaultValues: {
      codigo: defaultValues?.codigo ?? "",
      dataCompra: defaultValues?.dataCompra
        ? format(new Date(defaultValues.dataCompra), "yyyy-MM-dd")
        : "",
      numeroTotalPeixes: defaultValues?.numeroTotalPeixes ?? 0,
      pesoMedio: defaultValues?.pesoMedio ?? 0,
      precoUnitario: defaultValues?.precoUnitario ?? 0,
      linhagemId: defaultValues?.linhagemId ?? undefined,
      fornecedorId: defaultValues?.fornecedorId ?? undefined,
    },
  });

  const quantity = watch("numeroTotalPeixes") ?? 0;
  const price = watch("precoUnitario") ?? 0;

  const totalPrice = quantity * price || 0;

  const { data: strains, isLoading: loadingStrains } = useQuery({
    queryKey: ["strains"],
    queryFn: strainsService.getAll,
  });

  const { data: suppliers, isLoading: loadingSuppliers } = useQuery({
    queryKey: ["suppliers"],
    queryFn: suppliersService.getAll,
  });

  async function handleCreate(data: FishBatchSchema) {
    try {
      const { id } = await fishBatchService.create(data);
      goToViewScreen(id);
      toast({
        title: "Cadastrado com sucesso!",
        description: "Lote produtivo cadastrado com sucesso.",
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleUpdate(data: FishBatchSchema) {
    try {
      await fishBatchService.update(Number(id), data);
      toast({
        title: "Atualizado com sucesso!",
        description: "Lote produtivo atualizado com sucesso.",
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  const submitFn = mode === "update" ? handleUpdate : handleCreate;

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <FormBox className={formBoxClassName}>
        <FormRow label="Código">
          <InputController control={control} name="codigo" />
        </FormRow>
        <FormRow label="Número de peixes">
          <InputController
            control={control}
            name="numeroTotalPeixes"
            type="number"
            step="1"
            min="1"
          />
        </FormRow>
        <FormRow label="Peso médio">
          <InputController
            control={control}
            name="pesoMedio"
            type="number"
            step="0.01"
            min="0.01"
          />
        </FormRow>
        <FormRow label="Preço unitário">
          <InputController
            control={control}
            leftDecorator="R$"
            name="precoUnitario"
            type="number"
            step="0.01"
            min="0.01"
          />
        </FormRow>
        <FormRow label="Preço total">
          <Input
            leftDecorator="R$"
            disabled
            value={totalPrice.toFixed(2)}
            type="number"
          />
        </FormRow>
        <FormRow label="Fornecedor">
          <SelectController
            control={control}
            name="fornecedorId"
            placeholder="Selecione o fornecedor"
            contentClassName="max-h-72"
            loading={loadingSuppliers}
            options={
              suppliers?.map((supplier) => ({
                value: String(supplier.id),
                label: supplier.pessoa.nome ?? "Sem nome",
              })) ?? []
            }
          />
        </FormRow>
        <FormRow label="Linhagem">
          <SelectController
            control={control}
            name="linhagemId"
            placeholder="Selecione uma linhagem"
            contentClassName="max-h-72"
            loading={loadingStrains}
            options={
              strains?.map((strain) => ({
                value: String(strain.id),
                label: strain.nome ?? "Sem nome",
              })) ?? []
            }
          />
        </FormRow>
        <FormRow label="Data de compra">
          <InputController control={control} name="dataCompra" type="date" />
        </FormRow>
        <FormSubmitButton loading={isSubmitting} />
      </FormBox>
    </form>
  );
}
