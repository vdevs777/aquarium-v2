import { http } from "msw";
import { withDelay } from "@/mocks/utils/with-delay";
import { TemperatureModel } from "@/interfaces/models/Temperature";

const STORAGE_KEY = "temperaturas";

function random(min: number, max: number, decimals = 2) {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

export function populateTemperatures() {
  const now = new Date();

  const temperatures: TemperatureModel[] = Array.from({ length: 20 }).map(
    (_, index) => {
      const date = new Date(now);
      date.setHours(date.getHours() - index * 6);

      return {
        id: index + 1,
        data: date,
        valor: random(20, 35),
      };
    },
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(temperatures));

  return temperatures;
}

function createInitialData(): TemperatureModel[] {
  const now = new Date();

  return Array.from({ length: 20 }).map((_, index) => {
    const date = new Date(now);
    date.setHours(date.getHours() - index * 6);

    return {
      id: index + 1,
      data: date, // vai virar string automaticamente no storage
      valor: random(20, 35),
    };
  });
}

function getAll(): TemperatureModel[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const initial = createInitialData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  return JSON.parse(data);
}

function saveAll(data: TemperatureModel[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getNextId(data: TemperatureModel[]) {
  if (data.length === 0) return 1;
  return Math.max(...data.map((item) => item.id)) + 1;
}

export const getTemperaturesHandler = http.get(
  "*/temperaturas",
  withDelay(async () => {
    const data = getAll();
    return Response.json(data, { status: 200 });
  }),
);

export const getTemperatureByIdHandler = http.get(
  "*/temperaturas/:id",
  withDelay(async ({ params }) => {
    const id = Number(params.id);

    const data = getAll();
    const item = data.find((t) => t.id === id);

    if (!item) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(item, { status: 200 });
  }),
);

export const createTemperatureHandler = http.post(
  "*/temperaturas",
  withDelay(async ({ request }) => {
    const body = (await request.json()) as Partial<TemperatureModel>;

    const data = getAll();

    const newId = getNextId(data);

    const newItem: TemperatureModel = {
      id: newId,
      data: body.data ?? new Date(),
      valor: body.valor ?? 0,
    };

    data.push(newItem);
    saveAll(data);

    return Response.json({ id: newId }, { status: 200 });
  }),
);

export const updateTemperatureHandler = http.put(
  "*/temperaturas/:id",
  withDelay(async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Partial<TemperatureModel>;

    const data = getAll();
    const index = data.findIndex((t) => t.id === id);

    if (index === -1) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    const updated: TemperatureModel = {
      ...data[index],
      ...body,
      id,
    };

    data[index] = updated;
    saveAll(data);

    return new Response(null, { status: 200 });
  }),
);

export const deleteTemperatureHandler = http.delete(
  "*/temperaturas/:id",
  withDelay(async ({ params }) => {
    const id = Number(params.id);

    const data = getAll();
    const index = data.findIndex((t) => t.id === id);

    if (index === -1) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    data.splice(index, 1);
    saveAll(data);

    return new Response(null, { status: 200 });
  }),
);

export const temperatureHandlers = [
  getTemperaturesHandler,
  getTemperatureByIdHandler,
  createTemperatureHandler,
  updateTemperatureHandler,
  deleteTemperatureHandler,
];
