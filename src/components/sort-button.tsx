import { FC } from "react";
import { ArrowUpDown, ArrowDownUp } from "lucide-react";

interface SortButtonProps {
  field: string;
  sortField: string | null;
  sortOrder: "asc" | "desc";
  onSort: (field: any) => void;
}

export const SortButton: FC<SortButtonProps> = ({
  field,
  sortField,
  sortOrder,
  onSort,
}) => {
  const isActive = sortField === field;

  return (
    <button onClick={() => onSort(field)} className="flex items-center gap-1">
      {isActive && sortOrder === "asc" ? (
        <ArrowUpDown size={14} />
      ) : (
        <ArrowDownUp size={14} />
      )}
    </button>
  );
};
