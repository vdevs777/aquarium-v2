import { errorMessages } from "@/utils/error-messages";
import z from "zod";

export const feedingPlanSchema = z.object({
  nome: z.string(errorMessages.REQUIRED).min(1, errorMessages.REQUIRED),
  tipo: z.number(errorMessages.REQUIRED),
});

export type FeedingPlanSchema = z.infer<typeof feedingPlanSchema>;
