import { CreateButton } from "@/components/buttons/create-button";
import { Box } from "@/components/ui/box";
import { DataTable } from "@/components/ui/data-table";
import { fishFeedColumns } from "../columns/fish-feed-columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { cultureStageService } from "@/services/culture-stage.service";
import { FishFeedDialog } from "../dialogs/fish-feed-dialog";
import { useState } from "react";
import { productionUnitModelColumns } from "../columns/production-unit-model-columns";
import { ProductionUnitModelDialog } from "../dialogs/production-unit-model-dialog";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { ProductionUnitModelModel } from "@/interfaces/models/ProductionUnitModel";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

export function ProductionUnitModelBox() {
  const router = useRouter();
  const { id } = router.query;

  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["culture-stage-production-unit-models", id],
    queryFn: () => cultureStageService.getModels(Number(id)),
  });

  const qc = useQueryClient();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] =
    useState<ProductionUnitModelModel | null>(null);

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () =>
      cultureStageService.removeModel(Number(id), itemToBeDeleted?.id!),
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Modelo deletado com sucesso!",
        description: `O modelo de unidade produtiva ${itemToBeDeleted?.nome} foi deletado com sucesso.`,
      });
      setItemToBeDeleted(null);
      qc.invalidateQueries({
        queryKey: ["culture-stage-production-unit-models", id],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return (
    <>
      <Box
        title="Modelos de unidade produtiva"
        className="w-full"
        headerInfo={
          <CreateButton variant="ghost" onClick={() => setIsAddOpen(true)} />
        }
      >
        <DataTable
          columns={productionUnitModelColumns}
          data={data}
          isLoading={isLoading}
          error={error?.message}
          onDelete={(data) => {
            setIsDeleteOpen(true);
            setItemToBeDeleted(data);
          }}
        />
      </Box>
      <ProductionUnitModelDialog onOpenChange={setIsAddOpen} open={isAddOpen} />
      <DeleteDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => handleDelete()}
        title="Deletar modelo"
        itemLabel={itemToBeDeleted?.nome}
        isLoading={isDeleting}
      />
    </>
  );
}
