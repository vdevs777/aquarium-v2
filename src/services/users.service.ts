import api from "@/api";

import { UserModel } from "@/interfaces/models/User";

async function getAll() {
  const { data } = await api.get<UserModel[]>("/users");
  return data;
}

async function invite(email: string) {
  await api.post(`/invite-user/${email}`);
}

export const usersService = { getAll, invite };
