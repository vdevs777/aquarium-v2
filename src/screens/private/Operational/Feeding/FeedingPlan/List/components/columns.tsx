import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import {
  FeedingType,
  getFeedingTypeName,
} from "@/interfaces/enums/FeedingType";
import { FeedingPlanModel } from "@/interfaces/models/FeedingPlan";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FeedingPlanModel>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => SortableHeader(column, "Nome"),
  },

  {
    accessorKey: "tipo",
    header: ({ column }) => SortableHeader(column, "Tipo"),
    cell: ({ getValue }) => getFeedingTypeName(getValue() as FeedingType),
  },
];
