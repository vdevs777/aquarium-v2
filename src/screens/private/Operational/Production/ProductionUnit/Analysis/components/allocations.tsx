import { SimpleTable } from "@/components/simple-table";
import { ProductionUnitAllocationSummary } from "@/interfaces/http/ProductionUnit/ProductionUnitAllocationSummary";
import { Calculator } from "lucide-react";

type AllocationsProps = { data: ProductionUnitAllocationSummary[] };

export function Allocations({ data }: AllocationsProps) {
  return (
    <SimpleTable
      title="Alocações"
      icon={Calculator}
      redirectTo={({ id }) => `${id}`}
      data={data.map((allocation) => ({
        id: allocation.id,
        label: allocation.loteProducao,
        value: allocation.quantidade,
      }))}
      emptyMessage="Nenhuma alocação encontrada."
    />
  );
}
