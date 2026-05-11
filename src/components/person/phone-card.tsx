import { Pencil, Phone, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/router";
import { PersonPhoneSchema } from "@/schemas/person-phone-schema";
import { PhoneForm } from "./phone-form";
import { PersonPhoneModel } from "@/interfaces/models/Person";
import { FaWhatsapp } from "react-icons/fa";
import colors from "tailwindcss/colors";
import { cn } from "@/lib/utils";

type PhoneCardProps = {
  telefone: PersonPhoneModel;
  editFn: (id: number, data: PersonPhoneSchema) => Promise<void>;
  deleteFn: (id: number) => Promise<void>;
};

export function PhoneCard({ telefone, editFn, deleteFn }: PhoneCardProps) {
  const { green } = colors;

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onSubmit = async (data: PersonPhoneSchema) => {
    setIsEditing(true);
    try {
      await editFn(telefone.id, data);
      toast({
        title: "Telefone editado com sucesso",
        description: "O telefone foi editado com sucesso!",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Erro ao editar telefone",
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
      await deleteFn(telefone.id);
      toast({
        title: "Telefone deletado com sucesso",
        description: "O telefone foi deletado com sucesso!",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Erro ao deletar telefone",
        description: err.message,
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-row w-full justify-between items-center mt-1">
        <div className="flex flex-row gap-2 w-40">
          <Phone className="text-primary size-4" />
          <div className="flex flex-col">
            <p
              className={cn(
                "text-sm flex flex-row items-center gap-2",
                telefone.principal && "font-bold",
              )}
            >
              ({telefone.ddd}) {telefone.numero}
              {telefone.ehWhatsApp && <FaWhatsapp color={green[700]} />}
            </p>
            {/* <p className="text-sm text-zinc-500">
              {data}, {hora}
            </p> */}
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
          <PhoneForm defaultValues={telefone} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          Você deseja realmente deletar o telefone{" "}
          <p className="font-bold">
            ({telefone.ddd}) {telefone.numero}?
          </p>
          <Button
            variant="destructive"
            className="flex flex-row gap-2"
            onClick={onDelete}
            disabled={isDeleting}
          >
            <Trash2 size={18} strokeWidth="2" />{" "}
            {isDeleting ? "Deletando..." : "Sim"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
