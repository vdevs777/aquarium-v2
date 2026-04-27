import { errorMessages } from "@/constants/error-messages";
import { z } from "zod";
import { numberField } from "./utils/number-field";

export const productionUnitSchema = z.object({
  codigo: z.string().min(1, { message: "Informe um código" }),

  sequencia: numberField({ max: 9999 }),

  modeloUnidadeProdutivaId: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int(errorMessages.INVALID_VALUE)
    .positive(errorMessages.AMOUNT_MUST_BE_GREATER_THAN_ZERO),

  setorProdutivoId: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int(errorMessages.INVALID_VALUE)
    .positive(errorMessages.AMOUNT_MUST_BE_GREATER_THAN_ZERO)
    .optional(),

  tipoAlimentacaoId: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int(errorMessages.INVALID_VALUE)
    .positive(errorMessages.AMOUNT_MUST_BE_GREATER_THAN_ZERO),

  codigoAlimentador: z
    .string()
    .min(1, "Informe o código do alimentador")
    .nullable(),
});

export type ProductionUnitSchema = z.infer<typeof productionUnitSchema>;
