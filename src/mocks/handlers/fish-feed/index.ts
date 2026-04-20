import { http } from "msw";
import { withDelay } from "@/mocks/utils/with-delay";
import { FishFeedModel } from "@/interfaces/models/FishFeed";

const STORAGE_KEY = "fish_feeds";

const fishFeedNames = [
  "Tilápia Growth",
  "Alevino Start",
  "Premium Fish Pro",
  "AquaMax Energy",
  "FishPower 32%",
  "Tilápia Engorda",
  "AquaLife Balance",
  "FishBoost Plus",
  "Ração Marinha Pro",
  "AquaNutri Max",
  "Fish Prime",
  "Alevino Nutri",
  "AquaGold",
  "Fish Strong",
  "Tilápia Premium",
  "AquaFit",
  "Fish Energia+",
  "Ração AquaPro",
  "Fish Select",
  "AquaGrowth",
];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function random(min: number, max: number, decimals = 2) {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

function createInitialData(): FishFeedModel[] {
  return shuffleArray(fishFeedNames).map((nome, index) => {
    const proteinaBruta = random(28, 45);
    const energia = random(2500, 3500);

    return {
      id: index + 1,
      nome,
      observacao: Math.random() > 0.5 ? "Ração de alta performance" : null,
      ativo: Math.random() > 0.2,
      marcaId: Math.floor(Math.random() * 10) + 1,
      marcaNome: "Marca " + (index + 1),
      estoqueMinimoKg: random(100, 500),
      estoqueMaximoKg: random(600, 2000),
      proteinaBruta,
      energia,
      granulometria: random(1, 10),
      taxaProteinaEnergia: Number((proteinaBruta / energia).toFixed(4)),
      empresaId: Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : null,
    };
  });
}

function getAll(): FishFeedModel[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const initial = createInitialData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  return JSON.parse(data);
}

function saveAll(data: FishFeedModel[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getNextId(data: FishFeedModel[]) {
  if (data.length === 0) return 1;
  return Math.max(...data.map((item) => item.id)) + 1;
}

export const getFishFeedHandler = http.get(
  "*/racoes",
  withDelay(async () => {
    const data = getAll();
    return Response.json(data, { status: 200 });
  }),
);

export const createFishFeedHandler = http.post(
  "*/racoes",
  withDelay(async ({ request }) => {
    const body = (await request.json()) as Partial<FishFeedModel>;

    const data = getAll();

    const newItem: FishFeedModel = {
      id: getNextId(data),
      nome: body.nome ?? null,
      observacao: body.observacao ?? null,
      ativo: true,
      marcaId: body.marcaId ?? 0,
      marcaNome: null,
      estoqueMinimoKg: body.estoqueMinimoKg ?? 0,
      estoqueMaximoKg: body.estoqueMaximoKg ?? 0,
      proteinaBruta: body.proteinaBruta ?? 0,
      energia: body.energia ?? 0,
      granulometria: body.granulometria ?? 0,
      taxaProteinaEnergia: body.taxaProteinaEnergia ?? 0,
      empresaId: null,
    };

    data.push(newItem);
    saveAll(data);

    return Response.json(newItem, { status: 201 });
  }),
);

export const getFishFeedByIdHandler = http.get(
  "*/racoes/:id",
  withDelay(async ({ params }) => {
    const id = Number(params.id);

    const data = getAll();
    const item = data.find((f) => f.id === id);

    if (!item) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(item, { status: 200 });
  }),
);

export const deleteFishFeedHandler = http.delete(
  "*/racoes/:id",
  withDelay(async ({ params }) => {
    const id = Number(params.id);

    const data = getAll();
    const index = data.findIndex((f) => f.id === id);

    if (index === -1) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    data.splice(index, 1);
    saveAll(data);

    return new Response(null, { status: 204 });
  }),
);

export const updateFishFeedHandler = http.put(
  "*/racoes/:id",
  withDelay(async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Partial<FishFeedModel>;

    const data = getAll();
    const index = data.findIndex((f) => f.id === id);

    if (index === -1) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    const updated: FishFeedModel = {
      ...data[index],
      ...body,
      id,
    };

    data[index] = updated;
    saveAll(data);

    return Response.json(updated, { status: 200 });
  }),
);

export function populateFishFeeds(): FishFeedModel[] {
  const initial = createInitialData();
  saveAll(initial);
  return initial;
}

export const fishFeedHandlers = [
  getFishFeedHandler,
  createFishFeedHandler,
  getFishFeedByIdHandler,
  updateFishFeedHandler,
  deleteFishFeedHandler,
];
