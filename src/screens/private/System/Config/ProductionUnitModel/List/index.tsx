import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Blend, Plus } from "lucide-react";
import { columns } from "./components/columns";
import { useQuery } from "@tanstack/react-query";
import { productionUnitModelService } from "@/services/production-unit-model.service";
import { Button } from "@/components/ui/button";
import { CreateButton } from "@/components/buttons/create-button";
import { PopulateButton } from "@/components/buttons/populate-button";

export function ProductionUnitModelListScreen() {
  const { data, isLoading, error } = useQuery({
    queryFn: () => productionUnitModelService.getAll(),
    queryKey: ["production-unit-model"],
  });

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <PageHeader
          icon={Blend}
          title="Lista"
          path={["Sistema", "Configurações", "Modelo de Unidade Produtiva"]}
        />
        <CreateButton />
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error?.message}
        hasClick
      />
    </div>
  );
}
