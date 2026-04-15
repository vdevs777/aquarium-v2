import { AuthLayout } from "../layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputController } from "@/components/input-controller";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema, RegisterSchema } from "@/schemas/register-schema";
import { cnpjMask, phoneMask } from "@/utils/masks";

export function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { register } = useAuth();

  return (
    <AuthLayout title="Crie sua conta">
      <form className="w-full space-y-6" onSubmit={handleSubmit(register)}>
        <div className="space-y-4">
          <InputController
            control={control}
            name="nome"
            placeholder="Responsável"
          />
          <InputController
            control={control}
            name="nomeEmpresa"
            placeholder="Nome da empresa"
          />
          <InputController
            control={control}
            name="cpfCnpj"
            placeholder="CNPJ"
            mask={cnpjMask.mask}
          />
          <InputController
            control={control}
            name="telefone"
            placeholder="Telefone"
          />
          <InputController
            control={control}
            name="email"
            placeholder="E-mail"
          />
          <InputController
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
          />
          <InputController
            control={control}
            name="confirmPassword"
            placeholder="Confirmar senha"
            secureTextEntry
          />

          <Button
            className="h-8 font-medium"
            type="submit"
            disabled={isSubmitting}
          >
            Registrar
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
