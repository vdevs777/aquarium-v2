import { handleApiError } from "@/api/helpers/handle-api-error";
import { FormBox } from "@/components/form-box";
import { FormRow } from "@/components/form-row";
import { InputController } from "@/components/controllers/input-controller";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/useToast";
import { FormProps } from "@/interfaces/others/Form";
import { fishFeedService } from "@/services/fish-feed.service";
import { goToViewScreen } from "@/utils/go-to-view-screen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { SelectController } from "../controllers/select-controller";
import {
  fishFeedBatchSchema,
  FishFeedBatchSchema,
} from "@/schemas/fish-feed-batch-schema";
import { fishFeedBatchService } from "@/services/fish-feed-batch.service";

export function FishFeedBatchForm({
  defaultValues,
  mode,
}: FormProps<FishFeedBatchSchema>) {
  const router = useRouter();
  const { id } = router.query;

  const { data: fishFeeds, isLoading: isLoadingFishFeeds } = useQuery({
    queryFn: () => fishFeedService.getAll(),
    queryKey: ["fish-feeds"],
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FishFeedBatchSchema>({
    resolver: zodResolver(fishFeedBatchSchema),
    defaultValues: {
      dataCompra: defaultValues?.dataCompra ?? "",
      dataValidade: defaultValues?.dataValidade ?? "",
      racaoId: defaultValues?.racaoId ?? undefined,
      fornecedorId: defaultValues?.fornecedorId ?? undefined,
      numeroLote: defaultValues?.numeroLote ?? "",
      numeroNotaFiscal: defaultValues?.numeroNotaFiscal ?? "",
      quantidade: defaultValues?.quantidade ?? 0,
      saldo: defaultValues?.saldo ?? 0,
      ...defaultValues,
    },
  });

  async function handleCreate(data: FishFeedBatchSchema) {
    try {
      const { id } = await fishFeedBatchService.create(data);
      goToViewScreen(id);
      toast({
        title: "Cadastrado com sucesso!",
        description: "Lote de ração cadastrado com sucesso.",
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleUpdate(data: FishFeedBatchSchema) {
    try {
      await fishFeedBatchService.update(Number(id), data);
      toast({
        title: "Atualizado com sucesso!",
        description: "Lote de ração atualizado com sucesso.",
      });
    } catch (error) {
      handleApiError(error);
    }
  }

  const submitFn = mode === "update" ? handleUpdate : handleCreate;

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <FormBox>
        <FormRow label="Ração">
          <SelectController
            control={control}
            name="racaoId"
            placeholder="Selecione uma ração"
            contentClassName="max-h-72"
            loading={isLoadingFishFeeds}
            options={
              fishFeeds?.map((fishFeed) => ({
                value: String(fishFeed.id),
                label: fishFeed.nome ?? "Sem nome",
              })) ?? []
            }
          />
        </FormRow>
        <FormRow label="Fornecedor">
          <InputController
            control={control}
            name="fornecedorId"
            type="number"
            min="0"
            step="1"
          />
        </FormRow>
        <FormRow label="Data de compra">
          <InputController control={control} name="dataCompra" type="date" />
        </FormRow>
        <FormRow label="Data de validade">
          <InputController control={control} name="dataValidade" type="date" />
        </FormRow>
        <FormRow label="Quantidade (kg)">
          <InputController
            control={control}
            name="quantidade"
            type="number"
            min="0"
            step="0.01"
          />
        </FormRow>
        <FormRow label="Saldo (kg)">
          <InputController
            control={control}
            name="saldo"
            type="number"
            min="0"
            step="0.01"
          />
        </FormRow>
        <FormRow label="Número do lote">
          <InputController control={control} name="numeroLote" />
        </FormRow>

        <FormRow label="Número da nota fiscal">
          <InputController control={control} name="numeroNotaFiscal" />
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
