import api from "@/api";

import {
  ProductionUnitDetailsModel,
  ProductionUnitModel,
} from "@/interfaces/models/ProductionUnit";

import { IdBodyResponse } from "@/interfaces/http/IdBodyResponse";
import { MoveProductionUnitParams } from "@/interfaces/http/ProductionUnit/MoveProductionUnitParams";

import { ProductionUnitStatus } from "@/interfaces/enums/ProductionUnitStatus";

import {
  ProductionUnitCreateSchema,
  ProductionUnitEditSchema,
} from "@/schemas/production-unit-schema";
import { ProductionUnitAllocationSummary } from "@/interfaces/http/ProductionUnit/ProductionUnitAllocationSummary";
import { ProductionUnitHistoryItem } from "@/interfaces/http/ProductionUnit/ProductionUnitHistoryItem";
import { ProductionUnitEditRequest } from "@/interfaces/http/ProductionUnit/ProductionUnitEditRequest";

export const productionUnitService = {
  async getAll() {
    const { data } =
      await api.get<ProductionUnitModel[]>(`/unidades-produtivas`);
    return data;
  },

  async getDetailed() {
    const { data } = await api.get<ProductionUnitDetailsModel[]>(
      `/unidades-produtivas/detalhes`,
    );
    return data;
  },

  async getByIdDetails(id: number) {
    const { data } = await api.get<ProductionUnitDetailsModel>(
      `/unidades-produtivas/${id}/detalhes`,
    );
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

  async create(request: ProductionUnitCreateSchema) {
    const payload: ProductionUnitModel = {
      ...request,
      id: 0,
      statusId: ProductionUnitStatus.Active,
      setorProdutivoNome: "",
      modeloUnidadeProdutivaNome: "",
      codigoAlimentador: null,
    };

    const { data } = await api.post<IdBodyResponse>(
      "/unidades-produtivas",
      payload,
    );

    return data;
  },

  async edit(id: number, request: ProductionUnitEditRequest) {
    await api.put(`/unidades-produtivas`, request);
  },

  async getSummaryAllocationsById(id: number) {
    const { data } = await api.get<ProductionUnitAllocationSummary[]>(
      `/unidades-produtivas/${id}/alocacoes-resumidas`,
    );
    return data;
  },

  async getHistoryById(id: number) {
    const { data } = await api.get<ProductionUnitHistoryItem[]>(
      `/unidades-produtivas/${id}/historico`,
    );
    return data;
  },
};
