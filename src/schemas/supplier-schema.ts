import z from "zod";
import { personSchema } from "./person-schema";

export const supplierSchema = personSchema.extend({});

export type SupplierSchema = z.infer<typeof supplierSchema>;
