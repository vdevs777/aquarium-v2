export enum FeedingType {
  Manual = 35,
  Auto = 36,
}

const statusUnidadeLabels = {
  [FeedingType.Manual]: "Manual",
  [FeedingType.Auto]: "Automático",
};

export function getFeedingTypeList() {
  return Object.entries(statusUnidadeLabels).map(([value, name]) => ({
    value: Number(value),
    name,
  }));
}

export function getFeedingTypeName(value: number) {
  return statusUnidadeLabels[value as FeedingType];
}

export function getFeedingTypeId(value: string) {
  const entry = Object.entries(statusUnidadeLabels).find(
    ([, name]) => name.toLowerCase() === value.toLowerCase(),
  );
  return entry ? Number(entry[0]) : null;
}

export function getFeedingTypeOptions(): {
  label: string;
  value: string;
}[] {
  return Object.entries(statusUnidadeLabels).map(([value, label]) => ({
    label,
    value: String(value),
  }));
}
