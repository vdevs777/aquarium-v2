import { http } from "msw";
import { withDelay } from "@/mocks/utils/with-delay";

export const createProductionUnitModelHandler = http.post(
  "*/modelos-unidade-produtiva",
  withDelay(async ({ request }) => {
    const body = await request.json();

    if (!body?.nome) {
      return Response.json(
        {
          title: "Erro de validação",
          status: 400,
          detail: "Nome é obrigatório.",
        },
        { status: 400 },
      );
    }

    if (body.nome === "error") {
      return Response.json(
        {
          title: "Erro ao criar modelo",
          status: 400,
          detail: "Não foi possível criar o modelo.",
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        id: Math.floor(Math.random() * 1000),
      },
      { status: 201 },
    );
  }),
);
