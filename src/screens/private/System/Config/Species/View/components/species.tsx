import { SpeciesForm } from "@/components/forms/species-form";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SpeciesSchema } from "@/schemas/species-schema";

type SpeciesProps = { defaultValues: SpeciesSchema };

export function Species({ defaultValues }: SpeciesProps) {
  return (
    <AccordionItem
      key={"specie"}
      value={"specie"}
      className="border-b px-4 last:border-b-0"
    >
      <AccordionTrigger>Espécie</AccordionTrigger>
      <AccordionContent>
        <div>
          <SpeciesForm
            defaultValues={defaultValues}
            mode="update"
            formBoxClassName="md:w-full p-0 pr-8 pb-4"
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
