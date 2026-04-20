import api from "@/api";
import { BrandModel } from "@/interfaces/models/Brand";
import { BrandSchema } from "@/schemas/fields/brand-schema";

async function create(request: BrandSchema) {
  // PROVISORY
  const payload: BrandModel = { ...request, id: 0, empresaId: 0 };

  const { data } = await api.post("/marcas", payload);

  return data;
}

async function getAll() {
  const { data } = await api.get<BrandModel[]>("/marcas");
  return data;
}

async function getById(id: number) {
  const { data } = await api.get<BrandModel>(`/marcas/${id}`);
  return data;
}

export const brandService = { getAll, getById, create };
