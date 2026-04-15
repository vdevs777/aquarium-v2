import { PageHeader } from "@/components/page-header";
import { LayoutDashboard } from "lucide-react";

export function ProductionUnitCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={LayoutDashboard}
        title="Cadastrar"
        path={["Operacional", "Unidade Produtiva"]}
      />
    </div>
  );
}
