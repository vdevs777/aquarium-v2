import { StockingSchema } from "@/schemas/stocking-schema";

export interface BatchStockingRequest extends StockingSchema {
  unidadeProdutivaId: number;
}
