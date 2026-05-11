export enum PhoneType {
  Celular = 7,
  Residencial = 8,
  Comercial = 9,
}

export function getPhoneTypeOptions(): { name: string; value: number }[] {
  return Object.entries(PhoneType)
    .filter(([_, value]) => typeof value === "number")
    .map(([name, value]) => ({
      name,
      value: value as number,
    }));
}
