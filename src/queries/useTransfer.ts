import { useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseTransferProps {
  closeDialog: () => void;
  invalidateQueryKeys?: QueryKey[];
}

export function useTransfer({
  closeDialog,
  invalidateQueryKeys = [],
}: UseTransferProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchTransferService.transfer,

    onSuccess: () => {
      invalidateQueryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      toast({
        title: "Transferência bem-sucedida!",
        description: "A transferência foi realizada com sucesso.",
      });

      closeDialog();
    },

    onError: (error) => handleApiError(error),
  });
}
