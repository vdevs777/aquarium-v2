import { PageHeader } from "@/components/page-header";
import { Building2 } from "lucide-react";
import { BrandForm } from "@/components/forms/brand-form";
import { sectionColors } from "@/components/layout/section-colors";

export function BrandCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={Building2}
        title="Cadastrar"
        path={["Sistema", "Configurações", "Marca"]}
        color={sectionColors.system}
      />
      <BrandForm />
    </div>
  );
}
