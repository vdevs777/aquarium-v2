import z from "zod";
import { errorMessages } from "@/utils/error-messages";

export const strainSchema = z.object({
  nome: z.string({ error: errorMessages.REQUIRED }),
});

export type StrainSchema = z.infer<typeof strainSchema>;
