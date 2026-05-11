import api from "@/api";
import { PersonEmailModel, PersonPhoneModel } from "@/interfaces/models/Person";
import { PersonEmailSchema } from "@/schemas/person-email-schema";
import { PersonPhoneSchema } from "@/schemas/person-phone-schema";

export const personService = {
  async getPhones(personId: number) {
    const { data } = await api.get<PersonPhoneModel[]>(
      `/Pessoa/${personId}/telefones`,
    );
    return data;
  },

  async createPhone(personId: number, data: PersonPhoneSchema) {
    const payload: PersonPhoneModel = { id: 0, ...data };

    await api.post(`/Pessoa/${personId}/telefones`, payload);
  },

  async updatePhone(
    personId: number,
    phoneId: number,
    data: PersonPhoneSchema,
  ) {
    const payload: PersonPhoneModel = { id: phoneId, ...data };

    await api.put(`/Pessoa/${personId}/telefones/${phoneId}`, payload);
  },

  async deletePhone(personId: number, phoneId: number) {
    await api.delete(`/Pessoa/${personId}/telefones/${phoneId}`);
  },

  async getEmails(personId: number) {
    const { data } = await api.get<PersonEmailModel[]>(
      `/Pessoa/${personId}/emails`,
    );
    return data;
  },

  async createEmail(personId: number, data: PersonEmailSchema) {
    const payload: PersonEmailModel = { id: 0, ...data };

    await api.post(`/Pessoa/${personId}/emails`, payload);
  },

  async updateEmail(
    personId: number,
    emailId: number,
    data: PersonEmailSchema,
  ) {
    const payload: PersonEmailModel = { id: emailId, ...data };

    await api.put(`/Pessoa/${personId}/emails/${emailId}`, payload);
  },

  async deleteEmail(personId: number, emailId: number) {
    await api.delete(`/Pessoa/${personId}/emails/${emailId}`);
  },
};
