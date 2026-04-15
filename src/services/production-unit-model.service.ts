import api from "@/api";
import { ProductionUnitModelModel } from "@/interfaces/models/ProductionUnitModelModel";
import { ProductionUnitModelSchema } from "@/schemas/production-unit-model-schema";

async function create(request: ProductionUnitModelSchema) {
  // PROVISORY
  const payload: ProductionUnitModelModel = { ...request, id: 0, ativo: true };

  const { data } = await api.post("/modelos-unidade-produtiva", payload);

  return data;
}

export const productionUnitModelService = { create };
