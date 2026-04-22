export function filter<T extends Record<string, any>>(
  data: T[] | undefined,
  filter: string,
  keys?: (keyof T)[],
): T[] {
  if (!data) return [];
  const filterLower = filter.toLowerCase();

  return data.filter((item) => {
    const values = keys ? keys.map((key) => item[key]) : Object.values(item);
    return values.some((value) =>
      value?.toString().toLowerCase().includes(filterLower),
    );
  });
}
