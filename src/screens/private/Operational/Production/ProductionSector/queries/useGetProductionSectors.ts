import { productionSectorService } from "@/services/production-sector.service";
import { useQuery } from "@tanstack/react-query";

export function useGetProductionSectors() {
  const { data, isLoading } = useQuery({
    queryKey: ["production-sectors-details"],
    queryFn: productionSectorService.getAllWithUnitsDetails,
  });

  return { productionSectors: data ?? [], isLoading };
}
