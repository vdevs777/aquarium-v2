import z from "zod";
import { AuthLayout } from "../layout";
import { passwordSchema } from "@/schemas/fields/password-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { accountService } from "@/services/account.service";
import { toast } from "@/hooks/useToast";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { Button } from "@/components/ui/button";
import { InputController } from "@/components/controllers/input-controller";

export const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string("Confirme a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type Schema = z.infer<typeof schema>;

export function ResetPasswordScreen() {
  const router = useRouter();

  const { token } = router.query;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function handleResetPassword(data: Schema) {
    try {
      if (!token) {
        toast({
          title: "Token inválido",
          description: "O link de redefinição é inválido ou expirou.",
          variant: "destructive",
        });

        return;
      }

      let decodedToken: { Email: string; Token: string };

      try {
        decodedToken = JSON.parse(atob(String(token)));
      } catch {
        toast({
          title: "Token inválido",
          description: "O link de redefinição é inválido ou expirou.",
          variant: "destructive",
        });

        return;
      }

      await accountService.resetPassword({
        password: data.password,
        confirmPassword: data.confirmPassword,
        email: decodedToken.Email,
        token: decodedToken.Token,
      });

      toast({
        title: "Senha alterada com sucesso",
        description: "Você pode agora usar sua nova senha para fazer login.",
      });

      router.push("/login");
    } catch (err: any) {
      handleApiError(err);
    }
  }

  return (
    <AuthLayout title="Redefinir senha">
      <form
        className="w-full flex flex-col space-y-4"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <InputController
          control={control}
          name="password"
          secureTextEntry
          placeholder="Nova senha"
        />
        <InputController
          control={control}
          name="confirmPassword"
          secureTextEntry
          placeholder="Confirmar nova senha"
        />
        <Button type="submit" loading={isSubmitting}>
          Trocar senha
        </Button>
      </form>
    </AuthLayout>
  );
}
