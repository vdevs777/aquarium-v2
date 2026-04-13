import { Input } from "@/components/ui/input";
import { AuthLayout } from "../layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/schemas/login-schema";
import { InputController } from "@/components/input-controller";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  return (
    <AuthLayout title="Acesse sua conta">
      <form className="w-full space-y-6" onSubmit={handleSubmit(login)}>
        <div className="space-y-4">
          <InputController control={control} name="email" />
          <InputController control={control} name="password" secureTextEntry />
          <div className="flex flex-end justify-between items-center">
            <Button
              className="h-8 font-medium"
              type="submit"
              disabled={isSubmitting}
            >
              Logar
            </Button>
            <Button
              variant="link"
              className="text-md font-normal text-gray-500"
              asChild
              type="button"
            >
              <Link href="forgot-password">Esqueci minha senha</Link>
            </Button>
          </div>
        </div>
      </form>
      <Separator className="my-4" />
      <Button className="w-full h-auto p-4" asChild>
        <Link href="register">
          <div className="flex justify-center flex-col flex-1">
            <p className="text-sm">Não tem uma conta?</p>
            <p className="font-semibold text-sm">Se inscreva gratuitamente</p>
          </div>
          <div className="flex items-center justify-end">
            <ChevronRight />
          </div>
        </Link>
      </Button>
    </AuthLayout>
  );
}
