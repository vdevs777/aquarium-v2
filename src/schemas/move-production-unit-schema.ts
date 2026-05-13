import z from "zod";
import { errorMessages } from "@/utils/error-messages";
import { numberField } from "./utils/number-field";

export const moveProductionUnitSchema = z.object({
  sequencia: numberField({ isInt: true }),
  idSetorDestino: z.number({ error: errorMessages.INVALID_VALUE }),
});

export type MoveProductionUnitSchema = z.infer<typeof moveProductionUnitSchema>;
