import { Button } from "./ui/button";

type FormSubmitButtonProps = {
  text?: string;
  loading?: boolean;
};

export function FormSubmitButton({
  text = "Salvar",
  loading = false,
}: FormSubmitButtonProps) {
  return (
    <div className="flex justify-end">
      <Button type="submit" className="w-24" loading={loading}>
        {text}
      </Button>
    </div>
  );
}
