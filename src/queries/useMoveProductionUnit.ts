import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionUnitService } from "@/services/production-unit.service";
import { ProductionSectorModelWithProductionUnits } from "@/interfaces/models/ProductionSector";
import { ProductionUnitDetailsModel } from "@/interfaces/models/ProductionUnit";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseMoveProductionUnitProps {
  closeDialog: () => void;
  refetch?: () => Promise<void> | void;
}

type MoveVariables = {
  productionUnitId: number;
  destinationSectorId: number;
  sequence: number;
};

export function useMoveProductionUnit({
  closeDialog,
  refetch,
}: UseMoveProductionUnitProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productionUnitService.move,

    onMutate: async (variables: MoveVariables) => {
      const queryKey = ["production-sectors-details"];

      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<
          ProductionSectorModelWithProductionUnits<ProductionUnitDetailsModel>[]
        >(queryKey);

      queryClient.setQueryData(
        queryKey,
        (
          old: ProductionSectorModelWithProductionUnits<ProductionUnitDetailsModel>[] = [],
        ) => {
          let movedUnit: ProductionUnitDetailsModel | null = null;

          const withoutOrigin = old.map((sector) => {
            const unit = sector.unidades.find(
              (u) => u.id === variables.productionUnitId,
            );

            if (unit) {
              movedUnit = { ...unit, sequencia: variables.sequence };

              return {
                ...sector,
                unidades: sector.unidades.filter(
                  (u) => u.id !== variables.productionUnitId,
                ),
              };
            }

            return sector;
          });

          return withoutOrigin.map((sector) => {
            if (sector.id === variables.destinationSectorId && movedUnit) {
              const exists = sector.unidades.some(
                (u) => u.id === movedUnit!.id,
              );

              if (exists) return sector;

              return {
                ...sector,
                unidades: [...sector.unidades, movedUnit],
              };
            }

            return sector;
          });
        },
      );

      return { previousData, queryKey };
    },

    onSuccess: () => {
      closeDialog();
    },

    onError: (err, _vars, context) => {
      if (context?.previousData && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }

      handleApiError(err);
    },

    onSettled: async () => {
      if (refetch) {
        await refetch();
      }
    },
  });
}
