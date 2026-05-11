import { PhoneType } from "@/interfaces/enums/PhoneType";
import { z } from "zod";

export const personPhoneSchema = z.object({
  ddd: z
    .string()
    .min(1, "DDD é obrigatório")
    .max(2, "DDD deve ter no máximo 2 caracteres"),
  numero: z
    .string()
    .min(8, "Informe um número válido")
    .max(9, "Informe um número válido"),
  tipoTelefoneId: z.enum(PhoneType, "Informe um valor válido"),
  principal: z.boolean(),
  ehWhatsApp: z.boolean(),
});

export type PersonPhoneSchema = z.infer<typeof personPhoneSchema>;
