import { getFeedingTypeOptions } from "@/interfaces/enums/FeedingType";
import { InputController } from "../controllers/input-controller";
import { SelectController } from "../controllers/select-controller";
import { FormBox } from "../form-box";
import { FormRow } from "../form-row";
import { FormSubmitButton } from "../form-submit-button";
import {
  feedingPlanSchema,
  FeedingPlanSchema,
} from "@/schemas/feeding-plan-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function FeedingPlanForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeedingPlanSchema>({
    resolver: zodResolver(feedingPlanSchema),
  });

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <FormBox>
        <FormRow label="Nome">
          <InputController
            control={control}
            name="nome"
            placeholder="Informe o nome"
          />
        </FormRow>
        <FormRow label="Tipo">
          <SelectController
            control={control}
            name="tipo"
            options={getFeedingTypeOptions()}
            placeholder="Selecione o tipo de alimentação"
          />
        </FormRow>
        <FormSubmitButton loading={isSubmitting} />
      </FormBox>
    </form>
  );
}
