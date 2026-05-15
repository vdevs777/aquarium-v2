import { FeedingType } from "../enums/FeedingType";

export interface FeedingPlanModel {
  id: number;
  nome: string;
  tipo: FeedingType;
}
