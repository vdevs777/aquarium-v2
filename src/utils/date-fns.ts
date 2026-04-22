import { format } from "date-fns";

export function formatDateTime(value?: Date | string) {
  if (!value) return "--/--/---- --:--";

  const date = typeof value === "string" ? new Date(value) : value;

  return format(date, "dd/MM/yyyy HH:mm");
}
