import { ReactNode, useEffect, useState } from "react";
import { Edit2, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionSectorService } from "@/services/production-sector.service";

type ProductionSectorBoxProps = {
  id: number;
  name: string;
  children?: ReactNode;
};

export function ProductionSectorBox({
  id,
  name,
  children,
}: ProductionSectorBoxProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [currentName, setCurrentName] = useState(name);
  const [draftName, setDraftName] = useState(name);

  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCurrentName(name);
    setDraftName(name);
  }, [name]);

  // ✅ UPDATE MUTATION
  const { mutateAsync: updateSector } = useMutation({
    mutationFn: (data: { id: number; nome: string }) =>
      productionSectorService.update(data.id, data.nome),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["production-sectors-details"],
      });

      const previousData = queryClient.getQueryData<any[]>([
        "production-sectors-details",
      ]);

      queryClient.setQueryData(
        ["production-sectors-details"],
        (old: any[] = []) =>
          old.map((sector) =>
            sector.id === variables.id
              ? { ...sector, nome: variables.nome }
              : sector,
          ),
      );

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["production-sectors-details"],
          context.previousData,
        );
      }

      toast({
        title: "Erro ao atualizar setor",
        description: "Não foi possível atualizar.",
        variant: "destructive",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["production-sectors-details"],
      });
    },
  });

  // ✅ DELETE MUTATION (NOVO)
  const { mutateAsync: deleteSector } = useMutation({
    mutationFn: (id: number) => productionSectorService.delete(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["production-sectors-details"],
      });

      const previousData = queryClient.getQueryData<any[]>([
        "production-sectors-details",
      ]);

      queryClient.setQueryData(
        ["production-sectors-details"],
        (old: any[] = []) => old.filter((sector) => sector.id !== id),
      );

      return { previousData };
    },

    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["production-sectors-details"],
          context.previousData,
        );
      }

      toast({
        title: "Erro ao deletar setor",
        description: "Não foi possível deletar.",
        variant: "destructive",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["production-sectors-details"],
      });
    },
  });

  const handleSave = async () => {
    const previous = currentName;

    try {
      setCurrentName(draftName);
      setIsEditing(false);

      await updateSector({ id, nome: draftName });
    } catch {
      setCurrentName(previous);
    }
  };

  const handleCancel = () => {
    setDraftName(currentName);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteSector(id);
      setIsDialogOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col border-zinc-300 bg-white border rounded-md p-4">
        <header className="flex items-center mb-4 gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="h-8"
              />

              <button onClick={handleSave} className="text-blue-500">
                Salvar
              </button>

              <span>|</span>

              <button onClick={handleCancel} className="text-destructive">
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <strong>{currentName}</strong>

              <Edit2
                size={16}
                className="cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
            </div>
          )}

          <button
            className="ml-auto p-2 size-8 text-destructive"
            onClick={() => setIsDialogOpen(true)}
          >
            <Trash size={20} />
          </button>
        </header>

        {children}
      </div>

      <DeleteDialog
        title="Deletar setor"
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleDelete}
        itemLabel={currentName}
      />
    </>
  );
}
