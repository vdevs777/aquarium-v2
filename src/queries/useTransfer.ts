import { useMutation } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseTransferProps {
  closeDialog: () => void;
  refetch?: () => Promise<void> | void;
}

export function useTransfer({ closeDialog, refetch }: UseTransferProps) {
  return useMutation({
    mutationFn: batchTransferService.transfer,

    onSuccess: async () => {
      if (refetch) {
        await refetch();
      }

      toast({
        title: "Transferência bem-sucedida!",
        description: "A transferência foi realizada com sucesso.",
      });

      closeDialog();
    },

    onError: (error) => handleApiError(error),
  });
}
