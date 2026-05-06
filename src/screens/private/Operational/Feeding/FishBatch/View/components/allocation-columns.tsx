import { SortableHeader } from "@/components/ui/data-table/sortable-header";
import { FishBatchAllocationResponse } from "@/interfaces/http/FishBatch/FishBatchAllocationResponse";
import { formatDateTime } from "@/utils/date-fns";
import { createNumberColumn } from "@/utils/tanstack-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const allocationColumns: ColumnDef<FishBatchAllocationResponse>[] = [
  {
    accessorKey: "setorProdutivoNome",
    header: ({ column }) => SortableHeader(column, "Setor"),
  },
  {
    accessorKey: "unidadeProdutivaNome",
    header: ({ column }) => SortableHeader(column, "Tanque"),
    cell: ({ row }) => {
      const unitId = row.original.unidadeProdutivaId;
      const name = row.original.unidadeProdutivaNome;

      return (
        <Link
          href={`/operational/production/production-unit/analysis?id=${unitId}`}
          className="text-primary hover:underline"
        >
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "dataAlocacao",
    header: ({ column }) => SortableHeader(column, "Data de alocação"),
    cell: ({ getValue }) => formatDateTime(getValue() as string),
  },
  createNumberColumn({
    accessorKey: "quantidade",
    header: ({ column }) => SortableHeader(column, "Quantidade"),
    fractionDigits: 0,
  }),
];
