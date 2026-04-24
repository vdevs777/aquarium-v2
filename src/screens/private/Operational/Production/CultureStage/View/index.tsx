import { CultureStageForm } from "@/components/forms/culture-stage-form";
import { PageHeader } from "@/components/page-header";
import { PageState } from "@/components/page-state";
import { Box } from "@/components/ui/box";
import { Section } from "@/components/ui/section";
import { useValidatedNumberIdQuery } from "@/hooks/useValidatedNumberIdQuery";
import { cultureStageService } from "@/services/culture-stage.service";
import { titleViewFormatter } from "@/utils/title-view-formatter";
import { Fish } from "lucide-react";
import { CultureStageBox } from "./components/boxes/culture-stage-box";
import { FishFeedBox } from "./components/boxes/fish-feed-box";
import { ProductionUnitModelBox } from "./components/boxes/production-unit-model-box";

export function CultureStageViewScreen() {
  const { id, data, isLoading, error, isValidId, isReady } =
    useValidatedNumberIdQuery({
      queryFn: (id) => cultureStageService.getById(id),
      queryKey: ["fish-feed"],
    });

  const title = titleViewFormatter({
    pageId: id,
    isReady,
    isLoading,
    error,
    name: "Fase de cultivo",
    itemName: data?.nome ?? "Fase de cultivo",
  });

  return (
    <div>
      <PageHeader
        icon={Fish}
        title={title}
        path={["Operacional", "Produção", "Fase de cultivo"]}
      />
      <PageState
        isValidId={isValidId}
        isLoading={isLoading}
        error={error}
        isReady={isReady}
      >
        <div className="space-y-4">
          <CultureStageBox data={data} />
          <div className="flex flex-row gap-4">
            <FishFeedBox /> <ProductionUnitModelBox />
          </div>
        </div>
      </PageState>
    </div>
  );
}
