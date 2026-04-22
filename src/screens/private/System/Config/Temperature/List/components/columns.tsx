import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { TemperatureModel } from "@/interfaces/models/Temperature";
import { formatDateTime } from "@/utils/date-fns";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TemperatureModel>[] = [
  {
    accessorKey: "data",
    header: ({ column }) => SortableHeader(column, "Data"),
    cell: ({ getValue }) => formatDateTime(getValue() as string),
  },

  createNumberColumn({
    accessorKey: "valor",
    header: ({ column }) => SortableHeader(column, "Temperatura (ºC)"),
    suffix: " ºC",
  }),
];
