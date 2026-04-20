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

  useLayoutEffect(() => {
    if (!isLoading) {
      setKey((prev) => prev + 1);
    }
  }, [isLoading]);

  return (
    <>
      <AccordionItem
        key={`strains-${key}`} // Força recriação do componente
        value={"strains"}
        className="border-b px-4 last:border-b-0"
      >
        <AccordionTrigger>Linhagens</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <DataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            error={error?.message}
            onEdit={() => {}}
            onCreate={() => {}}
            onDelete={(data) => {
              setItemBeingManipulated(data);
              setIsDeleteOpen(true);
            }}
          />
        </AccordionContent>
      </AccordionItem>
      <DeleteDialog
        title="Deletar linhagem"
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        itemLabel={itemBeingManipulated?.nome}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
