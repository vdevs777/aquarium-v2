import { handleApiError } from "@/api/helpers/handle-api-error";
import { LoginSchema } from "@/schemas/login-schema";
import { authService } from "@/services/auth.service";
import { setCursor } from "@/utils/set-cursor";
import { useRouter } from "next/router";

export function useAuth() {
  const router = useRouter();

  async function saveToken(value: string) {
    localStorage.setItem("token", value);
  }

  async function login(data: LoginSchema) {
    try {
      const token = await authService.login(data);
      saveToken(token);
      router.push("/");
    } catch (error) {
      handleApiError(error);
    }
  }

  return { saveToken, login };
}
