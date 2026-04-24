import { http } from "msw";
import { withDelay } from "@/mocks/utils/with-delay";
import { ProductionUnitModelModel } from "@/interfaces/models/ProductionUnitModel";

function createMockModel(id: number): ProductionUnitModelModel {
  const ehCircunferencia = Math.random() > 0.5;

  const profundidade = Number((Math.random() * 5 + 1).toFixed(2));

  if (ehCircunferencia) {
    const circunferencia = Number((Math.random() * 20 + 5).toFixed(2));
    const raio = circunferencia / (2 * Math.PI);
    const area = Math.PI * Math.pow(raio, 2);
    const volume = area * profundidade;

    return {
      id,
      nome: `Modelo ${id}`,
      comprimento: null,
      largura: null,
      circunferencia,
      profundidade,
      areaSuperficieM2: Number(area.toFixed(2)),
      volumeM3: Number(volume.toFixed(2)),
      ehCircunferencia: true,
      ativo: Math.random() > 0.2,
    };
  }

  const comprimento = Number((Math.random() * 10 + 2).toFixed(2));
  const largura = Number((Math.random() * 10 + 2).toFixed(2));
  const area = comprimento * largura;
  const volume = area * profundidade;

  return {
    id,
    nome: `Modelo ${id}`,
    comprimento,
    largura,
    circunferencia: null,
    profundidade,
    areaSuperficieM2: Number(area.toFixed(2)),
    volumeM3: Number(volume.toFixed(2)),
    ehCircunferencia: false,
    ativo: Math.random() > 0.2,
  };
}

export const getProductionUnitModelHandler = http.get(
  "*/modelos-unidade-produtiva",
  withDelay(async () => {
    const data = Array.from({ length: 10 }).map((_, index) =>
      createMockModel(index + 1),
    );

    return Response.json(data, { status: 200 });
  }),
);

export const getProductionUnitModelByIdHandler = http.get(
  "*/modelos-unidade-produtiva/:id",
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

    const model = createMockModel(id);

    return Response.json(model, { status: 200 });
  }),
);
