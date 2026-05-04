import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionSectorService } from "@/services/production-sector.service";
import { handleApiError } from "@/api/helpers/handle-api-error";

export function useUpdateProductionSector() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; nome: string }) =>
      productionSectorService.update(data.id, data.nome),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["production-sectors-details"],
      });

      const previousData = queryClient.getQueryData<any[]>([
        "production-sectors-details",
      ]);

      queryClient.setQueryData(
        ["production-sectors-details"],
        (old: any[] = []) =>
          old.map((sector) =>
            sector.id === variables.id
              ? { ...sector, nome: variables.nome }
              : sector,
          ),
      );

      return { previousData };
    },

    onError: (err, _vars, context) => {
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
