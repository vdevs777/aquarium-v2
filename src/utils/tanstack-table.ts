import { ColumnDef } from "@tanstack/react-table";
import { formatNumber } from "./number";

type CreateNumberColumnOptions<T> = {
  accessorKey: keyof T;
  header: ColumnDef<T>["header"];
  fractionDigits?: number;
  prefix?: string;
  suffix?: string;
} & Omit<ColumnDef<T>, "accessorKey" | "cell" | "header">;

export function createNumberColumn<T>({
  accessorKey,
  header,
  fractionDigits = 2,
  prefix = "",
  suffix = "",
  ...rest
}: CreateNumberColumnOptions<T>): ColumnDef<T> {
  return {
    accessorKey: accessorKey as string,
    header,
    cell: ({ getValue }) => {
      const value = getValue();

      const formatted = formatNumber(value, {
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: fractionDigits,
      });

      return `${prefix}${formatted}${suffix}`;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = Number(rowA.getValue(columnId));
      const b = Number(rowB.getValue(columnId));

      if (Number.isNaN(a)) return -1;
      if (Number.isNaN(b)) return 1;

      return a - b;
    },
    ...rest,
  };
}
