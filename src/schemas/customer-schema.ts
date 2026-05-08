import z from "zod";
import { personSchema } from "./person-schema";

export const customerSchema = personSchema.extend({
  limiteDeCredito: z.number().optional(),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
