import { Mail, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/useToast";
import { EmailForm } from "./email-form";
import { PersonEmailSchema } from "@/schemas/person-email-schema";
import { PersonEmailModel } from "@/interfaces/models/Person";
import { cn } from "@/lib/utils";

type EmailCardProps = {
  email: PersonEmailModel;
  editFn: (id: number, data: PersonEmailSchema) => Promise<void>;
  deleteFn: (id: number) => Promise<void>;
};

export function EmailCard({ email, editFn, deleteFn }: EmailCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (data: PersonEmailSchema) => {
    setIsEditing(true);

    try {
      await editFn(email.id, data);

      toast({
        title: "E-mail editado com sucesso",
        description: "O e-mail foi editado com sucesso!",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Erro ao editar e-mail",
        description: err.message,
      });
    } finally {
      setIsEditDialogOpen(false);
      setIsEditing(false);
    }
  };

  const onDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteFn(email.id);

      toast({
        title: "E-mail deletado com sucesso",
        description: "O e-mail foi deletado com sucesso!",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Erro ao deletar e-mail",
        description: err.message,
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-row w-full justify-between items-center mt-1">
        <div className="flex flex-row gap-2 w-56">
          <Mail className="text-primary size-4" />

          <div className="flex flex-col">
            <p
              className={cn(
                "text-sm flex flex-row items-center gap-2",
                email.principal && "font-bold",
              )}
            >
              {email.email}
            </p>
          </div>
        </div>

        <div className="space-x-2">
          <button
            className="text-zinc-600/70 hover:text-zinc-600/50 transition-all"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pencil size={18} strokeWidth="2" />
          </button>

          <button
            className="text-red-600/50 hover:text-red-600/30 transition-all"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 size={18} strokeWidth="2" />
          </button>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <EmailForm defaultValues={email} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          Você deseja realmente deletar o e-mail
          <p className="font-bold">{email.email}?</p>
          <Button
            variant="destructive"
            className="flex flex-row gap-2"
            onClick={onDelete}
            disabled={isDeleting}
          >
            <Trash2 size={18} strokeWidth="2" />
            {isDeleting ? "Deletando..." : "Sim"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
