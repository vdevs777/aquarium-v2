import { z } from "zod";
import { numberField } from "./utils/number-field";
import { errorMessages } from "@/constants/error-messages";

export const cultureStageSchema = z.object({
  nome: z
    .string()
    .min(1, { message: errorMessages.REQUIRED })
    .max(120, { message: errorMessages.MAX_LENGTH }),

  pesoInicial: numberField(9999999.999, false, false),
  pesoFinal: numberField(9999999.999, false, false),

  ganhoPesoDia: numberField(99999999.99, false, true),
  percentualMortalidade: numberField(99999999.99, false, true),

  diasCultivo: numberField(undefined, true, true),
  densidadeM3: numberField(undefined, true, true),

  kgPorM3: numberField(9999999.999, false, false),
  fatorConversaoAlimentarEsperado: numberField(9999999.999, false, false),
  volumeM3: numberField(9999999.999, false, false),

  frequenciaAlimentar: z
    .number({ error: errorMessages.INVALID_VALUE })
    .int()
    .min(0)
    .optional(),

  cor: z.string().max(200, { message: errorMessages.MAX_LENGTH }).optional(),
});

export type CultureStageSchema = z.infer<typeof cultureStageSchema>;
