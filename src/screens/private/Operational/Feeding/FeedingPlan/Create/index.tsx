import { InputController } from "@/components/controllers/input-controller";
import { SelectController } from "@/components/controllers/select-controller";
import { FormBox } from "@/components/form-box";
import { FormRow } from "@/components/form-row";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FeedingPlanForm } from "@/components/forms/feeding-plan-form";
import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { getFeedingTypeOptions } from "@/interfaces/enums/FeedingType";
import {
  FeedingPlanSchema,
  feedingPlanSchema,
} from "@/schemas/feeding-plan-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";

export function FeedingPlanCreateScreen() {
  return (
    <div>
      <PageHeader
        path={["Operacional", "Alimentação", "Plano alimentar"]}
        icon={Clock}
        color={sectionColors.operational}
        title="Cadastrar"
      />
      <FeedingPlanForm />
    </div>
  );
}
