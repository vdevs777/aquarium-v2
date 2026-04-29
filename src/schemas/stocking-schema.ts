import { errorMessages } from "@/constants/error-messages";
import z from "zod";
import { numberField } from "./utils/number-field";

export const stockingSchema = z.object({
  loteProducaoId: z.number({ error: errorMessages.INVALID_VALUE }),
  quantidade: numberField({ isInt: true, allowZero: false }),
  setorProdutivoId: z.number({ error: errorMessages.INVALID_VALUE }),
  sequencia: numberField({ max: 9999 }),
});

export type StockingSchema = z.infer<typeof stockingSchema>;
