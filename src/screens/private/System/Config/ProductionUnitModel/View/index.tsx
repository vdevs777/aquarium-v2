import { ProductionUnitModelForm } from "@/components/forms/production-unit-model-form";
import { PageHeader } from "@/components/page-header";
import { PageState } from "@/components/page-state";
import { useValidatedNumberIdQuery } from "@/hooks/useValidatedNumberIdQuery";
import { productionUnitModelService } from "@/services/production-unit-model.service";
import { titleViewFormatter } from "@/utils/title-view-formatter";
import { Blend } from "lucide-react";
import { useRouter } from "next/router";

export function ProductionUnitModelViewScreen() {
  const { id, data, isLoading, error, isValidId, isReady } =
    useValidatedNumberIdQuery({
      queryFn: (id) => productionUnitModelService.getById(id),
      queryKey: ["production-unit-model"],
    });

  const title = titleViewFormatter({
    pageId: id,
    isReady,
    isLoading,
    error,
    name: "Modelo de Unidade Produtiva",
    itemName: data?.nome,
  });

  return (
    <div>
      <PageHeader
        icon={Blend}
        title={title}
        path={["Sistema", "Configurações", "Modelo de Unidade Produtiva"]}
      />

      <PageState
        isValidId={isValidId}
        isLoading={isLoading}
        error={error}
        isReady={isReady}
      >
        <ProductionUnitModelForm
          defaultValues={{
            areaSuperficieM2: data?.areaSuperficieM2 ?? 0,
            circunferencia: data?.circunferencia ?? 0,
            comprimento: data?.comprimento ?? 0,
            ehCircunferencia: data?.ehCircunferencia ?? false,
            largura: data?.largura ?? 0,
            nome: data?.nome!,
            profundidade: data?.profundidade ?? 0,
            volumeM3: data?.volumeM3 ?? 0,
          }}
        />
      </PageState>
    </div>
  );
}
