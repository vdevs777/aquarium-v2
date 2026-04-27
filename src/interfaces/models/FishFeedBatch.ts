export interface FishFeedBatchModel {
  id: number;
  racaoId: number;
  fornecedorId: number;
  dataCompra: string;
  dataValidade: string;
  numeroLote: string;
  numeroNotaFiscal: string;
  quantidade: number;
  saldo: number;
}

export interface FishFeedBatchViewModel extends FishFeedBatchModel {
  racaoNome: string;
  fornecedorNome: string;
  empresaId: number;
}
