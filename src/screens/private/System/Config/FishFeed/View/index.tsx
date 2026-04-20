import { FishFeedForm } from "@/components/forms/fish-feed-form";
import { PageHeader } from "@/components/page-header";
import { PageState } from "@/components/page-state";
import { useValidatedNumberIdQuery } from "@/hooks/useValidatedNumberIdQuery";
import { fishFeedService } from "@/services/fish-feed.service";
import { titleViewFormatter } from "@/utils/title-view-formatter";
import { Blend } from "lucide-react";

export function FishFeedViewScreen() {
  const { id, data, isLoading, error, isValidId, isReady } =
    useValidatedNumberIdQuery({
      queryFn: (id) => fishFeedService.getById(id),
      queryKey: ["fish-feed"],
    });

  const title = titleViewFormatter({
    pageId: id,
    isReady,
    isLoading,
    error,
    name: "Ração",
    itemName: data?.nome ?? "Ração",
  });

  return (
    <div>
      <PageHeader
        icon={Blend}
        title={title}
        path={["Sistema", "Configurações", "Ração"]}
      />

      <PageState
        isValidId={isValidId}
        isLoading={isLoading}
        error={error}
        isReady={isReady}
      >
        <FishFeedForm
          defaultValues={{
            energia: data?.energia ?? 0,
            estoqueMaximoKg: data?.estoqueMaximoKg ?? 0,
            estoqueMinimoKg: data?.estoqueMinimoKg ?? 0,
            granulometria: data?.granulometria ?? 0,
            marcaId: data?.marcaId ?? 0,
            nome: data?.nome ?? "",
            observacao: data?.observacao ?? "",
            proteinaBruta: data?.proteinaBruta ?? 0,
            taxaProteinaEnergia: data?.taxaProteinaEnergia ?? 0,
          }}
          mode="update"
        />
      </PageState>
    </div>
  );
}
