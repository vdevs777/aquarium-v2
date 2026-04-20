export interface ProductionUnitModelModel {
  id: number;
  nome: string;
  comprimento: number | null;
  largura: number | null;
  circunferencia: number | null;
  profundidade: number;
  volumeM3: number;
  areaSuperficieM2: number;
  ehCircunferencia: boolean;
  ativo: boolean;
}
