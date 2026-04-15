import { handleApiError } from "@/api/helpers/handle-api-error";
import { FormBox } from "@/components/form-box";
import { FormRow } from "@/components/form-row";
import { InputController } from "@/components/input-controller";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  calculateSurfaceArea,
  calculateVolume,
} from "@/helpers/production-unit-model-calculations";
import { toast } from "@/hooks/useToast";
import { FormProps } from "@/interfaces/Form";
import {
  productionUnitModelSchema,
  ProductionUnitModelSchema,
} from "@/schemas/production-unit-model-schema";
import { productionUnitModelService } from "@/services/production-unit-model.service";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function ProductionUnitModelForm({
  defaultValues,
  mode,
}: FormProps<ProductionUnitModelSchema>) {
  const router = useRouter();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ProductionUnitModelSchema>({
    resolver: zodResolver(productionUnitModelSchema),
    defaultValues: {
      ehCircunferencia: defaultValues ? defaultValues.ehCircunferencia : false,
      comprimento: defaultValues?.ehCircunferencia
        ? 0
        : (defaultValues?.comprimento ?? 0),
      profundidade: defaultValues?.profundidade ?? 0,
      largura: defaultValues?.ehCircunferencia
        ? 0
        : (defaultValues?.largura ?? 0),
      circunferencia: defaultValues?.ehCircunferencia
        ? (defaultValues?.circunferencia ?? 0)
        : 0,
      volumeM3: defaultValues?.volumeM3 ?? 0,
      areaSuperficieM2: defaultValues?.areaSuperficieM2 ?? 0,
    },
  });

  const initialIsCircle = defaultValues?.ehCircunferencia ?? false;
  const [isCircle, setIsCircle] = useState(initialIsCircle);

  const comprimento = watch("comprimento");
  const largura = watch("largura");
  const circunferencia = watch("circunferencia");
  const profundidade = watch("profundidade");

  const areaSuperficie = calculateSurfaceArea({
    circumference: circunferencia,
    isCircle,
    length: comprimento,
    width: largura,
  });

  const volume = calculateVolume({
    isCircle,
    circumference: circunferencia,
    length: comprimento,
    width: largura,
    depth: profundidade,
  });

  async function handleCreate(data: ProductionUnitModelSchema) {
    try {
      const { id } = await productionUnitModelService.create(data);
      goToViewScreen(id);
      toast({
        title: "Cadastrado com sucesso!",
        description: "Modelo de unidade produtiva cadastrado com sucesso.",
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  useEffect(() => {
    if (isCircle) {
      setValue("comprimento", 0);
      setValue("largura", 0);
    } else {
      setValue("circunferencia", 0);
    }
  }, [isCircle, setValue]);

  useEffect(() => {
    setValue("volumeM3", isNaN(volume) ? 0 : volume);
    setValue("areaSuperficieM2", isNaN(areaSuperficie) ? 0 : areaSuperficie);
  }, [volume, areaSuperficie, setValue]);

  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <FormBox>
        <FormRow label="É circular" htmlFor="A">
          <Checkbox
            checked={isCircle}
            onCheckedChange={(check) => {
              const isChecked = Boolean(check);
              setIsCircle(isChecked);
              setValue("ehCircunferencia", isChecked);
            }}
          />
        </FormRow>
        <FormRow label="Nome" htmlFor="A">
          <InputController
            control={control}
            name="nome"
            placeholder="Ex: Modelo A, Tanque principal"
          />
        </FormRow>
        {isCircle ? (
          <FormRow label="Circunferência" htmlFor="A">
            <InputController
              control={control}
              name="circunferencia"
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
            />
          </FormRow>
        ) : (
          <>
            <FormRow label="Comprimento" htmlFor="A">
              <InputController
                control={control}
                name="comprimento"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
              />
            </FormRow>
            <FormRow label="Largura" htmlFor="A">
              <InputController
                control={control}
                name="largura"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
              />
            </FormRow>
          </>
        )}
        <FormRow label="Profundidade" htmlFor="A">
          <InputController
            control={control}
            name="profundidade"
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
          />
        </FormRow>
        <Separator />
        <FormRow label="Área superfície" htmlFor="A">
          <p className="font-bold">{areaSuperficie.toFixed(2)} m²</p>
        </FormRow>
        <FormRow label="Volume (m³)" htmlFor="A">
          <p className="font-bold">{volume.toFixed(2)} m³</p>
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
