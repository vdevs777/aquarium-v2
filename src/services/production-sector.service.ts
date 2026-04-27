import api from "@/api";

import {
  ProductionSectorModel,
  ProductionSectorModelWithProductionUnits,
} from "@/interfaces/models/ProductionSector";
import {
  ProductionUnitDetailsModel,
  ProductionUnitModel,
} from "@/interfaces/models/ProductionUnit";

export const productionSectorService = {
  async getAll() {
    const { data } = await api.get<ProductionSectorModel[]>(
      "/setores-produtivos/all",
    );
    return data;
  },

  async create(name: string): Promise<number> {
    const payload: ProductionSectorModel = { id: 0, nome: name };

    const { data } = await api.post<number>("/setores-produtivos", payload);

    return data;
  },

  async delete(id: number) {
    await api.delete(`/setores-produtivos/${id}`);
  },

  async update(id: number, name: string) {
    const payload: ProductionSectorModel = { id, nome: name };

    await api.put<number>(`/setores-produtivos/${id}`, payload);
  },

  async getAllWithUnits() {
    const response = await api.get<
      ProductionSectorModelWithProductionUnits<ProductionUnitModel>[]
    >("/setores-produtivos");

    return response.data;
  },

  async getAllWithUnitsDetails() {
    const response = await api.get<
      ProductionSectorModelWithProductionUnits<ProductionUnitDetailsModel>[]
    >("/setores-produtivos/details");

    return response.data;
  },
};
