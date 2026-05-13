import api from "@/api";
import { SupplierModel } from "@/interfaces/models/Supplier";
import { SupplierSchema } from "@/schemas/supplier-schema";

export const suppliersService = {
  async getAll() {
    const { data } = await api.get<SupplierModel[]>("/Fornecedor");
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<SupplierModel>(`/Fornecedor/${id}`);
    return data;
  },

  async create({ cpf, cnpj, ...data }: SupplierSchema) {
    const response = await api.post<SupplierModel>("/Fornecedor", {
      pessoa: {
        ...data,
        cpfCnpj: cpf ?? cnpj,
      },
    });

    return response.data;
  },

  async update(id: number, { cpf, cnpj, ...data }: SupplierSchema) {
    await api.put<SupplierModel>(`/Fornecedor/${id}`, {
      id,
      pessoa: {
        ...data,
        cpfCnpj: cpf ?? cnpj,
      },
    });
  },
};
