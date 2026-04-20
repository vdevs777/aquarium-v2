import api from "@/api";

import { SpeciesModel } from "@/interfaces/models/Species";
import { SpeciesSchema } from "@/schemas/species-schema";

async function getAll() {
  const { data } = await api.get<SpeciesModel[]>("/especies");
  return data;
}

async function create(request: SpeciesSchema) {
  // PROVISORY
  const payload = { id: 0, ...request };

  const { data } = await api.post<SpeciesModel>("/especies", payload);
  return data;
}

async function getById(id: number) {
  const { data } = await api.get<SpeciesModel>(`/especies/${id}`);
  return data;
}

async function update(id: number, request: SpeciesSchema) {
  // PROVISORY
  const payload = { id, ...request };

  await api.put<SpeciesModel>(`/especies/${id}`, payload);
}

async function deleteById(id: number) {
  await api.delete(`/especies/${id}`);
}

export const speciesService = { getAll, create, getById, update, deleteById };
