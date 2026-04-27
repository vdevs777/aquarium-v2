import { z } from "zod";
import { numberField } from "./utils/number-field";
import { errorMessages } from "@/constants/error-messages";

export const cultureStageSchema = z.object({
  nome: z
    .string()
    .min(1, { message: errorMessages.REQUIRED })
    .max(120, { message: errorMessages.MAX_LENGTH }),

  pesoInicial: numberField({ max: 9999999.999, allowZero: false }),
  pesoFinal: numberField({ max: 9999999.999, allowZero: false }),

  ganhoPesoDia: numberField({ max: 99999999.99 }),
  percentualMortalidade: numberField({ max: 99999999.99 }),

  diasCultivo: numberField({ isInt: true }),
  densidadeM3: numberField({ isInt: true }),

  kgPorM3: numberField({ max: 9999999.999, allowZero: false }),
  fatorConversaoAlimentarEsperado: numberField({
    max: 9999999.999,
    allowZero: false,
  }),
  volumeM3: numberField({ max: 9999999.999, allowZero: false }),

  frequenciaAlimentar: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int({ message: errorMessages.INVALID_VALUE })
    .min(0, { message: errorMessages.AMOUNT_MUST_BE_POSITIVE })
    .optional(),

  cor: z.string().max(200, { message: errorMessages.MAX_LENGTH }).optional(),
});

export type CultureStageSchema = z.infer<typeof cultureStageSchema>;
