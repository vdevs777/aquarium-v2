import api from "@/api";
import { FishFeedModel } from "@/interfaces/models/FishFeed";
import { FishFeedSchema } from "@/schemas/fish-feed-schema";

async function getAll() {
  const { data } = await api.get<FishFeedModel[]>("/racoes");
  return data;
}

async function create(request: FishFeedSchema) {
  // PROVISORY
  const payload: FishFeedModel = {
    ...request,
    id: 0,
    ativo: true,
    marcaNome: "",
    empresaId: 0,
  };

  const { data } = await api.post<FishFeedModel>("/racoes", payload);

  return data;
}

async function getById(id: number) {
  const { data } = await api.get<FishFeedModel>(`/racoes/${id}`);
  return data;
}

async function deleteById(id: number) {
  await api.delete(`/racoes/${id}`);
}

async function update(id: number, request: FishFeedSchema) {
  const payload: FishFeedModel = {
    ...request,
    id,
    ativo: true,
    marcaNome: "",
    empresaId: 0,
  };

  await api.put(`/racoes/${id}`, payload);
}

export const fishFeedService = { getAll, create, getById, deleteById, update };
