import api from "@/api";
import { CustomerModel } from "@/interfaces/models/Customer";

export const customerService = {
  async getAll() {
    const { data } = await api.get<CustomerModel[]>("/Cliente");
    return data;
  },
};
