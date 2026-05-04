import { FeedingType } from "../enums/FeedingType";
import { FeederPayload } from "../payloads/FeederPayload";
import { ProductionUnitStatus } from "../enums/ProductionUnitStatus";

export interface ProductionUnitModel {
  id: number;
  codigo: string;
  sequencia?: number;
  modeloUnidadeProdutivaId: number;
  modeloUnidadeProdutivaNome: string;
  setorProdutivoId?: number;
  setorProdutivoNome: string;
  statusId: ProductionUnitStatus | null;
  codigoAlimentador: string | null;
  tipoAlimentacaoId: FeedingType;
}

export interface ProductionUnitDetailsModel {
  id: number;
  codigo: string;
  sequencia: number;
  numeroPeixes: number;
  fatorConversaoAlimentar: number;
  status: string;
  dataCadastro: string;
  pesoMedio: number;
  idModeloUnidadeProdutiva: number;
  modeloUnidadeProdutiva: string;
  idSetorProdutivo: number;
  nomeSetorProdutivo: string;
  faseCultivo: string;
  faseCultivoCor: string;
  idFaseCultivo: number;
  tipoAlimentacaoId: FeedingType;
  tipoAlimentacao: string;
  codigoAlimentador?: string;
  frequenciaAlimentar?: number;
  alimentador?: FeederPayload;
}
