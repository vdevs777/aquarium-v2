import { http } from "msw";
import { withDelay } from "@/mocks/utils/with-delay";

type BrandModel = {
  id: number;
  nome: string;
};

const brandNames = [
  "NutriPet",
  "Ração Suprema",
  "PetVital",
  "Animal Prime",
  "NutriBicho",
  "Vida Animal",
  "Ração Forte",
  "PetMax",
  "AgroPet Plus",
  "Bicho Feliz",
  "NutriGold Pet",
  "Ração Campeira",
  "PetLife Balance",
  "AgroRação Premium",
  "PetNobre",
  "Força Animal",
  "NutriRural",
  "PetSabor",
  "Ração Selecta",
  "Animal Fit",
];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

// 🧠 "Banco fake" em memória
let brands: BrandModel[] = shuffleArray(brandNames).map((nome, index) => ({
  id: index + 1,
  nome,
}));

let currentId = brands.length + 1;

export const getBrandHandler = http.get(
  "*/marcas",
  withDelay(async () => {
    return Response.json(brands, { status: 200 });
  }),
);

export const getBrandByIdHandler = http.get(
  "*/marcas/:id",
  withDelay(async ({ params }) => {
    const id = Number(params.id);

    if (!id || isNaN(id)) {
      return Response.json(
        {
          title: "Erro de validação",
          status: 400,
          detail: "ID inválido.",
        },
        { status: 400 },
      );
    }

    const brand = brands.find((b) => b.id === id);

    if (!brand) {
      return Response.json(
        {
          title: "Não encontrado",
          status: 404,
          detail: "Marca não encontrada.",
        },
        { status: 404 },
      );
    }

    return Response.json(brand, { status: 200 });
  }),
);

export const createBrandHandler = http.post(
  "*/marcas",
  withDelay(async ({ request }) => {
    const body = await request.json();

    if (!body?.nome || typeof body.nome !== "string") {
      return Response.json(
        {
          title: "Erro de validação",
          status: 400,
          detail: "Nome é obrigatório.",
        },
        { status: 400 },
      );
    }

    const newBrand: BrandModel = {
      id: currentId++,
      nome: body.nome,
    };

    brands.push(newBrand);

    return Response.json(newBrand, { status: 201 });
  }),
);

export const brandHandlers = [
  getBrandHandler,
  getBrandByIdHandler,
  createBrandHandler,
];
