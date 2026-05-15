import { Input } from "@/components/ui/input";
import { AuthLayout } from "../layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { handleApiError } from "@/api/helpers/handle-api-error";
import { accountService } from "@/services/account.service";
import { toast } from "@/hooks/useToast";

export function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRecoverPassword() {
    try {
      setIsSubmitting(true);
      await accountService.forgotPassword(email);
      toast({
        title: "E-mail de mudança de senha enviado",
        description:
          "Um e-mail com as instruções para redefinir sua senha foi enviado com sucesso.",
      });
      router.push("/login");
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Esqueci minha senha">
      <form
        className="w-full flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleRecoverPassword();
        }}
      >
        <Input
          placeholder="E-mail"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <Button type="submit" loading={isSubmitting}>
          Recuperar minha senha
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/login")}
          disabled={isSubmitting}
        >
          <ArrowLeft /> Voltar para login
        </Button>
      </form>
    </AuthLayout>
  );
}
