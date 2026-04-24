import { CreateButton } from "@/components/buttons/create-button";
import { Box } from "@/components/ui/box";
import { DataTable } from "@/components/ui/data-table";
import { fishFeedColumns } from "../columns/fish-feed-columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { cultureStageService } from "@/services/culture-stage.service";
import { FishFeedDialog } from "../dialogs/fish-feed-dialog";
import { useState } from "react";
import { FishFeedModel } from "@/interfaces/models/FishFeed";
import { fishFeedService } from "@/services/fish-feed.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";

export function FishFeedBox() {
  const router = useRouter();
  const { id } = router.query;

  const qc = useQueryClient();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["culture-stage-fish-feeds", id],
    queryFn: () => cultureStageService.getFeeds(Number(id)),
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<FishFeedModel | null>(
    null,
  );

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () =>
      cultureStageService.removeFeed(Number(id), itemToBeDeleted?.id!),
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Ração deletada com sucesso!",
        description: `A ração ${itemToBeDeleted?.nome} foi deletada com sucesso.`,
      });
      setItemToBeDeleted(null);
      qc.invalidateQueries({ queryKey: ["culture-stage-fish-feeds", id] });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return (
    <>
      <Box
        title="Rações"
        className="w-full"
        headerInfo={
          <CreateButton variant="ghost" onClick={() => setIsAddOpen(true)} />
        }
      >
        <DataTable
          columns={fishFeedColumns}
          data={data}
          isLoading={isLoading}
          error={error?.message}
          onDelete={(data) => {
            setIsDeleteOpen(true);
            setItemToBeDeleted(data);
          }}
        />
      </Box>
      <FishFeedDialog onOpenChange={setIsAddOpen} open={isAddOpen} />
      <DeleteDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => handleDelete()}
        title="Deletar ração"
        itemLabel={itemToBeDeleted?.nome}
        isLoading={isDeleting}
      />
    </>
  );
}
