import api from "@/api";

import { MoveProductionUnitParams } from "@/interfaces/http/ProductionUnit/MoveProductionUnitParams";
import { ProductionUnitModel } from "@/interfaces/models/ProductionUnit";

export const productionUnitService = {
  async getAll() {
    const { data } =
      await api.get<ProductionUnitModel[]>(`/unidades-produtivas`);
    return data;
  },

  async move({
    productionUnitId,
    destinationSectorId,
    sequence,
  }: MoveProductionUnitParams) {
    await api.post(
      `/unidades-produtivas/${productionUnitId}/mover/${destinationSectorId}`,
      { sequencia: sequence },
    );
  },
};
