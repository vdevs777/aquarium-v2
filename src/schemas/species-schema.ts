import z from "zod";
import { errorMessages } from "@/constants/error-messages";

export const speciesSchema = z.object({
  nome: z
    .string({ error: errorMessages.REQUIRED })
    .min(1, errorMessages.REQUIRED),
});

export type SpeciesSchema = z.infer<typeof speciesSchema>;
