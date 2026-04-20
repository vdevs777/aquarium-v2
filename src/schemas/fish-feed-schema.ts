import z from "zod";
import { errorMessages } from "@/constants/error-messages";

export const fishFeedSchema = z
  .object({
    nome: z
      .string({ error: errorMessages.INVALID_VALUE })
      .min(2, errorMessages.MIN_LENGTH)
      .max(100, errorMessages.MAX_LENGTH),

    marcaId: z
      .number({ error: errorMessages.INVALID_VALUE })
      .int()
      .positive(errorMessages.AMOUNT_MUST_BE_GREATER_THAN_ZERO),

    estoqueMinimoKg: z
      .number({ error: errorMessages.INVALID_VALUE })
      .min(0, errorMessages.AMOUNT_MUST_BE_POSITIVE),

    estoqueMaximoKg: z
      .number({ error: errorMessages.INVALID_VALUE })
      .min(0, errorMessages.AMOUNT_MUST_BE_POSITIVE),

    proteinaBruta: z
      .number({ error: errorMessages.INVALID_VALUE })
      .min(0, errorMessages.AMOUNT_MUST_BE_POSITIVE)
      .max(100, "Proteína geralmente é em % (0–100)"),

    energia: z
      .number({ error: errorMessages.INVALID_VALUE })
      .min(0, errorMessages.AMOUNT_MUST_BE_POSITIVE)
      .max(10000, errorMessages.AMOUNT_TOO_LARGE),

    granulometria: z
      .number({ error: errorMessages.INVALID_VALUE })
      .min(0, errorMessages.AMOUNT_MUST_BE_POSITIVE)
      .max(20, errorMessages.AMOUNT_TOO_LARGE),

    taxaProteinaEnergia: z
      .number({ error: errorMessages.INVALID_VALUE })
      .min(0, errorMessages.AMOUNT_MUST_BE_POSITIVE)
      .max(1, errorMessages.AMOUNT_TOO_LARGE),

    observacao: z
      .string({ error: errorMessages.INVALID_VALUE })
      .max(500, errorMessages.MAX_LENGTH)
      .nullable()
      .transform((v) => (v === "" ? null : v)),
  })
  .refine((data) => data.estoqueMaximoKg >= data.estoqueMinimoKg, {
    message: "Estoque máximo deve ser maior ou igual ao mínimo",
    path: ["estoqueMaximoKg"],
  })
  .refine(
    (data) => {
      if (!data.energia) return true;
      const calculada = data.proteinaBruta / data.energia;
      return Math.abs(calculada - data.taxaProteinaEnergia) < 0.0001;
    },
    {
      message: "Taxa proteína/energia inconsistente com os valores informados",
      path: ["taxaProteinaEnergia"],
    },
  );

export type FishFeedSchema = z.infer<typeof fishFeedSchema>;
