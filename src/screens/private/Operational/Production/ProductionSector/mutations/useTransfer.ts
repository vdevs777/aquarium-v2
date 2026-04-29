import { useMutation, useQueryClient } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseTransferProps {
  closeDialog: () => void;
}

export function useTransfer({ closeDialog }: UseTransferProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchTransferService.transfer,

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["production-sectors-details"],
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
