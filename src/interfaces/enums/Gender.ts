export enum Gender {
  Male = 1,
  Female = 2,
  Other = 3,
}

const genderLabels = {
  [Gender.Male]: "Masculino",
  [Gender.Female]: "Feminino",
  [Gender.Other]: "Outro",
};

export function getGenderList() {
  return Object.entries(genderLabels).map(([value, name]) => ({
    value: Number(value),
    name,
  }));
}

export function getGenderName(value: number) {
  return genderLabels[value as Gender];
}

export function getGenderId(value: string) {
  const entry = Object.entries(genderLabels).find(
    ([, name]) => name.toLowerCase() === value.toLowerCase(),
  );

  return entry ? Number(entry[0]) : null;
}

export function getGenderOptions(): {
  label: string;
  value: string;
}[] {
  return Object.entries(genderLabels).map(([value, label]) => ({
    label,
    value: String(value),
  }));
}
