import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseBatchStockProps {
  closeDialog: () => void;
  invalidateQueryKeys?: QueryKey[];
}

export function useBatchStock({
  closeDialog,
  invalidateQueryKeys = [["production-sectors-details"]],
}: UseBatchStockProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchTransferService.stock,

    onSuccess: () => {
      invalidateQueryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      toast({
        title: "Povoamento bem-sucedido!",
        description: "O povoamento foi realizado com sucesso.",
      });

      closeDialog();
    },

    onError: (error) => handleApiError(error),
  });
}
