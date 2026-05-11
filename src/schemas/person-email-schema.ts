import { z } from "zod";

export const personEmailSchema = z.object({
  email: z
    .email({ message: "Informe um e-mail válido" })
    .min(1, "Informe o e-mail"),
  principal: z.boolean(),
});

export type PersonEmailSchema = z.infer<typeof personEmailSchema>;
