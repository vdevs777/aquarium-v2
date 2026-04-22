export function toDatetimeLocal(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;

  const pad = (n: number) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
