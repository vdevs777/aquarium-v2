import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  personPhoneSchema,
  PersonPhoneSchema,
} from "@/schemas/person-phone-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { FormSubmitButton } from "../form-submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PhoneType, getPhoneTypeOptions } from "@/interfaces/enums/PhoneType";
import { Switch } from "../ui/switch";

type PhoneFormProps = {
  defaultValues?: PersonPhoneSchema;
  onSubmit: (data: PersonPhoneSchema) => Promise<void>;
};

export function PhoneForm({ defaultValues, onSubmit }: PhoneFormProps) {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PersonPhoneSchema>({
    resolver: zodResolver(personPhoneSchema),
    defaultValues: {
      ...defaultValues,
      principal: defaultValues?.principal ?? false,
      ehWhatsApp: defaultValues?.ehWhatsApp ?? false,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full mt-2"
    >
      <div className="space-y-1">
        <Label>DDD</Label>
        <Input
          error={errors.ddd?.message}
          disabled={isSubmitting}
          {...register("ddd")}
        />
      </div>
      <div className="space-y-1">
        <Label>Número</Label>
        <Input
          error={errors.numero?.message}
          disabled={isSubmitting}
          {...register("numero")}
        />
      </div>
      <div className="space-y-1">
        <Label>Tipo telefone</Label>
        <Select
          onValueChange={(val) => (
            setValue("tipoTelefoneId", Number(val) as PhoneType),
            clearErrors("tipoTelefoneId")
          )}
          defaultValue={defaultValues && String(defaultValues.tipoTelefoneId)}
          disabled={isSubmitting}
        >
          <SelectTrigger error={errors.tipoTelefoneId?.message}>
            <SelectValue placeholder="Selecione o tipo de telefone" />
          </SelectTrigger>
          <SelectContent>
            {getPhoneTypeOptions().map((type) => (
              <SelectItem value={String(type.value)}>{type.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1 flex flex-col">
        <Label>Principal</Label>
        <Switch
          onCheckedChange={(val) => setValue("principal", val)}
          defaultChecked={defaultValues ? defaultValues.principal : false}
        />
      </div>
      <div className="space-y-1 flex flex-col">
        <Label>É whatsapp?</Label>
        <Switch
          onCheckedChange={(val) => setValue("ehWhatsApp", val)}
          defaultChecked={defaultValues ? defaultValues.ehWhatsApp : false}
        />
      </div>
      <FormSubmitButton loading={isSubmitting} />
    </form>
  );
}
