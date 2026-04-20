import { z } from "zod";

export const brandSchema = z.object({
  nome: z.string("Informe o nome").min(1, { message: "Informe o nome" }),
});

export type BrandSchema = z.infer<typeof brandSchema>;
