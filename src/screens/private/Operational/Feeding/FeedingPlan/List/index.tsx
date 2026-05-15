import { CreateButton } from "@/components/buttons/create-button";
import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Clock } from "lucide-react";
import { columns } from "./components/columns";
import { feedingPlansFake } from "@/helpers/fakes/feeding-plans-fake";

export function FeedingPlanListScreen() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <PageHeader
          path={["Operacional", "Alimentação", "Plano alimentar"]}
          icon={Clock}
          color={sectionColors.operational}
          title="Lista"
        />

        <CreateButton />
      </div>
      <DataTable
        columns={columns}
        data={feedingPlansFake}
        isLoading={false}
        hasClick
      />
    </div>
  );
}
