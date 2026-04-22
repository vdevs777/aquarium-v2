import { ProductionUnitModelForm } from "@/components/forms/production-unit-model-form";
import { TemperatureForm } from "@/components/forms/temperature-form";
import { PageHeader } from "@/components/page-header";
import { PageState } from "@/components/page-state";
import { useValidatedNumberIdQuery } from "@/hooks/useValidatedNumberIdQuery";
import { productionUnitModelService } from "@/services/production-unit-model.service";
import { temperatureService } from "@/services/temperature.service";
import { toDatetimeLocal } from "@/utils/date";
import { formatDateTime } from "@/utils/date-fns";
import { titleViewFormatter } from "@/utils/title-view-formatter";
import { Blend, Thermometer } from "lucide-react";
import { useRouter } from "next/router";

export function TemperatureViewScreen() {
  const { id, data, isLoading, error, isValidId, isReady } =
    useValidatedNumberIdQuery({
      queryFn: (id) => temperatureService.getById(id),
      queryKey: ["temperature"],
    });

  const title = titleViewFormatter({
    pageId: id,
    isReady,
    isLoading,
    error,
    name: "Temperatura",
    itemName: formatDateTime(data?.data),
  });

  return (
    <div>
      <PageHeader
        icon={Thermometer}
        title={title}
        path={["Sistema", "Configurações", "Temperatura"]}
      />

      <PageState
        isValidId={isValidId}
        isLoading={isLoading}
        error={error}
        isReady={isReady}
      >
        <TemperatureForm
          defaultValues={{
            data: data?.data ? toDatetimeLocal(data.data) : "",
            valor: data?.valor ?? 0,
          }}
          mode="update"
        />
      </PageState>
    </div>
  );
}
