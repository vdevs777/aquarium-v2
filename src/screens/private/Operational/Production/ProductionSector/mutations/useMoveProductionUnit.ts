import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionUnitService } from "@/services/production-unit.service";
import { ProductionSectorModelWithProductionUnits } from "@/interfaces/models/ProductionSector";
import { ProductionUnitDetailsModel } from "@/interfaces/models/ProductionUnit";
import { handleApiError } from "@/api/helpers/handle-api-error";

interface UseMoveProductionUnitProps {
  closeDialog: () => void;
}

export function useMoveProductionUnit({
  closeDialog,
}: UseMoveProductionUnitProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productionUnitService.move,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["production-sectors-details"],
      });

      const previousData = queryClient.getQueryData<
        ProductionSectorModelWithProductionUnits<ProductionUnitDetailsModel>[]
      >(["production-sectors-details"]);

      queryClient.setQueryData(
        ["production-sectors-details"],
        (
          old: ProductionSectorModelWithProductionUnits<ProductionUnitDetailsModel>[] = [],
        ) => {
          let movedUnit: any = null;

          const updated = old.map((sector) => {
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

          return updated.map((sector) => {
            if (sector.id === variables.destinationSectorId && movedUnit) {
              const exists = sector.unidades.some((u) => u.id === movedUnit.id);

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

    onSuccess: () => closeDialog(),

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
