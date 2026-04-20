import { SpeciesForm } from "@/components/forms/species-form";
import { PageHeader } from "@/components/page-header";
import { PageState } from "@/components/page-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useValidatedNumberIdQuery } from "@/hooks/useValidatedNumberIdQuery";
import { speciesService } from "@/services/species.service";
import { titleViewFormatter } from "@/utils/title-view-formatter";
import { useQueryClient } from "@tanstack/react-query";
import { Fish } from "lucide-react";
import { Species } from "./components/species";
import { Strains } from "./components/strains";

export function SpeciesViewScreen() {
  const { id, data, isLoading, error, isValidId, isReady } =
    useValidatedNumberIdQuery({
      queryFn: (id) => speciesService.getById(id),
      queryKey: ["specie"],
    });

  const title = titleViewFormatter({
    pageId: id,
    isReady,
    isLoading,
    error,
    name: "Espécie",
    itemName: data?.nome,
  });

  return (
    <div>
      <PageHeader
        icon={Fish}
        title={title}
        path={["Sistema", "Configurações", "Espécies"]}
      />
      <PageState
        isValidId={isValidId}
        isLoading={isLoading}
        error={error}
        isReady={isReady}
      >
        <Accordion
          type="multiple"
          className="w-full rounded-lg border bg-white"
          defaultValue={["specie", "strains"]}
        >
          <Species defaultValues={{ nome: data?.nome ?? "" }} />
          <Strains />
        </Accordion>
      </PageState>
    </div>
  );
}
