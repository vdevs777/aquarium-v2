import { FeedingPlanForm } from "@/components/forms/feeding-plan-form";
import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { Clock } from "lucide-react";

export function FeedingPlanViewScreen() {
  return (
    <div>
      <PageHeader
        path={["Operacional", "Alimentação", "Plano alimentar"]}
        icon={Clock}
        color={sectionColors.operational}
        title="Ver"
      />
      <FeedingPlanForm />
    </div>
  );
}
