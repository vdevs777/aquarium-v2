import { useMutation, useQueryClient } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseBatchStockProps {
  closeDialog: () => void;
}

export function useBatchStock({ closeDialog }: UseBatchStockProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchTransferService.stock,

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["production-sectors-details"],
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
