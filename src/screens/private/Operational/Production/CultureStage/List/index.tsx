import { handleApiError } from "@/api/helpers/handle-api-error";
import { CreateButton } from "@/components/buttons/create-button";
import { PopulateButton } from "@/components/buttons/populate-button";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "@/hooks/useToast";
import { CultureStageModel } from "@/interfaces/models/CultureStage";
import { populateCultureStages } from "@/mocks/handlers/culture-stage";
import { cultureStageService } from "@/services/culture-stage.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fish } from "lucide-react";
import { useState } from "react";
import { columns } from "./components/columns";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";

export function CultureStageListScreen() {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: () => cultureStageService.getAll(),
    queryKey: ["culture-stages"],
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] =
    useState<CultureStageModel | null>(null);

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => cultureStageService.deleteById(itemToBeDeleted?.id!),
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Fase de cultivo deletada com sucesso!",
        description: `A fase de cultivos ${itemToBeDeleted?.nome} foi deletada com sucesso.`,
      });
      setItemToBeDeleted(null);
      qc.invalidateQueries({ queryKey: ["culture-stages"] });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return (
    <>
      {" "}
      <div>
        <div className="w-full flex justify-between items-center">
          <PageHeader
            icon={Fish}
            title="Lista"
            path={["Operacional", "Produção", "Fase de cultivo"]}
          />
          <div className="space-x-2">
            <CreateButton />
            <PopulateButton
              onClick={() => {
                populateCultureStages();
                qc.invalidateQueries({ queryKey: ["culture-stages"] });
              }}
            />
          </div>
        </div>
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
        title="Deletar fase de cultivo"
        itemLabel={itemToBeDeleted?.nome}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
