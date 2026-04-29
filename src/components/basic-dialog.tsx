import { DialogProps } from "@/interfaces/others/DialogProps";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BasicDialogProps = DialogProps & {
  title?: string;
  description?: string;
  contentClassName?: string;
  children: ReactNode;
};

export function BasicDialog({
  title,
  description,
  contentClassName,
  children,
  ...rest
}: BasicDialogProps) {
  return (
    <Dialog {...rest}>
      <DialogContent className={cn("gap-4", contentClassName)}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}
        {children}
      </DialogContent>
    </Dialog>
  );
}
