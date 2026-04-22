import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { Status } from "@/components/ui/status";
import { UserModel } from "@/interfaces/models/User";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserModel>[] = [
  {
    accessorKey: "userName",
    header: ({ column }) => SortableHeader(column, "Nome"),
  },
  {
    accessorKey: "email",
    header: ({ column }) => SortableHeader(column, "E-mail"),
  },
  {
    accessorKey: "emailConfirmado",
    header: "E-mail confirmado",
    cell: ({ getValue }) => <Status type={getValue() ? "success" : "error"} />,
  },
  {
    accessorKey: "bloqueado",
    header: "Bloqueado",
    cell: ({ getValue }) => <Status type={getValue() ? "error" : "success"} />,
  },
];
