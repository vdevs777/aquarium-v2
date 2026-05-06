import { FishBatchForm } from "@/components/forms/fish-batch-form";
import { DataTable } from "@/components/ui/data-table";
import { Section } from "@/components/ui/section";
import { fishBatchService } from "@/services/fish-batch.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { allocationColumns } from "./allocation-columns";

export function Allocations() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useQuery({
    queryFn: () => fishBatchService.getAllocationsById(Number(id)),
    queryKey: ["fish-batch-allocations", id],
  });

  return (
    <Section title="Alocações">
      <DataTable
        columns={allocationColumns}
        data={data}
        isLoading={isLoading}
        error={error?.message}
      />
    </Section>
  );
}
