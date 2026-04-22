import { handleApiError } from "@/api/helpers/handle-api-error";
import { FormBox } from "@/components/form-box";
import { FormRow } from "@/components/form-row";
import { InputController } from "@/components/controllers/input-controller";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/useToast";
import { FormProps } from "@/interfaces/Form";
import { brandSchema, BrandSchema } from "@/schemas/brand-schema";
import { brandService } from "@/services/brand.service";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function BrandForm({ defaultValues }: FormProps<BrandSchema>) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    defaultValues,
  });

  async function handleCreate(data: BrandSchema) {
    try {
      const response = await brandService.create(data);
      console.log(response);
      toast({
        title: "Cadastrado com sucesso!",
        description: "Marca cadastrada com sucesso.",
      });
      goToViewScreen(response.id);
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <FormBox>
        <FormRow label="Nome" htmlFor="A">
          <InputController
            control={control}
            name="nome"
            placeholder="Informe a marca"
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
