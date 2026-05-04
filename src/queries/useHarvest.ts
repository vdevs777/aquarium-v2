import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { batchTransferService } from "@/services/batch-transfer.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseHarvestProps {
  closeDialog: () => void;
  invalidateQueryKeys?: QueryKey[];
}

export function useHarvest({
  closeDialog,
  invalidateQueryKeys = [["production-sectors-details"]],
}: UseHarvestProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: batchTransferService.harvest,

    onSuccess: () => {
      invalidateQueryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
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
