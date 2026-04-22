import { handleApiError } from "@/api/helpers/handle-api-error";
import { FormBox } from "@/components/form-box";
import { FormRow } from "@/components/form-row";
import { InputController } from "@/components/controllers/input-controller";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { FormProps } from "@/interfaces/Form";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import {
  temperatureSchema,
  TemperatureSchema,
} from "@/schemas/temperature-schema";
import { temperatureService } from "@/services/temperature.service";

type TemperatureFormValues = {
  data: string;
  valor: number;
};

export function TemperatureForm({
  defaultValues,
  mode,
  formBoxClassName,
}: FormProps<TemperatureFormValues>) {
  const qc = useQueryClient();
  const router = useRouter();
  const { id } = router.query;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(temperatureSchema),
    defaultValues,
  });

  async function handleCreate(data: TemperatureSchema) {
    try {
      const response = await temperatureService.create(data);

      toast({
        title: "Cadastrada com sucesso!",
        description: "Temperatura cadastrada com sucesso.",
      });

      goToViewScreen(response.id);
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleUpdate(data: TemperatureSchema) {
    try {
      await temperatureService.update(Number(id), data);

      toast({
        title: "Atualizada com sucesso!",
        description: "Temperatura atualizada com sucesso.",
      });

      qc.invalidateQueries({ queryKey: ["temperature", Number(id)] });
    } catch (error) {
      handleApiError(error);
    }
  }

  const submitFn = mode === "update" ? handleUpdate : handleCreate;

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <FormBox className={formBoxClassName}>
        <FormRow label="Data" htmlFor="data">
          <InputController
            control={control}
            name="data"
            type="datetime-local"
          />
        </FormRow>

        <FormRow label="Temperatura (ºC)" htmlFor="valor">
          <InputController
            control={control}
            name="valor"
            type="number"
            step="0.01"
            placeholder="Informe a temperatura"
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
