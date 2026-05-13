import { ReactNode, useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Path,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { ZodType } from "zod";

import {
  getPersonTypeOptions,
  PersonType,
} from "@/interfaces/enums/PersonType";
import { getGenderOptions } from "@/interfaces/enums/Gender";

import { FormBox } from "../form-box";
import { FormRow } from "../form-row";
import { FormSubmitButton } from "../form-submit-button";

import { SelectController } from "../controllers/select-controller";
import { InputController } from "../controllers/input-controller";
import { SwitchController } from "../controllers/switch-controller";

import { cnpjMask, cpfMask, maskValue } from "@/utils/masks";
import { ZodTypeAny } from "zod/v3";
import { format } from "date-fns";

type PersonFormProps<T extends FieldValues> = {
  schema: z.ZodObject<any>;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children?: ReactNode;
  className?: string;
  isEdit?: boolean;
};

export function PersonForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  isEdit = false,
}: PersonFormProps<T>) {
  // @ts-ignore
  const formattedDefaultValues: DefaultValues<T> = {
    ...defaultValues,
    dataNascimento: defaultValues?.dataNascimento
      ? format(new Date(defaultValues?.dataNascimento), "yyyy-MM-dd")
      : null,
    dataAbertura: defaultValues?.dataAbertura
      ? format(new Date(defaultValues?.dataAbertura), "yyyy-MM-dd")
      : null,
    cpf:
      defaultValues?.tipoPessoa === PersonType.Physical &&
      defaultValues?.cpfCnpj
        ? maskValue(defaultValues.cpfCnpj, cpfMask)
        : null,

    cnpj:
      defaultValues?.tipoPessoa === PersonType.Legal && defaultValues?.cpfCnpj
        ? maskValue(defaultValues.cpfCnpj, cnpjMask)
        : null,
  };

  const methods = useForm<T>({
    resolver: zodResolver(schema) as Resolver<T>,
    defaultValues: formattedDefaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { isSubmitting, errors },
  } = methods;

  const selectedPersonType = watch("tipoPessoa" as Path<T>) as PersonType;

  function changeToLegalPerson() {
    setValue("cpf" as Path<T>, null as never);
    setValue("dataNascimento" as Path<T>, null as never);
    setValue("numeroDocumento" as Path<T>, null as never);
    setValue("orgaoEmissor" as Path<T>, null as never);
    setValue("generoId" as Path<T>, null as never);

    resetField("cnpj" as Path<T>);
    resetField("razaoSocial" as Path<T>);
    resetField("contribuinte" as Path<T>);
    resetField("inscricaoEstadual" as Path<T>);
    resetField("inscricaoMunicipal" as Path<T>);
    resetField("dataAbertura" as Path<T>);
  }

  function changeToPhysicalPerson() {
    resetField("cpf" as Path<T>);
    resetField("dataNascimento" as Path<T>);
    resetField("numeroDocumento" as Path<T>);
    resetField("orgaoEmissor" as Path<T>);
    resetField("generoId" as Path<T>);

    setValue("cnpj" as Path<T>, null as never);
    setValue("razaoSocial" as Path<T>, null as never);
    setValue("contribuinte" as Path<T>, null as never);
    setValue("inscricaoEstadual" as Path<T>, null as never);
    setValue("inscricaoMunicipal" as Path<T>, null as never);
    setValue("dataAbertura" as Path<T>, null as never);
  }

  useEffect(() => {
    if (selectedPersonType === PersonType.Physical) {
      changeToPhysicalPerson();
    } else {
      changeToLegalPerson();
    }
  }, [selectedPersonType]);

  console.log(defaultValues);

  const editFormRowProps = {
    inputColSpan: isEdit ? 8 : undefined,
    labelColSpan: isEdit ? 4 : undefined,
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBox className={className}>
          {!isEdit && (
            <FormRow label="Tipo de pessoa" {...editFormRowProps}>
              <SelectController
                name="tipoPessoa"
                options={getPersonTypeOptions()}
                valueConstructor={String}
              />
            </FormRow>
          )}

          <FormRow label="Nome" {...editFormRowProps}>
            <InputController name="nome" placeholder="Informe o nome" />
          </FormRow>

          {selectedPersonType === PersonType.Physical && (
            <>
              <FormRow label="CPF" {...editFormRowProps}>
                <InputController
                  name="cpf"
                  mask={cpfMask.mask}
                  placeholder={cpfMask.mask}
                />
              </FormRow>

              <FormRow label="Data de nascimento" {...editFormRowProps}>
                <InputController name="dataNascimento" type="date" />
              </FormRow>

              <FormRow label="Registro geral" {...editFormRowProps}>
                <InputController
                  name="numeroDocumento"
                  placeholder="Informe o registro geral (opcional)"
                />
              </FormRow>

              <FormRow label="Órgão expedidor" {...editFormRowProps}>
                <InputController
                  name="orgaoEmissor"
                  placeholder="Informe o órgão expedidor (opcional)"
                  transform={(value) => value.toUpperCase()}
                />
              </FormRow>

              <FormRow label="Gênero" {...editFormRowProps}>
                <SelectController
                  name="generoId"
                  options={getGenderOptions()}
                  placeholder="Informe o gênero"
                />
              </FormRow>
            </>
          )}

          {selectedPersonType === PersonType.Legal && (
            <>
              <FormRow label="CNPJ" {...editFormRowProps}>
                <InputController
                  name="cnpj"
                  mask={cnpjMask.mask}
                  placeholder={cnpjMask.mask}
                />
              </FormRow>

              <FormRow label="Razão social" {...editFormRowProps}>
                <InputController
                  name="razaoSocial"
                  placeholder="Informe a razão social"
                />
              </FormRow>

              <FormRow label="Contribuinte" {...editFormRowProps}>
                <SwitchController name="contribuinte" />
              </FormRow>

              <FormRow label="Inscrição estadual" {...editFormRowProps}>
                <InputController
                  name="inscricaoEstadual"
                  placeholder="Informe a inscrição estadual"
                />
              </FormRow>

              <FormRow label="Inscrição municipal" {...editFormRowProps}>
                <InputController
                  name="inscricaoMunicipal"
                  placeholder="Informe a inscrição municipal"
                />
              </FormRow>

              <FormRow label="Data de abertura" {...editFormRowProps}>
                <InputController name="dataAbertura" type="date" />
              </FormRow>
            </>
          )}

          {children}

          <FormSubmitButton loading={isSubmitting} />
        </FormBox>
      </form>
    </FormProvider>
  );
}
