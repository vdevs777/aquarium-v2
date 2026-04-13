import { handleApiError } from "@/api/helpers/handle-api-error";
import { LoginSchema } from "@/schemas/login-schema";
import { RegisterSchema } from "@/schemas/register-schema";
import { authService } from "@/services/auth.service";
import { unmask } from "@/utils/masks";
import { setCursor } from "@/utils/set-cursor";
import { useRouter } from "next/router";
import { toast } from "./useToast";

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

  async function register(data: RegisterSchema) {
    const unmaskedPhone = unmask(data.telefone);
    const unmaskedCnpj = unmask(data.cpfCnpj);

    const ddd = unmaskedPhone.slice(0, 2);
    const phone = unmaskedPhone.slice(2);

    try {
      const result = await authService.register({
        ...data,
        ddd,
        telefone: phone,
        cpfCnpj: unmaskedCnpj,
      });

      router.push("/login");

      if (result === "success") {
        toast({
          title: "Empresa registrada com sucesso",
          description:
            "Realize o login e selecione a nova empresa que foi registrada.",
        });
      }

      if (result === "pending") {
        toast({
          title: "Empresa registrada com sucesso",
          description:
            "Um e-mail de confirmação foi enviado. Por favor, verifique sua caixa de entrada.",
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  return { saveToken, login, register };
}
