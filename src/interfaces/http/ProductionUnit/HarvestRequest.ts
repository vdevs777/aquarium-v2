import { HarvestSchema } from "@/schemas/harvest-schema";

export interface HarvestRequest extends HarvestSchema {
  unidadeProdutivaId: number;
}
