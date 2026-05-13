import { PersonForm } from "../person/person-form";

import { supplierSchema, SupplierSchema } from "@/schemas/supplier-schema";

import { FormRow } from "../form-row";

import { SwitchController } from "../controllers/switch-controller";

import { PersonType } from "@/interfaces/enums/PersonType";

type SupplierFormProps = {
  defaultValues?: Partial<SupplierSchema>;
  onSubmit: (data: SupplierSchema) => void | Promise<void>;
  isEdit?: boolean;
};

export function SupplierForm({
  defaultValues,
  onSubmit,
  isEdit,
}: SupplierFormProps) {
  const editFormRowProps = {
    inputColSpan: isEdit ? 8 : undefined,
    labelColSpan: isEdit ? 4 : undefined,
  };

  return (
    <PersonForm<SupplierSchema>
      schema={supplierSchema}
      defaultValues={{
        tipoPessoa: PersonType.Legal,
        contribuinte: false,
        ...defaultValues,
      }}
      onSubmit={onSubmit}
      isEdit={isEdit}
    >
      {/* <FormRow label="Ativo" {...editFormRowProps}>
        <SwitchController name="ativo" />
      </FormRow> */}
    </PersonForm>
  );
}
