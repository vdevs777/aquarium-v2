import { z } from "zod";
import { numberField } from "./utils/number-field";
import { errorMessages } from "@/constants/error-messages";

export const fishFeedBatchSchema = z.object({
  racaoId: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int()
    .positive(errorMessages.AMOUNT_MUST_BE_GREATER_THAN_ZERO),

  fornecedorId: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int()
    .positive(errorMessages.AMOUNT_MUST_BE_GREATER_THAN_ZERO),

  dataCompra: z.string().min(1, { message: errorMessages.REQUIRED }),

  dataValidade: z.string().min(1, { message: errorMessages.REQUIRED }),

  numeroLote: z
    .string()
    .min(1, { message: errorMessages.REQUIRED })
    .max(100, { message: errorMessages.MAX_LENGTH }),

  numeroNotaFiscal: z
    .string()
    .min(1, { message: errorMessages.REQUIRED })
    .max(20, { message: errorMessages.MAX_LENGTH }),

  quantidade: numberField({ max: 9999999.99, allowZero: false }),

  saldo: numberField({ max: 9999999.99 }),
});

export type FishFeedBatchSchema = z.infer<typeof fishFeedBatchSchema>;
