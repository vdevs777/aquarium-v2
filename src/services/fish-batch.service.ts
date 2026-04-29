import api from "@/api";
import { FishBatchModel } from "@/interfaces/models/FishBatch";

export const fishBatchService = {
  async getAll() {
    const { data } = await api.get<FishBatchModel[]>("/lotes-producao");

    return data;
  },
};
