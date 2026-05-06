export interface ProductionUnitEditRequest {
  id: number;
  codigo?: string | null;
  modeloUnidadeProdutivaId: number;
  setorProdutivoId?: number | null;
  sequencia?: number | null;
  tipoAlimentacaoId?: number | null;
  codigoAlimentador?: string | null;
}
