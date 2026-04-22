import z from "zod";
import { errorMessages } from "@/constants/error-messages";

export const temperatureSchema = z.object({
  data: z.coerce.date(errorMessages.INVALID_VALUE),

  valor: z
    .number({ error: errorMessages.INVALID_VALUE })
    .min(0, "Temperatura muito baixa para cultivo")
    .max(40, "Temperatura muito alta para cultivo"),
});

export type TemperatureSchema = z.infer<typeof temperatureSchema>;
