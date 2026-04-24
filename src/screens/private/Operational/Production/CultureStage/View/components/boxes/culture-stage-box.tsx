import { CultureStageForm } from "@/components/forms/culture-stage-form";
import { Box } from "@/components/ui/box";
import { CultureStageModel } from "@/interfaces/models/CultureStage";

type CultureStageBoxProps = { data?: CultureStageModel };

export function CultureStageBox({ data }: CultureStageBoxProps) {
  return (
    <Box title="Fase de cultivo">
      <CultureStageForm
        defaultValues={
          data
            ? {
                ...data,
                frequenciaAlimentar: data.frequenciaAlimentar ?? undefined,
                cor: data.cor ?? undefined,
              }
            : undefined
        }
        mode="update"
        formBoxClassName="md:w-full"
      />
    </Box>
  );
}
