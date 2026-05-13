import { FishBatchForm } from "@/components/forms/fish-batch-form";
import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { Fish } from "lucide-react";

export function FishBatchCreateScreen() {
  return (
    <div>
      <PageHeader
        title="Cadastrar"
        icon={Fish}
        path={["Operacional", "Alimentação", "Lote produtivo"]}
        color={sectionColors.operational}
      />
      <FishBatchForm />
    </div>
  );
}
