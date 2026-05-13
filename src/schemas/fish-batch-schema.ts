import { errorMessages } from "@/utils/error-messages";
import z from "zod";
import { numberField } from "./utils/number-field";

export const fishBatchSchema = z.object({
  codigo: z.string(errorMessages.REQUIRED).min(1, errorMessages.REQUIRED),
  numeroTotalPeixes: numberField({ allowZero: false, isInt: true }),
  pesoMedio: numberField({ allowZero: false }),
  precoUnitario: numberField({ allowZero: false }),
  linhagemId: z.number(errorMessages.REQUIRED),
  fornecedorId: z.number(errorMessages.REQUIRED),
  dataCompra: z.string(errorMessages.REQUIRED).min(1, errorMessages.REQUIRED),
});

export type FishBatchSchema = z.infer<typeof fishBatchSchema>;
