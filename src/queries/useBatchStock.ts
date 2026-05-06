import { useMutation } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseBatchStockProps {
  closeDialog: () => void;
  refetch?: () => Promise<void> | void;
}

export function useBatchStock({ closeDialog, refetch }: UseBatchStockProps) {
  return useMutation({
    mutationFn: batchTransferService.stock,

    onSuccess: async () => {
      if (refetch) {
        await refetch();
      }

      toast({
        title: "Povoamento bem-sucedido!",
        description: "O povoamento foi realizado com sucesso.",
      });

      closeDialog();
    },

    onError: (error) => handleApiError(error),
  });
}
