import { FishBatchModel } from "@/interfaces/models/FishBatch";

export function formatFishBatchDisplayWithDetails(fishBatch: FishBatchModel) {
  return `Código: ${fishBatch.codigo}. Disponível: ${fishBatch.numeroTotalPeixes - fishBatch.numeroPeixesAlocados}`;
}
