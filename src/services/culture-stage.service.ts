import api from "@/api";
import { CultureStageModel } from "@/interfaces/models/CultureStage";
import { FishFeedModel } from "@/interfaces/models/FishFeed";
import { CultureStageSchema } from "@/schemas/culture-stage-schema";
import { FishFeedSchema } from "@/schemas/fish-feed-schema";

async function getAll() {
  const { data } = await api.get<CultureStageModel[]>("/fases-cultivo");
  return data;
}

async function create(request: CultureStageSchema) {
  // PROVISORY
  const payload: CultureStageModel = {
    id: 0,
    frequenciaAlimentar: request.frequenciaAlimentar ?? null,
    cor: request.cor ?? "#FFFFFF",
    ...request,
  };

  const { data } = await api.post<CultureStageModel>("/fases-cultivo", payload);

  return data;
}

async function getById(id: number) {
  const { data } = await api.get<CultureStageModel>(`/fases-cultivo/${id}`);
  return data;
}

async function deleteById(id: number) {
  await api.delete(`/fases-cultivo/${id}`);
}

async function update(id: number, request: CultureStageSchema) {
  const payload: CultureStageModel = {
    id: 0,
    frequenciaAlimentar: request.frequenciaAlimentar ?? null,
    cor: request.cor ?? "#FFFFFF",
    ...request,
  };

  await api.put(`/fases-cultivo/${id}`, payload);
}

async function getModels(id: number) {
  const { data } = await api.get<any[]>(`/fases-cultivo/${id}/modelos`);
  return data;
}

async function addModel(faseId: number, modeloId: number) {
  await api.post(`/fases-cultivo/${faseId}/modelos/${modeloId}`);
}

async function removeModel(faseId: number, modeloId: number) {
  await api.delete(`/fases-cultivo/${faseId}/modelos/${modeloId}`);
}

async function getFeeds(id: number) {
  const { data } = await api.get<FishFeedModel[]>(
    `/fases-cultivo/${id}/racoes`,
  );
  return data;
}

async function addFeed(faseId: number, racaoId: number) {
  await api.post(`/fases-cultivo/${faseId}/racoes/${racaoId}`);
}

async function removeFeed(faseId: number, racaoId: number) {
  await api.delete(`/fases-cultivo/${faseId}/racoes/${racaoId}`);
}

export const cultureStageService = {
  getAll,
  create,
  getById,
  deleteById,
  update,

  getModels,
  addModel,
  removeModel,

  getFeeds,
  addFeed,
  removeFeed,
};
