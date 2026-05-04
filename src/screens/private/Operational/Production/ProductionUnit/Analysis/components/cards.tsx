import { InfoCard } from "@/components/info-card";
import { InfoCardGrid } from "@/components/info-card-grid";
import { ProductionUnitDetailsModel } from "@/interfaces/models/ProductionUnit";
import { Boxes, Fish, Info, ScrollText, Weight, Wheat } from "lucide-react";
import colors from "tailwindcss/colors";

type CardsProps = {
  details: ProductionUnitDetailsModel;
};

export function Cards({ details }: CardsProps) {
  return (
    <InfoCardGrid className="2xl:grid-cols-7 gap-2">
      <InfoCard
        color={colors.purple[500]}
        title="Setor"
        details={details.nomeSetorProdutivo ?? "-"}
        icon={Boxes}
      />
      <InfoCard
        color={colors.orange[500]}
        title="Fase de cultivo"
        details={details.faseCultivo ?? "-"}
        icon={Fish}
      />
      <InfoCard
        color={colors.blue[500]}
        title="Nº de peixes"
        details={details.numeroPeixes.toString() ?? "-"}
        icon={Fish}
      />
      <InfoCard
        color={colors.yellow[500]}
        title="Peso médio"
        details={details.pesoMedio.toString() ?? "-"}
        icon={Weight}
      />
      <InfoCard
        color={colors.red[500]}
        title="F.C.A."
        details={details.fatorConversaoAlimentar.toString() ?? "-"}
        icon={ScrollText}
      />
      <InfoCard
        color={colors.emerald[500]}
        title="Status"
        details={details.status ?? "-"}
        icon={Info}
      />
      <InfoCard
        color={colors.teal[500]}
        title="Alimentação"
        details={details.tipoAlimentacao ?? "-"}
        icon={Wheat}
      />
    </InfoCardGrid>
  );
}
