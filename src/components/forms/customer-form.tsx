import { PersonForm } from "../person/person-form";

import { customerSchema, CustomerSchema } from "@/schemas/customer-schema";

import { FormRow } from "../form-row";

import { InputController } from "../controllers/input-controller";

import { PersonType } from "@/interfaces/enums/PersonType";

type CustomerFormProps = {
  defaultValues?: Partial<CustomerSchema>;
  onSubmit: (data: CustomerSchema) => void | Promise<void>;
  className?: string;
  isEdit?: boolean;
};

export function CustomerForm({
  defaultValues,
  onSubmit,
  className,
  isEdit,
}: CustomerFormProps) {
  const editFormRowProps = {
    inputColSpan: isEdit ? 8 : undefined,
    labelColSpan: isEdit ? 4 : undefined,
  };

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
      isEdit={isEdit}
    >
      <FormRow label="Limite de crédito" {...editFormRowProps}>
        <InputController
          name="limiteCredito"
          type="number"
          placeholder="Informe o limite de crédito"
        />
      </FormRow>
    </PersonForm>
  );
}
