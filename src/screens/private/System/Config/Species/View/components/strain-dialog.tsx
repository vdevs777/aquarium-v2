import { InputController } from "@/components/controllers/input-controller";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { strainSchema, StrainSchema } from "@/schemas/strain-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type StrainDialogProps = {
  mode?: "create" | "update";
  defaultValues?: StrainSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: StrainSchema) => Promise<any>;
  isLoading?: boolean;
};

export function StrainDialog({
  mode = "create",
  defaultValues,
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: StrainDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<StrainSchema>({
    resolver: zodResolver(strainSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues && !isSubmitting) {
      reset(defaultValues);
    }
  }, [defaultValues, reset, isSubmitting]);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogTitle>
          {mode === "create" ? "Cadastrar linhagem" : "Editar linhagem"}
        </DialogTitle>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <InputController
              control={control}
              name="nome"
              id="nome"
              placeholder="Informe a linhagem"
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            loading={isSubmitting || isLoading}
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
