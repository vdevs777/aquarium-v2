import { FishFeedBatchForm } from "@/components/forms/fish-feed-batch-form";
import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { PageState } from "@/components/page-state";
import { useValidatedNumberIdQuery } from "@/hooks/useValidatedNumberIdQuery";
import { fishFeedBatchService } from "@/services/fish-feed-batch.service";
import { formatDateForInput } from "@/utils/date-fns";
import { titleViewFormatter } from "@/utils/title-view-formatter";
import { PackageOpen } from "lucide-react";

export function FishFeedBatchViewScreen() {
  const { id, data, isLoading, error, isValidId, isReady } =
    useValidatedNumberIdQuery({
      queryFn: (id) => fishFeedBatchService.getById(id),
      queryKey: ["fish-feed-batch"],
    });

  const title = titleViewFormatter({
    pageId: id,
    isReady,
    isLoading,
    error,
    name: "Lote de ração",
    itemName: data?.numeroLote,
  });

  return (
    <div>
      <PageHeader
        icon={PackageOpen}
        title={title}
        path={["Operacional", "Alimentação", "Lote de ração"]}
        color={sectionColors.operational}
      />

      <PageState
        isValidId={isValidId}
        isLoading={isLoading}
        error={error}
        isReady={isReady}
      >
        <FishFeedBatchForm
          mode="update"
          defaultValues={{
            ...data,
            dataValidade: formatDateForInput(data?.dataValidade),
            dataCompra: formatDateForInput(data?.dataCompra),
            racaoId: data?.racaoId!,
            fornecedorId: data?.fornecedorId!,
            numeroLote: data?.numeroLote ?? "",
            numeroNotaFiscal: data?.numeroNotaFiscal ?? "",
            quantidade: data?.quantidade ?? 0,
            saldo: data?.saldo ?? 0,
          }}
        />
      </PageState>
    </div>
  );
}
