import { errorMessages } from "@/constants/error-messages";
import { z } from "zod";

export const productionUnitModelSchema = z.object({
  ehCircunferencia: z.boolean(),
  nome: z.string("Informe o nome").min(1, { message: "Informe o nome" }),
  comprimento: z
    .number("Informe um valor válido")
    .min(0, errorMessages.AMOUNT_MUST_BE_POSITIVE),
  largura: z
    .number("Informe um valor válido")
    .min(0, errorMessages.AMOUNT_MUST_BE_POSITIVE),
  circunferencia: z
    .number("Informe um valor válido")
    .min(0, errorMessages.AMOUNT_MUST_BE_POSITIVE),
  profundidade: z.number(),
  volumeM3: z.number(),
  areaSuperficieM2: z.number(),
});

export type ProductionUnitModelSchema = z.infer<
  typeof productionUnitModelSchema
>;
