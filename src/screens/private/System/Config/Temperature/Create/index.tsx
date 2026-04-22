import { PageHeader } from "@/components/page-header";
import { Thermometer } from "lucide-react";
import { TemperatureForm } from "@/components/forms/temperature-form";

export function TemperatureCreateScreen() {
  return (
    <div>
      <PageHeader
        icon={Thermometer}
        title="Cadastrar"
        path={["Sistema", "Configurações", "Temperatura"]}
      />
      <TemperatureForm />
    </div>
  );
}
