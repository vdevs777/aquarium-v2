import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "@/hooks/useToast";
import { accountService } from "@/services/account.service";
import { handleApiError } from "@/api/helpers/handle-api-error";

export default function ConfirmEmail() {
  const router = useRouter();
  const { token } = router.query;

  async function sendToken() {
    try {
      await accountService.confirmEmail(String(token));
      router.push("/login");
      toast({
        title: "E-mail confirmado com sucesso",
        description:
          "Seu e-mail foi confirmado, agora você conseguirá fazer login normalmente",
      });
    } catch (error) {
      router.push("/login");
      handleApiError(error);
    }
  }

  useEffect(() => {
    if (router.isReady && token) {
      sendToken();
    }
  }, [router.isReady, token]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
