import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { CultureStageModel } from "@/interfaces/models/CultureStage";
import { FishFeedModel } from "@/interfaces/models/FishFeed";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CultureStageModel>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => SortableHeader(column, "Nome"),
  },

  createNumberColumn({
    accessorKey: "pesoInicial",
    header: ({ column }) => SortableHeader(column, "Peso inicial (g)"),
  }),

  createNumberColumn({
    accessorKey: "pesoFinal",
    header: ({ column }) => SortableHeader(column, "Peso final (g)"),
  }),

  createNumberColumn({
    accessorKey: "ganhoPesoDia",
    header: ({ column }) => SortableHeader(column, "Ganho de peso/dia (g)"),
  }),

  createNumberColumn({
    accessorKey: "percentualMortalidade",
    header: ({ column }) => SortableHeader(column, "Percentual de mortalidade"),
  }),

  createNumberColumn({
    accessorKey: "diasCultivo",
    header: ({ column }) => SortableHeader(column, "Dias de cultivo"),
  }),
];
