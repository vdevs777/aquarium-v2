import { FishFeedForm } from "@/components/forms/fish-feed-form";
import { sectionColors } from "@/components/layout/section-colors";
import { PageHeader } from "@/components/page-header";
import { Wheat } from "lucide-react";

export function FishFeedCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={Wheat}
        title="Cadastrar"
        path={["Sistema", "Configurações", "Ração"]}
        color={sectionColors.system}
      />
      <FishFeedForm />
    </div>
  );
}
