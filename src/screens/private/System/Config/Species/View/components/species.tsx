import { SpeciesForm } from "@/components/forms/species-form";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/ui/section";
import { SpeciesSchema } from "@/schemas/species-schema";

type SpeciesProps = { defaultValues: SpeciesSchema };

export function Species({ defaultValues }: SpeciesProps) {
  return (
    <Section title="Espécie">
      <SpeciesForm
        defaultValues={defaultValues}
        mode="update"
        formBoxClassName="md:w-full p-0 pr-8 pb-4"
      />
    </Section>
  );
}
