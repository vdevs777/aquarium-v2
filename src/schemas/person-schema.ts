import { errorMessages } from "@/constants/error-messages";
import { PersonType } from "@/interfaces/enums/PersonType";
import z from "zod";

export const personSchema = z.object({
  tipoPessoa: z.enum(PersonType, errorMessages.INVALID_VALUE),

  nome: z.string(errorMessages.REQUIRED).min(1, errorMessages.REQUIRED),

  cpf: z
    .string(errorMessages.REQUIRED)
    .min(11 + 3, errorMessages.INVALID_VALUE)
    .nullable(),
  dataNascimento: z
    .string(errorMessages.REQUIRED)
    .min(1, errorMessages.REQUIRED)
    .nullable(),
  numeroDocumento: z.string().nullable().optional(),
  orgaoEmissor: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .refine(
      (value) =>
        value === undefined || /^[A-Z]{2,10}(\/[A-Z]{2})?$/.test(value),
      {
        message: errorMessages.INVALID_VALUE,
      },
    )
    .nullable(),
  generoId: z.number(errorMessages.REQUIRED).nullable(),

  cnpj: z
    .string(errorMessages.REQUIRED)
    .min(14 + 4, errorMessages.INVALID_VALUE)
    .nullable(),
  razaoSocial: z
    .string(errorMessages.REQUIRED)
    .min(1, errorMessages.INVALID_VALUE)
    .nullable(),
  contribuinte: z.boolean().nullable(),
  inscricaoEstadual: z
    .string(errorMessages.REQUIRED)
    .min(1, errorMessages.INVALID_VALUE)
    .nullable(),
  inscricaoMunicipal: z
    .string(errorMessages.REQUIRED)
    .min(1, errorMessages.INVALID_VALUE)
    .nullable(),
  dataAbertura: z
    .string(errorMessages.REQUIRED)
    .min(1, errorMessages.REQUIRED)
    .nullable(),
});

export type PersonSchema = z.infer<typeof personSchema>;
