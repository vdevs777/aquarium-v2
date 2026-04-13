import api from "@/api";

import { RegisterUser } from "@/interfaces/http/Auth/RegisterUser";
import { LoginSchema } from "@/schemas/login-schema";

async function login(request: LoginSchema): Promise<string> {
  const { data } = await api.post("/login", request);
  return data;
}

async function register(request: RegisterUser): Promise<"success" | "pending"> {
  const response = await api.post("/register", request);

  if (response.status === 201) return "pending";

  return "success";
}

export const authService = { login, register };
