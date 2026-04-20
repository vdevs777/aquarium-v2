import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  itemLabel?: string | null; // Ex: "temperatura"
  article?: "a" | "o" | "as" | "os";
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

export function DeleteDialog({
  isOpen,
  onOpenChange,
  title = "Confirmação de deleção",
  itemLabel = "este item",
  onConfirm,
  article,
  isLoading = false,
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <div>
          Tem certeza que deseja deletar {article}{" "}
          {itemLabel && <span className="font-semibold">{itemLabel}</span>}?
        </div>
        <div className="space-y-3">
          <Button
            variant="destructive"
            className="gap-2 w-full"
            onClick={onConfirm}
            loading={isLoading}
          >
            Deletar <Trash2 size={18} />
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
