import api from "@/api";

import { LoginSchema } from "@/schemas/login-schema";

async function login(request: LoginSchema): Promise<string> {
  const { data } = await api.post("/login", request);
  return data;
}

export const authService = { login };
