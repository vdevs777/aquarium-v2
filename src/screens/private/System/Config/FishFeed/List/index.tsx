import { CreateButton } from "@/components/buttons/create-button";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Wheat } from "lucide-react";
import { columns } from "./components/columns";
import { fishFeedService } from "@/services/fish-feed.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { useState } from "react";
import { FishFeedModel } from "@/interfaces/models/FishFeed";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { PopulateButton } from "@/components/buttons/populate-button";
import { populateFishFeeds } from "@/mocks/handlers/fish-feed";

export function FishFeedListScreen() {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: () => fishFeedService.getAll(),
    queryKey: ["fish-feeds"],
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<FishFeedModel | null>(
    null,
  );

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => fishFeedService.deleteById(itemToBeDeleted?.id!),
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Ração deletada com sucesso!",
        description: `A ração ${itemToBeDeleted?.nome} foi deletada com sucesso.`,
      });
      setItemToBeDeleted(null);
      qc.invalidateQueries({ queryKey: ["fish-feeds"] });
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
            icon={Wheat}
            title="Lista"
            path={["Sistema", "Configurações", "Ração"]}
          />
          <div className="space-x-2">
            <CreateButton />
            <PopulateButton
              onClick={() => {
                populateFishFeeds();
                qc.invalidateQueries({ queryKey: ["fish-feeds"] });
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
        title="Deletar ração"
        itemLabel={itemToBeDeleted?.nome}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
