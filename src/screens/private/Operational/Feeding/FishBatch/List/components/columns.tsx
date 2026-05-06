import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { FishBatchModel } from "@/interfaces/models/FishBatch";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FishBatchModel>[] = [
  {
    accessorKey: "codigo",
    header: ({ column }) => SortableHeader(column, "Código"),
  },

  {
    accessorKey: "fornecedorNome",
    header: ({ column }) => SortableHeader(column, "Fornecedor"),
  },

  {
    accessorKey: "linhagemNome",
    header: ({ column }) => SortableHeader(column, "Linhagem"),
  },

  createNumberColumn({
    fractionDigits: 0,
    accessorKey: "numeroTotalPeixes",
    header: ({ column }) => SortableHeader(column, "Número de peixes"),
  }),

  createNumberColumn({
    fractionDigits: 0,
    accessorKey: "numeroPeixesAlocados",
    header: ({ column }) => SortableHeader(column, "Total alocado"),
  }),

  createNumberColumn({
    accessorKey: "pesoMedio",
    header: ({ column }) => SortableHeader(column, "Peso médio (g)"),
  }),

  createNumberColumn({
    accessorKey: "precoTotal",
    header: ({ column }) => SortableHeader(column, "Saldo (kg)"),
    prefix: "R$ ",
  }),
];
