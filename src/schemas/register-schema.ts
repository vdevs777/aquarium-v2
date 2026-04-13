import z from "zod";

import { passwordSchema } from "./fields/password-schema";

export const registerSchema = z
  .object({
    email: z.email("Informe um e-mail válido").min(1, "O e-mail é obrigatório"),

    password: passwordSchema,

    confirmPassword: z.string("Confirme a senha"),

    nome: z
      .string("Informe o nome")
      .min(5, "O nome deve ter no mínimo 5 caracteres"),

    nomeEmpresa: z
      .string("Informe o nome da empresa")
      .min(5, "O nome da empresa deve ter no mínimo 5 caracteres"),

    cpfCnpj: z
      .string("Informe o CPF ou CNPJ")
      .min(1, "CPF ou CNPJ é obrigatório"),

    telefone: z.string("Informe o telefone").min(1, "Telefone é obrigatório"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
