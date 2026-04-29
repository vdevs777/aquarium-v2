import { useMutation, useQueryClient } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseHarvestProps {
  closeDialog: () => void;
}

export function useHarvest({ closeDialog }: UseHarvestProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchTransferService.harvest,

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["production-sectors-details"],
      });

      toast({
        title: "Despesca bem-sucedida!",
        description: "A despesca foi realizada com sucesso.",
      });

      closeDialog();
    },

    onError: (error) => handleApiError(error),
  });
}
