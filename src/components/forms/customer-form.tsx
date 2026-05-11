import { PersonForm } from "../person/person-form";

import { customerSchema, CustomerSchema } from "@/schemas/customer-schema";

import { FormRow } from "../form-row";

import { InputController } from "../controllers/input-controller";

import { PersonType } from "@/interfaces/enums/PersonType";

type CustomerFormProps = {
  defaultValues?: Partial<CustomerSchema>;
  onSubmit: (data: CustomerSchema) => void | Promise<void>;
  className?: string;
};

export function CustomerForm({
  defaultValues,
  onSubmit,
  className,
}: CustomerFormProps) {
  return (
    <PersonForm<CustomerSchema>
      schema={customerSchema}
      defaultValues={{
        tipoPessoa: PersonType.Physical,
        contribuinte: false,
        limiteDeCredito: 0,
        ...defaultValues,
      }}
      onSubmit={onSubmit}
      className={className}
    >
      <FormRow label="Limite de crédito">
        <InputController
          name="limiteCredito"
          type="number"
          placeholder="Informe o limite de crédito"
        />
      </FormRow>
    </PersonForm>
  );
}
