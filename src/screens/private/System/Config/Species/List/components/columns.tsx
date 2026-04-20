import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { SpeciesModel } from "@/interfaces/models/Species";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SpeciesModel>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => SortableHeader(column, "Nome"),
  },
];
