export enum PersonType {
  Physical = "F",
  Legal = "J",
}

const personTypeLabels = {
  [PersonType.Physical]: "Pessoa física",
  [PersonType.Legal]: "Pessoa jurídica",
};

export function getPersonTypeList() {
  return Object.entries(personTypeLabels).map(([value, name]) => ({
    value,
    name,
  }));
}

export function getPersonTypeName(value: PersonType) {
  return personTypeLabels[value];
}

export function getPersonTypeId(value: string): PersonType | null {
  const entry = Object.entries(personTypeLabels).find(
    ([, name]) => name.toLowerCase() === value.toLowerCase(),
  );

  return entry ? (entry[0] as PersonType) : null;
}

export function getPersonTypeOptions(): {
  label: string;
  value: string;
}[] {
  return Object.entries(personTypeLabels).map(([value, label]) => ({
    label,
    value,
  }));
}
