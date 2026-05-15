import { InputController } from "@/components/controllers/input-controller";
import { FormSubmitButton } from "@/components/form-submit-button";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePasswordBox() {
  return (
    <Box title="Alterar senha" className="w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nova senha</Label>
          <Input />
        </div>
        <div className="space-y-2">
          <Label>Confirme a nova senha</Label>
          <Input />
        </div>
        <FormSubmitButton />
      </div>
    </Box>
  );
}
