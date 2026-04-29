import { errorMessages } from "@/constants/error-messages";
import z from "zod";
import { numberField } from "./utils/number-field";

export const harvestSchema = z.object({
  clienteId: z.number({ error: errorMessages.INVALID_VALUE }),
  quantidade: numberField({ isInt: true, allowZero: false }),
  enviarUnidadeProdutivaParaManutencao: z.boolean(),
});

export type HarvestSchema = z.infer<typeof harvestSchema>;
