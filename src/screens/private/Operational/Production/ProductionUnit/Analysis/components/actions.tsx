import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ArrowRightLeft,
  ChevronDown,
  Edit,
  MoveUpRight,
  PackagePlus,
  RefreshCcw,
  Repeat,
} from "lucide-react";

type ActionsProps = {
  disableAll?: boolean;
  onRefresh: () => void;
  onHarvest: () => void; // despesca
  onTransfer: () => void;
  onStocking: () => void;
  onMove: () => void;
  onEdit: () => void;
};

export function Actions({
  disableAll,
  onRefresh,
  onHarvest,
  onTransfer,
  onStocking,
  onMove,
  onEdit,
}: ActionsProps) {
  return (
    <>
      <Button disabled={disableAll} variant="outline" onClick={onRefresh}>
        <RefreshCcw />
      </Button>
      <Button disabled={disableAll} variant="outline" onClick={onMove}>
        Movimentar <ArrowRightLeft />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disableAll}>
          <Button disabled={disableAll} variant="outline">
            Manejo <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuItem onClick={onStocking}>
            <p>Povoamento</p>
            <PackagePlus size={16} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onTransfer} disabled={false}>
            <p>Transferência</p> <Repeat size={16} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onHarvest} disabled={false}>
            <p>Despesca</p> <MoveUpRight size={16} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button disabled={disableAll} variant="outline" onClick={onEdit}>
        Editar <Edit />
      </Button>
    </>
  );
}
