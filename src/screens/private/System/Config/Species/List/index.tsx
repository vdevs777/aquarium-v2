import { handleApiError } from "@/api/helpers/handle-api-error";
import { CreateButton } from "@/components/buttons/create-button";
import { PopulateButton } from "@/components/buttons/populate-button";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "@/hooks/useToast";
import { SpeciesModel } from "@/interfaces/models/Species";
import { populateSpecies } from "@/mocks/handlers/species";
import { speciesService } from "@/services/species.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fish } from "lucide-react";
import { useState } from "react";
import { columns } from "./components/columns";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";

export function SpeciesListScreen() {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: () => speciesService.getAll(),
    queryKey: ["species"],
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<SpeciesModel | null>(
    null,
  );

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => speciesService.deleteById(itemToBeDeleted?.id!),
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Espécie deletada com sucesso!",
        description: `A espécie ${itemToBeDeleted?.nome} foi deletada com sucesso.`,
      });
      setItemToBeDeleted(null);
      qc.invalidateQueries({ queryKey: ["species"] });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center">
          <PageHeader
            icon={Fish}
            title="Lista"
            path={["Sistema", "Configurações", "Espécies"]}
          />
          <div className="space-x-2">
            <CreateButton />
            <PopulateButton
              onClick={() => {
                populateSpecies();
                qc.invalidateQueries({ queryKey: ["species"] });
              }}
            />
          </div>
        </div>{" "}
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          error={error?.message}
          onDelete={(item) => {
            setIsDeleteOpen(true);
            setItemToBeDeleted(item);
          }}
          hasClick
        />
      </div>

      <DeleteDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Deletar espécie"
        itemLabel={itemToBeDeleted?.nome}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
