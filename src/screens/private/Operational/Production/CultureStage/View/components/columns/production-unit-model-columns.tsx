import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { FishFeedModel } from "@/interfaces/models/FishFeed";
import { ProductionUnitModelModel } from "@/interfaces/models/ProductionUnitModel";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";

export const productionUnitModelColumns: ColumnDef<ProductionUnitModelModel>[] =
  [
    { accessorKey: "nome", header: "Nome" },

    createNumberColumn({
      accessorKey: "circunferencia",
      header: ({ column }) => SortableHeader(column, "Circunf."),
    }),

    createNumberColumn({
      accessorKey: "profundidade",
      header: ({ column }) => SortableHeader(column, "Profund."),
    }),

    createNumberColumn({
      accessorKey: "areaSuperficieM2",
      header: ({ column }) => SortableHeader(column, "Á. superfíc. (m²)"),
    }),

    createNumberColumn({
      accessorKey: "volumeM3",
      header: ({ column }) => SortableHeader(column, "Vol. (m³)"),
    }),
  ];
