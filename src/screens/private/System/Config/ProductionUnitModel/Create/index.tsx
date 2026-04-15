import { PageHeader } from "@/components/page-header";
import { Blend } from "lucide-react";
import { ProductionUnitModelForm } from "@/components/forms/production-unit-model-form";

export function ProductionUnitModelCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={Blend}
        title="Cadastrar"
        path={["Sistema", "Configurações", "Modelo de Unidade Produtiva"]}
      />
      <ProductionUnitModelForm />
    </div>
  );
}
