import { FishFeedForm } from "@/components/forms/fish-feed-form";
import { SpeciesForm } from "@/components/forms/species-form";
import { PageHeader } from "@/components/page-header";
import { Fish, Wheat } from "lucide-react";

export function SpeciesCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={Fish}
        title="Cadastrar"
        path={["Sistema", "Configurações", "Espécies"]}
      />
      <SpeciesForm />
    </div>
  );
}
