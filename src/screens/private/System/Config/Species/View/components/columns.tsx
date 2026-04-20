import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { StrainModel } from "@/interfaces/models/Strain";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StrainModel>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => SortableHeader(column, "Nome"),
  },
];
