import {
  ChevronDown,
  Trash,
  Edit2,
  ArrowRightLeft,
  Repeat,
  MoveUpRight,
  CircleEllipsis,
  PackagePlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductionUnitCardActionsProps {
  onDelete: () => void;
  onEdit: () => void;
  onMove: () => void;
  onHarvest: () => void; // despesca
  onTransfer: () => void;
  onStocking: () => void; // povoamento
  onDetails: () => void;
}

export function ProductionUnitCardActions({
  onDelete,
  onEdit,
  onMove,
  onHarvest,
  onTransfer,
  onStocking,
  onDetails,
}: ProductionUnitCardActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-muted-foreground">
        <ChevronDown size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={onEdit}
          className="flex items-center justify-between"
        >
          Editar <Edit2 size={14} strokeWidth="1.5px" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onMove}
          className="flex items-center justify-between"
        >
          Movimentar <ArrowRightLeft size={14} strokeWidth="1.5px" />
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Manejo</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-36">
              <DropdownMenuItem
                onClick={onStocking}
                className="flex items-center justify-between"
              >
                Povoamento <PackagePlus size={14} strokeWidth="1.5px" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onTransfer}
                className="flex items-center justify-between"
              >
                Transferência <Repeat size={14} strokeWidth="1.5px" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onHarvest}
                className="flex items-center justify-between"
              >
                Despesca <MoveUpRight size={14} strokeWidth="1.5px" />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem
          onClick={onDelete}
          className="flex items-center justify-between"
          disabled
        >
          Excluir <Trash size={14} strokeWidth="1.5px" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onDetails}
          className="flex items-center justify-between"
        >
          Detalhes <CircleEllipsis size={14} strokeWidth="1.5px" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
