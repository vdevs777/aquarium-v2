import { Blend, BrickWall, Building2, Settings, Wheat } from "lucide-react";
import { ConfigCard } from "./components/config-card";
import { PageHeader } from "@/components/page-header";

export function ConfigScreen() {
  return (
    <div>
      <PageHeader icon={Settings} title="Configurações" path={["Sistema"]} />
      <div className="flex flex-col gap-4">
        <ConfigCard
          title="Produção"
          links={[
            {
              icon: <Blend size={20} />,
              name: "Modelo de unidade produtiva",
              to: "/config/production-unit-model/list",
            },
            {
              icon: <Building2 size={20} />,
              name: "Marca",
              to: "/config/brand/list",
            },
            {
              icon: <Wheat size={20} />,
              name: "Ração",
              to: "/config/fish-feed/list",
            },
          ]}
        />
      </div>
    </div>
  );
}
