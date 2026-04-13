import z from "zod";

export const passwordSchema = z
  .string("Informe a senha")
  .min(6, "A senha deve ter no mínimo 6 caracteres")
  .max(100, "A senha deve ter no máximo 100 caracteres")
  .regex(/[A-Z]/, "Deve conter uma letra maiúscula")
  .regex(/[0-9]/, "Deve conter um número")
  .regex(/[^a-zA-Z0-9]/, "Deve conter um caractere especial");
