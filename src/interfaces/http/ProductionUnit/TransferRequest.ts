import { TransferSchema } from "@/schemas/transfer-schema";

export interface TransferRequest extends TransferSchema {
  unidadeProdutivaOrigemId: number;
}
