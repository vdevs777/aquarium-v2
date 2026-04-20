import { http } from "msw";
import { withDelay } from "@/mocks/utils/with-delay";
import { SpeciesModel } from "@/interfaces/models/Species";
import { StrainModel } from "@/interfaces/models/Strain";
import { speciesSchema } from "@/schemas/species-schema";
import { strainSchema } from "@/schemas/strain-schema";

const SPECIES_KEY = "species";
const STRAINS_KEY = "strains";

export function populateSpecies() {
  const species: SpeciesModel[] = [
    { id: 1, nome: "Tilápia" },
    { id: 2, nome: "Tambaqui" },
    { id: 3, nome: "Pacu" },
  ];

  const strains: StrainModel[] = [
    { id: 1, nome: "GIFT", especieId: 1, especieNome: "Tilápia" },
    { id: 2, nome: "Supreme", especieId: 1, especieNome: "Tilápia" },
    { id: 3, nome: "Red", especieId: 2, especieNome: "Tambaqui" },
    { id: 4, nome: "Tambacu", especieId: 2, especieNome: "Tambaqui" },
    { id: 5, nome: "Pacu Silver", especieId: 3, especieNome: "Pacu" },
  ];

  localStorage.setItem(SPECIES_KEY, JSON.stringify(species));
  localStorage.setItem(STRAINS_KEY, JSON.stringify(strains));
}

