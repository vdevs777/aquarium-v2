export type FishFeedModel = {
  id: number;
  nome: string | null;
  observacao: string | null;
  ativo: boolean;
  marcaId: number;
  marcaNome: string | null;
  estoqueMinimoKg: number;
  estoqueMaximoKg: number;
  proteinaBruta: number;
  energia: number;
  granulometria: number;
  taxaProteinaEnergia: number;
  empresaId: number | null;
};
