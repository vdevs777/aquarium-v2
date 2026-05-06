import { productionSectorService } from "@/services/production-sector.service";
import { useQuery } from "@tanstack/react-query";

export function useGetProductionSectors() {
  const query = useQuery({
    queryKey: ["production-sectors-details"],
    queryFn: productionSectorService.getAllWithUnitsDetails,
  });

  return { productionSectors: query.data ?? [], ...query };
}
