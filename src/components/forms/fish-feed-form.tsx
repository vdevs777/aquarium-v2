import { handleApiError } from "@/api/helpers/handle-api-error";
import { FormBox } from "@/components/form-box";
import { FormRow } from "@/components/form-row";
import { InputController } from "@/components/controllers/input-controller";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/useToast";
import { FormProps } from "@/interfaces/Form";
import { fishFeedSchema, FishFeedSchema } from "@/schemas/fish-feed-schema";
import { fishFeedService } from "@/services/fish-feed.service";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { brandService } from "@/services/brand.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectController } from "../controllers/select-controller";
import { TextareaController } from "../controllers/textarea-controller";
import { formatNumber } from "@/utils/number";

export function FishFeedForm({
  defaultValues,
  mode,
}: FormProps<FishFeedSchema>) {
  const router = useRouter();
  const { id } = router.query;

  const { data: brands, isLoading: isLoadingBrands } = useQuery({
    queryFn: () => brandService.getAll(),
    queryKey: ["brand"],
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FishFeedSchema>({
    resolver: zodResolver(fishFeedSchema),
    defaultValues: {
      marcaId: defaultValues?.marcaId ?? undefined,
      estoqueMinimoKg: defaultValues?.estoqueMinimoKg ?? 0,
      estoqueMaximoKg: defaultValues?.estoqueMaximoKg ?? 0,
      proteinaBruta: defaultValues?.proteinaBruta ?? 0,
      energia: defaultValues?.energia ?? 0,
      granulometria: defaultValues?.granulometria ?? 0,
      taxaProteinaEnergia: defaultValues?.taxaProteinaEnergia ?? 0,
      observacao: defaultValues?.observacao ?? null,
      ...defaultValues,
    },
  });

  const proteinaBruta = watch("proteinaBruta");
  const energia = watch("energia");

  useEffect(() => {
    if (!energia) return;
    const taxa = proteinaBruta / energia;
    setValue("taxaProteinaEnergia", isNaN(taxa) ? 0 : Number(taxa.toFixed(4)));
  }, [proteinaBruta, energia, setValue]);

  async function handleCreate(data: FishFeedSchema) {
    try {
      const { id } = await fishFeedService.create(data);
      goToViewScreen(id);
      toast({
        title: "Cadastrado com sucesso!",
        description: "Ração cadastrada com sucesso.",
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleUpdate(data: FishFeedSchema) {
    try {
      await fishFeedService.update(Number(id), data);
      toast({
        title: "Atualizada com sucesso!",
        description: "Ração atualizada com sucesso.",
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  const submitFn = mode === "update" ? handleUpdate : handleCreate;

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <FormBox>
        <FormRow label="Nome">
          <InputController
            control={control}
            name="nome"
            placeholder="Ex: Ração Tilápia Premium"
          />
        </FormRow>

        <FormRow label="Marca">
          <SelectController
            control={control}
            name="marcaId"
            placeholder="Selecione uma marca"
            contentClassName="max-h-72"
            loading={isLoadingBrands}
            options={
              brands?.map((brand) => ({
                value: String(brand.id),
                label: brand.nome,
              })) ?? []
            }
          />
        </FormRow>

        <FormRow label="Estoque mínimo (kg)">
          <InputController
            control={control}
            name="estoqueMinimoKg"
            type="number"
            min="0"
            step="0.01"
          />
        </FormRow>

        <FormRow label="Estoque máximo (kg)">
          <InputController
            control={control}
            name="estoqueMaximoKg"
            type="number"
            min="0"
            step="0.01"
          />
        </FormRow>

        <Separator />

        <FormRow label="Proteína bruta (%)">
          <InputController
            control={control}
            name="proteinaBruta"
            type="number"
            min="0"
            max="100"
            step="0.01"
          />
        </FormRow>

        <FormRow label="Energia (kcal/kg)">
          <InputController
            control={control}
            name="energia"
            type="number"
            min="0"
            step="0.01"
          />
        </FormRow>

        <FormRow label="Granulometria (mm)">
          <InputController
            control={control}
            name="granulometria"
            type="number"
            min="0"
            step="0.01"
          />
        </FormRow>

        <FormRow label="Taxa proteína/energia">
          <p className="font-bold">
            {formatNumber(
              proteinaBruta && energia ? proteinaBruta / energia : 0,
              { minimumFractionDigits: 4, maximumFractionDigits: 4 },
            )}
          </p>
        </FormRow>

        <Separator />

        <FormRow label="Observação">
          <TextareaController
            control={control}
            name="observacao"
            placeholder="Opcional"
          />
        </FormRow>

        <div className="flex justify-end">
          <Button type="submit" className="w-24" loading={isSubmitting}>
            Salvar
          </Button>
        </div>
      </FormBox>
    </form>
  );
}
