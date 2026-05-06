import api from "@/api";
import { FishBatchAllocationResponse } from "@/interfaces/http/FishBatch/FishBatchAllocationResponse";
import { FishBatchModel } from "@/interfaces/models/FishBatch";
import { FishBatchSchema } from "@/schemas/fish-batch-schema";

export const fishBatchService = {
  async getAll() {
    const { data } = await api.get<FishBatchModel[]>("/lotes-producao");
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<FishBatchModel>(`/lotes-producao/${id}`);
    return data;
  },

  async getAllocationsById(id: number) {
    const { data } = await api.get<FishBatchAllocationResponse[]>(
      `/lotes-producao/${id}/alocacoes`,
    );
    return data;
  },

  async create(request: FishBatchSchema) {
    const payload: FishBatchModel = {
      ...request,
      id: 0,
      precoTotal: request.numeroTotalPeixes * request.precoUnitario,
      fornecedorNome: "",
      linhagemNome: "",
      numeroPeixesAlocados: 0,
    };

    const { data } = await api.post("/lotes-producao", payload);

    return data;
  },

  async update(id: number, request: FishBatchSchema) {
    const payload: FishBatchModel = {
      ...request,
      id,
      precoTotal: request.numeroTotalPeixes * request.precoUnitario,
      fornecedorNome: "",
      linhagemNome: "",
      numeroPeixesAlocados: 0,
    };

    await api.put(`/lotes-producao/${id}`, payload);
  },

  async deleteById(id: number) {
    await api.delete(`/lotes-producao/${id}`);
  },
};
