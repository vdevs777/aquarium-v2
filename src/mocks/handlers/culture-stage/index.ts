import { http } from "msw";
import { withDelay } from "@/mocks/utils/with-delay";
import { CultureStageModel } from "@/interfaces/models/CultureStage";

const STORAGE_KEY = "culture_stages";

const stageNames = [
  "Alevinagem",
  "Crescimento Inicial",
  "Engorda",
  "Finalização",
  "Pré-abate",
  "Juvenil",
  "Desenvolvimento",
  "Recria",
];

const MODELS_KEY = "culture_stage_models";
const FEEDS_KEY = "culture_stage_feeds";

function getRelations(key: string): Record<number, number[]> {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
}

function saveRelations(key: string, value: Record<number, number[]>) {
  localStorage.setItem(key, JSON.stringify(value));
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function random(min: number, max: number, decimals = 2) {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

function createInitialData(): CultureStageModel[] {
  return shuffleArray(stageNames).map((nome, index) => {
    const pesoInicial = random(1, 50);
    const pesoFinal = random(pesoInicial + 10, pesoInicial + 500);
    const diasCultivo = Math.floor(random(10, 120, 0));

    return {
      id: index + 1,
      nome,

      pesoInicial,
      pesoFinal,
      diasCultivo,

      ganhoPesoDia: Number(
        ((pesoFinal - pesoInicial) / diasCultivo).toFixed(2),
      ),

      percentualMortalidade: random(0, 10),
      densidadeM3: Math.floor(random(10, 100, 0)),

      kgPorM3: random(10, 100),
      fatorConversaoAlimentarEsperado: random(1, 3),
      volumeM3: random(100, 1000),

      frequenciaAlimentar:
        Math.random() > 0.3 ? Math.floor(random(1, 5, 0)) : null,

      cor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };
  });
}

function getAll(): CultureStageModel[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const initial = createInitialData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  return JSON.parse(data);
}

function saveAll(data: CultureStageModel[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getNextId(data: CultureStageModel[]) {
  if (data.length === 0) return 1;
  return Math.max(...data.map((item) => item.id)) + 1;
}

export const getCultureStageHandler = http.get(
  "*/fases-cultivo",
  withDelay(async () => {
    const data = getAll();
    return Response.json(data, { status: 200 });
  }),
);

export const createCultureStageHandler = http.post(
  "*/fases-cultivo",
  withDelay(async ({ request }) => {
    const body = (await request.json()) as Partial<CultureStageModel>;

    const data = getAll();

    const newItem: CultureStageModel = {
      id: getNextId(data),

      nome: body.nome ?? "",

      pesoInicial: body.pesoInicial ?? 0,
      pesoFinal: body.pesoFinal ?? 0,
      diasCultivo: body.diasCultivo ?? 0,

      ganhoPesoDia:
        body.ganhoPesoDia ??
        (body.pesoFinal && body.pesoInicial && body.diasCultivo
          ? Number(
              ((body.pesoFinal - body.pesoInicial) / body.diasCultivo).toFixed(
                2,
              ),
            )
          : 0),

      percentualMortalidade: body.percentualMortalidade ?? 0,
      densidadeM3: body.densidadeM3 ?? 0,

      kgPorM3: body.kgPorM3 ?? 0,
      fatorConversaoAlimentarEsperado:
        body.fatorConversaoAlimentarEsperado ?? 0,
      volumeM3: body.volumeM3 ?? 0,

      frequenciaAlimentar: body.frequenciaAlimentar ?? null,
      cor: body.cor ?? null,
    };

    data.push(newItem);
    saveAll(data);

    return Response.json(newItem, { status: 201 });
  }),
);

export const getCultureStageByIdHandler = http.get(
  "*/fases-cultivo/:id",
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

export const deleteCultureStageHandler = http.delete(
  "*/fases-cultivo/:id",
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

export const updateCultureStageHandler = http.put(
  "*/fases-cultivo/:id",
  withDelay(async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Partial<CultureStageModel>;

    const data = getAll();
    const index = data.findIndex((f) => f.id === id);

    if (index === -1) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    const updated: CultureStageModel = {
      ...data[index],
      ...body,
      id,
    };

    data[index] = updated;
    saveAll(data);

    return Response.json(updated, { status: 200 });
  }),
);

export const getCultureStageFeedsHandler = http.get(
  "*/fases-cultivo/:faseCultivoId/racoes",
  withDelay(async ({ params }) => {
    const faseId = Number(params.faseCultivoId);

    const relations = getRelations(FEEDS_KEY);
    const ids = relations[faseId] ?? [];

    const allFeeds = JSON.parse(localStorage.getItem("fish_feeds") || "[]");

    const result = allFeeds.filter((f: any) => ids.includes(f.id));

    return Response.json(result, { status: 200 });
  }),
);

export const addFeedToCultureStageHandler = http.post(
  "*/fases-cultivo/:faseCultivoId/racoes/:racaoId",
  withDelay(async ({ params }) => {
    const faseId = Number(params.faseCultivoId);
    const racaoId = Number(params.racaoId);

    const relations = getRelations(FEEDS_KEY);

    if (!relations[faseId]) {
      relations[faseId] = [];
    }

    if (!relations[faseId].includes(racaoId)) {
      relations[faseId].push(racaoId);
    }

    saveRelations(FEEDS_KEY, relations);

    return new Response(null, { status: 204 });
  }),
);

export const removeFeedFromCultureStageHandler = http.delete(
  "*/fases-cultivo/:faseCultivoId/racoes/:racaoId",
  withDelay(async ({ params }) => {
    const faseId = Number(params.faseCultivoId);
    const racaoId = Number(params.racaoId);

    const relations = getRelations(FEEDS_KEY);

    relations[faseId] = relations[faseId]?.filter((id) => id !== racaoId) ?? [];

    saveRelations(FEEDS_KEY, relations);

    return new Response(null, { status: 204 });
  }),
);

export const getCultureStageModelsHandler = http.get(
  "*/fases-cultivo/:faseCultivoId/modelos",
  withDelay(async ({ params }) => {
    const faseId = Number(params.faseCultivoId);

    const relations = getRelations(MODELS_KEY);
    const ids = relations[faseId] ?? [];

    const allModels = Array.from({ length: 10 }).map((_, index) => ({
      id: index + 1,
      nome: `Modelo ${index + 1}`,
    }));

    const result = allModels.filter((m) => ids.includes(m.id));

    return Response.json(result, { status: 200 });
  }),
);

export const addModelToCultureStageHandler = http.post(
  "*/fases-cultivo/:faseCultivoId/modelos/:modeloId",
  withDelay(async ({ params }) => {
    const faseId = Number(params.faseCultivoId);
    const modeloId = Number(params.modeloId);

    const relations = getRelations(MODELS_KEY);

    if (!relations[faseId]) {
      relations[faseId] = [];
    }

    if (!relations[faseId].includes(modeloId)) {
      relations[faseId].push(modeloId);
    }

    saveRelations(MODELS_KEY, relations);

    return new Response(null, { status: 204 });
  }),
);

export const removeModelFromCultureStageHandler = http.delete(
  "*/fases-cultivo/:faseCultivoId/modelos/:modeloId",
  withDelay(async ({ params }) => {
    const faseId = Number(params.faseCultivoId);
    const modeloId = Number(params.modeloId);

    const relations = getRelations(MODELS_KEY);

    relations[faseId] =
      relations[faseId]?.filter((id) => id !== modeloId) ?? [];

    saveRelations(MODELS_KEY, relations);

    return new Response(null, { status: 204 });
  }),
);

export function populateCultureStages(): CultureStageModel[] {
  const initial = createInitialData();
  saveAll(initial);
  return initial;
}

export const cultureStageHandlers = [
  getCultureStageHandler,
  createCultureStageHandler,
  getCultureStageByIdHandler,
  updateCultureStageHandler,
  deleteCultureStageHandler,

  getCultureStageFeedsHandler,
  addFeedToCultureStageHandler,
  removeFeedFromCultureStageHandler,

  getCultureStageModelsHandler,
  addModelToCultureStageHandler,
  removeModelFromCultureStageHandler,
];
