import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { ProductionUnitModelModel } from "@/interfaces/models/ProductionUnitModel";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductionUnitModelModel>[] = [
  { accessorKey: "nome", header: "Nome" },

  createNumberColumn({
    accessorKey: "comprimento",
    header: ({ column }) => SortableHeader(column, "Comprimento"),
  }),

  createNumberColumn({
    accessorKey: "largura",
    header: ({ column }) => SortableHeader(column, "Largura"),
  }),

  createNumberColumn({
    accessorKey: "circunferencia",
    header: ({ column }) => SortableHeader(column, "Circunferência"),
  }),

  createNumberColumn({
    accessorKey: "areaSuperficieM2",
    header: ({ column }) => SortableHeader(column, "Área superfície (m²)"),
  }),

  createNumberColumn({
    accessorKey: "volumeM3",
    header: ({ column }) => SortableHeader(column, "Volume (m³)"),
  }),
];