function getSpecies(): SpeciesModel[] {
  const data = localStorage.getItem(SPECIES_KEY);
  if (!data) {
    const initial: SpeciesModel[] = [
      { id: 1, nome: "Tilápia" },
      { id: 2, nome: "Tambaqui" },
      { id: 3, nome: "Pacu" },
    ];
    localStorage.setItem(SPECIES_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
}

function saveSpecies(data: SpeciesModel[]) {
  localStorage.setItem(SPECIES_KEY, JSON.stringify(data));
}

function getStrains(): StrainModel[] {
  const data = localStorage.getItem(STRAINS_KEY);
  if (!data) {
    const initial: StrainModel[] = [
      { id: 1, nome: "GIFT", especieId: 1, especieNome: "Tilápia" },
      { id: 2, nome: "Supreme", especieId: 1, especieNome: "Tilápia" },
      { id: 3, nome: "Red", especieId: 2, especieNome: "Tambaqui" },
    ];
    localStorage.setItem(STRAINS_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
}

function saveStrains(data: StrainModel[]) {
  localStorage.setItem(STRAINS_KEY, JSON.stringify(data));
}

function nextId(list: { id: number }[]) {
  return list.length ? Math.max(...list.map((i) => i.id)) + 1 : 1;
}

export const getSpeciesHandler = http.get(
  "*/especies",
  withDelay(async () => {
    return Response.json(getSpecies(), { status: 200 });
  }),
);

export const createSpeciesHandler = http.post(
  "*/especies",
  withDelay(async ({ request }) => {
    const body = await request.json();

    try {
      const parsed = speciesSchema.parse(body);

      const data = getSpecies();

      const newItem: SpeciesModel = {
        id: nextId(data),
        nome: parsed.nome,
      };

      data.push(newItem);
      saveSpecies(data);

      return Response.json(newItem, { status: 201 });
    } catch {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }
  }),
);

export const getSpeciesByIdHandler = http.get(
  "*/especies/:id",
  withDelay(async ({ params }) => {
    const id = Number(params.id);
    const item = getSpecies().find((s) => s.id === id);

    if (!item) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(item, { status: 200 });
  }),
);

export const updateSpeciesHandler = http.put(
  "*/especies/:id",
  withDelay(async ({ params, request }) => {
    const id = Number(params.id);
    const body = await request.json();

    try {
      const parsed = speciesSchema.parse(body);

      const data = getSpecies();
      const index = data.findIndex((s) => s.id === id);

      if (index === -1) {
        return Response.json({ message: "Not found" }, { status: 404 });
      }

      data[index] = {
        id,
        nome: parsed.nome,
      };

      saveSpecies(data);

      return Response.json(data[index], { status: 200 });
    } catch {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }
  }),
);

export const deleteSpeciesHandler = http.delete(
  "*/especies/:id",
  withDelay(async ({ params }) => {
    const id = Number(params.id);

    const data = getSpecies();
    const index = data.findIndex((s) => s.id === id);

    if (index === -1) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    data.splice(index, 1);
    saveSpecies(data);

    const strains = getStrains().filter((s) => s.especieId !== id);
    saveStrains(strains);

    return new Response(null, { status: 204 });
  }),
);

export const getAllStrainsHandler = http.get(
  "*/especies/linhagens",
  withDelay(async () => {
    return Response.json(getStrains(), { status: 200 });
  }),
);

export const getStrainsFromSpeciesHandler = http.get(
  "*/especies/:speciesId/linhagens",
  withDelay(async ({ params }) => {
    const speciesId = Number(params.speciesId);

    const strains = getStrains().filter((s) => s.especieId === speciesId);

    return Response.json(strains, { status: 200 });
  }),
);

export const createStrainHandler = http.post(
  "*/especies/:speciesId/linhagens",
  withDelay(async ({ params, request }) => {
    const speciesId = Number(params.speciesId);
    const body = await request.json();

    const species = getSpecies().find((s) => s.id === speciesId);

    if (!species) {
      return Response.json({ message: "Species not found" }, { status: 404 });
    }

    try {
      const parsed = strainSchema.parse(body);

      const data = getStrains();

      const newItem: StrainModel = {
        id: nextId(data),
        nome: parsed.nome,
        especieId: speciesId,
        especieNome: species.nome,
      };

      data.push(newItem);
      saveStrains(data);

      return Response.json(newItem, { status: 201 });
    } catch {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }
  }),
);

export const getStrainByIdHandler = http.get(
  "*/especies/:speciesId/linhagens/:strainId",
  withDelay(async ({ params }) => {
    const strainId = Number(params.strainId);

    const item = getStrains().find((s) => s.id === strainId);

    if (!item) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(item, { status: 200 });
  }),
);

export const updateStrainHandler = http.put(
  "*/especies/:speciesId/linhagens/:strainId",
  withDelay(async ({ params, request }) => {
    const strainId = Number(params.strainId);
    const speciesId = Number(params.speciesId);
    const body = await request.json();

    const species = getSpecies().find((s) => s.id === speciesId);

    if (!species) {
      return Response.json({ message: "Species not found" }, { status: 404 });
    }

    try {
      const parsed = strainSchema.parse(body);

      const data = getStrains();
      const index = data.findIndex((s) => s.id === strainId);

      if (index === -1) {
        return Response.json({ message: "Not found" }, { status: 404 });
      }

      data[index] = {
        id: strainId,
        nome: parsed.nome,
        especieId: speciesId,
        especieNome: species.nome,
      };

      saveStrains(data);

      return Response.json(data[index], { status: 200 });
    } catch {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }
  }),
);

export const deleteStrainHandler = http.delete(
  "*/especies/:speciesId/linhagens/:strainId",
  withDelay(async ({ params }) => {
    const strainId = Number(params.strainId);

    const data = getStrains();
    const index = data.findIndex((s) => s.id === strainId);

    if (index === -1) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    data.splice(index, 1);
    saveStrains(data);

    return new Response(null, { status: 204 });
  }),
);

export const speciesHandlers = [
  getSpeciesHandler,
  createSpeciesHandler,
  getSpeciesByIdHandler,
  updateSpeciesHandler,
  deleteSpeciesHandler,
  getAllStrainsHandler,
  getStrainsFromSpeciesHandler,
  createStrainHandler,
  getStrainByIdHandler,
  updateStrainHandler,
  deleteStrainHandler,
];
