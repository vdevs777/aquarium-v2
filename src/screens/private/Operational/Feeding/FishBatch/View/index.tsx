import { FishBatchForm } from "@/components/forms/fish-batch-form";
import { PageHeader } from "@/components/page-header";
import { PageState } from "@/components/page-state";
import { Section } from "@/components/ui/section";
import { useValidatedNumberIdQuery } from "@/hooks/useValidatedNumberIdQuery";
import { fishBatchService } from "@/services/fish-batch.service";
import { titleViewFormatter } from "@/utils/title-view-formatter";
import { Fish } from "lucide-react";
import { useRouter } from "next/router";
import { Accordion } from "@/components/ui/accordion";
import { Allocations } from "./components/allocations";
import { sectionColors } from "@/components/layout/section-colors";

export function FishBatchViewScreen() {
  const { id, data, isLoading, error, isValidId, isReady } =
    useValidatedNumberIdQuery({
      queryFn: (id) => fishBatchService.getById(id),
      queryKey: ["fish-batch"],
    });

  const title = titleViewFormatter({
    pageId: id,
    isReady,
    isLoading,
    error,
    name: "Lote de produção",
    itemName: data?.codigo ?? "",
  });

  return (
    <div>
      <PageHeader
        title={title}
        icon={Fish}
        path={["Operacional", "Alimentação", "Lote produtivo"]}
        color={sectionColors.operational}
      />
      <PageState
        isValidId={isValidId}
        isLoading={isLoading}
        error={error}
        isReady={isReady}
      >
        <div className="w-full rounded-lg border bg-white">
          <Section title="Lote de produção">
            <FishBatchForm
              defaultValues={{ ...data!, codigo: data?.codigo ?? "" }}
              mode="update"
              formBoxClassName="md:w-full p-0 pr-8 pb-4"
            />
          </Section>
          <Allocations />
        </div>
      </PageState>
    </div>
  );
}
