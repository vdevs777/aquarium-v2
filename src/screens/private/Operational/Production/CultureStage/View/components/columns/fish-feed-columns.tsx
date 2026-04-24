import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { FishFeedModel } from "@/interfaces/models/FishFeed";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";

export const fishFeedColumns: ColumnDef<FishFeedModel>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => SortableHeader(column, "Nome"),
  },

  createNumberColumn({
    accessorKey: "marcaNome",
    header: ({ column }) => SortableHeader(column, "Marca"),
  }),

  createNumberColumn({
    accessorKey: "granulometria",
    header: ({ column }) => SortableHeader(column, "Granulometria"),
  }),

  createNumberColumn({
    accessorKey: "proteinaBruta",
    header: ({ column }) => SortableHeader(column, "Proteína"),
  }),
];
