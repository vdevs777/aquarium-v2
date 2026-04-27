import { http } from "msw";
import { withDelay } from "@/mocks/utils/with-delay";
import {
  FishFeedBatchModel,
  FishFeedBatchViewModel,
} from "@/interfaces/models/FishFeedBatch";

const STORAGE_KEY = "fish_feed_batches";

const racaoNomes = [
  "Tilápia Growth",
  "Alevino Start",
  "Premium Fish Pro",
  "AquaMax Energy",
  "FishPower 32%",
];

const fornecedorNomes = [
  "Fornecedor A",
  "Fornecedor B",
  "Fornecedor C",
  "Fornecedor D",
];

function random(min: number, max: number, decimals = 2) {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date.toISOString();
}

function createInitialData(): FishFeedBatchViewModel[] {
  return Array.from({ length: 20 }).map((_, index) => {
    const racaoIndex = randomInt(0, racaoNomes.length - 1);
    const fornecedorIndex = randomInt(0, fornecedorNomes.length - 1);

    const quantidade = random(500, 2000);
    const usado = random(0, quantidade);
    const saldo = Number((quantidade - usado).toFixed(2));

    return {
      id: index + 1,
      racaoId: racaoIndex + 1,
      racaoNome: racaoNomes[racaoIndex],
      fornecedorId: fornecedorIndex + 1,
      fornecedorNome: fornecedorNomes[fornecedorIndex],
      dataCompra: randomDate(new Date(2024, 0, 1), new Date()),
      dataValidade: randomDate(new Date(), new Date(2027, 11, 31)),
      numeroLote: `LOTE-${randomInt(1000, 9999)}`,
      numeroNotaFiscal: String(randomInt(1, 999999)).padStart(9, "0"),
      quantidade,
      saldo,
      empresaId: randomInt(1, 5),
    };
  });
}

function getAll(): FishFeedBatchViewModel[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const initial = createInitialData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  return JSON.parse(data);
}

function saveAll(data: FishFeedBatchViewModel[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getNextId(data: FishFeedBatchViewModel[]) {
  if (data.length === 0) return 1;
  return Math.max(...data.map((i) => i.id)) + 1;
}

function buildViewModel(
  base: FishFeedBatchModel,
  existing?: FishFeedBatchViewModel,
): FishFeedBatchViewModel {
  return {
    ...base,
    racaoNome:
      existing?.racaoNome ?? racaoNomes[(base.racaoId - 1) % racaoNomes.length],
    fornecedorNome:
      existing?.fornecedorNome ??
      fornecedorNomes[(base.fornecedorId - 1) % fornecedorNomes.length],
    empresaId: existing?.empresaId ?? randomInt(1, 5),
  };
}

export const getFishFeedBatchHandler = http.get(
  "*/lotes-racao",
  withDelay(async () => {
    const data = getAll();
    return Response.json(data, { status: 200 });
  }),
);

export const getFishFeedBatchByIdHandler = http.get(
  "*/lotes-racao/:id",
  withDelay(async ({ params }) => {
    const id = Number(params.id);
    const data = getAll();

    const item = data.find((i) => i.id === id);

    if (!item) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(item, { status: 200 });
  }),
);

export const createFishFeedBatchHandler = http.post(
  "*/lotes-racao",
  withDelay(async ({ request }) => {
    const body = (await request.json()) as FishFeedBatchModel;

    const data = getAll();

    const base: FishFeedBatchModel = {
      id: getNextId(data),
      racaoId: body.racaoId,
      fornecedorId: body.fornecedorId,
      dataCompra: body.dataCompra,
      dataValidade: body.dataValidade,
      numeroLote: body.numeroLote,
      numeroNotaFiscal: body.numeroNotaFiscal,
      quantidade: body.quantidade,
      saldo: body.saldo,
    };

    const newItem = buildViewModel(base);

    data.push(newItem);
    saveAll(data);

    return Response.json(newItem, { status: 201 });
  }),
);

export const updateFishFeedBatchHandler = http.put(
  "*/lotes-racao/:id",
  withDelay(async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as FishFeedBatchModel;

    const data = getAll();
    const index = data.findIndex((i) => i.id === id);

    if (index === -1) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    const base: FishFeedBatchModel = {
      id,
      racaoId: body.racaoId,
      fornecedorId: body.fornecedorId,
      dataCompra: body.dataCompra,
      dataValidade: body.dataValidade,
      numeroLote: body.numeroLote,
      numeroNotaFiscal: body.numeroNotaFiscal,
      quantidade: body.quantidade,
      saldo: body.saldo,
    };

    const updated = buildViewModel(base, data[index]);

    data[index] = updated;
    saveAll(data);

    return Response.json(updated, { status: 200 });
  }),
);

export const deleteFishFeedBatchHandler = http.delete(
  "*/lotes-racao/:id",
  withDelay(async ({ params }) => {
    const id = Number(params.id);
    const data = getAll();

    const index = data.findIndex((i) => i.id === id);

    if (index === -1) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    data.splice(index, 1);
    saveAll(data);

    return new Response(null, { status: 204 });
  }),
);

export function populateFishFeedBatches(): FishFeedBatchViewModel[] {
  const initial = createInitialData();
  saveAll(initial);
  return initial;
}

export const fishFeedBatchHandlers = [
  getFishFeedBatchHandler,
  getFishFeedBatchByIdHandler,
  createFishFeedBatchHandler,
  updateFishFeedBatchHandler,
  deleteFishFeedBatchHandler,
];
