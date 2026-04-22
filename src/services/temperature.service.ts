import api from "@/api";
import { TemperatureModel } from "@/interfaces/models/Temperature";

type CreateTemperatureRequest = {
  data: Date;
  valor: number;
};

async function getAll() {
  const { data } = await api.get<TemperatureModel[]>("/temperaturas");

  return data.map((item) => ({
    ...item,
    data: new Date(item.data),
  }));
}

async function getById(id: number) {
  const { data } = await api.get<TemperatureModel>(`/temperaturas/${id}`);

  return {
    ...data,
    data: new Date(data.data),
  };
}

async function create(request: CreateTemperatureRequest) {
  const payload = {
    id: 0,
    data: request.data,
    valor: request.valor,
  };

  const { data } = await api.post<{ id: number }>("/temperaturas", payload);

  return data;
}

async function deleteById(id: number) {
  await api.delete(`/temperaturas/${id}`);
}

async function update(id: number, request: CreateTemperatureRequest) {
  const payload = {
    id,
    data: request.data,
    valor: request.valor,
  };

  await api.put(`/temperaturas/${id}`, payload);
}

export const temperatureService = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};
