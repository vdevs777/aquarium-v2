import api from "@/api";
import { ProductionUnitModelModel } from "@/interfaces/models/ProductionUnitModel";
import { ProductionUnitModelSchema } from "@/schemas/production-unit-model-schema";

async function create(request: ProductionUnitModelSchema) {
  // PROVISORY
  const payload: ProductionUnitModelModel = { ...request, id: 0, ativo: true };

  const { data } = await api.post("/modelos-unidade-produtiva", payload);

  return data;
}

async function getAll() {
  const { data } = await api.get<ProductionUnitModelModel[]>(
    "/modelos-unidade-produtiva",
  );
  return data;
}

async function getById(id: number) {
  const { data } = await api.get<ProductionUnitModelModel>(
    `/modelos-unidade-produtiva/${id}`,
  );
  return data;
}

export const productionUnitModelService = { create, getAll, getById };
