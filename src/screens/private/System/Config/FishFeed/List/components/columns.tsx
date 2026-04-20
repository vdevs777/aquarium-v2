import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { FishFeedModel } from "@/interfaces/models/FishFeed";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FishFeedModel>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => SortableHeader(column, "Nome"),
  },

  {
    accessorKey: "marcaNome",
    header: ({ column }) => SortableHeader(column, "Marca"),
  },

  createNumberColumn({
    accessorKey: "estoqueMinimoKg",
    header: ({ column }) => SortableHeader(column, "Estoque mín. (kg)"),
  }),

  createNumberColumn({
    accessorKey: "estoqueMaximoKg",
    header: ({ column }) => SortableHeader(column, "Estoque máx. (kg)"),
  }),

  createNumberColumn({
    accessorKey: "proteinaBruta",
    header: ({ column }) => SortableHeader(column, "Proteína bruta"),
  }),

  createNumberColumn({
    accessorKey: "energia",
    header: ({ column }) => SortableHeader(column, "Energia"),
  }),

  createNumberColumn({
    accessorKey: "granulometria",
    header: ({ column }) => SortableHeader(column, "Granulometria"),
  }),

  createNumberColumn({
    accessorKey: "taxaProteinaEnergia",
    header: ({ column }) => SortableHeader(column, "Taxa proteína/energia"),
  }),
];
