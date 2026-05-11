import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PersonEmailSchema,
  personEmailSchema,
} from "@/schemas/person-email-schema";
import { Label } from "../ui/label";
import { FormSubmitButton } from "../form-submit-button";
import { Switch } from "../ui/switch";

type EmailFormProps = {
  defaultValues?: PersonEmailSchema;
  onSubmit: (data: PersonEmailSchema) => Promise<void>;
};

export function EmailForm({ defaultValues, onSubmit }: EmailFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PersonEmailSchema>({
    resolver: zodResolver(personEmailSchema),
    defaultValues: {
      ...defaultValues,
      principal: defaultValues?.principal ?? false,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full mt-2"
    >
      <div className="space-y-1">
        <Label>E-mail</Label>
        <Input
          {...register("email")}
          error={errors.email?.message}
          defaultValue={defaultValues?.email}
          disabled={isSubmitting}
        />
      </div>
      <div className="space-y-1 flex flex-col">
        <Label>Principal</Label>
        <Switch
          onCheckedChange={(val) => setValue("principal", val)}
          defaultChecked={defaultValues ? defaultValues.principal : false}
        />
      </div>
      <FormSubmitButton loading={isSubmitting} />
    </form>
  );
}
