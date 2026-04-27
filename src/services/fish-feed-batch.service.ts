import api from "@/api";

import {
  FishFeedBatchModel,
  FishFeedBatchViewModel,
} from "@/interfaces/models/FishFeedBatch";

import { FishFeedBatchSchema } from "@/schemas/fish-feed-batch-schema";

async function getAll() {
  const { data } = await api.get<FishFeedBatchViewModel[]>("/lotes-racao");
  return data;
}

async function create(request: FishFeedBatchSchema) {
  // PROVISORY
  const payload: FishFeedBatchModel = {
    ...request,
    id: 0,
  };

  const { data } = await api.post<FishFeedBatchViewModel>(
    "/lotes-racao",
    payload,
  );

  return data;
}

async function getById(id: number) {
  const { data } = await api.get<FishFeedBatchViewModel>(`/lotes-racao/${id}`);
  return data;
}

async function deleteById(id: number) {
  await api.delete(`/lotes-racao/${id}`);
}

async function update(id: number, request: FishFeedBatchSchema) {
  const payload: FishFeedBatchModel = {
    ...request,
    id,
  };

  await api.put(`/lotes-racao/${id}`, payload);
}

export const fishFeedBatchService = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};
