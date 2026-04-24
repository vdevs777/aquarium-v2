import { CultureStageForm } from "@/components/forms/culture-stage-form";
import { PageHeader } from "@/components/page-header";
import { Fish } from "lucide-react";

export function CultureStageCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={Fish}
        title="Cadastrar"
        path={["Operacional", "Produção", "Fase de cultivo"]}
      />
      <CultureStageForm />
    </div>
  );
}
