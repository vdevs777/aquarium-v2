import { FishFeedForm } from "@/components/forms/fish-feed-form";
import { SpeciesForm } from "@/components/forms/species-form";
import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { Fish, Wheat } from "lucide-react";

export function SpeciesCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={Fish}
        title="Cadastrar"
        path={["Sistema", "Configurações", "Espécies"]}
        color={sectionColors.system}
      />
      <SpeciesForm />
    </div>
  );
}
