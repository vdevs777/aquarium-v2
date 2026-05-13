export type SortOrder = "asc" | "desc";

/**
 * Função genérica para ordenar qualquer array de objetos
 * @param data Array de dados
 * @param getValue Função que retorna o valor que será usado no sort
 * @param order "asc" ou "desc"
 */
export function sortData<T>(
  data: T[],
  getValue: (item: T) => string | number,
  order: SortOrder = "asc",
): T[] {
  return [...data].sort((a, b) => {
    const valA = getValue(a);
    const valB = getValue(b);

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
}
