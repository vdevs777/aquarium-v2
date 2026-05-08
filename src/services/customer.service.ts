import api from "@/api";
import { CustomerModel } from "@/interfaces/models/Customer";
import { CustomerSchema } from "@/schemas/customer-schema";

export const customerService = {
  async getAll() {
    const { data } = await api.get<CustomerModel[]>("/Cliente");
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<CustomerModel>(`/Cliente/${id}`);
    return data;
  },

  async create({ cpf, cnpj, limiteDeCredito, ...data }: CustomerSchema) {
    const response = await api.post<CustomerModel>("/Cliente", {
      pessoa: {
        ...data,
        cpfCnpj: cpf ?? cnpj,
      },
      limiteDeCredito,
    });

    return response.data;
  },
};
