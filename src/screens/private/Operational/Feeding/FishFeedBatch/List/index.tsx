import { CreateButton } from "@/components/buttons/create-button";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { PackageOpen } from "lucide-react";
import { columns } from "./components/columns";
import { FishFeedBatchModel } from "@/interfaces/models/FishFeedBatch";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fishFeedBatchService } from "@/services/fish-feed-batch.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { PopulateButton } from "@/components/buttons/populate-button";
import { populateFishFeedBatches } from "@/mocks/handlers/fish-feed-batch";

export function FishFeedBatchListScreen() {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: () => fishFeedBatchService.getAll(),
    queryKey: ["fish-feed-batches"],
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] =
    useState<FishFeedBatchModel | null>(null);

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => fishFeedBatchService.deleteById(itemToBeDeleted?.id!),
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Lote de ração deletado com sucesso!",
        description: `O lote de ração ${itemToBeDeleted?.numeroLote} foi deletado com sucesso.`,
      });
      setItemToBeDeleted(null);
      qc.invalidateQueries({ queryKey: ["fish-feed-batches"] });
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
            icon={PackageOpen}
            title="Lista"
            path={["Operacional", "Alimentação", "Lote de ração"]}
          />
          <div className="space-x-2">
            <CreateButton />
            <PopulateButton
              onClick={() => {
                populateFishFeedBatches();
                qc.invalidateQueries({ queryKey: ["fish-feed-batches"] });
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
        title="Deletar lote de ração"
        itemLabel={itemToBeDeleted?.numeroLote}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
