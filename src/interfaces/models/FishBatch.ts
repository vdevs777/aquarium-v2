export interface FishBatchModel {
  id: number;
  codigo?: string | null;
  dataCompra: string;
  numeroTotalPeixes: number;
  numeroPeixesAlocados: number;
  pesoMedio: number;
  precoUnitario: number;
  precoTotal: number;
  fornecedorId: number;
  fornecedorNome?: string | null;
  linhagemId: number;
  linhagemNome?: string | null;
}
