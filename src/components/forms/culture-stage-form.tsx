import { handleApiError } from "@/api/helpers/handle-api-error";
import { FormBox } from "@/components/form-box";
import { FormRow } from "@/components/form-row";
import { InputController } from "@/components/controllers/input-controller";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/useToast";
import { FormProps } from "@/interfaces/Form";

import { goToViewScreen } from "@/utils/go-to-view-screen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TextareaController } from "../controllers/textarea-controller";
import {
  cultureStageSchema,
  CultureStageSchema,
} from "@/schemas/culture-stage-schema";
import { useEffect } from "react";
import { cultureStageService } from "@/services/culture-stage.service";

export function CultureStageForm({
  defaultValues,
  mode,
  formBoxClassName,
}: FormProps<CultureStageSchema>) {
  const router = useRouter();
  const { id } = router.query;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<CultureStageSchema>({
    resolver: zodResolver(cultureStageSchema),
    defaultValues: {
      nome: "",
      pesoInicial: undefined,
      pesoFinal: undefined,
      ganhoPesoDia: 0,
      percentualMortalidade: 0,
      diasCultivo: undefined,
      densidadeM3: undefined,
      kgPorM3: undefined,
      fatorConversaoAlimentarEsperado: undefined,
      volumeM3: undefined,
      frequenciaAlimentar: undefined,
      cor: "#FFFFFF",
      ...defaultValues,
    },
  });

  async function handleCreate(data: CultureStageSchema) {
    try {
      const { id } = await cultureStageService.create(data);
      goToViewScreen(id);
      toast({
        title: "Cadastrado com sucesso!",
        description: "Fase de cultivo cadastrada com sucesso.",
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleUpdate(data: CultureStageSchema) {
    try {
      await cultureStageService.update(Number(id), data);
      toast({
        title: "Atualizada com sucesso!",
        description: "Fase de cultivo atualizada com sucesso.",
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  const pesoInicial = watch("pesoInicial");
  const pesoFinal = watch("pesoFinal");
  const diasCultivo = watch("diasCultivo");

  useEffect(() => {
    const isValid =
      pesoInicial !== undefined &&
      pesoFinal !== undefined &&
      diasCultivo !== undefined &&
      diasCultivo > 0;

    if (!isValid) {
      setValue("ganhoPesoDia", 0, {
        shouldValidate: true,
        shouldDirty: false,
      });
      return;
    }

    const diferenca = pesoFinal - pesoInicial;

    if (diferenca < 0) {
      setValue("ganhoPesoDia", 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    const calculado = diferenca / diasCultivo;

    setValue("ganhoPesoDia", Number(calculado.toFixed(2)), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [pesoInicial, pesoFinal, diasCultivo, setValue]);

  const submitFn = mode === "update" ? handleUpdate : handleCreate;

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <FormBox className={formBoxClassName}>
        <FormRow label="Nome">
          <InputController
            control={control}
            name="nome"
            placeholder="Ex: Engorda"
          />
        </FormRow>

        <FormRow label="Peso inicial (g)">
          <InputController
            control={control}
            name="pesoInicial"
            type="number"
            min="0"
            step="0.001"
          />
        </FormRow>

        <FormRow label="Peso final (g)">
          <InputController
            control={control}
            name="pesoFinal"
            type="number"
            min="0"
            step="0.001"
          />
        </FormRow>
        <FormRow label="Dias de cultivo">
          <InputController
            control={control}
            name="diasCultivo"
            type="number"
            min="0"
            step="1"
          />
        </FormRow>
        <FormRow label="Ganho de peso/dia (g)">
          <InputController
            control={control}
            name="ganhoPesoDia"
            type="number"
            disabled
          />
        </FormRow>

        <FormRow label="Percentual de mortalidade (%)">
          <InputController
            control={control}
            name="percentualMortalidade"
            type="number"
            min="0"
            step="0.01"
          />
        </FormRow>

        <FormRow label="Densidade (peixes/m³)">
          <InputController
            control={control}
            name="densidadeM3"
            type="number"
            min="0"
            step="1"
          />
        </FormRow>

        <FormRow label="Kg por m³">
          <InputController
            control={control}
            name="kgPorM3"
            type="number"
            min="0"
            step="0.001"
          />
        </FormRow>

        <FormRow label="Fator de conversão alimentar esperado">
          <InputController
            control={control}
            name="fatorConversaoAlimentarEsperado"
            type="number"
            min="0"
            step="0.001"
          />
        </FormRow>

        <FormRow label="Volume (m³)">
          <InputController
            control={control}
            name="volumeM3"
            type="number"
            min="0"
            step="0.001"
          />
        </FormRow>

        <FormRow label="Frequência alimentar (vezes/dia)">
          <InputController
            control={control}
            name="frequenciaAlimentar"
            type="number"
            min="0"
            step="1"
          />
        </FormRow>

        <FormRow label="Cor">
          <InputController control={control} name="cor" type="color" />
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
