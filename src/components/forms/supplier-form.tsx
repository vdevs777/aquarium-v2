import { PersonForm } from "../person/person-form";

import { supplierSchema, SupplierSchema } from "@/schemas/supplier-schema";

import { FormRow } from "../form-row";

import { SwitchController } from "../controllers/switch-controller";

import { PersonType } from "@/interfaces/enums/PersonType";

type SupplierFormProps = {
  defaultValues?: Partial<SupplierSchema>;
  onSubmit: (data: SupplierSchema) => void | Promise<void>;
};

export function SupplierForm({ defaultValues, onSubmit }: SupplierFormProps) {
  return (
    <PersonForm<SupplierSchema>
      schema={supplierSchema}
      defaultValues={{
        tipoPessoa: PersonType.Legal,
        contribuinte: false,
        ativo: true,
        ...defaultValues,
      }}
      onSubmit={onSubmit}
    >
      <FormRow label="Ativo">
        <SwitchController name="ativo" />
      </FormRow>
    </PersonForm>
  );
}
