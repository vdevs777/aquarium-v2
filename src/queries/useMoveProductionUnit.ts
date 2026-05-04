import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionUnitService } from "@/services/production-unit.service";
import { ProductionSectorModelWithProductionUnits } from "@/interfaces/models/ProductionSector";
import { ProductionUnitDetailsModel } from "@/interfaces/models/ProductionUnit";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseMoveProductionUnitProps {
  closeDialog: () => void;
  queryKeys?: unknown[][];
}

type MoveVariables = {
  productionUnitId: number;
  destinationSectorId: number;
  sequence: number;
};

export function useMoveProductionUnit({
  closeDialog,
  queryKeys = [["production-sectors-details"]],
}: UseMoveProductionUnitProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productionUnitService.move,

    onMutate: async (variables: MoveVariables) => {
      await Promise.all(
        queryKeys.map((queryKey) => queryClient.cancelQueries({ queryKey })),
      );

      const previousData = queryClient.getQueryData<
        ProductionSectorModelWithProductionUnits<ProductionUnitDetailsModel>[]
      >(queryKeys[0]);

      queryClient.setQueryData(
        queryKeys[0],
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

      return { previousData };
    },

    onSuccess: () => {
      closeDialog();
    },

    onError: (err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKeys[0], context.previousData);
      }

      handleApiError(err);
    },

    onSettled: () => {
      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });
}
