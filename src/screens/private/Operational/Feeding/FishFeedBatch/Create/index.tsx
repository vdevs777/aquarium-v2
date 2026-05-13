import { FishFeedBatchForm } from "@/components/forms/fish-feed-batch-form";
import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { PackageOpen } from "lucide-react";

export function FishFeedBatchCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={PackageOpen}
        title="Cadastrar"
        path={["Operacional", "Alimentação", "Lote de ração"]}
        color={sectionColors.operational}
      />
      <FishFeedBatchForm />
    </div>
  );
}
