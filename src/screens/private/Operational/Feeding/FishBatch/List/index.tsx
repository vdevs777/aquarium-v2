import { handleApiError } from "@/api/helpers/handle-api-error";
import { CreateButton } from "@/components/buttons/create-button";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "@/hooks/useToast";
import { FishBatchModel } from "@/interfaces/models/FishBatch";
import { fishBatchService } from "@/services/fish-batch.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fish } from "lucide-react";
import { useState } from "react";
import { columns } from "./components/columns";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";

export function FishBatchListScreen() {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: () => fishBatchService.getAll(),
    queryKey: ["fish-batches"],
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<FishBatchModel | null>(
    null,
  );

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => fishBatchService.deleteById(itemToBeDeleted?.id!),
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Lote produtivo deletado com sucesso!",
        description: `O lote produtivo ${itemToBeDeleted?.codigo} foi deletado com sucesso.`,
      });
      setItemToBeDeleted(null);
      qc.invalidateQueries({ queryKey: ["fish-batches"] });
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
            title="Lista"
            icon={Fish}
            path={["Operacional", "Alimentação", "Lote produtivo"]}
          />
          <CreateButton />
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
        title="Deletar lote produtivo"
        itemLabel={itemToBeDeleted?.codigo}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
