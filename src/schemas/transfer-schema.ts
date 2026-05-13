import z from "zod";
import { errorMessages } from "@/utils/error-messages";
import { numberField } from "./utils/number-field";

export const transferSchema = z.object({
  quantidade: numberField({ isInt: true, allowZero: false }),
  unidadeProdutivaDestinoId: z.number({ error: errorMessages.INVALID_VALUE }),
});

export type TransferSchema = z.infer<typeof transferSchema>;
