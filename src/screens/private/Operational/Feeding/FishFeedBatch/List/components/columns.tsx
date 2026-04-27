import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { FishFeedBatchModel } from "@/interfaces/models/FishFeedBatch";
import { formatDate } from "@/utils/date-fns";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FishFeedBatchModel>[] = [
  {
    accessorKey: "racaoNome",
    header: ({ column }) => SortableHeader(column, "Ração"),
  },

  {
    accessorKey: "fornecedorNome",
    header: ({ column }) => SortableHeader(column, "Fornecedor"),
  },

  {
    accessorKey: "dataValidade",
    header: ({ column }) => SortableHeader(column, "Validade"),
    cell: ({ getValue }) => formatDate(getValue() as string),
  },

  {
    accessorKey: "numeroLote",
    header: ({ column }) => SortableHeader(column, "Número do lote"),
  },

  {
    accessorKey: "numeroNotaFiscal",
    header: ({ column }) => SortableHeader(column, "Número da nota fiscal"),
  },

  createNumberColumn({
    accessorKey: "quantidade",
    header: ({ column }) => SortableHeader(column, "Quantidade (kg)"),
  }),

  createNumberColumn({
    accessorKey: "saldo",
    header: ({ column }) => SortableHeader(column, "Saldo (kg)"),
  }),
];
