import { FeedingType } from "@/interfaces/enums/FeedingType";
import { FeedingPlanModel } from "@/interfaces/models/FeedingPlan";

export const feedingPlansFake: FeedingPlanModel[] = [
  {
    id: 1,
    nome: "Plano Inicial",
    tipo: FeedingType.Manual,
  },
  {
    id: 2,
    nome: "Plano Crescimento",
    tipo: FeedingType.Auto,
  },
  {
    id: 3,
    nome: "Plano Engorda",
    tipo: FeedingType.Manual,
  },
  {
    id: 4,
    nome: "Plano Premium",
    tipo: FeedingType.Auto,
  },
  {
    id: 5,
    nome: "Plano Econômico",
    tipo: FeedingType.Manual,
  },
];
