import { errorMessages } from "@/constants/error-messages";
import { z } from "zod";
import { numberField } from "./utils/number-field";

export const productionUnitSchema = z.object({
  codigo: z.string().min(1, { message: "Informe um código" }),

  sequencia: numberField({ max: 9999 }).nullable(),

  modeloUnidadeProdutivaId: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int(errorMessages.INVALID_VALUE)
    .positive(errorMessages.AMOUNT_MUST_BE_GREATER_THAN_ZERO),

  setorProdutivoId: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int(errorMessages.INVALID_VALUE)
    .positive(errorMessages.AMOUNT_MUST_BE_GREATER_THAN_ZERO)
    .nullable(),

  tipoAlimentacaoId: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int(errorMessages.INVALID_VALUE)
    .positive(errorMessages.AMOUNT_MUST_BE_GREATER_THAN_ZERO),

  codigoAlimentador: z
    .string()
    .min(1, "Informe o código do alimentador")
    .nullable(),
});

export const productionUnitCreateSchema = z.object({
  codigo: z
    .string({ message: errorMessages.REQUIRED })
    .min(1, { message: errorMessages.REQUIRED }),
  modeloUnidadeProdutivaId: z.number({ error: errorMessages.INVALID_VALUE }),
  tipoAlimentacaoId: z.number({ error: errorMessages.INVALID_VALUE }),
});

export const productionUnitEditSchema = productionUnitCreateSchema.extend({
  sequencia: numberField({ max: 9999 }),
});

export type ProductionUnitSchema = z.infer<typeof productionUnitSchema>;

export type ProductionUnitCreateSchema = z.infer<
  typeof productionUnitCreateSchema
>;
export type ProductionUnitEditSchema = z.infer<typeof productionUnitEditSchema>;
