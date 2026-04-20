import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { BrandModel } from "@/interfaces/models/Brand";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<BrandModel>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => SortableHeader(column, "Nome"),
  },
];
