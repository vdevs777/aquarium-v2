import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionSectorService } from "@/services/production-sector.service";
import { handleApiError } from "@/api/helpers/handle-api-error";

export function useDeleteProductionSector() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productionSectorService.delete(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["production-sectors-details"],
      });

      const previousData = queryClient.getQueryData<any[]>([
        "production-sectors-details",
      ]);

      queryClient.setQueryData(
        ["production-sectors-details"],
        (old: any[] = []) => old.filter((sector) => sector.id !== id),
      );

      return { previousData };
    },

    onError: (err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["production-sectors-details"],
          context.previousData,
        );
      }

      handleApiError(err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["production-sectors-details"],
      });
    },
  });
}
