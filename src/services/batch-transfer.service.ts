import api from "@/api";
import { BatchStockingRequest } from "@/interfaces/http/ProductionUnit/BatchStockingRequest";
import { HarvestRequest } from "@/interfaces/http/ProductionUnit/HarvestRequest";
import { TransferRequest } from "@/interfaces/http/ProductionUnit/TransferRequest";

export const batchTransferService = {
  async stock(request: BatchStockingRequest) {
    await api.post("/movimentacoes-lote/povoamento", request);
  },

  async transfer(request: TransferRequest) {
    await api.post("/movimentacoes-lote/manejo", request);
  },

  async harvest(request: HarvestRequest) {
    await api.post("/movimentacoes-lote/despesca", request);
  },
};
