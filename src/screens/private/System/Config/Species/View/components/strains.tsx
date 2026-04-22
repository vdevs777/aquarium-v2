import { SpeciesForm } from "@/components/forms/species-form";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DataTable } from "@/components/ui/data-table";
import { SpeciesSchema } from "@/schemas/species-schema";
import { columns } from "./columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { strainsService } from "@/services/strains.service";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { CreateButton } from "@/components/buttons/create-button";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { StrainModel } from "@/interfaces/models/Strain";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { StrainDialog } from "./strain-dialog";
import { StrainSchema } from "@/schemas/strain-schema";
import { Section } from "@/components/ui/section";

type StrainsProps = {};

export function Strains({}: StrainsProps) {
  const qc = useQueryClient();
  const router = useRouter();
  const { id } = router.query;

  const [key, setKey] = useState(0);

  const [itemBeingManipulated, setItemBeingManipulated] =
    useState<StrainModel | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryFn: () => strainsService.getStrainsFromSpecies(Number(id)),
    queryKey: ["strains", Number(id)],
  });

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () =>
      strainsService.deleteStrainOnSpecies(
        Number(id),
        itemBeingManipulated?.id!,
      ),
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Linhagem deletada com sucesso!",
        description: `A linhagem ${itemBeingManipulated?.nome} foi deletada com sucesso.`,
      });
      setItemBeingManipulated(null);
      qc.invalidateQueries({ queryKey: ["strains", Number(id)] });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  const { mutateAsync: handleCreate, isPending: isCreating } = useMutation({
    mutationFn: (data: StrainSchema) =>
      strainsService.createStrainOnSpecies(Number(id), data),

    onSuccess: () => {
      setIsCreateOpen(false);

      toast({
        title: "Linhagem criada com sucesso!",
        description: "A nova linhagem foi adicionada.",
      });

      qc.invalidateQueries({ queryKey: ["strains", Number(id)] });
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  const { mutateAsync: handleUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (data: StrainSchema) =>
      strainsService.updateStrainOnSpecies(
        Number(id),
        itemBeingManipulated?.id!,
        data,
      ),
    // RESOLVER FLICEKR
    onSuccess: () => {
      setIsEditOpen(false);

      toast({
        title: "Linhagem atualizada!",
        description: `A linhagem ${itemBeingManipulated?.nome} foi atualizada.`,
      });

      setItemBeingManipulated(null);

      qc.invalidateQueries({ queryKey: ["strains", Number(id)] });
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  useLayoutEffect(() => {
    if (!isLoading) {
      setKey((prev) => prev + 1);
    }
  }, [isLoading]);

  return (
    <>
      <Section title="Linhagens">
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          error={error?.message}
          onEdit={(data) => {
            setItemBeingManipulated(data);
            setIsEditOpen(true);
          }}
          onCreate={() => setIsCreateOpen(true)}
          onDelete={(data) => {
            setItemBeingManipulated(data);
            setIsDeleteOpen(true);
          }}
        />
      </Section>
      <DeleteDialog
        title="Deletar linhagem"
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        itemLabel={itemBeingManipulated?.nome}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
      <StrainDialog
        mode="create"
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
      />
      <StrainDialog
        mode="update"
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSubmit={handleUpdate}
        defaultValues={{ nome: itemBeingManipulated?.nome ?? "" }}
        isLoading={isUpdating}
      />
    </>
  );
}
