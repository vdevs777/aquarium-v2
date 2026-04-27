export interface ProductionSectorModel {
  id: number;
  nome: string;
}

export interface ProductionSectorModelWithProductionUnits<
  T,
> extends ProductionSectorModel {
  unidades: T[];
}
