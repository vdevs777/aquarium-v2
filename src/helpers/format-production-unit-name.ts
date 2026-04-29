import { ProductionUnitModel } from "@/interfaces/models/ProductionUnit";

export function formatProductionUnitName(productionUnit: ProductionUnitModel) {
  return `${productionUnit.setorProdutivoNome ?? "*"} - ${productionUnit.codigo}${productionUnit.sequencia ? `.${productionUnit.sequencia}` : ""}`;
}
