import { PageHeader } from "@/components/page-header";
import { Building2 } from "lucide-react";
import { BrandForm } from "@/components/forms/brand-form";

export function BrandCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={Building2}
        title="Cadastrar"
        path={["Sistema", "Configurações", "Marca"]}
      />
      <BrandForm />
    </div>
  );
}
