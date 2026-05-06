import api from "@/api";
import { SupplierModel } from "@/interfaces/models/Supplier";

export const suppliersService = {
  async getAll() {
    const { data } = await api.get<SupplierModel[]>("/Fornecedor");
    return data;
  },
};
