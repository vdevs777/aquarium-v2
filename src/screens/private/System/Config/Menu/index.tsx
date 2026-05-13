import {
  Blend,
  BrickWall,
  Building2,
  Fish,
  Settings,
  Thermometer,
  Wheat,
} from "lucide-react";
import { ConfigCard } from "./components/config-card";
import { PageHeader } from "@/components/page-header";
import { sectionColors } from "@/components/layout/section-colors";
import colors from "tailwindcss/colors";

export function ConfigScreen() {
  return (
    <div>
      <PageHeader
        icon={Settings}
        title="Configurações"
        path={["Sistema"]}
        color={sectionColors.system}
      />
      <div className="flex flex-col gap-4">
        <ConfigCard
          title="Produção"
          color={colors.purple[600]}
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
            {
              icon: <Fish size={20} />,
              name: "Espécies",
              to: "/config/species/list",
            },
            {
              icon: <Thermometer size={20} />,
              name: "Temperatura",
              to: "/config/temperature/list",
            },
          ]}
        />
      </div>
    </div>
  );
}
