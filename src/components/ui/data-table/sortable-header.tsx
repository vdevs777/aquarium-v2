import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

export function SortableHeader<TData, TValue>(
  column: Column<TData, TValue>,
  label: string,
) {
  const isSorted = column.getIsSorted();

  return (
    <button
      className="px-0 hover:bg-transparent flex flex-row items-center hover:cursor-pointer"
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      {label}

      {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
      {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
      {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />}
    </button>
  );
}
