"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Trash, Edit, Plus } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { Spinner } from "../spinner";
import { Button } from "../button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  isLoading?: boolean;
  error?: string | null;
  hasClick?: boolean;
  onClickRow?: (data: TData) => void;
  onDelete?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onCreate?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  error,
  hasClick = false,
  onClickRow,
  onDelete,
  onEdit,
  onCreate,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const actionColumn: ColumnDef<TData> | null =
    onDelete || onEdit
      ? {
          id: "actions",
          header: "",
          cell: ({ row }) => (
            <div className="flex justify-end gap-2">
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(row.original);
                  }}
                  className="cursor-pointer flex items-center"
                >
                  <Edit className="size-4 text-muted-foreground" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(row.original);
                  }}
                  className="cursor-pointer flex items-center"
                >
                  <Trash className="size-4 text-destructive" />
                </button>
              )}
            </div>
          ),
        }
      : null;

  const table = useReactTable({
    data: data ?? [],
    columns: actionColumn ? [...columns, actionColumn] : columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  const colSpan = actionColumn ? columns.length + 1 : columns.length;

  const isClickable = hasClick;

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={colSpan} className="h-12">
                <div className="flex justify-center">
                  <Spinner />
                </div>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell
                colSpan={colSpan}
                className="h-12 text-center text-destructive"
              >
                {error}
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(isClickable && "cursor-pointer")}
                  onClick={() => {
                    if (!isClickable) return;

                    if (onClickRow) {
                      onClickRow(row.original);
                    } else {
                      const id = (row.original as any)?.id;

                      if (id !== undefined && id !== null) {
                        router.push(`view/${id}`);
                      }
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {onCreate && (
                <TableRow>
                  <TableCell colSpan={colSpan}>
                    <button
                      className="w-full flex cursor-pointer items-center justify-center gap-2 h-6"
                      onClick={onCreate}
                    >
                      <Plus className="size-4" />
                      Cadastrar
                    </button>
                  </TableCell>
                </TableRow>
              )}
            </>
          ) : (
            <>
              {onCreate && (
                <TableRow>
                  <TableCell colSpan={colSpan}>
                    <button
                      className="w-full flex cursor-pointer items-center justify-center gap-2 h-6"
                      onClick={onCreate}
                    >
                      <Plus className="size-4" />
                      Cadastrar
                    </button>
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
