import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Blend, Building2, Plus } from "lucide-react";
import { columns } from "./components/columns";
import { useQuery } from "@tanstack/react-query";
import { CreateButton } from "@/components/buttons/create-button";
import { brandService } from "@/services/brand.service";

export function BrandListScreen() {
  const { data, isLoading, error } = useQuery({
    queryFn: () => brandService.getAll(),
    queryKey: ["brand"],
  });

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <PageHeader
          icon={Building2}
          title="Lista"
          path={["Sistema", "Configurações", "Marca"]}
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
