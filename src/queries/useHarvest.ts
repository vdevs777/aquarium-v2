import { useMutation } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseHarvestProps {
  closeDialog: () => void;
  refetch?: () => Promise<void> | void;
}

export function useHarvest({ closeDialog, refetch }: UseHarvestProps) {
  return useMutation({
    mutationFn: batchTransferService.harvest,

    onSuccess: async () => {
      if (refetch) {
        await refetch();
      }

      toast({
        title: "Despesca bem-sucedida!",
        description: "A despesca foi realizada com sucesso.",
      });

      closeDialog();
    },

    onError: (error) => handleApiError(error),
  });
}
