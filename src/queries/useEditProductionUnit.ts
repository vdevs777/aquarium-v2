import { useMutation } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { productionUnitService } from "@/services/production-unit.service";
import { ProductionUnitEditRequest } from "@/interfaces/http/ProductionUnit/ProductionUnitEditRequest";

interface UseEditProductionUnitProps {
  id: number;
  closeDialog: () => void;
  refetch?: () => Promise<void> | void;
}

export function useEditProductionUnit({
  id,
  closeDialog,
  refetch,
}: UseEditProductionUnitProps) {
  return useMutation({
    mutationFn: (data: ProductionUnitEditRequest) =>
      productionUnitService.edit(id, data),

    onSuccess: async () => {
      if (refetch) {
        await refetch();
      }

      closeDialog();

      toast({
        title: "Edição bem-sucedida!",
        description: "A unidade produtiva foi editada com sucesso.",
      });
    },

    onError: (error) => handleApiError(error),
  });
}
