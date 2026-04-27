import { setToken } from "@/api/helpers/set-token";
import { env } from "@/env";

import { RegisterUser } from "@/interfaces/http/Auth/RegisterUser";
import { CompanyModel } from "@/interfaces/models/Company";
import { LoginSchema } from "@/schemas/login-schema";
import axios from "axios";

const baseURL = env.NEXT_PUBLIC_API_URL!;

const PROVISORY_CLEAN_INSTANCE = axios.create({
  baseURL: baseURL.endsWith("/api") ? baseURL.slice(0, -4) : baseURL,
});

setToken(PROVISORY_CLEAN_INSTANCE);

async function login(request: LoginSchema): Promise<string> {
  const { data } = await PROVISORY_CLEAN_INSTANCE.post("/login", request);
  return data;
}

async function register(request: RegisterUser): Promise<"success" | "pending"> {
  const response = await PROVISORY_CLEAN_INSTANCE.post("/register", request);

  if (response.status === 201) return "pending";

  return "success";
}

async function getCompanies() {
  const { data } =
    await PROVISORY_CLEAN_INSTANCE.get<CompanyModel[]>("/companies");
  return data;
}

async function refreshTokenWithTenantId(id: string): Promise<string> {
  const { data } = await PROVISORY_CLEAN_INSTANCE.post<string>(
    `/login/tenant/${id}`,
  );
  return data;
}

export const accountService = {
  login,
  register,
  getCompanies,
  refreshTokenWithTenantId,
};
