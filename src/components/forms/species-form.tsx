import { handleApiError } from "@/api/helpers/handle-api-error";
import { FormBox } from "@/components/form-box";
import { FormRow } from "@/components/form-row";
import { InputController } from "@/components/controllers/input-controller";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { FormProps } from "@/interfaces/Form";
import { speciesSchema, SpeciesSchema } from "@/schemas/species-schema";
import { speciesService } from "@/services/species.service";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

export function SpeciesForm({
  defaultValues,
  mode,
  formBoxClassName,
}: FormProps<SpeciesSchema>) {
  const qc = useQueryClient();

  const router = useRouter();
  const { id } = router.query;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SpeciesSchema>({
    resolver: zodResolver(speciesSchema),
    defaultValues,
  });

  async function handleCreate(data: SpeciesSchema) {
    try {
      const response = await speciesService.create(data);
      console.log(response);
      toast({
        title: "Cadastrada com sucesso!",
        description: "Espécie cadastrada com sucesso.",
      });
      goToViewScreen(response.id);
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  }

  async function handleUpdate(data: SpeciesSchema) {
    try {
      await speciesService.update(Number(id), data);
      toast({
        title: "Atualizada com sucesso!",
        description: "Espécie atualizada com sucesso.",
      });
      qc.invalidateQueries({ queryKey: ["specie", Number(id)] });
    } catch (error) {
      handleApiError(error);
    }
  }

  const submitFn = mode === "update" ? handleUpdate : handleCreate;

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <FormBox className={formBoxClassName}>
        <FormRow label="Nome" htmlFor="A">
          <InputController
            control={control}
            name="nome"
            placeholder="Informe a espécie"
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
